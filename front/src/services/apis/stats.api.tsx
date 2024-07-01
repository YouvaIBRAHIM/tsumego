import { checkResponse } from "@services/utils.service"
import { IProblem } from "@src/domains/go/types/go.types"
import { ITopPlayer, IUserProgression } from "@src/types/stats.type"

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL

export const getTopPlayers = async (): Promise<ITopPlayer[] | undefined> => {
  try {
    const response = await fetch(
      `${BACKEND_BASE_URL}/api/top/players/`,
      {
        credentials: "include",
      },
    )

    const data = await checkResponse(response)
    return data as ITopPlayer[]
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export const getUserProgrssion = async (): Promise<IUserProgression | undefined> => {
    try {
      const response = await fetch(
        `${BACKEND_BASE_URL}/api/user/progression/`,
        {
          credentials: "include",
        },
      )
  
      const data = await checkResponse(response)
      return data as IUserProgression
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
    }
}

export const getTopProblems = async (sortBy: string): Promise<IProblem[] | undefined> => {
    try {
      const response = await fetch(
        `${BACKEND_BASE_URL}/api/top/problems/?sort_by=${sortBy}`,
        {
          credentials: "include",
        },
      )
  
      const data = await checkResponse(response)
      return data as IProblem[]
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
    }
}


export const getProblemsSuccessRate = async (): Promise<any> => {
    try {
      const response = await fetch(
        `${BACKEND_BASE_URL}/api/problems/stats/success_rate/`,
        {
          credentials: "include",
        },
      )
  
      const data = await checkResponse(response)
      return data
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
    }
}
