import React, { useState, useRef, useEffect } from 'react'
import styles from './Search.module.scss'

import { FaSearch } from 'react-icons/fa'

import { useTranslation } from 'react-i18next'

import searchLocations from 'model/searchLocations'
import TypeLocations from 'model/Photon/TypesLocation'
import LocationType from 'model/TypesLocation'
import { setItem, getItem } from 'model/utilsStorage'
import { AnimatePresence, motion } from 'framer-motion'

interface PropsForSearch {
  reloadLocations: Function
}
export default function Search(props: PropsForSearch) {
  const { t } = useTranslation()

  const mainRef = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState('')
  const [locations, setLocations] = useState<TypeLocations | null>()
  const [isLoading, setLoading] = useState(false)
  const [isSearching, setSearching] = useState(false)
  const [showSearchBtn, setShowSearchBtn] = useState(false)
  const [coverClassName, setCoverClassName] = useState(styles.coverInactive)

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
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [])
  }
  async function handleSearch() {
    if (!showSearchBtn) return
    setShowSearchBtn(false)
    setLoading(true)
    setSearching(true)
    setLocations(null)

    controller.abort()

    controller = new AbortController()
    signal = controller.signal
    try {
      console.log(query)
      const locations = await searchLocations(query, signal)
      setLocations(locations)
      setLoading(false)
    } catch (e) {
      setLocations(null)
      setLoading(false)
    }
  }
  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }
  function handleInputChange(event: React.FormEvent<HTMLInputElement>) {
    setQuery(event.currentTarget.value)
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
    setQuery('')
    setCoverClassName(styles.coverInactive)
    setSearching(false)
    setLoading(false)
    if (reload) props.reloadLocations(locations)
  }
  function getSearchBtnClass(): string {
    return showSearchBtn ? styles.active : ''
  }

  return (
    <div className={coverClassName}>
      <div ref={mainRef}>
        <motion.div layout="size" className={styles.search}>
          <motion.div layout className={styles.inputWrapper}>
            <input
              type="text"
              value={query}
              className={styles.input}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder={t('text_search')}
            />
          </motion.div>
        </motion.div>
        <button
          onClick={handleSearch}
          className={styles.btnSearch + ' ' + getSearchBtnClass()}
        >
          <FaSearch className={styles.icon} />
        </button>
      </div>
      <AnimatePresence>
        {isSearching && (
          <motion.div
            layout="size"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.results}
          >
            <ListedLocations
              locations={locations}
              isLoading={isLoading}
              closeSearch={closeSearch}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface PropsForListedLocations {
  isLoading: boolean
  locations: TypeLocations | null | undefined
  closeSearch: (reload: boolean) => void
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}
const item = {
  hidden: { opacity: 0, x: -56 },
  show: { opacity: 1, x: 0 },
}

export function ListedLocations(props: PropsForListedLocations) {
  const { t } = useTranslation()

  function handleLocationClick(
    name: string,
    country: string,
    lon: number,
    lat: number
  ) {
    const location: LocationType = { name, country, lon, lat }
    let data = getItem('locations')
    if (data) {
      let dataParsed = JSON.parse(data) as LocationType[]
      dataParsed.push(location)
      setItem('locations', JSON.stringify(dataParsed))
    } else {
      setItem('locations', JSON.stringify(new Array(location)))
    }
    props.closeSearch(true)
  }
  return (
    <AnimatePresence>
      {props.isLoading ? (
        <motion.div layout="size" className={styles.loading}>
          <div className={styles.ldsEllipsis}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </motion.div>
      ) : (
        <AnimatePresence>
          {!props.locations ||
          !props.locations.features ||
          props.locations.features.length <= 0 ? (
            <motion.div layout="size" className={styles.error}>
              <p>{t('error_search_find_location')}</p>
            </motion.div>
          ) : (
            <motion.div
              layout="size"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {props.locations.features.map((feature, index) => {
                return (
                  <motion.div
                    layout
                    variants={item}
                    className={styles.location}
                    key={index}
                    onClick={() =>
                      handleLocationClick(
                        feature.properties.name,
                        feature.properties.country,
                        feature.geometry.coordinates[0],
                        feature.geometry.coordinates[1]
                      )
                    }
                  >
                    <p>{feature.properties.name}</p>
                    <p>{feature.properties.country}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </AnimatePresence>
  )
}
