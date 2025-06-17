import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Button, useTheme, useMediaQuery, Menu, MenuItem, ListItemButton, } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import styles from './NavBar.module.css';
import { isUserLoggedIn } from "../../util/localStorage";
const LinkBehavior = React.forwardRef((props, ref) => (_jsx(RouterLink, { ref: ref, ...props })));
const pages = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
];
const NavBar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        localStorage.clear();
        handleMenuClose();
        navigate('/login');
    };
    const drawer = (_jsx("div", { className: styles.drawerContent, children: _jsxs(List, { children: [pages.map((page) => (_jsx(ListItem, { component: LinkBehavior, to: page.path, children: _jsx(ListItemText, { primary: page.label }) }, page.path))), isUserLoggedIn() ? (_jsx(ListItemButton, { onClick: handleLogout, children: _jsx(ListItemText, { primary: "Logout" }) })) : (_jsx(ListItem, { component: LinkBehavior, to: "/login", children: _jsx(ListItemText, { primary: "Login" }) }))] }) }));
    const location = useLocation();
    useEffect(() => {
    }, [location.pathname]);
    return (_jsx(AppBar, { position: "sticky", className: styles.navbar, children: _jsxs(Toolbar, { className: styles.toolbar, children: [_jsx(Typography, { variant: "h6", component: LinkBehavior, to: "/", className: styles.brand, children: "Tech Verge | Showcase Me" }), !isMobile && (_jsxs("div", { className: styles.navLinks, children: [pages.map((page) => (_jsx(Button, { color: "inherit", component: LinkBehavior, to: page.path, children: page.label }, page.path))), isUserLoggedIn() ? (_jsxs(_Fragment, { children: [_jsx(Button, { color: "inherit", onClick: handleMenuOpen, className: styles.userButton, children: localStorage.getItem('userName') || 'User' }), _jsxs(Menu, { anchorEl: anchorEl, open: Boolean(anchorEl), onClose: handleMenuClose, children: [_jsx(MenuItem, { onClick: handleMenuClose, children: "Profile" }), _jsx(MenuItem, { onClick: handleMenuClose, children: "Settings" }), _jsx(MenuItem, { onClick: handleLogout, children: "Logout" })] })] })) : (_jsx(Button, { variant: "outlined", color: "inherit", component: LinkBehavior, to: "/login", className: styles.loginButton, children: "Login" }))] })), isMobile && (_jsxs(_Fragment, { children: [_jsx(IconButton, { color: "inherit", edge: "end", onClick: () => setDrawerOpen(true), children: _jsx(MenuIcon, {}) }), _jsx(Drawer, { anchor: "right", open: drawerOpen, onClose: () => setDrawerOpen(false), children: drawer })] }))] }) }));
};
export default NavBar;
