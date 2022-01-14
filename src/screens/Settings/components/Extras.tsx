import React, { useState, useEffect } from 'react'
import styles from './Settings.module.scss'
import { Global } from 'utils/globals'
import { useTranslation } from 'react-i18next'

import { clearAllWeatherData } from 'model/utilsStorage'
import { AnimatePresence } from 'framer-motion'
import Toast from 'components/Toast'
import Dropdown, { Option } from 'components/Dropdown'
import { getItem, setItem } from 'model/utilsStorage'

const srcOptions: Option[] = [
  { value: 'smhi', label: 'SMHI (Nordics)' },
  { value: 'yr', label: 'YR.no' },
]

export default function Extras() {
  // For toast timer not to memory leak
  let timer: NodeJS.Timer | undefined = undefined
  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [timer])

  const { t } = useTranslation()
  const [toastText, setToastText] = useState<string>()
  const [dataSrc, setDataSrc] = React.useState(getCurrentDataSrc)

  useEffect(() => {
    setItem('dataSrc', dataSrc)
  }, [dataSrc])

  function getCurrentDataSrc(): string {
    const cached = getItem('dataSrc')
    if (cached && srcOptions.filter((e) => e.value === cached)) {
      return cached
    } else {
      return 'yr'
    }
  }
  function handleButtonClick() {
    clearAllWeatherData()
    setToastText(t('text_cache_weatherdata_clear_success'))
    Global.shouldReload = true
    timer = setTimeout(() => {
      setToastText(undefined)
    }, 3000)
  }
  const onChangeSrc = (option: Option) => {
    if (option != null) {
      Global.shouldReload = true
      setDataSrc(option.value)
    }
  }
  return (
    <div className={styles.settingsCategory}>
      <h2>{t('title_extras')}</h2>
      <div className={styles.itemSettings}>
        <label>{t('text_data_source')}</label>
        <Dropdown value={dataSrc} onChange={onChangeSrc} options={srcOptions} />
      </div>
      <button onClick={handleButtonClick}>
        {t('text_cache_weatherdata_clear')}
      </button>
      <AnimatePresence>
        {toastText && <Toast text={toastText} />}
      </AnimatePresence>
    </div>
  )
}
