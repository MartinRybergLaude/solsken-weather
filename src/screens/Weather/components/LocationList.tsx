import React, { useState, useEffect } from 'react'
import styles from './LocationList.module.scss'

import { useTranslation } from 'react-i18next'

import Location from './Location'
import LocationType from 'model/TypesLocation'
import { setItem, getItem, deleteItem } from 'model/utilsStorage'
import { Global } from 'utils/globals'
import { AnimatePresence } from 'framer-motion'

interface Props {
  locations: Array<LocationType> | undefined
  setSidebarVis: (isVisible: boolean) => void
  reloadLocations: Function
}
export default function LocationList(props: Props) {
  const { t } = useTranslation()

  const [selectedIndex, setSelectedIndex] = useState<number>()

  useEffect(() => {
    const selectedLocIndex = getItem('selectedLocIndex')
    if (selectedLocIndex) {
      setSelectedIndex(parseInt(selectedLocIndex))
    } else {
      setSelectedIndex(-1)
    }
  }, [])

  function handleSelectLocation(index: number) {
    if (index >= 0 && props.locations) {
      setItem('selectedLoc', JSON.stringify(props.locations[index]))
      setItem('selectedLocIndex', index.toString())
      setSelectedIndex(index)
      Global.selectedLocationChanged = true
      props.setSidebarVis(false)
    } else {
      deleteItem('selectedLoc')
      setItem('selectedLocIndex', index.toString())
      setSelectedIndex(index)
      Global.selectedLocationChanged = true
      props.setSidebarVis(false)
    }
  }
  function handleDeleteLocation(index: number) {
    if (props.locations) {
      let data = getItem('locations')
      if (data) {
        if (index === selectedIndex) {
          setItem('selectedLocIndex', '-1')
          setSelectedIndex(-1)
          Global.selectedLocationChanged = true
          deleteItem('selectedLoc')
        }
        let dataParsed = JSON.parse(data) as LocationType[]
        dataParsed.splice(index, 1)
        setItem('locations', JSON.stringify(dataParsed))
      }
      props.reloadLocations()
    }
  }

  return (
    <div className={styles.containerMain}>
      <Location
        onDelete={handleDeleteLocation}
        onClick={handleSelectLocation}
        index={-1}
        selectedIndex={selectedIndex}
        title={t('text_location_current')}
      />
      <AnimatePresence>
        {props.locations?.map((location, index) => (
          <Location
            onDelete={handleDeleteLocation}
            onClick={handleSelectLocation}
            key={index}
            index={index}
            selectedIndex={selectedIndex}
            title={location.name}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
