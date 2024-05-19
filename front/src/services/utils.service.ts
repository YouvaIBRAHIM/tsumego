import { PaletteMode } from "@mui/material"

export const truncateString = (string: string, maxLength: number) => {
    return string.length > maxLength
        ? string.substring(0, maxLength - 3) + '...'
        : string
}

export const getItemFromLocalStorage = (key: string): string | null => {
    try {
        return localStorage.getItem(key)
    } catch (error) {
        return null
    }
}

export const setItemInLocalStorage = (key: string, value: unknown): void => {
    try {
        localStorage.setItem(key, JSON.stringify(value))
    } catch {
        console.error(`Impossible d'enregistrer la clé ${key} dans le localStorage.`)
    }
}

export const getDefaultThemeMode = (): PaletteMode => {
    const colorMode = getItemFromLocalStorage('colorMode')
    const themeModeFromLocalStorage = colorMode && JSON.parse(colorMode)
    
    if (!themeModeFromLocalStorage) {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return themeModeFromLocalStorage
}
