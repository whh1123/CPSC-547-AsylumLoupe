import React from "react";
import InsightBarChart from './InsightBarChart';
export default function InsightChart(props) {
    const {selectedView, origin, destination} = props
    // console.log("get destination in insights.js: " + destination);
    const countries_to_iso = require('../hooks/countries_to_iso_a2.json');

    const getCountryName = (iso) => {
        return countries_to_iso.find((s) => s["code"] === iso)["name"]
    }
    if(destination && !origin){
        return <div className="insightOnlyDest">
        <p>Original citizenship of the most asylum applications and resettlements recevied by {getCountryName(destination)}</p>
        <InsightBarChart destination={destination} origin={origin}/>
    
        {/* <h4>Selected View: {selectedView}</h4>
        <h4>Origin: {origin}</h4>
        <h4>Destination: {destination}</h4> */}
    </div>
    }
    else if(destination && origin){
        return <div>
        <p>InsightCharts with Contents</p>
        <h4>Selected View: {selectedView}</h4>
        <h4>Origin: {origin}</h4>
        <h4>Destination: {destination}</h4>
    </div>
    }

    return <div>
        <p>InsightChart</p>
        <p>Please choose a country</p>
        </div>
}