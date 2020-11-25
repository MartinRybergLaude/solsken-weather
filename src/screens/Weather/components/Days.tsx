import React from 'react'
import styles from './Days.module.scss'

import { FormattedWeatherData } from 'model/TypesFormattedWeather'

import Day from './Day'

interface Props {
    data: FormattedWeatherData
}

export default function Days(props: Props) {
    
    return (
      <div className={styles.containerMain}>
        <div className={styles.containerScroll}>
            <div className={styles.containerDays}>
                {props.data.days.map((day, index) => {
                    return <Day key={index} data={day} index={index}/>
                })}
            </div>
        </div>
      </div>
    )
}
