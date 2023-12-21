import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "@fontsource/roboto-flex/variable.css";
import { LocationContextProvider } from "~/contexts/LocationContext";
import { WeatherContextProvider } from "~/contexts/WeatherContext";

import { useThemeDetector } from "./hooks/useThemeDetector";
import Home from "./pages/HomePage";
import HoursPage from "./pages/HoursPage";
import OnboardingPage from "./pages/OnboardingPage";

function App() {
  const isDarkTheme = useThemeDetector();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("onboarding") !== "true") {
      localStorage.setItem("onboarding", "true");
      setShowOnboarding(true);
    }
  }, []);

  return (
    <>
      <Helmet>
        <meta name="theme-color" content={isDarkTheme ? "#101010" : "#eef3f9"} />
      </Helmet>

      <LocationContextProvider>
        <WeatherContextProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  showOnboarding ? (
                    <OnboardingPage onComplete={() => setShowOnboarding(false)} />
                  ) : (
                    <Home />
                  )
                }
              />
              <Route path="/hours/:index" element={<HoursPage />} />
            </Routes>
          </BrowserRouter>
        </WeatherContextProvider>
      </LocationContextProvider>
    </>
  );
}

export default App;
