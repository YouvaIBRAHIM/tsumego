import { useCallback } from "react"

import { Pagination } from "@mui/material"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableContainer from "@mui/material/TableContainer"

import { useTsumegoList } from "../../services/hooks/tsumego.hook"
import { getComparator, stableSort } from "../../services/utils.service"
import { ITsumegoProblemSearch } from "../../types/go.types"
import ConfirmationModal from "../ConfirmationModal"
import ListNotFound from "../TableListNotFound"
import ErrorView from "../Views/ErrorView"
import TableToolbar from "./TableToolbar"
import TsumegoListBody from "./TsumegoListItem"
import TsumegoListTableHead from "./TsumegoListTableHead"
import TsumegoModal from "./TsumegoModal"

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
    refetch,
    isError,
    error,
    deleteTsumegoMutation,
    handleRequestSort,
    handleChangePage,
    updateSearch,
    onUpdateTsumegoStatus,
  } = useTsumegoList()

  const renderTableBody = useCallback(() => {
    const visibleRows = problems?.data
      ? stableSort(problems.data, getComparator(search.order, search.orderBy))
      : []
    return (
      <TsumegoListBody
        problems={visibleRows}
        setTsumegoToDelete={setTsumegoToDelete}
        setTsumegoToModerate={setTsumegoToModerate}
      />
    )
  }, [
    problems,
    search.order,
    search.orderBy,
    setTsumegoToDelete,
    setTsumegoToModerate,
  ])

  if (isError) {
    return (
      <ErrorView
        message={error?.message ?? "Une erreur est survenue"}
        refetch={refetch}
      />
    )
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableToolbar
          perPage={perPage}
          setPerPage={(value: number) => setPerPage(value)}
          level={search.level as string}
          setLevel={(val: ITsumegoProblemSearch["level"]) =>
            updateSearch("level", val)
          }
          status={search.status}
          setStatus={(val: ITsumegoProblemSearch["status"]) =>
            updateSearch("status", val)
          }
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
        {(!problems?.data || problems?.data.length === 0) && (
          <ListNotFound message="Aucun Tsumego trouvé." />
        )}
      </Paper>
      {problems && problems.total > perPage && (
        <Pagination
          color="primary"
          count={Math.ceil(problems.total / perPage)}
          page={page}
          siblingCount={2}
          boundaryCount={1}
          onChange={handleChangePage}
        />
      )}
      {tsumegoToDelete && (
        <ConfirmationModal
          open={Boolean(tsumegoToDelete)}
          title="Voulez-vous vraiment supprimer ce problème ?"
          message={`${tsumegoToDelete.label} (${tsumegoToDelete.author})`}
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
  )
}

export default TsumegoListView
