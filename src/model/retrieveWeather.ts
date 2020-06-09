import { WeatherData } from 'model/TypesWeather';
import fetchWeatherSMHI from 'model/SMHI/utils'
import retrieveCity from 'model/BigDataCloud/utils'
import { getCachedWeatherData, setCachedWeatherData } from 'model/utilsStorage';

export default async function retrieveWeather(lon: string, lat: string, locationName: string | null): Promise<WeatherData> {
    const cachedData = getCachedWeatherData(lon, lat)
    if (cachedData != null) {
        // Use cached data
        const weatherDataCleaned = await cleanHours(cachedData)
        console.log("Applied cached data")
        return weatherDataCleaned
    } else {
        // Use new data
        const weatherData = await fetchWeatherSMHI(lon, lat)
        const weatherDataParsedWithCity = await getCity(weatherData, locationName)
        const weatherDataCleaned = await cleanHours(weatherDataParsedWithCity)
        const data = weatherDataCleaned
        if (setCachedWeatherData(data)) {
            console.log("Data cached sucessfully")
        }
        console.log("Applied new data")
        return data
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
    data.days = data.days.filter(day => isDateNotOlderByDay(day.date))

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
    function isDateNotOlderByDay(date: Date): boolean {
        const current = new Date()
        date = new Date(date)
        return date.getFullYear() >= current.getFullYear() &&
          date.getMonth() >= current.getMonth() &&
          date.getDate() >= current.getDate()
    }
    return data
}
