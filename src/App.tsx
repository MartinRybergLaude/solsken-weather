import { BrowserRouter, Route, Routes } from "react-router-dom";

import "@fontsource/roboto-flex/variable.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LocationContextProvider } from "~/contexts/LocationContext";
import { WeatherContextProvider } from "~/contexts/WeatherContext";
import Home from "~/pages/Home/Home";

function App() {
  return (
    <LocationContextProvider>
      <WeatherContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </WeatherContextProvider>
    </LocationContextProvider>
  );
}

export default App;
