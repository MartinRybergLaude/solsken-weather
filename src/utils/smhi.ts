import SunCalc from "suncalc";

import Location from "~/types/location";
import * as WeatherTypesUni from "~/types/rawWeather";
import * as WeatherTypesSMHI from "~/types/smhi";
import {
  precUnits,
  pressureUnits,
  temprUnits,
  timeUnits,
  visUnits,
  windUnits,
} from "~/utils/constants";

import { isSameDayInTimezone } from "./timezone";
import { calcFeelsLike } from "./weatherTransforms";

export function parseWeatherSMHI(
  weatherData: WeatherTypesSMHI.WeatherData,
  location: Location,
): WeatherTypesUni.RawWeather {
  const weatherDataUni = {} as WeatherTypesUni.RawWeather;
  weatherDataUni.city = location.name;
  weatherDataUni.timezone = location.timezone;
  weatherDataUni.days = [];
  weatherDataUni.units = {
    temprUnit: temprUnits.c,
    windUnit: windUnits.ms,
    precUnit: precUnits.mmh,
    pressureUnit: pressureUnits.hpa,
    visUnit: visUnits.km,
    timeUnit: timeUnits.twentyfour,
  };

  weatherDataUni.days = parseDays(
    weatherData.timeSeries,
    location.lon,
    location.lat,
    location.timezone,
  );

  return weatherDataUni;
}
function parseDays(
  times: WeatherTypesSMHI.TimeSery[],
  lon: number,
  lat: number,
  tz: string,
): WeatherTypesUni.Day[] {
  const days = [];
  let iterationDate = new Date(0);

  // Iterate each day
  for (const time1 of times) {
    if (isSameDayInTimezone(new Date(time1.time), iterationDate, tz)) continue;

    const iterationDay = {} as WeatherTypesUni.Day;
    iterationDay.hours = [];
    iterationDate = new Date(time1.time);

    // Set sunrise and sunset
    iterationDay.date = time1.time;
    const sunTimes = SunCalc.getTimes(new Date(iterationDay.date), lat, lon);
    iterationDay.sunrise = sunTimes.sunrise;
    iterationDay.sunset = sunTimes.sunset;

    // Iterate each hour
    for (const time2 of times) {
      if (isSameDayInTimezone(new Date(time2.time), iterationDate, tz)) {
        iterationDay.hours.push(parseHour(time2, iterationDay.sunrise, iterationDay.sunset));
      }
    }

    // Retrieve all temperatures for the day
    const temprs = iterationDay.hours.map(hour => hour.tempr);

    // Set remaining day params
    iterationDay.tempHigh = Math.max(...temprs);
    iterationDay.tempLow = Math.min(...temprs);
    days.push(iterationDay);
  }
  return days;
}
function parseHour(
  time: WeatherTypesSMHI.TimeSery,
  sunrise: Date,
  sunset: Date,
): WeatherTypesUni.Hour {
  const hour = {} as WeatherTypesUni.Hour;
  const data = time.data;
  hour.date = time.time;
  hour.tempr = data.air_temperature ?? 0;
  hour.precMax = data.precipitation_amount_max ?? 0;
  hour.precMin = data.precipitation_amount_min ?? 0;
  hour.precMean = data.precipitation_amount_mean ?? 0;
  hour.wind = data.wind_speed ?? 0;
  hour.windDir = data.wind_from_direction ?? 0;
  hour.pressure = data.air_pressure_at_mean_sea_level ?? 0;
  hour.vis = data.visibility_in_air ?? 0;
  hour.humidity = data.relative_humidity ?? 0;
  hour.gusts = data.wind_speed_of_gust ?? 0;
  hour.cloud = data.cloud_area_fraction ?? 0;

  if (data.symbol_code !== undefined) {
    const correctedForIndex = data.symbol_code - 1;
    hour.text = WeatherTypesSMHI.TextList[correctedForIndex];
    const t = new Date(hour.date).getTime();
    const isDay = t >= sunrise.getTime() && t <= sunset.getTime();
    if (isDay) {
      hour.icon = WeatherTypesSMHI.IconListDay[correctedForIndex];
    } else {
      hour.icon = WeatherTypesSMHI.IconListNight[correctedForIndex];
    }
  }

  hour.feelslike = calcFeelsLike(hour.tempr, hour.humidity, hour.wind);
  return hour;
}
