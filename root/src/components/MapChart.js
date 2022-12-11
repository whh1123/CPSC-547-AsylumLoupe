import React from "react"
import { ComposableMap, Geographies, Geography, Sphere,
    Graticule, ZoomableGroup} from "react-simple-maps"
import { scaleQuantize } from "d3-scale";
import countryData from './result.json';
import { useState } from "react";
import { Tooltip } from 'antd';
var lowerPop = 840;
var upperPop = 10392910;
// const geoUrl =
//   "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"
const geoUrl = require('../hooks/global_geo.json');
var colorScale = scaleQuantize()
  .domain([lowerPop, upperPop])
  .range(["#f7fbff", "#08306b"]);

export default function MapChart() {
  const [destination, setDestination] = useState("")

  // const colorScale = scaleLinear()
  // .domain([840, 10392910])
  // .range(["#f7fbff", "#08306b"]);

  const handleClick = properties => () => {
    console.log(properties);
    if (destination) {
  
    } else {
      setDestination(properties['iso_a2'])
      const value = countryData.filter((s) => s.type === "ASY_APP" && s.age === "TOTAL" && s.sex === "T" && s.geo === properties['iso_a2']).flatMap((s) => s.sum)
      const unique = [...new Set(countryData.map((item) => item.citizen))];
      console.log(unique)
      lowerPop = Math.min(...value);
      upperPop = Math.max(...value);
      console.log(upperPop);
   }
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
            const currColor = scaleQuantize()
            .domain([lowerPop, upperPop])
            .range(["#f7fbff", "#c4dbee", "#6daed5", "#2371b4", "#08306b"])
            console.log(lowerPop)
            console.log(upperPop)
            return geographies.map((geo) => {
              var d = countryData.filter((s) => s.geo === geo.properties['iso_a2'] && s.type === "ASY_APP" && s.age === "TOTAL" && s.sex === "T");
              if (destination) {
                // find origin 
                d = countryData.filter((s) => s.citizen === geo.properties['iso_a2'] && s.type === "ASY_APP" && s.age === "TOTAL" && s.sex === "T" && s.geo === destination);
                console.log("destination " + destination)
                console.log(d)
              } else {
                d = countryData.filter((s) => s.geo === geo.properties['iso_a2'] && s.type === "ASY_APP" && s.age === "TOTAL" && s.sex === "T");
              }
              var f = 0;
  
              if (geo.properties['iso_a2'] === destination) {
                f = 10000000;
                console.log("Italian: " + geo.properties['iso_a2']);
              }
  
              if (d.length) {
                f = d.reduce((a, v) => a = a + v.sum, 0);
                console.log("f after reduce: " + f)
              }
  
              // if (f > 0) {
              //   console.log(geo.properties['iso_a2']);
              //   console.log(f);
              // }
              
             return <Tooltip key={geo.rsmKey} title={geo.properties["NAME"] ? geo.properties["NAME"] : geo.properties["name"]}>
                <Geography 
              key={geo.rsmKey} geography={geo} 
              fill={f > 0 ? currColor(f) : "#f7fbff"}
    
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

