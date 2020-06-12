import React from 'react'
import styles from './GridItem.module.scss';

interface Props {
    icon: string
    text: string
    value: string
    altStyle?: boolean
}

export default function GridItem(props: Props) {
    let itemClassName = styles.item
    if (props.altStyle) {
        itemClassName = styles.item + " " + styles.itemAlt
    }
    return (
        <div className={itemClassName}>
            <i className={styles.icon + " wi " + props.icon}/>
            <p className={styles.valueText}>{props.value}</p>
            <p className={styles.descText}>{props.text}</p>                
        </div>
    )
}
