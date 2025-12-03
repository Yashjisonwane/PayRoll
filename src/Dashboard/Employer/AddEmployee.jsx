import React, { useState } from 'react';
import { Button, Modal, Form, Table, Container, Row, Col, Toast, ToastContainer, Dropdown } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaUserPlus, FaCog } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Rahul Sharma', email: 'rahul.sharma@example.com', phone: '9876543210', department: 'Engineering', position: 'Senior Developer', joiningDate: '2020-01-15', username: 'rahul.s', password: 'password123' },
    { id: 2, name: 'Priya Singh', email: 'priya.singh@example.com', phone: '9876543211', department: 'HR', position: 'HR Manager', joiningDate: '2019-05-22', username: 'priya.s', password: 'password123' },
    { id: 3, name: 'Amit Verma', email: 'amit.verma@example.com', phone: '9876543212', department: 'Marketing', position: 'Marketing Executive', joiningDate: '2021-03-10', username: 'amit.v', password: 'password123' },
    { id: 4, name: 'Neha Patel', email: 'neha.patel@example.com', phone: '9876543213', department: 'Finance', position: 'Accountant', joiningDate: '2018-11-05', username: 'neha.p', password: 'password123' },
    { id: 5, name: 'Vikram Kumar', email: 'vikram.kumar@example.com', phone: '9876543214', department: 'Engineering', position: 'DevOps Engineer', joiningDate: '2022-02-20', username: 'vikram.k', password: 'password123' }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');
  
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', department: '', position: '', joiningDate: '', username: '', password: ''
  });
  
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const styles = {
    primaryButton: { backgroundColor: '#C62828', borderColor: '#C62828', color: '#FFFFFF' },
    darkGrayText: { color: '#4A4A4A' },
    blackText: { color: '#000000' },
    tableHeader: { backgroundColor: '#f8f9fa' }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) {
      const newErrors = { ...formErrors };
      delete newErrors[name];
      setFormErrors(newErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.phone) errors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(formData.phone)) errors.phone = 'Phone must be 10 digits';
    if (!formData.department) errors.department = 'Department is required';
    if (!formData.position) errors.position = 'Position is required';
    if (!formData.joiningDate) errors.joiningDate = 'Joining date is required';
    if (!formData.username) errors.username = 'Username is required';
    if (!formData.password) errors.password = 'Password is required';
    else if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddEmployee = () => {
    if (validateForm()) {
      const newEmployee = { id: employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1, ...formData };
      setEmployees([...employees, newEmployee]);
      resetFormAndCloseModal(setShowAddModal);
      setToastMessage('Employee added successfully!');
      setToastVariant('success');
      setShowToast(true);
    }
  };

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowViewModal(true);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setFormData({ ...employee });
    setShowEditModal(true);
  };

  const handleUpdateEmployee = () => {
    if (validateForm()) {
      setEmployees(employees.map(emp => emp.id === selectedEmployee.id ? { ...emp, ...formData } : emp));
      resetFormAndCloseModal(setShowEditModal);
      setToastMessage('Employee updated successfully!');
      setToastVariant('success');
      setShowToast(true);
    }
  };

  const handleDeleteEmployee = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
      setToastMessage('Employee deleted successfully!');
      setToastVariant('danger');
      setShowToast(true);
    }
  };
  
  const resetFormAndCloseModal = (setModalState) => {
    setModalState(false);
    setFormData({ name: '', email: '', phone: '', department: '', position: '', joiningDate: '', username: '', password: '' });
    setFormErrors({});
  };

  return (
    <Container fluid className="p-4">
      {/* Header */}
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 style={styles.blackText}>Employee Management</h1>
          <p style={styles.darkGrayText}>View, add, edit and manage employee information</p>
        </Col>
        <Col xs="auto">
          <Button variant="primary" style={styles.primaryButton} onClick={() => setShowAddModal(true)}>
            <FaUserPlus className="me-2" /> Add Employee
          </Button>
        </Col>
      </Row>

      {/* Employee Table */}
      <div className="card shadow-sm">
        <div className="card-body p-0">
          <Table responsive hover className="mb-0">
            <thead style={styles.tableHeader}>
              <tr>
                <th>Name</th>
                <th className="d-none d-sm-table-cell">Email</th>
                <th className="d-none d-md-table-cell">Phone</th>
                <th className="d-none d-lg-table-cell">Department</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td className="d-none d-sm-table-cell">{employee.email}</td>
                  <td className="d-none d-md-table-cell">{employee.phone}</td>
                  <td className="d-none d-lg-table-cell">{employee.department}</td>
                  <td className="text-center">
                    {/* Dropdown for Mobile View */}
                    <div className="d-block d-lg-none">
                      <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                          <FaCog />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => handleViewEmployee(employee)}><FaEye className="me-2" />View</Dropdown.Item>
                          <Dropdown.Item onClick={() => handleEditEmployee(employee)}><FaEdit className="me-2" />Edit</Dropdown.Item>
                          <Dropdown.Item onClick={() => handleDeleteEmployee(employee.id)} className="text-danger"><FaTrash className="me-2" />Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>

                    {/* Buttons for Desktop View */}
                    <div className="d-none d-lg-flex justify-content-center gap-2">
                      <Button variant="outline-primary" size="sm" onClick={() => handleViewEmployee(employee)}><FaEye /></Button>
                      <Button variant="outline-warning" size="sm" onClick={() => handleEditEmployee(employee)}><FaEdit /></Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDeleteEmployee(employee.id)}><FaTrash /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Modals (Add, View, Edit) - These remain the same as before */}
      {/* Add Employee Modal */}
      <Modal show={showAddModal} onHide={() => resetFormAndCloseModal(setShowAddModal)} centered size="lg">
        <Modal.Header closeButton><Modal.Title>Add New Employee</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Row><Col md={6}><Form.Group className="mb-3"><Form.Label>Name</Form.Label><Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} isInvalid={!!formErrors.name} /><Form.Control.Feedback type="invalid">{formErrors.name}</Form.Control.Feedback></Form.Group></Col><Col md={6}><Form.Group className="mb-3"><Form.Label>Email</Form.Label><Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} isInvalid={!!formErrors.email} /><Form.Control.Feedback type="invalid">{formErrors.email}</Form.Control.Feedback></Form.Group></Col></Row>
            <Row><Col md={6}><Form.Group className="mb-3"><Form.Label>Phone</Form.Label><Form.Control type="text" name="phone" value={formData.phone} onChange={handleInputChange} isInvalid={!!formErrors.phone} /><Form.Control.Feedback type="invalid">{formErrors.phone}</Form.Control.Feedback></Form.Group></Col><Col md={6}><Form.Group className="mb-3"><Form.Label>Department</Form.Label><Form.Select name="department" value={formData.department} onChange={handleInputChange} isInvalid={!!formErrors.department}><option value="">Select Department</option><option value="Engineering">Engineering</option><option value="HR">HR</option><option value="Marketing">Marketing</option><option value="Finance">Finance</option><option value="Operations">Operations</option></Form.Select><Form.Control.Feedback type="invalid">{formErrors.department}</Form.Control.Feedback></Form.Group></Col></Row>
            <Row><Col md={6}><Form.Group className="mb-3"><Form.Label>Position</Form.Label><Form.Control type="text" name="position" value={formData.position} onChange={handleInputChange} isInvalid={!!formErrors.position} /><Form.Control.Feedback type="invalid">{formErrors.position}</Form.Control.Feedback></Form.Group></Col><Col md={6}><Form.Group className="mb-3"><Form.Label>Joining Date</Form.Label><Form.Control type="date" name="joiningDate" value={formData.joiningDate} onChange={handleInputChange} isInvalid={!!formErrors.joiningDate} /><Form.Control.Feedback type="invalid">{formErrors.joiningDate}</Form.Control.Feedback></Form.Group></Col></Row>
            <Row><Col md={6}><Form.Group className="mb-3"><Form.Label>Username</Form.Label><Form.Control type="text" name="username" value={formData.username} onChange={handleInputChange} isInvalid={!!formErrors.username} /><Form.Control.Feedback type="invalid">{formErrors.username}</Form.Control.Feedback></Form.Group></Col><Col md={6}><Form.Group className="mb-3"><Form.Label>Password</Form.Label><Form.Control type="password" name="password" value={formData.password} onChange={handleInputChange} isInvalid={!!formErrors.password} /><Form.Control.Feedback type="invalid">{formErrors.password}</Form.Control.Feedback></Form.Group></Col></Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => resetFormAndCloseModal(setShowAddModal)}>Cancel</Button>
          <Button style={styles.primaryButton} onClick={handleAddEmployee}>Add Employee</Button>
        </Modal.Footer>
      </Modal>

      {/* View Employee Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} centered size="lg">
        <Modal.Header closeButton><Modal.Title>Employee Details</Modal.Title></Modal.Header>
        <Modal.Body>
          {selectedEmployee && (
            <div>
              <h5>Personal Information</h5><hr />
              <p><strong>Name:</strong> {selectedEmployee.name}</p>
              <p><strong>Email:</strong> {selectedEmployee.email}</p>
              <p><strong>Phone:</strong> {selectedEmployee.phone}</p>
              <h5 className="mt-4">Professional Information</h5><hr />
              <p><strong>Department:</strong> {selectedEmployee.department}</p>
              <p><strong>Position:</strong> {selectedEmployee.position}</p>
              <p><strong>Joining Date:</strong> {selectedEmployee.joiningDate}</p>
              <h5 className="mt-4">Account Information</h5><hr />
              <p><strong>Username:</strong> {selectedEmployee.username}</p>
              <p><strong>Password:</strong> {'*'.repeat(selectedEmployee.password.length)}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>Close</Button>
          <Button style={styles.primaryButton} onClick={() => { setShowViewModal(false); handleEditEmployee(selectedEmployee); }}>Edit</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Employee Modal */}
      <Modal show={showEditModal} onHide={() => resetFormAndCloseModal(setShowEditModal)} centered size="lg">
        <Modal.Header closeButton><Modal.Title>Edit Employee</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Row><Col md={6}><Form.Group className="mb-3"><Form.Label>Name</Form.Label><Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} isInvalid={!!formErrors.name} /><Form.Control.Feedback type="invalid">{formErrors.name}</Form.Control.Feedback></Form.Group></Col><Col md={6}><Form.Group className="mb-3"><Form.Label>Email</Form.Label><Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} isInvalid={!!formErrors.email} /><Form.Control.Feedback type="invalid">{formErrors.email}</Form.Control.Feedback></Form.Group></Col></Row>
            <Row><Col md={6}><Form.Group className="mb-3"><Form.Label>Phone</Form.Label><Form.Control type="text" name="phone" value={formData.phone} onChange={handleInputChange} isInvalid={!!formErrors.phone} /><Form.Control.Feedback type="invalid">{formErrors.phone}</Form.Control.Feedback></Form.Group></Col><Col md={6}><Form.Group className="mb-3"><Form.Label>Department</Form.Label><Form.Select name="department" value={formData.department} onChange={handleInputChange} isInvalid={!!formErrors.department}><option value="">Select Department</option><option value="Engineering">Engineering</option><option value="HR">HR</option><option value="Marketing">Marketing</option><option value="Finance">Finance</option><option value="Operations">Operations</option></Form.Select><Form.Control.Feedback type="invalid">{formErrors.department}</Form.Control.Feedback></Form.Group></Col></Row>
            <Row><Col md={6}><Form.Group className="mb-3"><Form.Label>Position</Form.Label><Form.Control type="text" name="position" value={formData.position} onChange={handleInputChange} isInvalid={!!formErrors.position} /><Form.Control.Feedback type="invalid">{formErrors.position}</Form.Control.Feedback></Form.Group></Col><Col md={6}><Form.Group className="mb-3"><Form.Label>Joining Date</Form.Label><Form.Control type="date" name="joiningDate" value={formData.joiningDate} onChange={handleInputChange} isInvalid={!!formErrors.joiningDate} /><Form.Control.Feedback type="invalid">{formErrors.joiningDate}</Form.Control.Feedback></Form.Group></Col></Row>
            <Row><Col md={6}><Form.Group className="mb-3"><Form.Label>Username</Form.Label><Form.Control type="text" name="username" value={formData.username} onChange={handleInputChange} isInvalid={!!formErrors.username} /><Form.Control.Feedback type="invalid">{formErrors.username}</Form.Control.Feedback></Form.Group></Col><Col md={6}><Form.Group className="mb-3"><Form.Label>Password</Form.Label><Form.Control type="password" name="password" value={formData.password} onChange={handleInputChange} isInvalid={!!formErrors.password} /><Form.Control.Feedback type="invalid">{formErrors.password}</Form.Control.Feedback></Form.Group></Col></Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => resetFormAndCloseModal(setShowEditModal)}>Cancel</Button>
          <Button style={styles.primaryButton} onClick={handleUpdateEmployee}>Update Employee</Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Notification */}
      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} bg={toastVariant} delay={3000} autohide>
          <Toast.Header closeButton={false}>
            <strong className="me-auto text-white">{toastVariant === 'success' ? 'Success' : 'Deleted'}</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default EmployeeManagement;