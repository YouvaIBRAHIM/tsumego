import { Grid, List, ListItem, ListItemButton, ListItemText, Paper } from "@mui/material"
import Search from "@src/components/Search"
import SelectFilter from "@src/components/SelectFilter"

export interface IAsideListData{
    id: string
    label: string
    value: unknown
}

interface IAsideList{
    data: IAsideListData[]
}

const AsideList = ({data}: IAsideList) => {

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
                        <Grid xs>
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
                {
                    data.map(el => (
                        <ListItem key={el.id} disablePadding>
                            <ListItemButton >
                                <ListItemText primary={el.label} />
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
        </Paper>
    )
}



export default AsideList
