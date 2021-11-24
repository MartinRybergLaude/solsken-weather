import React from 'react'
import styles from './Grid.module.scss'
import GridItem from 'components/GridItem'
import { useTranslation } from 'react-i18next'
import * as Consts from 'utils/constants'
import * as FormattedWeatherData from 'model/TypesFormattedWeather'
import * as WeatherData from 'model/TypesWeather'
import FakeGridItem from './FakeGridItem'
import { getItem } from 'model/utilsStorage'

interface Props {
    dataFormatted: FormattedWeatherData.Hour
    data: WeatherData.Hour
    altStyle?: boolean
}
export default function Grid(props: Props) {
    const { t } = useTranslation()

    let gridClassName = styles.grid;
    let rowClassName = styles.row;
    if (props.altStyle) {
        gridClassName = styles.grid + " " + styles.gridAlt
        rowClassName = styles.row + " " + styles.rowAlt
    }
    
    if (getItem("dataSrc") === "smhi" || getItem("dataSrc") === "yr") {
        return (
            <div className={gridClassName}>
                <div className={rowClassName}>
                    <GridItem altStyle={props.altStyle} icon={Consts.WiUmbrella} text={t("grid_prec")} value={props.dataFormatted.precMean} />
                    <GridItem altStyle={props.altStyle} icon={Consts.WiWind + " towards-" + props.dataFormatted.windDirDeg + "-deg"} text={props.dataFormatted.windDir} value={props.dataFormatted.wind} />
                    <GridItem altStyle={props.altStyle} icon={Consts.WiBarometer} text={t("grid_pressure")} value={props.dataFormatted.pressure} />
                    <GridItem altStyle={props.altStyle} icon={Consts.WiThermometer} text={t("grid_feels_like")} value={props.dataFormatted.feelslike} />
                    
                </div>
                <div className={rowClassName}>
                    <GridItem altStyle={props.altStyle} icon={Consts.WiRaindrop} text={t("grid_humidity")} value={props.dataFormatted.humidity} />
                    <GridItem altStyle={props.altStyle} icon={Consts.WiStrongwind} text={t("grid_gusts")} value={props.dataFormatted.gusts} />
                    <GridItem altStyle={props.altStyle} icon={Consts.WiCloudy} text={t("grid_cloud_cover")} value={props.dataFormatted.cloud} />
                    {getItem("dataSrc") === "yr" ?
                    <GridItem altStyle={props.altStyle} icon={Consts.WiFog} text={t("grid_fog")} value={props.dataFormatted.fog} />
                    :
                    <GridItem altStyle={props.altStyle} icon={Consts.WiFog} text={t("grid_vis")} value={props.dataFormatted.vis} />
                    }
                    
                </div>
            </div>
        )
    } else {
        return (
            <div className={gridClassName}>
                <div className={rowClassName}>
                    <GridItem altStyle={props.altStyle} icon={Consts.WiWind + " towards-" + props.dataFormatted.windDirDeg + "-deg"} text={props.dataFormatted.windDir} value={props.dataFormatted.wind} />
                    <GridItem altStyle={props.altStyle} icon={Consts.WiBarometer} text={t("grid_pressure")} value={props.dataFormatted.pressure} />
                    <GridItem altStyle={props.altStyle} icon={Consts.WiThermometer} text={t("grid_feels_like")} value={props.dataFormatted.feelslike} />
                </div>
                <div className={rowClassName}>
                    <GridItem altStyle={props.altStyle} icon={Consts.WiRaindrop} text={t("grid_humidity")} value={props.dataFormatted.humidity} />
                    <FakeGridItem altStyle={props.altStyle} icon={props.dataFormatted.icon}/>
                    <GridItem altStyle={props.altStyle} icon={Consts.WiCloudy} text={t("grid_cloud_cover")} value={props.dataFormatted.cloud} />
                </div>
            </div>
        )
    }
}
