import i18n from "i18n";

import { WeatherIconEnum } from "~/enums/WeatherIcon";

export interface WeatherData {
  createdTime: Date;
  referenceTime: Date;
  geometry: Geometry;
  timeSeries: TimeSery[];
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface TimeSery {
  time: Date;
  data: TimeData;
}

export interface TimeData {
  air_temperature?: number;
  wind_from_direction?: number;
  wind_speed?: number;
  wind_speed_of_gust?: number;
  relative_humidity?: number;
  air_pressure_at_mean_sea_level?: number;
  visibility_in_air?: number;
  cloud_area_fraction?: number;
  precipitation_amount_min?: number;
  precipitation_amount_max?: number;
  precipitation_amount_mean?: number;
  symbol_code?: number;
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
