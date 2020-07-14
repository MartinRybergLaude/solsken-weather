import React from 'react'
import styles from './Grid.module.scss'
import GridItem from 'components/GridItem'
import { useTranslation } from 'react-i18next'
import * as Consts from 'utils/constants'
import * as FormattedWeatherData from 'model/TypesFormattedWeather'
import * as WeatherData from 'model/TypesWeather'

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
    return (
        <div className={gridClassName}>
            <div className={rowClassName}>
                {props.data.precMean && !isNaN(props.data.precMean) &&
                <GridItem altStyle={props.altStyle} icon={Consts.WiUmbrella} text={t("grid_prec")} value={props.dataFormatted.precMean} />
                } {props.data.wind && !isNaN(props.data.wind) &&
                <GridItem altStyle={props.altStyle} icon={Consts.WiWind + " towards-" + props.dataFormatted.windDirDeg + "-deg"} text={props.dataFormatted.windDir} value={props.dataFormatted.wind} />
                } {props.data.pressure && !isNaN(props.data.pressure) &&
                <GridItem altStyle={props.altStyle} icon={Consts.WiBarometer} text={t("grid_pressure")} value={props.dataFormatted.pressure} />
                } {props.data.vis && !isNaN(props.data.vis) &&
                <GridItem altStyle={props.altStyle} icon={Consts.WiFog} text={t("grid_vis")} value={props.dataFormatted.vis} />
                }
            </div>
            <div className={rowClassName}>
                {props.data.humidity && !isNaN(props.data.humidity) &&
                <GridItem altStyle={props.altStyle} icon={Consts.WiRaindrop} text={t("grid_humidity")} value={props.dataFormatted.humidity} />
                } {props.data.gusts && !isNaN(props.data.gusts) &&
                <GridItem altStyle={props.altStyle} icon={Consts.WiStrongwind} text={t("grid_gusts")} value={props.dataFormatted.gusts} />
                } {props.data.cloud && !isNaN(props.data.cloud) &&
                <GridItem altStyle={props.altStyle} icon={Consts.WiCloudy} text={t("grid_cloud_cover")} value={props.dataFormatted.cloud} />
                } {props.data.feelslike && !isNaN(props.data.feelslike) &&
                <GridItem altStyle={props.altStyle} icon={Consts.WiThermometer} text={t("grid_feels_like")} value={props.dataFormatted.feelslike} />
                }
            </div>
        </div>
    )
}
