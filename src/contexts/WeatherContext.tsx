import React, { useEffect, useMemo } from "react";
import useSWR from "swr";

import { Provider } from "~/types/provider";
import Weather from "~/types/weather";
import { apiBaseSMHI, apiBaseYR, weatherFetcher } from "~/utils/constants";
import { getItem } from "~/utils/storage";

import { useLocation } from "./LocationContext";

type WeatherContextType = {
  weather?: Weather;
  error?: string;
  loading?: boolean;
  refresh: () => void;
  setSelectedDay: (day: number) => void;
  selectedDay: number;
};

interface WeatherContextProps {
  children: React.ReactNode;
}

const WeatherContext = React.createContext<WeatherContextType>({} as WeatherContextType);

export function WeatherContextProvider({ children }: WeatherContextProps) {
  const [provider, setProvider] = React.useState<Provider | null>(getProvider());
  const [loading, setLoading] = React.useState(true);
  const [selectedDay, setSelectedDay] = React.useState(0);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const { location } = useLocation();

  const url = useMemo(() => {
    if (!location || !provider) return null;
    switch (provider) {
      case "smhi":
        return `${apiBaseSMHI}lon/${location.lon}/lat/${location.lat}/data.json`;
      case "yr":
        return `${apiBaseYR}lat=${location.lat}&lon=${location.lon}`;
      default:
        return `${apiBaseYR}lat=${location.lat}&lon=${location.lon}`;
    }
  }, [provider, location]);

  const {
    data: weather,
    error: fetchError,
    mutate,
    isValidating,
  } = useSWR(url ? url : null, url => weatherFetcher({ url, location, provider }), {
    keepPreviousData: true,
  });

  function getProvider(): Provider {
    return (getItem("data-src") as Provider) || "yr";
  }

  useEffect(() => {
    if (fetchError) {
      setError(fetchError.message);
    } else {
      setError(undefined);
    }
  }, [fetchError]);

  useEffect(() => {
    if (isValidating) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isValidating]);

  function refresh() {
    setProvider(getProvider());
    mutate();
  }

  useEffect(() => {
    if (!location) {
      setLoading(true);
    }
  }, [location]);

  return (
    <WeatherContext.Provider
      value={{
        weather,
        error,
        loading,
        refresh,
        setSelectedDay,
        selectedDay,
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
