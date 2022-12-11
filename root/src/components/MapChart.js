import React from "react"
import { ComposableMap, Geographies, Geography, Sphere,
    Graticule, ZoomableGroup} from "react-simple-maps"
import { scaleLinear } from "d3-scale";
import countryData from './result.json';
import { useState } from "react";
import { Tooltip } from 'antd';

var lowerPop = 0;
var upperPop = 2587380;


const geoUrl = require('../hooks/global_geo.json');
var constructFill = ((f, destination, origin, countryName) => {
  var trueColor = 0;
  if (destination) {
    if (origin) {
      // if (countryName === origin) { trueColor = 2 * 2 * upperPop; }
      // else if (countryName === destination) { trueColor = 0; }
      // else { trueColor = upperPop; }
      if (countryName === origin) { trueColor = upperPop * 2; }
      else if (countryName === destination) { trueColor = 0; }
      else { trueColor = upperPop; }
    } else {
      // if (countryName === destination) { trueColor = 0; }
      // else { trueColor = f + upperPop + upperPop; }
      // console.log("country: " + countryName + " trueColor: " + trueColor);
      if (countryName === destination) { trueColor =  0; }
      else { trueColor =  f + upperPop; }
    }
  } else {
    // trueColor = upperPop - f;
    // to ensure when deselect everything, the upper and lower range go back to the default value.
    lowerPop = 0;
    upperPop = 2587380;
    trueColor = upperPop - f;
  } 
  return trueColor;
})

export default function MapChart(props) {
  const { getDestination, getOrigin } = props;
  const [destination, setDestination] = useState("")
  const [origin, setOrigin] = useState("")


  const handleClick = properties => () => {
    console.log("Clicked!")
    // var cn = properties.NAME ? properties.NAME : properties.name;
    // console.log("onClickCountry: " + cn);

    var  value = countryData.filter((s) => s.type === "ASY_APP" && s.age === "TOTAL" && s.sex === "T");
    // getOrigin(origin);
    // getDestination(destination);
    // console.log("inside MapCharts origin:" + origin);
    // console.log("inside MapCharts destination3:" + destination);

    if (destination) {
      // getDestination(destination);
      // console.log("inside MapCharts destination1:" + destination);
      if (origin) {
        // getDestination(destination);
        // console.log("inside MapCharts destination2:" + getDestination(destination));
        console.log("yes dest, yes origin")
        value = countryData.filter((s) => s.type === "ASY_APP" && s.age === "TOTAL" && s.sex === "T");
        setDestination("");
        setOrigin("");
        getDestination("");
        getOrigin("");
        // console.log("inside MapCharts origin:" + origin);
        // console.log("inside MapCharts destination1:" + destination);
      } else {
        console.log("yes dest, no origin")
        setOrigin(properties['iso_a2_eh'])
        getOrigin(properties['iso_a2_eh']);
        // getDestination(destination);
        // console.log("inside MapCharts origin:" + origin);
        // console.log("inside MapCharts destination2:" + destination);
      }
    } else {
      console.log("No dest, no origin.")
      getDestination(destination);
      setDestination(properties['iso_a2_eh'])
      value = value.filter((s) => s.geo === properties['iso_a2_eh'])
      // getOrigin(origin);
      getDestination(properties['iso_a2_eh']);
      // console.log("inside MapCharts origin:" + origin);
      // console.log("inside MapCharts destination3:" + destination);
   }
   
   value = value.flatMap((s) => s.sum);
   lowerPop = Math.min(...value);
   upperPop = Math.max(...value);
  };

  return (
    <ComposableMap  
        projection="geoMercator"
        projectionConfig={{
        rotate: [0, 0, 0],
        scale: 147
        }}
    >
    <ZoomableGroup center={[1.7, 47.8]} zoom={9}>
    <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
      <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
      {countryData.length > 0 && (
         <Geographies geography={geoUrl}>
         {({ geographies }) => {
            var d = countryData.filter((s) => s.type === "ASY_APP" && s.age === "TOTAL" && s.sex === "T");
            
            const currColor = scaleLinear()
            .domain([0, upperPop, upperPop * 2])
            .range(["#310354", "#f3eeeb", "#7f3b08"])
            // .range(["#2d004b", "#f3eeeb", "#7f3b08"])

            // .range(["#310354", "#a198c5", "f2eeec", "#f3eeeb", "#fbe7cc", "#e7922e", "#7f3b08"]) // 最接近理想色差，但是French崩了，不能获取origin
            // .range(["#310354", "#593388", "#a198c5", "#c4c1de", "#e0e1ed", "f2eeec", "#f3eeeb", "#fbe7cc", "#fcc682", "#e7922e", "#b35b09", "#7f3b08"])
            // .range(["#2d004b", "#51287f", "#7d6aa9", "#ada6ce", "#d5d5e8", "#f3eeeb", "#fce0b9", "#f9b868", "#df8621", "#b35b09", "#7f3b08"])

            if (destination) {
              d = d.filter((s) => s.geo === destination)
              if (origin) {
                d = d.filter((s) => s.citizen === origin)
              } 
            } 
            return geographies.map((geo) => {
              var data = [];
              if (destination) {
                // find origin 
                data = d.filter((s) => s.citizen === geo.properties['iso_a2_eh']);
              } else {
                data = d.filter((s) => s.geo === geo.properties['iso_a2_eh']);
              }

              var f = 0;
  
              if (data.length) {
                f = data.reduce((a, v) => a = a + v.sum, 0)
              }

              var toolTipData = geo.properties["NAME"] ? geo.properties["NAME"] : geo.properties["name"] + ": " + f;
             return <Tooltip key={geo.rsmKey} title={toolTipData}>
                <Geography 
              key={geo.rsmKey} geography={geo} 
              style={{
                default: { outline: "none" },
                hover: { outline: "none" },
                pressed: { outline: "none" },
              }}
              fill={currColor(constructFill(f, destination, origin, geo.properties['iso_a2_eh']))}
              onClick={handleClick(geo.properties)}
              />
             </Tooltip>
             
             
             })
         }
           
         }
       </Geographies>
      )}
    </ZoomableGroup>
    </ComposableMap>
  )
}

