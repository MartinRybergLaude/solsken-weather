export interface WeatherData {
    type:       string;
    geometry:   Geometry;
    properties: Properties;
}

export interface Geometry {
    type:        string;
    coordinates: number[];
}

export interface Properties {
    meta:       Meta;
    timeseries: Timesery[];
}

export interface Meta {
    updatedAt: Date;
}

export interface Timesery {
    time: Date;
    data: Data;
}

export interface Data {
    instant:       Instant;
    next_1_hours?:  Next_1_Hours;
    next_12_hours?: Next_12_Hours;
}

export interface Instant {
    details: Details;
}

export interface Details {
    air_pressure_at_sea_level: number;
    air_temperature: number;
    cloud_area_fraction: number;
    fog_area_fraction: number;
    relative_humidity: number;
    wind_from_direction: number;
    wind_speed: number;
    wind_speed_of_gust: number;
}

export enum SymbolConfidence {
    Certain = "certain",
    SomewhatCertain = "somewhat certain",
    Uncertain = "uncertain",
}

export interface Next_1_Hours {
    summary: Next_1_HoursSummary;
    details: Next_1_HoursDetails;
}

export interface Next_12_Hours {
    summary: Next_12_HoursSummary;
    details: Next_12_HoursDetails;
}

export interface Next_1_HoursDetails {
    precipitation_amount:        number;
    precipitation_amount_max:     number;
    precipitation_amount_min:     number;
}

export interface Next_1_HoursSummary {
    symbol_code: string;
}
export interface Next_12_HoursDetails {
    precipitation_amount:        number;
    precipitation_amount_max:     number;
    precipitation_amount_min:     number;
}

export interface Next_12_HoursSummary {
    symbol_code: string;
}