import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Step, StepLabel, Stepper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box, Stack } from "@mui/system";
import { XCircle } from "@phosphor-icons/react";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import usePopover from "../../../../components/hooks/usePopover";
import { IGo } from "../../types/go.types";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepValidation from "./StepValidation";
import { EBoardSize } from "./types/creation.type";

interface ICreationModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CreationModal = ({ open, setOpen }: ICreationModalProps) => {
  const theme = useTheme();
  const { handlePopoverClose, handlePopoverOpen, PopOver } = usePopover({});
  const [step, setStep] = useState<number>(0);
  const [boardSize, setBoardSize] = useState<EBoardSize>(EBoardSize.small);
  const [positions, setPositions] = useState<IGo["position"]>({});

  const movesListRef = useRef(new Set<string>());

  const previousStep = () => setStep((prev) => prev - 1);
  const isNext = () => step < steps.length - 1;
  const nextStep = () => (isNext() ? setStep((prev) => prev + 1) : null);
  const closeModal = () => {
    setOpen((prev) => !prev);
    setBoardSize(EBoardSize.small);
    setPositions({});
    setStep(0);
    movesListRef.current.clear();
  };

  const steps = [
    {
      label: "Taille du plateau",
      description: "Choisissez la taille du Goban",
      component: <StepOne boardSize={boardSize} setBoardSize={setBoardSize} />,
    },
    {
      label: "Faites vos jeu",
      description: "Placez toutes les pierres jusqu'a la victoire sur le Goban",
      component: (
        <StepTwo boardSize={boardSize} positions={positions} setPositions={setPositions} movesListRef={movesListRef} />
      ),
    },
    {
      label: "Validation",
      description: "Définissez les paramètres de la partie et soumettre le Tsumego",
      component: (
        <StepValidation
          boardSize={boardSize}
          positions={positions}
          movesListRef={movesListRef}
          closeModal={closeModal}
        />
      ),
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={closeModal}
      aria-labelledby="creation-tsumego"
      aria-describedby="creation d'un Tsumego"
      fullWidth
    >
      <Stack direction="row" justifyContent={"space-between"}>
        <DialogTitle>Création d'un Tsumego</DialogTitle>
        <Button onClick={closeModal}>
          <XCircle size={32} color={theme.palette.primary.main} />
        </Button>
      </Stack>
      <DialogContent sx={{ mt: 1 }}>
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={step} alternativeLabel>
            {steps.map((step) => (
              <Step
                key={step.label}
                aria-haspopup="true"
                onMouseEnter={(e) => handlePopoverOpen(e, step.description)}
                onMouseLeave={handlePopoverClose}
              >
                <StepLabel>{step.label}</StepLabel>
                {PopOver}
              </Step>
            ))}
          </Stepper>
        </Box>
        <Stack gap={2} sx={{ mt: 4 }}>
          {steps[step].component}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" disabled={step <= 0} onClick={previousStep}>
          précédent
        </Button>
        {/*
            These two buttons cannot be toggled conditionally.
            When the submit button appears, the submit function is called before validation.
          */}
        <Button variant="contained" onClick={nextStep} sx={{ display: isNext() ? "visible" : "none" }}>
          suivant
        </Button>
        <Button variant="contained" type="submit" form="tsumegoForm" sx={{ display: isNext() ? "none" : "visible" }}>
          Soumettre
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreationModal;
