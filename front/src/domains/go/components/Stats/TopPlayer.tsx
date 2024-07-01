import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, ListItemAvatar, Paper, Tooltip, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { truncateString } from '@src/services/utils.service';
import Score from './Score';
import { ITopPlayer } from '@src/types/stats.type';

const TopPlayer = ({topPlayers} : {topPlayers: ITopPlayer[]}) => {

    return (
        <Paper sx={{py: 2}}>
            <Stack
                gap={2}
            >
                <Typography variant="h5">Meilleurs joueurs</Typography>
                <List sx={{ width: '100%', bgcolor: 'background.paper', px: 2 }}>
                {topPlayers.map((value, i) => (
                    <ListItem
                        key={i}
                        disableGutters
                        secondaryAction={
                            <Score score={value.score} fontSize={14} />
                        }
                    >
                        <ListItemAvatar sx={{minWidth: '40px'}}>
                            <Avatar sx={{ width: 32, height: 32 }}>{value.username[0]}</Avatar>
                        </ListItemAvatar>
                        {value.username.length > 15 ? (
                            <Tooltip title={value.username}>
                            <ListItemText
                                primary={truncateString(value.username, 15)}
                            />
                            </Tooltip>
                        ) : (
                            <ListItemText primary={value.username}  />
                        )}
                    </ListItem>
                ))}
                </List>
            </Stack>
        </Paper>
    );
}

export default TopPlayer