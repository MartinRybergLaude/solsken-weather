import { ReactNode } from "react";

import { WeatherIconEnum } from "~/enums/WeatherIcon";

import { Theme } from "./themes";

export interface FormattedWeather {
  days: Day[];
  city: string;
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
