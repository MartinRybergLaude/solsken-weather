import * as WeatherTypes from 'model/TypesWeather';
import * as FormattedWeatherTypes from './TypesFormattedWeather';
import * as Consts from 'utils/constants'
import i18n from 'i18n'

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
            dayOfWeek = i18n.t("day_today")
        } else if (isSameDay(new Date(day.date), tomorrow)) {
            dayOfWeek = i18n.t("day_tomorrow")
        } else {
            dayOfWeek = Consts.Days[new Date(day.date).getDay()];
        }
        formattedDay.dayOfWeek = dayOfWeek
        formattedDay.sunrise = getHourString(data.units.timeUnit, new Date(day.sunrise))
        formattedDay.sunset = getHourString(data.units.timeUnit, new Date(day.sunset))
        formattedDay.icon = day.icon
        formattedDay.text = day.text
        formattedDay.tempHigh = getTemperatureString(data.units.temprUnit, day.tempHigh)
        formattedDay.tempLow = getTemperatureString(data.units.temprUnit, day.tempLow)

        day.hours.forEach(hour => {
            formattedDay.hours.push(parseHour(hour))
        });
        formattedData.days.push(formattedDay)
    }
    return formattedData

    function parseHour(hour: WeatherTypes.Hour): FormattedWeatherTypes.Hour {
        let formattedHour = {} as FormattedWeatherTypes.Hour
        formattedHour.hour = getHourString(data.units.timeUnit, new Date(hour.date))
        formattedHour.text = hour.text
        formattedHour.icon = hour.icon
        formattedHour.tempr = getTemperatureString(data.units.temprUnit, hour.tempr)
        formattedHour.feelslike = getTemperatureString(data.units.temprUnit, hour.feelslike)
        formattedHour.precMean = getPrecString(data.units.precUnit, hour.precMean)
        formattedHour.wind = getWindString(data.units.windUnit, hour.wind)
        formattedHour.gusts = getWindString(data.units.windUnit, hour.gusts)
        formattedHour.windDir = getWindDirString(hour.windDir)
        formattedHour.windDirDeg = hour.windDir.toString()
        formattedHour.humidity = hour.humidity + "%"
        formattedHour.vis = getVisibilityString(data.units.visUnit, hour.vis)
        formattedHour.pressure = getPressureString(data.units.pressureUnit, hour.pressure)
        formattedHour.cloud = hour.cloud + "%"
        return formattedHour
    }
}

function getPressureString(unitPressure: string, pressure: number): string {
    switch(unitPressure) {
        case Consts.pressureUnits.hpa:
            return pressure + " hPa"
        case Consts.pressureUnits.bar:
            return pressure + " bar"
        case Consts.pressureUnits.at:
            return pressure + " at"
        default:
            return pressure + " hPa"        
    }
}
function getVisibilityString(unitVis: string, vis: number): string {
    switch(unitVis) {
        case Consts.visUnits.km:
            return vis + " km"
        case Consts.visUnits.miles:
            return vis + " miles"
        default:
            return vis + " km"         
    }
}
function getWindDirString(dir: number): string {
    if(isBetween(dir, 337.5, 360) || isBetween(dir, 0, 22.5)) return i18n.t("dir_N")
    if(isBetween(dir, 22.5, 67.5)) return i18n.t("dir_NE")
    if(isBetween(dir, 67.5, 112.5)) return i18n.t("dir_E")
    if(isBetween(dir, 112.5, 157.5)) return i18n.t("dir_SE")
    if(isBetween(dir, 157.5, 202.5)) return i18n.t("dir_S")
    if(isBetween(dir, 202.5, 247.5)) return i18n.t("dir_SW")
    if(isBetween(dir, 247.5, 292.5)) return i18n.t("dir_W")
    if(isBetween(dir, 292.5, 337.5)) return i18n.t("dir_NW")
    return i18n.t("text_NA")
}
function getWindString(unitWind: string, wind: number): string {
    switch(unitWind) {
        case Consts.windUnits.ms:
            return wind + " m/s"
        case Consts.windUnits.kmh:
            return wind + " km/h"
        case Consts.windUnits.mph:
            return wind + " mph"
        case Consts.windUnits.kts:
            return wind + " kts"
        case Consts.windUnits.b:
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
            return wind + "m/s"        
    }
}
function getPrecString(unitPrec: string, prec: number): string {
    switch(unitPrec) {
        case Consts.precUnits.mmh:
            return prec + " mm/h"
        case Consts.precUnits.cmh:
            return prec + " cm/h"
        case Consts.precUnits.inh:
            return prec + " in/h"
        default:
            return prec + " mm/h"         
    }
}
function getTemperatureString(unitTempr: string, tempr: number): string {
    switch(unitTempr) {
        case Consts.temprUnits.c:
            return tempr + "°"
        case Consts.temprUnits.f:
            return tempr + "°"
        case Consts.temprUnits.k:
            return tempr + " K"
        default:
            return tempr + "°"            
    }
}
function getHourString(unitTime: string, date: Date): string {
    let minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()


    switch(unitTime) {
        case "twentyfour": {
            let hours = (date.getHours() < 10 ? "0" : "") + date.getHours()
            return hours + ":" + minutes
        }
        case "twelve": {
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