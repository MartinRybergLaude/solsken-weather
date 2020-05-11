import fetchWeatherSMHI from './SMHI/fetchWeatherSMHI'
import { WeatherData } from './universalWeatherTypes';

export default function retrieveWeather(lon: string, lat: string, callback: (data: WeatherData | null) => void) {
    //TODO: depends on provider
    fetchWeatherSMHI(lon, lat, callback);
}