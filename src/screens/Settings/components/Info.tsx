import React from 'react'
import styles from './Settings.module.scss'

import { useTranslation } from 'react-i18next'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faGlobe} from '@fortawesome/free-solid-svg-icons'
import { faGithub , faTwitter, faInstagram} from '@fortawesome/free-brands-svg-icons'
import { getItem } from 'model/utilsStorage'

export default function Info() {
    const { t } = useTranslation()
    const version = getItem("version")
    return (
        <div className={styles.settingsCategory}>
            <h2>{t("title_info")}</h2>
            <p className={styles.categoryDesc}>v. {version}</p>
            <p className={styles.categoryDesc}>{t("text_weatherdata_from")} 
                <a className={styles.link} href="http://opendata.smhi.se/apidocs/metfcst/index.html"> SMHI Open Data Api</a> & <a className={styles.link} href="https://openweathermap.org/api"> OpenWeatherMap.</a>
            </p>
            <div className={styles.contactWrapper}>
                <div className={styles.itemContact + " " + styles.first}>
                    <FontAwesomeIcon className={styles.icon} icon={faUserCircle}/>
                    <div>
                        <p>Martin Ryberg Laude</p>
                        <p>Stockholm, Sweden</p>
                    </div>
                </div>
                <a href="https://martinryberglaude.com/" className={styles.itemContact + " " + styles.itemContactLink}>
                    <FontAwesomeIcon className={styles.icon} icon={faGlobe}/>
                    <div>
                        <p>{t("text_website")}</p>
                        <p>martinryberglaude.com</p>
                    </div>
                </a>
                <a href="https://github.com/MartinRybergLaude" className={styles.itemContact + " " + styles.itemContactLink}>
                    <FontAwesomeIcon className={styles.icon} icon={faGithub}/>
                    <div>
                        <p>Github</p>
                        <p>@martinryberglaude</p>
                    </div>
                </a>
                <a href="https://twitter.com/martini_rl" className={styles.itemContact + " " + styles.itemContactLink}>
                    <FontAwesomeIcon className={styles.icon} icon={faTwitter}/>
                    <div>
                        <p>Twitter</p>
                        <p>@martini_rl</p>
                    </div>
                </a>
                <a href="https://www.instagram.com/martinryberglaude/" className={styles.itemContact + " " + styles.itemContactLink}>
                    <FontAwesomeIcon className={styles.icon} icon={faInstagram}/>
                    <div>
                        <p>Instagram</p>
                        <p>@martinryberglaude</p>
                    </div>
                </a>
            </div>
        </div>
    )
}
