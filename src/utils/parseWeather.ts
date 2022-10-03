import Location from "~/types/location";
import { Provider } from "~/types/provider";
import { RawWeather } from "~/types/rawWeather";

import changeUnits from "./changeUnits";
import { parseWeatherSMHI } from "./smhi";
import { parseWeatherYR } from "./yr";

export function parseWeather(data: any, provider: Provider, location: Location) {
  switch (provider) {
    case "smhi":
      return processWeather(parseWeatherSMHI(data, location.lon, location.lat, location.name));
    case "yr":
      return processWeather(parseWeatherYR(data, location.lon, location.lat, location.name));
  }
}

function processWeather(data: RawWeather): RawWeather {
  data = cleanDays(data);
  data = cleanHours(data);
  data = changeUnits(data);

  return data;
}

function cleanDays(data: RawWeather): RawWeather {
  return data.days.length > 10 ? { ...data, days: data.days.splice(0, 10) } : data;
}
function cleanHours(data: RawWeather): RawWeather {
  data.days.forEach(day => {
    day.hours = day.hours.filter(hour => isDateNotOlderBy30min(hour.date));
  });

  function isDateNotOlderBy30min(date: Date): boolean {
    if (new Date().getTime() - new Date(date).getTime() <= 30 * 60000) {
      return true;
    } else {
      return false;
    }
  }

  data.days = data.days.reduce<RawWeather["days"]>((total, current) => {
    if (current.hours.length > 0) {
      total.push(current);
    }
    return total;
  }, []);

  return data;
}
