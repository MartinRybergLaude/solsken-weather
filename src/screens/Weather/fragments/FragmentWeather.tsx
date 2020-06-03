import React from 'react'
import styles from './FragmentWeather.module.scss'

import Grid from '../components/Grid'
import Days from '../components/Days'

import * as Data from 'model/TypesFormattedWeather'

interface Props {
    weatherData: Data.FormattedWeatherData
}
export default function ContainerWeather(props: Props) {
    return (
        <div className="fragment">
            <div className={styles.containerMain}>
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
