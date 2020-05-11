import {fetchSettings, apiBaseSMHI} from '../constants'
import * as weatherTypes from './weatherTypesSMHI'
import parseWeatherSMHI from './parseWeatherSMHI'
import {WeatherData} from 'scripts/universalWeatherTypes'
export default function fetchWeather(lon: string, lat: string, callback: (data: WeatherData | null) => void) {
    console.log(`${apiBaseSMHI}lon/${lon}/lat/${lat}/data.json`)
    return fetch(`${apiBaseSMHI}lon/${lon}/lat/${lat}/data.json`, fetchSettings)
        .then(response => {
            if (!response.ok) {
                callback(null)
            } else {
                return response.json()
            }
        }).then(data => handleJSONData(data, callback))
}
function handleJSONData(data: any, callback: (data: WeatherData | null) => void ) {
    let weatherData: weatherTypes.WeatherData
    try {
        weatherData = data
        callback(parseWeatherSMHI(weatherData))
    } catch (err) {
        callback(null)
    }
}
