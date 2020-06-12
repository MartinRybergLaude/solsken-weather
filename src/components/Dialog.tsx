import React, { useEffect, useRef } from 'react'
import styles from './Dialog.module.scss'
import { motion } from 'framer-motion'

interface Props {
    callbackAction: Function
    callbackDismiss: Function
    textAction: string
    textDismiss: string
    title: string
    text: string
}

const variantsCover = ({
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
});

export default function Dialog(props: Props) {
    // Ref used to detect clicks outside of dialog div
    const wrapperRef = useRef<HTMLDivElement>(null)
    useOutsideAlerter()

    // Detect clicks outside wrapperRef
    function useOutsideAlerter() {
        useEffect(() => {
          function handleClickOutside(event: any) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                props.callbackDismiss()
            }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, []);
    }
    return (
            <motion.div
                key="cover"
                className={styles.cover}
                initial="hidden" 
                animate="visible" 
                exit="hidden" 
                variants={variantsCover}
                transition={{ type: "spring", stiffness: 2000, damping: 100 }}>
                    <div className={styles.dialog} ref={wrapperRef}>
                        <h2>{props.title}</h2>
                        <p>{props.text}</p>
                        <div className={styles.actions}>
                            <div>
                                <button className="buttonAlt" onClick={() => props.callbackDismiss()}>{props.textDismiss}</button>
                                <button className="buttonAlt" onClick={() => props.callbackAction()}>{props.textAction}</button>
                            </div>
                        </div>
                    </div>
            </motion.div>
                
    )
}
