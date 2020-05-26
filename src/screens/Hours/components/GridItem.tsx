import React from 'react'
import styles from './GridItem.module.scss'

interface Props {
    icon: string
    text: string
    value: string
}
export default function GridItem(props: Props) {
    
    return (
        <div className={styles.item}>
            <i className={styles.icon + " wi " + props.icon}/>
            <p className={styles.valueText}>{props.value}</p>
            <p className={styles.descText}>{props.text}</p>                
        </div>
    )
}
