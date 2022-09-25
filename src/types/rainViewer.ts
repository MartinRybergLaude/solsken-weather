export interface RainData {
  version: string;
  generated: number;
  host: string;
  radar: Radar;
  satellite: Satellite;
}

export interface Radar {
  past: Frame[];
  nowcast: Frame[];
}

export interface Satellite {
  infrared: Frame[];
}

export interface Frame {
  time: number;
  path: string;
}
