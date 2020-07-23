import React from 'react'
import styles from './GridItem.module.scss';

interface Props {
    icon: string
    altStyle?: boolean
}
export default function FakeGridItem(props: Props) {
    let itemClassName = styles.item
    if (props.altStyle) {
        itemClassName = styles.item + " " + styles.itemAlt
    }
    return (
        <div className={itemClassName}>
            <i className={styles.weatherIcon + " wi " + props.icon}/>
        </div>
    )
}