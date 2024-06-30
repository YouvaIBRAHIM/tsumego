import { IAsideListData } from "../components/AsideList/AsideList"
import { IPlateau } from "../components/Plateau/Plateau"
import { AutoCompleteGoBoardPoint, IGo, IProblem } from "../types/go.types"

export const problemListDataToAsideListData = (
  data: IProblem[] | null,
): IAsideListData[] | null => {
  if (!data) return null

  return data.map((el) => ({
    id: el.id,
    label: el.label,
    value: el,
  }))
}

export const transformProblemToGoState = (
  obj: IProblem | null,
): IPlateau["defaultState"] | null => {
  if (obj === null) return null

  const result: IGo["position"] = {}
  const { AB, AW, SZ, nextToPlay, SOL, won } = obj

  if (AB && Array.isArray(AB)) {
    AB.forEach((position) => {
      const [col, row] = position
      result[`${col}${row}`] = "black"
    })
  }

  if (AW && Array.isArray(AW)) {
    AW.forEach((position) => {
      const [col, row] = position
      result[`${col}${row}`] = "white"
    })
  }

  let markers: { [key: string]: string } = {}
  if (won && SOL && SOL[1]) {
    markers[SOL[1] as string] = "circle"
    if (nextToPlay === "white" || nextToPlay === "black") {
      result[SOL[1]] = nextToPlay
    }
  }

  return {
    position: result,
    size: Number(SZ),
    nextToPlay: nextToPlay,
    markers,
  }
}

export const generateGoBoardPoints = (size: number): AutoCompleteGoBoardPoint[] => {
  const points: AutoCompleteGoBoardPoint[] = []
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

  for (let col = 0; col <= size; col++) {
    for (let row = 1; row <= size; row++) {
      const label = `${letters[col]}${row}`
      points.push({ label })
    }
  }

  return points.sort((a, b) => a.label.localeCompare(b.label))
}

export function filterExcludedPoints(
  excludedPoints: IGo["position"],
  points: AutoCompleteGoBoardPoint[],
  exceptions: string[],
): AutoCompleteGoBoardPoint[] {
  return points.filter(
    (point) => !(point.label in excludedPoints) || exceptions.includes(point.label),
  )
}
