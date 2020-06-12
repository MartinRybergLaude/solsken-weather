import React, { useState, useEffect } from 'react'
import styles from './Settings.module.scss'
import { Global } from 'utils/globals'
import { useTranslation } from 'react-i18next'

import { clearAllWeatherData } from 'model/utilsStorage';
import { AnimatePresence } from 'framer-motion';
import Toast from 'components/Toast'

export default function Extras() {
    const { t, i18n } = useTranslation()
    const [toastText, setToastText] = useState<string>()

    let timer: NodeJS.Timer
    useEffect(() => {
        
        return () => {
            if (timer) {
                clearTimeout(timer)
            }
        }
    }, [])
    function handleButtonClick() {
        clearAllWeatherData()
        setToastText(t("text_cache_weatherdata_clear_success"))
        Global.shouldReload = true
        timer = setTimeout(() => {
            setToastText(undefined)
        }, 3000) 
    }
    return (
        <div className={styles.settingsCategory}>
            <h2>{t("title_extras")}</h2>
            <button onClick={handleButtonClick}>{t("text_cache_weatherdata_clear")}</button>
            <AnimatePresence>
                {toastText && 
                    <Toast text={toastText}/>
                }
            </AnimatePresence>
        </div>
    )
}
