import React from "react";
import ReactEcharts from "echarts-for-react"
import countryData from './result.json';

export default function RatioChartDesOriRes(props) {
    const {origin, destination} = props;
    
    if(destination && origin){}
    // get origin country for resettlement data
    var oriCountryRes = countryData.find((s) => s.geo === destination && s.citizen === origin && s.type === "RES" && s.age === "TOTAL" && s.sex === "T");
    var OR = oriCountryRes ? oriCountryRes.sum : 0
    console.log("OR: " + OR);
    // get destination country for resettlement data
    var desCountryRes = countryData.filter((s) => s.geo === destination && s.type === "RES" && s.age === "TOTAL" && s.sex === "T");
    var DR = desCountryRes.reduce((a, v) => a = a + v.sum, 0)
    var TR = DR - OR
    console.log("OR: " + OR)
    console.log("DR: " + DR)
    console.log("TR: " + TR)
    // var TR = DR - OR
 
    var options = require("../hooks/insightDesOriRes.json");
    options["series"][0]["data"][0]["value"] = OR
    options["series"][0]["data"][0]["name"] = origin + "/ " + destination + " : " + (OR / DR).toFixed(6)
    options["series"][0]["data"][1]["value"] = TR
    options["series"][0]["data"][1]["name"] = "Other / " + destination + " : " + (TR / DR).toFixed(6)



    return <div id="Top7TypeBar">
        <ReactEcharts
            option={options}
            style={{ width: "400px", height: "240px", alignItems: "center", justifyContent: "center" }}
        ></ReactEcharts>  
    </div>
}