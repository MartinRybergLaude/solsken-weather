export interface Data {
    latitude:                  number;
    longitude:                 number;
    localityLanguageRequested: string;
    continent:                 string;
    continentCode:             string;
    countryName:               string;
    countryCode:               string;
    principalSubdivision:      string;
    locality:                  string;
    postcode:                  string;
    localityInfo:              LocalityInfo;
}

export interface LocalityInfo {
    administrative: Administrative[];
    informative:    Informative[];
}

export interface Administrative {
    order:       number;
    adminLevel:  number;
    name:        string;
    description: string;
    isoName?:    string;
    isoCode?:    string;
    wikidataId:  string;
}

export interface Informative {
    order:       number;
    name:        string;
    description: string;
    isoCode?:    string;
    wikidataId?: string;
}