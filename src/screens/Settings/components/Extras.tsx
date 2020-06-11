import React, { useState, useEffect } from 'react'
import styles from './Settings.module.scss'
import { Global } from 'utils/globals'

import Toast from 'components/Toast'

import * as Strings from 'utils/strings'
import { clearAllWeatherData } from 'model/utilsStorage';
import { AnimatePresence } from 'framer-motion';

export default function Extras() {
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
        setToastText(Strings.TextClearCacheSuccess)
        Global.shouldReload = true
        timer = setTimeout(() => {
            setToastText(undefined)
        }, 3000) 
    }
    return (
        <div className={styles.settingsCategory}>
            <h2>{Strings.TextExtras}</h2>
            <button onClick={handleButtonClick}>{Strings.TextClearCache}</button>
            <AnimatePresence>
                {toastText && 
                    <Toast text={toastText}/>
                }
            </AnimatePresence>
        </div>
    )
}
