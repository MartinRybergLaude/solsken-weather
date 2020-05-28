import React from 'react'
import styles from './ScreenSettings.module.scss'
import SettingsUnits from 'screens/Settings/components/SettingsUnits'
import * as Strings from 'utils/strings'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function ScreenSettings(props: RouteComponentProps<any>) {
    return (
        <div className={"containerMain " + styles.containerSettings}>
            <div className={styles.toolbar}>
                <FontAwesomeIcon className={styles.toolbarIcon} icon={faArrowLeft} onClick={() => props.history.push("/")} />
                <h2 className={styles.toolbarText}>{Strings.Settings}</h2>
            </div>

            <div className={styles.containerScroll}>
                <SettingsUnits/>
            </div>
        </div>
    )
}
export default withRouter(ScreenSettings)
