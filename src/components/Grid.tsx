import React, { useState, useEffect } from 'react'
import styles from './Grid.module.scss'
import GridItem from 'components/GridItem'
import * as Strings from 'utils/strings'
import * as Consts from 'utils/constants'
import * as FormattedWeatherData from 'model/TypesFormattedWeather'

interface Props {
    data: FormattedWeatherData.Hour
    altStyle?: boolean
}
export default function Grid(props: Props) {
    let gridClassName = styles.grid;
    let rowClassName = styles.row;
    if (props.altStyle) {
        gridClassName = styles.grid + " " + styles.gridAlt
        rowClassName = styles.row + " " + styles.rowAlt
    }
    return (
        <div className={gridClassName}>
            <div className={rowClassName}>
                <GridItem altStyle={props.altStyle} icon={Consts.WiUmbrella} text={Strings.Precipitation} value={props.data.precMean} />
                <GridItem altStyle={props.altStyle} icon={Consts.WiWind + " towards-" + props.data.windDirDeg + "-deg"} text={props.data.windDir} value={props.data.wind} />
                <GridItem altStyle={props.altStyle} icon={Consts.WiBarometer} text={Strings.Pressure} value={props.data.pressure} />
                <GridItem altStyle={props.altStyle} icon={Consts.WiFog} text={Strings.Visibility} value={props.data.vis} />
            </div>
            <div className={rowClassName}>
                <GridItem altStyle={props.altStyle} icon={Consts.WiRaindrop} text={Strings.Humidity} value={props.data.humidity} />
                <GridItem altStyle={props.altStyle} icon={Consts.WiStrongwind} text={Strings.Gusts} value={props.data.gusts} />
                <GridItem altStyle={props.altStyle} icon={Consts.WiCloudy} text={Strings.CloudCover} value={props.data.cloud} />
                <GridItem altStyle={props.altStyle} icon={Consts.WiThermometer} text={Strings.FeelsLike} value={props.data.feelslike} />
            </div>
        </div>
    )
}
