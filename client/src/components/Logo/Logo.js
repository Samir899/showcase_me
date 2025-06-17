import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../../assets/tv-logo-no-bg.png'; // Adjust the path as needed
const Logo = () => {
    return (_jsx(Box, { component: RouterLink, to: "/", sx: {
            display: 'flex',
            justifyContent: 'center', // Center horizontally
            alignItems: 'center', // Center vertically if needed
            width: '100%',
            textDecoration: 'none',
        }, children: _jsx("img", { src: logo, alt: "Tech Verge Logo", style: { height: 250, width: 'auto' } }) }));
};
export default Logo;
