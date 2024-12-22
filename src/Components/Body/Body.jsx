import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  Button,
  Modal,
  Box,
  TextField,
  IconButton,
  Divider,
  
} from '@mui/material';
import { Avatar } from '@mui/material';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
function Body() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null); // Employee being edited
  const [newEmployee, setNewEmployee] = useState({
    firstName: '',
    lastName: '',
    department: '',
    designation: '',
    dateOfJoining: '',
    salary: '',
    email: '',
    profilePic: null,
  });

  const [employees, setEmployees] = useState([]); // Assuming an initial list of employees

  // Fetch employees when the component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, []);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    if (!modalOpen) {
      setEditEmployee(null); // Reset when opening modal for new employee
    }
  };

  const handleInputChange = (e, mode) => {
    const { name, value } = e.target;
    if (mode === 'edit') {
      setEditEmployee((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setNewEmployee((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e, mode) => {
    const file = e.target.files[0];
    if (mode === 'edit') {
      setEditEmployee((prev) => ({
        ...prev,
        profilePic: file,
      }));
    } else {
      setNewEmployee((prev) => ({
        ...prev,
        profilePic: file,
      }));
    }
  };

  const resetNewEmployeeForm = () => {
    setNewEmployee({
      firstName: '',
      lastName: '',
      department: '',
      designation: '',
      dateOfJoining: '',
      salary: '',
      email: '',
      profilePic: null,
    });
  };

  const addEmployee = async () => {
    const formData = new FormData();
    for (const key in newEmployee) {
      if (key === 'profilePic' && newEmployee[key]) {
        formData.append(key, newEmployee[key]); // Append the file
      } else {
        formData.append(key, newEmployee[key]);
      }
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/employees', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setEmployees([...employees, response.data]); // Update employees list
      toggleModal();
      resetNewEmployeeForm();
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleEditClick = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/employees/${id}`);
      setEditEmployee(response.data);  // Populate the editEmployee state with the fetched data
      toggleModal();  // Open the modal for editing
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
  };
  

  const updateEmployee = async () => {
    const formData = new FormData();
    
    // Append each field from the editEmployee object to the FormData
    for (const key in editEmployee) {
      if (key === 'profilePic' && editEmployee[key]) {
        formData.append(key, editEmployee[key]);
      } else {
        formData.append(key, editEmployee[key]);
      }
    }
  
    try {
      // Send the PUT request to update the employee
      const response = await axios.put(
        `http://localhost:5000/api/employees/${editEmployee._id}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
  
      // Update the employee list with the updated employee data
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp._id === response.data._id ? response.data : emp
        )
      );
  
      toggleModal(); // Close the modal after update
      setEditEmployee(null); // Reset the editEmployee state
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Failed to update employee');
    }
  };
  

  
  
  const deleteEmployee = async (id) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
      if (!confirmDelete) return;
  
      // Send DELETE request to the server
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
  
      // Update the employees list by removing the deleted employee
      setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp._id !== id));
      alert('Employee deleted successfully!');
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Failed to delete employee. Please try again.');
    }
  };
  
  
    const generateRandomRgbColor = () => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgb(${r}, ${g}, ${b})`;
    };

   


  
  
  
  return (
    <div style={{ background: 'whitesmoke', minHeight: '100vh' }}>
     <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '' }}>
  <Button
    variant="contained"
    style={{
      backgroundColor: 'white',
      color: 'black',
      fontSize: '20px',
      borderRadius: '50%', // Make the button circular
      width: '60px', // Ensure width and height are equal
      height: '60px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Optional: Add shadow for better aesthetics
    }}
    onClick={() => {
      resetNewEmployeeForm();
      setEditEmployee(null);
      toggleModal();
    }}
  >
    <AddIcon style={{ fontSize: '24px', color: 'black' }} />
  </Button>
</div>


      <Typography
        variant="h4"
        align="center"
        gutterBottom
        style={{ color: '#333', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
      >
        Employees
      </Typography>

      
  <Grid container spacing={3} padding={'20px'}>
    {employees.map((employee) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={employee._id}>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 2,
            borderRadius: 3,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'box-shadow 0.3s, transform 0.3s',
            '&:hover': {
              boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15)',
              transform: 'translateY(-5px)',
            },
          }}
        >
          <CardMedia
  component="img"
  image={employee.profilePic || undefined}
  alt={`${employee.firstName} ${employee.lastName}`}
  sx={{
    width: 100,
    height: 100,
    borderRadius: '50%',
    marginBottom: 2,
    border: '3px solid green',
    backgroundColor: !employee.profilePic ? '#1976d2' : 'transparent', // Avatar background color
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem', // Font size for initials
    color: 'white',
  }}
/>
{!employee.profilePic && (
  <Avatar
  sx={{
    width: 100,
    height: 100,
    backgroundColor: generateRandomRgbColor(), // Set dynamic RGB color
    color: 'white',
    fontSize: '1.5rem',
    position: 'absolute',
  }}
>
  {employee.firstName?.[0]}{employee.lastName?.[0]}
</Avatar>
)}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginBottom: 2 }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 500, textAlign: 'center' }}>
              {employee.firstName} {employee.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 400, textAlign: 'center' }}>
              {employee.email}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', width: '100%' }}>
          <Button
  variant="text"
  size="small"
  startIcon={<EditIcon sx={{ color: 'gray', fontSize: 20 }} />}
  sx={{ minWidth: 0, padding: 4, color: 'gray', '&:hover': { color: '#005bb5' } }}
  onClick={() => handleEditClick(employee._id)}
>
</Button>


            <Button
              variant="text"
              size="small"
              startIcon={<VisibilityIcon sx={{ color: 'gray', fontSize: 20 }} />}
              sx={{ minWidth: 0, padding: 4, color: 'gray', '&:hover': { color: '#005bb5' } }}
              
            />
            <Button
  variant="text"
  color="error"
  size="small"
  startIcon={<DeleteIcon sx={{ color: 'gray', fontSize: 20 }} />}
  sx={{ minWidth: 0, padding: 4, color: 'gray', '&:hover': { color: '#ff1744' } }}
  onClick={() => {
    deleteEmployee(employee._id); // Call deleteEmployee function with the employee's ID
  }}
/>

          </Box>

          <Divider sx={{ width: '100%', marginBottom: 2 }} />

          <Box sx={{ width: '100%', textAlign: 'center', marginTop: 2 }}>
            {/* Row 1: Department and Designation */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingX: 2, // Horizontal padding
                marginBottom: 1, // Space between rows
              }}
            >
              <Box sx={{ textAlign: 'left' }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontWeight: 'bold',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Slight shadow for glow effect
                  }}
                >
                  {employee.department}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 400 }}>
                  Department
                </Typography>
              </Box>

              <Box sx={{ textAlign: 'right' }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontWeight: 'bold',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Slight shadow for glow effect
                  }}
                >
                  {employee.designation}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 400 }}>
                  Designation
                </Typography>
              </Box>
            </Box>

            {/* Row 2: Date of Joining and Salary */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingX: 2, // Horizontal padding
              }}
            >
              <Box sx={{ textAlign: 'left' }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontWeight: 'bold',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Slight shadow for glow effect
                  }}
                >
                  {employee.dateOfJoining}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 400 }}>
                  Date of Joining
                </Typography>
              </Box>

              <Box sx={{ textAlign: 'right' }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontWeight: 'bold',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Slight shadow for glow effect
                  }}
                >
                  ${employee.salary}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 400 }}>
                  Salary
                </Typography>
              </Box>
            </Box>
          </Box>
        </Card>
      </Grid>
    ))}
  </Grid>


  <Modal
  open={modalOpen}
  onClose={toggleModal}
  aria-labelledby="add-edit-employee-modal"
  aria-describedby="form-to-add-edit-employee"
>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      bgcolor: 'white',
      padding: 4,
      borderRadius: 3,
      maxWidth: '500px',
      width: '90%',
      maxHeight: '90vh',
      overflowY: 'auto',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
    }}
  >
    {/* Close Button */}
    <IconButton
      onClick={toggleModal}
      sx={{
        position: 'absolute',
        top: 16,
        right: 16,
        color: '#555',
        '&:hover': { color: '#000' },
      }}
    >
      <CloseIcon />
    </IconButton>

    {/* Title */}
    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
      {editEmployee ? 'Edit Employee' : 'Add Employee'}
    </Typography>
    <Typography
      variant="body2"
      gutterBottom
      sx={{ marginBottom: 3, color: 'text.secondary', textAlign: 'center' }}
    >
      {editEmployee
        ? 'Update the details of the employee below.'
        : 'Fill out the form to add a new employee to the list.'}
    </Typography>

    <TextField
  label="First Name"
  variant="outlined"
  fullWidth
  name="firstName"
  value={editEmployee ? editEmployee.firstName : newEmployee.firstName}  // Populate with editEmployee data
  onChange={(e) => handleInputChange(e, editEmployee ? 'edit' : 'new')}
  sx={{ marginBottom: 2 }}
/>
<TextField
  label="Last Name"
  variant="outlined"
  fullWidth
  name="lastName"
  value={editEmployee ? editEmployee.lastName : newEmployee.lastName}
  onChange={(e) => handleInputChange(e, editEmployee ? 'edit' : 'new')}
  sx={{ marginBottom: 2 }}
/>
<TextField
  label="Email"
  variant="outlined"
  fullWidth
  name="email"
  value={editEmployee ? editEmployee.email : newEmployee.email}
  onChange={(e) => handleInputChange(e, editEmployee ? 'edit' : 'new')}
  sx={{ marginBottom: 2 }}
/>
<TextField
  label="Department"
  variant="outlined"
  fullWidth
  name="department"
  value={editEmployee ? editEmployee.department : newEmployee.department}
  onChange={(e) => handleInputChange(e, editEmployee ? 'edit' : 'new')}
  sx={{ marginBottom: 2 }}
/>
<TextField
  label="Designation"
  variant="outlined"
  fullWidth
  name="designation"
  value={editEmployee ? editEmployee.designation : newEmployee.designation}
  onChange={(e) => handleInputChange(e, editEmployee ? 'edit' : 'new')}
  sx={{ marginBottom: 2 }}
/>
<TextField
  label="Date of Joining"
  variant="outlined"
  fullWidth
  name="dateOfJoining"
  type="date"
  InputLabelProps={{
    shrink: true, // Keeps the label above the input
  }}
  value={editEmployee ? editEmployee.dateOfJoining : newEmployee.dateOfJoining}
  onChange={(e) => handleInputChange(e, editEmployee ? 'edit' : 'new')}
  sx={{ marginBottom: 2 }}
/>
<TextField
  label="Salary"
  variant="outlined"
  fullWidth
  name="salary"
  value={editEmployee ? editEmployee.salary : newEmployee.salary}
  onChange={(e) => handleInputChange(e, editEmployee ? 'edit' : 'new')}
  sx={{ marginBottom: 2 }}
/>

    {/* File Input */}
    <Box
      sx={{
        marginBottom: 2,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Profile Picture:
      </Typography>
      <input
        type="file"
        accept="image/*"
        name="profilePic"
        onChange={(e) => handleFileChange(e, editEmployee ? 'edit' : 'new')}
        style={{
          fontSize: '0.9rem',
          color: '#555',
        }}
      />
    </Box>

    <Button
  variant="contained"
  color="primary"
  onClick={editEmployee ? updateEmployee : addEmployee}
  sx={{
    width: '100%',
    paddingY: 1.5,
    fontSize: '1rem',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    backgroundColor: '#1976d2',
    '&:hover': {
      backgroundColor: '#145ea8',
    },
  }}
>
  {editEmployee ? 'Update Employee' : 'Add Employee'}
</Button>

  </Box>
</Modal>


    </div>
  );
}

export default Body;
