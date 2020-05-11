import { temprUnits, windUnits, precUnits, pressureUnits, visUnits, clockUnits } from "./constants";
import { Component } from "react";

export interface WeatherData {
    days: Day[],
    units: Units
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
    text: Text,
    icon: Component,
    hours: Hour[]
}
export interface Hour {
    date: Date,
    tempr: string,
    prec: string,
    wind: string,
    pressure: string,
    vis: string,
    humidity: string,
    gusts: string,
    cloud: string,
    feelslike: string,
    text: string,
    icon: Component
}