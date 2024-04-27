export const sideBarConst: {
    openedWidth: number
    closedWidth: number
    mobileClosedWidth: number
    backgroundColor: {
        listItemBg: {
            light: string
            dark: string
        }
    }
    labelMaxLength: number
} = {
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
}

export const breakpoints = {
    xs: 0,
    sm: 640,
    md: 900,
    lg: 1440,
    xl: 1536,
    xxl: 1920,
}
