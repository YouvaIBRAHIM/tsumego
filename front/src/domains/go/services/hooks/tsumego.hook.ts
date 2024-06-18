import { useMutation, useQuery, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { deleteProblem, getProblems, updateProblemStatus } from '../api.services';
import { IProblem, ITsumegoProblemSearch } from '../../types/go.types';
import { useDebounce } from './global.hook';

export const useTsumegoList = () => {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState<ITsumegoProblemSearch>({
        value: "",
        searchBy: "label",
        level: "all",
        status: "all",
        order: "asc",
        orderBy: "label"
    });
    const [tsumegoToModerate, setTsumegoToModerate] = useState<IProblem | null>(null);
    const [tsumegoToDelete, setTsumegoToDelete] = useState<IProblem | null>(null);

    const debouncedSearch = useDebounce(search.value, 500);

    const { data: problems, isFetching, refetch, isError, error } = useQuery({
        queryKey: ["problems", page, perPage, search],
        queryFn: () => getProblems(page, perPage, search),
        retry: 3,
    });

    useEffect(() => {
        if (tsumegoToModerate) {
            setTsumegoToModerate((prev) => problems?.data.find(problem => problem.id == prev?.id) ?? prev)
        }
    }, [problems])

    useEffect(() => {
        refetch();
    }, [page, perPage, debouncedSearch, search.searchBy, search.level, search.status]);

    const deleteTsumegoMutation: UseMutationResult<void, Error, string> = useMutation({
        mutationFn: (id: string) => deleteProblem(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["problems"] });
            setTsumegoToDelete(null);
        },
        onError: (error: Error) => {
            console.log(error);
        }
    });

    const updateTsumegoStatusMutation: UseMutationResult<void, Error, string> = useMutation({
        mutationFn: (id: string) => updateProblemStatus(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["problems"] })
        },
        onError: (error: Error) => {
            console.log(error);
        }
    });

    const handleRequestSort = (property: ITsumegoProblemSearch["orderBy"]) => {
        const isAsc = search.orderBy === property && search.order === "asc";
        setSearch((prev) => ({
            ...prev,
            order: isAsc ? "desc" : "asc",
            orderBy: property
        }));
    };

    const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const updateSearch = (key: keyof ITsumegoProblemSearch, value: unknown) => {
        setSearch(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const onUpdateTsumegoStatus = (problemId: string) => {
        updateTsumegoStatusMutation.mutate(problemId)
    };

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
    };
};
