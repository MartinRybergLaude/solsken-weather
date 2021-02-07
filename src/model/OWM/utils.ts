import * as WeatherTypesOWM from './types'
import i18n from 'i18n'
import {fetchSettings, apiBaseOWM, temprUnits, windUnits, precUnits, pressureUnits, visUnits, timeUnits} from '../../utils/constants'
import * as WeatherTypesUni from 'model/TypesWeather'
import * as Consts from 'utils/constants'
import SunCalc from 'suncalc'

export default async function fetchWeatherOWM(lon: string, lat: string): Promise<WeatherTypesUni.WeatherData> {
    const lang = i18n.language
    let url
    if (lang.substring(0,2) === "sv") {
        url = `${apiBaseOWM}lat=${lat}&lon=${lon}&lang=sv&appid=d90d4b91224a30ca61ad2301254be9e3&units=metric`
    } else {
        url = `${apiBaseOWM}lat=${lat}&lon=${lon}&appid=d90d4b91224a30ca61ad2301254be9e3&units=metric`
    }
    
    const expires = new Date()
    expires.setHours(expires.getHours() + 1)
    const response = await fetch(url, fetchSettings)
    const weatherJSON = await parseResponse(response)
    const weatherDataSMHI = await castWeatherOWM(weatherJSON)
    const weatherDataParsed = await parseWeatherOWM(weatherDataSMHI, parseFloat(lon), parseFloat(lat), expires)
    return weatherDataParsed
}
async function parseResponse(response: Response): Promise<any> {
    return response.json()        
}
async function castWeatherOWM(weatherJson: any): Promise<WeatherTypesOWM.WeatherData> {
        const data = weatherJson as WeatherTypesOWM.WeatherData
        return data
}
async function parseWeatherOWM(weatherData: WeatherTypesOWM.WeatherData, lon: number, lat: number, expires: Date): Promise<WeatherTypesUni.WeatherData> {
    const weatherDataUni = {} as WeatherTypesUni.WeatherData
    weatherDataUni.days = []
    weatherDataUni.units = {
        temprUnit: temprUnits.c,
        windUnit: windUnits.ms,
        precUnit: precUnits.mmh,
        pressureUnit: pressureUnits.hpa,
        visUnit: visUnits.km,
        timeUnit: timeUnits.twentyfour
    }
    weatherDataUni.expires = expires
    weatherDataUni.latTwoDecimal = lat.toFixed(2)
    weatherDataUni.lonTwoDecimal = lon.toFixed(2)
    weatherDataUni.source = "owm"

    weatherDataUni.days = parseDays(weatherData.list, lon, lat)
    
    return weatherDataUni
}
function parseDays(times: WeatherTypesOWM.List[], lon: number, lat: number): WeatherTypesUni.Day[] {
    let days = []
    let iterationDate = new Date(0)

    // Iterate each day
    for (const time1 of times) {

        if (isSameDay(new Date(time1.dt * 1000), new Date(iterationDate))) continue

        let iterationDay = {} as WeatherTypesUni.Day
        iterationDay.hours = []
        iterationDate = new Date(time1.dt  * 1000)

        // Set sunrise and sunset
        iterationDay.date = new Date(time1.dt  * 1000)
        let sunTimes = SunCalc.getTimes(new Date(iterationDay.date), lat, lon)
        iterationDay.sunrise = sunTimes.sunrise
        iterationDay.sunset = sunTimes.sunset

        // Iterate each hour
        for (const time2 of times) {
            if (isSameDay(new Date(time2.dt  * 1000), new Date(iterationDate))) {
                iterationDay.hours.push(parseHour(time2)) 
            } 
        }

        // Retrieve an icon for the day
        let icon
        iterationDay.hours.forEach(hour => {
            if (new Date(hour.date).getHours() === 14) icon = hour.icon
        });
        if (icon == null) icon = iterationDay.hours[~~(iterationDay.hours.length / 2)].icon

        // Retrieve all temperatures for the day
        let temprs: number[] = []
        iterationDay.hours.forEach(hour => {
            temprs.push(hour.tempr) 
        });

        // Set remaining day params
        iterationDay.icon = icon
        iterationDay.tempHigh = Math.max(...temprs)
        iterationDay.tempLow = Math.min(...temprs)
        console.log("pushed day")
        days.push(iterationDay)
    }
    return days
}
function parseHour(time: WeatherTypesOWM.List): WeatherTypesUni.Hour {
    let hour = {} as WeatherTypesUni.Hour
    hour.date = new Date(time.dt  * 1000)
    hour.tempr = time.main.temp
    hour.pressure = time.main.pressure
    hour.feelslike = time.main.feels_like
    hour.cloud = time.clouds.all
    hour.humidity = time.main.humidity
    if (time.rain) {
        hour.precMean = time.rain.rain3h / 3
    }
    hour.wind = time.wind.speed
    hour.windDir = time.wind.deg
    hour.text = capitalizeFirstLetter(time.weather[0].description)
    switch (time.weather[0].icon) {
        case "11d":
            hour.icon = Consts.WiThunderstorm
            break
        case "09d":
            hour.icon = Consts.WiDrizzle
            break
        case "10d":
            hour.icon = Consts.WiRain
            break
        case "13d":
            hour.icon = Consts.WiSnow
            break
        case "50d":
            hour.icon = Consts.WiFog
            break
        case "01d":
            hour.icon = Consts.WiDayClear
            break
        case "01n":
            hour.icon = Consts.WiNightClear
            break
        case "02d":
            hour.icon = Consts.WiDaySmallCloudy
            break
        case "02n":
            hour.icon = Consts.WiNightSmallCloudy
            break
        case "03d":
            hour.icon = Consts.WiDayCloudy
            break
        case "03n":
            hour.icon = Consts.WiNightCloudy
            break
        case "04d":
            hour.icon = Consts.WiCloud
            break;
        case "04n":
            hour.icon = Consts.WiCloud
            break
        default:
            hour.icon = Consts.WiNA
    }
    return hour
}
function capitalizeFirstLetter(string: String) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function isSameDay(d1: Date, d2: Date) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
}
