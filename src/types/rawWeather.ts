import { WeatherIconEnum } from "~/enums/WeatherIcon";
import {
  precUnits,
  pressureUnits,
  temprUnits,
  timeUnits,
  visUnits,
  windUnits,
} from "~/utils/constants";

export interface RawWeather {
  days: Day[];
  units: Units;
  city: string;
}
export interface Units {
  temprUnit: temprUnits;
  windUnit: windUnits;
  precUnit: precUnits;
  pressureUnit: pressureUnits;
  visUnit: visUnits;
  timeUnit: timeUnits;
}
export interface Day {
  date: Date;
  sunrise: Date;
  sunset: Date;
  text: string;
  tempHigh: number;
  tempLow: number;
  hours: Hour[];
}
export interface Hour {
  date: Date;
  tempr: number;
  precMin: number;
  precMax: number;
  precMean: number;
  wind: number;
  windDir: WindDir;
  pressure: number;
  vis: number;
  fog: number;
  humidity: number;
  gusts: number;
  cloud: number;
  feelslike: number;
  text: string;
  icon: WeatherIconEnum;
}
export enum WindDir {
  N,
  NE,
  E,
  SE,
  S,
  SW,
  W,
  NW,
}
