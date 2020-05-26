import * as Strings from 'utils/strings'
export const fetchSettings = {
    method: "GET",
    mode: "cors" as RequestMode
}
export const apiBaseSMHI = "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/"
export const apiBaseBigDataCloud = "https://api.bigdatacloud.net/data/reverse-geocode-client?"

export enum windUnits {
    ms,
    kmh,
    mph,
    kts,
    bf
}
export enum temprUnits {
    c,
    f
}
export enum precUnits {
    mmh,
    cmh,
    inh
}
export enum pressureUnits {
    hpa,
    bar,
    at
}
export enum visUnits {
    km,
    miles
}
export enum clockUnits {
    twentyfour,
    twelve,
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

export const Days = [Strings.Sun,Strings.Mon,Strings.Tue,Strings.Wed,Strings.Thu,Strings.Fri,Strings.Sat];