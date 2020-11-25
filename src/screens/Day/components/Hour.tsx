import React, { useState } from 'react'
import styles from './Hour.module.scss'
import { motion } from 'framer-motion'
import * as FormattedWeatherData from 'model/TypesFormattedWeather'
import Grid from 'components/Grid'
import * as WeatherData from 'model/TypesWeather'


interface Props {
    hour: WeatherData.Hour
    hourFormatted: FormattedWeatherData.Hour
    animateExpand: boolean
}
const variants = {
    open: { height: 260 },
    closed: { height: 72 },
  }
export default function Hour(props: Props) {
    const [isExpandedVis, setExpandedVis] = useState(false)
    const [isMountedVis, setMountedVis] = useState(false)

    function setExpanded() {
        if (isExpandedVis) {
            setExpandedVis(false)
            setTimeout(() => setMountedVis(false), 100)
        } else {
            setExpandedVis(true)
            setMountedVis(true)
        }
    }

    if (props.animateExpand) { return (
            <motion.div
            className={styles.hour} 
            onClick={() => setExpanded()}
            animate={isExpandedVis ? "open" : "closed"}
            variants={variants}
            transition={{ type: "spring", stiffness: 1000, damping: 100 }}
            initial={false}>
                <div className={styles.preview}>
                    <div className={styles.left}>
                        <p className={styles.hourText}>{props.hourFormatted.hour}</p>
                        <p>{props.hourFormatted.text}</p>
                    </div>
                    <div className={styles.right}>
                        <p className={styles.temprText}>{props.hourFormatted.tempr}</p>
                        <i className={styles.weatherIcon + " wi " + props.hourFormatted.icon}/>
                    </div>    
                </div>
                {isMountedVis &&
                  <div className={styles.containerExpanded}>
                    <Grid altStyle={true} dataFormatted={props.hourFormatted} data={props.hour}/>
                  </div>
                }
            </motion.div>
        )
    } else {
        return (
            <div
            className={styles.hour} 
            onClick={() => (setMountedVis(!isMountedVis))}>
                <div className={styles.preview}>
                    <div className={styles.left}>
                        <p className={styles.hourText}>{props.hourFormatted.hour}</p>
                        <p>{props.hourFormatted.text}</p>
                    </div>
                    <div className={styles.right}>
                        <p className={styles.temprText}>{props.hourFormatted.tempr}</p>
                        <i className={" wi " + props.hourFormatted.icon}/>
                    </div>    
                </div>
                {isMountedVis &&
                  <div className={styles.containerExpanded}>
                    <Grid altStyle={true} dataFormatted={props.hourFormatted} data={props.hour}/>
                  </div>
                }
            </div>
        )
    }
}
