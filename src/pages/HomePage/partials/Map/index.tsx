import React from "react";
import { FiChevronLeft, FiChevronRight, FiPauseCircle, FiPlay } from "react-icons/fi";
import { MapContainer, TileLayer } from "react-leaflet";
import useSWR from "swr";

import LoadingWrapper from "~/components/LoadingWrapper";
import { useLocation } from "~/contexts/LocationContext";
import { useWeather } from "~/contexts/WeatherContext";
import { Frame } from "~/types/rainViewer";
import { rainFetcher } from "~/utils/constants";
import { timeUnits } from "~/utils/constants";
import { getHourString } from "~/utils/getHourString";
import { getItem } from "~/utils/storage";

import styles from "./Map.module.css";

type Action = "increment" | "decrement" | "reset";

interface frameProps {
  step: number;
}

export function Map() {
  const { location } = useLocation();
  const { loading, error } = useWeather();
  const { data: rainData, error: fetchError } = useSWR(
    "https://api.rainviewer.com/public/weather-maps.json",
    rainFetcher,
    {
      keepPreviousData: true,
    },
  );
  const [frames, setFrames] = React.useState<Frame[] | undefined>(undefined);

  const [currentFrame, dispatch] = React.useReducer(frameReducer, { step: 0 });
  const [isPlaying, setIsPlaying] = React.useState(false);

  React.useEffect(() => {
    // Set timer that will increment the frame every 500 ms
    let timer = 0;
    if (isPlaying) {
      timer = setInterval(() => {
        dispatch("increment");
      }, 500);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Update the frame step to the last frame of past data
  React.useEffect(() => {
    if (rainData) {
      setFrames(rainData?.radar.past.concat(rainData?.radar.nowcast));
      dispatch("reset");
    }
  }, [rainData]);

  function frameReducer(frame: frameProps, action: Action): frameProps {
    if (!frames || !rainData) return frame;
    switch (action) {
      case "increment":
        if (frame.step === frames.length - 1) return { step: 0 };
        return { step: frame.step + 1 };
      case "decrement":
        if (frame.step === 0) return { step: frames.length - 1 };
        return { step: frame.step - 1 };
      case "reset":
        return { step: rainData.radar.past.length - 1 };
      default:
        return frame;
    }
  }

  return (
    <LoadingWrapper
      loading={loading || !rainData}
      error={error || fetchError}
      className={styles.loadingWrapper}
      contentClassName={styles.mapWrapper}
      showIcons
    >
      {location && frames && (
        <>
          <MapContainer
            center={[location.lat, location.lon]}
            zoom={8}
            scrollWheelZoom={true}
            className={styles.root}
            fadeAnimation={false}
          >
            <TileLayer
              className={styles.OSM}
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {rainData && (
              <TileLayer
                key={`weather-data-${frames[currentFrame.step].time}`}
                url={`${rainData.host}${frames[currentFrame.step].path}/512/{z}/{x}/{y}/6/1_0.png`}
              />
            )}
          </MapContainer>
          <div className={styles.controls}>
            <button
              className={styles.btnBackward}
              aria-label="back"
              onClick={() => dispatch("decrement")}
            >
              <FiChevronLeft />
            </button>
            <button
              className={styles.btnPause}
              aria-label="pause/play"
              onClick={() => setIsPlaying(prev => !prev)}
            >
              {isPlaying ? <FiPauseCircle /> : <FiPlay />}
            </button>
            <button
              className={styles.btnForward}
              aria-label="forward"
              onClick={() => dispatch("increment")}
            >
              <FiChevronRight />
            </button>
          </div>
          <div className={styles.time}>
            <p>
              {rainData &&
                getHourString(
                  (getItem("unit-time") as timeUnits) || timeUnits.twentyfour,
                  new Date(frames[currentFrame.step].time * 1000),
                )}
            </p>
          </div>
        </>
      )}
    </LoadingWrapper>
  );
}
