import React from "react";
import Lottie from "lottie-react";

import ClearDay from "~/assets/weather/clear-day.json";
import ClearNight from "~/assets/weather/clear-night.json";
import Cloudy from "~/assets/weather/cloudy.json";
import Drizzle from "~/assets/weather/drizzle.json";
import ExtremeDayRain from "~/assets/weather/extreme-day-rain.json";
import ExtremeDaySleet from "~/assets/weather/extreme-day-sleet.json";
import ExtremeDaySnow from "~/assets/weather/extreme-day-snow.json";
import ExtremeNightRain from "~/assets/weather/extreme-night-rain.json";
import ExtremeNightSleet from "~/assets/weather/extreme-night-sleet.json";
import ExtremeNightSnow from "~/assets/weather/extreme-night-snow.json";
import ExtremeRain from "~/assets/weather/extreme-rain.json";
import ExtremeSleet from "~/assets/weather/extreme-sleet.json";
import ExtremeSnow from "~/assets/weather/extreme-snow.json";
import Fog from "~/assets/weather/mist.json";
import Overcast from "~/assets/weather/overcast.json";
import OvercastDayRain from "~/assets/weather/overcast-day-rain.json";
import OvercastDaySleet from "~/assets/weather/overcast-day-sleet.json";
import OvercastDaySnow from "~/assets/weather/overcast-day-snow.json";
import OvercastNightRain from "~/assets/weather/overcast-night-rain.json";
import OvercastNightSleet from "~/assets/weather/overcast-night-sleet.json";
import OvercastNightSnow from "~/assets/weather/overcast-night-snow.json";
import OvercastRain from "~/assets/weather/overcast-rain.json";
import OvercastSleet from "~/assets/weather/overcast-sleet.json";
import OvercastSnow from "~/assets/weather/overcast-snow.json";
import PartlyCloudyDay from "~/assets/weather/partly-cloudy-day.json";
import PartlyCloudyDayDrizzle from "~/assets/weather/partly-cloudy-day-drizzle.json";
import PartlyCloudyDayRain from "~/assets/weather/partly-cloudy-day-rain.json";
import PartlyCloudyDaySleet from "~/assets/weather/partly-cloudy-day-sleet.json";
import PartlyCloudyDaySnow from "~/assets/weather/partly-cloudy-day-snow.json";
import PartlyCloudyNight from "~/assets/weather/partly-cloudy-night.json";
import PartlyCloudyNightDrizzle from "~/assets/weather/partly-cloudy-night-drizzle.json";
import PartlyCloudyNightRain from "~/assets/weather/partly-cloudy-night-rain.json";
import PartlyCloudyNightSleet from "~/assets/weather/partly-cloudy-night-sleet.json";
import PartlyCloudyNightSnow from "~/assets/weather/partly-cloudy-night-snow.json";
import Rain from "~/assets/weather/rain.json";
import Sleet from "~/assets/weather/sleet.json";
import Snow from "~/assets/weather/snow.json";
import Thunder from "~/assets/weather/thunderstorms.json";
import ThunderstormsDay from "~/assets/weather/thunderstorms-day.json";
import ThunderstormsNight from "~/assets/weather/thunderstorms-night.json";
import { WeatherIconEnum } from "~/enums/WeatherIcon";

import styles from "./WeatherIcon.module.css";

interface WeatherIconProps {
  id: WeatherIconEnum;
}
function WeatherIcon({ id }: WeatherIconProps) {
  const Icon = () => {
    switch (id) {
      case WeatherIconEnum.CLEAR_DAY:
        return <Lottie animationData={ClearDay} loop />;
      case WeatherIconEnum.CLEAR_NIGHT:
        return <Lottie animationData={ClearNight} loop />;
      case WeatherIconEnum.CLOUDY:
        return <Lottie animationData={Cloudy} loop />;
      case WeatherIconEnum.DRIZZLE:
        return <Lottie animationData={Drizzle} loop />;
      case WeatherIconEnum.FOG:
        return <Lottie animationData={Fog} loop />;
      case WeatherIconEnum.OVERCAST:
        return <Lottie animationData={Overcast} loop />;
      case WeatherIconEnum.PARTLY_CLOUDY_DAY:
        return <Lottie animationData={PartlyCloudyDay} loop />;
      case WeatherIconEnum.PARTLY_CLOUDY_DAY_DRIZZLE:
        return <Lottie animationData={PartlyCloudyDayDrizzle} loop />;
      case WeatherIconEnum.PARTLY_CLOUDY_DAY_RAIN:
        return <Lottie animationData={PartlyCloudyDayRain} loop />;
      case WeatherIconEnum.PARTLY_CLOUDY_DAY_SLEET:
        return <Lottie animationData={PartlyCloudyDaySleet} loop />;
      case WeatherIconEnum.PARTLY_CLOUDY_DAY_SNOW:
        return <Lottie animationData={PartlyCloudyDaySnow} loop />;
      case WeatherIconEnum.PARTLY_CLOUDY_NIGHT:
        return <Lottie animationData={PartlyCloudyNight} loop />;
      case WeatherIconEnum.PARTLY_CLOUDY_NIGHT_DRIZZLE:
        return <Lottie animationData={PartlyCloudyNightDrizzle} loop />;
      case WeatherIconEnum.PARTLY_CLOUDY_NIGHT_RAIN:
        return <Lottie animationData={PartlyCloudyNightRain} loop />;
      case WeatherIconEnum.PARTLY_CLOUDY_NIGHT_SLEET:
        return <Lottie animationData={PartlyCloudyNightSleet} loop />;
      case WeatherIconEnum.PARTLY_CLOUDY_NIGHT_SNOW:
        return <Lottie animationData={PartlyCloudyNightSnow} loop />;
      case WeatherIconEnum.RAIN:
        return <Lottie animationData={Rain} loop />;
      case WeatherIconEnum.SLEET:
        return <Lottie animationData={Sleet} loop />;
      case WeatherIconEnum.SNOW:
        return <Lottie animationData={Snow} loop />;
      case WeatherIconEnum.THUNDER:
        return <Lottie animationData={Thunder} loop />;
      case WeatherIconEnum.THUNDERSTORMS_DAY:
        return <Lottie animationData={ThunderstormsDay} loop />;
      case WeatherIconEnum.THUNDERSTORMS_NIGHT:
        return <Lottie animationData={ThunderstormsNight} loop />;
      case WeatherIconEnum.EXTREME_DAY_RAIN:
        return <Lottie animationData={ExtremeDayRain} loop />;
      case WeatherIconEnum.EXTREME_DAY_SLEET:
        return <Lottie animationData={ExtremeDaySleet} loop />;
      case WeatherIconEnum.EXTREME_DAY_SNOW:
        return <Lottie animationData={ExtremeDaySnow} loop />;
      case WeatherIconEnum.EXTREME_NIGHT_RAIN:
        return <Lottie animationData={ExtremeNightRain} loop />;
      case WeatherIconEnum.EXTREME_NIGHT_SLEET:
        return <Lottie animationData={ExtremeNightSleet} loop />;
      case WeatherIconEnum.EXTREME_NIGHT_SNOW:
        return <Lottie animationData={ExtremeNightSnow} loop />;
      case WeatherIconEnum.EXTREME_RAIN:
        return <Lottie animationData={ExtremeRain} loop />;
      case WeatherIconEnum.EXTREME_SLEET:
        return <Lottie animationData={ExtremeSleet} loop />;
      case WeatherIconEnum.EXTREME_SNOW:
        return <Lottie animationData={ExtremeSnow} loop />;
      case WeatherIconEnum.OVERCAST_DAY_RAIN:
        return <Lottie animationData={OvercastDayRain} loop />;
      case WeatherIconEnum.OVERCAST_DAY_SLEET:
        return <Lottie animationData={OvercastDaySleet} loop />;
      case WeatherIconEnum.OVERCAST_DAY_SNOW:
        return <Lottie animationData={OvercastDaySnow} loop />;
      case WeatherIconEnum.OVERCAST_NIGHT_RAIN:
        return <Lottie animationData={OvercastNightRain} loop />;
      case WeatherIconEnum.OVERCAST_NIGHT_SLEET:
        return <Lottie animationData={OvercastNightSleet} loop />;
      case WeatherIconEnum.OVERCAST_NIGHT_SNOW:
        return <Lottie animationData={OvercastNightSnow} loop />;
      case WeatherIconEnum.OVERCAST_RAIN:
        return <Lottie animationData={OvercastRain} loop />;
      case WeatherIconEnum.OVERCAST_SLEET:
        return <Lottie animationData={OvercastSleet} loop />;
      case WeatherIconEnum.OVERCAST_SNOW:
        return <Lottie animationData={OvercastSnow} loop />;
    }
  };
  return (
    <div className={styles.root}>
      <Icon />
    </div>
  );
}

export default WeatherIcon;
