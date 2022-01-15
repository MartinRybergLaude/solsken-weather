import React from 'react'
import styles from './FragmentWeather.module.scss'

import Grid from '../../../components/Grid'
import Days from '../components/Days'

import * as FormattedWeatherData from 'model/TypesFormattedWeather'
import { WeatherData } from 'model/TypesWeather'
import { getItem } from 'model/utilsStorage'
import { useTranslation } from 'react-i18next'

interface Props {
  weatherDataFormatted: FormattedWeatherData.FormattedWeatherData
  weatherData: WeatherData
}
export default function ContainerWeather(props: Props) {
  const { t } = useTranslation()

  function getSourceText() {
    const src = getItem('dataSrc')
    switch (src) {
      case 'smhi':
        return t('c_smhi')
      case 'yr':
        return t('c_yr')
      default:
        return t('c_yr')
    }
  }
  return (
    <div className="fragment">
      <div className={styles.containerMain}>
        <div className={styles.containerTopInfo}>
          <h1 className={styles.textTempr}>
            {props.weatherDataFormatted.days[0].hours[0].tempr}
          </h1>
          <div className={styles.containerWthr}>
            <i
              className={
                styles.iconWthr +
                ' wi ' +
                props.weatherDataFormatted.days[0].hours[0].icon
              }
            />
            <div className={styles.containerWthrText}>
              <p className={styles.textWthr}>
                {props.weatherDataFormatted.days[0].hours[0].text}
              </p>
              <p>
                {props.weatherDataFormatted.days[0].dayOfWeek +
                  ' ' +
                  props.weatherDataFormatted.days[0].hours[0].hour}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.containerGrid}>
          <Grid
            dataFormatted={props.weatherDataFormatted.days[0].hours[0]}
            data={props.weatherData.days[0].hours[0]}
          />
          <p className={styles.copyText}>{getSourceText()}</p>
        </div>
      </div>
      <Days data={props.weatherDataFormatted} />
    </div>
  )
}
