import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { BookBookmark } from "@phosphor-icons/react";
import { MutableRefObject, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createProblem } from "../../services/api.services";
import getGoTheme from "../../services/go/getGoTheme";
import { IGo, IProblemCreate, LevelsEnum, NexToPlayEnum } from "../../types/go.types";
import Go from "../Plateau/Go";
import { initProblemCreate, initialGoProps } from "../Plateau/constants/go";
import { EBoardSize } from "./types/creation.type";
import { useAuthStore } from "@src/reducers/auth.reducer";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useStepValidation from "./hooks/useStepValidation";

interface IProps {
  boardSize: EBoardSize;
  positions: IGo["position"];
  movesListRef: MutableRefObject<Set<string>>;
  closeModal: () => void;
}

const MIN_STONES = 4;
const MODAL_INIT = { open: false, message: <></>, title: "Oups" };
const GO_RULES = "https://artdugo.fr/regles-du-jeu-de-go/";

const schema: yup.ObjectSchema<IProblemCreate> = yup.object({
  C: yup.string().optional(),
  label: yup.string().required(),
  level: yup.mixed<IProblemCreate["level"]>().oneOf(Object.values(LevelsEnum)).required(),
  AB: yup.array(yup.string().required()).required(),
  AW: yup.array(yup.string().required()).required(),
  SZ: yup.string().required(),
  SOL: yup.array(yup.string().required()).required(),
  nextToPlay: yup.mixed<IProblemCreate["nextToPlay"]>().oneOf(Object.values(NexToPlayEnum)).required(),
  active: yup.boolean().required(),
  pk_user: yup.number().required(),
});

const StepValidation = ({ boardSize, positions, movesListRef, closeModal }: IProps) => {
  const { user } = useAuthStore();
  const [stateModal, setStateModal] = useState(MODAL_INIT);
  const [markers, setMarkers] = useState<{
    [key: string]: string;
  } | null>(null);
  const theme = useTheme();
  const { setBlackAndWhite, setSOL, removeLastStone } = useStepValidation();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<IProblemCreate>({
    defaultValues: {
      SZ: boardSize,
      pk_user: user?.id,
      active: false,
      level: LevelsEnum.beginner,
    },
    resolver: yupResolver(schema, { stripUnknown: true, abortEarly: false }),
  });

  const closeStateModal = () => setStateModal(() => MODAL_INIT);

  const submit: SubmitHandler<IProblemCreate> = async (formData) => {
    const lastMove = [...movesListRef.current].pop();
    if (!lastMove) {
      setStateModal((prev) => ({ ...prev, open: true, message: <Message isEmpty /> }));
      return;
    }

    const stonesNb = Object.keys(positions).length;
    if (stonesNb < MIN_STONES) {
      setStateModal((prev) => ({ ...prev, open: true, message: <Message /> }));
      return;
    }
    removeLastStone({ data: getValues(), setValue });

    const [status, res] = await createProblem(formData);
    if (status !== 201) {
      setStateModal((prev) => ({ ...prev, open: true, message: <ErrorResponse error={res.label[0]} /> }));
      return;
    }
    closeModal();
  };

  useEffect(() => {
    const { SOL, AB, AW, nextToPlay } = getValues();
    if (SOL && !markers) {
      setMarkers({ [SOL[1]]: "circle" });
    }
    if (!AB && !AW) {
      setBlackAndWhite({ positions, setValue });
    }
    if (!SOL && !nextToPlay) {
      setSOL({ movesListRef, positions, setValue });
    }
  }, [setBlackAndWhite, setSOL, getValues, markers, movesListRef, positions, setValue]);

  useEffect(() => {
    const { AB, AW } = getValues();
    if (AB.length === 0 && AW.length === 0) {
      setStateModal((prev) => ({ ...prev, open: true, message: <Message isEmpty /> }));
      return;
    }
    if (errors.AB || errors.AW || AB.length + AW.length < MIN_STONES) {
      setStateModal((prev) => ({ ...prev, open: true, message: <Message /> }));
    }
  }, [errors, getValues]);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Go
          theme={getGoTheme()}
          position={positions}
          markers={markers ?? {}}
          nextToPlay={initialGoProps.nextToPlay}
          onIntersectionClick={() => {}}
          hideBorder={initialGoProps.hideBorder}
          zoom={initialGoProps.zoom}
          noMargin={initialGoProps.noMargin}
          coordSystem={initialGoProps.coordSystem}
          size={+boardSize}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <form id="tsumegoForm" onSubmit={handleSubmit(submit)}>
          <FormControl fullWidth margin="dense" size="medium" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <InputLabel id="level-select-label" sx={{ color: `${theme.palette.text.disabled} !important` }}>
              Niveau du Tsumego
            </InputLabel>
            <Select
              labelId="level-select-label"
              id="level-select"
              defaultValue={initProblemCreate.level}
              label="Niveau du Tsumego"
              {...register("level")}
              sx={{ ".MuiSelect-outlined": { borderColor: "red" }, ".MuiSelect-root": { color: "red" } }}
            >
              {Object.values(LevelsEnum).map((level) => (
                <MenuItem value={level} key={level}>
                  {level}
                </MenuItem>
              ))}
            </Select>

            <TextField label="Non du Tsumego" {...register("label")} />

            <TextField
              label="Commentaire (optionnel)"
              placeholder="Maximum 255 caractères"
              {...register("C")}
              rows={4}
              multiline
            />
          </FormControl>
        </form>
      </Grid>
      <Dialog open={stateModal.open} onClose={closeStateModal}>
        <DialogTitle>{stateModal.title}</DialogTitle>
        <DialogContent>{stateModal.message}</DialogContent>
        <DialogActions>
          <Button variant="contained" size="small" onClick={closeStateModal}>
            Compris
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default StepValidation;

const Message = ({ isEmpty = false }: { isEmpty?: boolean }) => {
  return (
    <>
      {isEmpty ? (
        <>
          <Typography>Il semblerait que vous n'ayez pas encore posé de pierres... </Typography>
          <Typography>Pour proposer un Tsumego il faut au moins {MIN_STONES} pierres.</Typography>
        </>
      ) : (
        <Typography>Il doit y avoir au moins {MIN_STONES} pierres. </Typography>
      )}
      <br />
      <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        Petit rappel simple des règles du jeu de Go{" "}
        <Typography component={"a"} href={GO_RULES} target="_blank" color="secondary">
          <BookBookmark size={24} />
        </Typography>
      </Typography>
    </>
  );
};

const ErrorResponse = ({ error }: { error: string }) => {
  return <Typography>{error}</Typography>;
};
