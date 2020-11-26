import { WeatherData } from 'model/TypesWeather';
import fetchWeatherSMHI from 'model/SMHI/utils'
import retrieveCity from 'model/BigDataCloud/utils'
import { getCachedWeatherData, setCachedWeatherData, getItem} from 'model/utilsStorage';
import fetchWeatherOWM from './OWM/utils';

export default async function retrieveWeather(lon: string, lat: string, locationName: string | null): Promise<WeatherData> {
    
    // Check which data source is selected
    let src = getItem("dataSrc")
    if (!src) src = "smhi"

    // Retrieve cached data
    const cachedData = getCachedWeatherData(lon, lat, src)
    if (cachedData != null && cachedData.source === src) {
        // Use cached data
        const weatherDataCleaned = await cleanHours(cachedData)
        console.log("Applied cached data")
        return weatherDataCleaned
    } else {
        // Use new data
        const weatherData = await getWeatherData(lon, lat, src)
        const weatherDataParsedWithCity = await getCity(weatherData, locationName)
        const weatherDataCleaned = await cleanHours(weatherDataParsedWithCity)
        if (setCachedWeatherData(weatherDataCleaned)) {
            console.log("Data cached sucessfully")
        }
        console.log("Applied new data")
        return weatherDataCleaned
    }
}
async function getWeatherData(lon: string, lat: string, src: string): Promise<WeatherData> {
    if (src === "smhi") {
        return fetchWeatherSMHI(lon, lat)
    } else {
        return fetchWeatherOWM(lon, lat)
    }
    
}
async function getCity(weatherData: WeatherData, locationName: string | null): Promise<WeatherData> {
    if (locationName) {
        weatherData.city = locationName
        return weatherData;
    } else {
        return await retrieveCity(weatherData)
    }
}
async function cleanHours(data: WeatherData): Promise<WeatherData> {
  
    data.days.forEach(day => { 
        day.hours = day.hours.filter(hour => isDateNotOlderBy30min(hour.date))
    });

    function isDateNotOlderBy30min(date: Date): boolean {
        if (new Date().getTime() - new Date(date).getTime() <= 30 * 60000) {
            return true
        } else {
            return false
        }
    }
    return data
}
