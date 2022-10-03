import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Hours from "~/components/Hours";
import Layout from "~/containers/Layout";
import { useWeather } from "~/contexts/WeatherContext";
import { useWindowSize } from "~/hooks/useWindowSize";

function HoursPage() {
  const { index } = useParams();
  const { weather, setSelectedDay } = useWeather();
  const navigate = useNavigate();

  // Go back to main menu if weather data is unavailable
  useEffect(() => {
    if (!weather || !index) {
      navigate("/");
    }
  }, [weather, index]);

  // Show nothing if weather data is unavailable
  if (!weather || !index) {
    return null;
  }

  setSelectedDay(Number(index));

  const day = weather.formatted.days[Number(index)];

  const size = useWindowSize();

  useEffect(() => {
    if (size.width && size.width > 900) {
      navigate("/");
    }
  }, [size]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout flex>
      <Hours day={day} />
    </Layout>
  );
}

export default HoursPage;
