import { StringMap } from "i18next";

import { WeatherIconEnum } from "~/enums/WeatherIcon";

import { Theme } from "./themes";

export interface FormattedWeather {
  days: Day[];
  city: string;
  chartHours: ChartHour[];
}
export interface Day {
  dayOfWeek: string;
  sunrise: string;
  sunset: string;
  text: string;
  icon: WeatherIconEnum;
  tempHigh: string;
  tempLow: string;
  hours: Hour[];
}

export interface ChartHour {
  hour: number;
  hourText: string;
  tempr: number;
  feelslike: number;
  wind: number;
  gusts: number;
  windDir: number;
  humidity: number;
  pressure: number;
  precMean: number;
  precMax: number | null;
  icon: WeatherIconEnum;
}
export interface Hour {
  hour: string;
  tempr: string;
  precMean: string;
  wind: string;
  windDir: string;
  windDirDeg: string;
  pressure: string;
  vis: string;
  fog: string;
  humidity: string;
  gusts: string;
  cloud: string;
  feelslike: string;
  text: string;
  icon: WeatherIconEnum;
  theme: Theme;
}
