import React from "react"
import { ComposableMap, Geographies, Geography, Sphere,
    Graticule, ZoomableGroup} from "react-simple-maps"
import { scaleLinear } from "d3-scale";
import myData from './result.json';
import { useState } from "react";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

const colorScale = scaleLinear()
  .domain([840, 10392910])
  .range(["#f7fbff", "#08306b"]);

export default function MapChart() {
  // const [destination, setDestination] = useState("")

  // const colorScale = scaleLinear()
  // .domain([840, 10392910])
  // .range(["#f7fbff", "#08306b"]);

  // const handleClick = properties => () => {
  //   console.log(properties);
  //   if (destination) {
  
  //   } else {
  //     setDestination(properties['Alpha-2'])
  //   }
  // };



  // if (destination) {

  // } else {
  //   myData.filter((s) => s.type === "ASY_APP" && s.age === "TOTAL" && s.sex === "T");
  // }

  return (
    <ComposableMap  
        projectionConfig={{
        rotate: [0, 0, 0],
        scale: 147
        }}
    >
    <ZoomableGroup center={[1.7, 47.8]} zoom={9}>
    <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
      <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
      {myData.length > 0 && (
         <Geographies geography={geoUrl}>
         {({ geographies }) =>
           geographies.map((geo) => {
            var d = myData.filter((s) => s.geo === geo.properties['Alpha-2'] && s.type === "ASY_APP" && s.age === "TOTAL" && s.sex === "T");
            // if (destination) {
            //   d = myData.filter((s) => s.citizen === geo.properties['Alpha-2'] && s.type === "ASY_APP" && s.age === "TOTAL" && s.sex === "T" && s.geo === destination);
            // } else {
            //   d = myData.filter((s) => s.geo === geo.properties['Alpha-2'] && s.type === "ASY_APP" && s.age === "TOTAL" && s.sex === "T");
            // }
            var f = 0;

            // if (geo.properties['Alpha-2'] === destination) {
            //   f = 100000;
            // }

            if (d.length) {
              f = d.reduce((a, v) => a = a + v.sum, 0);
            }
            if (f > 0) {
              console.log(geo.properties['Alpha-2']);
              console.log(f);
            }
           return <Geography 
           key={geo.rsmKey} geography={geo} 
           fill={f > 0 ? colorScale(f) : "#F5F4F6"}
          //  onClick={handleClick(geo.properties)}
           />
           })
         }
       </Geographies>
      )}
    </ZoomableGroup>
    </ComposableMap>
  )
}
