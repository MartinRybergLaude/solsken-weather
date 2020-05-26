import * as Strings from 'utils/strings'
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
    Strings.Clear,
    Strings.AlmostClear,
    Strings.VaryingCloudiness,
    Strings.HalfClear,
    Strings.Cloudy,
    Strings.Overcast,
    Strings.Fog,
    Strings.LightRainShowers,
    Strings.ModerateRainShowers,
    Strings.HeavyRainShowers,
    Strings.ThunderStorm,
    Strings.LightSleetShowers,
    Strings.ModerateSleetShowers,
    Strings.HeavySleetShowers,
    Strings.LightSnowShowers,
    Strings.ModerateSnowShowers,
    Strings.HeavySnowShowers,
    Strings.LightRain,
    Strings.ModerateRain,
    Strings.HeavyRain,
    Strings.Thunder,
    Strings.LightSleet,
    Strings.ModerateSleet,
    Strings.HeavySleet,
    Strings.LightSnow,
    Strings.ModerateSnow,
    Strings.HeavySnow
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
