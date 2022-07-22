import i18n from "i18n";

import { WeatherIconEnum } from "~/enums/WeatherIcon";

export interface WeatherData {
  approvedTime: Date;
  referenceTime: Date;
  geometry: Geometry;
  timeSeries: TimeSery[];
}

export interface Geometry {
  type: string;
  coordinates: Array<number[]>;
}

export interface TimeSery {
  validTime: Date;
  parameters: Parameter[];
}

export interface Parameter {
  name: Name;
  levelType: LevelType;
  level: number;
  unit: Unit;
  values: number[];
}

export enum LevelType {
  Hl = "hl",
  Hmsl = "hmsl",
}

export enum Name {
  Gust = "gust",
  HccMean = "hcc_mean",
  LccMean = "lcc_mean",
  MccMean = "mcc_mean",
  Msl = "msl",
  Pcat = "pcat",
  Pmax = "pmax",
  Pmean = "pmean",
  Pmedian = "pmedian",
  Pmin = "pmin",
  R = "r",
  Spp = "spp",
  T = "t",
  TccMean = "tcc_mean",
  Tstm = "tstm",
  Vis = "vis",
  Wd = "wd",
  Ws = "ws",
  Wsymb2 = "Wsymb2",
}

export enum Unit {
  Category = "category",
  Cel = "Cel",
  Degree = "degree",
  HPa = "hPa",
  KM = "km",
  KgM2H = "kg/m2/h",
  MS = "m/s",
  Octas = "octas",
  Percent = "percent",
}

export const TextList = [
  i18n.t("w_clear"),
  i18n.t("w_almost_clear"),
  i18n.t("w_varying_cloudiness"),
  i18n.t("w_half_clear"),
  i18n.t("w_cloudy"),
  i18n.t("w_overcast"),
  i18n.t("w_fog"),
  i18n.t("w_light_rain_showers"),
  i18n.t("w_moderate_rain_showers"),
  i18n.t("w_heavy_rain_showers"),
  i18n.t("w_thunderstorm"),
  i18n.t("w_light_sleet_showers"),
  i18n.t("w_moderate_sleet_showers"),
  i18n.t("w_heavy_sleet_showers"),
  i18n.t("w_light_snow_showers"),
  i18n.t("w_moderate_snow_showers"),
  i18n.t("w_heavy_snow_showers"),
  i18n.t("w_light_rain"),
  i18n.t("w_moderate_rain"),
  i18n.t("w_heavy_rain"),
  i18n.t("w_thunder"),
  i18n.t("w_light_sleet"),
  i18n.t("w_moderate_sleet"),
  i18n.t("w_heavy_sleet"),
  i18n.t("w_light_snow"),
  i18n.t("w_moderate_snow"),
  i18n.t("w_heavy_snow"),
];

export const IconListDay = [
  WeatherIconEnum.CLEAR_DAY,
  WeatherIconEnum.PARTLY_CLOUDY_DAY,
  WeatherIconEnum.PARTLY_CLOUDY_DAY,
  WeatherIconEnum.PARTLY_CLOUDY_DAY,
  WeatherIconEnum.CLOUDY,
  WeatherIconEnum.OVERCAST,
  WeatherIconEnum.FOG,
  WeatherIconEnum.PARTLY_CLOUDY_DAY_DRIZZLE,
  WeatherIconEnum.OVERCAST_DAY_RAIN,
  WeatherIconEnum.OVERCAST_DAY_RAIN,
  WeatherIconEnum.THUNDERSTORMS_DAY,
  WeatherIconEnum.PARTLY_CLOUDY_DAY_SLEET,
  WeatherIconEnum.OVERCAST_DAY_SLEET,
  WeatherIconEnum.OVERCAST_DAY_SLEET,
  WeatherIconEnum.PARTLY_CLOUDY_DAY_SNOW,
  WeatherIconEnum.OVERCAST_DAY_SNOW,
  WeatherIconEnum.OVERCAST_DAY_SNOW,
  WeatherIconEnum.RAIN,
  WeatherIconEnum.OVERCAST_RAIN,
  WeatherIconEnum.EXTREME_RAIN,
  WeatherIconEnum.THUNDER,
  WeatherIconEnum.SLEET,
  WeatherIconEnum.OVERCAST_SLEET,
  WeatherIconEnum.EXTREME_SLEET,
  WeatherIconEnum.SNOW,
  WeatherIconEnum.OVERCAST_SNOW,
  WeatherIconEnum.EXTREME_SNOW,
];
export const IconListNight = [
  WeatherIconEnum.CLEAR_NIGHT,
  WeatherIconEnum.PARTLY_CLOUDY_NIGHT,
  WeatherIconEnum.PARTLY_CLOUDY_NIGHT,
  WeatherIconEnum.PARTLY_CLOUDY_NIGHT,
  WeatherIconEnum.CLOUDY,
  WeatherIconEnum.OVERCAST,
  WeatherIconEnum.FOG,
  WeatherIconEnum.PARTLY_CLOUDY_NIGHT_DRIZZLE,
  WeatherIconEnum.OVERCAST_NIGHT_RAIN,
  WeatherIconEnum.OVERCAST_NIGHT_RAIN,
  WeatherIconEnum.THUNDERSTORMS_NIGHT,
  WeatherIconEnum.PARTLY_CLOUDY_NIGHT_SLEET,
  WeatherIconEnum.OVERCAST_NIGHT_SLEET,
  WeatherIconEnum.OVERCAST_NIGHT_SLEET,
  WeatherIconEnum.PARTLY_CLOUDY_NIGHT_SNOW,
  WeatherIconEnum.OVERCAST_NIGHT_SNOW,
  WeatherIconEnum.OVERCAST_NIGHT_SNOW,
  WeatherIconEnum.RAIN,
  WeatherIconEnum.OVERCAST_RAIN,
  WeatherIconEnum.EXTREME_RAIN,
  WeatherIconEnum.THUNDER,
  WeatherIconEnum.SLEET,
  WeatherIconEnum.OVERCAST_SLEET,
  WeatherIconEnum.EXTREME_SLEET,
  WeatherIconEnum.SNOW,
  WeatherIconEnum.OVERCAST_SNOW,
  WeatherIconEnum.EXTREME_SNOW,
];
