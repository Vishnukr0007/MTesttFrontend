import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  
  InputBase,
  Menu,
  MenuItem,
  Container,
  Button,
  Box,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from '@mui/icons-material';
import logo from '../logo/images.png'; // Assuming the logo is in the 'logo' folder

function Navbars() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuType, setMenuType] = useState(null);
  const [showNav, setShowNav] = useState(false);

  const handleMenuOpen = (event, type) => {
    setAnchorEl(event.currentTarget);
    setMenuType(type);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuType(null);
  };

  return (
    <AppBar position="sticky" color="white" elevation={3}>
      <Container>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Left Side: Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={logo}
              alt="Company Logo"
              style={{ height: 40, marginRight: 10 }}
            />
           
          </Box>

          {/* Search Bar */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexGrow: 1,
              justifyContent: 'center', // Center align
            }}
          >
            <InputBase
              sx={{
                ml: 1,
                flex: 0.6, // Adjust width
                color: 'inherit',
                border: '1px solid #ddd',
                borderRadius: 2,
                padding: '6px 12px',
              }}
              placeholder="Search"
              startAdornment={<SearchIcon sx={{ color: 'gray', marginRight: 1 }} />}
            />
          </Box>

          {/* Right Side: Navigation Options */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            {['Dashboard', 'Staff', 'Employee'].map((option) => (
              <Button
                key={option}
                aria-controls={`${option.toLowerCase()}-menu`}
                aria-haspopup="true"
                onClick={(event) => handleMenuOpen(event, option)}
                color="inherit"
                endIcon={<ArrowDropDownIcon />}
                sx={{
                  textTransform: 'none',
                  fontWeight: 'bold',
                  padding: '6px 16px',
                }}
              >
                {option}
              </Button>
            ))}

            {/* Dropdown Menu */}
            <Menu
              id={`${menuType?.toLowerCase()}-menu`}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Option 1</MenuItem>
              <MenuItem onClick={handleMenuClose}>Option 2</MenuItem>
            </Menu>
          </Box>

          {/* Mobile Menu Toggle */}
          <IconButton
            color="inherit"
            onClick={() => setShowNav(!showNav)}
            edge="end"
            aria-label="menu"
            sx={{ display: { xs: 'flex', sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbars;
