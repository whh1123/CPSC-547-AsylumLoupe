import * as d3 from "d3";
import { useState, useEffect } from "react";

export const useMapTools = function () {
  // store loaded map data in a state
  const [mapData, setMapData] = useState({
    data: {},
    loading: true,
  });

  // only fetch map data once and create a tooltip
  var jsonData = require('./custom.geo.json');
  useEffect(() => {
    setMapData((prevState) => {
      return { ...prevState, data: jsonData, loading: false };
    });
  }, []);
  return { mapData };
};
