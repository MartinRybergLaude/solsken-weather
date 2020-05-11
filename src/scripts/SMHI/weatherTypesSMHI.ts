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
