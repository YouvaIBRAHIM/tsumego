import { MutableRefObject } from "react"

import type { IGo, IProblemCreate } from "@src/domains/go/types/go.types"
import { UseFormSetValue } from "react-hook-form"

interface IRemoveLastStone {
  data: IProblemCreate
  setValue: UseFormSetValue<IProblemCreate>
}

interface ISetSOL {
  movesListRef: MutableRefObject<Set<string>>
  positions: IGo["position"]
  setValue: UseFormSetValue<IProblemCreate>
}
interface IsetBlackAndWhite {
  positions: IGo["position"]
  setValue: UseFormSetValue<IProblemCreate>
}
const useStepValidation = () => {
  function removeLastStone({ data, setValue }: IRemoveLastStone): void {
    const player = ("A" + data.SOL[0]) as "AB" | "AW"
    const finalData = structuredClone(data)
    finalData[player].pop()
    setValue(player, finalData[player])
  }

  function setSOL({ movesListRef, positions, setValue }: ISetSOL): void {
    const lastMove = [...movesListRef.current].pop()
    if (!lastMove) throw new Error("No last move")
    const SOL = [positions[lastMove][0].toUpperCase(), lastMove]
    const nextToPlay = positions[lastMove]

    setValue("SOL", SOL)
    setValue("nextToPlay", nextToPlay)
  }

  function setBlackAndWhite({ positions, setValue }: IsetBlackAndWhite): void {
    const accAB: IProblemCreate["AB"] = []
    const accAW: IProblemCreate["AW"] = []
    const { accAB: AB, accAW: AW } = Object.entries(positions).reduce(
      (acc, [key, value]) => {
        value === "black" ? accAB.push(key) : accAW.push(key)
        return acc
      },
      { accAB, accAW },
    )
    setValue("AB", AB)
    setValue("AW", AW)
  }

  return {
    removeLastStone,
    setSOL,
    setBlackAndWhite,
  }
}

export default useStepValidation
