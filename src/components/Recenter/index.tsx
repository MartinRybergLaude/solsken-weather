import { useEffect } from "react";
import { useMap } from "react-leaflet";

import { useLocation } from "~/contexts/LocationContext";

export default function Recenter() {
    const { location } = useLocation();
    const map = useMap();
    
    useEffect(() => {
    if (location) {
      map.flyTo([location.lat, location.lon], 8);
    }
  }, [location]);

  return null;
}