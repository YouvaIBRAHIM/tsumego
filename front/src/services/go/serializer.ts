/**
 * SVGoban
 * serializer.ts
 *
 */

import * as Geo from './geometry';
import * as Css from './styles';

/** @todo Replace all string concatenations with ES6 templates? */

const _toElem = (shapes: any[]): string => {
    let typeofShape: string;
    let txt: string | null = null;
    let ret = '';

    for (let i = 0; i < shapes.length; i++) {
        typeofShape = shapes[i].type;

        txt = shapes[i].txt || '';
        delete shapes[i].txt;

        delete shapes[i].type;
        ret += '<' + typeofShape + ' ';
        
        ret += 'style="';
        for (const j in shapes[i].style) {
            ret += j + ':' + shapes[i].style[j] + ';';
        }
        ret += '" ';
        delete shapes[i].style;

        for (const k in shapes[i]) {
            if (k === "key") continue;
            ret += k + '="' + shapes[i][k] + '" ';
        }
        ret += '>' 
        ret += txt;
        ret += '</' + typeofShape + '>';
    }
    return ret;
}

const _addBackgroundLayer = (str: string, noMargin: boolean): string => {
    str += '<g class="background_layer">'
    str +=   _toElem(Geo.shapeBackground(noMargin));
    str += '</g>'
    return str;
}

const _addGridLayer = (str: string, size: number): string => {
    str += '<g class="grid_layer">'
    str +=   _toElem(Geo.shapeGrid(size));
    str += '</g>'
    return str;
}

const _addStarPointsLayer = (str: string, size: number): string => {
    str += '<g class="starpoints_layer">'
    str +=   _toElem(Geo.shapeStarPoints(size));
    str += '</g>'
    return str;
}

const _addStonesLayer = (str: string, size: number, pos: any): string => {
    str += '<g class="stones_layer">'
    str +=   _toElem(Geo.shapeStones(size, pos));
    str += '</g>'
    return str;
}

const _addMarkersLayer = (str: string, size: number, markers: any, pos: any): string => {
    str += '<g class="markers_layer">'
    str +=   _toElem(Geo.shapeMarkers(size, markers, pos));
    str += '</g>'
    return str;
}

const _addLettersLayer = (str: string, size: number, coordSystem: string): string => {
    str += '<g class="labels_layer">'
    str +=   _toElem(Geo.shapeLabels(size, coordSystem));
    str += '</g>'
    return str;
}

const _addGradient = (str: string, color: string): string => {
    const rad = Css.defineRadialColors(color);
    let attr = '';
    attr += 'id="' + rad.id + '" ';
    for (const i in rad.gradient) {
        attr += i + '="' + rad.gradient[i] + '" ';
    }
    str += '<radialGradient ';
    str += attr + '>';
    str += '<stop offset="0%" style="stop-color:' + rad.a + ';stop-opacity:1" />'
    str += '<stop offset="100%" style="stop-color:' + rad.z + ';stop-opacity:1" />'
    str += '</radialGradient>';
    return str;
}

const _addStyles = (str: string, theme: string): string => {
    str += '<style type="text/css"><![CDATA['
    str +=   Css.Themes[theme]();
    str += ']]></style>'
    return str;
}

/**
 * Serializes a full SVG goban into a string.
 *
 * @param {object} config object with size and theme attributes
 * @param {object} pos object containing locations of stones
 * @returns {string} 
 */
export const serializeSVG = (config: { size?: number; theme?: string; coordSystem?: string; noMargin?: boolean; hideMargin?: boolean; zoom?: any }, pos: any, markers: any): string => {
    const size = config.size || 19;
    const theme = config.theme || "classic";
    const coordSystem = config.coordSystem || "A1";
    const noMargin = (typeof(config.noMargin) == "undefined") ? false : config.noMargin;
    const hideMargin = (typeof(config.hideMargin) == "undefined") ? false : config.hideMargin;
    const viewBox = Geo.shapeArea(hideMargin, config.zoom, size).join(" ");
    let str = '<svg class="svgoban" xmlns="http://www.w3.org/2000/svg" version="1.1" ';
    str += 'height="100%" viewBox="' + viewBox + '" >';    
    str += '<defs>';
    str = _addGradient(str, "black");
    str = _addGradient(str, "white");
    str = _addStyles(str, theme);
    str += '</defs>';
    str += '<g class="layers">';
    str = _addBackgroundLayer(str, noMargin);
    str = _addGridLayer(str, size);
    str = _addLettersLayer(str, size, coordSystem);
    str = _addStarPointsLayer(str, size);
    str = _addStonesLayer(str, size, pos);
    str = _addMarkersLayer(str, size, markers, pos);
    str += '</g>';
    str += '</svg>';
    return str;
}
