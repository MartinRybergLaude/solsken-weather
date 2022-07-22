import React, { useEffect } from "react";
import useSWR from "swr";

import Weather from "~/types/weather";
import changeUnits from "~/utils/changeUnits";
import { apiBaseSMHI, apiBaseYR, weatherFetcher } from "~/utils/constants";
import formatWeather from "~/utils/formatWeather";
import { parseWeatherSMHI } from "~/utils/smhi";
import { getItem } from "~/utils/storage";

import { useLocation } from "./LocationContext";

type WeatherContextType = {
  weather: Weather | null;
  error: unknown;
};

interface WeatherContextProps {
  children: React.ReactNode;
}

type Provider = "smhi" | "yr";

const WeatherContext = React.createContext<WeatherContextType>({} as WeatherContextType);

export function WeatherContextProvider({ children }: WeatherContextProps) {
  const [weather, setWeather] = React.useState<Weather | null>(null);
  const [provider, setProvider] = React.useState<Provider | null>(null);

  const { location } = useLocation();

  const { data, error } = useSWR(() => {
    if (!location || !provider) return null;
    if (provider === "smhi") {
      return `${apiBaseSMHI}lon/${location.lon}/lat/${location.lat}/data.json`;
    }
    return `${apiBaseYR}lat=${location.lat}&lon=${location.lon}`;
  }, weatherFetcher);

  useEffect(() => {
    if (location) {
      // Check which data source is selected
      const provider: Provider = (getItem("dataSrc") as Provider) || "smhi";
      setProvider(provider);
    }
  }, [location]);

  useEffect(() => {
    if (data && location) {
      const rawWeatherData = changeUnits(
        parseWeatherSMHI(data, location.lon, location.lat, location.name),
      );
      const formattedWeatherData = formatWeather(rawWeatherData);
      setWeather({
        raw: rawWeatherData,
        formatted: formattedWeatherData,
      });
    }
  }, [data, location]);

  return (
    <WeatherContext.Provider
      value={{
        weather,
        error,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export const useWeather = () => {
  return React.useContext(WeatherContext);
};

export default WeatherContext;
