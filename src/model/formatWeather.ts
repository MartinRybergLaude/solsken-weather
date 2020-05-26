import * as WeatherTypes from 'model/TypesWeather';
import * as FormattedWeatherTypes from './TypesFormattedWeather';
import * as Consts from 'utils/constants'
import * as Strings from 'utils/strings'

export default async function formatWeather(data: WeatherTypes.WeatherData): Promise<FormattedWeatherTypes.FormattedWeatherData> {
    let formattedData = {} as FormattedWeatherTypes.FormattedWeatherData
    formattedData.city = data.city

    formattedData.days = []
    for (const day of data.days) {
        let formattedDay = {} as FormattedWeatherTypes.Day
        formattedDay.hours = []
        // Handle day of week
        let dayOfWeek = {} as string
        let tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        if(isSameDay(new Date(day.date), new Date())) {
            dayOfWeek = Strings.Today
        } else if (isSameDay(new Date(day.date), tomorrow)) {
            dayOfWeek = Strings.Tomorrow
        } else {
            dayOfWeek = Consts.Days[new Date(day.date).getDay()];
        }
        formattedDay.dayOfWeek = dayOfWeek
        formattedDay.sunrise = getHourString(new Date(day.sunrise))
        formattedDay.sunset = getHourString(new Date(day.sunset))
        formattedDay.icon = day.icon
        formattedDay.text = day.text
        formattedDay.tempHigh = getTemperatureString(day.tempHigh)
        formattedDay.tempLow = getTemperatureString(day.tempLow)

        day.hours.forEach(hour => {
            formattedDay.hours.push(parseHour(hour))
        });
        formattedData.days.push(formattedDay)
    }
    return formattedData
}
function parseHour(hour: WeatherTypes.Hour): FormattedWeatherTypes.Hour {
    let formattedHour = {} as FormattedWeatherTypes.Hour

    formattedHour.hour = getHourString(new Date(hour.date))
    formattedHour.text = hour.text
    formattedHour.icon = hour.icon
    formattedHour.tempr = getTemperatureString(hour.tempr)
    formattedHour.feelslike = getTemperatureString(hour.feelslike)
    formattedHour.precMean = getPrecString(hour.precMean)
    formattedHour.wind = getWindString(hour.wind)
    formattedHour.gusts = getWindString(hour.gusts)
    formattedHour.windDir = getWindDirString(hour.windDir)
    formattedHour.windDirDeg = hour.windDir.toString()
    formattedHour.humidity = hour.humidity + "%"
    formattedHour.vis = getVisibilityString(hour.vis)
    formattedHour.pressure = getPressureString(hour.pressure)
    formattedHour.cloud = hour.cloud + " %"
    return formattedHour
}
function getPressureString(pressure: number): string {
    switch(localStorage.getItem("unitPressure")) {
        case "hpa":
            return round(pressure, 0) + " hPa"
        case "bar":
            return round(pressure / 1000, 2) + " bar"
        case "at":
            return round(pressure / 1013.2501, 2) + " at"
        default:
            return round(pressure, 0) + " hPa"        
    }
}
function getVisibilityString(vis: number): string {
    switch(localStorage.getItem("unitVis")) {
        case "km":
            return round(vis, 1) + " km"
        case "miles":
            return round(vis / 1.609, 1) + " miles"
        default:
            return round(vis, 1) + " km"         
    }
}
function getWindDirString(dir: number): string {
    if(isBetween(dir, 337.5, 360) || isBetween(dir, 0, 22.5)) return Strings.N
    if(isBetween(dir, 22.5, 67.5)) return Strings.NE
    if(isBetween(dir, 67.5, 112.5)) return Strings.E
    if(isBetween(dir, 112.5, 157.5)) return Strings.SE
    if(isBetween(dir, 157.5, 202.5)) return Strings.S
    if(isBetween(dir, 202.5, 247.5)) return Strings.SW
    if(isBetween(dir, 247.5, 292.5)) return Strings.W
    if(isBetween(dir, 292.5, 337.5)) return Strings.NW
    return Strings.NA
}
function getWindString(wind: number): string {
    switch(localStorage.getItem("unitWind")) {
        case "ms":
            return round(wind, 1) + " m/s"
        case "kmh":
            return round(wind * 3.6, 1) + " km/h"
        case "mph":
            return round(wind * 2.237, 1) + " mph"
        case "kts":
            return round(wind * 1.944, 1) + " kts"
        case "b":
            if (wind < 0.3) return "0 B";
            else if (wind >= 0.3 && wind < 1.6) return "1 B";
            else if (wind >= 1.6 && wind < 3.4) return "2 B";
            else if (wind >= 3.4 && wind < 5.5) return "3 B";
            else if (wind >= 5.5 && wind < 8) return "4 B";
            else if (wind >= 8 && wind < 10.8) return "5 B";
            else if (wind >= 10.8 && wind < 13.9) return "6 B";
            else if (wind >= 13.9 && wind < 17.2) return "7 B";
            else if (wind >= 17.2 && wind < 20.8) return "8 B";
            else if (wind >= 20.8 && wind < 24.5) return "9 B";
            else if (wind >= 24.5 && wind < 28.5) return "10 B";
            else if (wind >= 28.5 && wind < 32.7) return "11 B";
            else if (wind >= 32.7) return "12 B";
            else return "0 B";
        default:
            return round(wind, 2) + "m/s"        
    }
}
function getPrecString(prec: number): string {
    switch(localStorage.getItem("unitPrec")) {
        case "mmh":
            return round(prec, 0) + " mm/h"
        case "cmh":
            return round(prec / 10, 2) + " cm/h"
        case "inh":
            return round(prec / 25.4, 2) + " in/h"
        default:
            return round(prec, 0) + " mm/h"         
    }
}
function getTemperatureString(tempr: number): string {
    switch(localStorage.getItem("unitTempr")) {
        case "c":
            return round(tempr, 0) + "°"
        case "f":
            return round((1.8 * tempr) + 32, 0) + "°"
        case "k":
            return round(tempr + 273.15, 2) + " K"
        default:
            return round(tempr, 0) + "°"            
    }
}
function getHourString(date: Date): string {
    let minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()


    switch(localStorage.getItem("unitTime")) {
        case "24h": {
            let hours = (date.getHours() < 10 ? "0" : "") + date.getHours()
            return hours + ":" + minutes
        }
        case "12h": {
            let hours = date.getHours()
            const ampm = hours >= 12 ? " pm" : " am"
            hours = hours % 12
            hours = hours ? hours : 12
            return hours + "." + minutes + ampm
        }
        default: {
            let hours = (date.getHours() < 10 ? "0" : "") + date.getHours()
            return hours + ":" + minutes
        }
    }
}
function isBetween(x: number, lower: number, upper: number) {
    return lower <= x && x <= upper
}
function isSameDay(d1: Date, d2: Date) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
}
function round(value: number, precision: number) {
    let multiplier = Math.pow(10, precision || 0)
    return Math.round(value * multiplier) / multiplier
}