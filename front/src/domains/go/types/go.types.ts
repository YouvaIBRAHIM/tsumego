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
    level?: string;
    won?: boolean;
    problem: {
        AB: string[];
        AW: string[];
        SZ: string;
        C: string;
        SOL: [string, string, string, string][];
        nextToPlay: "black" | "white"
    };
}