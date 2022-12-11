import React from "react";
export default function Table(props) {
    const {selectedView, origin, destination} = props
    return <div>
        <p>Table</p>
        <p>{selectedView}</p>
        <p>{origin}</p>
        <p>{destination}</p>
    </div>
}