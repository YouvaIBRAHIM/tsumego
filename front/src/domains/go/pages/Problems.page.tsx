import { Grid } from "@mui/material";
import AsideList from "../components/AsideList/AsideList";
import AsideListSkeleton from "../components/AsideList/AsideListSkeleton";
import Plateau from "../components/Plateau/Plateau";
import PlateauSkeleton from "../components/Plateau/PlateauSkeleton";
import { problemListDataToAsideListData, transformProblemToGoState } from "../utils/global";
import { IGo, IProblem } from "../types/go.types";
import { useEffect, useState } from "react";
import ProblemsAsideList from "../components/AsideList/ProblemsAsideList";

const data: IProblem[] = [
  {
    id: "sdmffkds",
    label: "Problem0001",
    level: "easy",
    won: false,
    AB: ["E1", "F2", "B2", "C3", "D3", "B6"],
    AW: ["D1", "A1", "B2", "C3", "D3"],
    SZ: "9",
    C: "Black to play: Elementary",
    SOL: [["B", "ba", "Correct.", ""]],
    nextToPlay: "black"
  },
  {
    id: "sdmflhds",
    label: "Problem0002",
    level: "easy",
    won: true,
    AB: ["B1", "F2", "B2", "C3", "D3", "E6"],
    AW: ["D1", "B2", "B2", "C3", "D3"],
    SZ: "19",
    C: "Black to play: Elementary",
    SOL: [["B", "ba", "Correct.", ""]],
    nextToPlay: "white"
  },
  {
    id: "ghjv",
    label: "Problem0003",
    level: "easy",
    won: false,
    AB: ["C1", "F2", "B2", "C3", "D3", "B6"],
    AW: ["D1", "C3", "B2", "C3", "D3"],
    SZ: "12",
    C: "Black to play: Elementary",
    SOL: [["B", "ba", "Correct.", ""]],
    nextToPlay: "black"
  },
  {
    id: "vcbjh",
    label: "Problem0004",
    level: "easy",
    won: false,
    AB: ["D1", "F2", "B2", "C3", "D3", "B6"],
    AW: ["D1", "A1", "D2", "C3", "D3"],
    SZ: "19",
    C: "Black to play: Elementary",
    SOL: [["B", "ba", "Correct.", ""]],
    nextToPlay: "white"
  },
  {
    id: "asdfh",
    label: "Problem0005",
    level: "easy",
    won: false,
    AB: ["E1", "F2", "B2", "C3", "D3", "B6"],
    AW: ["D1", "A1", "B2", "C3", "D3"],
    SZ: "19",
    C: "Black to play: Elementary",
    SOL: [["B", "ba", "Correct.", ""]],
    nextToPlay: "black"
  },
  {
    id: "fdghtr",
    label: "Problem0006",
    level: "easy",
    won: true,
    AB: ["A3", "B2", "C3", "D3", "D6", "B6"],
    AW: ["D1", "C3", "D2", "C3", "D3"],
    SZ: "19",
    C: "Black to play: Elementary",
    SOL: [["B", "ba", "Correct.", ""]],
    nextToPlay: "white"
  },
  {
    id: "dfgsda",
    label: "Problem0007",
    level: "easy",
    won: false,
    AB: ["A3", "F3", "B2", "C3", "D3", "B6"],
    AW: ["D1", "A1", "D2", "C3", "D3"],
    SZ: "19",
    C: "Black to play: Elementary",
    SOL: [["B", "ba", "Correct.", ""]],
    nextToPlay: "black"
  },
  {
    id: "dfgasd",
    label: "Problem0008",
    level: "easy",
    won: true,
    AB: ["A4", "F2", "B2", "C3", "D3", "B6"],
    AW: ["D1", "A1", "D2", "C3", "D3"],
    SZ: "19",
    C: "Black to play: Elementary",
    SOL: [["B", "ba", "Correct.", ""]],
    nextToPlay: "white"
  },
  {
    id: "fdgasd",
    label: "Problem0009",
    level: "easy",
    won: false,
    AB: ["B1", "F3", "B2", "C3", "D3", "B6"],
    AW: ["D1", "A1", "D2", "C3", "D3"],
    SZ: "19",
    C: "Black to play: Elementary",
    SOL: [["B", "ba", "Correct.", ""]],
    nextToPlay: "black"
  },
  {
    id: "fdgas",
    label: "Problem0010",
    level: "easy",
    won: false,
    AB: ["B3", "F2", "B2", "C3", "D3", "B6"],
    AW: ["D1", "A1", "D2", "C3", "D3"],
    SZ: "19",
    C: "Black to play: Elementary",
    SOL: [["B", "ba", "Correct.", ""]],
    nextToPlay: "white"
  }
];

export default function Problems() {
  const isLoading = false
  const [ currentProblem, setCurrentProblem ] = useState<IProblem | null>(null)
  const [ currentChoice, setCurrentChoice ] = useState<string | null>(null)
  const [ canPlay, setCanPlay ] = useState<boolean>(true)

  const onSetCurrentChoice = (value: string) => {
    setCurrentChoice(value)
  }

  const onSetCurrentProblem = (asideData: IProblem) => {
    const problem: IProblem = asideData as IProblem
    
    setCurrentProblem(problem)
    setCanPlay(!asideData.won)
  }

  const onConfirmChoice = () => {
    console.log(currentChoice);
    stopPlaying()
  }

  useEffect(() => {
    if (!currentProblem && data) {
      setCurrentProblem(data[0])
      setCanPlay(!data[0].won)
    }
  }, [data])

  const stopPlaying = () => {
    setTimeout(() => setCanPlay(false), 0)
  }

  const handleIntersectionClick = (intersection: string, setState: React.Dispatch<React.SetStateAction<IGo>>) => {
    if (canPlay) {
      setState((state) => {
        const position: IGo['position'] = {};
        position[intersection] = state.nextToPlay;
        if (state.markers.hasOwnProperty(intersection)) {
          onConfirmChoice()
          return {
            ...state,
            intersection: intersection,
            position: { ...state.position, ...position },
            markers: {},
            nextToPlay: state.nextToPlay === "black" ? "white" : "black"
          };
        } else {
          const marker: IGo['markers'] = {}
          marker[intersection] = "circle"
          const newPosition: IGo['position'] = state.position
  
          Object.keys(newPosition).forEach(pos => {
            if (state.markers.hasOwnProperty(pos)) {
              delete newPosition[pos]
            }
          })
          return {
            ...state,
            intersection: intersection,
            position: { ...newPosition, ...position },
            markers: marker
          };
        }
      });
      onSetCurrentChoice(intersection)
    }
  }

  return (
    <Grid container spacing={4} >
      <Grid item xs={12} sm={8}>
        {
          (!isLoading && data)  
          ?
          <Plateau 
            onConfirmChoice={onConfirmChoice} 
            canPlay={canPlay} 
            setCurrentChoice={onSetCurrentChoice} 
            defaultState={transformProblemToGoState(currentProblem)} 
            onPointChange={handleIntersectionClick} 
            currentChoice={currentChoice} 
          />
          :
          <PlateauSkeleton />
        }
      </Grid>
      <Grid item xs={12} sm={4} md={4} lg={4}>
        {
          (!isLoading && data)  
          ?
          <AsideList list={<ProblemsAsideList currentItemId={currentProblem?.id} onSetCurrentItem={onSetCurrentProblem} data={problemListDataToAsideListData(data)} />} />
          :
          <AsideListSkeleton />
        }
      </Grid>
    </Grid>
  )
}