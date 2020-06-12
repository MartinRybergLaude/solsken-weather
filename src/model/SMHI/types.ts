import i18n from 'i18n'
import * as Consts from 'utils/constants'

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
    i18n.t("w_heavy_snow")
]
export const IconListDay = [
    Consts.WiDayClear,
    Consts.WiDayOvercast,
    Consts.WiDayCloudy,
    Consts.WiDayCloudy,
    Consts.WiCloudy,
    Consts.WiDayCloudy,
    Consts.WiFog,
    Consts.WiDayRain,
    Consts.WiDayRain,
    Consts.WiDayRain,
    Consts.WiThunderstorm,
    Consts.WiDaySleet,
    Consts.WiDaySleet,
    Consts.WiDaySleet,
    Consts.WiDaySnow,
    Consts.WiDaySnow,
    Consts.WiDaySnow,
    Consts.WiDayRain,
    Consts.WiRain,
    Consts.WiRain,
    Consts.WiThunder,
    Consts.WiDaySleet,
    Consts.WiSleet,
    Consts.WiSleet,
    Consts.WiDaySnow,
    Consts.WiSnow,
    Consts.WiSnow,
]
export const IconListNight = [
    Consts.WiNightClear,
    Consts.WiNightOvercast,
    Consts.WiNightOvercast,
    Consts.WiNightOvercast,
    Consts.WiNightCloudy,
    Consts.WiNightCloudy,
    Consts.WiCloudy,
    Consts.WiNightOvercast,
    Consts.WiFog,
    Consts.WiNightRain,
    Consts.WiNightRain,
    Consts.WiNightRain,
    Consts.WiThunderstorm,
    Consts.WiNightSleet,
    Consts.WiNightSleet,
    Consts.WiNightSleet,
    Consts.WiNightSnow,
    Consts.WiNightSnow,
    Consts.WiNightSnow,
    Consts.WiRain,
    Consts.WiNightRain,
    Consts.WiRain,
    Consts.WiRain,
    Consts.WiThunder,
    Consts.WiSleet,
    Consts.WiNightSleet,
    Consts.WiSleet,
    Consts.WiSleet,
    Consts.WiSnow,
    Consts.WiNightSnow,
    Consts.WiSnow,
    Consts.WiSnow,
    Consts.WiDrizzle
]
