import { WeatherData } from 'model/TypesWeather';
import fetchWeatherSMHI from 'model/SMHI/utils'
import retrieveCity from 'model/BigDataCloud/utils'
import { getCachedWeatherData, setCachedWeatherData } from 'model/utilsStorage';

export default async function retrieveWeather(lon: string, lat: string): Promise<WeatherData> {
    const cachedData = getCachedWeatherData(lon, lat)
    if (cachedData != null) {
        // Use cached data
        const weatherDataParsedWithCity = await retrieveCity(cachedData)
        const weatherDataCleaned = await cleanHours(weatherDataParsedWithCity)
        console.log("Applied cached data")
        return weatherDataCleaned
    } else {
        // Use new data
        const weatherData = await fetchWeatherSMHI(lon, lat)
        const data = weatherData
        if (setCachedWeatherData(data)) {
            console.log("Data cached sucessfully")
        }
        const weatherDataParsedWithCity = await retrieveCity(data)
        const weatherDataCleaned = await cleanHours(weatherDataParsedWithCity)
        console.log("Applied new data")
        return weatherDataCleaned
    }
}
async function cleanHours(data: WeatherData): Promise<WeatherData> {
    data.days.filter(day => isDateNotOlderByDay(day.date))

    data.days.forEach(day => {
        day.hours.filter(hour => isDateNotOlderBy30min(hour.date))
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
