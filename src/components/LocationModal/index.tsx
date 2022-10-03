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

import SearchBar from "../SearchBar";
import styles from "./LocationModal.module.css";

interface LocationModalProps {
  isOpen: boolean;
  setOpen: (v: boolean) => void;
}

export default function LocationModal({ isOpen, setOpen }: LocationModalProps) {
  const { t } = useTranslation();

  const { setLocation, setSelectedLocation, location } = useLocation();
  const [savedLocations, setSavedLocations] = useState<Location[]>(
    JSON.parse(getItem("locations") || "[]"),
  );
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
  const { data: locations } = useSWR(`${apiBasePhoton}${debouncedSearch}&limit=6`, searchFetcher);

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
    const savedLocations = JSON.parse(getItem("locations") || "[]");
    const newLocations: Location[] = savedLocations.find((l: Location) => l.name === location.name)
      ? [...savedLocations]
      : [...savedLocations, location];
    setItem("locations", JSON.stringify(newLocations));
    setItem("selected-location", JSON.stringify(location));
    setLocation(location);
    setSavedLocations(newLocations);
    setCurrentLocationSelected(false);
    closeModal();
  }

  // Remove chosen location from saved locations
  function removeLocation(location: Location) {
    const savedLocations = JSON.parse(getItem("locations") || "[]");
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
            <h2 className={styles.savedTitle}>Current location</h2>
            <button
              className={cx(
                styles.location,
                styles.current,
                currentLocationSelected && styles.selectedLocation,
              )}
              onClick={() => setCurrentLocation()}
            >
              <h3>Current</h3>
              <FiMapPin className={styles.pinIcon} />
            </button>
          </div>

          {savedLocations && savedLocations.length > 0 && (
            <>
              <h2 className={styles.savedTitle}>Saved locations</h2>
              <ul className={cx(styles.locationList, styles.savedLocationsList)}>
                {savedLocations.map((savedLocation: Location, i: number) => (
                  <li
                    key={i}
                    className={cx(
                      styles.location,
                      styles.favorite,
                      location && savedLocation.name === location.name && styles.selectedLocation,
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
