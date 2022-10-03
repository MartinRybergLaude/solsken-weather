import { FormattedWeather } from "~/types/formattedWeather";
import { RawWeather } from "~/types/rawWeather";

export default interface Weather {
  raw: RawWeather;
  formatted: FormattedWeather;
}
