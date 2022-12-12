import React, { useState } from "react";
import ReactEcharts from "echarts-for-react";
import countryData from './result.json';

export default function Table(props) {
    const {selectedView, origin, destination} = props;
    var option = "";

    const countries_to_iso = require('../hooks/countries_to_iso_a2.json');

    const getCountryName = (iso) => {
        return countries_to_iso.find((s) => s.code === iso)?.name
    }

    if (selectedView === "people"){
        if (destination) {
            var presentedData = countryData.filter((s) => s.geo === destination && s.sex === "T" && s.age === "TOTAL");
            if(origin) {
                presentedData = presentedData.filter((s) => s.citizen === origin);
            }
            var people_charts_option = require("../hooks/people_bar_charts.json");

            const applicants = presentedData.filter((s) => s.type === "ASY_APP").map((s) => s.numbers).reduce((acc, val) => acc.map((el, i) => el + val[i]), [0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
            people_charts_option.series[0].data = applicants;

            const resettles = presentedData.filter((s) => s.type === "RES").map((s) => s.numbers).reduce((acc, val) => acc.map((el, i) => el + val[i]),  [0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
            people_charts_option.series[1].data = resettles;

            if (origin) {
                people_charts_option.title.text = "Number of Asylum Applicants and Resettlement from "+ getCountryName(origin) +" Received by " + getCountryName(destination) + " in 2008 ~ 2021";
            } else {
                people_charts_option.title.text = "Number of Applicants and Resettlements Received by " + getCountryName(destination) + " in 2008 ~ 2021";
            }

            option = people_charts_option;

        }
    } else if (selectedView === "gender") {
        if (destination) {
            var presentedData = countryData.filter((s) => s.geo === destination && s.age === "TOTAL");
            if (origin) {
                presentedData = presentedData.filter((s) => s.citizen === origin);
            }
            var gender_charts_option = require("../hooks/gender_line_charts.json");

            const maleApp = presentedData.filter((s) => s.sex === "M" && s.type === "ASY_APP").map((s) => s.numbers).reduce((acc, val) => acc.map((el, i) => el + val[i]), [0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
            gender_charts_option.series[0].data = maleApp;

            const maleRes = presentedData.filter((s) => s.sex === "M" && s.type === "RES").map((s) => s.numbers).reduce((acc, val) => acc.map((el, i) => el + val[i]), [0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
            gender_charts_option.series[1].data = maleRes;

            const femaleApp = presentedData.filter((s) => s.sex === "F" && s.type === "ASY_APP").map((s) => s.numbers).reduce((acc, val) => acc.map((el, i) => el + val[i]), [0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
            gender_charts_option.series[2].data = femaleApp;

            const femaleRes = presentedData.filter((s) => s.sex === "F" && s.type === "RES").map((s) => s.numbers).reduce((acc, val) => acc.map((el, i) => el + val[i]), [0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
            gender_charts_option.series[3].data = femaleRes;

            const otherApp = presentedData.filter((s) => s.sex === "UNK" && s.type === "ASY_APP").map((s) => s.numbers).reduce((acc, val) => acc.map((el, i) => el + val[i]), [0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
            gender_charts_option.series[4].data = otherApp;

            const otherRes = presentedData.filter((s) => s.sex === "UNK" && s.type === "RES").map((s) => s.numbers).reduce((acc, val) => acc.map((el, i) => el + val[i]), [0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
            gender_charts_option.series[5].data = otherRes;

            if (origin) {
                gender_charts_option.title.text = "Gender Distribution of Asylum Applicants and Resettlements from " + getCountryName(origin) + " Received by " + getCountryName(destination) + " in 2008 ~ 2021";
            } else {
                gender_charts_option.title.text = "Gender Distribution of Asylum Applicants and Resettlements Received by " + getCountryName(destination) + " in 2008 to 2021";
            }
            option = gender_charts_option;
        }
    } else if (selectedView === "age"){
        if (destination) {
            var presentedData = countryData.filter((s) => s.geo === destination && s.sex === "T");
            if (origin) {
                presentedData = presentedData.filter((s) => s.citizen === origin);
            }
            var age_charts_option = require("../hooks/age_bar_charts.json");

            const lt18_app = presentedData.filter((s) => s.age === "Y_LT18" && s.type === "ASY_APP").map((s) => s.numbers).reduce((acc, val) => acc.map((el, i) => el + val[i]), [0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
            const lt35_app = presentedData.filter((s) => s.age === "Y18-34" && s.type === "ASY_APP").map((s) => s.numbers).reduce((acc, val) => acc.map((el, i) => el + val[i]), [0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
            const lt65_app = presentedData.filter((s) => s.age === "Y35-64" && s.type === "ASY_APP").map((s) => s.numbers).reduce((acc, val) => acc.map((el, i) => el + val[i]), [0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
            const ge65_app = presentedData.filter((s) => s.age === "Y_GE65" && s.type === "ASY_APP").map((s) => s.numbers).reduce((acc, val) => acc.map((el, i) => el + val[i]), [0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
            const lt18_res = presentedData.filter((s) => s.age === "Y_LT18" && s.type === "RES").map((s) => s.numbers).reduce((acc, val) => acc.map((el, i) => el + val[i]), [0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
            const lt35_res = presentedData.filter((s) => s.age === "Y18-34" && s.type === "RES").map((s) => s.numbers).reduce((acc, val) => acc.map((el, i) => el + val[i]), [0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
            const lt65_res = presentedData.filter((s) => s.age === "Y35-64" && s.type === "RES").map((s) => s.numbers).reduce((acc, val) => acc.map((el, i) => el + val[i]), [0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
            const ge65_res = presentedData.filter((s) => s.age === "Y_GE65" && s.type === "RES").map((s) => s.numbers).reduce((acc, val) => acc.map((el, i) => el + val[i]), [0,0,0,0,0,0,0,0,0,0,0,0,0,0]);

            age_charts_option.series[0].data = lt18_app;
            age_charts_option.series[1].data = lt35_app;
            age_charts_option.series[2].data = lt65_app;
            age_charts_option.series[3].data = ge65_app;
            age_charts_option.series[4].data = lt18_res;
            age_charts_option.series[5].data = lt35_res;
            age_charts_option.series[6].data = lt65_res;
            age_charts_option.series[7].data = ge65_res;

            if (origin) {
                age_charts_option.title.text = "Age Distribution of Asylum Applicants and Resettlements from " + getCountryName(origin) + " Received by " + getCountryName(destination) + " in 2008 ~ 2021";
            } else {
                age_charts_option.title.text = "Age Distribution of Asylum Applicants and Resettlements Received by " + getCountryName(destination) + " in 2008 to 2021";
            }

            option = age_charts_option;
        }
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