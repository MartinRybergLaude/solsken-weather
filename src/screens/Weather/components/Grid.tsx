import React from 'react'
import styles from './Grid.module.scss'
import GridItem from 'screens/Weather/components/GridItem'
import * as Strings from 'utils/strings'
import * as Consts from 'utils/constants'
import * as FormattedWeatherData from 'model/TypesFormattedWeather'

interface Props {
    data: FormattedWeatherData.Hour
}
export default function Grid(props: Props) {
    return (
        <div className={styles.grid}>
            <div className={styles.row}>
                <GridItem icon={Consts.WiUmbrella} text={Strings.Precipitation} value={props.data.precMean} />
                <GridItem icon={Consts.WiWind + " towards-" + props.data.windDirDeg + "-deg"} text={props.data.windDir} value={props.data.wind} />
                <GridItem icon={Consts.WiBarometer} text={Strings.Pressure} value={props.data.pressure} />
                <GridItem icon={Consts.WiFog} text={Strings.Visibility} value={props.data.vis} />
            </div>
            <div className={styles.row}>
                <GridItem icon={Consts.WiRaindrop} text={Strings.Humidity} value={props.data.humidity} />
                <GridItem icon={Consts.WiStrongwind} text={Strings.Gusts} value={props.data.gusts} />
                <GridItem icon={Consts.WiCloudy} text={Strings.CloudCover} value={props.data.cloud} />
                <GridItem icon={Consts.WiThermometer} text={Strings.FeelsLike} value={props.data.feelslike} />
            </div>
        </div>
    )
}
