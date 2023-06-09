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
import Fade from '@mui/material/Fade';
import Divider from '@mui/material/Divider';
import ThemeSwitch from './ThemeSwitch';

// Apollo imports
import { useQuery } from '@apollo/client';

// Internal imports
import Auth from '../utils/auth';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { QUERY_ME } from '../utils/queries';
import { red } from '@mui/material/colors';

function AppNavbar( {modeState} ) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  // Modal state
  const [openModal, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  // Login and signup form state
  const [form, setForm] = useState('login');
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);

  // Set which form to display in modal
  const handleChange = (event, newForm) => {
    setForm(newForm);
    if (newForm === 'signup') {
      setShowSignup(true);
      setShowLogin(false);
    } else if (newForm === 'login') {
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
    handleModalOpen();
  };

  // Close setting menu and logout
  const handleUserCloseLogout = () => {
    handleCloseUserMenu();
    Auth.logout();
  };

  // Get user's full name
  const { data } = useQuery(QUERY_ME);
  let userData = data?.me;
  let fullName = '';
  if (userData) {
    fullName = userData.firstName + ' ' + userData.lastName;
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
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
              '&:hover': { color: 'inherit' },
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
              <MenuItem component={Link} to="/" key="Home" onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              {Auth.loggedIn() && (
                <MenuItem component={Link} to="/programs" key="My Programs" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">My Programs</Typography>
                </MenuItem>
              )}
              {!Auth.loggedIn() && (
                <MenuItem key="Login / Signup" onClick={handleNavCloseModalOpen}>
                  <Typography textAlign="center">Login / Signup</Typography>
                </MenuItem>
              )}
              {Auth.loggedIn() && (
                <Divider sx={{border: '2px solid white'}}/>
              )}
              {Auth.loggedIn() && (
                <MenuItem component={Link} to="/add-program" key="Add Program" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Add Program</Typography>
                </MenuItem>
              )}
              {Auth.loggedIn() && (
                <MenuItem component={Link} to="/add-phase" key="Add Phase" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Add Phase</Typography>
                </MenuItem>
              )}
              {Auth.loggedIn() && (
                <MenuItem component={Link} to="/add-workout" key="Add Workout" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Add Workout</Typography>
                </MenuItem>
              )}
              {Auth.loggedIn() && (
                <MenuItem component={Link} to="/add-exercise" key="Add Exercise" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Add Exercise</Typography>
                </MenuItem>
              )}
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
            <Button key="Home" href="/" sx={{ my: 2, mx: 1, color: 'white', display: 'block' }}>
              Home
            </Button>
            {Auth.loggedIn() && (
              <Button key="My Programs" href="/programs" sx={{ my: 2, mx: 1, color: 'white', display: 'block' }}>
                My Programs
              </Button>
            )}
            {!Auth.loggedIn() && (
              <Button
                key="Login / Signup"
                onClick={handleModalOpen}
                sx={{ my: 2, mx: 1, color: 'white', display: 'block' }}
              >
                Login / Signup
              </Button>
            )}
            {Auth.loggedIn() && (
              <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ my: 2, mx: 1, color: 'white', display: 'block' }}
              >
                Add Item
              </Button>
            )}
            {Auth.loggedIn() && (
              <Menu
                id="fade-menu"
                MenuListProps={{
                  'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={handleClose} component={Link} to="/add-program" key="Add Program">Program</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/add-phase" key="Add Phase">Phase</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/add-workout" key="Add Workout">Workout</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/add-exercise" key="Add Exercise">Exercise</MenuItem>
              </Menu>
            )}
          </Box>

          {Auth.loggedIn() && (
            <Box sx={{ flexGrow: 0, ml: 2 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={fullName} src="/static/images/avatar/placeholder.jpg" />
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
              <MenuItem key='logout' onClick={handleUserCloseLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
              <MenuItem>
                <ThemeSwitch modeState={modeState}/>
              </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <ToggleButtonGroup
            color="primary"
            value={form}
            exclusive
            onChange={handleChange}
            aria-label="Form Type"
            sx={{ mb: 2 }}
          >
            <ToggleButton value="login">Login</ToggleButton>
            <ToggleButton value="signup">Signup</ToggleButton>
          </ToggleButtonGroup>
          <CloseIcon
            onClick={handleModalClose}
            sx={{ float: 'right', position: 'relative', top: 12, '&:hover': { cursor: 'pointer' } }}
          ></CloseIcon>
          {showLogin && <LoginForm></LoginForm>}
          {showSignup && <SignupForm></SignupForm>}
        </Box>
      </Modal>
    </AppBar>
  );
}
export default AppNavbar;
