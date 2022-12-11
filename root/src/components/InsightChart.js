import React from "react";
export default function InsightChart(props) {
    const {selectedView, origin, destination} = props
    console.log("get destination in insights.js: " + destination);
    if(destination){
        return <div>
        <p>Hello</p>
        <h4>`${selectedView}`</h4>
        {origin}
        {destination}
    </div>
    }
    return <div>
        <p>InsightChart</p>
        </div>
}