import React, { useEffect } from "react";
import useSWR from "swr";

import i18n from "~/i18n";
import Location from "~/types/location";
import { apiBaseBigDataCloud, locationFetcher } from "~/utils/constants";
import { getItem, setItem } from "~/utils/storage";

type LocationContextType = {
  location?: Location;
  setLocation: (location?: Location) => void;
  error: unknown;
};

interface LocationContextProps {
  children: React.ReactNode;
}

const LocationContext = React.createContext<LocationContextType>({} as LocationContextType);

const PreSelectLocation: Location = {
  lat: 59.3293,
  lon: 18.0686,
  name: "Stockholm",
};

interface APIData {
  lat: number;
  lon: number;
  userLang: string;
}

export function LocationContextProvider({ children }: LocationContextProps) {
  const [location, setLocation] = React.useState<Location | undefined>(undefined);
  const [apiData, setApiData] = React.useState<APIData | undefined>(undefined);

  const { data: city, error } = useSWR(
    apiData
      ? `${apiBaseBigDataCloud}latitude=${apiData.lat}&longitude=${apiData.lon}&localityLanguage=${apiData.userLang}`
      : null,
    locationFetcher,
  );

  useEffect(() => {
    if (city && apiData) {
      setLocation({ lat: apiData.lat, lon: apiData.lon, name: city });
    }
  }, [city]);

  function handleFirstTimeSetup() {
    const lang = i18n.language;
    if (getItem("version") == null && lang.substring(0, 2) === "sv") {
      setItem("data-src", "smhi");
    }
  }

  function setSelectedLocation() {
    const selectedLocation = getItem("selected-location");
    if (selectedLocation) {
      const selectedLocationParsed = JSON.parse(selectedLocation) as Location;
      setLocation(selectedLocationParsed);
    } else {
      checkLocationPermission();
    }
  }

  function checkLocationPermission() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPositionSuccessCallback, locationErrorCallback, {
        maximumAge: 10 * 60 * 1000,
        timeout: 10000,
      });
    } else {
      locationErrorCallback();
    }
  }

  function locationErrorCallback() {
    setLocation(PreSelectLocation);
  }

  function getPositionSuccessCallback(pos: GeolocationPosition) {
    const lon = pos.coords.longitude.toFixed(2);
    const lat = pos.coords.latitude.toFixed(2);

    setApiData({ lat: Number(lat), lon: Number(lon), userLang: i18n.language });
  }

  useEffect(() => {
    handleFirstTimeSetup();
    setSelectedLocation();
  }, []);

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        error,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export const useLocation = () => {
  return React.useContext(LocationContext);
};

export default LocationContext;
