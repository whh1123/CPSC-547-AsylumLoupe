import React from "react";
import ReactEcharts from "echarts-for-react"
import countryData from './result.json';

export default function InsightFlowChart(props) {
    const {origin, destination} = props;
    
    if(destination && !origin){}
    // get origin countries for application data
    var oriCountriesApp = countryData.filter((s) => s.type === "ASY_APP" && s.age === "TOTAL" && s.sex === "T" && s.geo === destination);
    
    // var appList = oriCountriesApp.flatMap((s) => s.sum);
    var appList = [...oriCountriesApp].sort(function (a, b) { 
        return b.sum - a.sum // ascending order
      })
    var top5AppList = [...appList].slice(0, 5);
    var options = require("../hooks/insightChart.json");
    // var maxAppNum = Math.max(...(top5AppList.flatMap((s) => s.sum)));
    // var applicationSum = top5AppList.reduce((a, v) => a = a + v.sum, 0)

    
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
    // var resettlementSum = oriCountriesRes.reduce((a, v) => a = a + v, 0)

    options["series"]["data"][2]["name"] = top5AppList[0].citizen
    options["series"]["data"][3]["name"] = top5AppList[1].citizen
    options["series"]["data"][4]["name"] = top5AppList[2].citizen
    options["series"]["data"][5]["name"] = top5AppList[3].citizen
    options["series"]["data"][6]["name"] = top5AppList[4].citizen
    // origin application
    options["series"]["links"][0]["target"] = top5AppList[0].citizen
    options["series"]["links"][0]["value"] = top5AppList[0].sum
    options["series"]["links"][1]["target"] = top5AppList[1].citizen
    options["series"]["links"][1]["value"] = top5AppList[1].sum
    options["series"]["links"][2]["target"] = top5AppList[2].citizen
    options["series"]["links"][2]["value"] = top5AppList[2].sum
    options["series"]["links"][3]["target"] = top5AppList[3].citizen
    options["series"]["links"][3]["value"] = top5AppList[3].sum
    options["series"]["links"][4]["target"] = top5AppList[4].citizen
    options["series"]["links"][4]["value"] = top5AppList[4].sum
    // resettle application
    options["series"]["links"][5]["value"] = oriCountriesRes[0]
    options["series"]["links"][6]["value"] = oriCountriesRes[1]
    options["series"]["links"][7]["value"] = oriCountriesRes[2]
    options["series"]["links"][8]["value"] = oriCountriesRes[3]
    options["series"]["links"][9]["value"] = oriCountriesRes[4]

    options["series"]["links"][5]["source"] = top5AppList[0].citizen
    options["series"]["links"][6]["source"] = top5AppList[1].citizen
    options["series"]["links"][7]["source"] = top5AppList[2].citizen
    options["series"]["links"][8]["source"] = top5AppList[3].citizen
    options["series"]["links"][9]["source"] = top5AppList[4].citizen

    return <div id="Top7TypeBar">
        <ReactEcharts
            option={options}
            style={{ width: "400px", height: "730px", alignItems: "center", justifyContent: "center" }}
        ></ReactEcharts>  
    </div>
}