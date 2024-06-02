import { Box, CSSObject, Theme, styled, useMediaQuery } from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'
import { breakpoints, sideBarConst } from '@services/constants.service'
import OpenButtonSideBar from '@components/SideBar/OpenButtonSideBar'
import DrawerContent from '@components/SideBar/SideBarContent/SideBarContent'
import { HouseSimple, Kanban, Plus, PuzzlePiece } from '@phosphor-icons/react'
import { useSideBar } from '@src/reducers/sidebar.reducer'

const sideBarList = [
    {
        id: 'home',
        label: "Accueil",
        icon: <HouseSimple size={24} />,
        link: '/'
    },
    {
        id: 'problems',
        label: 'Problèmes',
        icon: <PuzzlePiece size={24} />,
        link: '/problems'
    },
    {
        id: 'admin',
        label: 'Administration',
        icon: <Kanban size={24} />,
        link: '/admin'
    },
]

const sideBarHeader = {
    id: 'new_party',
    label: 'Nouvelle partie',
    icon: <Plus size={24} />,
    action: () => console.log('new_party')
}

const SideBar = () => {
    const { isOpen, toggleOpenSideBar } = useSideBar()
    const matches = useMediaQuery(`(min-width:${breakpoints.md}px)`)

    return (
        <>
            <Drawer
                variant={matches ? 'permanent' : 'temporary'}
                anchor="left"
                open={isOpen}
                onClose={toggleOpenSideBar}
                PaperProps={{
                    sx: (theme) => ({
                        width: isOpen
                            ? sideBarConst.openedWidth + 'px'
                            : sideBarConst.closedWidth + 'px',
                        [theme.breakpoints.down('md')]: {
                            width: isOpen
                                ? sideBarConst.openedWidth + 'px'
                                : sideBarConst.mobileClosedWidth + 'px',
                            borderRight: !isOpen && 'none',
                        },
                    }),
                }}
            >
                <DrawerContent
                    sideBarList={sideBarList}
                    sideBarHeader={sideBarHeader}
                />
            </Drawer>
            <OpenButtonSideBarContainer open={isOpen}>
                <OpenButtonSideBar />
            </OpenButtonSideBarContainer>
        </>
    )
}

const openedMixin = (theme: Theme): CSSObject => ({
    width: sideBarConst.openedWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
})

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
    width: sideBarConst.openedWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}))


const OpenButtonSideBarContainer = styled(Box)<{open: boolean}>(({ theme, open }) => ({
    width: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
    transition: `left ${sideBarConst.transitionDuration}ms ease`,    
    left: open
        ? sideBarConst.openedWidth + 'px'
        : sideBarConst.closedWidth + 'px',
    [theme.breakpoints.down('md')]: {
        left: "0px"
    },
}))


export default SideBar
