import React, { useEffect, useState, useCallback } from 'react'
import styles from './Location.module.scss'

import * as Strings from 'utils/strings'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faLocationArrow } from '@fortawesome/free-solid-svg-icons'

import Dialog from 'components/Dialog'
import { text } from '@fortawesome/fontawesome-svg-core'
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
    const longPress = useLongPress(onLongPress, 500);

    useEffect(() => {
        if (props.index === props.selectedIndex) {
            console.log("selected style")
            setStyleString(styles.containerMain + " " + styles.containerMainSelected)
        } else {
            console.log("unselected style " + props.index + " " + props.selectedIndex)
            setStyleString(styles.containerMain)
        }
    }, [props.selectedIndex])

    function onClick() {
        if (props.index !== props.selectedIndex) {
            props.onClick(props.index)
        }
    }
    function onLongPress() {
        if (props.index !== props.selectedIndex && props.index >= 0) {
            setShowDialog(true)
        }
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
            <div className={styleString} onClick={onClick} {...longPress}>
                
                {props.index >= 0 ?
                    <FontAwesomeIcon className={styles.icon} icon={faMapMarkerAlt}/>
                :
                    <FontAwesomeIcon className={styles.icon} icon={faLocationArrow}/>
                }
                <p>{props.title}</p>
            </div>
        </div>
        
    )
}

function useLongPress(callback = () => {}, ms = 300) {
    const [startLongPress, setStartLongPress] = useState(false);

    useEffect(() => {
        let timerId: NodeJS.Timeout
        if (startLongPress) {
        timerId = setTimeout(callback, ms);
        }
        return () => {
        clearTimeout(timerId);
        };
    }, [callback, ms, startLongPress]);

    const start = useCallback(() => {
        setStartLongPress(true);
    }, []);
    const stop = useCallback(() => {
        setStartLongPress(false);
    }, []);

    return {
        onMouseDown: start,
        onMouseUp: stop,
        onMouseLeave: stop,
        onTouchStart: start,
        onTouchEnd: stop,
    };
}