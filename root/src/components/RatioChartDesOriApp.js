import React from "react";
import ReactEcharts from "echarts-for-react"
import countryData from './result.json';

export default function RatioChartDesOriApp(props) {
    const {origin, destination} = props;
    const countries_to_iso = require('../hooks/countries_to_iso_a2.json');

    const getCountryName = (iso) => {
        return countries_to_iso.find((s) => s["code"] === iso)?.name
    }
   
    if(destination && origin){}
    // get origin country for application data
    var oriCountryApp = countryData.filter((s) => s.citizen === origin && s.geo === destination && s.type === "ASY_APP" && s.age === "TOTAL" && s.sex === "T");
    var OA = oriCountryApp.reduce((a, v) => a = a + v.sum, 0)

    var desCountryApp = countryData.filter((s) => s.geo === destination && s.type === "ASY_APP" && s.age === "TOTAL" && s.sex === "T");
    var DA = desCountryApp.reduce((a, v) => a = a + v.sum, 0)

    var TA = DA - OA
    console.log("OA: " + OA)
    console.log("DA: " + DA)
    console.log("TA: " + TA)


    var options = require("../hooks/insightDesOriApp.json");
    options["series"][0]["data"][0]["value"] = Math.trunc((OA / DA) * 100)
    options["series"][0]["data"][0]["name"] = origin + "/ " + destination + " : " + Math.trunc((OA / DA) * 100) + "%"
    options["series"][0]["data"][1]["value"] = Math.trunc((TA / DA) * 100)
    options["series"][0]["data"][1]["name"] = "Other / " + destination + " : " + Math.trunc((TA / DA) * 100 ) + "%"
    options.title.text = Math.trunc((OA / DA) * 100) + "% of asylum application received from \n" + getCountryName(destination) + "are made by " + getCountryName(origin) + " citizens";
{/* <p className="applyRate">Ratio:   </p> */}

    return <div id="Top7TypeBar">
        <ReactEcharts
            option={options}
            // style={{ width: "400px", height: "240px", alignItems: "center", justifyContent: "center" }}
        ></ReactEcharts>  
    </div>
}