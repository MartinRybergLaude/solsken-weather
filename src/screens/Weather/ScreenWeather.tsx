import React, { useState, useEffect } from 'react'
import Grid from 'screens/Weather/components/Grid'
import styles from './ScreenWeather.module.scss'
import * as Strings from 'utils/strings'
import * as Consts from 'utils/constants'
import * as Data from 'model/TypesFormattedWeather'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faMapMarkerAlt, faMap } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Days from './components/Days'

interface Props extends RouteComponentProps{
    weatherData: Data.FormattedWeatherData | undefined | null
}
function ScreenWeather(props: Props) {
    const [weatherData, setWeatherData] = useState<Data.FormattedWeatherData>()
    
    useEffect( () => {
        if(props.weatherData != null) {
            console.log("weather updated")
            setWeatherData(props.weatherData)
        }
    }, [props.weatherData])

    if (weatherData == null) return null
    else return (
        <div className={"containerMain " + styles.containerScreenWeather}>
            <div className={styles.toolbar}>
                <FontAwesomeIcon className={styles.toolbarIcon} icon={faCog} onClick={() => props.history.push("/settings")}/>
                <h2 className={styles.toolbarText}>{weatherData.city}</h2>
                <FontAwesomeIcon className={styles.toolbarIcon} icon={faMap}/>
            </div>
            
            <div className={styles.containerGrid}>
                <div>
                    <h1 className={styles.textTempr}>{weatherData.days[0].hours[0].tempr}</h1>
                    <div className={styles.containerWthr}>
                        <i className={styles.iconWthr + " wi " + weatherData.days[0].hours[0].icon}/>
                        <div className={styles.containerWthrText}>
                            <p className={styles.textWthr}>{weatherData.days[0].hours[0].text}</p>
                            <p>{weatherData.days[0].dayOfWeek + " " + weatherData.days[0].hours[0].hour}</p>
                        </div>
                        
                    </div>
                </div>
                <Grid data={weatherData.days[0].hours[0]}/>
                <Days data={weatherData}/>
            </div>
        </div>
    )
}
export default withRouter(ScreenWeather)
