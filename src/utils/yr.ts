import i18n from "i18n";
import SunCalc from "suncalc";

import {
  precUnits,
  pressureUnits,
  temprUnits,
  timeUnits,
  visUnits,
  windUnits,
} from "utils/constants";

import { WeatherIconEnum } from "~/enums/WeatherIcon";
import * as WeatherTypesUni from "~/types/rawWeather";
import * as WeatherTypesYR from "~/types/yr";

import { calcFeelsLike, isSameDay } from "./weatherTransforms";

export function parseWeatherYR(
  weatherData: WeatherTypesYR.WeatherData,
  lon: number,
  lat: number,
  city: string,
): WeatherTypesUni.RawWeather {
  const weatherDataUni = {} as WeatherTypesUni.RawWeather;
  weatherDataUni.city = city;
  weatherDataUni.days = [];
  weatherDataUni.units = {
    temprUnit: temprUnits.c,
    windUnit: windUnits.ms,
    precUnit: precUnits.mmh,
    pressureUnit: pressureUnits.hpa,
    visUnit: visUnits.km,
    timeUnit: timeUnits.twentyfour,
  };

  weatherDataUni.days = parseDays(weatherData.properties.timeseries, lon, lat);

  return weatherDataUni;
}

function parseDays(
  times: WeatherTypesYR.Timesery[],
  lon: number,
  lat: number,
): WeatherTypesUni.Day[] {
  const days = [];
  let iterationDate = new Date(0);

  // Iterate each day
  for (let i = 0; i < times.length; i++) {
    if (isSameDay(new Date(times[i].time), new Date(iterationDate))) continue;

    const iterationDay = {} as WeatherTypesUni.Day;
    iterationDay.hours = [];
    iterationDate = times[i].time;

    // Set sunrise sunset
    iterationDay.date = times[i].time;
    const sunTimes = SunCalc.getTimes(new Date(iterationDay.date), lat, lon);
    iterationDay.sunrise = sunTimes.sunrise;
    iterationDay.sunset = sunTimes.sunset;

    iterationDay.icon = getDayIcon(times[i]);

    const twelveHour = times.find(hour => new Date(hour.time).getHours() == 12);
    if (twelveHour) {
      const dayNightIcons = [getDayIcon(twelveHour), iterationDay.icon];
      iterationDay.icon = Math.max(...dayNightIcons);
    }

    // Iterate each hour
    for (const time2 of times) {
      if (isSameDay(new Date(time2.time), new Date(iterationDate))) {
        iterationDay.hours.push(parseHour(time2, iterationDay.sunrise, iterationDay.sunset));
      }
    }

    // Retrieve all temperatures for the day
    const temprs: number[] = [];
    iterationDay.hours.forEach(hour => {
      temprs.push(hour.tempr);
    });

    // Set remaining day params
    iterationDay.tempHigh = Math.max(...temprs);
    iterationDay.tempLow = Math.min(...temprs);
    days.push(iterationDay);
  }
  return days;
}
function parseHour(
  time: WeatherTypesYR.Timesery,
  sunrise: Date,
  sunset: Date,
): WeatherTypesUni.Hour {
  const hour = {} as WeatherTypesUni.Hour;
  hour.date = time.time;
  hour.tempr = time.data.instant.details.air_temperature;
  if (time.data.next_1_hours?.details.precipitation_amount_max != null)
    hour.precMax = time.data.next_1_hours.details.precipitation_amount_max;
  if (time.data.next_1_hours?.details.precipitation_amount_min != null)
    hour.precMin = time.data.next_1_hours.details.precipitation_amount_min;
  if (time.data.next_1_hours?.details.precipitation_amount != null)
    hour.precMean = time.data.next_1_hours.details.precipitation_amount;
  hour.wind = time.data.instant.details.wind_speed;
  hour.gusts = time.data.instant.details.wind_speed_of_gust;
  hour.windDir = Math.round(time.data.instant.details.wind_from_direction);
  hour.pressure = time.data.instant.details.air_pressure_at_sea_level;
  hour.fog = time.data.instant.details.fog_area_fraction;
  hour.humidity = time.data.instant.details.relative_humidity;
  hour.cloud = time.data.instant.details.cloud_area_fraction;
  hour.feelslike = calcFeelsLike(hour.tempr, hour.humidity, hour.wind);
  const symbol = time.data.next_1_hours?.summary.symbol_code;
  if (symbol == null) {
    hour.icon = WeatherIconEnum.NOT_AVAILABLE;
    hour.text = "N/A";
  } else if (symbol.startsWith("clearsky")) {
    if (
      new Date(hour.date).getHours() >= new Date(sunrise).getHours() &&
      new Date(hour.date).getHours() <= new Date(sunset).getHours()
    ) {
      hour.icon = WeatherIconEnum.CLEAR_DAY;
    } else {
      hour.icon = WeatherIconEnum.CLEAR_NIGHT;
    }
    hour.text = i18n.t("w_clear");
  } else if (symbol === "cloudy") {
    hour.icon = WeatherIconEnum.CLOUDY;
    hour.text = i18n.t("w_cloudy");
  } else if (symbol.startsWith("fair")) {
    if (
      new Date(hour.date).getHours() >= new Date(sunrise).getHours() &&
      new Date(hour.date).getHours() <= new Date(sunset).getHours()
    ) {
      hour.icon = WeatherIconEnum.PARTLY_CLOUDY_DAY;
    } else {
      hour.icon = WeatherIconEnum.PARTLY_CLOUDY_NIGHT;
    }
    hour.text = i18n.t("w_varying_cloudiness");
  } else if (symbol === "fog") {
    hour.icon = WeatherIconEnum.FOG;
    hour.text = i18n.t("w_fog");
  } else if (symbol === "heavyrain") {
    hour.icon = WeatherIconEnum.EXTREME_RAIN;
    hour.text = i18n.t("w_heavy_rain");
  } else if (symbol === "heavyrainandthunder") {
    hour.icon = WeatherIconEnum.THUNDER;
    hour.text = i18n.t("w_thunder");
  } else if (symbol.split("_")[0] === "heavyrainshowers") {
    if (
      new Date(hour.date).getHours() >= new Date(sunrise).getHours() &&
      new Date(hour.date).getHours() <= new Date(sunset).getHours()
    ) {
      hour.icon = WeatherIconEnum.EXTREME_DAY_RAIN;
    } else {
      hour.icon = WeatherIconEnum.EXTREME_NIGHT_RAIN;
    }
    hour.text = i18n.t("w_heavy_rain_showers");
  } else if (symbol.startsWith("heavyrainshowersandthunder")) {
    hour.icon = WeatherIconEnum.THUNDER;
    hour.text = i18n.t("w_thunder");
  } else if (symbol === "heavysleet") {
    hour.icon = WeatherIconEnum.EXTREME_SLEET;
    hour.text = i18n.t("w_heavy_sleet");
  } else if (symbol === "heavysleetandthunder") {
    hour.icon = WeatherIconEnum.THUNDER;
    hour.text = i18n.t("w_thunder");
  } else if (symbol.split("_")[0] === "heavysleetshowers") {
    if (
      new Date(hour.date).getHours() >= new Date(sunrise).getHours() &&
      new Date(hour.date).getHours() <= new Date(sunset).getHours()
    ) {
      hour.icon = WeatherIconEnum.EXTREME_SLEET;
    } else {
      hour.icon = WeatherIconEnum.EXTREME_SLEET;
    }
    hour.text = i18n.t("w_heavy_sleet_showers");
  } else if (symbol.startsWith("heavysleetshowersandthunder")) {
    hour.icon = WeatherIconEnum.THUNDER;
    hour.text = i18n.t("w_thunder");
  } else if (symbol === "heavysnow") {
    hour.icon = WeatherIconEnum.EXTREME_SNOW;
    hour.text = i18n.t("w_heavy_snow");
  } else if (symbol === "heavysnowandthunder") {
    hour.icon = WeatherIconEnum.EXTREME_SNOW;
    hour.text = i18n.t("w_thunder");
  } else if (symbol.split("_")[0] === "heavysnowshowers") {
    if (
      new Date(hour.date).getHours() >= new Date(sunrise).getHours() &&
      new Date(hour.date).getHours() <= new Date(sunset).getHours()
    ) {
      hour.icon = WeatherIconEnum.EXTREME_SNOW;
    } else {
      hour.icon = WeatherIconEnum.EXTREME_SNOW;
    }
    hour.text = i18n.t("w_heavy_snow_showers");
  } else if (symbol.startsWith("heavysnowshowersandthunder")) {
    hour.icon = WeatherIconEnum.THUNDER;
    hour.text = i18n.t("w_thunder");
  } else if (symbol === "lightrain") {
    hour.icon = WeatherIconEnum.RAIN;
    hour.text = i18n.t("w_light_rain");
  } else if (symbol === "lightrainandthunder") {
    hour.icon = WeatherIconEnum.THUNDER;
    hour.text = i18n.t("w_thunder");
  } else if (symbol.split("_")[0] === "lightrainshowers") {
    if (
      new Date(hour.date).getHours() >= new Date(sunrise).getHours() &&
      new Date(hour.date).getHours() <= new Date(sunset).getHours()
    ) {
      hour.icon = WeatherIconEnum.PARTLY_CLOUDY_DAY_RAIN;
    } else {
      hour.icon = WeatherIconEnum.PARTLY_CLOUDY_NIGHT_RAIN;
    }
    hour.text = i18n.t("w_light_rain_showers");
  } else if (symbol.startsWith("lightrainshowersandthunder")) {
    hour.icon = WeatherIconEnum.THUNDER;
    hour.text = i18n.t("w_thunder");
  } else if (symbol === "lightsleet") {
    hour.icon = WeatherIconEnum.SLEET;
    hour.text = i18n.t("w_light_sleet");
  } else if (symbol === "lightsleetandthunder") {
    hour.icon = WeatherIconEnum.THUNDER;
    hour.text = i18n.t("w_thunder");
  } else if (symbol.split("_")[0] === "lightsleetshowers") {
    if (
      new Date(hour.date).getHours() >= new Date(sunrise).getHours() &&
      new Date(hour.date).getHours() <= new Date(sunset).getHours()
    ) {
      hour.icon = WeatherIconEnum.PARTLY_CLOUDY_DAY_SLEET;
    } else {
      hour.icon = WeatherIconEnum.PARTLY_CLOUDY_NIGHT_SLEET;
    }
    hour.text = i18n.t("w_light_sleet_showers");
  } else if (symbol.startsWith("lightssleetshowersandthunder")) {
    hour.icon = WeatherIconEnum.THUNDER;
    hour.text = i18n.t("w_thunder");
  } else if (symbol === "lightsnow") {
    hour.icon = WeatherIconEnum.SNOW;
    hour.text = i18n.t("w_light_snow");
  } else if (symbol === "lightsnowandthunder") {
    hour.icon = WeatherIconEnum.THUNDER;
    hour.text = i18n.t("w_thunder");
  } else if (symbol.split("_")[0] === "lightsnowshowers") {
    if (
      new Date(hour.date).getHours() >= new Date(sunrise).getHours() &&
      new Date(hour.date).getHours() <= new Date(sunset).getHours()
    ) {
      hour.icon = WeatherIconEnum.PARTLY_CLOUDY_DAY_SNOW;
    } else {
      hour.icon = WeatherIconEnum.PARTLY_CLOUDY_NIGHT_SNOW;
    }
    hour.text = i18n.t("w_light_snow_showers");
  } else if (symbol.startsWith("lightssnowshowersandthunder")) {
    hour.icon = WeatherIconEnum.THUNDER;
    hour.text = i18n.t("w_thunder");
  } else if (symbol.startsWith("partlycloudy")) {
    if (
      new Date(hour.date).getHours() >= new Date(sunrise).getHours() &&
      new Date(hour.date).getHours() <= new Date(sunset).getHours()
    ) {
      hour.icon = WeatherIconEnum.PARTLY_CLOUDY_DAY;
    } else {
      hour.icon = WeatherIconEnum.PARTLY_CLOUDY_NIGHT;
    }
    hour.text = i18n.t("w_varying_cloudiness");
  } else if (symbol === "rain") {
    hour.icon = WeatherIconEnum.RAIN;
    hour.text = i18n.t("w_moderate_rain");
  } else if (symbol === "rainandthunder") {
    hour.icon = WeatherIconEnum.THUNDER;
    hour.text = i18n.t("w_thunder");
  } else if (symbol.split("_")[0] === "rainshowers") {
    if (
      new Date(hour.date).getHours() >= new Date(sunrise).getHours() &&
      new Date(hour.date).getHours() <= new Date(sunset).getHours()
    ) {
      hour.icon = WeatherIconEnum.OVERCAST_DAY_RAIN;
    } else {
      hour.icon = WeatherIconEnum.OVERCAST_NIGHT_RAIN;
    }
    hour.text = i18n.t("w_moderate_rain");
  } else if (symbol.startsWith("rainshowersandthunder")) {
    hour.icon = WeatherIconEnum.THUNDER;
    hour.text = i18n.t("w_thunder");
  } else if (symbol === "sleet") {
    hour.icon = WeatherIconEnum.SLEET;
    hour.text = i18n.t("w_moderate_sleet");
  } else if (symbol === "sleetandthunder") {
    hour.icon = WeatherIconEnum.THUNDER;
    hour.text = i18n.t("w_thunder");
  } else if (symbol.split("_")[0] === "sleetshowers") {
    if (
      new Date(hour.date).getHours() >= new Date(sunrise).getHours() &&
      new Date(hour.date).getHours() <= new Date(sunset).getHours()
    ) {
      hour.icon = WeatherIconEnum.OVERCAST_DAY_SLEET;
    } else {
      hour.icon = WeatherIconEnum.OVERCAST_NIGHT_SLEET;
    }
    hour.text = i18n.t("w_moderate_sleet_showers");
  } else if (symbol.startsWith("sleetshowersandthunder")) {
    hour.icon = WeatherIconEnum.THUNDER;
    hour.text = i18n.t("w_thunder");
  } else if (symbol === "snow") {
    hour.icon = WeatherIconEnum.OVERCAST_SNOW;
    hour.text = i18n.t("w_moderate_snow");
  } else if (symbol === "snowandthunder") {
    hour.icon = WeatherIconEnum.THUNDER;
    hour.text = i18n.t("w_thunder");
  } else if (symbol.split("_")[0] === "snowshowers") {
    if (
      new Date(hour.date).getHours() >= new Date(sunrise).getHours() &&
      new Date(hour.date).getHours() <= new Date(sunset).getHours()
    ) {
      hour.icon = WeatherIconEnum.OVERCAST_DAY_SNOW;
    } else {
      hour.icon = WeatherIconEnum.OVERCAST_NIGHT_SNOW;
    }
    hour.text = i18n.t("w_moderate_snow_showers");
  } else if (symbol.startsWith("snowshowersandthunder")) {
    hour.icon = WeatherIconEnum.THUNDER;
    hour.text = i18n.t("w_thunder");
  } else {
    hour.icon = WeatherIconEnum.NOT_AVAILABLE;
    hour.text = "N/A";
  }
  return hour;
}
function getDayIcon(time: WeatherTypesYR.Timesery): WeatherIconEnum {
  const symbol = time.data.next_12_hours?.summary.symbol_code;
  if (symbol == null) return WeatherIconEnum.NOT_AVAILABLE;
  if (symbol.startsWith("clearsky")) {
    return WeatherIconEnum.CLEAR_DAY;
  } else if (symbol === "cloudy") {
    return WeatherIconEnum.CLOUDY;
  } else if (symbol.startsWith("fair")) {
    return WeatherIconEnum.PARTLY_CLOUDY_DAY;
  } else if (symbol === "fog") {
    return WeatherIconEnum.FOG;
  } else if (symbol === "heavyrain") {
    return WeatherIconEnum.EXTREME_RAIN;
  } else if (symbol === "heavyrainandthunder") {
    return WeatherIconEnum.THUNDER;
  } else if (symbol.split("_")[0] === "heavyrainshowers") {
    return WeatherIconEnum.EXTREME_DAY_RAIN;
  } else if (symbol.startsWith("heavyrainshowersandthunder")) {
    return WeatherIconEnum.THUNDER;
  } else if (symbol === "heavysleet") {
    return WeatherIconEnum.EXTREME_SLEET;
  } else if (symbol === "heavysleetandthunder") {
    return WeatherIconEnum.THUNDER;
  } else if (symbol.split("_")[0] === "heavysleetshowers") {
    return WeatherIconEnum.EXTREME_DAY_SLEET;
  } else if (symbol.startsWith("heavysleetshowersandthunder")) {
    return WeatherIconEnum.THUNDER;
  } else if (symbol === "heavysnow") {
    return WeatherIconEnum.EXTREME_SNOW;
  } else if (symbol === "heavysnowandthunder") {
    return WeatherIconEnum.THUNDER;
  } else if (symbol.split("_")[0] === "heavysnowshowers") {
    return WeatherIconEnum.EXTREME_DAY_SNOW;
  } else if (symbol.startsWith("heavysnowshowersandthunder")) {
    return WeatherIconEnum.THUNDER;
  } else if (symbol === "lightrain") {
    return WeatherIconEnum.RAIN;
  } else if (symbol === "lightrainandthunder") {
    return WeatherIconEnum.THUNDER;
  } else if (symbol.split("_")[0] === "lightrainshowers") {
    return WeatherIconEnum.PARTLY_CLOUDY_DAY_RAIN;
  } else if (symbol.startsWith("lightrainshowersandthunder")) {
    return WeatherIconEnum.THUNDER;
  } else if (symbol === "lightsleet") {
    return WeatherIconEnum.SLEET;
  } else if (symbol === "lightsleetandthunder") {
    return WeatherIconEnum.THUNDER;
  } else if (symbol.split("_")[0] === "lightsleetshowers") {
    return WeatherIconEnum.PARTLY_CLOUDY_DAY_SLEET;
  } else if (symbol.startsWith("lightssleetshowersandthunder")) {
    return WeatherIconEnum.THUNDER;
  } else if (symbol === "lightsnow") {
    return WeatherIconEnum.SNOW;
  } else if (symbol === "lightsnowandthunder") {
    return WeatherIconEnum.THUNDER;
  } else if (symbol.split("_")[0] === "lightsnowshowers") {
    return WeatherIconEnum.PARTLY_CLOUDY_DAY_SNOW;
  } else if (symbol.startsWith("lightssnowshowersandthunder")) {
    return WeatherIconEnum.THUNDER;
  } else if (symbol.startsWith("partlycloudy")) {
    return WeatherIconEnum.PARTLY_CLOUDY_DAY;
  } else if (symbol === "rain") {
    return WeatherIconEnum.OVERCAST_RAIN;
  } else if (symbol === "rainandthunder") {
    return WeatherIconEnum.THUNDER;
  } else if (symbol.split("_")[0] === "rainshowers") {
    return WeatherIconEnum.OVERCAST_RAIN;
  } else if (symbol.startsWith("rainshowersandthunder")) {
    return WeatherIconEnum.THUNDER;
  } else if (symbol === "sleet") {
    return WeatherIconEnum.OVERCAST_SLEET;
  } else if (symbol === "sleetandthunder") {
    return WeatherIconEnum.THUNDER;
  } else if (symbol.split("_")[0] === "sleetshowers") {
    return WeatherIconEnum.OVERCAST_DAY_SLEET;
  } else if (symbol.startsWith("sleetshowersandthunder")) {
    return WeatherIconEnum.THUNDER;
  } else if (symbol === "snow") {
    return WeatherIconEnum.OVERCAST_SNOW;
  } else if (symbol === "snowandthunder") {
    return WeatherIconEnum.THUNDER;
  } else if (symbol.split("_")[0] === "snowshowers") {
    return WeatherIconEnum.OVERCAST_DAY_SNOW;
  } else if (symbol.startsWith("snowshowersandthunder")) {
    return WeatherIconEnum.THUNDER;
  } else {
    return WeatherIconEnum.NOT_AVAILABLE;
  }
}
