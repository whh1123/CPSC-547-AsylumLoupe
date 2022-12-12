import React from "react";
import ReactEcharts from "echarts-for-react"
import countryData from './result.json';


export default function InsightBarChart(props) {
    const {origin, destination} = props;

    const getDestination = (iso) => {
        return countryData.find((s) => s["code"] === iso)["name"]
    }
    var options = require("../hooks/insightChartSetting.json");
    return <div id="TopSixTypeBar">
        <ReactEcharts
            option={options}
            style={{ width: "380px", height: "380px" }}
        ></ReactEcharts>  
    </div>
}