import { Button, Paper, Stack, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import Go from "@src/domains/go/components/Plateau/Go"
import { IGo, ITheme } from "../../types/go.types";
import AutoCompleteGoPoint from "../AutocompleteGoPoint";
import { filterExcludedPoints, generateGoBoardPoints } from "../../utils/global";
import GoTheme from "./GoTheme";

export interface IPlateau{
  currentChoice: string | null
  defaultState: {
    position: IGo['position']
    size: number
    nextToPlay: "black" | "white",
    markers: IGo['markers']
  } | null,
  onPointChange: (intersection: string, setState: React.Dispatch<React.SetStateAction<IGo>>) => void
  setCurrentChoice: (value: string) => void
  canPlay: boolean;
  onConfirmChoice: () => void
  title: string
}

const Plateau = ({currentChoice, defaultState, onPointChange, setCurrentChoice, canPlay, onConfirmChoice, title}: IPlateau) => {
  const [state, setState] = useState<IGo>({
    position: {},
    markers: {},
    theme: localStorage.getItem("goTheme") as keyof ITheme ?? "paper",
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
      setState({ ...state, intersection: "", ...defaultState});
    }
    
    isDefaultStateLoaded.current = false;
  }, [defaultState])


  const onSetChoiceWithAutoComplete = (choice: string) => {
    if(choice && choice !== "") {
      setState((state) => {
        const tmpState = state
        const markerKeys= Object.keys(tmpState.markers)
        tmpState.position[choice] = state.nextToPlay
        if (markerKeys) {
          delete tmpState.position[markerKeys[0]]
        }
        tmpState.markers = {}
        tmpState.markers[choice] = "circle"
        return tmpState
      })
      isDefaultStateLoaded.current = true;
      setCurrentChoice(choice)
    }
  }

  const handleIntersectionClick = (intersection: string, ) => {
    onPointChange(intersection, setState)
    isDefaultStateLoaded.current = true;
  }

  const handleClickTheme = (newTheme : keyof ITheme) => {
    setState({ ...state, theme: newTheme });
    localStorage.setItem("goTheme", newTheme)
  }

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
  
  const onSubmitButton = () => {
    onConfirmChoice()

    setState((state) => {
      const tmpState = state
      tmpState.markers = {}
      return tmpState
    })

    isDefaultStateLoaded.current = true;
  }
  return (
      <Paper sx={{
          minHeight: "50vh",
          padding: 2
      }}>
        <Stack
          gap={2}
        >
          <Typography variant="body1">{title}</Typography>
          <Go
            theme={state.theme}
            position={state.position}
            markers={state.markers}
            nextToPlay={state.nextToPlay}
            onIntersectionClick={handleIntersectionClick}
            hideBorder={state.hideBorder}
            zoom={state.zoom}
            noMargin={state.noMargin}
            coordSystem={state.coordSystem}
            size={state.size}
          />
          <GoTheme onChangeTheme={handleClickTheme} currentTheme={state.theme}/>
          <Stack direction="row" spacing={2} justifyContent={"center"}>
            <AutoCompleteGoPoint canPlay={canPlay} setCurrentChoice={onSetChoiceWithAutoComplete} currentChoice={state.intersection ?? ""} data={filterExcludedPoints(state.position, generateGoBoardPoints(state.size), [state.intersection ?? ""])} />
            <Button 
              sx={{
                px: 4
              }} 
              variant="contained"
              disabled={!canPlay || currentChoice == null || currentChoice === ""}
              onClick={onSubmitButton}
            >Soumettre</Button>
          </Stack>
        </Stack>
      </Paper>
  )
}



export default Plateau
