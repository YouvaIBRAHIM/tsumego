import { PaletteMode } from "@mui/material"

export const truncateString = (string: string, maxLength: number) => {
    return string.length > maxLength
        ? string.substring(0, maxLength - 3) + '...'
        : string
}

export const getItemFromLocalStorage = (key: string): any => {
    try {
        const item: any = localStorage.getItem(key)
        return JSON.parse(item)
    } catch (error) {
        return null
    }
}

export const setItemInLocalStorage = (key: string, value: any): void => {
    try {
        localStorage.setItem(key, JSON.stringify(value))
    } catch {
        console.error(`Impossible d'enregistrer la clé ${key} dans le localStorage.`)
    }
}

export const getDefaultThemeMode = (): PaletteMode => {
    const themeModeFromLocalStorage = getItemFromLocalStorage('colorMode')
    
    if (!themeModeFromLocalStorage) {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return themeModeFromLocalStorage
}

