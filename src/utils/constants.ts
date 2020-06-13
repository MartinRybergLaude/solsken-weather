import i18n from 'i18n'
export const fetchSettings = {
    method: "GET",
    mode: "cors" as RequestMode
}
export const apiBaseSMHI = "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/"
export const apiBaseBigDataCloud = "https://api.bigdatacloud.net/data/reverse-geocode-client?"
export const apiBasePhoton = "https://photon.komoot.de/api/?q="

export enum windUnits {
    ms = "ms",
    kmh = "kmh",
    mph = "mph",
    kts = "kts",
    b = "b"
}
export enum temprUnits {
    c = "c",
    f = "f",
    k = "k"
}
export enum precUnits {
    mmh = "mmh",
    cmh = "cmh",
    inh = "inh"
}
export enum pressureUnits {
    hpa = "hpa",
    bar = "bar",
    at = "at"
}
export enum visUnits {
    km = "km",
    miles = "miles"
}
export enum clockUnits {
    twentyfour = "24h",
    twelve = "12h", 
}
export const WiNA = "wi-na"

export const WiDayClear = "wi-day-sunny"
export const WiDayCloudy = "wi-day-cloudy"
export const WiDayOvercast = "wi-day-sunny-overcast"
export const WiDayRain = "wi-day-rain"
export const WiDaySleet = "wi-day-sleet"
export const WiDaySnow = "wi-day-snow-wind"

export const WiNightClear = "wi-night-clear"
export const WiNightCloudy = "wi-night-alt-cloudy"
export const WiNightOvercast = "wi-night-alt-partly-cloudy"
export const WiNightRain = "wi-night-alt-rain"
export const WiNightSleet = "wi-night-alt-sleet"
export const WiNightSnow = "wi-night-alt-snow-wind"

export const WiCloudy = "wi-cloudy"
export const WiRain = "wi-rain"
export const WiSleet = "wi-sleet"
export const WiSnow = "wi-snow-wind"
export const WiThunderstorm = "wi-thunderstorm"
export const WiThunder = "wiLightning"
export const WiFog = "wi-fog"
export const WiDrizzle = "wi-sprinkle"

export const WiUmbrella ="wi-umbrella"
export const WiWind = "wi-wind"
export const WiBarometer = "wi-barometer"
export const WiRaindrop = "wi-raindrop"
export const WiStrongwind = "wi-strong-wind"
export const WiThermometer = "wi-thermometer"
export const WiHorizon = "wi-horizon-alt"

export const Days = [i18n.t("day_sun"),i18n.t("day_mon"),i18n.t("day_tue"),i18n.t("day_wed"),i18n.t("day_thu"),i18n.t("day_fri"),i18n.t("day_sat")];