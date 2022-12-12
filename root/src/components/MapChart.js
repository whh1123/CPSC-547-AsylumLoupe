import React from "react"
import { ComposableMap, Geographies, Geography, Sphere,
    Graticule, ZoomableGroup} from "react-simple-maps"
import { scaleLinear } from "d3-scale";
import countryData from './result.json';
import { useState } from "react";
import { Tooltip } from 'antd';

var upperPop = 0;
// var upperPop = 2587380; // app
// var upperPop = 38395; // res

const geoUrl = require('../hooks/global_geo.json');

export default function MapChart(props) {
  const { getDestination, getOrigin } = props;
  const [destination, setDestination] = useState("")
  const [origin, setOrigin] = useState("")
  const [upperPop, setUpperPop] = useState(0);

  var constructFill = ((f, destination, origin, countryName) => {
  var trueColor = 0;
  console.log("current Upper: " + upperPop + " for: " + countryName + " with f: " + f);
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
    // lowerPop = 0;
    // upperPop = 0;
    // upperPop = 2587380; // app
    // upperPop = 38395; // res
    trueColor = upperPop - f;
  } 
  return trueColor;
})

  const handleClick = (properties, f) => () => {
    // var cn = properties.NAME ? properties.NAME : properties.name;
    // console.log("onClickCountry: " + cn);
    if (f === 0 && (!destination || !origin)) { return; }

    // var  value = countryData.filter((s) => s.type === "ASY_APP" && s.age === "TOTAL" && s.sex === "T");
    var  value = countryData.filter((s) => s.type === "RES" && s.age === "TOTAL" && s.sex === "T");
    
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
        // value = countryData.filter((s) => s.type === "ASY_APP" && s.age === "TOTAL" && s.sex === "T");
        setUpperPop(0);

        setDestination("");
        setOrigin("");
        getDestination("");
        getOrigin("");
        return;
        // console.log("inside MapCharts origin:" + origin);
        // console.log("inside MapCharts destination1:" + destination);
      } else {
        setOrigin(properties['iso_a2_eh'])
        getOrigin(properties['iso_a2_eh']);
        // getDestination(destination);
        // console.log("inside MapCharts origin:" + origin);
        // console.log("inside MapCharts destination2:" + destination);
      }
    } else {
      getDestination(destination);
      setDestination(properties['iso_a2_eh'])
      value = value.filter((s) => s.geo === properties['iso_a2_eh'])
      // getOrigin(origin);
      getDestination(properties['iso_a2_eh']);
      // console.log("inside MapCharts origin:" + origin);
      // console.log("inside MapCharts destination3:" + destination);
   }
    value = value.flatMap((s) => s.sum);
    setUpperPop(Math.max(...value)); 
  };

  return (
    <div>
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
            // var d = countryData.filter((s) => s.type === "ASY_APP" && s.age === "TOTAL" && s.sex === "T");
            var d = countryData.filter((s) => s.type === "RES" && s.age === "TOTAL" && s.sex === "T");

            if (!destination && !origin && upperPop === 0) {
              var result = d.reduce(function (hash) {
                  return function (r, o) {
                      if (!hash[o.geo]) {
                          hash[o.geo] = [];
                          r.push(hash[o.geo]);
                      }
                      hash[o.geo].push(o)
                      return r;
                  };
              } (Object.create(null)), []);

              result = result.map((s) => {
                return {"sum": s.reduce((a, v) => a = a + v.sum, 0)}
              });

              result = result.flatMap((s) => s.sum);
              setUpperPop(Math.max(...result)); 
              console.log(upperPop);
            }           
            const currColor = scaleLinear()
            .domain([0, upperPop, upperPop * 2])
            .range(["#310354", "#f3eeeb", "#9c2a00"])

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
              fill={(f === 0 && (geo.properties['iso_a2_eh'] !== destination) && (geo.properties['iso_a2_eh'] !== origin)) ? "#d3d3d3" : currColor(constructFill(f, destination, origin, geo.properties['iso_a2_eh']))}
              onClick={handleClick(geo.properties, f)}
              />
             </Tooltip>
             
             
             })
         }
           
         }
       </Geographies>
      )}
    </ZoomableGroup>
    </ComposableMap>
    <button>Application</button>
    <button>Resettle</button>
    </div>

  )
}

