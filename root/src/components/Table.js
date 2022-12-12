import React from "react";
import ReactEcharts from "echarts-for-react";
import countryData from './result.json';

export default function Table(props) {
    const {selectedView, origin, destination} = props;
    var option = ""
    if (selectedView === "people"){
        if (destination) {
            var prsentedData = countryData.filter((s) => s.geo === destination && s.sex === "T" && s.age === "TOTAL");
            if(origin) {
                prsentedData = prsentedData.filter((s) => s.citizen === origin);
            }
            option = require("../hooks/people_bar_charts.json");
            option["xAxis"][0]["data"] = ["2008", "2009", "2010", "2011",
            "2012", "2013", "2014", "2015","2016", "2017", "2018", "2019",
            "2020", "2021"];

            var applicants = prsentedData.filter((s) => s.type === "ASY_APP").map((s) => s.numbers);

            for (let i = 0; i < applicants.length; i++ ) {
               if (i !== 0) {
                for (let j = 0; j < applicants[0].length; j++) {
                    applicants[0][j] += applicants[i][j]
                }
               }
            }

            console.log(applicants[0]);

            var resettles = prsentedData.filter((s) => s.type === "RES").map((s) => s.numbers);

            for (let i = 0; i < resettles.length; i++) {
                if (i !== 0) {
                    for (let j = 0; j < resettles[0].length; j++) {
                        resettles[0][j] += resettles[i][j]
                    }
                }
            }

            console.log(resettles[0]);

            option["series"][0]["data"] = applicants[0];
            option["series"][1]["data"] = resettles[0];

        }
    } else if (selectedView === "gender") {
        option = require("../hooks/gender_line_charts.json");
    } else if (selectedView === "age"){
        option = require("../hooks/age_bar_charts.json");
    } else {
        option = "";
    }

    if (option) {
        return <div>
            <ReactEcharts option={option} notMerge={true} lazyUpdate={false}/>
        </div>
    } else {
        return <div>
            <h2>Table</h2>
            <h3>Please choose a country and select an option to view.</h3>
            <h3>{selectedView}</h3>
            <h3>{origin}</h3>
            <h3>{destination}</h3>
        </div>  
    }
}