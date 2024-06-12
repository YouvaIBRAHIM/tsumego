import { Button, Grid, Modal, Stack, Theme, useMediaQuery } from "@mui/material";
import AsideList from "../components/AsideList/AsideList";
import AsideListSkeleton from "../components/AsideList/AsideListSkeleton";
import Plateau from "../components/Plateau/Plateau";
import PlateauSkeleton from "../components/Plateau/PlateauSkeleton";
import { problemListDataToAsideListData, transformProblemToGoState } from "../services/global.service";
import { IGo, IProblem, ISearchState, ISelectDifficulty } from "../types/go.types";
import { useEffect, useState } from "react";
import ProblemsAsideList from "../components/AsideList/ProblemsAsideList";

const data: IProblem[] = [
  {
    id: "sdmffkds",
    label: "Problem0001",
    level: "beginner",
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
    level: "beginner",
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
    level: "beginner",
    won: false,
    AB: ["C1", "F2", "B2", "C3", "D3", "B6"],
    AW: ["D1", "C3", "B2", "C3", "D3"],
    SZ: "12",
    C: "White to play: Elementary",
    SOL: [["B", "ba", "Correct.", ""]],
    nextToPlay: "white"
  },
  {
    id: "vcbjh",
    label: "Problem0004",
    level: "beginner",
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
    level: "beginner",
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
    level: "beginner",
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
    level: "beginner",
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
    level: "beginner",
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
    level: "beginner",
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
    level: "beginner",
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
  const [ search, setSearch ] = useState<ISearchState>({
    value: "",
    difficulty: "all"
  })
  const [openModal, setOpenModal] = useState(false);


  const onSetCurrentChoice = (value: string) => {
    setCurrentChoice(value)
  }

  const onSetCurrentProblem = (asideData: IProblem) => {
    const problem: IProblem = asideData as IProblem
    
    setCurrentProblem(problem)
    setCanPlay(!asideData.won)
    setCurrentChoice(null)
    setOpenModal(false)
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

  useEffect(() => {
    console.log(search)
  }, [search])

  const stopPlaying = () => {
    setTimeout(() => setCanPlay(false), 0)
  }

  const handleIntersectionClick = (intersection: string, setState: React.Dispatch<React.SetStateAction<IGo>>) => {
    if (canPlay) {
      setState((state) => {
        if(intersection in state.position && !(intersection in state.markers)) return state
        
        const position: IGo['position'] = {};
        position[intersection] = state.nextToPlay;
        if (state.markers.hasOwnProperty(intersection)) {
          onConfirmChoice()
          onSetCurrentChoice(intersection)
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
          onSetCurrentChoice(intersection)
          return {
            ...state,
            intersection: intersection,
            position: { ...newPosition, ...position },
            markers: marker
          };
        }
        
      });
    }
  }

  const onChangeFilter = (value: string) => {
    setSearch(prev => ({
      ...prev,
      difficulty: value as ISelectDifficulty["value"]
    }))
  }

  const onChangeSearchValue = (value: string) => {
    setSearch(prev => ({
      ...prev,
      value: value
    }))
  }

  const isMobileScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const renderAsideList = () => {
    return (
      (!isLoading && data)  
      ?
      <AsideList onChangeSearchValue={onChangeSearchValue} onChangeFilter={onChangeFilter} search={search} list={<ProblemsAsideList currentItemId={currentProblem?.id} onSetCurrentItem={onSetCurrentProblem} data={problemListDataToAsideListData(data)} />} />
      :
      <AsideListSkeleton />
    )
  }
  return (
    <Grid container spacing={4} direction={isMobileScreen ? "column-reverse" : "row"}>
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
            title={currentProblem?.won ? "Problème résolu" : currentProblem?.C ?? `Posez une pierre ${currentProblem?.nextToPlay === "black" ? "noire" : "blanche"}` }
          />
          :
          <PlateauSkeleton />
        }
      </Grid>
      <Grid item xs={12} sm={4} md={4} lg={4}>
        {
          isMobileScreen 
          ?
          <>
            <Button variant="contained" onClick={() => setOpenModal(true)}>Sélectionner un problème</Button>
            <Modal
              open={openModal}
              onClose={() => setOpenModal(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Stack
                sx={{
                  width: "90%",
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {renderAsideList()}
                <Stack 
                  alignItems={"flex-end"}
                >
                  <Button onClick={() => setOpenModal(false)}>Fermer</Button>
                </Stack>
              </Stack>
              
            </Modal>
          </>
          :
          renderAsideList()
        }
      </Grid>
    </Grid>
  )
}