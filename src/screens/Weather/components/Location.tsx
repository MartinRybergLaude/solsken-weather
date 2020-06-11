import React, { useEffect, useState, useCallback } from 'react'
import styles from './Location.module.scss'

import * as Strings from 'utils/strings'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faLocationArrow, faTimes } from '@fortawesome/free-solid-svg-icons'

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

    const [styleString, setStyleString] = useState(styles.containerMain)
    const [showDialog, setShowDialog] = useState(false)

    useEffect(() => {
        if (props.index === props.selectedIndex) {
            setStyleString(styles.containerMain + " " + styles.containerMainSelected)
        } else {
            setStyleString(styles.containerMain)
        }
    }, [props.selectedIndex])

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
                    title={Strings.TextRemove + " " + props.title + "?"} text={Strings.TextCannotBeUndone}
                    textAction={Strings.TextRemove} textDismiss={Strings.TextDismiss}/>
                }
            </AnimatePresence>
            <div className={styleString} >
                <div onClick={onClick}>
                    {props.index >= 0 ?
                        <FontAwesomeIcon className={styles.icon} icon={faMapMarkerAlt}/>
                    :
                        <FontAwesomeIcon className={styles.icon} icon={faLocationArrow}/>
                    }
                    <p>{props.title}</p>
                </div>
                
                {props.index >= 0 &&
                    <FontAwesomeIcon onClick={onClickDelete} className={styles.icon + " " + styles.iconRight} icon={faTimes}/>
                }
            </div>
        </div>
        
    )
}