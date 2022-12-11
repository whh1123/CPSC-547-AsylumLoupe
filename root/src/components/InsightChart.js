import React from "react";
export default function InsightChart(props) {
    const {selectedView, origin, destination} = props
    // console.log("get destination in insights.js: " + destination);
    const countries_to_iso = require('../hooks/countries_to_iso_a2.json');
    if(destination){
        return <div>
        <p>InsightCharts with Contents</p>
        <h4>Selected View: {selectedView}</h4>
        <h4>Origin: {origin}</h4>
        <h4>Destination: {destination}</h4>
    </div>
    }
    return <div>
        <p>InsightChart</p>
        </div>
}