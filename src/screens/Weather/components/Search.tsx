import React, { useState, useRef, useEffect } from 'react'
import styles from './Search.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import * as Strings from 'utils/strings'

import searchLocations from 'model/searchLocations'
import TypeLocations from 'model/TypesLocation'

export default function Search() {
    const mainRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const [locations, setLocations] = useState<TypeLocations | null>()
    const [isLoading, setLoading] = useState(false)
    const [isSearching, setSearching] = useState(false)
    const [showSearchBtn, setShowSearchBtn] = useState(false)
    
    let query: string
    let controller = new AbortController()
    let signal = controller.signal
    
    useOutsideAlerter()

    function useOutsideAlerter() {
        useEffect(() => {
          function handleClickOutside(event: any) {
            if (mainRef.current && !mainRef.current.contains(event.target)) {
                controller.abort()
                setSearching(false)
                setShowSearchBtn(false)
                setLoading(false)
                if(inputRef.current) inputRef.current.value = ""
            }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [mainRef]);
    }
    async function handleSearch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!inputRef.current) return
        query = inputRef.current.value
        if (query.length == 0) return
        setShowSearchBtn(false)
        setLoading(true)
        setSearching(true)
        setLocations(null)

        controller.abort()
        
        controller = new AbortController()
        signal = controller.signal
        try {
            const locations = await searchLocations(query, signal)
            setLocations(locations)
            setLoading(false)
        } catch (e){
            setLocations(null)
            setLoading(false)
        }
    }
    function handleInputChange(event: React.FormEvent<HTMLInputElement>) {
        setSearching(false)
        if (event.currentTarget.value.length != 0) {
            controller.abort()
            setShowSearchBtn(true)
        } else {
            setShowSearchBtn(false)
        }
    }
    return (
        <div ref={mainRef} className={styles.containerMain}>
            <form onSubmit={handleSearch}>
                <div className={styles.inputWrapper}>
                    <input ref={inputRef} className={styles.input} onChange={handleInputChange} placeholder={Strings.TextSearch} />
                    <FontAwesomeIcon className={styles.icon} icon={faSearch}/>
                </div>
                {showSearchBtn &&
                    <button type="submit" className={styles.btnSearch}>{Strings.TextSearchShort}</button>
                }
            </form>
            
            {isSearching &&
                <LocationsList locations={locations} isLoading={isLoading}/>
            }
        </div>
    )
}

interface Props {
    isLoading: boolean
    locations: TypeLocations | null | undefined
}

export function LocationsList(props: Props) {
    if (props.isLoading) {
        return (
            <div className={styles.loading}>
                <div className={styles.ldsEllipsis}><div></div><div></div><div></div><div></div></div>
            </div>
        )
    } else if (!props.locations || !props.locations.features || props.locations.features.length <= 0) {
        return (
            <div className={styles.error}>
                <p>No locations found!</p>
            </div>
        )
    } else {
        return (
            <div>
                {props.locations.features.map((feature, index) => {
                    return(
                        <div className={styles.location} key={index}>
                            <p>{feature.properties.name}</p>
                            <p>{feature.properties.country}</p> 
                        </div>
                    )
                })
            }
            </div>
        )
    } 
}
