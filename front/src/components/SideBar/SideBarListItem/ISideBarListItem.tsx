import { ReactElement } from "react"


export interface ISideBarListItem {
    id: string
    icon: ReactElement
    label: string
    action?: () => void
    link?: string
}

