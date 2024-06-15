import { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import UserListTableHead from "@src/components/UserListView/UserListTableHead"
import TableToolbar from "@src/components/UserListView/TableToolbar"
import { getComparator, stableSort } from '@services/utils.service';
import { useDebounce } from '@services/hooks.services';
import { IconButton, Pagination, Tooltip, alpha, styled } from '@mui/material';
import TableSkeleton from '@components/Skeletons/TableSkeletons';
import { PencilSimpleLine, Trash } from '@phosphor-icons/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteUser, getUsers } from '@services/apis/user.api'
import ListNotFound from '@components/TableListNotFound';
import { IUser, IUserSearch } from '@src/types/user.type';
import Confirmation from '@components/Confirmation';
import UpdateUserRoleModal from '@src/components/UserListView/UpdateUserRoleModal';
import ErrorView from '@components/Views/ErrorView';
import { formatRoles } from '@src/services/roles.mapper.service';


const UserListView = () => {
    const queryClient = useQueryClient()
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState<IUserSearch>({
        value: "", 
        searchBy: "name",
        role: "all",
        order: "asc",
        orderBy: "name"
    });

    const [ userToUpdateRole, setUserToUpdateRole ] =useState<IUser | null>(null)
    const [ userToDelete, setUserToDelete ] =useState<IUser | null>(null)

    const debouncedSearch = useDebounce(search.value, 500);

    const { data: users, isFetching, refetch, isError, error } = useQuery({ 
        queryKey: ['users'], 
        queryFn: () =>  getUsers(page, perPage, search),
        retry: 3,
    });

    const deleteUserMutation = useMutation({
        mutationFn: (id: string) => deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries(  {
                queryKey: ['users'],
            })
            setUserToDelete(null)
        },
        onError: error => {
            console.log(error)
        }
    })

    useEffect(() => {
        refetch()
    }, [page, perPage, debouncedSearch, search.role, search.searchBy])

    const handleRequestSort = (property: IUserSearch["orderBy"]) => {
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
        const visibleRows = (users) ? stableSort(users.data, getComparator(search.order, search.orderBy)): []
        
        if (isFetching) {
            return <TableSkeleton rows={10} cells={5}/>
        }else if (visibleRows) {
            return (
                <TableBody>
                    {visibleRows.map((row: IUser, index: number) => {
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
                                    {row.first_name} {row.last_name?.toUpperCase()}
                                </TableCell>
                                <TableCell align="left">{row.email}</TableCell>
                                <TableCell align="left">{formatRoles(row.roles)}</TableCell>
                                <TableCell align="left">
                                    <Box>
                                        <Tooltip title='Éditer' onClick={()=> setUserToUpdateRole(row)}>
                                        <IconButton aria-label="action" size="small">
                                            <PencilSimpleLine fontSize="inherit" weight="duotone" />
                                        </IconButton>
                                        </Tooltip>
                                        <Tooltip title='Supprimer'>
                                        <IconButton 
                                            aria-label="action" 
                                            size="small"
                                            onClick={() => setUserToDelete(row)}
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
    }, [isFetching, users, search.order, search.orderBy]);

    
    if (isError) {
        return <ErrorView message={error.message} refetch={refetch}/>
    }

    const updateSearch = (key: keyof IUserSearch, value: unknown) => {
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
                    role={search.role} 
                    setRole={(val: IUserSearch["role"]) => updateSearch("role", val)} 
                    search={search} 
                    updateSearch={updateSearch}
                />
                <TableContainer
                    sx={{
                        maxHeight: "60vh"
                    }}
                >
                    <Table
                        aria-labelledby="usersTable"
                        size={'medium'}
                        stickyHeader
                    >
                        <UserListTableHead
                            order={search.order}
                            orderBy={search.orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        {renderTableBody()}
                    </Table>
                </TableContainer>
                {
                    users?.data.length === 0 &&
                    <ListNotFound  message="Aucun utilisateur trouvé."/>
                }
            </Paper>
            <Pagination 
                color='primary' 
                count={users?.count ? Math.ceil(users.count / perPage) : 0} 
                page={Number(page)}
                onChange={handleChangePage}
            />
            {
                userToDelete && (
                    <Confirmation 
                        open={Boolean(userToDelete)} 
                        title="Voulez-vous vraiment supprimer cet utilisateur ?"
                        message={`${userToDelete.first_name} ${userToDelete.last_name} (${userToDelete.email})`}
                        onConfirmation={() => deleteUserMutation.mutate(userToDelete.id)}
                        onCancelation={() => setUserToDelete(null)}
                    />
                )
            }
            {
                userToUpdateRole && (
                    <UpdateUserRoleModal 
                        open={Boolean(userToUpdateRole)}
                        title={`Modifier les rôles de l'utilisateur : ${userToUpdateRole.first_name} ${userToUpdateRole.last_name}`}
                        roles={userToUpdateRole.roles}
                        onConfirmation={onUpdateUserRole}
                        onCancelation={() => setUserToUpdateRole(null)}
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

export default UserListView;