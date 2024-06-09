export interface ITsumegoProblem {
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
}

export interface ITsumegoProblemList{
    data: ITsumegoProblem[]
    total: number
}

export interface ITsumegoProblemSearch{
    value: string, 
    searchBy: "title" | "author",
    orderBy: "title" | "author",
    order: "asc" | "desc",
    level: ITsumegoProblem["level"],

}