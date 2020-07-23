import React from 'react'
import styles from './Grid.module.scss'
import GridItem from 'components/GridItem'
import { useTranslation } from 'react-i18next'
import * as Consts from 'utils/constants'
import * as FormattedWeatherData from 'model/TypesFormattedWeather'
import * as WeatherData from 'model/TypesWeather'
import FakeGridItem from './FakeGridItem'

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

    function shouldDisplayItem(data: number): boolean {
        if (data && !isNaN(data)) {
            return true
        } else {
            return false
        }
    }
    return (
        <div className={gridClassName}>
            <div className={rowClassName}>
                {shouldDisplayItem(props.data.precMean) 
                ? <GridItem altStyle={props.altStyle} icon={Consts.WiUmbrella} text={t("grid_prec")} value={props.dataFormatted.precMean} />
                : <FakeGridItem/>
                } {shouldDisplayItem(props.data.wind)
                ? <GridItem altStyle={props.altStyle} icon={Consts.WiWind + " towards-" + props.dataFormatted.windDirDeg + "-deg"} text={props.dataFormatted.windDir} value={props.dataFormatted.wind} />
                : <FakeGridItem/>
                } {shouldDisplayItem(props.data.pressure)
                ? <GridItem altStyle={props.altStyle} icon={Consts.WiBarometer} text={t("grid_pressure")} value={props.dataFormatted.pressure} />
                : <FakeGridItem/>
                } {shouldDisplayItem(props.data.vis)
                ? <GridItem altStyle={props.altStyle} icon={Consts.WiFog} text={t("grid_vis")} value={props.dataFormatted.vis} />
                : <FakeGridItem/>
                }
            </div>
            <div className={rowClassName}>
                {shouldDisplayItem(props.data.humidity)
                ? <GridItem altStyle={props.altStyle} icon={Consts.WiRaindrop} text={t("grid_humidity")} value={props.dataFormatted.humidity} />
                : <FakeGridItem/>
                } {shouldDisplayItem(props.data.gusts)
                ? <GridItem altStyle={props.altStyle} icon={Consts.WiStrongwind} text={t("grid_gusts")} value={props.dataFormatted.gusts} />
                : <FakeGridItem/>
                } {shouldDisplayItem(props.data.cloud) 
                ? <GridItem altStyle={props.altStyle} icon={Consts.WiCloudy} text={t("grid_cloud_cover")} value={props.dataFormatted.cloud} />
                : <FakeGridItem/>
                } {shouldDisplayItem(props.data.feelslike) 
                ? <GridItem altStyle={props.altStyle} icon={Consts.WiThermometer} text={t("grid_feels_like")} value={props.dataFormatted.feelslike} />
                : <FakeGridItem/>
                }
            </div>
        </div>
    )
}
