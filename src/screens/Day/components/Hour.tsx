import React, { useState } from 'react'
import styles from './Hour.module.scss'
import { motion } from 'framer-motion'
import * as FormattedWeatherData from 'model/TypesFormattedWeather'
import Grid from 'components/Grid'


interface Props {
    hour: FormattedWeatherData.Hour
    animateExpand: boolean
}
const variants = {
    open: { height: "auto" },
    closed: { height: 72 },
  }
export default function Hour(props: Props) {
    const [isExpandedVis, setExpandedVis] = useState(false)
    const [isMountedVis, setMountedVis] = useState(false)

    function setExpanded() {
        if (isExpandedVis) {
            setExpandedVis(false)
            setTimeout(() => setMountedVis(false), 50)
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
            initial={false}>
                <div className={styles.preview}>
                    <div className={styles.left}>
                        <p className={styles.hourText}>{props.hour.hour}</p>
                        <p>{props.hour.text}</p>
                    </div>
                    <div className={styles.right}>
                        <p className={styles.temprText}>{props.hour.tempr}</p>
                        <i className={styles.weatherIcon + " wi " + props.hour.icon}/>
                    </div>    
                </div>
                {isMountedVis &&
                    <Grid altStyle={true} data={props.hour}/>
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
                        <p className={styles.hourText}>{props.hour.hour}</p>
                        <p>{props.hour.text}</p>
                    </div>
                    <div className={styles.right}>
                        <p className={styles.temprText}>{props.hour.tempr}</p>
                        <i className={styles.weatherIcon + " wi " + props.hour.icon}/>
                    </div>    
                </div>
                {isMountedVis &&
                    <Grid altStyle={true} data={props.hour}/>
                }
            </div>
        )
    }
}
