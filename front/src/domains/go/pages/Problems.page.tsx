import { Box, Button, Grid, Modal, Stack, Theme, useMediaQuery } from "@mui/material";
import AsideList from "../components/AsideList/AsideList";
import AsideListSkeleton from "../components/AsideList/AsideListSkeleton";
import Plateau from "../components/Plateau/Plateau";
import PlateauSkeleton from "../components/Plateau/PlateauSkeleton";
import { problemListDataToAsideListData, transformProblemToGoState } from "../services/global.service";
import { IGo, IProblem, ISearchState, ISelectDifficulty } from "../types/go.types";
import { useEffect, useState } from "react";
import ProblemsAsideList from "../components/AsideList/ProblemsAsideList";
import CreationModal from "../components/CreationTsumego/CreationModal";
import ButtonOpenCreationModal from "../components/CreationTsumego/ButtonOpenCreationModal";
import { data } from "../components/mocks/tsumego.mock";

export default function Problems() {
  const isLoading = false;
  const [currentProblem, setCurrentProblem] = useState<IProblem | null>(null);
  const [currentChoice, setCurrentChoice] = useState<string | null>(null);
  const [canPlay, setCanPlay] = useState<boolean>(true);
  const [search, setSearch] = useState<ISearchState>({
    value: "",
    difficulty: "all",
  });
  const [openModal, setOpenModal] = useState(false);
  const [openCreationModal, setOpenCreationModal] = useState(false);

  const onSetCurrentChoice = (value: string) => setCurrentChoice(value);
  const onConfirmChoice = () => stopPlaying();
  const stopPlaying = () => setTimeout(() => setCanPlay(false), 0);

  const onSetCurrentProblem = (asideData: IProblem) => {
    const problem: IProblem = asideData;

    setCurrentProblem(problem);
    setCanPlay(!asideData.won);
    setCurrentChoice(null);
    setOpenModal(false);
  };

  useEffect(() => {
    if (!currentProblem && data) {
      setCurrentProblem(data[0]);
      setCanPlay(!data[0].won);
    }
  }, [data]);

  const handleIntersectionClick = (intersection: string, setState: React.Dispatch<React.SetStateAction<IGo>>) => {
    if (canPlay) {
      setState((state) => {
        if (intersection in state.position && !(intersection in state.markers)) return state;
        const position: IGo["position"] = {};
        position[intersection] = state.nextToPlay;
        if (Object.prototype.hasOwnProperty.call(state.markers, intersection)) {
          onConfirmChoice();
          onSetCurrentChoice(intersection);
          return {
            ...state,
            intersection: intersection,
            position: { ...state.position, ...position },
            markers: {},
            nextToPlay: state.nextToPlay === "black" ? "white" : "black",
          };
        } else {
          const marker: IGo["markers"] = {};
          marker[intersection] = "circle";
          const newPosition: IGo["position"] = state.position;

          Object.keys(newPosition).forEach((pos) => {
            if (Object.prototype.hasOwnProperty.call(state.markers, pos)) {
              delete newPosition[pos];
            }
          });
          onSetCurrentChoice(intersection);
          return {
            ...state,
            intersection: intersection,
            position: { ...newPosition, ...position },
            markers: marker,
          };
        }
      });
    }
  };

  const onChangeFilter = (value: string) => {
    setSearch((prev) => ({
      ...prev,
      difficulty: value as ISelectDifficulty["value"],
    }));
  };

  const onChangeSearchValue = (value: string) => {
    setSearch((prev) => ({
      ...prev,
      value: value,
    }));
  };

  const isMobileScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const renderAsideList = () => {
    return !isLoading && data ? (
      <AsideList
        onChangeSearchValue={onChangeSearchValue}
        onChangeFilter={onChangeFilter}
        search={search}
        list={
          <ProblemsAsideList
            currentItemId={currentProblem?.id}
            onSetCurrentItem={onSetCurrentProblem}
            data={problemListDataToAsideListData(data)}
          />
        }
      />
    ) : (
      <AsideListSkeleton />
    );
  };
  return (
    <Grid container spacing={4} direction={isMobileScreen ? "column-reverse" : "row"}>
      <Grid item xs={12} sm={8}>
        {!isLoading && data ? (
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
            {isMobileScreen && <ButtonOpenCreationModal setOpen={setOpenCreationModal} />}
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
                {renderAsideList()}
                <Stack alignItems={"flex-end"}>
                  <Button onClick={() => setOpenModal(false)}>Fermer</Button>
                </Stack>
              </Stack>
            </Modal>
          </>
        ) : (
          <>
            {renderAsideList()}
            <Box mt={2}>
              <ButtonOpenCreationModal setOpen={setOpenCreationModal} />
            </Box>
          </>
        )}
      </Grid>
      <CreationModal open={openCreationModal} setOpen={setOpenCreationModal} />
    </Grid>
  );
}
