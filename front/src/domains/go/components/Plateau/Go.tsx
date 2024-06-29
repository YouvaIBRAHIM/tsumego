import { ReactElement, createElement } from "react"

import {
  Themes,
  defineRadialColors,
  shapeArea,
  shapeBackground,
  shapeGrid,
  shapeLabels,
  shapeMarkers,
  shapeStarPoints,
  shapeStone,
} from "../../services/go/index"
import { ElementProps, GobanProps, StoneProps } from "../../types/go.types"

function toElem(
  shapes: ElementProps[],
  callback?: (key: string) => void,
): ReactElement[] {
  let typeofShape: string
  let txt: string | null = null
  let k = 0

  return shapes.map((shape) => {
    if (shape.type) typeofShape = shape.type

    if (typeofShape === "text") {
      if (shape.txt) {
        txt = shape.txt
      }
      delete shape.txt
    }

    delete shape.type
    shape.key = shape.key || k++
    if (callback) shape.onClick = () => callback(shape.key as string)
    return createElement(typeofShape, shape, txt) as ReactElement
  })
}

function LabelsLayer(props: { size: number; coordSystem: string }): ReactElement {
  const pseudoLabels = shapeLabels(props.size, props.coordSystem)
  return <g className="labels_layer">{toElem(pseudoLabels)}</g>
}

function BackgroundLayer(props: { noMargin: boolean }): ReactElement {
  const pseudoBackground = shapeBackground(props.noMargin)
  return <g className="background_layer">{toElem(pseudoBackground)}</g>
}

function GridLayer(props: { size: number }): ReactElement {
  const pseudoLines = shapeGrid(props.size)
  return <g className="grid_layer">{toElem(pseudoLines)}</g>
}

function StarPointsLayer(props: { size: number }): ReactElement {
  const pseudoStarPoints = shapeStarPoints(props.size)
  return <g className="starpoints_layer">{toElem(pseudoStarPoints)}</g>
}

function MarkersLayer(props: {
  size: number
  markers: { [key: string]: string }
  positions: { [key: string]: string }
}): ReactElement {
  const pseudoMarkers = shapeMarkers(props.size, props.markers, props.positions)
  return <g className="markers_layer">{toElem(pseudoMarkers)}</g>
}

function CompositeStonesLayer(props: {
  size: number
  set: { [key: string]: string }
  nextToPlay: string
  onIntersectionClick: (intersection: string) => void
}): ReactElement {
  const handleClick = (intersection: string) => {
    props.onIntersectionClick(intersection)
  }
  const { size, set } = props
  const items: ReactElement[] = []
  for (let i = 1; i <= size; i++) {
    const skipI = i >= 9 ? 1 : 0
    const hA1 = String.fromCharCode(64 + i + skipI)
    const haa = String.fromCharCode(96 + i)
    for (let j = 1; j <= size; j++) {
      const vA1 = j.toString()
      const vaa = String.fromCharCode(96 + size - j + 1)
      const coordA1 = hA1 + vA1
      const coordaa = haa + vaa
      const color = set[coordA1] || set[coordaa] || "placeholder"
      items.push(
        <Stone
          key={coordA1}
          size={size}
          intersection={coordA1}
          color={color}
          onIntersectionClick={handleClick}
        />,
      )
    }
  }
  const cls = "stones_layer " + props.nextToPlay
  return <g className={cls}>{items}</g>
}

function Stone(props: StoneProps): ReactElement {
  const pseudoStone = shapeStone(props.size, props.intersection, props.color)
  return toElem(pseudoStone, props.onIntersectionClick)[0]
}

function Style(props: { theme: keyof typeof Themes }): ReactElement {
  return <style>{Themes[props.theme]}</style>
}

function Definitions(): ReactElement {
  const b = defineRadialColors("black")
  const w = defineRadialColors("white")
  return (
    <defs>
      <radialGradient id={"blackgrad"} {...b.gradient}>
        <stop offset="0%" style={{ stopColor: b.a, stopOpacity: "1" }} />
        <stop offset="100%" style={{ stopColor: b.z, stopOpacity: "1" }} />
      </radialGradient>
      <radialGradient id={"whitegrad"} {...w.gradient}>
        <stop offset="0%" style={{ stopColor: w.a, stopOpacity: "1" }} />
        <stop offset="100%" style={{ stopColor: w.z, stopOpacity: "1" }} />
      </radialGradient>
    </defs>
  )
}

export function Go(props: GobanProps): ReactElement {
  const viewBox = shapeArea(
    props.hideBorder || false,
    props.zoom || {},
    props.size,
  ).join(" ")
  return (
    <svg
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      style={{ maxHeight: "60vh" }}
    >
      <Style theme={props.theme} />
      <Definitions />
      <BackgroundLayer noMargin={props.noMargin || false} />
      <GridLayer size={props.size} />
      <StarPointsLayer size={props.size} />
      <LabelsLayer size={props.size} coordSystem={props.coordSystem || ""} />
      <CompositeStonesLayer
        size={props.size}
        set={props.position}
        nextToPlay={props.nextToPlay}
        onIntersectionClick={props.onIntersectionClick}
      />
      <MarkersLayer
        size={props.size}
        markers={props.markers}
        positions={props.position}
      />
    </svg>
  )
}

export default Go
