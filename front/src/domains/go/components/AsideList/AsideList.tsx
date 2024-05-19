import { Grid, List, Paper } from "@mui/material"
import Search from "../Search"
import SelectFilter from "../SelectFilter"

export interface IAsideListData{
    id: string
    label: string
    value: unknown
}

export interface IAsideList{
    list: JSX.Element
}

const AsideList = ({ list }: IAsideList) => {
    
    return (
        <Paper sx={{
            minHeight: "50vh",
            padding: 2
        }}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Grid container>
                        <Grid item xs>
                            <Search />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Grid container>
                        <Grid>
                            <SelectFilter />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <List sx={{
                overflow: "auto",
                maxHeight: {
                    xs: "70vh",
                    sm: "80vh",
                },
                marginTop: 2
            }}>
                {list}
            </List>
        </Paper>
    )
}



export default AsideList
