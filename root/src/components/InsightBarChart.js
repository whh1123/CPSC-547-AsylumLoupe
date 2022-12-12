import React from "react";
import ReactEcharts from "echarts-for-react"



export default function InsightBarChart(props) {
    const {selectedView, origin, destination} = props;

    var options = require("../hooks/insightChartSetting.json");
    return <div id="TopSixTypeBar">
        <ReactEcharts
            option={options}
            style={{ width: "380px", height: "380px" }}
        ></ReactEcharts>  
    </div>
}