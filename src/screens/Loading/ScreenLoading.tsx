import React from 'react'
import styles from './ScreenLoading.module.scss'

type Props = {
    text: string
}
export default function LoadingScreen(props: Props) {
    return (
        <div className={styles.loading}>
                <p>{props.text}</p>
         </div>
    )
}
