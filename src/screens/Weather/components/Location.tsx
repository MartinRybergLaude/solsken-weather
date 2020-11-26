import React, { useEffect, useState } from 'react'
import styles from './Location.module.scss'

import { useTranslation } from 'react-i18next'
import { FaMapMarkerAlt, FaLocationArrow, FaTimes } from 'react-icons/fa'

import Dialog from 'components/Dialog'
import { AnimatePresence } from 'framer-motion'

interface Props {
    selectedIndex: number | undefined
    title: string
    index: number
    onClick: (index: number) => void
    onDelete: (index: number) => void
}
export default function Location(props: Props) {
    const { t } = useTranslation()

    const [styleString, setStyleString] = useState(styles.containerMain)
    const [showDialog, setShowDialog] = useState(false)

    useEffect(() => {
        if (props.index === props.selectedIndex) {
            setStyleString(styles.containerMain + " " + styles.containerMainSelected)
        } else {
            setStyleString(styles.containerMain)
        }
    }, [props.selectedIndex, props.index])

    function onClick() {
        if (props.index !== props.selectedIndex) {
            props.onClick(props.index)
        }
    }
    function onClickDelete() {
        setShowDialog(true)
    }

    return (
        <div>
            <AnimatePresence>
                {showDialog && 
                    <Dialog callbackDismiss={() => setShowDialog(false)} callbackAction={() => {setShowDialog(false) 
                        props.onDelete(props.index)}}
                    title={t("text_remove") + " " + props.title + "?"} text={t("text_action_cant_undone")}
                    textAction={t("text_remove")} textDismiss={t("text_dismiss")}/>
                }
            </AnimatePresence>
            <div className={styleString} >
                <div onClick={onClick}>
                    {props.index >= 0 ?
                        <FaMapMarkerAlt className={styles.icon} />
                    :
                        <FaLocationArrow className={styles.icon} />
                    }
                    <p>{props.title}</p>
                </div>
                
                {props.index >= 0 &&
                    <FaTimes onClick={onClickDelete} className={styles.icon + " " + styles.iconRight}/>
                }
            </div>
        </div>
        
    )
}