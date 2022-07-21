import React, { useEffect } from "react";

import i18n from "~/i18n";
import Location from "~/types/location";
import { getItem, setItem } from "~/utils/storage";

type LocationContextType = {
  location: Location | null;
  setLocation: (location: Location | null) => void;
};

interface LocationContextProps {
  children: React.ReactNode;
}

const LocationContext = React.createContext<LocationContextType>({} as LocationContextType);

const PreSelectLocation: Location = {
  lat: 59.3293,
  lon: 18.0686,
  name: "Stockholm",
  country: "SE",
};

export function LocationContextProvider({ children }: LocationContextProps) {
  const [location, setLocation] = React.useState<Location | null>(null);

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
        maximumAge: 60000,
        timeout: 10000,
      });
    } else {
      locationErrorCallback();
    }
  }

  function locationErrorCallback() {
    setLocation(PreSelectLocation);
  }

  function getPositionSuccessCallback(pos: any) {
    const lon = pos.coords.longitude.toFixed(2);
    const lat = pos.coords.latitude.toFixed(2);

    // TODO: Get city name from coordinates
  }

  useEffect(() => {
    handleFirstTimeSetup();
    setSelectedLocation();
  }, [location]);

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
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
