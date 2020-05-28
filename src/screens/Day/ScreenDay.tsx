import React, { useEffect } from 'react'
import styles from './ScreenDay.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import * as Consts from 'utils/constants'

import * as FormattedWeatherData from 'model/TypesFormattedWeather'
import Hour from './components/Hour'

interface Props extends RouteComponentProps<any> {
    weatherData: FormattedWeatherData.FormattedWeatherData | undefined | null
}
function ScreenDay(props: Props) {

    const day = props.weatherData?.days[props.match.params.id]


    useEffect(() => {
        if (day == null) {
            props.history.push("/")
        }
    }, [])
    
    return (
        <div className={"containerMain " + styles.containerHours}>
            <div className={styles.toolbar}>
                <div className={styles.toolbarWrapperTitle}>
                    <FontAwesomeIcon className={styles.toolbarIcon} icon={faArrowLeft} onClick={() => props.history.push("/")} />
                    <h2 className={styles.toolbarText}>{day?.dayOfWeek}</h2>
                </div>
                <div className={styles.toolbarWrapperSun}>
                    <i className={"wi " + Consts.WiHorizon}/>
                    <div>
                        <p>{day?.sunrise}</p>
                        <p>{day?.sunset}</p>
                    </div>
                </div>
            </div>
            <div className={styles.containerScroll}>
                {day?.hours.map((hour, index) => {
                    return (
                        <Hour key={index} hour={hour}/>
                    )
                })}
            </div>
        </div>
    )
}
export default withRouter(ScreenDay)