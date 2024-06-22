import { Dispatch, MutableRefObject, SetStateAction, useRef, useState } from "react";
import getGoTheme from "../../services/go/getGoTheme";
import { IGo, IProblemCreate } from "../../types/go.types";
import Go from "../Plateau/Go";
import { initialGoProps } from "../Plateau/constants/go";
import { EBoardSize } from "./types/creation.type";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { Stack } from "@mui/system";

interface IProps {
  boardSize: EBoardSize;
  positions: IGo["position"];
  setPositions: Dispatch<SetStateAction<IGo["position"]>>;
  movesListRef: MutableRefObject<Set<string>>;
}
const StepTwo = ({ boardSize, positions, setPositions, movesListRef }: IProps) => {
  const [open, setOpen] = useState(false);
  const stoneColorRef: MutableRefObject<IProblemCreate["nextToPlay"]> = useRef("white");
  const intersectionRef: MutableRefObject<string> = useRef("");

  function toggleStoneColor() {
    stoneColorRef.current = stoneColorRef.current === "black" ? "white" : "black";
  }

  function handleIntersectionClick(intersection: string) {
    intersectionRef.current = intersection;
    intersection in positions ? setOpen(true) : dropStone(intersection);
  }

  function dropStone(intersection: string) {
    toggleStoneColor();
    setPositions((position) => ({
      ...position,
      [intersection]: stoneColorRef.current,
    }));
    movesListRef.current.add(intersection);
    if (open) setOpen(false);
  }

  function removeStone(intersection: string) {
    toggleStoneColor();
    setPositions((position) => {
      const pos = { ...position };
      delete pos[intersection];
      return pos;
    });
    movesListRef.current.delete(intersection);
    if (open) setOpen(false);
  }

  return (
    <>
      <Stack>
        <Button size="small"></Button>
      </Stack>
      <Go
        theme={getGoTheme()}
        position={positions}
        markers={initialGoProps.markers}
        nextToPlay={initialGoProps.nextToPlay}
        onIntersectionClick={handleIntersectionClick}
        hideBorder={initialGoProps.hideBorder}
        zoom={initialGoProps.zoom}
        noMargin={initialGoProps.noMargin}
        coordSystem={initialGoProps.coordSystem}
        size={+boardSize}
      />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Une pierre est en conflit</DialogTitle>
        <DialogActions>
          <Button variant="contained" onClick={() => removeStone(intersectionRef.current)}>
            Supprimer la pierre
          </Button>
          <Button variant="contained" onClick={() => dropStone(intersectionRef.current)}>
            Changer de pierre
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StepTwo;
