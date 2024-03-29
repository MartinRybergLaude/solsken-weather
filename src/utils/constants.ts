import i18n from "i18n";

import { Data } from "~/types/bigDataCloud";
import Location from "~/types/location";
import LocationData from "~/types/photon";
import { Provider } from "~/types/provider";
import { RainData } from "~/types/rainViewer";
import Weather from "~/types/weather";

import formatWeather from "./formatWeather";
import { parseWeather } from "./parseWeather";

export async function searchFetcher(input: RequestInfo, init?: RequestInit): Promise<Location[]> {
  const res = await fetch(input, init);
  const data = (await res.json()) as LocationData;
  return data.features.map(location => ({
    name: location.properties.name,
    lon: Math.round(location.geometry.coordinates[0] * 100 + Number.EPSILON) / 100,
    lat: Math.round(location.geometry.coordinates[1] * 100 + Number.EPSILON) / 100,
  }));
}

export async function locationFetcher(input: RequestInfo, init?: RequestInit): Promise<string> {
  const res = await fetch(input, init);

  const data = (await res.json()) as Data;
  return data.city || data.locality || data.countryName || "N/A";
}

interface WeatherParams {
  url: RequestInfo;
  location?: Location;
  provider?: Provider | null;
  init?: RequestInit;
}

export async function weatherFetcher(params: WeatherParams): Promise<Weather> {
  const { url, location, provider, init } = params;
  if (!location || !provider) throw new Error("missing location or provider");
  const res = await fetch(url, init);
  const data = await res.json();
  const rawWeatherData = parseWeather(data, provider, location);
  const formattedWeatherData = formatWeather(rawWeatherData);

  return { raw: rawWeatherData, formatted: formattedWeatherData };
}

export async function rainFetcher(input: RequestInfo, init?: RequestInit): Promise<RainData> {
  const res = await fetch(input, init);
  const data = (await res.json()) as RainData;
  return data;
}

export const apiBaseSMHI =
  "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/";
export const apiBaseYR = "https://api.met.no/weatherapi/locationforecast/2.0/complete?";
export const apiBaseBigDataCloud = "https://api.bigdatacloud.net/data/reverse-geocode-client?";
export const apiBasePhoton = "https://photon.komoot.io/api/?q=";

export enum windUnits {
  ms = "ms",
  kmh = "kmh",
  mph = "mph",
  kts = "kts",
  b = "b",
}
export enum temprUnits {
  c = "c",
  f = "f",
  k = "k",
}
export enum precUnits {
  mmh = "mmh",
  cmh = "cmh",
  inh = "inh",
}
export enum pressureUnits {
  hpa = "hpa",
  bar = "bar",
  at = "at",
}
export enum visUnits {
  km = "km",
  miles = "miles",
}
export enum timeUnits {
  twentyfour = "twentyfour",
  twelve = "twelve",
}
export const WiNA = "wi-na";

export const WiDayClear = "wi-day-sunny";
export const WiDayCloudy = "wi-day-cloudy";
export const WiDaySmallCloudy = "wi-day-sunny-overcast";
export const WiDayRain = "wi-day-rain";
export const WiDaySleet = "wi-day-sleet";
export const WiDaySnow = "wi-day-snow-wind";

export const WiNightClear = "wi-night-clear";
export const WiNightCloudy = "wi-night-alt-cloudy";
export const WiNightSmallCloudy = "wi-night-alt-partly-cloudy";
export const WiNightRain = "wi-night-alt-rain";
export const WiNightSleet = "wi-night-alt-sleet";
export const WiNightSnow = "wi-night-alt-snow-wind";

export const WiCloudy = "wi-cloudy";
export const WiCloud = "wi-cloud";
export const WiRain = "wi-rain";
export const WiSleet = "wi-sleet";
export const WiSnow = "wi-snow-wind";
export const WiThunderstorm = "wi-thunderstorm";
export const WiThunder = "wiLightning";
export const WiFog = "wi-fog";
export const WiDrizzle = "wi-sprinkle";

export const WiUmbrella = "wi-umbrella";
export const WiWind = "wi-wind";
export const WiBarometer = "wi-barometer";
export const WiRaindrop = "wi-raindrop";
export const WiStrongwind = "wi-strong-wind";
export const WiThermometer = "wi-thermometer";
export const WiHorizon = "wi-horizon-alt";

export const Days = [
  i18n.t("day_sun"),
  i18n.t("day_mon"),
  i18n.t("day_tue"),
  i18n.t("day_wed"),
  i18n.t("day_thu"),
  i18n.t("day_fri"),
  i18n.t("day_sat"),
];
export const Months = [
  i18n.t("month_jan"),
  i18n.t("month_feb"),
  i18n.t("month_mar"),
  i18n.t("month_apr"),
  i18n.t("month_may"),
  i18n.t("month_jun"),
  i18n.t("month_jul"),
  i18n.t("month_aug"),
  i18n.t("month_sep"),
  i18n.t("month_oct"),
  i18n.t("month_nov"),
  i18n.t("month_dec"),
];
