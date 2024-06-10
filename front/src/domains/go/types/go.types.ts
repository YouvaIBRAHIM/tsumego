export interface IGo {
    position: { [key: string]: "white" | "black" };
    markers: { [key: string]: string };
    theme: "classic" | "night" | "paper";
    coordSystem?: string;
    hideBorder?: boolean;
    zoom: { mode: "point"; center: string; ratio: number } | { mode: "zone"; region: "NW" | "NE" | "SE" | "SW" } | null;
    noMargin?: boolean;
    intersection?: string;
    nextToPlay: "white" | "black";
    size: number;
}

export interface IProblem {
    id: string;
    label: string;
    level: "all" | "beginner" | "intermediate" | "advanced";
    won: boolean;
    AB: string[];
    AW: string[];
    SZ: string;
    C: string;
    SOL: string[][];
    nextToPlay: "black" | "white";
    author?: string;
    active?: boolean
}

export interface AutoCompleteGoBoardPoint {
    label: string;
}


export interface StoneProps {
    size: number;
    intersection: string;
    color: string;
    onIntersectionClick?: (key: string) => void;
}
export interface GobanProps extends IGo {
    onIntersectionClick: (intersection: string) => void;
}

export interface ElementProps {
    type?: string;
    key?: string | number;
    txt?: string;
    style?: { [key: string]: string };
    className: string; 
    onClick?: () => void;
}

export interface ITheme {
    classic: string,
    paper: string,
    night: string
}

export interface ISelectValue{
    label: string
    value: string
}

export interface ISelectDifficulty extends ISelectValue{
    value: "all" | "beginner" | "intermediate" | "advanced"
}

export interface ISearchState {
    value: string
    difficulty: ISelectDifficulty["value"]
}

export interface IProblemList{
    data: IProblem[]
    total: number
}


export interface ITsumegoProblemList{
    data: IProblem[]
    total: number
}

export interface ITsumegoProblemSearch{
    value: string, 
    searchBy: "label" | "author",
    orderBy: "label" | "author",
    order: "asc" | "desc",
    level: IProblem["level"],
    status: "all" | "active" | "inactive",

}