import React from "react";
import ReactEcharts from "echarts-for-react"
import countryData from './result.json';

export default function InsightIncreasementChart(props) {
    const {origin, destination} = props;
    var oriCountryApp = countryData.find((s) => s.geo === destination && s.citizen === origin && s.sex === "T" && s.age === "TOTAL" && s.type === "ASY_APP");
    const applicationSum = oriCountryApp.sum;
    console.log("applicationSum" + applicationSum);

    var options = require("../hooks/insightTrend.json");
    options["series"][0]["name"] = "Total application data from 2008 to 2021"
    options["series"][0]["data"] = [applicationSum]

    return <div id="Top7TypeBar">
        <ReactEcharts
            option={options}
            style={{ width: "400px", height: "200px", alignItems: "center", justifyContent: "center" }}
        ></ReactEcharts>  
    </div>
}