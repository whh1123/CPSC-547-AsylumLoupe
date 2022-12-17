import React from "react";
import ReactEcharts from "echarts-for-react"
import countryData from './result.json';
import { useState } from "react";
import { scaleLog, scaleLinear } from "d3-scale";




export default function InsightBarChart(props) {
    const {origin, destination} = props;
    
    if(destination && !origin){}
    // get origin countries for application data
    var oriCountriesApp = countryData.filter((s) => s.type === "ASY_APP" && s.age === "TOTAL" && s.sex === "T" && s.geo === destination);
    console.log("oriCountriesAppList: " + oriCountriesApp[0].sum + ";" + oriCountriesApp[1].sum + ";" + oriCountriesApp[2].sum  + ";"+ oriCountriesApp[3].sum + ";" + oriCountriesApp[4].sum); // sorted origin country list for application data

    // var appList = oriCountriesApp.flatMap((s) => s.sum);
    var appList = [...oriCountriesApp].sort(function (a, b) { 
        return b.sum - a.sum // ascending order
      })
    var topSevenAppList = [...appList].slice(0, 7);
    console.log("appList: " + appList[0].citizen + ";" + appList[1].citizen + ";" + appList[2].citizen + ";" + appList[3].citizen + ";" + appList[4].citizen + ";" + appList[5].citizen + ";" + appList[6].citizen); // sorted origin country list for application data
    console.log("appList num: " + appList[0].sum + ";" + appList[1].sum  + ";" + appList[2].sum + ";" + appList[3].sum + ";" + appList[4].sum);
    console.log("topSevenAppList name: " + topSevenAppList[0].citizen + ";" + topSevenAppList[1].citizen + ";" + topSevenAppList[2].citizen + ";" + topSevenAppList[3].citizen + ";" + topSevenAppList[4].citizen + ";" + topSevenAppList[5].citizen + ";" + topSevenAppList[6].citizen);
    console.log("topSevenAppList num: " + topSevenAppList[0].sum + ";" + topSevenAppList[1].sum + ";" + topSevenAppList[2].sum);
    var options = require("../hooks/insightChartSetting.json");
    var maxAppNum = Math.max(...(topSevenAppList.flatMap((s) => s.sum)));
    var maxAppNumLen = ("" + maxAppNum).length;
    
    // get origin countries for resettlement data
    var oriCountriesRes = [];
    var curOriCountryRes = (oriCountryName) => {
        var temp = countryData.find((s) => s.geo === destination && s.citizen === oriCountryName && s.type === "RES" && s.age === "TOTAL" && s.sex === "T");
        var resettleNum = temp ? temp.sum : 0;
        console.log("current origin country resettle: " + resettleNum);
        return resettleNum;
    }
    for(var i = 0; i < topSevenAppList.length; i++){
        var topAppCountry = topSevenAppList[i];
        var oriName = topAppCountry.citizen;
        console.log("oriName: " + oriName);
        oriCountriesRes.push(curOriCountryRes(oriName));
        console.log("newRes added: " + oriCountriesRes[oriCountriesRes.length - 1]);
    }
    
    var maxValue = Math.max(...oriCountriesRes);
    var maxResNumLen = ("" + maxValue).length;
    var appMax = maxAppNum;
    var resMax = maxValue;
    var numToDivApp = 0;
    var numToDivRes = 0;
    if(maxAppNumLen - maxResNumLen > 0){
        
        while(numToDivApp < maxAppNumLen - maxResNumLen){
            appMax = appMax / 10;
            numToDivApp++;
        }
    }
    else if(maxAppNumLen - maxResNumLen < 0){
        
        while(numToDivRes < maxResNumLen - maxAppNumLen){
            resMax = resMax / 10;
            numToDivRes++;
        }
    }
    // assign application max value
    options["yAxis"][1]["max"] = appMax;
    console.log("yMax: " + Math.max(...(topSevenAppList.flatMap((s) => s.sum))));
     // rearrange application value
    const rearrangeData = scaleLinear().domain([0, Math.max(...(topSevenAppList.flatMap((s) => s.sum)))]).range([0, appMax]);
    options["xAxis"]["data"] = topSevenAppList.flatMap((s) => s.citizen);
    // assign application value
    options["series"][1]["data"] = topSevenAppList.flatMap((s) => rearrangeData(s.sum).toFixed(2));


    options["yAxis"][0]["max"] = resMax;
    const rearrangeResData = scaleLinear().domain([0, Math.max(...(oriCountriesRes))]).range([0, resMax]);
    // assign resettlement value
    options["series"][0]["data"] = oriCountriesRes.flatMap((s) => rearrangeResData(s).toFixed(2));

    return <div id="Top7TypeBar">
        <ReactEcharts
            option={options}
            style={{ width: "380px", height: "380px", alignItems: "right", justifyContent: "center" }}
        ></ReactEcharts>  
    </div>
}