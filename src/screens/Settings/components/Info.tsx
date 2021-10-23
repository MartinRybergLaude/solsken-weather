import React from 'react'
import styles from './Settings.module.scss'

import { useTranslation } from 'react-i18next'

import { FaUserCircle, FaGlobe, FaGithub , FaTwitter, FaInstagram } from 'react-icons/fa'

import { getItem } from 'model/utilsStorage'

export default function Info() {
    const { t } = useTranslation()
    const version = getItem("version")
    return (
        <div className={styles.settingsCategory}>
            <h2>{t("title_info")}</h2>
            <p className={styles.categoryDesc}>v. {version}</p>
            <p className={styles.categoryDesc}>{t("text_weatherdata_from")} 
                <a className={styles.link} href="http://opendata.smhi.se/apidocs/metfcst/index.html"> SMHI Open Data Api</a> ,
                <a className={styles.link} href="https://openweathermap.org/api"> OpenWeatherMap</a>, & 
                <a className={styles.link} href="https://developer.yr.no/"> Norwegian Meteorological Institute and NRK.</a>
            </p>
            <div className={styles.contactWrapper}>
                <div className={styles.itemContact + " " + styles.first}>
                    <FaUserCircle className={styles.icon} />
                    <div>
                        <p>Martin Ryberg Laude</p>
                        <p>Stockholm, Sweden</p>
                    </div>
                </div>
                <a href="https://mrlaude.com/" className={styles.itemContact + " " + styles.itemContactLink}>
                    <FaGlobe className={styles.icon} />
                    <div>
                        <p>{t("text_website")}</p>
                        <p>mrlaude.com</p>
                    </div>
                </a>
                <a href="https://github.com/MartinRybergLaude" className={styles.itemContact + " " + styles.itemContactLink}>
                    <FaGithub className={styles.icon} />
                    <div>
                        <p>Github</p>
                        <p>@martinryberglaude</p>
                    </div>
                </a>
                <a href="https://twitter.com/martini_rl" className={styles.itemContact + " " + styles.itemContactLink}>
                    <FaTwitter className={styles.icon} />
                    <div>
                        <p>Twitter</p>
                        <p>@martini_rl</p>
                    </div>
                </a>
                <a href="https://www.instagram.com/martinryberglaude/" className={styles.itemContact + " " + styles.itemContactLink}>
                    <FaInstagram className={styles.icon} />
                    <div>
                        <p>Instagram</p>
                        <p>@martinryberglaude</p>
                    </div>
                </a>
            </div>
        </div>
    )
}
