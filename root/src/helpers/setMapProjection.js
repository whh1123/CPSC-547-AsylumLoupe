import * as d3 from "d3";

export const setMapProjection = function(mapData) {
  // use the geoMercator map projection
  const projection = d3.geoMercator();
  // adjust projection to fit area of map canvas
  projection
    .precision(0)
    .rotate([0, 0, 0])
    .fitExtent(
      [
        [0, 0],
        [760, 480],
      ],
      mapData
    );
  return projection;
};
