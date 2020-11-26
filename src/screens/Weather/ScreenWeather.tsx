import React, { useEffect, useState } from 'react'
import styles from './ScreenWeather.module.scss'

import { Global } from 'utils/globals'

import { RouteComponentProps, withRouter } from 'react-router-dom'

import { FiMenu, FiSettings } from 'react-icons/fi'
import { MdRefresh } from 'react-icons/md'

import * as FormattedWeatherData from 'model/TypesFormattedWeather'
import FragmentLoading from 'screens/Weather/fragments/FragmentLoading'
import FragmentWeather from './fragments/FragmentWeather'
import FragmentSidebar from 'screens/Weather/fragments/FragmentSidebar'
import { AnimatePresence, motion } from 'framer-motion'
import { WeatherData } from 'model/TypesWeather'

interface Props extends RouteComponentProps{
    weatherDataFormatted: FormattedWeatherData.FormattedWeatherData | undefined
    weatherData: WeatherData | undefined
    reapplyUnitsCallback: Function
    reloadWeatherDataCallback: Function
    changedLocation: Function
    textLoading: string | undefined
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
        if (Global.shouldReload) {
            Global.shouldReload = false
            props.reloadWeatherDataCallback()
        }
    }, [])

    function setSidebarVis(isVis: boolean) {
        setShowSidebar(isVis)
        if (!isVis && Global.selectedLocationChanged) {
            Global.selectedLocationChanged = false
            props.changedLocation()
        }
    }

    return (
        <div className="screen">
            <div className={styles.toolbar}>
                <FiMenu className={styles.toolbarIcon} onClick={() => setShowSidebar(!showSidebar)}/>
                <div className={styles.wrapperCenter}>
                    <h2 className={styles.toolbarText}>{props.weatherData?.city}</h2>
                    <MdRefresh className={styles.centerIcon} onClick={() => props.reloadWeatherDataCallback()}/>
                </div>
                <FiSettings className={styles.toolbarIcon} onClick={() => props.history.push("/settings")}/>
            </div>
            <FragmentLoading text={props.textLoading} show={props.weatherData ? true : false}/>
            {props.weatherDataFormatted && props.weatherData && 
                <FragmentWeather weatherDataFormatted={props.weatherDataFormatted} weatherData={props.weatherData}/>
            }
            <FragmentSidebar visible={showSidebar} setVisibility={setSidebarVis}/>
            
            <AnimatePresence>S
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
