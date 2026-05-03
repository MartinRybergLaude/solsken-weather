import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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

  useEffect(() => {
    const color = isDarkTheme ? "#101010" : "#eef3f9";
    let meta = document.querySelector<HTMLMetaElement>("meta[name=theme-color]");
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "theme-color";
      document.head.appendChild(meta);
    }
    meta.content = color;
  }, [isDarkTheme]);

  return (
    <>
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
