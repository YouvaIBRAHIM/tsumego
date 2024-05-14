/**
 * SVGoban
 * geometry.ts
 */

const SV_GRID_SIZE: number = 560;
const SV_MARGIN: number = 30;
const SV_BORDER_SHRINK: number = 7;
const SV_MARKER: number = 2.5;

/** ASCII decimal codes */
const CODE_9: number = 59;
const CODE_A: number = 65;
const CODE_a: number = 97;

/**
 * Defines horizontal label.
 *
 * @param i index of column
 * @param coordSystem ("A1" or "aa")
 * @returns string
 */
const horizontal = (i: number, coordSystem: string): string => {
    if ("aa" === coordSystem) {
        return String.fromCharCode(CODE_a + --i);
    } else { // "A1" (default)
        const skipI: number = i >= 9 ? 1 : 0;
        return String.fromCharCode(CODE_A + --i + skipI);
    }
};

/**
 * Defines vertical label.
 *
 * @param j index of row
 * @param coordSystem ("A1" or "aa")
 * @param size the grid base (9, 13, 19)
 * @returns string
 */
const vertical = (j: number, coordSystem: string, size: number): string => {
    if ("aa" === coordSystem) {
        return String.fromCharCode(CODE_a + --j);
    } else { // "A1" (default)
        return (size - --j).toString();
    }
};

/**
 * Calculates column and row of intersection.
 *
 * @param intersection either in "A1" or "aa" coordinates
 * @param size the grid base (9, 13, 19)
 * @returns Object
 */
const toColRow = (intersection: string, size: number): { i: number; j: number } => {
    let i: number, j: number;
    if (intersection.charCodeAt(1) > CODE_9) { // "aa"
        i = intersection.charCodeAt(0) - CODE_a + 1;
        j = intersection.charCodeAt(1) - CODE_a + 1;
    } else { // "A1"
        i = intersection.charCodeAt(0) - CODE_A + 1;
        const skipI: number = i >= 9 ? 1 : 0;
        i -= skipI;
        j = size - (+intersection.substring(1)) + 1;
    }
    return { i: i, j: j };
};

/**
 * Translates intersection in other coordinate system.
 *
 * @param intersection either in "A1" or "aa" coordinates
 * @param size the grid base (9, 13, 19)
 * @returns string
 */
const other = (intersection: string, size: number): string => {
    let i: number, j: number, ret: string;
    if (intersection.charCodeAt(1) > CODE_9) { // "aa"
        i = intersection.charCodeAt(0) - CODE_a + 1;
        j = intersection.charCodeAt(1) - CODE_a + 1;
        ret = horizontal(i, "A1") + vertical(j, "A1", size);
    } else { // "A1"
        i = intersection.charCodeAt(0) - CODE_A + 1;
        const skipI: number = i >= 9 ? 1 : 0;
        i -= skipI;
        j = size - (+intersection.substring(1)) + 1;
        ret = horizontal(i, "aa") + vertical(j, "aa", size);
    }
    return ret;
};

/**
 * Shapes the background.
 *
 * @param noMargin
 * @returns Array
 */
export const shapeBackground = (noMargin: boolean): Array<any> => {
    let offset: number, sz: number, cls: string;
    const ret: Array<any> = [];

    cls = "wood";
    if (noMargin) {
        offset = SV_MARGIN + SV_BORDER_SHRINK;
        sz = SV_GRID_SIZE - 2 * SV_BORDER_SHRINK;
    } else {
        offset = 0;
        sz = SV_GRID_SIZE + 2 * SV_MARGIN;
    }
    ret.push({ type: "rect", class: cls, x: offset, y: offset, width: sz, height: sz });
    return ret;
};

/**
 * Shapes the horizontal and vertical lines.
 *
 * @param size the grid base (9, 13, 19)
 * @returns Array
 */
export const shapeGrid = (size: number): Array<any> => {
    size = +size;
    const step: number = SV_GRID_SIZE / (size + 1);
    let x1: number, y1: number, x2: number, y2: number;
    const ret: Array<any> = [];

    const s = {
        "strokeWidth": 1,
        "shapeRndering": "crispEdges",
        "vectorEffect": "non-scaling-stroke"
    };

    let d: string = "";
    for (let i = 1; i <= size; i++) {
        x1 = SV_MARGIN + step;
        y1 = SV_MARGIN + i * step;
        x2 = SV_MARGIN + SV_GRID_SIZE - step;
        y2 = SV_MARGIN + i * step;
        d += "M" + x1 + " " + y1 + "H " + x2 + " ";
    }
    for (let j = 1; j <= size; j++) {
        x1 = SV_MARGIN + j * step;
        y1 = SV_MARGIN + step;
        x2 = SV_MARGIN + j * step;
        y2 = SV_MARGIN + SV_GRID_SIZE - step;
        d += "M" + x1 + " " + y1 + "V " + y2 + " ";
    }
    /** Replace multiple lines with one SVG path */
    ret.push({ type: "path", d: d, style: s });
    return ret;
};

/**
 * Shapes the star points (Hoshis).
 *
 * @param size the grid base (9, 13, 19)
 * @returns Array
 */
export const shapeStarPoints = (size: number): Array<any> => {
    size = +size;
    const step: number = SV_GRID_SIZE / (size + 1);
    let cx: number, cy: number, r: number;
    const ret: Array<any> = [];
    const evenSize: number = size % 2;
    let midStars: number = 1;
    let starPadding: number = 4;
    if (size < 12) {
        starPadding = 3;
        midStars = 0;
    }
    r = step / 10;
    cx = SV_MARGIN + starPadding * step;
    cy = SV_MARGIN + starPadding * step;
    ret.push({ type: "circle", cx: cx, cy: cy, r: r });
    cx = SV_MARGIN - starPadding * step + SV_GRID_SIZE;
    cy = SV_MARGIN + starPadding * step;
    ret.push({ type: "circle", cx: cx, cy: cy, r: r });
    cx = SV_MARGIN + starPadding * step;
    cy = SV_MARGIN - starPadding * step + SV_GRID_SIZE;
    ret.push({ type: "circle", cx: cx, cy: cy, r: r });
    cx = SV_MARGIN - starPadding * step + SV_GRID_SIZE;
    cy = SV_MARGIN - starPadding * step + SV_GRID_SIZE;
    ret.push({ type: "circle", cx: cx, cy: cy, r: r });
    /** Central star point */
    if (evenSize == 1) {
        cx = SV_MARGIN + (size + 1) / 2 * step;
        cy = SV_MARGIN + (size + 1) / 2 * step;
        ret.push({ type: "circle", cx: cx, cy: cy, r: r });
        /** 3rd star point */
        if (midStars == 1) {
            cx = SV_MARGIN + (size + 1) / 2 * step;
            cy = SV_MARGIN + starPadding * step;
            ret.push({ type: "circle", cx: cx, cy: cy, r: r });
            cx = SV_MARGIN + starPadding * step;
            cy = SV_MARGIN + (size + 1) / 2 * step;
            ret.push({ type: "circle", cx: cx, cy: cy, r: r });
            cx = SV_MARGIN + (size + 1) / 2 * step;
            cy = SV_MARGIN - starPadding * step + SV_GRID_SIZE;
            ret.push({ type: "circle", cx: cx, cy: cy, r: r });
            cx = SV_MARGIN - starPadding * step + SV_GRID_SIZE;
            cy = SV_MARGIN + (size + 1) / 2 * step;
            ret.push({ type: "circle", cx: cx, cy: cy, r: r });
        }
    }
    return ret;
};
/**
 * Shapes the axis labels.
 *
 * @param size the grid base (9, 13, 19)
 * @param coordSystem ("A1" or "aa")
 * @returns Array
 */
export const shapeLabels = (size: number, coordSystem: string): Array<any> => {
    size = +size;
    coordSystem = coordSystem || "A1";
    const step: number = SV_GRID_SIZE / (size + 1);
    let x: number, y: number, txt: string;
    const ret: Array<any> = [];

    for (let i = 1; i <= size; i++) {

        /** Top row */
        x = SV_MARGIN + i * step;
        y = SV_MARGIN - 5;
        txt = horizontal(i, coordSystem);
        const s = {
            "textAnchor": "middle"
        };
        ret.push({ type: "text", x: x, y: y, txt: txt, style: s });

        /** Bottom row */
        x = SV_MARGIN + i * step;
        y = SV_MARGIN + SV_GRID_SIZE + 15;
        txt = horizontal(i, coordSystem);
        ret.push({ type: "text", x: x, y: y, txt: txt, style: s });
    }
    for (let j = 1; j <= size; j++) {

        /** Left column */
        x = SV_MARGIN;
        y = SV_MARGIN + j * step;
        txt = vertical(j, coordSystem, size);
        const s = {
            "textAnchor": "end",
            "dominantBaseline": "central"
        };
        ret.push({ type: "text", x: x, y: y, txt: txt, style: s });

        /** Right column */
        x = SV_MARGIN + SV_GRID_SIZE;
        y = SV_MARGIN + j * step;
        txt = vertical(j, coordSystem, size);
        const s2 = {
            "textAnchor": "start",
            "dominantBaseline": "central"
        };
        ret.push({ type: "text", x: x, y: y, txt: txt, style: s2 });
    }
    return ret;
};

/**
 * Shapes the stones and placeholders.
 *
 * @param size the grid base (9, 13, 19)
 * @param positions as key-value pairs of coordinates and colors
 * @returns Array
 */
export const shapeStones = (size: number, positions: { [key: string]: string }): Array<any> => {
    size = +size;
    const step: number = SV_GRID_SIZE / (size + 1);
    let cx: number, cy: number, r: number, cls: string;
    const ret: Array<any> = [];
    let hA1: string, haa: string, vA1: string, vaa: string, target: string, coordA1: string;

    for (let i = 1; i <= size; i++) {
        hA1 = horizontal(i, "A1");
        haa = horizontal(i, "aa");
        cx = SV_MARGIN + i * step;

        for (let j = 1; j <= size; j++) {
            vA1 = vertical(j, "A1", size);
            vaa = vertical(j, "aa", size);
            coordA1 = hA1 + vA1;
            target = positions[hA1 + vA1] || positions[haa + vaa];

            cls = "stone";
            cls += target ? " " + target + "stone" : " placeholder";
            cls += " " + coordA1;

            cy = SV_MARGIN + j * step;
            r = step / 2.1;
            ret.push({ type: "circle", key: coordA1, cx: cx, cy: cy, r: r, class: cls });
        }
    }
    return ret;
};

/**
 * Shapes a specific intersection.
 *
 * @param size the grid base (9, 13, 19)
 * @param intersection
 * @param color ("black"/"white"/"placeholder")
 * @returns Array
 */
export const shapeStone = (size: number, intersection: string, color: string): Array<any> => {
    size = +size;
    const step: number = SV_GRID_SIZE / (size + 1);
    let cx: number, cy: number, r: number, cls: string;
    const ret: Array<any> = [];
    const rowcol = toColRow(intersection, size);
    cls = "stone";
    color = (color == "placeholder") ? color : color + cls;
    cls += " " + color;
    cls += " " + intersection;
    cx = SV_MARGIN + rowcol.i * step;
    cy = SV_MARGIN + rowcol.j * step;
    r = step / 2.1;
    ret.push({ type: "circle", key: intersection, cx: cx, cy: cy, r: r, class: cls });
    return ret;
};

/**
 * Shapes the last stone played marker.
 *
 * @param size the grid base (9, 13, 19)
 * @param markers
 * @param positions as key-value pairs of coordinates and colors
 * @returns Array
 */
export const shapeMarkers = (size: number, markers: { [key: string]: string }, positions: { [key: string]: string }): Array<any> => {
    size = +size;
    const step: number = SV_GRID_SIZE / (size + 1);
    let x: number, y: number, x1: number, y1: number, x2: number, y2: number, cls: string, points: string;
    const ret: Array<any> = [];
    let coord: any;

    for (let k in markers) {

        const rowcol = toColRow(k, size);
        x = SV_MARGIN + rowcol.i * step;
        y = SV_MARGIN + rowcol.j * step;

        if ("cross" == markers[k]) {
            cls = markers[k] + " on" + (positions[k] || "white");
            x1 = x - step / SV_MARKER;
            y1 = y;
            x2 = x + step / SV_MARKER;
            y2 = y;
            const rot = "rotate(45," + x + "," + y + ")";
            ret.push({ type: "line", x1: x1, y1: y1, x2: x2, y2: y2, class: cls, transform: rot });
            y1 = y - step / SV_MARKER;
            x1 = x;
            y2 = y + step / SV_MARKER;
            x2 = x;
            ret.push({ type: "line", x1: x1, y1: y1, x2: x2, y2: y2, class: cls, transform: rot });

        } else if ("circle" == markers[k]) {
            cls = markers[k] + " on" + (positions[k] || positions[other(k, size)] || "white");
            const r: number = step / 3.5;
            ret.push({ type: "circle", cx: x, cy: y, r: r, class: cls });

        } else if ("square" == markers[k]) {
            cls = markers[k] + " on" + (positions[k] || "white");
            const delta: number = step / SV_MARKER * Math.cos(Math.PI / 4);
            const side: number = 2 * delta;
            x1 = x - delta;
            y1 = y - delta;
            ret.push({ type: "rect", x: x1, y: y1, width: side, height: side, class: cls });

        } else if ("triangle" == markers[k]) {
            cls = markers[k] + " on" + (positions[k] || "white");
            x1 = x;
            y1 = y - step / SV_MARKER;
            x2 = x + step / SV_MARKER * Math.cos(Math.PI / 2 + 2 * Math.PI / 3);
            y2 = y - step / SV_MARKER * Math.sin(Math.PI / 2 + 2 * Math.PI / 3);
            const x3: number = x + step / SV_MARKER * Math.cos(Math.PI / 2 + 4 * Math.PI / 3);
            const y3: number = y - step / SV_MARKER * Math.sin(Math.PI / 2 + 4 * Math.PI / 3);
            points = x1 + "," + y1 + " " + x2 + "," + y2 + " " + x3 + "," + y3;
            ret.push({ type: "polygon", points: points, class: cls });
        } else {
            cls = "wood";
            const r: number = step / 3;
            ret.push({ type: "circle", cx: x, cy: y, r: r, class: cls });
            cls = "on" + (positions[k] || "white");
            const txt: string = markers[k];
            const s = {
                "textAnchor": "middle",
                "dominantBaseline": "central"
            };
            ret.push({ type: "text", x: x, y: y, txt: txt, style: s });
        }
    }
    return ret;
};

/**
 * Shapes the visible area.
 *
 * @param hideMargin
 * @param zoom
 * @param size the grid base (9, 13, 19)
 * @returns Array viewBox (visible area)
 */
export const shapeArea = (hideMargin: boolean, zoom: any, size: number): Array<number> => {
    let offsetX: number, offsetY: number, lX: number, lY: number;
    if (hideMargin) {
        offsetX = offsetY = SV_MARGIN + SV_BORDER_SHRINK;
        lX = lY = SV_GRID_SIZE - 2 * SV_BORDER_SHRINK;
    } else {
        offsetX = offsetY = 0;
        lX = lY = SV_GRID_SIZE + 2 * SV_MARGIN;
    }
    if (zoom) {
        size = +size;
        const step: number = SV_GRID_SIZE / (size + 1);
        const border: number = step / 2;
        if ("point" == zoom.mode) {
            const coord: any = toColRow(zoom.center, size);
            offsetX += (coord.i - (size + 1) / 2) * step;
            offsetY += (coord.j - (size + 1) / 2) * step;
            offsetX += (1 / 2 - 1 / (2 * zoom.ratio)) * lX;
            offsetY += (1 / 2 - 1 / (2 * zoom.ratio)) * lY;
            lX /= zoom.ratio;
            lY /= zoom.ratio;
        } else if ("zone" == zoom.mode) {
            switch (zoom.region) {
                case "NW":
                    offsetX += 0;
                    offsetY += 0;
                    lX = lX / 2 + border;
                    lY = lY / 2 + border;
                    break;
                case "NE":
                    offsetX += lX / 2 - border;
                    offsetY += 0;
                    lX = lX / 2 + border;
                    lY = lY / 2 + border;
                    break;
                case "SE":
                    offsetX += lX / 2 - border;
                    offsetY += lY / 2 - border;
                    lX = lX / 2 + border;
                    lY = lY / 2 + border;
                    break;
                case "SW":
                    offsetX += 0;
                    offsetY += lY / 2 - border;
                    lX = lX / 2 + border;
                    lY = lY / 2 + border;
                    break;
            }
        }
    }
    return [offsetX, offsetY, lX, lY];
};
