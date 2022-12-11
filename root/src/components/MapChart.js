import React from "react"
import { ComposableMap, Geographies, Geography, Sphere,
    Graticule, ZoomableGroup} from "react-simple-maps"
import { scaleLinear } from "d3-scale";
import countryData from './result.json';
import { useState } from "react";
import { Tooltip } from 'antd';
var lowerPop = 0;
var upperPop = 2587380;
// const geoUrl =
//   "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"
const geoUrl = require('../hooks/global_geo.json');
var constructFill = ((f, destination, origin, countryName) => {
  var tureColor = 0;
  if (destination) {
    if (origin) {
      if (countryName === origin) { tureColor = 2 * 2 * upperPop; }
      else if (countryName === destination) { tureColor = 0; }
      else { tureColor = upperPop; }
    } else {
      console.log("country: " + countryName + " f: " + f);
      if (countryName === destination) { tureColor = 0; }
      else { tureColor = f + upperPop + upperPop; }
      console.log("country: " + countryName + " tureColor: " + tureColor);
    }
  } else {
    tureColor = upperPop - f;
  } 
  // console.log("EU country tureColor: " + tureColor + ", destination: " + destination + ", origin: " + origin + ', countryName: ' + countryName);
  // console.log("upperPop: " + upperPop + "lowerPop: " + lowerPop)
  return tureColor;
})




export default function MapChart(props) {
  const { getDestination, getOrigin } = props;
  const [destination, setDestination] = useState("")
  const [origin, setOrigin] = useState("")
  // const colorScale = scaleLinear()
  // .domain([840, 10392910])
  // .range(["#f7fbff", "#08306b"]);

  const handleClick = properties => () => {
    var cn = "currentClickedCountry" + properties["NAME"] ? properties["NAME"] : properties["name"];
    console.log("onClickCountry: " + cn);
    var  value = countryData.filter((s) => s.type === "ASY_APP" && s.age === "TOTAL" && s.sex === "T");
    getOrigin(origin);
    console.log("inside MapCharts origin:" + origin);
    getDestination(destination);
    console.log("inside MapCharts destination3:" + destination);
    if (destination) {
      getDestination(destination);
    console.log("inside MapCharts destination1:" + destination);
      if (origin) {
        getDestination(destination);
        console.log("inside MapCharts destination2:" + getDestination(destination));
        setDestination("");
        setOrigin("");
        value = countryData.filter((s) => s.type === "ASY_APP" && s.age === "TOTAL" && s.sex === "T");
      } else {
        setOrigin(properties['iso_a2'])
      }
    } else {
      setDestination(properties['iso_a2'])
      value = value.filter((s) => s.geo === properties['iso_a2'])
      // const unique = [...new Set(countryData.map((item) => item.citizen))];
      // console.log(unique)
      // console.log(upperPop);
   }
   
   value = value.flatMap((s) => s.sum);
   lowerPop = Math.min(...value);
   upperPop = Math.max(...value);
  };



  // if (destination) {

  // } else {
  //   myData.filter((s) => s.type === "ASY_APP" && s.age === "TOTAL" && s.sex === "T");
  // }

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
            .range(["#2d004b", "#f3eeeb", "#7f3b08"])
            // .range(["#310354", "#a198c5", "f2eeec", "#f3eeeb", "#fbe7cc", "#e7922e", "#7f3b08"]) // 最接近理想色差，但是French崩了，不能获取origin
            // .range(["#310354", "#593388", "#a198c5", "#c4c1de", "#e0e1ed", "f2eeec", "#f3eeeb", "#fbe7cc", "#fcc682", "#e7922e", "#b35b09", "#7f3b08"])
            // .range(["#2d004b", "#51287f", "#7d6aa9", "#ada6ce", "#d5d5e8", "#f3eeeb", "#fce0b9", "#f9b868", "#df8621", "#b35b09", "#7f3b08"])
            console.log("Lower: " + lowerPop)
            console.log("Upper: " + upperPop)
            
            if (destination) {
              d = d.filter((s) => s.geo === destination)
              console.log("filter: Germany")
              if (origin) {
                d = d.filter((s) => s.citizen === origin)
              } 
            } 
            return geographies.map((geo) => {
              var data = [];
              if (destination) {
                // find origin 
                data = d.filter((s) => s.citizen === geo.properties['iso_a2']);
                console.log("destination " + destination)
                console.log(d)
              } else {
                data = d.filter((s) => s.geo === geo.properties['iso_a2']);
              }

              var f = 0;
  
              if (data.length) {
                f = data.reduce((a, v) => a = a + v.sum, 0);
                console.log("f after reduce: " + f)
              }

              var toolTipData = geo.properties["NAME"] ? geo.properties["NAME"] : geo.properties["name"] + ": " + f;
             return <Tooltip key={geo.rsmKey} title={toolTipData}>
                <Geography 
              key={geo.rsmKey} geography={geo} 
              fill={currColor(constructFill(f, destination, origin, geo.properties['iso_a2']))}
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

