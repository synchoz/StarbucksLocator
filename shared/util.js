const turf = require('@turf/turf');
const fetch = require('node-fetch');

const intersectsCoordinate = (coords, geoJson) => {
    return turf.booleanPointInPolygon(
        turf.point(coords), 
        geoJson.features[0].geometry.type == 'MultiPolygon' ? 
            turf.multiPolygon(geoJson.features[0].geometry.coordinates) :
            turf.polygon(geoJson.features[0].geometry.coordinates)
    );
}

const fetchCountryGeoJSON = async (countryName) => {
    const query = countryName.indexOf(' ') > 0 ? 'q' : 'country';
    let geoJsonCountry;
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search.php?${query}=${countryName}&format=geojson&polygon_geojson`);
        const data = await response.json();
        geoJsonCountry = data;
    } catch (error) {
        return error;
    }

    return geoJsonCountry;
}

const verifyByCordsCode = async (latitude, longtitude, alpha3code) => {
    let resultCountryName;
    let result;
    console.log('the alpha3code from req param: ', alpha3code);
    resultCountryName = await fetch(`https://restcountries.com/v3.1/alpha/${alpha3code}`)
    .then(response => response.json())
    .then((data) => {
        return data[0].name.common
    })
    .catch((error) => {
        console.log(error);
        return error;
    });

    const geojson = await fetchCountryGeoJSON(resultCountryName);

    if(intersectsCoordinate([longtitude,latitude], geojson)) {
        result = "The Store is Located inside of " + resultCountryName;
    } else {
        result = "The Store is Located SO FAR AWAY FROM " + resultCountryName;
    }

    return result;
}

module.exports = {
    verifyByCordsCode,
    fetchCountryGeoJSON,
    intersectsCoordinate
}