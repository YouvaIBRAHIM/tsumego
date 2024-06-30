import { useEffect, useState } from "react"

import { Box, Button, Grid, Modal, Paper, Stack } from "@mui/material"

import AsideList from "../components/AsideList/AsideList"
import AsideListSkeleton from "../components/AsideList/AsideListSkeleton"
import ProblemsAsideList from "../components/AsideList/ProblemsAsideList"
import ButtonOpenCreationModal from "../components/CreationTsumego/ButtonOpenCreationModal"
import CreationModal from "../components/CreationTsumego/CreationModal"
import Plateau from "../components/Plateau/Plateau"
import PlateauSkeleton from "../components/Plateau/PlateauSkeleton"
import Search from "../components/Search"
import SelectFilter from "../components/SelectFilter"
import ErrorView from "../components/Views/ErrorView"
import {
  problemListDataToAsideListData,
  transformProblemToGoState,
} from "../services/global.service"
import { useTsumegoProblemList } from "../services/hooks/tsumego.hook"
import { IGo, IProblem, ISelectDifficulty } from "../types/go.types"

export const difficulties: ISelectDifficulty[] = [
  {
    label: "Toutes les difficultés",
    value: "all",
  },
  {
    label: "Facile",
    value: "beginner",
  },
  {
    label: "Intermediaire",
    value: "intermediate",
  },
  {
    label: "Difficile",
    value: "advanced",
  },
]

export default function Problems() {
  const [currentProblem, setCurrentProblem] = useState<IProblem | null>(null)
  const [currentChoice, setCurrentChoice] = useState<string | null>(null)
  const [canPlay, setCanPlay] = useState<boolean>(true)
  const [openModal, setOpenModal] = useState(false)
  const [openCreationModal, setOpenCreationModal] = useState(false)

  const {
    page,
    perPage,
    search,
    problems,
    isFetching,
    refetch,
    isError,
    error,
    handleChangePage,
    updateSearch,
    isMobileScreen,
    checkProblemSolutionMutation,
  } = useTsumegoProblemList()

  const onSetCurrentChoice = (value: string) => setCurrentChoice(value)
  const onConfirmChoice = (solution: string) => {
    if (currentProblem?.id) {
      checkProblemSolutionMutation.mutate({
        problem_id: Number(currentProblem.id),
        solution,
      })
    }
  }

  const onSetCurrentProblem = (asideData: IProblem) => {
    const problem: IProblem = asideData

    setCurrentProblem(problem)
    setCanPlay(!asideData.won)
    setCurrentChoice(null)
    setOpenModal(false)
  }

  useEffect(() => {
    if (!currentProblem && problems?.data) {
      setCurrentProblem(problems?.data[0])
      setCanPlay(!problems?.data[0].won)
    }
  }, [problems?.data])

  const handleIntersectionClick = (
    intersection: string,
    setState: React.Dispatch<React.SetStateAction<IGo>>,
  ) => {
    if (canPlay) {
      setState((state) => {
        if (intersection in state.position && !(intersection in state.markers))
          return state
        const position: IGo["position"] = {}
        position[intersection] = state.nextToPlay
        if (Object.prototype.hasOwnProperty.call(state.markers, intersection)) {
          onConfirmChoice(intersection)
          onSetCurrentChoice(intersection)
          return {
            ...state,
            intersection: intersection,
            position: { ...state.position, ...position },
            markers: {},
            nextToPlay: state.nextToPlay === "black" ? "white" : "black",
          }
        } else {
          const marker: IGo["markers"] = {}
          marker[intersection] = "circle"
          const newPosition: IGo["position"] = state.position

          Object.keys(newPosition).forEach((pos) => {
            if (Object.prototype.hasOwnProperty.call(state.markers, pos)) {
              delete newPosition[pos]
            }
          })
          onSetCurrentChoice(intersection)
          return {
            ...state,
            intersection: intersection,
            position: { ...newPosition, ...position },
            markers: marker,
          }
        }
      })
    }
  }

  const onChangeFilter = (value: string) => {
    updateSearch("level", value)
  }

  const onChangeSearchValue = (value: string) => {
    updateSearch("value", value)
  }

  const renderAsideList = () => {
    return !isFetching && problems?.data ? (
      <AsideList
        list={
          <ProblemsAsideList
            currentItemId={currentProblem && currentProblem?.id}
            onSetCurrentItem={onSetCurrentProblem}
            data={problemListDataToAsideListData(problems?.data)}
          />
        }
        perPage={perPage}
        page={page}
        total={problems.data ? problems.total : 0}
        handleChangePage={handleChangePage}
      />
    ) : (
      <AsideListSkeleton />
    )
  }

  if (isError) {
    return (
      <ErrorView
        message={error?.message ?? "Une erreur est survenue"}
        refetch={refetch}
      />
    )
  }

  return (
    <Grid
      container
      spacing={4}
      direction={isMobileScreen ? "column-reverse" : "row"}
    >
      <Grid item xs={12} sm={8}>
        {problems?.data ? (
          <>
            <Plateau
              onConfirmChoice={onConfirmChoice}
              canPlay={canPlay}
              setCurrentChoice={onSetCurrentChoice}
              defaultState={transformProblemToGoState(currentProblem)}
              onPointChange={handleIntersectionClick}
              currentChoice={currentChoice}
              title={
                currentProblem?.won
                  ? "Problème résolu"
                  : currentProblem?.C ??
                    `Posez une pierre ${currentProblem?.nextToPlay === "black" ? "noire" : "blanche"}`
              }
            />
            {isMobileScreen && (
              <ButtonOpenCreationModal setOpen={setOpenCreationModal} />
            )}
          </>
        ) : (
          <PlateauSkeleton />
        )}
      </Grid>
      <Grid item xs={12} sm={4} md={4} lg={4}>
        {isMobileScreen ? (
          <>
            <Button variant="contained" onClick={() => setOpenModal(true)}>
              Sélectionner un problème
            </Button>
            <Modal
              open={openModal}
              onClose={() => setOpenModal(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Stack
                sx={{
                  width: "90%",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Stack gap={2} px={1}>
                  <Stack direction="row" gap={2}>
                    <Search value={search.value} onChange={onChangeSearchValue} />
                    <SelectFilter
                      currentValue={search.level as string}
                      onChange={onChangeFilter}
                      values={difficulties}
                    />
                  </Stack>
                </Stack>
                {renderAsideList()}
                <Stack alignItems={"flex-end"}>
                  <Button onClick={() => setOpenModal(false)}>Fermer</Button>
                </Stack>
              </Stack>
            </Modal>
          </>
        ) : (
          <>
            <Box mb={2}>
              <ButtonOpenCreationModal setOpen={setOpenCreationModal} />
            </Box>
            <Paper
              sx={{
                minHeight: "50vh",
                padding: 2,
              }}
            >
              <Stack gap={2} px={1}>
                <Stack direction="row" gap={2}>
                  <Search value={search.value} onChange={onChangeSearchValue} />
                  <SelectFilter
                    currentValue={search.level as string}
                    onChange={onChangeFilter}
                    values={difficulties}
                  />
                </Stack>
              </Stack>
              {renderAsideList()}
            </Paper>
          </>
        )}
      </Grid>
      <CreationModal open={openCreationModal} setOpen={setOpenCreationModal} />
    </Grid>
  )
}
