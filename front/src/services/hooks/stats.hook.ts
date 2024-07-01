
import { useAuthStore } from "@src/reducers/auth.reducer"
import { getProblemsSuccessRate, getTopPlayers, getTopProblems, getUserProgrssion } from "@services/apis/stats.api"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"


export const useStats = () => {  

  const { user } = useAuthStore()
  const [ topProblemsSortBy, setTopProblemsSortBy ] = useState<'recent' | 'popular'>('popular')
  const {
    data: topPlayers,
    isFetching: isFetchingTopPlayers
  } = useQuery({
    queryKey: ["topPlayers"],
    queryFn: () => getTopPlayers(),
    retry: 3,
  })

  const {
    data: userProgression,
    isFetching: isFetchingUserProgression
  } = useQuery({
    queryKey: ["userProgression"],
    queryFn: () => getUserProgrssion(),
    retry: 3,
  })

  const {
    data: topProblems,
    isFetching: isFetchingTopProblems,
    refetch: refetchTopProblems
  } = useQuery({
    queryKey: ["topProblems"],
    queryFn: () => getTopProblems(topProblemsSortBy),
    retry: 3,
  })

  const {
    data: problemsSuccessRate,
    isFetching: isFetchingProblemsSuccessRate
  } = useQuery({
    queryKey: ["problemsSuccessRate"],
    queryFn: () => getProblemsSuccessRate(),
    retry: 3,
  })

  useEffect(() => {
    refetchTopProblems()
  }, [topProblemsSortBy])
  const onHandleSetTopProblemsSortBy = (value: 'recent' | 'popular') => {
    setTopProblemsSortBy(value)
  }
  
  return {
    user,
    topPlayers,
    isFetchingTopPlayers,
    userProgression,
    isFetchingUserProgression,
    topProblems,
    isFetchingTopProblems,
    refetchTopProblems,
    topProblemsSortBy,
    onHandleSetTopProblemsSortBy,
    problemsSuccessRate,
    isFetchingProblemsSuccessRate
  }
}
