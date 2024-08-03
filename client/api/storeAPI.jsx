const BASE_URL = process.env.NODE_ENV === "production" ? "/api/" : "http://localhost/api/";
import axios from 'axios';

async function getCountries(country) {
    return axios
            .get(`${BASE_URL}getcountries?country=${country}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return error;
            });
}

async function verifyStore(alpha3code,latitude,longtitude) {
    return axios
            .get(`${BASE_URL}verifystoreservice?alpha3code=${alpha3code}&latitude=${latitude}&longtitude=${longtitude}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return error;
            });
}

export default {
    getCountries,
    verifyStore
}   