import React from 'react'
import styles from './ScreenSettings.module.scss'
import SettingsUnits from 'screens/Settings/components/Units'
import { useTranslation } from 'react-i18next'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Info from './components/Info'
import Extras from './components/Extras'

function ScreenSettings(props: RouteComponentProps<any>) {
    const { t, i18n } = useTranslation()
    return (
        <div className={"screen " + styles.containerSettings}>
            <div className={styles.toolbar}>
                <FontAwesomeIcon className={styles.toolbarIcon} icon={faArrowLeft} onClick={() => props.history.push("/")} />
                <h2 className={styles.toolbarText}>{t("title_settings")}</h2>
            </div>

            <div className={styles.containerScroll}>
                <SettingsUnits/>
                <Extras/>
                <Info/>
            </div>
        </div>
    )
}
export default withRouter(ScreenSettings)
