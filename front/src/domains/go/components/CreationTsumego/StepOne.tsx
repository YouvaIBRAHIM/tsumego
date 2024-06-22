import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { Dispatch, SetStateAction } from "react";
import Go from "../Plateau/Go";
import { initialGoProps } from "../Plateau/constants/go";
import { EBoardSize } from "./types/creation.type";
import getGoTheme from "../../services/go/getGoTheme";

interface IProps {
  boardSize: EBoardSize;
  setBoardSize: Dispatch<SetStateAction<EBoardSize>>;
}

export const StepOne = ({ boardSize, setBoardSize }: IProps) => {
  return (
    <Stack gap={2}>
      <Stack direction="row" spacing={2} justifyContent={"center"}>
        {Object.entries(EBoardSize).map(([key, value]) => (
          <Button
            key={key}
            size="small"
            variant={value === boardSize ? "contained" : "outlined"}
            color={value === boardSize ? "primary" : "inherit"}
            onClick={() => setBoardSize(value)}
          >
            {key}
          </Button>
        ))}
      </Stack>
      <Go
        theme={getGoTheme()}
        position={initialGoProps.position}
        markers={initialGoProps.markers}
        nextToPlay={initialGoProps.nextToPlay}
        onIntersectionClick={(intersection) => (initialGoProps.intersection = intersection)}
        hideBorder={initialGoProps.hideBorder}
        zoom={initialGoProps.zoom}
        noMargin={initialGoProps.noMargin}
        coordSystem={initialGoProps.coordSystem}
        size={+boardSize}
      />
    </Stack>
  );
};

export default StepOne;
