import React, { useState, useEffect } from 'react'
import styles from './LocationList.module.scss'

import * as Strings from 'utils/strings'

import Location from './Location'
import LocationType from 'model/TypesLocation'
import { setItem, getItem } from 'model/utilsStorage';

interface Props {
    locations: Array<LocationType> | undefined
}
export default function LocationList(props: Props) {
    
    return (
        <div className={styles.containerMain}>
            <Location selected={true} title={Strings.TextCurrentLocation}/>
            {props.locations?.map((location, index) => 
                <Location key={index} selected={false} title={location.name}/>
            )}
        </div>
    )
}
