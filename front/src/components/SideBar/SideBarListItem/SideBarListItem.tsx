import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material'

import { ISideBarListItem } from '@components/SideBar/SideBarListItem/ISideBarListItem'
import ArrowTooltips from '@components/ArrowTooltips'
import { truncateString } from '@services/utils.service'
import { sideBarConst } from '@services/constants.service'
import { useSideBar } from '@src/reducers/sidebar.reducer'
import { useNavigate } from 'react-router-dom'

const SideBarListItem = ({
    sideBarListElement,
}: {
    sideBarListElement: ISideBarListItem
}) => {
    const { isOpen } = useSideBar()
    const navigate = useNavigate();

    const onHandleClick = () => {
        if (sideBarListElement?.link) {
            navigate(sideBarListElement.link)
        }else if (sideBarListElement?.action) {
            sideBarListElement.action()
        }
    }
    return (
        <ArrowTooltips
            title={sideBarListElement.label}
            labelMaxLength={sideBarConst.labelMaxLength}
            disableHoverListener={isOpen}
        >
            <ListItem
                key={sideBarListElement.id}
                disablePadding
                sx={{ display: 'block' }}
                onClick={onHandleClick}
            >
                <ListItemButton
                    sx={{
                        justifyContent: isOpen ? 'initial' : 'center',
                    }}
                >
                    
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: isOpen ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                    >
                        {sideBarListElement.icon}
                    </ListItemIcon>
                    <ListItemText
                        primary={truncateString(
                            sideBarListElement.label,
                            sideBarConst.labelMaxLength,
                        )}
                        sx={{ opacity: isOpen ? 1 : 0 }}
                    />
                </ListItemButton>
            </ListItem>
        </ArrowTooltips>
    )
}


export default SideBarListItem
