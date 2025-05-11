import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import type { LinkProps as RouterLinkProps } from 'react-router-dom';
import styles from './NavBar.module.css';

const LinkBehavior = React.forwardRef<HTMLAnchorElement, RouterLinkProps>((props, ref) => (
  <RouterLink ref={ref} {...props} />
));

const pages = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const NavBar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const drawer = (
    <div className={styles.drawerContent}>
      <List>
        {pages.map((page) => (
          <ListItem
            key={page.path}
            component={LinkBehavior}
            to={page.path}
          >
            <ListItemText primary={page.label} />
          </ListItem>
        ))}
        <ListItem component={LinkBehavior} to="/login">
          <ListItemText primary="Login" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <AppBar position="sticky" className={styles.navbar}>
      <Toolbar className={styles.toolbar}>
        <Typography
          variant="h6"
          component={LinkBehavior}
          to="/"
          className={styles.brand}
        >
          Tech Verge | Showcase Me
        </Typography>

        {!isMobile && (
          <div className={styles.navLinks}>
            {pages.map((page) => (
              <Button
                key={page.path}
                color="inherit"
                component={LinkBehavior}
                to={page.path}
              >
                {page.label}
              </Button>
            ))}
            <Button
              variant="outlined"
              color="inherit"
              component={LinkBehavior}
              to="/login"
              className={styles.loginButton}
            >
              Login
            </Button>
          </div>
        )}

        {isMobile && (
          <>
            <IconButton
              color="inherit"
              edge="end"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              {drawer}
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
