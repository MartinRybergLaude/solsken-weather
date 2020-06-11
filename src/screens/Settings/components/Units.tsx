import React from 'react'
import styles from './Settings.module.scss'

import { Global } from 'utils/globals'
import * as Strings from 'utils/strings'

import Dropdown, {Option} from 'components/Dropdown'


export default function SettingsUnits() {
    const [unitTempr, setUnitTempr] = React.useState(
        localStorage.getItem('unitTempr') || 'c'
    )
    const [unitWind, setUnitWind] = React.useState(
        localStorage.getItem('unitWind') || 'ms'
    )
    const [unitPrec, setUnitPrec] = React.useState(
        localStorage.getItem('unitPrec') || 'mmh'
    )
    const [unitPressure, setUnitPressure] = React.useState(
        localStorage.getItem('unitPressure') || 'hpa'
    )
    const [unitVis, setUnitVis] = React.useState(
        localStorage.getItem('unitVis') || 'km'
    )
    const [unitTime, setUnitTime] = React.useState(
        localStorage.getItem('unitTime') || '24h'
    )
    React.useEffect(() => {
        localStorage.setItem('unitTempr', unitTempr)
    }, [unitTempr])
    React.useEffect(() => {
        localStorage.setItem('unitWind', unitWind)
    }, [unitWind])
    React.useEffect(() => {
        localStorage.setItem('unitPrec', unitPrec)
    }, [unitPrec])
    React.useEffect(() => {
        localStorage.setItem('unitPressure', unitPressure)
    }, [unitPressure])
    React.useEffect(() => {
        localStorage.setItem('unitVis', unitVis)
    }, [unitVis])
    React.useEffect(() => {
        localStorage.setItem('unitTime', unitTime)
    }, [unitTime])

    const onChangeTempr = (option: Option) => {
        if (option != null) {
            Global.shouldReformat = true
            setUnitTempr(option.value)
        }
    }
    const onChangeWind = (option: Option) => {
        if (option != null) {
            Global.shouldReformat = true
            setUnitWind(option.value)
        }
    }
    const onChangePrec = (option: Option) => {
        if (option != null) {
            Global.shouldReformat = true
            setUnitPrec(option.value)
        }
    }
    const onChangePressure = (option: Option) => {
        if (option != null) {
            Global.shouldReformat = true
            setUnitPressure(option.value)
        }
    }
    const onChangeVis = (option: Option) => {
        if (option != null) {
            Global.shouldReformat = true
            setUnitVis(option.value)
        }
    }
    const onChangeTime = (option: Option) => {
        if (option != null) {
            Global.shouldReformat = true
            setUnitTime(option.value)
        }
    }

    const temprOptions: Option[] = [
        {value: "c", label: "Celsius"},
        {value: "f", label: "Fahrenheit"},
        {value: "k", label: "Kelvin"}
    ]
    const windOptions: Option[] = [
        {value: "ms", label: "m/s"},
        {value: "kmh", label: "km/h"},
        {value: "mph", label: "mph"},
        {value: "kts", label: "kts"},
        {value: "b", label: "Beaufort"}
    ]
    const precOptions: Option[] = [
        {value: "mmh", label: "mm/h"},
        {value: "cmh", label: "cm/h"},
        {value: "inh", label: "in/h"}
    ]
    const pressureOptions: Option[] = [
        {value: "hpa", label: "hPa"},
        {value: "bar", label: "bar"},
        {value: "at", label: "at"}
    ]
    const visOptions: Option[] = [
        {value: "km", label: "km"},
        {value: "miles", label: "miles"}
    ]
    const timeOptions: Option[] = [
        {value: "24h", label: "24h"},
        {value: "12h", label: "12h"}
    ]
    return (
        <div className={styles.settingsCategory}>
            <h2>{Strings.Units}</h2>
            <div className={styles.itemSettings}>
                <label>{Strings.Temperature}</label>
                <Dropdown value={unitTempr} onChange={onChangeTempr} options={temprOptions}/>
            </div>
            <div className={styles.itemSettings}>
                <label>{Strings.Wind}</label>
                <Dropdown value={unitWind} onChange={onChangeWind} options={windOptions}/>
            </div>
            <div className={styles.itemSettings}>
                <label>{Strings.Precipitation}</label>
                <Dropdown value={unitPrec} onChange={onChangePrec} options={precOptions}/>
            </div>
            <div className={styles.itemSettings}>
                <label>{Strings.Pressure}</label>
                <Dropdown value={unitPressure} onChange={onChangePressure} options={pressureOptions}/>
            </div>
            <div className={styles.itemSettings}>
                <label>{Strings.Visibility}</label>
                <Dropdown value={unitVis} onChange={onChangeVis} options={visOptions}/>
            </div>
            <div className={styles.itemSettings}>
                <label>{Strings.TimeFormat}</label>
                <Dropdown value={unitTime} onChange={onChangeTime} options={timeOptions}/>
            </div>
        </div>
    )
}
