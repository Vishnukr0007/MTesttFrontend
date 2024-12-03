import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Modal, Box, TextField, IconButton } from '@mui/material';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import axios from 'axios';

function Body() {
  const [modalOpen, setModalOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    department: "",
    designation: "",
    dateOfJoining: "",
    salary: "",
    profilePic: null,
  });

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewEmployee({ ...newEmployee, profilePic: file });
  };

  const addEmployee = async () => {
    const formData = new FormData();
    formData.append('firstName', newEmployee.firstName);
    formData.append('lastName', newEmployee.lastName);
    formData.append('department', newEmployee.department);
    formData.append('designation', newEmployee.designation);
    formData.append('dateOfJoining', newEmployee.dateOfJoining);
    formData.append('salary', newEmployee.salary);
    if (newEmployee.profilePic) {
      formData.append('profilePic', newEmployee.profilePic);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/employees', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setEmployees([...employees, response.data]);
      setNewEmployee({
        firstName: "",
        lastName: "",
        department: "",
        designation: "",
        dateOfJoining: "",
        salary: "",
        profilePic: '',
      });
      toggleModal();
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Error adding employee: " + error.message);
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const [editEmployee, setEditEmployee] = useState(null); // Store the employee being edited

const openEditModal = (employee) => {
  setEditEmployee(employee);
  setModalOpen(true);
};

// Update the handle input change to work for both new and editing employees
const handleEditInputChange = (e) => {
  const { name, value } = e.target;
  setEditEmployee({ ...editEmployee, [name]: value });
};

// Update function for editing an employee
const updateEmployee = async () => {
  const formData = new FormData();
  formData.append('firstName', editEmployee.firstName);
  formData.append('lastName', editEmployee.lastName);
  formData.append('department', editEmployee.department);
  formData.append('designation', editEmployee.designation);
  formData.append('dateOfJoining', editEmployee.dateOfJoining);
  formData.append('salary', editEmployee.salary);
  if (editEmployee.profilePic) {
    formData.append('profilePic', editEmployee.profilePic);
  }

  try {
    const response = await axios.put(`http://localhost:5000/api/employees/${editEmployee.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Update the local state with the edited employee
    setEmployees(employees.map(emp => emp.id === editEmployee.id ? response.data : emp));
    setEditEmployee(null);
    toggleModal();
  } catch (error) {
    console.error("Error updating employee:", error);
    alert("Error updating employee: " + error.message);
  }
};

<Modal open={modalOpen} onClose={toggleModal}>
  <Box sx={{ /* Your modal styling */ }}>
    <Typography variant="h6" gutterBottom>
      {editEmployee ? "Edit Employee" : "Add Employee"}
    </Typography>

    <form>
      <TextField
        fullWidth
        margin="normal"
        label="First Name"
        variant="outlined"
        name="firstName"
        value={editEmployee?.firstName || ""}
        onChange={handleEditInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Last Name"
        variant="outlined"
        name="lastName"
        value={editEmployee?.lastName || ""}
        onChange={handleEditInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Department"
        variant="outlined"
        name="department"
        value={editEmployee?.department || ""}
        onChange={handleEditInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Designation"
        variant="outlined"
        name="designation"
        value={editEmployee?.designation || ""}
        onChange={handleEditInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Date of Joining"
        variant="outlined"
        type="date"
        name="dateOfJoining"
        value={editEmployee?.dateOfJoining || ""}
        onChange={handleEditInputChange}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Salary"
        variant="outlined"
        name="salary"
        value={editEmployee?.salary || ""}
        onChange={handleEditInputChange}
      />

      {/* File input for image upload */}
      <input
        type="file"
        onChange={(e) => handleFileChange(e, "edit")}
        accept="image/*"
        style={{ marginTop: '10px' }}
      />
    </form>

    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
      <IconButton color="primary" onClick={toggleModal}>
        <CloseIcon />
      </IconButton>
      <Button variant="contained" color="primary" onClick={updateEmployee}>
        Save Changes
      </Button>
    </Box>
  </Box>
</Modal>


  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px' }}>
        <Button variant="contained" color="primary" onClick={toggleModal} startIcon={<AddIcon />}>
          Add Employee
        </Button>
      </div>

      <Typography variant="h4" align="center" gutterBottom>
        Employees
      </Typography>

      <Container>
        <Grid container spacing={3}>
          {employees.map((employee, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
                <CardMedia
                  component="div"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 140,
                    width: 140,
                    borderRadius: '50%',
                    margin: '20px auto',
                    backgroundColor: '#1976d2',
                  }}
                >
                  {employee.profilePic ? (
                    <img
                      src={`http://localhost:5000${employee.profilePic}`}
                      alt="Employee Profile"
                      style={{ borderRadius: '50%', width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    `${employee.firstName[0]}${employee.lastName[0]}`
                  )}
                </CardMedia>

                <CardContent sx={{ padding: '16px' }}>
                  <Typography variant="h6" align="center" gutterBottom>
                    {employee.firstName} {employee.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                    <strong>Department:</strong> {employee.department}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                    <strong>Designation:</strong> {employee.designation}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                    <strong>Date of Joining:</strong> {employee.dateOfJoining}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                    <strong>Salary:</strong> ${employee.salary}
                  </Typography>
                  <Button
        variant="outlined"
        color="secondary"
        onClick={() => openEditModal(employee)}
      >
        Edit
      </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Modal open={modalOpen} onClose={toggleModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add Employee
          </Typography>

          <form>
            <TextField
              fullWidth
              margin="normal"
              label="First Name"
              variant="outlined"
              name="firstName"
              value={newEmployee.firstName}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Last Name"
              variant="outlined"
              name="lastName"
              value={newEmployee.lastName}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Department"
              variant="outlined"
              name="department"
              value={newEmployee.department}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Designation"
              variant="outlined"
              name="designation"
              value={newEmployee.designation}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Date of Joining"
              variant="outlined"
              type="date"
              name="dateOfJoining"
              value={newEmployee.dateOfJoining}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Salary"
              variant="outlined"
              name="salary"
              value={newEmployee.salary}
              onChange={handleInputChange}
            />

            {/* File input for image upload */}
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              style={{ marginTop: '10px' }}
            />
          </form>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <IconButton color="primary" onClick={toggleModal}>
              <CloseIcon />
            </IconButton>
            <Button variant="contained" color="primary" onClick={addEmployee}>
              Add Employee
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default Body;
