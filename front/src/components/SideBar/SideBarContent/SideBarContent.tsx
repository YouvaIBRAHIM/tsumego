import { Box, Divider, List, styled } from '@mui/material'
import { ISideBarContent } from '@components/SideBar/SideBarContent/ISideBarContent'
import SideBarListItem from '@components/SideBar/SideBarListItem/SideBarListItem'
import Switch from '@components/Switch'
import { useColorMode } from '@src/reducers/theme.reducer'


const DrawerFooter = styled(Box)({
    marginTop: 'auto',
})

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
            <DrawerFooter>
                <Divider />

                <Switch
                    label={`Mode ${colorMode === 'dark' ? 'sombre' : 'clair'}`}
                    checked
                    action={toggleColorMode}
                    background={{
                        backgroundImage: {
                            checked: '/light-icon.svg',
                            notChecked: '/dark-icon.svg',
                        },
                    }}
                />
            </DrawerFooter>
        </>
    )
}
export default DrawerContent
