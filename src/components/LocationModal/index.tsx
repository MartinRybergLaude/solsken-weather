import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiMapPin, FiX } from "react-icons/fi";
import cx from "classnames";
import useSWR from "swr";

import Modal from "~/containers/Modal";
import { useLocation } from "~/contexts/LocationContext";
import useDebounce from "~/hooks/useDebounce";
import Location from "~/types/location";
import { apiBasePhoton, searchFetcher } from "~/utils/constants";
import { deleteItem, getItem, setItem } from "~/utils/storage";
import { getTimezoneForCoords, validateTimezone } from "~/utils/timezone";

import SearchBar from "../SearchBar";
import styles from "./LocationModal.module.css";

interface LocationModalProps {
  isOpen: boolean;
  setOpen: (v: boolean) => void;
}

export default function LocationModal({ isOpen, setOpen }: LocationModalProps) {
  const { t } = useTranslation();

  const { setLocation, setSelectedLocation, location } = useLocation();
  const [savedLocations, setSavedLocations] = useState<Location[]>(loadSavedLocations);
  const [currentLocationSelected, setCurrentLocationSelected] = useState(
    getItem("selected-location") ? false : true,
  );

  // State to hold search input
  const [search, setSearch] = useState("");

  const [isSearching, setIsSearching] = useState(false);

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  // Debounce search input
  const debouncedSearch = useDebounce(search, 500);

  // SWR network request for location search
  const { data: locations } = useSWR(
    debouncedSearch ? `${apiBasePhoton}${encodeURIComponent(debouncedSearch)}&limit=6` : null,
    searchFetcher,
  );

  useEffect(() => {
    const upgraded = loadSavedLocations();
    setSavedLocations(upgraded);
    setItem("locations", JSON.stringify(upgraded));
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [search]);

  useEffect(() => {
    if (locations) {
      setIsSearching(false);
    }
  }, [locations]);

  function closeModal() {
    setSearch("");
    setOpen(false);
  }

  // Add chosen location to saved locations
  function addLocation(location: Location) {
    const ensured = ensureTimezone(location);
    if (!ensured) return;
    const savedLocations = loadSavedLocations();
    const existingIndex = savedLocations.findIndex(l => l.name === ensured.name);
    const newLocations: Location[] =
      existingIndex >= 0
        ? savedLocations.map((l, i) => (i === existingIndex ? ensured : l))
        : [...savedLocations, ensured];
    setItem("locations", JSON.stringify(newLocations));
    setItem("selected-location", JSON.stringify(ensured));
    setLocation(ensured);
    setSavedLocations(newLocations);
    setCurrentLocationSelected(false);
    closeModal();
  }

  function ensureTimezone(location: Partial<Location>): Location | undefined {
    if (location.lat == null || location.lon == null || !location.name) return undefined;
    const timezone =
      location.timezone && validateTimezone(location.timezone)
        ? location.timezone
        : getTimezoneForCoords(location.lat, location.lon);
    return {
      lat: location.lat,
      lon: location.lon,
      name: location.name,
      timezone,
    };
  }

  function loadSavedLocations(): Location[] {
    return (JSON.parse(getItem("locations") || "[]") as Partial<Location>[])
      .map(ensureTimezone)
      .filter((location): location is Location => Boolean(location));
  }

  // Remove chosen location from saved locations
  function removeLocation(location: Location) {
    const savedLocations = loadSavedLocations();
    const newLocations = savedLocations.filter((l: Location) => l.name !== location.name);
    setItem("locations", JSON.stringify(newLocations));
    const selectedLocation = JSON.parse(getItem("selected-location") || "null");
    if (selectedLocation && location.name === selectedLocation.name) {
      setCurrentLocationSelected(true);
      deleteItem("selected-location");
      setSelectedLocation();
    } else if (selectedLocation) {
      setCurrentLocationSelected(false);
    }
    setSavedLocations(newLocations);
  }

  // Set location to current location
  function setCurrentLocation() {
    if (getItem("selected-location")) {
      deleteItem("selected-location");
      setSelectedLocation();
    }
    setCurrentLocationSelected(true);
    closeModal();
  }

  return (
    <Modal setOpen={setOpen} isOpen={isOpen} closeCB={closeModal}>
      <SearchBar
        value={search}
        onChange={onInputChange}
        placeholder={t("text_search")}
        loading={isSearching}
      />
      <div className={styles.content}>
        <div className={styles.listsWrapper}>
          {locations && locations.length > 0 && (
            <ul className={styles.locationList}>
              {locations?.map((location, i) => (
                <li key={i} className={styles.location}>
                  <button className={styles.locationBtn} onClick={() => addLocation(location)}>
                    <h3>{location.name}</h3>
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className={styles.currentLocationWrapper}>
            <h2 className={styles.savedTitle}>{t("text_location_current")}</h2>
            <button
              className={cx(
                styles.location,
                styles.current,
                currentLocationSelected && styles.selectedLocation,
              )}
              onClick={() => setCurrentLocation()}
            >
              <h3>{t("text_location_current")}</h3>
              <FiMapPin className={styles.pinIcon} />
            </button>
          </div>

          {savedLocations && savedLocations.length > 0 && (
            <>
              <h2 className={styles.savedTitle}>{t("text_locations_saved")}</h2>
              <ul className={cx(styles.locationList, styles.savedLocationsList)}>
                {savedLocations.map((savedLocation: Location, i: number) => (
                  <li
                    key={i}
                    className={cx(
                      styles.location,
                      styles.favorite,
                      location &&
                        savedLocation.name === location.name &&
                        !currentLocationSelected &&
                        styles.selectedLocation,
                    )}
                  >
                    <button
                      className={styles.locationBtn}
                      onClick={() => addLocation(savedLocation)}
                    >
                      <h3>{savedLocation.name}</h3>
                    </button>
                    <button
                      aria-label="remove location"
                      className={styles.close}
                      onClick={() => removeLocation(savedLocation)}
                    >
                      <FiX className={styles.closeIcon} />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
