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
import { MutableRefObject, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createProblem } from "../../services/api.services";
import getGoTheme from "../../services/go/getGoTheme";
import { IGo, IProblemCreate, LevelsEnum } from "../../types/go.types";
import Go from "../Plateau/Go";
import { initProblemCreate, initialGoProps } from "../Plateau/constants/go";
import { EBoardSize } from "./types/creation.type";

interface IProps {
  boardSize: EBoardSize;
  positions: IGo["position"];
  movesListRef: MutableRefObject<Set<string>>;
  closeModal: () => void;
}

const MIN_STONES = 5;
const MODAL_INIT = { open: false, message: <></>, title: "Oups" };
const GO_RULES = "https://artdugo.fr/regles-du-jeu-de-go/";
// const schema = yup.object().shape({
//   label: yup.string().required(),
//   level: yup
//     .string()
//     .oneOf([...Levels])
//     .required(),
//   AB: yup.array().of(yup.string().required()).min(2).required("2 pierres minimum sont obligatoires"),
//   AW: yup.array().of(yup.string().required()).min(2).required("2 pierres minimum sont obligatoires"),
//   SZ: yup.string().required(),
//   C: yup.string(),
//   SOL: yup.array().of(yup.string().required()).required(),
//   nextToPlay: yup.string().oneOf(["black", "white"]).required(),
//   pk_user_id: yup.number().required(),
//   active: yup.boolean(),
// });

const StepValidation = ({ boardSize, positions, movesListRef, closeModal }: IProps) => {
  const [stateModal, setStateModal] = useState(MODAL_INIT);
  const theme = useTheme();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      ...initProblemCreate,
    },
    // resolver: yupResolver(schema),
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

    const SOL = [positions[lastMove][0].toUpperCase(), lastMove, "", ""];
    const { AB, AW } = getBlackAndWhite(positions);
    const data: IProblemCreate = {
      ...formData,
      SOL,
      AB,
      AW,
      SZ: boardSize,
      nextToPlay: positions[lastMove],
      pk_user: 8,
      C: "Black to play: Elementary",
    };

    const [status, res] = await createProblem(data);
    if (status !== 201) {
      setStateModal((prev) => ({ ...prev, open: true, message: <ErrorResponse error={res.label[0]} /> }));
      return;
    }
    closeModal();
  };

  function getBlackAndWhite(positions: IGo["position"]) {
    const AB: IProblemCreate["AB"] = [];
    const AW: IProblemCreate["AW"] = [];
    return Object.entries(positions).reduce(
      (acc, [key, value]) => {
        value === "black" ? AB.push(key) : AW.push(key);
        return acc;
      },
      { AB, AW }
    );
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Go
          theme={getGoTheme()}
          position={positions}
          markers={initialGoProps.markers}
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
              {Object.entries(LevelsEnum).map(([key, value]) => (
                <MenuItem value={value} key={key}>
                  {key}
                </MenuItem>
              ))}
            </Select>

            <TextField label="Non du Tsumego" {...register("label")} />

            <TextField label="Commentaire" placeholder="Maximum 255 caractères" {...register("C")} rows={4} multiline />
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
        Petit rappel simple des règles du jeu Go{" "}
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
