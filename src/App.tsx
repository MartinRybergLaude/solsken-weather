import { Helmet } from "react-helmet";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "@fontsource/roboto-flex/variable.css";
import { LocationContextProvider } from "~/contexts/LocationContext";
import { WeatherContextProvider } from "~/contexts/WeatherContext";

import { useThemeDetector } from "./hooks/useThemeDetector";
import Home from "./pages/HomePage";
import HoursPage from "./pages/HoursPage";

function App() {
  const isDarkTheme = useThemeDetector();

  return (
    <>
      <Helmet>
        <meta name="theme-color" content={isDarkTheme ? "#292b2f" : "#eef3f9"} />
      </Helmet>

      <LocationContextProvider>
        <WeatherContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/hours/:index" element={<HoursPage />} />
            </Routes>
          </BrowserRouter>
        </WeatherContextProvider>
      </LocationContextProvider>
    </>
  );
}

export default App;
