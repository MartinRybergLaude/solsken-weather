export default interface LocationData {
    type:     string;
    features: Feature[];
}

export interface Feature {
    type:       string;
    geometry:   Geometry;
    properties: Properties;
}

export interface Geometry {
    coordinates: number[];
    type:        string;
}

export interface Properties {
    city?:     string;
    country:   string;
    name:      string;
    postcode?: string;
}