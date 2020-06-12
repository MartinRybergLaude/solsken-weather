import React, { useState, useRef, useEffect } from 'react'
import styles from './Search.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import { useTranslation } from 'react-i18next'

import searchLocations from 'model/searchLocations'
import TypeLocations from 'model/Photon/TypesLocation'
import LocationType from 'model/TypesLocation'
import { setItem, getItem } from 'model/utilsStorage'

interface PropsForSearch {
    reloadLocations: Function
}
export default function Search(props: PropsForSearch) {
    const { t } = useTranslation()

    const mainRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const [locations, setLocations] = useState<TypeLocations | null>()
    const [isLoading, setLoading] = useState(false)
    const [isSearching, setSearching] = useState(false)
    const [showSearchBtn, setShowSearchBtn] = useState(false)
    const [coverClassName, setCoverClassName] = useState(styles.coverInactive)
    
    let query: string
    let controller = new AbortController()
    let signal = controller.signal
    
    useOutsideAlerter()

    function useOutsideAlerter() {
        useEffect(() => {
          function handleClickOutside(event: any) {
            if (mainRef.current && !mainRef.current.contains(event.target)) {
                closeSearch(false)
            }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, []);
    }
    async function handleSearch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!inputRef.current) return
        query = inputRef.current.value
        if (query.length === 0) return
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
        if (event.currentTarget.value.length !== 0) {
            controller.abort()
            setShowSearchBtn(true)
            setCoverClassName(styles.cover)
        } else {
            setShowSearchBtn(false)
            setCoverClassName(styles.coverInactive)
        }
    }
    function closeSearch(reload: boolean) {
        controller.abort()
        setCoverClassName(styles.coverInactive)
        setSearching(false)
        setShowSearchBtn(false)
        setLoading(false)
        if(inputRef.current) inputRef.current.value = ""
        if(reload) props.reloadLocations(locations)
    }
    
    return (
        <div className={coverClassName}>
            <div ref={mainRef} className={styles.search}>
                <form onSubmit={handleSearch}>
                    <div className={styles.inputWrapper}>
                        <input ref={inputRef} className={styles.input} onChange={handleInputChange} placeholder={t("text_search")} />
                        <FontAwesomeIcon className={styles.icon} icon={faSearch}/>
                    </div>
                    {showSearchBtn &&
                        <button type="submit" className={styles.btnSearch}>{t("text_search_short")}</button>
                    }
                </form>
                
                {isSearching &&
                    <ListedLocations locations={locations} isLoading={isLoading} closeSearch={closeSearch}/>
                }
            </div>
        </div>
    )
}

interface PropsForListedLocations {
    isLoading: boolean
    locations: TypeLocations | null | undefined
    closeSearch: Function
}

export function ListedLocations(props: PropsForListedLocations) {
    const { t } = useTranslation();

    function handleLocationClick(name: string, country: string, lon: number, lat: number) {
        const location: LocationType = {name, country, lon, lat}
        let data = getItem("locations")
        if (data) {
            let dataParsed = JSON.parse(data) as LocationType[]
            dataParsed.push(location)
            setItem("locations", JSON.stringify(dataParsed))
        } else {
            setItem("locations", JSON.stringify(new Array(location)))
        }
        props.closeSearch(true)
    }

    if (props.isLoading) {
        return (
            <div className={styles.loading}>
                <div className={styles.ldsEllipsis}><div></div><div></div><div></div><div></div></div>
            </div>
        )
    } else if (!props.locations || !props.locations.features || props.locations.features.length <= 0) {
        return (
            <div className={styles.error}>
                <p>{t("error_search_find_location")}</p>
            </div>
        )
    } else {
        return (
            <div>
                {props.locations.features.map((feature, index) => {
                    return(
                        <div className={styles.location} key={index} onClick={() => 
                                handleLocationClick(feature.properties.name, feature.properties.country, feature.geometry.coordinates[0],
                                    feature.geometry.coordinates[1])
                            }>
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
