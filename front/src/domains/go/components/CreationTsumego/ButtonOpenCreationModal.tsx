import { Button } from "@mui/material";
import type { Dispatch, SetStateAction } from "react";

interface IProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const ButtonOpenCreationModal = ({ setOpen }: IProps) => {
  return (
    <Button
      variant="contained"
      fullWidth
      sx={{ py: { xs: 1, md: 2 }, mt: { xs: 2, md: 0 } }}
      onClick={() => setOpen((prev) => !prev)}
    >
      Créer un Tsumégo
    </Button>
  );
};

export default ButtonOpenCreationModal;
