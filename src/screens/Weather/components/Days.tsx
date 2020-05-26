import React from 'react'
import { FormattedWeatherData } from '../../../model/TypesFormattedWeather'
import styles from './Days.module.scss'
import Day from './Day'
import { motion } from "framer-motion"
interface Props {
    data: FormattedWeatherData
}

export default function Days(props: Props) {
    
    return (
        <motion.div className={styles.containerScroll}
            initial={{opacity: 0, y: 5}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 5}}
            transition={{ease: "easeOut", duration: 0.3}}>
            <div className={styles.containerDays}>
                {props.data.days.map((day, index) => {
                    return <Day key={index} data={day} index={index}/>
                })}
            </div>
        </motion.div>
        
    )
}
