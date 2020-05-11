export const fetchSettings = {
    method: 'GET',
    mode: 'cors' as RequestMode
}
export const apiBaseSMHI = "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/"

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