import React from 'react';
import {shapeGrid, shapeStarPoints, shapeLabels, shapeBackground, shapeMarkers, shapeStones, shapeStone, shapeArea, defineRadialColors, Themes} from '@services/go/index';

function toElem(shapes, callback) {
  let typeofShape;
  let txt = null;
  let k = 0;
  for (let i = 0; i < shapes.length; i++) {
    typeofShape = shapes[i].type;
    if (typeofShape === "text") {
      txt = shapes[i].txt;
      delete shapes[i].txt;
    }
    if (shapes[i].class) {
      shapes[i].className = shapes[i].class;
      delete shapes[i].class;
    }
    delete shapes[i].type;
    shapes[i].key = shapes[i].key || k++;
    if (callback) shapes[i].onClick = () => callback(shapes[i].key);
    shapes[i] = React.createElement(typeofShape, shapes[i], txt);
  }
  return shapes;
}

function LabelsLayer(props) {
  const shouldComponentUpdate = (nextProps, nextState) => {
    return nextProps.size !== props.size || nextProps.coordSystem !== props.coordSystem;
  };
  const pseudoLabels = shapeLabels(props.size, props.coordSystem);
  return (
    <g className="labels_layer">{toElem(pseudoLabels)}</g>
  );
}

function BackgroundLayer(props) {
  const pseudoBackground = shapeBackground(props.noMargin);
  return (
    <g className="background_layer">{toElem(pseudoBackground)}</g>
  );
}

function GridLayer(props) {
  const shouldComponentUpdate = (nextProps, nextState) => {
    return nextProps.size !== props.size;
  };
  const pseudoLines = shapeGrid(props.size);
  return (
    <g className="grid_layer">{toElem(pseudoLines)}</g>
  );
}

function StarPointsLayer(props) {
  const shouldComponentUpdate = (nextProps, nextState) => {
    return nextProps.size !== props.size;
  };
  const pseudoStarPoints = shapeStarPoints(props.size);
  return (
    <g className="starpoints_layer">{toElem(pseudoStarPoints)}</g>
  );
}

function MarkersLayer(props) {
  const pseudoMarkers = shapeMarkers(props.size, props.markers, props.positions);
  return (
    <g className="markers_layer">{toElem(pseudoMarkers)}</g>
  );
}

function FlatStonesLayer(props) {
  const handleClick = (intersection) => {
    props.onIntersectionClick(intersection);
  }
  const pseudoStones = shapeStones(props.size, props.set);
  return (
    <g className="stones_layer">{toElem(pseudoStones, handleClick)}</g>
  );
}

function CompositeStonesLayer(props) {
  const handleClick = (intersection) => {
    props.onIntersectionClick(intersection);
  }
  const { size, set } = props;
  const items = [];
  for (let i = 1; i <= size; i++) {
    const skipI = i >= 9 ? 1 : 0;
    const hA1 = String.fromCharCode(64 + i + skipI);
    const haa = String.fromCharCode(96 + i);
    for (let j = 1; j <= size; j++) {
      const vA1 = j.toString();
      const vaa = String.fromCharCode(96 + size - j + 1);
      const coordA1 = hA1 + vA1;
      const coordaa = haa + vaa;
      const color = set[coordA1] || set[coordaa] || "placeholder";
      items.push(<Stone key={coordA1} size={size} intersection={coordA1} color={color} onIntersectionClick={handleClick} />);
    }
  }
  const cls = "stones_layer " + props.nextToPlay;
  return (
    <g className={cls}>{items}</g>
  );
}

function Stone(props) {
  const shouldComponentUpdate = (nextProps, nextState) => {
    const idem = nextProps.size === props.size &&
      nextProps.intersection === props.intersection &&
      nextProps.color === props.color;
    return !idem;
  };
  const pseudoStone = shapeStone(props.size, props.intersection, props.color);
  return (
    toElem(pseudoStone, props.onIntersectionClick)[0]
  );
}

function Style(props) {
  const shouldComponentUpdate = (nextProps, nextState) => {
    return nextProps.theme !== props.theme;
  };
  return (
    <style>{Themes[props.theme]()}</style>
  );
}

function Definitions() {
  const shouldComponentUpdate = (nextProps, nextState) => {
    return false;
  };
  const b = defineRadialColors("black");
  const w = defineRadialColors("white");
  return (
    <defs>
      <radialGradient id={"blackgrad"} {...b.gradient}>
        <stop offset="0%" style={{ "stopColor": b.a, "stopOpacity": "1" }} />
        <stop offset="100%" style={{ "stopColor": b.z, "stopOpacity": "1" }} />
      </radialGradient>
      <radialGradient id={"whitegrad"} {...w.gradient}>
        <stop offset="0%" style={{ "stopColor": w.a, "stopOpacity": "1" }} />
        <stop offset="100%" style={{ "stopColor": w.z, "stopOpacity": "1" }} />
      </radialGradient>
    </defs>
  );
}

export function Goban(props) {
  const defaultProps = {
    size: "19",
    theme: "classic"
  };
  const viewBox = shapeArea(props.hideBorder, props.zoom, props.size).join(" ");
  return (
    <div className="react-goban">
      <svg className="svgoban" viewBox={viewBox} xmlns="http://www.w3.org/2000/svg" version="1.1" height="100%">
        <Style theme={props.theme} />
        <Definitions />
        <BackgroundLayer noMargin={props.noMargin} />
        <GridLayer size={props.size} />
        <StarPointsLayer size={props.size} />
        <LabelsLayer size={props.size} coordSystem={props.coordSystem} />
        <CompositeStonesLayer size={props.size} set={props.stones} nextToPlay={props.nextToPlay} onIntersectionClick={props.onIntersectionClick} />
        <MarkersLayer size={props.size} markers={props.markers} positions={props.stones} />
      </svg>
    </div>
  );
}

export default Goban;
