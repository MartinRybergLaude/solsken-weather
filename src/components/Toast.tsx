import React from 'react'
import styles from './Toast.module.scss'
import { motion } from 'framer-motion'

interface Props {
    text: string
}
const variantsToast = ({
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
});
export default function Toast(props: Props) {
    return (
        <motion.div 
        className={styles.toast}
        key="cover"
        initial="hidden" 
        animate="visible" 
        exit="hidden" 
        variants={variantsToast}
        transition={{ type: "spring", stiffness: 20, damping: 100 }}>
            <p>{props.text}</p>
        </motion.div>
    )
}
