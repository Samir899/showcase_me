import React, {useEffect, useState} from 'react';
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
  Menu,
  MenuItem, ListItemButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {Link as RouterLink, useLocation, useNavigate} from 'react-router-dom';
import type { LinkProps as RouterLinkProps } from 'react-router-dom';
import styles from './NavBar.module.css';
import {isUserLoggedIn} from "../../util/localStorage";
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
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
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
        {
          isUserLoggedIn() ? (
              <ListItemButton onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItemButton>
          ) : (
              <ListItem component={LinkBehavior} to="/login">
                <ListItemText primary="Login" />
              </ListItem>
          )
        }
      </List>
    </div>
  );
  const location = useLocation();
  useEffect(() => {
  }, [location.pathname]);
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
            {isUserLoggedIn() ? (
                <>
                  <Button
                      color="inherit"
                      onClick={handleMenuOpen}
                      className={styles.userButton}
                  >
                    {localStorage.getItem('userName') || 'User'}
                  </Button>
                  <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
            ) : (
                <Button
                    variant="outlined"
                    color="inherit"
                    component={LinkBehavior}
                    to="/login"
                    className={styles.loginButton}
                >
                  Login
                </Button>
            )}
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