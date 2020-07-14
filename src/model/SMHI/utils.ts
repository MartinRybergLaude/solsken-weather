import * as WeatherTypesSMHI from './types'
import {fetchSettings, apiBaseSMHI, temprUnits, windUnits, precUnits, pressureUnits, visUnits, timeUnits} from '../../utils/constants'
import * as WeatherTypesUni from 'model/TypesWeather'
import SunCalc from 'suncalc'

export default async function fetchWeatherSMHI(lon: string, lat: string): Promise<WeatherTypesUni.WeatherData> {
    console.log(`${apiBaseSMHI}lon/${lon}/lat/${lat}/data.json`)
    let expires = new Date()
    const response = await fetch(`${apiBaseSMHI}lon/${lon}/lat/${lat}/data.json`, fetchSettings)
    const weatherJSON = await parseResponse(response)
    const weatherDataSMHI = await castWeatherSMHI(weatherJSON)
    const weatherDataParsed = await parseWeatherSMHI(weatherDataSMHI, parseFloat(lon), parseFloat(lat), expires)
    return weatherDataParsed

    async function parseResponse(response: Response): Promise<any> {
        let expiresSet = false
        try {
            expires.setSeconds(expires.getSeconds() + parseInt(response.headers.get("Cache-control")!.split("=")[1].split(",")[0]))
            expiresSet = true
        } catch {
            try {
                expires = new Date(Date.parse(response.headers.get("Expires")!))
                expiresSet = true
            } catch { }
        }
        if(!expiresSet || isNaN(expires.getHours())) expires.setHours(expires.getHours() + 1)
        console.log("Expires: " + expires.getHours() + ":" + expires.getMinutes())
        return response.json()        
    }
}
async function castWeatherSMHI(weatherJson: any): Promise<WeatherTypesSMHI.WeatherData> {
        const data = weatherJson as WeatherTypesSMHI.WeatherData
        return data
}
async function parseWeatherSMHI(weatherData: WeatherTypesSMHI.WeatherData, lon: number, lat: number, expires: Date): Promise<WeatherTypesUni.WeatherData> {
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
    weatherDataUni.source = "smhi"

    weatherDataUni.days = parseDays(weatherData.timeSeries, lon, lat)
    
    return weatherDataUni
}
function parseDays(times: WeatherTypesSMHI.TimeSery[], lon: number, lat: number): WeatherTypesUni.Day[] {
    let days = []
    let iterationDate = new Date(0)

    // Iterate each day
    for (const time1 of times) {

        if (isSameDay(new Date(time1.validTime), new Date(iterationDate))) continue

        let iterationDay = {} as WeatherTypesUni.Day
        iterationDay.hours = []
        iterationDate = time1.validTime

        // Set sunrise and sunset
        iterationDay.date = time1.validTime
        let sunTimes = SunCalc.getTimes(new Date(iterationDay.date), lat, lon)
        iterationDay.sunrise = sunTimes.sunrise
        iterationDay.sunset = sunTimes.sunset

        // Iterate each hour
        for (const time2 of times) {
            if (isSameDay(new Date(time2.validTime), new Date(iterationDate))) {
                iterationDay.hours.push(parseHour(time2, iterationDay.sunrise, iterationDay.sunset)) 
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
        days.push(iterationDay)
    }
    return days
}
function parseHour(time: WeatherTypesSMHI.TimeSery, sunrise: Date, sunset: Date): WeatherTypesUni.Hour {
    let hour = {} as WeatherTypesUni.Hour
    hour.date = time.validTime
    time.parameters.forEach(param => {
        switch(param.name) {
            case WeatherTypesSMHI.Name.T:
                hour.tempr = param.values[0]
                break
            case WeatherTypesSMHI.Name.Pmax:
                hour.precMax = param.values[0]
                break
            case WeatherTypesSMHI.Name.Pmin:
                hour.precMin = param.values[0]
                break
            case WeatherTypesSMHI.Name.Pmean:
                hour.precMean = param.values[0]
                break
            case WeatherTypesSMHI.Name.Ws:
                hour.wind = param.values[0]
                break
            case WeatherTypesSMHI.Name.Wd:
                hour.windDir = param.values[0]
                break
            case WeatherTypesSMHI.Name.Msl:
                hour.pressure = param.values[0]
                break
            case WeatherTypesSMHI.Name.Vis:
                hour.vis = param.values[0]
                break
            case WeatherTypesSMHI.Name.R:
                hour.humidity = param.values[0]
                break
            case WeatherTypesSMHI.Name.Gust:
                hour.gusts = param.values[0]
                break
            case WeatherTypesSMHI.Name.TccMean:
                hour.cloud = param.values[0]
                break    
            case WeatherTypesSMHI.Name.Wsymb2:
                const wsymb2Num = param.values[0]
                const correctedForIndex = wsymb2Num - 1
                hour.text = WeatherTypesSMHI.TextList[correctedForIndex]
                if (new Date(hour.date).getHours() >= new Date(sunrise).getHours() && new Date(hour.date).getHours() <= new Date(sunset).getHours()){
                    hour.icon = WeatherTypesSMHI.IconListDay[correctedForIndex]
                } else {
                    hour.icon = WeatherTypesSMHI.IconListNight[correctedForIndex]
                }
                break                           
        }
    });
    hour.feelslike = calcFeelsLike(hour.tempr, hour.humidity, hour.wind)
    return hour
}
function calcFeelsLike(tempr: number, humidity: number, wind: number): number {
    if (tempr >= 27 && humidity >= 40) {
        const tF = Math.round((1.8 * tempr)+32)
        const feelsLikeDewF = -42.379 + (2.04901523 * tF) + (10.14333127 * humidity)
        - (0.22475541 * tF * humidity) - (6.83783 * Math.pow(10, -3) * tF * tF)
        - (5.481717 * Math.pow(10, -2) * humidity * humidity) + (1.22874 * Math.pow(10,-3) * tF * tF * humidity)
        + (8.5282 * Math.pow(10,-4) * tF * humidity * humidity) - (1.99 * Math.pow(10, -6) * tF * tF * humidity * humidity)
        const feelsLikeDewC = Math.round((feelsLikeDewF - 32) / 1.8)
        return feelsLikeDewC
    } else if (tempr <= 10 && wind >= 1.34) {
        const wKM = wind * 3.6
        const feelsLikeWindC = Math.round(13.12 + (0.6215 * tempr) - (11.37 * Math.pow(wKM, 0.16)) + (0.3965 * tempr * Math.pow(wKM, 0.16)))
        return feelsLikeWindC
    } else {
        return tempr
    }
}
function isSameDay(d1: Date, d2: Date) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
}
