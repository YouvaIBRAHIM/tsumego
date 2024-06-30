export interface IGo {
  position: { [key: string]: NexToPlayType }
  markers: { [key: string]: string }
  theme: "classic" | "night" | "paper"
  coordSystem?: string
  hideBorder?: boolean
  zoom:
    | { mode: "point"; center: string; ratio: number }
    | { mode: "zone"; region: "NW" | "NE" | "SE" | "SW" }
    | null
  noMargin?: boolean
  intersection?: string
  nextToPlay: NexToPlayType
  size: number
}

// export type LevelType = "beginner" | "intermediate" | "advanced";
// export const Levels = ["beginner", "intermediate", "advanced"] as const;
export enum LevelsEnum {
  beginner = "beginner",
  intermediate = "intermediate",
  advanced = "advanced",
}
export type LevelType = LevelsEnum[keyof LevelsEnum]

export enum NexToPlayEnum {
  black = "black",
  white = "white",
}

export type NexToPlayType = NexToPlayEnum[keyof NexToPlayEnum]

export interface IProblem {
  id: string
  label: string
  level: "all" | LevelType
  won: boolean
  AB: string[]
  AW: string[]
  SZ: string
  C?: string
  SOL: string[]
  nextToPlay: NexToPlayType
  author?: string
  active: boolean
}

export interface IProblemCreate
  extends Omit<IProblem, "level" | "won" | "id" | "SOL" | "author"> {
  level: LevelType
  SOL: string[]
  pk_user: number
}

export interface AutoCompleteGoBoardPoint {
  label: string
}

export interface StoneProps {
  size: number
  intersection: string
  color: string
  onIntersectionClick?: (key: string) => void
}
export interface GobanProps extends IGo {
  onIntersectionClick: (intersection: string) => void
}

export interface ElementProps {
  type?: string
  key?: string | number
  txt?: string
  style?: { [key: string]: string }
  className: string
  onClick?: () => void
}

export interface ITheme {
  classic: string
  paper: string
  night: string
}

export interface ISelectValue {
  label: string
  value: string
}

export interface ISelectDifficulty extends ISelectValue {
  value: "all" | "beginner" | "intermediate" | "advanced"
}

export interface ISearchState {
  value: string
  difficulty: ISelectDifficulty["value"]
}

export interface IProblemList {
  data: IProblem[]
  total: number
}

export interface ITsumegoProblemList {
  data: IProblem[]
  total: number
}

export interface ITsumegoProblemSearch {
  value: string
  searchBy: "label" | "author"
  orderBy: "label" | "author"
  order: "asc" | "desc"
  level: IProblem["level"]
  status: "all" | "active" | "inactive"
}

export interface IProblemSolutionData {
  problem_id: number
  solution: string
}
