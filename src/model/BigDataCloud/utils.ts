import { WeatherData } from 'model/TypesWeather';
import { fetchSettings, apiBaseBigDataCloud } from 'utils/constants'
import * as Types from './types'

export default async function retrieveCity(data: WeatherData): Promise<WeatherData> {
    const lon = data.lonTwoDecimal
    const lat = data.latTwoDecimal
    const userLang = navigator.language.substring(0,2) 
    console.log(`${apiBaseBigDataCloud}latitude=${lat}&longitude=${lon}&localityLanguage=${userLang}`)
    const response = await fetch(`${apiBaseBigDataCloud}latitude=${lat}&longitude=${lon}&localityLanguage=${userLang}`, fetchSettings)
    const jsonResult = await response.json()
    const localityData = await castLocalityData(jsonResult)
    const city = await parseCity(localityData)
    data.city = city
    return data
}
async function castLocalityData(jsonResult: any): Promise<Types.Data> {
    return jsonResult as Types.Data
}
async function parseCity(data: Types.Data): Promise<string> {
    return data.locality
}