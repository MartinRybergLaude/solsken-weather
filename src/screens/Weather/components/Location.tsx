import React from 'react'
import styles from './Location.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

interface Props {
    selected: boolean
    title: string
}
export default function Location(props: Props) {

    if (props.selected) {
        return (
            <div className={styles.containerMain + " " + styles.containerMainSelected}>
                <FontAwesomeIcon className={styles.icon} icon={faMapMarkerAlt}/>
                <p>{props.title}</p>
            </div>
            
        )
    } else {
        return (
            <div className={styles.containerMain}>
                <FontAwesomeIcon className={styles.icon} icon={faMapMarkerAlt}/>
                <p>{props.title}</p>
            </div>
        )
    }
}
