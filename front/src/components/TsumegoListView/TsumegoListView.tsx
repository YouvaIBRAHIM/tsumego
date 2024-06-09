import { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TsumegoListTableHead from "@src/components/TsumegoListView/TsumegoListTableHead"
import TableToolbar from "@src/components/TsumegoListView/TableToolbar"
import { useDebounce } from '@services/hooks.services';
import { IconButton, Pagination, Tooltip, alpha, styled } from '@mui/material';
import TableSkeleton from '@components/Skeletons/TableSkeletons';
import { PencilSimpleLine, Trash } from '@phosphor-icons/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '@services/apis/user.api';
import ErrorView from '@components/Views/ErrorView';
import ListNotFound from '@components/TableListNotFound';
import Confirmation from '@components/Confirmation';
import { getProblems } from '@src/services/apis/tsumego.api';
import { ITsumegoProblem, ITsumegoProblemSearch } from '@src/types/tsumego.type';
import TsumegoModal from '@src/components/TsumegoListView/TsumegoModal';


const TsumegoListView = () => {
    const queryClient = useQueryClient()
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState<ITsumegoProblemSearch>({
        value: "", 
        searchBy: "title",
        level: "all",
        order: "asc",
        orderBy: "title"
    });

    const [ tsumegoToModerate, setTsumegoToModerate ] =useState<ITsumegoProblem | null>(null)
    const [ tsumegoToDelete, setTsumegoToDelete ] =useState<ITsumegoProblem | null>(null)

    const debouncedSearch = useDebounce(search.value, 500);

    const { data: problems, isFetching, refetch, isError, error } = useQuery({ 
        queryKey: ['problems'], 
        queryFn: () =>  getProblems(page, perPage, search),
        retry: 3,
    });

    const deleteUserMutation = useMutation({
        mutationFn: (id: string) => deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries(  {
                queryKey: ['problems'],
            })
            setTsumegoToDelete(null)
        },
        onError: error => {
            console.log(error)
        }
    })

    useEffect(() => {
        if (debouncedSearch) {
            console.log("🚀 ~ useEffect ~ debouncedSearch:", debouncedSearch)
        }
    }, [page, perPage, debouncedSearch])

    const handleRequestSort = (property: ITsumegoProblemSearch["orderBy"]) => {
        const isAsc = search.orderBy === property && search.order === 'asc';
        setSearch((prev) => ({
            ...prev,
            order: isAsc ? 'desc' : 'asc',
            orderBy: property
        }))
    };

    const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    }

    
    const renderTableBody = useCallback(() => {
        // const visibleRows = (problems) ? stableSort(problems.data, getComparator(search.order, search.orderBy)): []
        const visibleRows = problems?.data 
        
        if (isFetching) {
            return <TableSkeleton rows={10} cells={5}/>
        }else if (visibleRows) {
            return (
                <TableBody>
                    {visibleRows.map((row: ITsumegoProblem, index: number) => {
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                            <StyledTableRow
                                role="checkbox"
                                tabIndex={-1}
                                key={row.id}
                            >
                                <TableCell
                                    component="th"
                                    id={labelId}
                                    scope="row"
                                >
                                    {row.label}
                                </TableCell>
                                <TableCell align="left">{row.level}</TableCell>
                                <TableCell align="left">{'user'}</TableCell>
                                <TableCell align="left">
                                    <Box>
                                        <Tooltip title='Éditer' onClick={()=> setTsumegoToModerate(row)}>
                                        <IconButton aria-label="action" size="small">
                                            <PencilSimpleLine fontSize="inherit" weight="duotone" />
                                        </IconButton>
                                        </Tooltip>
                                        <Tooltip title='Supprimer'>
                                        <IconButton 
                                            aria-label="action" 
                                            size="small"
                                            onClick={() => setTsumegoToDelete(row)}
                                        >
                                            <Trash fontSize="inherit" weight="duotone" />
                                        </IconButton>
                                        </Tooltip>
                                    </Box>
                                </TableCell>
                            </StyledTableRow>
                        );
                    })}

                </TableBody>
            )
        }
    }, [isFetching, problems, search.order, search.orderBy]);

    
    if (isError) {
        return <ErrorView message={error.message} refetch={refetch}/>
    }

    const updateSearch = (key: keyof ITsumegoProblemSearch, value: unknown) => {
        setSearch(prev => ({
            ...prev, 
            [key]: value
        }))
    }

    const onUpdateUserRole = (roles: string[]) => {
        console.log("🚀 ~ onUpdateUserRole ~ roles:", roles)
    }
    
    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableToolbar 
                    perPage={perPage} 
                    setPerPage={(value: number) => setPerPage(value)} 
                    level={search.level} 
                    setLevel={(val: ITsumegoProblemSearch["level"]) => updateSearch("level", val)} 
                    search={search} 
                    updateSearch={updateSearch}
                />
                <TableContainer
                    sx={{
                        maxHeight: "60vh"
                    }}
                >
                    <Table
                        aria-labelledby="problemsTable"
                        size={'medium'}
                        stickyHeader
                    >
                        <TsumegoListTableHead
                            order={search.order}
                            orderBy={search.orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        {renderTableBody()}
                    </Table>
                </TableContainer>
                {
                    problems?.data.length === 0 &&
                    <ListNotFound  message="Aucun utilisateur trouvé."/>
                }
            </Paper>
            <Pagination 
                color='primary' 
                count={problems?.total ? Math.ceil(problems.total / perPage) : 0} 
                page={Number(page)} 
                siblingCount={5} 
                onChange={handleChangePage}
            />
            {
                tsumegoToDelete && (
                    <Confirmation 
                        open={Boolean(tsumegoToDelete)} 
                        title="Voulez-vous vraiment supprimer ce problème ?"
                        onConfirmation={() => deleteUserMutation.mutate(tsumegoToDelete.id)}
                        onCancelation={() => setTsumegoToDelete(null)}
                    />
                )
            }
            {
                tsumegoToModerate && (
                    <TsumegoModal 
                        open={Boolean(tsumegoToModerate)}
                        title={tsumegoToModerate.label}
                        roles={[tsumegoToModerate.level]}
                        onConfirmation={onUpdateUserRole}
                        onCancelation={() => setTsumegoToModerate(null)}
                    />
                )
            }
        </Box>
    );
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    '&:hover': {
        backgroundColor: theme.palette.mode === "dark" ? alpha(theme.palette.primary.main, 0.35) : alpha(theme.palette.primary.main, 0.75),
    },
}));

export default TsumegoListView;