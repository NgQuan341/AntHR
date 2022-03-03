import React, { useEffect } from "react";
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { Tabs, Tab, Badge, Container, Toolbar, Typography, IconButton, Box, Avatar } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from '@mui/icons-material/MoreVert';
import useWindowDimensions from "../../config/windowDimensions";
import AccountMenu from "./AccountMenu";
import MobileAccountMenu from "./MobileAccountMenu";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open', })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const NavBar = (props) => {
    const { handleDrawerOpen, tabs } = props;
    // const { handleDrawerClose } = props;
    const [tab, setTab] = React.useState('page1');
    const [tabMenu, setTabMenu] = React.useState('one');
    const [menu, setMenu] = React.useState(false)
    const { width } = useWindowDimensions();
   
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const menuId = 'primary-search-account-menu';
    const mobileMenuId = 'primary-search-account-menu-mobile';

    const handleChangeTab = (event, newPath) => {
        setTab(newPath);
    };
    const handleChangeMenu = (e, newPath) => {
        setTabMenu(newPath)
    }
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const displayMenu = () => {
        setMenu(true)
    }
    const undisplayMenu = () => {
        setMenu(false)
    }
    useEffect(()=>{
        if (width < 900) {
           setAnchorEl(null);
        }
        else if (width > 900){
            setMobileMoreAnchorEl(null);
        }
    })
    return (
        <>
            <AppBar position="fixed" open={props.open} color='secondary'>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{ mr: 2, ...(props.open && { display: 'none' }) }}>
                                <MenuIcon />
                            </IconButton>
                        </Box>

                        <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
                            LOGO
                        </Typography>


                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            LOGO
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Tabs value={tab} onChange={handleChangeTab} textColor='primary' indicatorColor='primary' TabIndicatorProps={{ style: { backgroundColor: 'transparent' } }}>
                                {
                                    tabs.map((tab) => (
                                        <Tab key={tab} value={tab} label={tab} to={`/${tab}`} component={Link}
                                            sx={{ color: 'white', fontWeight: '600', display: 'block' }}
                                            onMouseDown={displayMenu} onMouseOver={displayMenu}
                                        ></Tab>
                                    ))
                                }
                            </Tabs>
                        </Box>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <Badge badgeContent={1} color="error">
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                size="large"
                                aria-label="show 17 new notifications"
                                color="inherit"
                            >
                                <Badge badgeContent={1} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                {/* <AccountCircle /> */}
                                <Avatar src='http://localhost:3000/bg7.jpg' sx={{ width: 24, height: 24 }} variant='circular'></Avatar>
                            </IconButton>
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>

                </Container>
                <Toolbar disableGutters sx={{ display: `${menu ? '' : 'none'}`, backgroundColor: 'white' }} onMouseOver={displayMenu}>
                    <Box justifyContent='space-around' sx={{ width: 1, display: 'flex' }}>
                        <Tabs value={tabMenu} onChange={handleChangeMenu}>
                            <Tab label="one" value='one'></Tab>
                            <Tab label="two" value='two'></Tab>
                            <Tab label="three" value='three'></Tab>
                        </Tabs>
                    </Box>

                </Toolbar>
            </AppBar>
            <AccountMenu
                menuId={menuId}
                isMenuOpen={isMenuOpen}
                handleMenuClose={handleMenuClose}
                anchorEl={anchorEl} />
            <MobileAccountMenu
                mobileMenuId={mobileMenuId}
                isMobileMenuOpen={isMobileMenuOpen}
                handleMobileMenuClose={handleMobileMenuClose}
                mobileMoreAnchorEl={mobileMoreAnchorEl} />
        </>
    )
}
export default NavBar;