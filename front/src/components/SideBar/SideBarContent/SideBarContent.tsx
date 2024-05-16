import { Box, Divider, List } from '@mui/material'
import { ISideBarContent } from '@components/SideBar/SideBarContent/ISideBarContent'
import SideBarListItem from '@components/SideBar/SideBarListItem/SideBarListItem'
import Switch from '@components/Switch'
import { useColorMode } from '@src/reducers/theme.reducer'

const DrawerContent = ({
    sideBarHeader,
    sideBarList,
}: ISideBarContent): JSX.Element => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <>
            {sideBarHeader && (
                <>
                    <SideBarListItem
                        sideBarListElement={sideBarHeader}
                        key={sideBarHeader.id}

                    />
                    <Divider />
                </>
            )}
            {sideBarList && (
                <List>
                    {sideBarList.map((sideBarListElement) => (
                        <SideBarListItem
                            sideBarListElement={sideBarListElement}
                            key={sideBarListElement.id}
                        />
                    ))}
                </List>
            )}
            <Box 
                sx={{
                    marginTop: 'auto'
                }}
            >
                <Divider />

                <Switch
                    label={`Mode ${colorMode === 'dark' ? 'sombre' : 'clair'}`}
                    checked={colorMode === 'dark' ? true : false}
                    action={toggleColorMode}
                    background={{
                        backgroundImage: {
                            checked: '/light-icon.svg',
                            notChecked: '/dark-icon.svg',
                        },
                    }}
                />
            </Box>
        </>
    )
}
export default DrawerContent
