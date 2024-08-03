//Contains geographical utility functions (e.g., coordinate transformations, checking if a point is within a polygon).
const proj4 = require('proj4');

proj4.defs([
    [
        'EPSG:4326',
        '+title=WGS 84 (long/lat) +proj=longlat +datum=WGS84 +units=degrees'
    ],
    [
        'EPSG:3857',
        '+title=Google Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs'
    ]
]);

const formatToOpenLayerCoords = (long, lat)  => { 
    return proj4('EPSG:4326', 'EPSG:3857', [long, lat]);
}

module.exports = {
    formatToOpenLayerCoords
}