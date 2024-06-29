import { ISideBarListItem } from "@components/SideBar/SideBarListItem/ISideBarListItem"

export interface ISideBarContent {
  sideBarHeader: null | ISideBarListItem
  sideBarList: null | ISideBarListItem[]
}
