import React, { useState } from 'react'
import styles from './Hour.module.scss'
import { motion } from 'framer-motion'
import * as FormattedWeatherData from 'model/TypesFormattedWeather'
import Grid from 'components/Grid'
import * as WeatherData from 'model/TypesWeather'
import * as Consts from 'utils/constants'

interface Props {
  hour: WeatherData.Hour
  hourFormatted: FormattedWeatherData.Hour
}
export default function Hour(props: Props) {
  const variants = {
    open: { height: 152 },
    closed: { height: 72 },
  }

  const [isExpandedVis, setExpandedVis] = useState(false)
  const [isMountedVis, setMountedVis] = useState(false)

  function setExpanded() {
    if (isExpandedVis) {
      setExpandedVis(false)
      setTimeout(() => setMountedVis(false), 200)
    } else {
      setExpandedVis(true)
      setMountedVis(true)
    }
  }

  return (
    <motion.div
      className={styles.hour}
      onClick={() => setExpanded()}
      animate={isExpandedVis ? 'open' : 'closed'}
      variants={variants}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25,
      }}
      initial={false}
    >
      <div className={styles.preview}>
        <div className={styles.left}>
          <p className={styles.value}>{props.hourFormatted.hour}</p>
          <div className={styles.row}>
            <p className={styles.value + ' ' + styles.temprText}>
              {props.hourFormatted.tempr}
            </p>
            <p className={styles.temprText}>{props.hourFormatted.feelslike}</p>
          </div>
        </div>
        <div>
          <i
            className={styles.weatherIcon + ' wi ' + props.hourFormatted.icon}
          />
        </div>
        <div>
          <p className={styles.value}>
            {props.hourFormatted.precMean.split(' ')[0]}
          </p>
          <p>{props.hourFormatted.precMean.split(' ')[1]}</p>
        </div>
        <div className={styles.row}>
          <div>
            <p className={styles.value}>
              {props.hourFormatted.wind.split(' ')[0]}
            </p>
            <p>{props.hourFormatted.wind.split(' ')[1]}</p>
          </div>
          <i
            className={
              styles.windIcon +
              ' wi ' +
              Consts.WiWind +
              ' towards-' +
              props.hourFormatted.windDirDeg +
              '-deg'
            }
          />
        </div>
      </div>
      {isMountedVis && (
        <div className={styles.containerExpanded}>
          <Grid
            dataFormatted={props.hourFormatted}
            data={props.hour}
            compact={true}
          />
        </div>
      )}
    </motion.div>
  )
}
