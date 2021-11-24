import React, { useState } from 'react'
import styles from './Hour.module.scss'
import { motion } from 'framer-motion'
import * as FormattedWeatherData from 'model/TypesFormattedWeather'
import Grid from 'components/Grid'
import * as WeatherData from 'model/TypesWeather'


interface Props {
    hour: WeatherData.Hour
    hourFormatted: FormattedWeatherData.Hour
    taller: boolean
}
export default function Hour(props: Props) {
    const variants = {
        open: { height: 260 },
        closed: { height:  props.taller ? 160 : 72},
    }

    const [isExpandedVis, setExpandedVis] = useState(false)
    const [isMountedVis, setMountedVis] = useState(props.taller)

    function setExpanded() {
        if (!props.taller) {
            if (isExpandedVis) {
                setExpandedVis(false)
                setTimeout(() => setMountedVis(false), 100)
            } else {
                setExpandedVis(true)
                setMountedVis(true)
            }
        } else {
            if (isExpandedVis) {
                setExpandedVis(false)
            } else {
                setExpandedVis(true)
            }
        }
        
    }

    return (
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
}
