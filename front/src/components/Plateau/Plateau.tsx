import { Grid, List, ListItem, ListItemButton, ListItemText, Paper } from "@mui/material"
import Search from "@src/components/Search"
import SelectFilter from "@src/components/SelectFilter"
import { useState } from "react"
import Goban from "./Go"

export interface IAsideListData{
    id: string
    label: string
    value: unknown
}

interface IAsideList{
    data: IAsideListData[]
}

const AsideList = ({data}: IAsideList) => {
    const [state, setState] = useState({
        position: { "P16": "black" },
        markers: { "P16": "circle" },
        theme: "classic",
        coordSystem: "A1",
        hideBorder: false,
        zoom: null,
        noMargin: false,
        intersection: "none yet",
        nextToPlay: "black"
      });
    
      const handleIntersectionClick = (intersection) => {
        setState({ ...state, intersection: intersection });
      }
    
      const handleClickTheme = () => {
        const newTheme = (state.theme === "classic") ? "paper" : "classic";
        setState({ ...state, theme: newTheme });
      }
    
      const handleClickCoordSystem = () => {
        const newCoordSystem = (state.coordSystem === "A1") ? "aa" : "A1";
        setState({ ...state, coordSystem: newCoordSystem });
      }
    
      const handleClickBorder = () => {
        setState({ ...state, hideBorder: !state.hideBorder });
      }
    
      const handleClickZoom = () => {
        const newZoom = (state.zoom === null) ? { "mode": "zone", "region": "NE" } : null;
        setState({ ...state, zoom: newZoom });
      }
    
      const handleClickMargin = () => {
        setState({ ...state, noMargin: !state.noMargin });
      }
    
      const handleClickStones = () => {
        const sample = [{ "P16": "black" }, { "od": "black", "pp": "white" }];
        const i = Object.keys(state.position).length === 1 ? 1 : 0;
        setState({ ...state, position: sample[i] });
      }
    
      const handleClickMarkers = () => {
        const sample = [{ "P16": "circle" }, {}];
        const i = Object.keys(state.markers).length === 1 ? 1 : 0;
        setState({ ...state, markers: sample[i] });
      }
    
      const handleClickBW = () => {
        const newColor = (state.nextToPlay === "black") ? "white" : "black";
        setState({ ...state, nextToPlay: newColor });
      }
    
    return (
        <Paper sx={{
            minHeight: "50vh",
            padding: 2
        }}>
            <Goban
                theme={state.theme}
                stones={state.position}
                markers={state.markers}
                nextToPlay={state.nextToPlay}
                onIntersectionClick={handleIntersectionClick}
                hideBorder={state.hideBorder}
                zoom={state.zoom}
                noMargin={state.noMargin}
                coordSystem={state.coordSystem}
                size={9}
            />
        </Paper>
    )
}



export default AsideList
