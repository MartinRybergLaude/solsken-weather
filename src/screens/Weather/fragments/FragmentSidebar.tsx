import React, { useRef, useEffect, useState } from 'react'
import styles from './FragmentSidebar.module.scss'

import { motion, AnimatePresence } from 'framer-motion'
import Search from '../components/Search';
import useWindowDimensions from 'utils/useDimensions';

interface Props {
    visible: boolean
    setVisibility: Function
}

export default function Sidebar(props: Props) {
    
    // State to change animation variable hidden
    const [moveLeft, setMoveLeft] = useState("-80%")
    
    // Animation variables for hiding and showing
    const variantsSidebar = ({
        visible: { left: 0 },
        hidden:  { left: moveLeft}
    })

    // Detect window resizes to change animation variable
    useEffect(() => {
        setCorrectMoveLeft()
        function handleResize() {
            setCorrectMoveLeft()
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function setCorrectMoveLeft() {
        if (window.innerWidth >= 512) {
            console.log("width > 512")
            setMoveLeft("-400px")
        } else {
            console.log("width < 512")
            setMoveLeft("-80%")
        }
    }
    // Ref used to detect clicks outside of it
    const wrapperRef = useRef<HTMLDivElement>(null)
    useOutsideAlerter()

    // Detect clicks outside wrapperRef
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
