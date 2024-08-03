//Handles logic related to Starbucks stores (e.g., fetching stores, adding a new store).
const storeService = require('../services/storeService');
const geoUtils = require('../utils/geoUtils');
const sharedUtils = require('../../../shared/util');

async function getStoresByCountry(req, res) {
    try {
        const country =  req.query.country;
        console.log(country);
        
        const stores = await storeService.fetchAllStores();
        const countries = await storeService.fetchAllCountries();
        if(country == 'All'){
            res.status(201).json({
                stores: stores,
                countries: countries,
                zoom: 6,
                centralPoint: geoUtils.formatToOpenLayerCoords(34.794758, 32.07576)
            })
        } else {
            const countryData = await sharedUtils.fetchCountryGeoJSON(country);
            const filteredStores = await storeService.filterStoresByCountry(countryData, stores);

            res.status(201).json({
                stores: filteredStores,
                countries: countries,
                zoom: 6,
                centralPoint: countryData.centralPoint,
                countryGeoJSON: countryData
            })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'failed',
            msg: 'an Error has occured',
            error: error
        })
    }
}


module.exports = { 
    getStoresByCountry
}