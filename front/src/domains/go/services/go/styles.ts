/**
 * SVGoban
 * styles.ts
 *
 */

import { ITheme } from "../../types/go.types";

/**
 * Chosen constants for a top left radial gradient
 */
const SV_GRAD: { [key: string]: string } = {
    "cx": "50%",
    "cy": "45%",
    "r": "60%",
    "fx": "10%",
    "fy": "10%"
};

const SV_BW: { [key: string]: { [key: string]: string } } = {
    "black": {
        "start": "rgb(75,75,75)",
        "stop": "rgb(0,0,0)"
    },
    "white": {
        "start": "rgb(255,255,255)",
        "stop": "rgb(180,180,180)"
    }
};

export const defineRadialColors = (color: string): { id: string; a: string; z: string; gradient: { [key: string]: string } } => {
    const gradient: { [key: string]: string } = { cx: SV_GRAD.cx, cy: SV_GRAD.cy, r: SV_GRAD.r, fx: SV_GRAD.fx, fy: SV_GRAD.fy };
    return { id: color + "grad", a: SV_BW[color]["start"], z: SV_BW[color]["stop"], gradient: gradient };
};

export const themesColor: ITheme = {
    classic: "#b4916c",
    paper: "white",
    night: "#425b5b"
}

/**
 * Themes are just CSS rules
 */
export const Themes: ITheme = {
    "classic": `
            .wood { 
                fill: ${themesColor.classic}; 
            }
            .placeholder { 
                stroke: black;
                opacity: 0 
            }
            .black .placeholder:hover { 
                fill: black;
                stroke: black;
                opacity: 0.2 
            }
            .white .placeholder:hover { 
                fill: white;
                stroke: white;
                opacity: 0.2 
            }
            .blackstone { 
                fill: url(#blackgrad); 
            }
            .whitestone { 
                fill: url(#whitegrad);
            }
            .onblack {
                stroke: white;
                fill: none;
            }
            .onwhite {
                stroke: black;
                fill: none;
            }
        line, path {
            stroke: black; 
        }
        text { 
            font-family: "Ubuntu Light", sans-serif; 
            font-size: 1.1em; 
        }
    `,
    "night": `
            .wood { 
                fill: ${themesColor.night}; 
            }
            .placeholder { 
                fill: black;
                stroke: black;
                opacity: 0 
            }
            .black .placeholder:hover { 
                fill: black;
                stroke: black;
                opacity: 0.2 
            }
            .white .placeholder:hover { 
                fill: white;
                stroke: white;
                opacity: 0.2 
            }
            .blackstone { 
                fill: #222222; 
            }
            .whitestone { 
                fill: #888888;
            }
            .onblack {
                stroke: white;
                fill: none;
            }
            .onwhite {
                stroke: black;
                fill: none;
            }
        line, path {
            stroke: black; 
        }
        text { 
            font-family: sans-serif; 
            font-size: 1.1em; 
        }
    `,
    "paper": `
            .wood { 
                fill: ${themesColor.paper}; 
            }
            .placeholder { 
                fill: black;
                stroke: black;
                opacity: 0 
            }
            .black .placeholder:hover { 
                fill: black;
                stroke: black;
                opacity: 0.2 
            }
            .white .placeholder:hover { 
                fill: white;
                stroke: black;
                opacity: 0.2 
            }
            .blackstone { 
                fill: black; 
                stroke: black;
            }
            .whitestone { 
                fill: white;
                stroke: black;
            }
            .onblack {
                stroke: white;
                fill: none;
            }
            .onwhite {
                stroke: black;
                fill: none;
            }
        line, path {
            stroke: black; 
        }
        text { 
            font-family: sans-serif; 
            font-size: 1.1em; 
        }
    `
};

