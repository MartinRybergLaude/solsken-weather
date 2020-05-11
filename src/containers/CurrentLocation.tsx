import React, { useEffect, useRef, useState } from 'react'
import Grid from 'components/Grid'
import styles from './CurrentLocation.module.scss'
import { WiUmbrella, WiDirectionUp, WiBarometer, WiFog, WiRaindrop, WiStrongWind, WiCloudy, WiThermometer } from 'weather-icons-react'
import retrieveWeather from 'scripts/retrieveWeather'
import { WeatherData } from 'scripts/universalWeatherTypes'

export default function CurrentLocation() {
    useEffect(() => checkLocationPermission(), [])

    const loadingScreenRef = useRef<any>()
    const loadingTextRef = useRef<any>()

    
    function checkLocationPermission() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(RetreiveData, displayLocationError)
        } else {
            displayNotSupported()
        }
    }
    function RetreiveData(pos: Position) {
        let lon = pos.coords.longitude.toFixed(6)
        let lat = pos.coords.latitude.toFixed(6)
        retrieveWeather(lon, lat, applyData)
    }
    function applyData(data: WeatherData | null) {
        
    }
    function displayLocationError() {
        loadingTextRef.current.value = "Could not get your location!"
    }
    function displayNotSupported() {
        loadingTextRef.current.value = "Geolocation not supported by your browser or device."
    }
    return (
        <div className={styles.containerMain}>
            <div ref={loadingScreenRef} className={styles.loading}>
                <p ref={loadingTextRef}>Loading...</p>
            </div>
            <div className={styles.containerCurrentLocation}>
                <h1 className={styles.textCity}>City</h1>
                <div className={styles.containerGrid}>
                    <div>
                        <h2 className={styles.textTempr}>55°</h2>
                        <div className={styles.containerWthr}>
                            <WiCloudy className={styles.icon} />
                            <p className={styles.textWthr}>Mulet</p>
                        </div>
                    </div>
                </div>
                <Grid />
                <button className={styles.btn}>Forecast</button>
            </div>
        </div>
    )
}
