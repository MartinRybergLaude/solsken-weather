import React, { useEffect } from "react";

import { FormattedWeather } from "~/types/formattedWeather";
import { RawWeather } from "~/types/rawWeather";

import { useLocation } from "./LocationContext";

type WeatherContextType = {
  rawWeather: RawWeather | null;
  formattedWeather: FormattedWeather | null;
};

interface WeatherContextProps {
  children: React.ReactNode;
}

const WeatherContext = React.createContext<WeatherContextType>({} as WeatherContextType);

export function WeatherContextProvider({ children }: WeatherContextProps) {
  const [rawWeather, setRawWeather] = React.useState<RawWeather | null>(null);
  const [formattedWeather, setFormattedWeather] = React.useState<FormattedWeather | null>(null);

  const { location } = useLocation();

  useEffect(() => {
    // TODO: Call for weather data
  }, [location]);

  return (
    <WeatherContext.Provider
      value={{
        rawWeather,
        formattedWeather,
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
