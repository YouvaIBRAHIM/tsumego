import { useCallback } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { Pagination } from "@mui/material";
import ErrorView from "../Views/ErrorView";
import ListNotFound from "../TableListNotFound";
import Confirmation from "../Confirmation";
import TsumegoModal from "./TsumegoModal";
import TsumegoListTableHead from "./TsumegoListTableHead";
import TableToolbar from "./TableToolbar";
import { getComparator, stableSort } from "../../services/utils.service";
import TsumegoListBody from "./TsumegoListItem";
import { useTsumegoList } from '../../services/hooks/tsumego.hook';
import { ITsumegoProblemSearch } from "../../types/go.types";

const TsumegoListView = () => {
    const {
        page,
        perPage,
        setPerPage,
        search,
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
    } = useTsumegoList();

    const renderTableBody = useCallback(() => {
        const visibleRows = problems ? stableSort(problems.data, getComparator(search.order, search.orderBy)) : [];
        return <TsumegoListBody problems={visibleRows} isFetching={isFetching} setTsumegoToDelete={setTsumegoToDelete} setTsumegoToModerate={setTsumegoToModerate} />;
    }, [isFetching, problems, search.order, search.orderBy]);

    if (isError) {
        return <ErrorView message={error?.message ?? "Une erreur est survenue"} refetch={refetch} />;
    }

    return (
        <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
                <TableToolbar
                    perPage={perPage}
                    setPerPage={(value: number) => setPerPage(value)}
                    level={search.level}
                    setLevel={(val: ITsumegoProblemSearch["level"]) => updateSearch("level", val)}
                    status={search.status}
                    setStatus={(val: ITsumegoProblemSearch["status"]) => updateSearch("status", val)}
                    search={search}
                    updateSearch={updateSearch}
                />
                <TableContainer sx={{ maxHeight: "60vh" }}>
                    <Table aria-labelledby="problemsTable" size={"medium"} stickyHeader>
                        <TsumegoListTableHead
                            order={search.order}
                            orderBy={search.orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        {renderTableBody()}
                    </Table>
                </TableContainer>
                {problems?.data.length === 0 && <ListNotFound message="Aucun utilisateur trouvé." />}
            </Paper>
            <Pagination
                color="primary"
                count={problems?.total ? Math.ceil(problems.total / perPage) : 0}
                page={Number(page)}
                siblingCount={5}
                onChange={handleChangePage}
            />
            {tsumegoToDelete && (
                <Confirmation
                    open={Boolean(tsumegoToDelete)}
                    title="Voulez-vous vraiment supprimer ce problème ?"
                    onConfirmation={() => deleteTsumegoMutation.mutate(tsumegoToDelete.id)}
                    onCancelation={() => setTsumegoToDelete(null)}
                />
            )}
            {tsumegoToModerate && (
                <TsumegoModal
                    open={Boolean(tsumegoToModerate)}
                    title={tsumegoToModerate.label}
                    problem={tsumegoToModerate}
                    onChangeStatus={onUpdateTsumegoStatus}
                    onCancelation={() => setTsumegoToModerate(null)}
                />
            )}
        </Box>
    );
};

export default TsumegoListView;
