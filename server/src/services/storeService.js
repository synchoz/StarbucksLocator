//Contains logic for interacting with store data (e.g., API calls to external services).
const geoUtils = require('../utils/geoUtils');
const sharedUtils = require('../../../shared/util');
const fetch = require('node-fetch');

const filterStoresByCountry = async (countryGeoJSON, stores) => {
    let formattedCordsStoresArr;
    formattedCordsStoresArr = stores.filter(store => sharedUtils.intersectsCoordinate([store.longitude,store.latitude], countryGeoJSON))
    return formattedCordsStoresArr;
}

const fetchAllCountries = async () => {
    //
    //TO DO:
    //
    //try to use internal nodejs cache mechanism such as node-cache to save up on calling fetch all 
    //countries all over again because they will not change that often
    let countries;
    
    await fetch('https://restcountries.com/v3.1/all?alpha')
        .then(response => response.json())
        .then((data) => {
            countries = data.map((country) => {
                return({
                    name: country.name.common,
                    code: country.cca3,
                    centralPoint: geoUtils.formatToOpenLayerCoords(country.latlng[1],country.latlng[0])
                })
            })
        })
        .catch((error) => {
            console.log(error);
            return error;
        });
        
        return countries;
    }

const fetchAllStores = async () => {
    let transofmedCordsStores;
    await fetch('https://raw.githubusercontent.com/mmcloughlin/starbucks/master/locations.json')
        .then(response => response.json())
        .then((data) => {
            transofmedCordsStores = data.map((store) => {
                return({
                    ...store,
                    transformedcoordinates: geoUtils.formatToOpenLayerCoords(store.longitude, store.latitude)
                })
            })
        });
        return transofmedCordsStores;
}

module.exports = {
    fetchAllCountries,
    fetchAllStores,
    filterStoresByCountry
}