import Box from "@mui/material/Box";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Chip, IconButton, Tooltip, alpha, styled } from "@mui/material";
import { Check, Eye, Trash, X } from "@phosphor-icons/react";
import { IProblem } from "../../types/go.types";

import TableSkeleton from "./TableSkeletons";

interface ITsumegoListBody{
    problems: IProblem[], 
    isFetching: boolean,
    setTsumegoToModerate: (user: IProblem) => void,
    setTsumegoToDelete: (user: IProblem) => void
}

const TsumegoListBody = ({problems, isFetching, setTsumegoToModerate, setTsumegoToDelete}: ITsumegoListBody) => {
    if (isFetching) {
        return <TableSkeleton rows={10} cells={5}/>
    }else if (problems) {
        return (
            <TableBody>
                {problems?.map((problem: IProblem, index: number) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                        <StyledTableRow
                            role="checkbox"
                            tabIndex={-1}
                            key={problem.id}
                        >
                            <TableCell
                                component="th"
                                id={labelId}
                                scope="problem"
                            >
                                {problem.label}
                            </TableCell>
                            <TableCell align="left">{problem.author}</TableCell>
                            <TableCell align="left">{problem.level}</TableCell>
                            <TableCell align="left"><Chip  color={problem.active ? "success" : "warning"} icon={problem.active ? <Check size={16} /> : <X size={16} />} label={problem.active ? "Visible" : "Inactif"} /></TableCell>
                            <TableCell align="left">
                                <Box>
                                    <Tooltip title="Voir" onClick={()=> setTsumegoToModerate(problem)}>
                                        <IconButton aria-label="action" size="small">
                                            <Eye fontSize="inherit" weight="duotone" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Supprimer">
                                        <IconButton 
                                            aria-label="action" 
                                            size="small"
                                            onClick={() => setTsumegoToDelete(problem)}
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
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
    "&:hover": {
        backgroundColor: theme.palette.mode === "dark" ? alpha(theme.palette.primary.main, 0.35) : alpha(theme.palette.primary.main, 0.75),
    },
}));

export default TsumegoListBody;