import React from 'react'
import Grid from 'screens/Weather/components/Grid'
import styles from './ScreenWeather.module.scss'
import * as Data from 'model/TypesFormattedWeather'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faMap } from '@fortawesome/free-solid-svg-icons'
import Days from './components/Days'

interface Props extends RouteComponentProps{
    weatherData: Data.FormattedWeatherData
}
function ScreenWeather(props: Props) {
    
    return (
        <div className={"containerMain " + styles.containerScreenWeather}>
            <div className={styles.toolbar}>
                <FontAwesomeIcon className={styles.toolbarIcon} icon={faCog} onClick={() => props.history.push("/settings")}/>
                <h2 className={styles.toolbarText}>{props.weatherData.city}</h2>
                <FontAwesomeIcon className={styles.toolbarIcon} icon={faMap}/>
            </div>
            
            <div className={styles.containerGrid}>
                <div>
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
