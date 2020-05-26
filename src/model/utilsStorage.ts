import { WeatherData } from "model/TypesWeather"

export function getCachedWeatherData(lon: string, lat: string): WeatherData | null {
    lon = parseFloat(lon).toFixed(2)
    lat = parseFloat(lat).toFixed(2)

    if(!storageAvailable) return null
    try {
        let dataString = localStorage.getItem(lon + lat)
        if (dataString == null) return null
        
        let data = JSON.parse(dataString) as WeatherData
        
        if (data != null && Date.now() - new Date(data.retrievedTime).getTime() < 60 * 60000) {
            return data
        } else {
            // Too old or corrupted
            localStorage.removeItem(lon + lat)
            return null
        }
    } catch {
        return null
    }
}
export function setCachedWeatherData(data: WeatherData): boolean {
    data.retrievedTime = new Date()
    if(!storageAvailable) return false
    while(true) {
        try {
            localStorage.setItem(data.lonTwoDecimal + data.latTwoDecimal, JSON.stringify(data))
            return true
        } catch (e) {
            if (e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (localStorage && localStorage.length !== 0)) {
                // Full storage, clear all weather data and try again
                clearAllWeatherData()
            } else {
                // Other error
                break
            }
        }
    }
    return false
}
export function getSetting(key: string): string | null {
    if(!storageAvailable) return null
    try {
        return localStorage.getItem(key)
    } catch {
        return null
    }
}
export function setSetting(key: string, value: string): boolean {
    if(!storageAvailable) return false
    while(true) {
        try {
            localStorage.setItem(key, value)
            return true
        } catch (e) {
            if (e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (localStorage && localStorage.length !== 0)) {
                // Full storage, clear all weather data and try again
                clearAllWeatherData()
            } else {
                // Other error
                break
            }
        }
    }
    return false
}
export function clearExpiredWeatherData() {
    if(!storageAvailable) return
    Object.keys(localStorage).forEach(function(key){
        let value = localStorage.getItem(key)
        if (value == null) {
            localStorage.removeItem(key)
            return
        } else {
            try {
                // Test if item is weather data
                let data = JSON.parse(value) as WeatherData
                if (new Date().getMilliseconds() - new Date(data.retrievedTime).getMilliseconds() > 60 * 60000) {
                    localStorage.removeItem(key)
                }
            } catch {
                // Probably a setting
                return
            }
        }
    })
}
export function clearAllWeatherData() {
    Object.keys(localStorage).forEach(function(key){
        let value = localStorage.getItem(key)
        if (value == null) {
            localStorage.removeItem(key)
            return
        } else {
            try {
                // Test if item is weather data
                let data = JSON.parse(value) as WeatherData
                if (data) {
                    localStorage.removeItem(key)
                }
            } catch {
                // Probably a setting
                return
            }
        }
    })
}

function storageAvailable(): boolean {
    var storage
    try {
        storage = localStorage
        var x = '__storage_test__'
        storage.setItem(x, x)
        storage.removeItem(x)
        return true
    }
    catch(e) {
        return false
    }
}