import React from "react";
import ReactEcharts from "echarts-for-react"
import countryData from './result.json';
import { useState } from "react";
import { scaleLog, scaleLinear } from "d3-scale";

export default function RatioChartDesOri(props) {
    const {origin, destination} = props;
    
    if(destination && origin){}
    // get origin countries for application data
    var oriCountriesApp = countryData.filter((s) => s.type === "ASY_APP" && s.age === "TOTAL" && s.sex === "T" && s.geo === destination);
    
    // var appList = oriCountriesApp.flatMap((s) => s.sum);
    var appList = [...oriCountriesApp].sort(function (a, b) { 
        return b.sum - a.sum // ascending order
      })
    var top5AppList = [...appList].slice(0, 5);
    var options = require("../hooks/insightDesOri.json");
    // var maxAppNum = Math.max(...(top5AppList.flatMap((s) => s.sum)));
    var applicationSum = top5AppList.reduce((a, v) => a = a + v.sum, 0)

    
    // get origin countries for resettlement data
    var oriCountriesRes = [];
    var curOriCountryRes = (oriCountryName) => {
        var temp = countryData.find((s) => s.geo === destination && s.citizen === oriCountryName && s.type === "RES" && s.age === "TOTAL" && s.sex === "T");
        var resettleNum = temp ? temp.sum : 0;
        console.log("current origin country resettle: " + resettleNum);
        return resettleNum;
    }
    for(var i = 0; i < top5AppList.length; i++){
        var topAppCountry = top5AppList[i];
        var oriName = topAppCountry.citizen;
        console.log("oriName: " + oriName);
        oriCountriesRes.push(curOriCountryRes(oriName));
        console.log("newRes added: " + oriCountriesRes[oriCountriesRes.length - 1]);
    }
    console.log("resList: " + oriCountriesRes[0] + ";" + oriCountriesRes[1] + ";" + oriCountriesRes[2] + ";" + oriCountriesRes[3] + ";" + oriCountriesRes[4] + ";" + oriCountriesRes[5] + ";" + oriCountriesRes[6]); // sorted origin country list for application data
    var resettlementSum = oriCountriesRes.reduce((a, v) => a = a + v, 0)

    var settledRatio = (resettlementSum / applicationSum).toFixed(3)
    var unSettledRatio = ((applicationSum - resettlementSum) / applicationSum).toFixed(3)
    options["series"]["data"][0]["value"] = resettlementSum
    options["series"]["data"][1]["value"] =


    return <div id="Top7TypeBar">
        <ReactEcharts
            option={options}
            style={{ width: "400px", height: "400px", alignItems: "center", justifyContent: "center" }}
        ></ReactEcharts>  
    </div>
}