import React from 'react'
import styles from './GridItem.module.scss';

type Props = {
    icon: any
    rotation?: number
    text: string
    value: string
}

export default function GridItem(props: Props) {
    const Icon = props.icon;
    return (
        <div className={styles.item}>
            <Icon className={styles.icon}/>
            <p className={styles.valueText}>{props.value}</p>
            <p className={styles.descText}>{props.text}</p>                
        </div>
    )
}
