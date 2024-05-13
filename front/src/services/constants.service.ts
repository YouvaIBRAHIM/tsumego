import { IBreakPoints, ISideBarConsts, ThemeObject } from "@src/types/constants.type"

export const sideBarConst: ISideBarConsts = {
    openedWidth: 300,
    closedWidth: 80,
    mobileClosedWidth: 0,
    backgroundColor: {
        listItemBg: {
            light: '#e6e6e6',
            dark: '#616161',
        },
    },
    labelMaxLength: 20,
    transitionDuration: 300 // ms
}

export const breakpoints: IBreakPoints = {
    xs: 0,
    sm: 640,
    md: 900,
    lg: 1440,
    xl: 1536,
    xxl: 1920,
}

export const colors: ThemeObject = {
    dark: {
        primary: {
            main: '#003892',
        },
        divider: '#9e9e9e',
        background: {
            default: '#212121',
            paper: '#424242',
        },
        text: {
            primary: '#fff',
            secondary: '#9e9e9e',
        }
    },
    light: {
        primary: {
            main: '#cfd8dc',
        },
        divider: '#9e9e9e',
        background: {
            default: '#eeeeee',
            paper: '#e0e0e0',
        },
        text: {
            primary: '#212121',
            secondary: '#424242',
        }
    }
}

export const TOOLBAR_HEIGTH: number = 3 //rem