import React from "react";
import ReactEcharts from "echarts-for-react"
import countryData from './result.json';

export default function RatioChartDesOriApp(props) {
    const {origin, destination} = props;
    
    if(destination && origin){}
    // get origin country for application data
    var oriCountryApp = countryData.find((s) => s.citizen === origin && s.geo === destination && s.type === "ASY_APP" && s.age === "TOTAL" && s.sex === "T");
    var OA = oriCountryApp.sum

    var desCountryApp = countryData.filter((s) => s.geo === destination && s.type === "ASY_APP" && s.age === "TOTAL" && s.sex === "T");
    var DA = desCountryApp.reduce((a, v) => a = a + v.sum, 0)

    var TA = DA - OA
    console.log("OA: " + OA)
    console.log("DA: " + DA)
    console.log("TA: " + TA)


    var options = require("../hooks/insightDesOriApp.json");
    options["series"][0]["data"][0]["value"] = OA
    options["series"][0]["data"][0]["name"] = origin + "/ " + destination + " : " + (OA / DA).toFixed(6)
    options["series"][0]["data"][1]["value"] = TA
    options["series"][0]["data"][1]["name"] = "Other / " + destination + " : " + (TA / DA).toFixed(6)


    return <div id="Top7TypeBar">
        <ReactEcharts
            option={options}
            style={{ width: "400px", height: "240px", alignItems: "center", justifyContent: "center" }}
        ></ReactEcharts>  
    </div>
}