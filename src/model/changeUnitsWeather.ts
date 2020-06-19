import { WeatherData, Day, Hour } from "./TypesWeather";
import { getItem } from 'model/utilsStorage'
import * as Consts from 'utils/constants'

export default async function changeUnitsWeather(weatherDataImported: WeatherData): Promise<WeatherData> {
    const weatherData: WeatherData = JSON.parse(JSON.stringify(weatherDataImported))
    
    let unitTempr = getItem("unitTempr")
    let unitWind = getItem("unitWind")
    let unitPrec = getItem("unitPrec")
    let unitPressure = getItem("unitPressure")
    let unitVis = getItem("unitVis")
    let unitTime = getItem("unitTime")

    if (!unitTempr) unitTempr = Consts.temprUnits.c
    if (!unitWind) unitWind = Consts.windUnits.ms
    if (!unitPrec) unitPrec = Consts.precUnits.mmh
    if (!unitPressure) unitPressure = Consts.pressureUnits.hpa
    if (!unitVis) unitVis = Consts.visUnits.km
    if (!unitTime) unitTime = Consts.timeUnits.twentyfour

    const unitTemprEnum = unitTempr as keyof typeof Consts.temprUnits
    const unitWindEnum = unitWind as keyof typeof Consts.windUnits
    const unitPrecEnum = unitPrec as keyof typeof Consts.precUnits
    const unitPressureEnum = unitPressure as keyof typeof Consts.pressureUnits
    const unitVisEnum = unitVis as keyof typeof Consts.visUnits
    const unitTimeEnum = unitTime as keyof typeof Consts.timeUnits

    weatherData.units = {
        temprUnit: Consts.temprUnits[unitTemprEnum],
        windUnit: Consts.windUnits[unitWindEnum],
        precUnit: Consts.precUnits[unitPrecEnum],
        pressureUnit: Consts.pressureUnits[unitPressureEnum],
        visUnit: Consts.visUnits[unitVisEnum],
        timeUnit: Consts.timeUnits[unitTimeEnum]
    }
    
    weatherData.days.forEach(day => {
        day = changeUnitsDay(day)
        day.hours.forEach(hour => {
            hour = changeUnitsHour(hour)
        });
    });

    return weatherData

    function changeUnitsDay(day: Day): Day {
        day.tempLow = changeTemprUnit(unitTempr, day.tempLow)
        day.tempHigh = changeTemprUnit(unitTempr, day.tempHigh)
        return day
    } 
    function changeUnitsHour(hour: Hour): Hour {
        hour.tempr = changeTemprUnit(unitTempr, hour.tempr)
        hour.feelslike = changeTemprUnit(unitTempr, hour.feelslike)
        hour.wind = changeWindUnit(unitWind, hour.wind)
        hour.gusts = changeWindUnit(unitWind, hour.gusts)
        hour.precMax = changePrecUnit(unitPrec, hour.precMax)
        hour.precMin = changePrecUnit(unitPrec, hour.precMin)
        hour.precMean = changePrecUnit(unitPrec, hour.precMean)
        hour.pressure = changePressureUnit(unitPressure, hour.pressure)
        hour.vis = changeVisUnit(unitVis, hour.vis)
        return hour
    }
}
function changeVisUnit(unitVis: string | null, vis: number): number {
    switch(unitVis) {
        case Consts.visUnits.km:
            return round(vis, 1)
        case Consts.visUnits.miles:
            return round(vis / 1.609, 1)
        default:
            return round(vis, 1)        
    }
}
function changePressureUnit(unitPressure: string | null, pressure: number): number {
    switch(unitPressure) {
        case Consts.pressureUnits.hpa:
            return round(pressure, 1)
        case Consts.pressureUnits.bar:
            return round(pressure / 1000, 2)
        case Consts.pressureUnits.at:
            return round(pressure / 1013.2501, 2)
        default:
            return round(pressure, 1)      
    }
}
function changePrecUnit(unitPrec: string | null, prec: number): number {
    switch(unitPrec) {
        case Consts.precUnits.mmh:
            return round(prec, 1)
        case Consts.precUnits.cmh:
            return round(prec / 10, 2)
        case Consts.precUnits.inh:
            return round(prec / 25.4, 2)
        default:
            return round(prec, 1)        
    }
}
function changeWindUnit(unitWind: string | null, wind: number): number {
    switch(unitWind) {
        case Consts.windUnits.ms:
            return round(wind, 1)
        case Consts.windUnits.kmh:
            return round(wind * 3.6, 1)
        case Consts.windUnits.mph:
            return round(wind * 2.237, 1)
        case Consts.windUnits.kts:
            return round(wind * 1.944, 1)
        case Consts.windUnits.b:
            if (wind < 0.3) return 0;
            else if (wind >= 0.3 && wind < 1.6) return 1;
            else if (wind >= 1.6 && wind < 3.4) return 2;
            else if (wind >= 3.4 && wind < 5.5) return 3;
            else if (wind >= 5.5 && wind < 8) return 4;
            else if (wind >= 8 && wind < 10.8) return 5;
            else if (wind >= 10.8 && wind < 13.9) return 6;
            else if (wind >= 13.9 && wind < 17.2) return 7;
            else if (wind >= 17.2 && wind < 20.8) return 8;
            else if (wind >= 20.8 && wind < 24.5) return 9;
            else if (wind >= 24.5 && wind < 28.5) return 10;
            else if (wind >= 28.5 && wind < 32.7) return 11;
            else if (wind >= 32.7) return 12;
            else return 0;
        default:
            return round(wind, 1)              
        
    }
}
function changeTemprUnit(unitTempr: string | null, tempr: number): number {
    switch(unitTempr) {
        case Consts.temprUnits.c:
            return round(tempr, 0)
        case Consts.temprUnits.f:
            return round((1.8 * tempr) + 32, 0)
        case Consts.temprUnits.k:
            return round(tempr + 273.15, 2)
        default:
            return round(tempr, 0)
    }
}
function round(value: number, precision: number) {
    let multiplier = Math.pow(10, precision || 0)
    return Math.round(value * multiplier) / multiplier
}
