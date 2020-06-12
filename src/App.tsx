import React, { useEffect, useState} from 'react'

import './App.scss'
import 'weathericons/css/weather-icons.min.css'
import 'weathericons/css/weather-icons-wind.min.css'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from 'react-i18next';

import ScreenWeather from 'screens/Weather/ScreenWeather'
import ScreenSettings from 'screens/Settings/ScreenSettings'
import ScreenHours from 'screens/Day/ScreenDay'

import { FormattedWeatherData } from 'model/TypesFormattedWeather'
import retrieveWeather from 'model/retrieveWeather'
import formatWeather from 'model/formatWeather'
import { WeatherData } from 'model/TypesWeather'
import { getItem, clearExpiredWeatherData } from 'model/utilsStorage'
import LocationType from 'model/TypesLocation'

const variantsPages = ({
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0.95 }
});

let weatherData: WeatherData | undefined

function App() {
    const { t, i18n } = useTranslation()

    const [textLoading, setTextLoading] = useState<string>()
    const [formattedWeatherData, setFormattedWeatherData] = useState<FormattedWeatherData>()
    useEffect(() => {
        clearExpiredWeatherData()
        getSelectedLocation() 
    }, [])

    function getSelectedLocation() {
        weatherData = undefined
        setTextLoading(undefined)
        setFormattedWeatherData(undefined)
        const selectedLocation = getItem("selectedLoc")
        if (selectedLocation) {
            const selectedLocationParsed = JSON.parse(selectedLocation) as LocationType
            retrieveLocData(selectedLocationParsed.lon, selectedLocationParsed.lat, selectedLocationParsed.name)
        } else {
            checkLocationPermission()
        }
    }
    function checkLocationPermission() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(retrieveCurrentLocData, locationErrorCallback, {maximumAge:60000, timeout:10000})
        } else {
            displayError(t("error_location_not_supported"))
        }
    }
    function locationErrorCallback() {
        displayError(t("error_location_cant_get"))
    }
    async function retrieveCurrentLocData(pos: Position) {
       
        const lon = pos.coords.longitude.toFixed(2)
        const lat = pos.coords.latitude.toFixed(2)
        retrieveWeather(lon, lat, null)
        .then(data => {
            weatherData = data
            return formatWeather(data)
        })
        .then(formattedData => applyData(formattedData))
        .catch(error => displayError(error.message))
    }
    async function retrieveLocData(lon: number, lat: number, locationName: string) {
        retrieveWeather(lon.toFixed(2), lat.toFixed(2), locationName)
        .then(data => {
            weatherData = data
            return formatWeather(data)
        })
        .then(formattedData => applyData(formattedData))
        .catch(error => displayError(error.message))
    }

    function applyData(data: FormattedWeatherData) {
        setFormattedWeatherData(data)
    }

    // Used for when units are changed through settings
    async function reapplyUnits() {
        if (weatherData != null) {
            // Data exists, just re-format
            setFormattedWeatherData(undefined)
            setTextLoading(undefined)
            formatWeather(weatherData)
            .then(formattedData => applyData(formattedData)) 
            .catch(error => displayError(error.message))
        } else {
            // Data does not exist, get new data
            getSelectedLocation()
        }
    }
    function displayError(error: string) {
        setTextLoading(error)
    }
    return (
        <BrowserRouter>
            <Route render={(props: any) => (
                <AnimatePresence exitBeforeEnter initial={true}>
                    <motion.div
                        className="screen"
                        initial="hidden" 
                        animate="visible" 
                        exit="hidden" 
                        variants={variantsPages}
                        transition={{ type: "spring", stiffness: 2000, damping: 100 }}
                        key={props.location.key}>

                        <Switch location={props.location}>
                            <Route exact path="/">
                                <ScreenWeather textLoading={textLoading} weatherData={formattedWeatherData} 
                                reapplyUnitsCallback={reapplyUnits} reloadWeatherDataCallback={getSelectedLocation} changedLocation={getSelectedLocation}/>
                            </Route>
                            <Route path="/day/:id">
                                <ScreenHours weatherData={formattedWeatherData}/>
                            </Route>
                            <Route path="/settings">
                                <ScreenSettings />
                            </Route>
                            <Redirect to="/"/>
                        </Switch>
                    </motion.div>
                </AnimatePresence>
            )}/>
            
        </BrowserRouter>
    );
}

export default App;
