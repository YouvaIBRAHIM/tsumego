import { Paper } from "@mui/material"
import { useState } from "react"
import Go from "@components/Plateau/Go"
import { IGo } from "@src/types/go.type";



const Plateau = () => {
    const [state, setState] = useState<IGo>({
      position: { "P16": "white", "P17": "black" },
      markers: { "P16": "circle" },
      theme: "night",
      coordSystem: "A1",
      hideBorder: false,
      zoom: null,
      noMargin: false,
      intersection: "",
      nextToPlay: "black", 
      size : 19
    });
    
    const handleIntersectionClick = (intersection: string) => {
      const position = {}
      position[intersection] = state.nextToPlay
      
      setState({ ...state, intersection: intersection, position: {...state.position, ...position}, nextToPlay: (state.nextToPlay === "black") ? "white" : "black" });
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
            <Go
                theme={state.theme}
                stones={state.position}
                markers={state.markers}
                nextToPlay={state.nextToPlay}
                onIntersectionClick={handleIntersectionClick}
                hideBorder={state.hideBorder}
                zoom={state.zoom}
                noMargin={state.noMargin}
                coordSystem={state.coordSystem}
                size={state.size}
            />
        </Paper>
    )
}



export default Plateau
