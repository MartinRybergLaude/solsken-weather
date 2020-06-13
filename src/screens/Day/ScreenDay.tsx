import React, { useEffect } from 'react'
import styles from './ScreenDay.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faChartBar } from '@fortawesome/free-solid-svg-icons'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import Bowser from 'bowser'

import * as Consts from 'utils/constants'

import * as FormattedWeatherData from 'model/TypesFormattedWeather'
import Hour from './components/Hour'

interface Props extends RouteComponentProps<any> {
    weatherData: FormattedWeatherData.FormattedWeatherData | undefined | null
}
const browser = Bowser.getParser(navigator.userAgent)
const isMobileFirefox = browser.getEngine().name === "Gecko"
    && browser.getPlatform().type === "mobile" && browser.getOSName() === "Android"

function ScreenDay(props: Props) {

    const day = props.weatherData?.days[props.match.params.id]
    
    useEffect(() => {
        if (props.weatherData?.days[props.match.params.id] == null) {
            props.history.push("/")
        }
    }, [props])
    
    return (
        <div className={"screen " + styles.containerHours}>
            <div className={styles.toolbar}>
                <div className={styles.toolbarWrapperTitle}>
                    <FontAwesomeIcon className={styles.toolbarIcon} icon={faArrowLeft} onClick={() => props.history.push("/")} />
                    <h2 className={styles.toolbarText}>{day?.dayOfWeek}</h2>
                </div>
                <FontAwesomeIcon className={styles.toolbarIcon} icon={faChartBar} onClick={() => props.history.push("/charts/" + props.match.params.id)}/>
            </div>
            <div className={styles.containerScroll}>
                <div className={styles.wrapperSun}>
                    <p>{day?.sunrise}</p>
                    <i className={"wi " + Consts.WiHorizon}/>
                    <p>{day?.sunset}</p>
                </div>
                {day?.hours.map((hour, index) => {
                    return (
                        <Hour key={index} hour={hour} animateExpand={!isMobileFirefox}/>
                    )
                })}
            </div>
        </div>
    )
}
export default withRouter(ScreenDay)