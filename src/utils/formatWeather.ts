import i18n from "i18n";

import * as Consts from "utils/constants";

import { WeatherIconEnum } from "~/enums/WeatherIcon";
import * as FormattedWeather from "~/types/formattedWeather";
import * as RawWeather from "~/types/rawWeather";
import { Theme } from "~/types/themes";

import { getHourString } from "./getHourString";

export default function formatWeather(
  data: RawWeather.RawWeather,
): FormattedWeather.FormattedWeather {
  const formattedData = {} as FormattedWeather.FormattedWeather;
  formattedData.city = data.city.split(" ")[0];
  formattedData.chartHours = [];
  formattedData.days = [];
  for (const day of data.days) {
    if (formattedData.chartHours.length < 24) {
      for (const hour of day.hours) {
        if (formattedData.chartHours.length < 24) {
          const chartHour: FormattedWeather.ChartHour = {
            hour: hour.tempr,
            hourText: getHourString(data.units.timeUnit, new Date(hour.date)),
            tempr: hour.tempr,
            feelslike: hour.feelslike,
            wind: hour.wind,
            gusts: hour.gusts,
            windDir: hour.windDir,
            humidity: hour.humidity,
            precMax: hour.precMax,
            precMean: hour.precMean,
            icon: hour.icon,
            pressure: hour.pressure,
          };
          formattedData.chartHours.push(chartHour);
        }
      }
    }

    const formattedDay = {} as FormattedWeather.Day;
    formattedDay.hours = [];
    formattedDay.chartHours = [];
    // Handle day of week
    let dayOfWeek = {} as string;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (isSameDay(new Date(day.date), new Date())) {
      dayOfWeek = i18n.t("day_today");
    } else if (isSameDay(new Date(day.date), tomorrow)) {
      dayOfWeek = i18n.t("day_tomorrow");
    } else {
      dayOfWeek = Consts.Days[new Date(day.date).getDay()];
    }
    formattedDay.dayOfWeek = dayOfWeek;
    formattedDay.sunrise = getHourString(data.units.timeUnit, new Date(day.sunrise));
    formattedDay.sunset = getHourString(data.units.timeUnit, new Date(day.sunset));
    formattedDay.icon = day.icon || getDayIcon(day);
    formattedDay.text = day.text;
    formattedDay.tempHigh = getTemperatureString(data.units.temprUnit, day.tempHigh);
    formattedDay.tempLow = getTemperatureString(data.units.temprUnit, day.tempLow);
    formattedDay.dateString = formatDate(day.date);

    day.hours.forEach(hour => {
      formattedDay.hours.push(parseHour(hour, day.sunrise, day.sunset));
    });
    day.hours.forEach(hour => {
      formattedDay.chartHours.push({
        hour: hour.tempr,
        hourText: getHourString(data.units.timeUnit, new Date(hour.date)),
        tempr: hour.tempr,
        feelslike: hour.feelslike,
        wind: hour.wind,
        gusts: hour.gusts,
        windDir: hour.windDir,
        humidity: hour.humidity,
        precMax: hour.precMax,
        precMean: hour.precMean,
        icon: hour.icon,
        pressure: hour.pressure,
      });
    });
    formattedData.days.push(formattedDay);
  }
  return formattedData;

  function parseHour(hour: RawWeather.Hour, sunrise: Date, sunset: Date): FormattedWeather.Hour {
    const formattedHour = {} as FormattedWeather.Hour;
    formattedHour.hour = getHourString(data.units.timeUnit, new Date(hour.date));
    formattedHour.text = hour.text;
    formattedHour.icon = hour.icon;
    formattedHour.theme = getTheme(hour.icon, sunrise, sunset);
    if (hour.tempr == null || isNaN(hour.tempr)) formattedHour.tempr = "N/A";
    else formattedHour.tempr = getTemperatureString(data.units.temprUnit, hour.tempr);
    if (hour.feelslike == null || isNaN(hour.feelslike)) formattedHour.feelslike = "N/A";
    else formattedHour.feelslike = getTemperatureString(data.units.temprUnit, hour.feelslike);
    if (hour.precMean == null || isNaN(hour.precMean)) formattedHour.precMean = "N/A";
    else formattedHour.precMean = getPrecString(data.units.precUnit, hour.precMean);
    if (hour.wind == null || isNaN(hour.wind)) formattedHour.wind = "N/A";
    else formattedHour.wind = getWindString(data.units.windUnit, hour.wind);
    if (hour.gusts == null || isNaN(hour.gusts)) formattedHour.gusts = "N/A";
    else formattedHour.gusts = getWindString(data.units.windUnit, hour.gusts);
    if (hour.windDir == null || isNaN(hour.windDir)) formattedHour.windDir = "N/A";
    else formattedHour.windDir = getWindDirString(hour.windDir);
    if (hour.windDir == null || isNaN(hour.windDir)) formattedHour.windDirDeg = "N/A";
    else formattedHour.windDirDeg = hour.windDir.toString();
    if (hour.humidity == null || isNaN(hour.humidity)) formattedHour.humidity = "N/A";
    else formattedHour.humidity = hour.humidity + "%";
    if (hour.vis == null || isNaN(hour.vis)) formattedHour.vis = "N/A";
    else formattedHour.vis = getVisibilityString(data.units.visUnit, hour.vis);
    if (hour.fog == null || isNaN(hour.fog)) formattedHour.fog = "N/A";
    else formattedHour.fog = hour.fog + "%";
    if (hour.pressure == null || isNaN(hour.pressure)) formattedHour.pressure = "N/A";
    else formattedHour.pressure = getPressureString(data.units.pressureUnit, hour.pressure);
    if (hour.cloud == null || isNaN(hour.cloud)) formattedHour.cloud = "N/A";
    else formattedHour.cloud = hour.cloud + "%";
    return formattedHour;
  }
}

function getDayIcon(day: RawWeather.Day): WeatherIconEnum {
  // We only care about hours between these hours
  const hours = day.hours.filter(hour => {
    return isBetween(new Date(hour.date).getHours(), 5, 23);
  });
  // No hours in the span, iterate all hours
  if (hours.length == 0) {
    const icons = day.hours.map(hour => hour.icon);
    return Math.max(...icons);
  } else {
    const icons = hours.map(hour => hour.icon);
    return Math.max(...icons);
  }
}

function getTheme(icon: WeatherIconEnum, sunrise: Date, sunset: Date): Theme {
  // Handle the cloudy case separately since it applies to both day and night
  if (icon === WeatherIconEnum.CLOUDY && dateIsBetween(new Date(), sunrise, sunset)) {
    return "day";
  } else if (icon === WeatherIconEnum.CLOUDY) {
    return "night";
  }
  switch (icon) {
    case WeatherIconEnum.CLEAR_DAY:
    case WeatherIconEnum.PARTLY_CLOUDY_DAY: {
      if (isMorning(sunrise, sunset)) {
        return "morning";
      }
      return "day";
    }
    case WeatherIconEnum.CLEAR_NIGHT:
    case WeatherIconEnum.PARTLY_CLOUDY_NIGHT:
      if (isMorning(sunrise, sunset)) {
        return "morning";
      }
      return "night";
    case WeatherIconEnum.SNOW:
    case WeatherIconEnum.FOG:
    case WeatherIconEnum.PARTLY_CLOUDY_DAY_DRIZZLE:
    case WeatherIconEnum.PARTLY_CLOUDY_DAY_SLEET:
    case WeatherIconEnum.PARTLY_CLOUDY_DAY_SNOW:
    case WeatherIconEnum.PARTLY_CLOUDY_NIGHT_DRIZZLE:
    case WeatherIconEnum.PARTLY_CLOUDY_NIGHT_SLEET:
    case WeatherIconEnum.PARTLY_CLOUDY_NIGHT_SNOW:
    case WeatherIconEnum.DRIZZLE:
    case WeatherIconEnum.RAIN:
    case WeatherIconEnum.SLEET:
    case WeatherIconEnum.OVERCAST:
    case WeatherIconEnum.OVERCAST_DAY_RAIN:
    case WeatherIconEnum.OVERCAST_NIGHT_RAIN:
    case WeatherIconEnum.OVERCAST_DAY_SLEET:
    case WeatherIconEnum.OVERCAST_NIGHT_SLEET:
    case WeatherIconEnum.OVERCAST_DAY_SNOW:
    case WeatherIconEnum.OVERCAST_NIGHT_SNOW:
      return "medium";
    case WeatherIconEnum.EXTREME_DAY_RAIN:
    case WeatherIconEnum.EXTREME_NIGHT_RAIN:
    case WeatherIconEnum.EXTREME_DAY_SLEET:
    case WeatherIconEnum.EXTREME_NIGHT_SLEET:
    case WeatherIconEnum.EXTREME_DAY_SNOW:
    case WeatherIconEnum.EXTREME_NIGHT_SNOW:
    case WeatherIconEnum.EXTREME_RAIN:
    case WeatherIconEnum.EXTREME_SLEET:
    case WeatherIconEnum.EXTREME_SNOW:
    case WeatherIconEnum.OVERCAST_RAIN:
    case WeatherIconEnum.OVERCAST_SLEET:
    case WeatherIconEnum.OVERCAST_SNOW:
    case WeatherIconEnum.THUNDER:
    case WeatherIconEnum.THUNDERSTORMS_DAY:
    case WeatherIconEnum.THUNDERSTORMS_NIGHT:
      return "dark";
    default:
      return "medium";
  }
}

function getPressureString(unitPressure: string, pressure: number): string {
  switch (unitPressure) {
    case Consts.pressureUnits.hpa:
      return pressure + " hPa";
    case Consts.pressureUnits.bar:
      return pressure + " bar";
    case Consts.pressureUnits.at:
      return pressure + " at";
    default:
      return pressure + " hPa";
  }
}
function getVisibilityString(unitVis: string, vis: number): string {
  switch (unitVis) {
    case Consts.visUnits.km:
      return vis + " km";
    case Consts.visUnits.miles:
      return vis + " miles";
    default:
      return vis + " km";
  }
}
function getWindDirString(dir: number): string {
  if (isBetween(dir, 337.5, 360) || isBetween(dir, 0, 22.5)) return i18n.t("dir_N");
  if (isBetween(dir, 22.5, 67.5)) return i18n.t("dir_NE");
  if (isBetween(dir, 67.5, 112.5)) return i18n.t("dir_E");
  if (isBetween(dir, 112.5, 157.5)) return i18n.t("dir_SE");
  if (isBetween(dir, 157.5, 202.5)) return i18n.t("dir_S");
  if (isBetween(dir, 202.5, 247.5)) return i18n.t("dir_SW");
  if (isBetween(dir, 247.5, 292.5)) return i18n.t("dir_W");
  if (isBetween(dir, 292.5, 337.5)) return i18n.t("dir_NW");
  return i18n.t("text_NA");
}
function getWindString(unitWind: string, wind: number): string {
  switch (unitWind) {
    case Consts.windUnits.ms:
      return wind + " m/s";
    case Consts.windUnits.kmh:
      return wind + " km/h";
    case Consts.windUnits.mph:
      return wind + " mph";
    case Consts.windUnits.kts:
      return wind + " kts";
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
      return wind + "m/s";
  }
}
function getPrecString(unitPrec: string, prec: number): string {
  switch (unitPrec) {
    case Consts.precUnits.mmh:
      return prec + " mm/h";
    case Consts.precUnits.cmh:
      return prec + " cm/h";
    case Consts.precUnits.inh:
      return prec + " in/h";
    default:
      return prec + " mm/h";
  }
}
function getTemperatureString(unitTempr: string, tempr: number): string {
  switch (unitTempr) {
    case Consts.temprUnits.c:
      return String(tempr);
    case Consts.temprUnits.f:
      return String(tempr);
    case Consts.temprUnits.k:
      return tempr + "K";
    default:
      return String(tempr);
  }
}
function isMorning(sunrise: Date, sunset: Date) {
  const lowHourSunrise = new Date(sunrise);
  lowHourSunrise.setHours(lowHourSunrise.getHours() - 1);
  const highHourSunrise = new Date(sunrise);
  highHourSunrise.setHours(lowHourSunrise.getHours() + 1);

  const lowHourSunset = new Date(sunset);
  lowHourSunrise.setHours(lowHourSunset.getHours() - 1);
  const highHourSunset = new Date(sunset);
  highHourSunrise.setHours(lowHourSunset.getHours() + 1);

  const currentDate = new Date();

  if (
    dateIsBetween(currentDate, lowHourSunrise, highHourSunrise) ||
    dateIsBetween(currentDate, lowHourSunset, highHourSunset)
  ) {
    return true;
  }
  return false;
}
function isBetween(x: number, lower: number, upper: number) {
  return lower <= x && x <= upper;
}
function dateIsBetween(x: Date, lower: Date, upper: Date) {
  return x > lower && x < upper;
}
function isSameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}
function formatDate(date: Date): string {
  const dateObj = new Date(date);
  return dateObj.getDate() + " " + Consts.Months[dateObj.getMonth()];
}
