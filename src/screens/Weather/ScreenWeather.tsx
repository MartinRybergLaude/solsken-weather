import React, { useEffect, useState } from 'react'
import styles from './ScreenWeather.module.scss'

import { Global } from 'utils/globals'

import { RouteComponentProps, withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faBars } from '@fortawesome/free-solid-svg-icons'

import * as Data from 'model/TypesFormattedWeather'
import FragmentLoading from 'screens/Weather/fragments/FragmentLoading'
import FragmentWeather from './fragments/FragmentWeather'
import FragmentSidebar from 'screens/Weather/fragments/FragmentSidebar'
import { AnimatePresence, motion } from 'framer-motion'

interface Props extends RouteComponentProps{
    weatherData: Data.FormattedWeatherData | undefined
    reapplyUnitsCallback: Function
    textLoading: string
}
const variantsCover = ({
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
});
function ScreenWeather(props: Props) {

    const [showSidebar, setShowSidebar] = useState(false)

    useEffect(() => {
        // Basically if a setting has been changed
        if (Global.shouldReformat) {
            Global.shouldReformat = false
            props.reapplyUnitsCallback()
        }
    }, [])

    return (
        <div className="screen">
            <div className={styles.toolbar}>
                <FontAwesomeIcon className={styles.toolbarIcon} icon={faBars} onClick={() => setShowSidebar(!showSidebar)}/>
                <h2 className={styles.toolbarText}>{props.weatherData?.city}</h2>
                <FontAwesomeIcon className={styles.toolbarIcon} icon={faCog} onClick={() => props.history.push("/settings")}/>
            </div>
            <FragmentLoading text={props.textLoading} show={props.weatherData ? true : false}/>
            {props.weatherData && 
                <FragmentWeather weatherData={props.weatherData}/>
            }
            <FragmentSidebar visible={showSidebar} setVisibility={setShowSidebar}/>
            
            <AnimatePresence>
                {showSidebar &&
                    <motion.div
                        key="cover"
                        className={styles.cover}
                        initial="hidden" 
                        animate="visible" 
                        exit="hidden" 
                        variants={variantsCover}
                        transition={{ type: "spring", stiffness: 2000, damping: 100 }}>
                
                    </motion.div>
                }   
            </AnimatePresence>
            
        </div>
    )
}
export default withRouter(ScreenWeather)
