import { Paper } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import Go from "@src/domains/go/components/Plateau/Go"
import { IGo } from "../../types/go.types";
import AutoCompleteGoPoint from "../AutocompleteGoPoint";
import { filterExcludedPoints, generateGoBoardPoints } from "../../utils/global";

export interface IPlateau{
  currentChoice: string | null
  defaultState: {
    position: IGo['position']
    size: number
    nextToPlay: "black" | "white"
  } | null,
  onPointChange: (intersection: string, setState: React.Dispatch<React.SetStateAction<IGo>>) => void
}

const Plateau = ({currentChoice, defaultState, onPointChange}: IPlateau) => {
  console.log("🚀 ~ Plateau ~ defaultState:", defaultState?.position)
  
  const [state, setState] = useState<IGo>({
    position: {},
    markers: {},
    theme: "paper",
    coordSystem: "A1",
    hideBorder: false,
    zoom: null,
    noMargin: false,
    intersection: "",
    nextToPlay: "black", 
    size : 9
  });
  
  const isDefaultStateLoaded = useRef(false);

  useEffect(() => {
    if (defaultState && !isDefaultStateLoaded.current) {
      setState({ ...state, ...defaultState});
    }
    isDefaultStateLoaded.current = false;
  }, [defaultState])

  const handleIntersectionClick = (intersection: string, ) => {
    onPointChange(intersection, setState)
    isDefaultStateLoaded.current = true;
  }

  // const handleClickTheme = () => {
  //   const newTheme = (state.theme === "classic") ? "paper" : "classic";
  //   setState({ ...state, theme: newTheme });
  // }

  // const handleClickCoordSystem = () => {
  //   const newCoordSystem = (state.coordSystem === "A1") ? "aa" : "A1";
  //   setState({ ...state, coordSystem: newCoordSystem });
  // }

  // const handleClickBorder = () => {
  //   setState({ ...state, hideBorder: !state.hideBorder });
  // }

  // const handleClickZoom = () => {
  //   const newZoom = (state.zoom === null) ? { "mode": "zone", "region": "NE" } : null;
  //   setState({ ...state, zoom: newZoom });
  // }

  // const handleClickMargin = () => {
  //   setState({ ...state, noMargin: !state.noMargin });
  // }

  // const handleClickStones = () => {
  //   const sample = [{ "P16": "black" }, { "od": "black", "pp": "white" }];
  //   const i = Object.keys(state.position).length === 1 ? 1 : 0;
  //   setState({ ...state, position: sample[i] });
  // }

  // const handleClickMarkers = () => {
  //   const sample = [{ "P16": "circle" }, {}];
  //   const i = Object.keys(state.markers).length === 1 ? 1 : 0;
  //   setState({ ...state, markers: sample[i] });
  // }

  // const handleClickBW = () => {
  //   const newColor = (state.nextToPlay === "black") ? "white" : "black";
  //   setState({ ...state, nextToPlay: newColor });
  // }
  
  return (
      <Paper sx={{
          minHeight: "50vh",
          padding: 2
      }}>
        {currentChoice}
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

        <AutoCompleteGoPoint data={filterExcludedPoints(state.position, generateGoBoardPoints(state.size))} />
      </Paper>
  )
}



export default Plateau
