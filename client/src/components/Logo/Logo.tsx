import React from 'react';
import { Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../../assets/tv-logo-no-bg.png'; // Adjust the path as needed

const Logo: React.FC = () => {
    return (
        <Box
            component={RouterLink}
            to="/"
            sx={{
                display: 'flex',
                justifyContent: 'center', // Center horizontally
                alignItems: 'center', // Center vertically if needed
                width: '100%',
                textDecoration: 'none',
            }}
        >
            <img
                src={logo}
                alt="Tech Verge Logo"
                style={{ height: 250, width: 'auto' }} // Adjust size as necessary
            />
        </Box>
    );
};

export default Logo;
