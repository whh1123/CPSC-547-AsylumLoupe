import React from "react";
import InsightFlowChart from "./InsightFlowChart";
import RatioChartDesOriApp from "./RatioChartDesOriApp";
import RatioChartDesOriRes from "./RatioChartDesOriRes";
import InsightIncreasementChart from "./InsightIncreasementChart";
export default function InsightChart(props) {
    const {origin, destination} = props
    // console.log("get destination in insights.js: " + destination);
    const countries_to_iso = require('../hooks/countries_to_iso_a2.json');

    const getCountryName = (iso) => {
        return countries_to_iso.find((s) => s["code"] === iso)?.name
    }
    if(destination && !origin){
        return <div className="insightOnlyDest">
        <p style={{"font-weight": "bold"}}>Original citizenship of the most asylum applications and resettlements received by {getCountryName(destination)}</p>
        <InsightFlowChart destination={destination} origin={origin}/>
    </div>
    }
    else if(destination && origin){
        return <div className="insightOnlyDest">
        <p style={{margin: "4px", "font-weight": "bold"}}>Asylum seekers from {getCountryName(origin)} to {getCountryName(destination)}</p>
        <div className="applyRate">
            <RatioChartDesOriApp destination={destination} origin={origin}/>
            </div>
        <div className="resettleRate">
            <RatioChartDesOriRes destination={destination} origin={origin}/>
            </div>
        {/* <div className="totalApplication" style={{display: "inline-block", verticalAlign: "top"}}>
            <p className="totalApplication">Statistics: {getCountryName(origin)} citizens seeked asylums in {getCountryName(destination)}</p>
            <p className="totalApplication">from 2008 to 2021</p>
            <InsightIncreasementChart destination={destination} origin={origin}/>
        </div> */}
    </div>
    }

    return <div>
        <p style={{margin:"10px"}} ><b>Please choose a destination country</b></p>
        <p style={{margin:"10px"}}><b>on the map on the right hand side first</b></p>
        <img style={{margin:"50px"}} src="https://i.pinimg.com/originals/1a/f4/ea/1af4eaf434b67866ff02caac8600b04c.png" width="200" height="200" border="0" alt="https://toppng.com/uploads/preview/open-purple-arrow-pointing-right-11563251620wpb25xo0mp.png" />
        <p style={{margin:"10px"}}><b>The map is saturated with purple color</b></p>
        <p style={{margin:"10px"}}><b>according to the number of asylum applications</b></p>
        </div>
}