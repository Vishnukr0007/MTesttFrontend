import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Menu, MenuItem, Container, Button, Box } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon, ArrowDropDown as ArrowDropDownIcon } from '@mui/icons-material';
import logo from '../logo/images.png'; // Assuming the logo is in the 'assets' folder

function Navbars() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showNav, setShowNav] = useState(false);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar position="sticky" color="white" elevation={3}>
      <Container>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Left Side: Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Company Logo" style={{ height: 40, marginRight: 10 }} />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              
            </Typography>
          </Box>

          {/* Search Bar */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <InputBase
              sx={{
                ml: 1,
                flex: 1,
                color: 'inherit',
                border: '1px solid #ddd',
                borderRadius: 2,
                padding: '6px 12px',
              }}
              placeholder="Search"
              startAdornment={<SearchIcon sx={{ color: 'gray' }} />}
            />
          </Box>

          {/* Right-Side Options */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Developer Dropdown */}
            <Button
              aria-controls="developer-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
              endIcon={<ArrowDropDownIcon />}
              sx={{ textTransform: 'none', fontWeight: 'bold', padding: '6px 16px' }}
            >
              Developer
            </Button>
            <Menu
              id="developer-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Option 1</MenuItem>
              <MenuItem onClick={handleMenuClose}>Option 2</MenuItem>
            </Menu>

            {/* Employee Dropdown */}
            <Button
              aria-controls="employee-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
              endIcon={<ArrowDropDownIcon />}
              sx={{ textTransform: 'none', fontWeight: 'bold', padding: '6px 16px' }}
            >
              Employee
            </Button>
            <Menu
              id="employee-menu"
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
