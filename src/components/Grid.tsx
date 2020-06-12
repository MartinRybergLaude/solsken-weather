import React from 'react'
import styles from './Grid.module.scss'
import GridItem from 'components/GridItem'
import { useTranslation } from 'react-i18next'
import * as Consts from 'utils/constants'
import * as FormattedWeatherData from 'model/TypesFormattedWeather'

interface Props {
    data: FormattedWeatherData.Hour
    altStyle?: boolean
}
export default function Grid(props: Props) {
    const { t, i18n } = useTranslation()

    let gridClassName = styles.grid;
    let rowClassName = styles.row;
    if (props.altStyle) {
        gridClassName = styles.grid + " " + styles.gridAlt
        rowClassName = styles.row + " " + styles.rowAlt
    }
    return (
        <div className={gridClassName}>
            <div className={rowClassName}>
                <GridItem altStyle={props.altStyle} icon={Consts.WiUmbrella} text={t("grid_prec")} value={props.data.precMean} />
                <GridItem altStyle={props.altStyle} icon={Consts.WiWind + " towards-" + props.data.windDirDeg + "-deg"} text={props.data.windDir} value={props.data.wind} />
                <GridItem altStyle={props.altStyle} icon={Consts.WiBarometer} text={t("grid_pressure")} value={props.data.pressure} />
                <GridItem altStyle={props.altStyle} icon={Consts.WiFog} text={t("grid_vis")} value={props.data.vis} />
            </div>
            <div className={rowClassName}>
                <GridItem altStyle={props.altStyle} icon={Consts.WiRaindrop} text={t("grid_humidity")} value={props.data.humidity} />
                <GridItem altStyle={props.altStyle} icon={Consts.WiStrongwind} text={t("grid_gusts")} value={props.data.gusts} />
                <GridItem altStyle={props.altStyle} icon={Consts.WiCloudy} text={t("grid_cloud_cover")} value={props.data.cloud} />
                <GridItem altStyle={props.altStyle} icon={Consts.WiThermometer} text={t("grid_feels_like")} value={props.data.feelslike} />
            </div>
        </div>
    )
}
