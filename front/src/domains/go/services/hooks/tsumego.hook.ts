import { useEffect, useState } from "react"

import { Theme } from "@mui/material"

import { useMediaQuery } from "@mui/system"
import { useSnackBarStore } from "@src/reducers/snackbar.reducer"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
  IProblem,
  IProblemSolutionData,
  ITsumegoProblemSearch,
} from "../../types/go.types"
import {
  checkProblemSolution,
  deleteProblem,
  getProblems,
  updateProblemStatus,
} from "../api.services"
import { useDebounce } from "./global.hook"
import { useProblem } from "@src/reducers/problem.store"

export const useTsumegoList = () => {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [search, setSearch] = useState<ITsumegoProblemSearch>({
    value: "",
    searchBy: "label",
    level: "all",
    status: "all",
    order: "asc",
    orderBy: "label",
  })
  const [tsumegoToModerate, setTsumegoToModerate] = useState<IProblem | null>(null)
  const [tsumegoToDelete, setTsumegoToDelete] = useState<IProblem | null>(null)

  const debouncedSearch = useDebounce(search.value, 500)

  const {
    data: problems,
    isFetching,
    refetch,
    isError,
    error
  } = useQuery({
    queryKey: ["problems", page, perPage],
    queryFn: () => getProblems(page, perPage, search),
    retry: 3,
  })


  useEffect(() => {
    if (tsumegoToModerate) {
      setTsumegoToModerate(
        (prev) => problems?.data.find((problem) => problem.id == prev?.id) ?? prev,
      )
    }
  }, [problems])

  useEffect(() => {
    refetch()
  }, [page])

  useEffect(() => {
    refetch()
    .then(() => setPage(1))
  }, [perPage, debouncedSearch, search.searchBy, search.level, search.status])

  const deleteTsumegoMutation = useMutation({
    mutationFn: (id: string) => deleteProblem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["problems"] })
      setTsumegoToDelete(null)
    },
    onError: (error: Error) => {
      console.log(error)
    },
  })

  const updateTsumegoStatusMutation = useMutation({
    mutationFn: (id: string) => updateProblemStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["problems"] })
    },
    onError: (error: Error) => {
      console.log(error)
    },
  })

  const handleRequestSort = (property: ITsumegoProblemSearch["orderBy"]) => {
    console.log("🚀 ~ handleRequestSort ~ property:", property)
    // const isAsc = search.orderBy === property && search.order === "asc"
    // setSearch((prev) => ({
    //   ...prev,
    //   order: isAsc ? "desc" : "asc",
    //   orderBy: property,
    // }))
  }

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const updateSearch = (key: keyof ITsumegoProblemSearch, value: unknown) => {
    setSearch((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const onUpdateTsumegoStatus = (problemId: string) => {
    updateTsumegoStatusMutation.mutate(problemId)
  }

  return {
    page,
    perPage,
    setPerPage,
    search,
    setSearch,
    tsumegoToModerate,
    setTsumegoToModerate,
    tsumegoToDelete,
    setTsumegoToDelete,
    problems,
    isFetching,
    refetch,
    isError,
    error,
    deleteTsumegoMutation,
    handleRequestSort,
    handleChangePage,
    updateSearch,
    onUpdateTsumegoStatus,
  }
}

export const useTsumegoProblemList = () => {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const perPage = 9
  const [search, setSearch] = useState<ITsumegoProblemSearch>({
    value: "",
    searchBy: "label",
    level: "all",
    status: "active",
    order: "asc",
    orderBy: "label",
  })
  const { showSnackBar } = useSnackBarStore()
  const { problem, setProblem } = useProblem()

  const debouncedSearch = useDebounce(search.value, 500)

  const isMobileScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm"),
  )

  const {
    data: problems,
    isFetching,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["problems", page, perPage],
    queryFn: () => getProblems(page, perPage, search),
    retry: 3,
  })

  const checkProblemSolutionMutation = useMutation({
    mutationFn: (data: IProblemSolutionData) => checkProblemSolution(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["problems"] })
      showSnackBar("Bravo ! Vous avez trouvé la solution", "success")
    },
    onError: (error: Error) => {
      showSnackBar(error.message, "error")
    },
  })

  useEffect(() => {
    refetch()
  }, [page, debouncedSearch, search.level])

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const updateSearch = (key: keyof ITsumegoProblemSearch, value: unknown) => {
    setSearch((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return {
    page,
    perPage,
    search,
    setSearch,
    problems,
    isFetching,
    refetch,
    isError,
    error,
    handleChangePage,
    updateSearch,
    isMobileScreen,
    checkProblemSolutionMutation,
    problem,
    setProblem
  }
}
