import { IProblem, ITsumegoProblemSearch, LevelType } from "../types/go.types"

export const descendingComparator = (
  a: IProblem,
  b: IProblem,
  orderBy: ITsumegoProblemSearch["searchBy"],
): number => {
  const from = a[orderBy]
  const to = b[orderBy]

  if (to && from) {
    if (to < from) {
      return -1
    }
    if (to > from) {
      return 1
    }
  }
  return 0
}

export const getComparator = (
  order: ITsumegoProblemSearch["order"],
  orderBy: ITsumegoProblemSearch["searchBy"],
) => {
  return order === "desc"
    ? (a: IProblem, b: IProblem) => descendingComparator(a, b, orderBy)
    : (a: IProblem, b: IProblem) => -descendingComparator(a, b, orderBy)
}

export const stableSort = (
  array: IProblem[],
  comparator: (a: IProblem, b: IProblem) => number,
) => {
  const stabilizedThis: [IProblem, number][] = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })

  return stabilizedThis.map((el) => el[0])
}

export const levelToNumber = (level: LevelType): number => {
  switch (level) {
    case "beginner":
      return 1

    case "intermediate":
      return 2

    case "advanced":
      return 3

    default:
      return 1
  }
}

export const checkResponse = async (response: Response): Promise<unknown | void> => {
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || "Une erreur est survenue")
  }

  return data
}
