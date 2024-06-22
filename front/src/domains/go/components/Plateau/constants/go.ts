import getGoTheme from "@src/domains/go/services/go/getGoTheme";
import { IGo, IProblemCreate } from "@src/domains/go/types/go.types";
import { EBoardSize } from "../../CreationTsumego/types/creation.type";

export const initialGoProps: IGo = {
  position: {},
  markers: {},
  theme: getGoTheme(),
  coordSystem: "A1",
  hideBorder: false,
  zoom: null,
  noMargin: false,
  intersection: "",
  nextToPlay: "black",
  size: 9,
};

export const initProblemCreate: IProblemCreate = {
  level: "1",
  SZ: EBoardSize.small,
  nextToPlay: "black",
  AB: [],
  AW: [],
  C: "",
  SOL: [],
  label: "",
  active: false,
  pk_user: 0,
};
