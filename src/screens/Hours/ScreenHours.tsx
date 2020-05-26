import React from 'react'
import styles from './ScreenHours.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import * as Strings from 'utils/strings'
import * as FormattedWeatherData from 'model/TypesFormattedWeather'
import Hour from './components/Hour'

interface Props extends RouteComponentProps<any> {
    weatherData: FormattedWeatherData.FormattedWeatherData | undefined | null
}
function ScreenHours(props: Props) {
    return (
        <div className={"containerMain " + styles.containerHours}>
            <div className={styles.toolbar}>
                <FontAwesomeIcon className={styles.toolbarIcon} icon={faArrowLeft} onClick={() => props.history.goBack()} />
                <h2 className={styles.toolbarText}>{Strings.Hours}</h2>
            </div>
            <div className={styles.containerScroll}>
                {props.weatherData?.days[props.match.params.id].hours.map((hour, index) => {
                    return (
                        <Hour key={index} hour={hour}/>
                    )
                })}
            </div>
        </div>
    )
}
export default withRouter(ScreenHours)