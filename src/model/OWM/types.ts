
export interface WeatherData {
    cod:     string
    message: number
    cnt:     number
    list:    List[]
}

export interface List {
    dt:      number
    main:    MainClass
    weather: Weather[]
    clouds:  Clouds
    wind:    Wind
    rain: Rain
    sys:     Sys
    dt_txt:  Date
}

export interface Clouds {
    all: number
}

export interface MainClass {
    temp:       number
    feels_like: number
    temp_min:   number
    temp_max:   number
    pressure:   number
    sea_level:  number
    grnd_level: number
    humidity:   number
    temp_kf:    number
}

export interface Sys {
    pod: Pod
}

export enum Pod {
    D = "d",
    N = "n",
}

export interface Weather {
    id:          number
    main:        MainEnum
    description: string
    icon:        string
}

export enum MainEnum {
    Clear = "Clear",
    Clouds = "Clouds",
}

export interface Wind {
    speed: number
    deg:   number
}

export interface Rain {
    rain3h: number
}