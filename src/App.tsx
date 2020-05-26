import React, { useEffect, useState} from 'react'

import './App.scss'
import 'weathericons/css/weather-icons.min.css'
import 'weathericons/css/weather-icons-wind.min.css'

import { MemoryRouter, Route, Switch } from 'react-router-dom'
import { motion, AnimatePresence } from "framer-motion"

import LoadingScreen from 'screens/Loading/ScreenLoading'
import ScreenWeather from 'screens/Weather/ScreenWeather'
import ScreenSettings from 'screens/Settings/ScreenSettings'
import ScreenHours from 'screens/Hours/ScreenHours'

import { FormattedWeatherData } from 'model/TypesFormattedWeather'
import retrieveWeather from 'model/retrieveWeather'
import formatWeather from 'model/formatWeather'
import * as Strings from 'utils/strings'

const variants = ({
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0.95 }
  });

function App() {
    useEffect(() => callRetrieveDataTesting(), [])
    const [textLoading, setTextLoading] = useState(Strings.TextLoading)
    const [showLoading, setShowLoading] = useState(true)
    const [weatherData, setWeatherData] = useState<FormattedWeatherData>()


    function checkLocationPermission() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(RetreiveData, locationErrorCallback, {maximumAge:60000, timeout:10000})
        } else {
            displayError(Strings.ErrorLocationNotSupported)
        }
    }
    function locationErrorCallback() {
        displayError(Strings.ErrorLocation)
    }
    async function RetreiveData(pos: Position) {
        let lon = pos.coords.longitude.toFixed(6)
        let lat = pos.coords.latitude.toFixed(6)
        retrieveWeather(lon, lat)
        .then(data => formatWeather(data))
        .then(formattedData => applyData(formattedData))
        .catch(error => displayError(error.message))
    }
    function callRetrieveDataTesting() {
        retrieveDataTesting()
    }
    async function retrieveDataTesting() {
        let lon = "17.823493"
        let lat = "59.373137"
        retrieveWeather(lon, lat)
        .then(data => formatWeather(data))
        .then(formattedData => applyData(formattedData))
        .catch(error => displayError(error.message))
    }
    function applyData(data: FormattedWeatherData) {
        setWeatherData(data)
        setShowLoading(false)
    }
    function displayError(error: string) {
        setTextLoading(error)
    }
    return (
        <MemoryRouter initialEntries={["/weather", "/settings"]} initialIndex={0}>
            <Route render={(props: any) => (
                <AnimatePresence>
                    <motion.div
                        className="containerPages"
                        initial="hidden" 
                        animate="visible" 
                        exit="hidden" 
                        variants={variants}
                        transition={{ ease: "easeOut", duration: 0.1 }}
                        key={props.location.key}>

                        <Switch location={props.location}>
                            <Route path="/weather">
                                {showLoading ? <LoadingScreen text={textLoading}/> : null}
                                <ScreenWeather weatherData={weatherData}/>
                            </Route>
                            <Route path="/hours/:id">
                                <ScreenHours weatherData={weatherData}/>
                            </Route>
                            <Route path="/settings">
                                <ScreenSettings/>
                            </Route>
                        </Switch>
                    </motion.div>
                </AnimatePresence>
            )}/>
            
        </MemoryRouter>
    );
}

export default App;
