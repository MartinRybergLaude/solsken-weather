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
  error?: string;
};

interface WeatherContextProps {
  children: React.ReactNode;
}

type Provider = "smhi" | "yr";

const WeatherContext = React.createContext<WeatherContextType>({} as WeatherContextType);

export function WeatherContextProvider({ children }: WeatherContextProps) {
  const [weather, setWeather] = React.useState<Weather | null>(null);
  const [provider, setProvider] = React.useState<Provider | null>(null);
  const [error, setError] = React.useState<string | undefined>(undefined);

  const { location } = useLocation();

  const { data, error: fetchError } = useSWR(() => {
    if (!location || !provider) return null;
    if (provider === "smhi") {
      return `${apiBaseSMHI}lon/${location.lon}/lat/${location.lat}/data.json`;
    }
    return `${apiBaseYR}lat=${location.lat}&lon=${location.lon}`;
  }, weatherFetcher);

  useEffect(() => {
    if (location) {
      // Check which data source is selected
      const provider: Provider = (getItem("data-src") as Provider) || "smhi";
      setProvider(provider);
    }
  }, [location]);

  useEffect(() => {
    if (fetchError) {
      setError(fetchError.message);
    }
  }, [fetchError]);

  useEffect(() => {
    if (data && location) {
      try {
        const rawWeatherData = changeUnits(
          parseWeatherSMHI(data, location.lon, location.lat, location.name),
        );
        const formattedWeatherData = formatWeather(rawWeatherData);
        setWeather({
          raw: rawWeatherData,
          formatted: formattedWeatherData,
        });
      } catch {
        setError("Could not parse weather data");
      }
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
