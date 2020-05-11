import React, { Component } from 'react'
import styles from './Grid.module.scss'
import GridItem from 'components/GridItem'
import { WiUmbrella, WiDirectionUp, WiBarometer, WiFog, WiRaindrop, WiStrongWind, WiCloudy, WiThermometer } from 'weather-icons-react'

export class Grid extends Component {
    render() {
        return (
            <div className={styles.grid}>
                <div className={styles.row}>
                    <GridItem icon={WiUmbrella} text="Precipitation" value="0.0 MM" />
                    <GridItem icon={WiDirectionUp} text="Nordöst" value="3 M/S" />
                    <GridItem icon={WiBarometer} text="Pressure" value="1018 HPA" />
                    <GridItem icon={WiFog} text="Visibility" value="39 KM" />
                </div>
                <div className={styles.row}>
                    <GridItem icon={WiRaindrop} text="Humidity" value="39%" />
                    <GridItem icon={WiStrongWind} text="Gusts" value="8 M/S" />
                    <GridItem icon={WiCloudy} text="Cloud cover" value="0 %" />
                    <GridItem icon={WiThermometer} text="Feels like" value="12" />
                </div>
            </div>
        )
    }
}

export default Grid
