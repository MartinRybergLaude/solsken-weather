import React, { useRef, useEffect } from 'react'
import styles from './FragmentSidebar.module.scss'

import { motion, AnimatePresence } from 'framer-motion'
import Search from '../components/Search';

interface Props {
    visible: boolean
    setVisibility: Function
}
const variantsSidebar = ({
    visible: { left: 0 },
    hidden:  { left: "-80%"}
});

export default function Sidebar(props: Props) {

    const wrapperRef = useRef<HTMLDivElement>(null)
    useOutsideAlerter()

    function useOutsideAlerter() {
        useEffect(() => {
          function handleClickOutside(event: any) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                props.setVisibility(false)
            }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [wrapperRef]);
    }

    return (
        <AnimatePresence> 
            {props.visible &&
                <motion.div
                    key="sidebar"
                    className={styles.containerMain}
                    ref={wrapperRef}
                    initial="hidden" 
                    animate="visible" 
                    exit="hidden" 
                    variants={variantsSidebar}
                    transition={{ type: "spring", stiffness: 500, damping: 100 }}>
                        <Search/>
                </motion.div>
            }
        </AnimatePresence>
    )
}
