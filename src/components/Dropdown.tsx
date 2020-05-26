import React, { useState, useRef, useEffect, Ref } from 'react'
import styles from './Dropdown.module.scss'
import posed, { PoseGroup } from 'react-pose';
import { AnimatePresence, motion } from 'framer-motion';

export type Option = {
    value: string
    label: string
}
type Props = {
    value: string
    onChange: (option: Option) => void
    options: Option[]
}

export default function Dropdown(props: Props) {
    const [isMenuVis, setMenuVis] = useState(false)
    const wrapperRef = useRef<HTMLDivElement>(null)
    useOutsideAlerter()

    const currentOption = props.options.find(option => option.value == props.value)

    function handleOptionClick(option: Option) {
        setMenuVis(false)
        props.onChange(option)
    }
    function useOutsideAlerter() {
        useEffect(() => {
          function handleClickOutside(event: any) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
              setMenuVis(false)
            }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [wrapperRef]);
    }
    
    
    return (
        <div ref={wrapperRef} className={styles.root}>
            <div className={styles.control} onClick={() => setMenuVis(true)}>
                <p>{currentOption?.label}</p>
            </div>
            <AnimatePresence>
                {isMenuVis &&
                    <motion.div
                    key="options" 
                    className={styles.menu}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{ease: "easeInOut", duration: 0.1}}>
                        {props.options.map((option, index) => {
                            return <p className={styles.option} key={index} onClick={() => handleOptionClick(option)}>{option.label}
                            </p>
                        })}
                    </motion.div>
                    
                }
            </AnimatePresence>
        </div>
    )
}
