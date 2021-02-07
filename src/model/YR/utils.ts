import * as WeatherTypesYR from './types'
import {fetchSettings, apiBaseYR, temprUnits, windUnits, precUnits, pressureUnits, visUnits, timeUnits} from '../../utils/constants'
import * as WeatherTypesUni from 'model/TypesWeather'
import SunCalc from 'suncalc'
import * as Consts from 'utils/constants'
import i18n from 'i18n'

export default async function fetchWeatherYR(lon: string, lat: string): Promise<WeatherTypesUni.WeatherData> {
    let expires = new Date()
    const response = await fetch(`${apiBaseYR}lat=${lat}&lon=${lon}`, fetchSettings)
    const weatherJSON = await parseResponse(response)
    const weatherDataYR = await castWeatherYR(weatherJSON)
    const weatherDataParsed = await parseWeatherYR(weatherDataYR, parseFloat(lon), parseFloat(lat), expires)
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
async function castWeatherYR(weatherJson: any): Promise<WeatherTypesYR.WeatherData> {
        const data = weatherJson as WeatherTypesYR.WeatherData
        return data
}

async function parseWeatherYR(weatherData: WeatherTypesYR.WeatherData, lon: number, lat: number, expires: Date): Promise<WeatherTypesUni.WeatherData> {
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
    weatherDataUni.source = "yr"

    weatherDataUni.days = parseDays(weatherData.properties.timeseries, lon, lat)
    return weatherDataUni
}
function parseDays(times: WeatherTypesYR.Timesery[], lon: number, lat: number): WeatherTypesUni.Day[] {
    let days = []
    let iterationDate = new Date(0)

    // Iterate each day
    for (let i = 0; i < times.length; i++) {
        if (isSameDay(new Date(times[i].time), new Date(iterationDate))) continue

        let iterationDay = {} as WeatherTypesUni.Day
        iterationDay.hours = []
        iterationDate = times[i].time

        // Set sunrise sunset
        iterationDay.date = times[i].time
        let sunTimes = SunCalc.getTimes(new Date(iterationDay.date), lat, lon)
        iterationDay.sunrise = sunTimes.sunrise
        iterationDay.sunset = sunTimes.sunset

        iterationDay.icon = getDayIcon(times[i])
        if (iterationDay.icon === Consts.WiNA && i + 1 < times.length) {
            iterationDay.icon = getDayIcon(times[i + 1])
        }

        // Iterate each hour
        for (const time2 of times) {
            if (isSameDay(new Date(time2.time), new Date(iterationDate))) {
                iterationDay.hours.push(parseHour(time2, iterationDay.sunrise, iterationDay.sunset))
            }
        }

        // Retrieve all temperatures for the day
        let temprs: number[] = []
        iterationDay.hours.forEach(hour => {
            temprs.push(hour.tempr)
        });

        // Set remaining day params
        iterationDay.tempHigh = Math.max(...temprs)
        iterationDay.tempLow = Math.min(...temprs)
        days.push(iterationDay)
    }
    return days
}
function parseHour(time: WeatherTypesYR.Timesery, sunrise: Date, sunset: Date): WeatherTypesUni.Hour {
    let hour = {} as WeatherTypesUni.Hour
    hour.date = time.time
    hour.tempr = time.data.instant.details.air_temperature
    if (time.data.next_1_hours?.details.precipitation_amount_max != null)
        hour.precMax = time.data.next_1_hours.details.precipitation_amount_max
    if (time.data.next_1_hours?.details.precipitation_amount_min != null)
        hour.precMin = time.data.next_1_hours.details.precipitation_amount_min
    if (time.data.next_1_hours?.details.precipitation_amount != null)
        hour.precMean= time.data.next_1_hours.details.precipitation_amount
    hour.wind = time.data.instant.details.wind_speed
    hour.gusts = time.data.instant.details.wind_speed_of_gust
    hour.windDir = time.data.instant.details.wind_from_direction
    hour.pressure = time.data.instant.details.air_pressure_at_sea_level
    hour.fog = time.data.instant.details.fog_area_fraction
    hour.humidity = time.data.instant.details.relative_humidity
    hour.cloud = time.data.instant.details.cloud_area_fraction
    hour.feelslike = calcFeelsLike(hour.tempr, hour.humidity, hour.wind)
    const symbol = time.data.next_1_hours?.summary.symbol_code
    if (symbol == null) {
        hour.icon = Consts.WiNA
        hour.text = "N/A"
    }
    else if (symbol.startsWith("clearsky")) {
        if (new Date(hour.date).getHours() >= new Date(sunrise).getHours() && new Date(hour.date).getHours() <= new Date(sunset).getHours()){
            hour.icon = Consts.WiDayClear
        } else {
            hour.icon = Consts.WiNightClear
        }
        hour.text = i18n.t("w_clear")
    }
    else if (symbol === "cloudy") {
        hour.icon = Consts.WiCloudy
        hour.text = i18n.t("w_cloudy")
    }
    else if (symbol.startsWith("fair")) {
        if (new Date(hour.date).getHours() >= new Date(sunrise).getHours() && new Date(hour.date).getHours() <= new Date(sunset).getHours()){
            hour.icon = Consts.WiDayCloudy
        } else {
            hour.icon = Consts.WiNightCloudy
        }
        hour.text = i18n.t("w_varying_cloudiness")
    }
    else if (symbol === "fog") {
        hour.icon = Consts.WiFog
        hour.text = i18n.t("w_fog")
    }
    else if (symbol === "heavyrain") {
        hour.icon = Consts.WiRain
        hour.text = i18n.t("w_heavy_rain")
    }
    else if (symbol === "heavyrainandthunder") {
        hour.icon = Consts.WiThunder
        hour.text = i18n.t("w_thunder")
    }
    else if (symbol.split("_")[0] === "heavyrainshowers") {
        if (new Date(hour.date).getHours() >= new Date(sunrise).getHours() && new Date(hour.date).getHours() <= new Date(sunset).getHours()){
            hour.icon = Consts.WiDayRain
        } else {
            hour.icon = Consts.WiNightRain
        }
        hour.text = i18n.t("w_heavy_rain_showers")
    }
    else if (symbol.startsWith("heavyrainshowersandthunder")) {
        hour.icon = Consts.WiThunder
        hour.text = i18n.t("w_thunder")
    }
    else if (symbol === "heavysleet") {
        hour.icon = Consts.WiSleet
        hour.text = i18n.t("w_heavy_sleet")
    }
    else if (symbol === "heavysleetandthunder") {
        hour.icon = Consts.WiThunder
        hour.text = i18n.t("w_thunder")
    }
    else if (symbol.split("_")[0] === "heavysleetshowers") {
        if (new Date(hour.date).getHours() >= new Date(sunrise).getHours() && new Date(hour.date).getHours() <= new Date(sunset).getHours()){
            hour.icon = Consts.WiDaySleet
        } else {
            hour.icon = Consts.WiNightSleet
        }
        hour.text = i18n.t("w_heavy_sleet_showers")
    }
    else if (symbol.startsWith("heavysleetshowersandthunder")) {
        hour.icon = Consts.WiThunder
        hour.text = i18n.t("w_thunder")
    }
    else if (symbol === "heavysnow") {
        hour.icon = Consts.WiSnow
        hour.text = i18n.t("w_heavy_snow")
    }
    else if (symbol === "heavysnowandthunder") {
        hour.icon = Consts.WiThunder
        hour.text = i18n.t("w_thunder")
    }
    else if (symbol.split("_")[0] === "heavysnowshowers") {
        if (new Date(hour.date).getHours() >= new Date(sunrise).getHours() && new Date(hour.date).getHours() <= new Date(sunset).getHours()){
            hour.icon = Consts.WiDaySnow
        } else {
            hour.icon = Consts.WiNightSnow
        }
        hour.text = i18n.t("w_heavy_snow_showers")
    }
    else if (symbol.startsWith("heavysnowshowersandthunder")) {
        hour.icon = Consts.WiThunder
        hour.text = i18n.t("w_thunder")
    }
    else if (symbol === "lightrain") {
        hour.icon = Consts.WiRain
        hour.text = i18n.t("w_light_rain")
    }
    else if (symbol === "lightrainandthunder") {
        hour.icon = Consts.WiThunder
        hour.text = i18n.t("w_thunder")
    }
    else if (symbol.split("_")[0] === "lightrainshowers") {
        if (new Date(hour.date).getHours() >= new Date(sunrise).getHours() && new Date(hour.date).getHours() <= new Date(sunset).getHours()){
            hour.icon = Consts.WiDayRain
        } else {
            hour.icon = Consts.WiNightRain
        }
        hour.text = i18n.t("w_light_rain_showers")
    }
    else if (symbol.startsWith("lightrainshowersandthunder")) {
        hour.icon = Consts.WiThunder
        hour.text = i18n.t("w_thunder")
    }
    else if (symbol === "lightsleet") {
        hour.icon = Consts.WiSleet
        hour.text = i18n.t("w_light_sleet")
    }
    else if (symbol === "lightsleetandthunder") {
        hour.icon = Consts.WiThunder
        hour.text = i18n.t("w_thunder")
    }
    else if (symbol.split("_")[0] === "lightsleetshowers") {
        if (new Date(hour.date).getHours() >= new Date(sunrise).getHours() && new Date(hour.date).getHours() <= new Date(sunset).getHours()){
            hour.icon = Consts.WiDaySleet
        } else {
            hour.icon = Consts.WiNightSleet
        }
        hour.text = i18n.t("w_light_sleet_showers")
    }
    else if (symbol.startsWith("lightssleetshowersandthunder")) {
        hour.icon = Consts.WiThunder
        hour.text = i18n.t("w_thunder")
    }
    else if (symbol === "lightsnow") {
        hour.icon = Consts.WiSnow
        hour.text = i18n.t("w_light_snow")
    }
    else if (symbol === "lightsnowandthunder") {
        hour.icon = Consts.WiThunder
        hour.text = i18n.t("w_thunder")
    }
    else if (symbol.split("_")[0] === "lightsnowshowers") {
        if (new Date(hour.date).getHours() >= new Date(sunrise).getHours() && new Date(hour.date).getHours() <= new Date(sunset).getHours()){
            hour.icon = Consts.WiDaySnow
        } else {
            hour.icon = Consts.WiNightSnow
        }
        hour.text = i18n.t("w_light_snow_showers")
    }
    else if (symbol.startsWith("lightssnowshowersandthunder")) {
        hour.icon = Consts.WiThunder
        hour.text = i18n.t("w_thunder")
    }
    else if (symbol.startsWith("partlycloudy")) {
        if (new Date(hour.date).getHours() >= new Date(sunrise).getHours() && new Date(hour.date).getHours() <= new Date(sunset).getHours()){
            hour.icon = Consts.WiDayCloudy
        } else {
            hour.icon = Consts.WiNightCloudy
        }
        hour.text = i18n.t("w_varying_cloudiness")
    }
    else if (symbol === "rain") {
        hour.icon = Consts.WiRain
        hour.text = i18n.t("w_moderate_rain")
    }
    else if (symbol === "rainandthunder") {
        hour.icon = Consts.WiThunder
        hour.text = i18n.t("w_thunder")
    }
    else if (symbol.split("_")[0] === "rainshowers") {
        if (new Date(hour.date).getHours() >= new Date(sunrise).getHours() && new Date(hour.date).getHours() <= new Date(sunset).getHours()){
            hour.icon = Consts.WiDayRain
        } else {
            hour.icon = Consts.WiNightRain
        }
        hour.text = i18n.t("w_moderate_rain")
    }
    else if (symbol.startsWith("rainshowersandthunder")) {
        hour.icon = Consts.WiThunder
        hour.text = i18n.t("w_thunder")
    }
    else if (symbol === "sleet") {
        hour.icon = Consts.WiSleet
        hour.text = i18n.t("w_moderate_sleet")
    }
    else if (symbol === "sleetandthunder") {
        hour.icon = Consts.WiThunder
        hour.text = i18n.t("w_thunder")
    }
    else if (symbol.split("_")[0] === "sleetshowers") {
        if (new Date(hour.date).getHours() >= new Date(sunrise).getHours() && new Date(hour.date).getHours() <= new Date(sunset).getHours()){
            hour.icon = Consts.WiDaySleet
        } else {
            hour.icon = Consts.WiNightSleet
        }
        hour.text = i18n.t("w_moderate_sleet_showers")
    }
    else if (symbol.startsWith("sleetshowersandthunder")) {
        hour.icon = Consts.WiThunder
        hour.text = i18n.t("w_thunder")
    }
    else if (symbol === "snow") {
        hour.icon = Consts.WiSleet
        hour.text = i18n.t("w_moderate_snow")
    }
    else if (symbol === "snowandthunder") {
        hour.icon = Consts.WiThunder
        hour.text = i18n.t("w_thunder")
    }
    else if (symbol.split("_")[0] === "snowshowers") {
        if (new Date(hour.date).getHours() >= new Date(sunrise).getHours() && new Date(hour.date).getHours() <= new Date(sunset).getHours()){
            hour.icon = Consts.WiDaySnow
        } else {
            hour.icon = Consts.WiNightSnow
        }
        hour.text = i18n.t("w_moderate_snow_showers")
    }
    else if (symbol.startsWith("snowshowersandthunder")) {
        hour.icon = Consts.WiThunder
        hour.text = i18n.t("w_thunder")
    } else {
        hour.icon = Consts.WiNA
        hour.text = "N/A"
    }
    return hour
} 
function getDayIcon(time: WeatherTypesYR.Timesery): string {
    const symbol = time.data.next_12_hours?.summary.symbol_code
    if (symbol == null) return Consts.WiNA
    if (symbol.startsWith("clearsky")) {
        return Consts.WiDayClear
    }
    else if (symbol === "cloudy") {
        return Consts.WiCloudy
    }
    else if (symbol.startsWith("fair")) {
        return Consts.WiDayCloudy
    }
    else if (symbol === "fog") {
        return Consts.WiFog
    }
    else if (symbol === "heavyrain") {
        return Consts.WiRain
    }
    else if (symbol === "heavyrainandthunder") {
        return Consts.WiThunder
    }
    else if (symbol.split("_")[0] === "heavyrainshowers") {
        return Consts.WiDayRain
    }
    else if (symbol.startsWith("heavyrainshowersandthunder")) {
        return Consts.WiThunder
    }
    else if (symbol === "heavysleet") {
        return Consts.WiSleet
    }
    else if (symbol === "heavysleetandthunder") {
        return Consts.WiThunder
    }
    else if (symbol.split("_")[0] === "heavysleetshowers") {
        return Consts.WiDaySleet
    }
    else if (symbol.startsWith("heavysleetshowersandthunder")) {
        return Consts.WiThunder
    }
    else if (symbol === "heavysnow") {
        return Consts.WiSnow
    }
    else if (symbol === "heavysnowandthunder") {
        return Consts.WiThunder
    }
    else if (symbol.split("_")[0] === "heavysnowshowers") {
        return Consts.WiDaySnow
    }
    else if (symbol.startsWith("heavysnowshowersandthunder")) {
        return Consts.WiThunder
    }
    else if (symbol === "lightrain") {
        return Consts.WiRain
    }
    else if (symbol === "lightrainandthunder") {
        return Consts.WiThunder
    }
    else if (symbol.split("_")[0] === "lightrainshowers") {
        return Consts.WiDayRain
    }
    else if (symbol.startsWith("lightrainshowersandthunder")) {
        return Consts.WiThunder
    }
    else if (symbol === "lightsleet") {
        return Consts.WiSleet
    }
    else if (symbol === "lightsleetandthunder") {
        return Consts.WiThunder
    }
    else if (symbol.split("_")[0] === "lightsleetshowers") {
        return Consts.WiDaySleet
    }
    else if (symbol.startsWith("lightssleetshowersandthunder")) {
        return Consts.WiThunder
    }
    else if (symbol === "lightsnow") {
        return Consts.WiSnow
    }
    else if (symbol === "lightsnowandthunder") {
        return Consts.WiThunder
    }
    else if (symbol.split("_")[0] === "lightsnowshowers") {
        return Consts.WiDaySnow
    }
    else if (symbol.startsWith("lightssnowshowersandthunder")) {
        return Consts.WiThunder
    }
    else if (symbol.startsWith("partlycloudy")) {
        return Consts.WiDayCloudy
    }
    else if (symbol === "rain") {
        return Consts.WiRain
    }
    else if (symbol === "rainandthunder") {
        return Consts.WiThunder
    }
    else if (symbol.split("_")[0] === "rainshowers") {
        return Consts.WiDayRain
    }
    else if (symbol.startsWith("rainshowersandthunder")) {
        return Consts.WiThunder
    }
    else if (symbol === "sleet") {
        return Consts.WiNightSleet
    }
    else if (symbol === "sleetandthunder") {
        return Consts.WiThunder
    }
    else if (symbol.split("_")[0] === "sleetshowers") {
        return Consts.WiDaySleet
    }
    else if (symbol.startsWith("sleetshowersandthunder")) {
        return Consts.WiThunder
    }
    else if (symbol === "snow") {
        return Consts.WiSleet
    }
    else if (symbol === "snowandthunder") {
        return Consts.WiThunder
    }
    else if (symbol.split("_")[0] === "snowshowers") {
        return Consts.WiDaySnow
    }
    else if (symbol.startsWith("snowshowersandthunder")) {
        return Consts.WiThunderstorm
    } else {
        return Consts.WiNA
    }
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