// React imports
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Material UI imports
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CloseIcon from '@mui/icons-material/Close';

// Internal imports
import Auth from '../utils/auth';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

// Define items for nav and settings menu
const pages = ['Home', 'Login / Signup'];
const settings = ['Account', 'Logout'];

function AppNavbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  // Modal state
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Login and signup form state
  const [form, setForm] = useState('login');
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);

  // Set which form to display in modal
  const handleChange = (event, newForm) => {
    setForm(newForm);
    if (newForm == 'signup') {
      setShowSignup(true);
      setShowLogin(false);
    } else if (newForm == 'login') {
      setShowLogin(true);
      setShowSignup(false);
    }
  };

  // Handle nav menu open/close
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Handle user menu open/close
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Close nav menu and open modal
  const handleNavCloseModalOpen = () => {
    handleCloseNavMenu();
    handleOpen();
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <FitnessCenterIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {color:'inherit'}
            }}
          >
            Fitness Focus
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                // TODO: Make modal open only on when login/signup button is clicked
                <MenuItem key={page} onClick={handleNavCloseModalOpen}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <FitnessCenterIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 2 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Fitness Focus
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} justifyContent="flex-end">
            {pages.map((page) => (
              // TODO: Make modal open only on when login/signup button is clicked
              <Button
                key={page}
                onClick={handleOpen}
                sx={{ my: 2, mx: 1, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
                    
            {Auth.loggedIn() && <Box sx={{ flexGrow: 0, ml: 2 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/* TODO: Adjust alt tag based on signed in user  */}
                  <Avatar alt="Some User" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>}
        </Toolbar>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={
          {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }
        }>
          <ToggleButtonGroup
            color="primary"
            value={form}
            exclusive
            onChange={handleChange}
            aria-label="Form Type"
            sx={{ mb:2 }}
          >
            <ToggleButton value="login">Login</ToggleButton>
            <ToggleButton value="signup">Signup</ToggleButton>
          </ToggleButtonGroup>
          <CloseIcon 
            onClick={handleClose} 
            sx={{float:'right', position:'relative', top:12, '&:hover': {cursor:'pointer'}}}  
          >

          </CloseIcon>
          {showLogin && <LoginForm></LoginForm>}
          {showSignup && <SignupForm></SignupForm>}
        </Box>
      </Modal>
    </AppBar>
  );
}
export default AppNavbar;