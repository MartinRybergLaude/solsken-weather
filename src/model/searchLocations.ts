import TypeLocation from './Photon/TypesLocation'
import { apiBasePhoton } from 'utils/constants'

export default async function searchLocations(query: string, signal: AbortSignal): Promise<TypeLocation> {
    const fetchSettings = {
        method: "GET",
        mode: "cors" as RequestMode,
        signal: signal
    }
    const userLang = navigator.language.substring(0,2) 
    console.log(`${apiBasePhoton}${query}&limit=6`)
    const response = await fetch(`${apiBasePhoton}${query}&limit=6`, fetchSettings)
    const locationJSON = await response.json()
    const locations = await castLocations(locationJSON)
    return locations
}
async function castLocations(locationJSON: any): Promise<TypeLocation> {
    const data = locationJSON as TypeLocation
    return data
}


