import React, { useEffect, useState } from 'react'
import styles from './ScreenCharts.module.scss'

import { useTranslation } from 'react-i18next'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Day, WeatherData } from 'model/TypesWeather'
import { FormattedWeatherData, Day as FormattedDay } from 'model/TypesFormattedWeather'
import LineGraph from 'components/Graph'
import { AnimatePresence, motion } from 'framer-motion'
import { getItem } from 'model/utilsStorage'

import { FiArrowLeft } from 'react-icons/fi'

interface Props extends RouteComponentProps<any> {
    weatherData: WeatherData | undefined
    formattedWeatherData: FormattedWeatherData | undefined
}
interface Data {
    temprData: {}
    windData: {}
    precData: {}
    pressureData: {}
    humidityData: {}
    visData: {}
}
const variantsGraphs = ({
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
});

function ScreenCharts(props: Props) {
    const { t } = useTranslation()
    const [data, setData] = useState<Data>()
    const displayChart = getItem("dataSrc") === "smhi"
    useEffect(() => {
        if (props.weatherData?.days[props.match.params.id] == null || props.formattedWeatherData?.days[props.match.params.id] == null) {
            props.history.push("/")
        } else {
            init(props.weatherData.days[props.match.params.id], props.formattedWeatherData?.days[props.match.params.id])
        }
    }, [props])

    function init(day: Day, formattedDay: FormattedDay) {
        let labels: Array<string> = []
        formattedDay.hours.forEach(hour => {
            labels.push(hour.hour)
        });
        const temprData = initTempr(day, labels)
        const windData = initWind(day, labels)
        const precData = initPrec(day, labels)
        const pressureData = initPressure(day, labels)
        const humidityData = initHumidity(day, labels)
        const visData = initVis(day, labels)
        const initialisedData: Data = {
            temprData: temprData,
            windData: windData,
            precData: precData,
            pressureData: pressureData,
            humidityData: humidityData,
            visData: visData
        }
        setTimeout(() => {
            setData(initialisedData)
        }, 100)
    }
    
    return (
            <div className={"screen " + styles.containerMain}>
                <div className={styles.toolbar}>
                    <div className={styles.toolbarContent}>
                        <FiArrowLeft className={styles.toolbarIcon} onClick={() => props.history.goBack()} />
                        <h2 className={styles.toolbarText}>{t("title_charts")}</h2>
                    </div>
                </div>
                <AnimatePresence>
                    {data && 
                        <motion.div
                        className={styles.containerCharts}
                        initial="hidden" 
                        animate="visible" 
                        exit="hidden" 
                        variants={variantsGraphs}
                        transition={{ type: "spring", stiffness: 2000, damping: 100 }}>
                            <div className={styles.wrapperGraph}>
                                <LineGraph data={data?.temprData} barType="line" precision={0}/>
                            </div>
                            <div className={styles.wrapperGraph}>
                                <LineGraph data={data?.windData} min={0} barType="line" precision={1}/>
                            </div>
                            {displayChart &&
                                <div className={styles.wrapperGraph}>
                                    <LineGraph data={data?.precData} min={0} barType="bar" precision={1}/>
                                </div>
                            }
                            <div className={styles.wrapperGraph}>
                                <LineGraph data={data?.pressureData} barType="line" precision={0}/>
                            </div>
                            <div className={styles.wrapperGraph}>
                                <LineGraph data={data?.humidityData} min={0} max={100} barType="line" precision={0}/>
                            </div>
                            {displayChart &&
                                <div className={styles.wrapperGraph}>
                                    <LineGraph data={data?.visData} min={0} barType="line" precision={0}/>
                                </div>
                            }
                        </motion.div>
                    }          
                </AnimatePresence>
                
            </div>
    )
    function initTempr(day: Day, labels: Array<string>): {} {
        let temprList: Array<number> = []
        let feelsLikeList: Array<number> = []
        day.hours.forEach(hour => {
            temprList.push(hour.tempr)
            feelsLikeList.push(hour.feelslike)
        });
        return {
            labels: labels,
            datasets: [
                {
                  label: t("grid_temperature"),
                  fill: true,
                  backgroundColor: 'rgba(243, 89, 89, 0.2)',
                  borderColor: 'rgba(243, 89, 89,1)',
                  data: temprList
                },
                {
                  label: t("grid_feels_like"),
                  fill: false,
                  backgroundColor: 'rgba(255, 153, 102, 0.2)',
                  borderColor: 'rgba(255, 153, 102,1)',
                  data: feelsLikeList
                }
              ]
        }
    }
    function initWind(day: Day, labels: Array<string>) {
        let windList: Array<number> = []
        let gustsList: Array<number> = []
        day.hours.forEach(hour => {
            windList.push(hour.wind)
            gustsList.push(hour.gusts)
        });
        return {
            labels: labels,
            datasets: [
                {
                  label: t("grid_wind"),
                  fill: false,
                  backgroundColor: 'rgba(90, 194, 161, 0.2)',
                  borderColor: 'rgba(90, 194, 161, 1)',
                  data: windList
                },
                {
                  label: t("grid_gusts"),
                  fill: true,
                  backgroundColor: 'rgba(167, 167, 167, 0.2)',
                  borderColor: 'rgb(167, 167, 167)',
                  data: gustsList
                }
              ]
        }
    }
    function initPrec(day: Day, labels: Array<string>) {
        let precMeanList: Array<number> = []
        let precMaxList: Array<number> = []
        let precMinList: Array<number> = []
        day.hours.forEach(hour => {
            precMeanList.push(hour.precMean)
            precMaxList.push(hour.precMax)
            precMinList.push(hour.precMin)
        });
        return {
            labels: labels,
            datasets: [
                {
                  label: t("grid_prec") + " " + t("text_mean"),
                  fill: false,
                  backgroundColor: 'rgba(7, 111, 244, 1)',
                  borderColor: 'rgba(7, 111, 244, 1)',
                  data: precMeanList
                },
                {
                  label: t("text_max"),
                  fill: true,
                  backgroundColor: 'rgba(7, 111, 244, 0.4)',
                  borderColor: 'rgba(7, 111, 244, 1)',
                  data: precMaxList
                }
              ]
        }
    }
    function initPressure(day: Day, labels: Array<string>) {
        let pressureList: Array<number> = []
        day.hours.forEach(hour => {
            pressureList.push(hour.pressure)
        });
        return {
            labels: labels,
            datasets: [
                {
                  label: t("grid_pressure"),
                  fill: true,
                  backgroundColor: 'rgba(92, 26, 212, 0.2)',
                  borderColor: 'rgba(92, 26, 212, 1)',
                  data: pressureList
                }
              ]
        }
    }
    function initHumidity(day: Day, labels: Array<string>) {
        let humidityList: Array<number> = []
        day.hours.forEach(hour => {
            humidityList.push(hour.humidity)
        });
        return {
            labels: labels,
            datasets: [
                {
                  label: t("grid_humidity"),
                  fill: true,
                  backgroundColor: 'rgba(7, 111, 244, 0.2)',
                  borderColor: 'rgba(7, 111, 244, 1)',
                  data: humidityList
                }
              ]
        }
    }
    function initVis(day: Day, labels: Array<string>) {
        let visList: Array<number> = []
        day.hours.forEach(hour => {
            visList.push(hour.vis)
        });
        return {
            labels: labels,
            datasets: [
                {
                  label: t("grid_vis"),
                  fill: true,
                  backgroundColor: 'rgba(90, 194, 161, 0.2)',
                  borderColor: 'rgba(90, 194, 161, 1)',
                  data: visList
                }
              ]
        }
    }

}
export default withRouter(ScreenCharts)