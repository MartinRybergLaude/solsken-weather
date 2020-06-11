import { temprUnits, windUnits, precUnits, pressureUnits, visUnits, clockUnits } from "../utils/constants";

export interface WeatherData {
    expires: Date
    days: Day[],
    units: Units,
    lonTwoDecimal: string,
    latTwoDecimal: string,
    city: string
}
export interface Units {
    temprUnit: temprUnits,
    windUnit: windUnits,
    precUnit: precUnits,
    pressureUnit: pressureUnits,
    visUnit: visUnits,
    clockUnit: clockUnits
}
export interface Day {
    date: Date,
    sunrise: Date,
    sunset: Date,
    text: string,
    icon: string,
    tempHigh: number,
    tempLow: number
    hours: Hour[]
}
export interface Hour {
    date: Date,
    tempr: number,
    precMin: number,
    precMax: number,
    precMean: number,
    wind: number,
    windDir: WindDir,
    pressure: number,
    vis: number,
    humidity: number,
    gusts: number,
    cloud: number,
    feelslike: number,
    text: string,
    icon: string
}
export enum WindDir {
    N,
    NE,
    E,
    SE,
    S,
    SW,
    W,
    NW
}
