import React, { useState } from 'react'
import styles from './Hour.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import * as FormattedWeatherData from 'model/TypesFormattedWeather'
import Grid from './Grid'


interface Props {
    hour: FormattedWeatherData.Hour
}
export default function Hour(props: Props) {
    const [isExpandedVis, setExpandedVis] = useState(false)
    return (
            <div className={styles.hour} onClick={() => setExpandedVis(!isExpandedVis)}>
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
                <AnimatePresence>
                    {isExpandedVis &&
                        <motion.div className={styles.expanded}
                        key="options" 
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{ease: "easeInOut", duration: 0.1}}>
                            <Grid data={props.hour}/>
                        </motion.div>
                    }
                </AnimatePresence>
            </div>
    )
}
