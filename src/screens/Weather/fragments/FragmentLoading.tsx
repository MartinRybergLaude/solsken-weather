import React from 'react'
import styles from './FragmentLoading.module.scss'
import { motion } from 'framer-motion'

type Props = {
    text: string | undefined
    show: boolean
}
const variantsLoading = ({
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
});
export default function LoadingScreen(props: Props) {
    return (
        <motion.div
            className="fragment"
            animate={!props.show ? "visible" : "hidden"}
            variants={variantsLoading}
            transition={{ type: "spring", stiffness: 2000, damping: 100 }}
            initial={false}>
            <div className={styles.loading}>
                {props.text ? 
                    <p>{props.text}</p>
                :
                <div className={styles.ldsEllipsis}><div></div><div></div><div></div><div></div></div>
                }
            </div>
         </motion.div>
    )
}
