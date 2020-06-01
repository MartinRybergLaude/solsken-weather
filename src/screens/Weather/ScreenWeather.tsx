import React, { useEffect } from 'react'
import styles from './ScreenWeather.module.scss'

import { Global } from 'utils/globals'

import { RouteComponentProps, withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faBars } from '@fortawesome/free-solid-svg-icons'

import Grid from 'screens/Weather/components/Grid'
import Days from './components/Days'
import * as Data from 'model/TypesFormattedWeather'

interface Props extends RouteComponentProps{
    weatherData: Data.FormattedWeatherData
    reapplyUnitsCallback: Function
}
function ScreenWeather(props: Props) {

    useEffect(() => {
        // Basically if a setting has been changed
        if (Global.shouldReformat) {
            Global.shouldReformat = false
            props.reapplyUnitsCallback()
        }
    }, [])
   
    return (
        <div className={"containerMain " + styles.containerScreenWeather}>
            <div className={styles.toolbar}>
                <FontAwesomeIcon className={styles.toolbarIcon} icon={faBars}/>
                <h2 className={styles.toolbarText}>{props.weatherData.city}</h2>
                <FontAwesomeIcon className={styles.toolbarIcon} icon={faCog} onClick={() => props.history.push("/settings")}/>
            </div>
            
            <div className={styles.containerScreenContent}>
                <div className={styles.containerTopInfo}>
                    <h1 className={styles.textTempr}>{props.weatherData.days[0].hours[0].tempr}</h1>
                    <div className={styles.containerWthr}>
                        <i className={styles.iconWthr + " wi " + props.weatherData.days[0].hours[0].icon}/>
                        <div className={styles.containerWthrText}>
                            <p className={styles.textWthr}>{props.weatherData.days[0].hours[0].text}</p>
                            <p>{props.weatherData.days[0].dayOfWeek + " " + props.weatherData.days[0].hours[0].hour}</p>
                        </div>
                        
                    </div>
                </div>
                <Grid data={props.weatherData.days[0].hours[0]}/>
                <Days data={props.weatherData}/>
            </div>
        </div>
    )
}
export default withRouter(ScreenWeather)
