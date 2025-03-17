import { apiKey } from '../constants';

const forecastEndpoint = params => `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;
const locationsEndpoint = params => `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`;

const apiCall = async (endpoint) => {

    try {
        const response = await fetch(endpoint)
        if (!response.ok) {
            throw new Error(`Error:${response.statusText}`)
        }
        return await response.json();
    } catch (err) {
        console.log('error: ', err);
        return null;
    }
}


export const fetchWeatherForcast = params => {
    let forecastUrl = forecastEndpoint(params);
    return apiCall(forecastUrl)
}
export const fetchLocations = params => {
    let locationsUrl = locationsEndpoint(params);
    return apiCall(locationsUrl)
}