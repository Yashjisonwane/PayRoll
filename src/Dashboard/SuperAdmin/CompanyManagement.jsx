// src/pages/Admin/CompanyManagement.js

import React, { useState } from 'react';
import { Button, Row, Col, Card, Table, Form, Modal, Badge, ListGroup, InputGroup, Alert } from 'react-bootstrap';
import { 
  FaPlus, FaEye, FaKey, FaExchangeAlt, FaBan, FaCheckCircle, FaBuilding, FaEnvelope, FaPhone, FaGlobe
} from 'react-icons/fa';

// --- Dummy Data ---
// Using plans from the previous request for consistency
const plansData = [
  { id: 1, name: 'Basic Plan', duration: 'Monthly' },
  { id: 2, name: 'Professional Plan', duration: 'Yearly' },
  { id: 3, name: 'Enterprise Plan', duration: 'Yearly' },
];

const initialCompaniesData = [
  {
    id: 1,
    name: 'Tech Innovators Inc.',
    email: 'contact@techinnovators.com',
    phone: '+1 555-0101',
    website: 'www.techinnovators.com',
    planId: 3, // Enterprise Plan
    planStartDate: '2023-01-15',
    planExpiryDate: '2024-01-15',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Creative Solutions Ltd.',
    email: 'info@creativesolutions.io',
    phone: '+1 555-0102',
    website: 'www.creativesolutions.io',
    planId: 2, // Professional Plan
    planStartDate: '2023-06-01',
    planExpiryDate: '2024-06-01',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Global Services Co.',
    email: 'hello@globalservices.co',
    phone: '+1 555-0103',
    website: 'www.globalservices.co',
    planId: 1, // Basic Plan
    planStartDate: '2023-03-20',
    planExpiryDate: '2023-04-20',
    status: 'Blocked',
  },
];

// --- Main CompanyManagementPage Component ---
const CompanyManagement = () => {
  const [companies, setCompanies] = useState(initialCompaniesData);
  const [plans] = useState(plansData);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showChangePlanModal, setShowChangePlanModal] = useState(false);
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);

  // Data for modals
  const [selectedCompany, setSelectedCompany] = useState({});
  const [newCompany, setNewCompany] = useState({
    name: '', email: '', phone: '', website: '', planId: '', planStartDate: '', planExpiryDate: ''
  });
  
  // Password reset states
  const [passwordResetData, setPasswordResetData] = useState({
    newPassword: '',
    confirmPassword: '',
    sendEmail: true
  });
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);

  // --- Handler Functions ---
  const handleAddCompany = () => {
    setNewCompany({ name: '', email: '', phone: '', website: '', planId: '', planStartDate: '', planExpiryDate: '' });
    setShowAddModal(true);
  };

  const handleSaveNewCompany = () => {
    const companyToAdd = { ...newCompany, id: Date.now(), status: 'Active' };
    setCompanies([...companies, companyToAdd]);
    setShowAddModal(false);
  };

  const handleViewDetails = (company) => {
    setSelectedCompany(company);
    setShowDetailsModal(true);
  };

  const handleChangePlan = (company) => {
    setSelectedCompany(company);
    setShowChangePlanModal(true);
  };

  const handleSavePlanChange = () => {
    setCompanies(companies.map(c => 
      c.id === selectedCompany.id ? { ...c, planId: selectedCompany.planId } : c
    ));
    setShowChangePlanModal(false);
  };
  
  const handleBlockUnblock = (companyId) => {
    const company = companies.find(c => c.id === companyId);
    const action = company.status === 'Active' ? 'block' : 'unblock';
    if (window.confirm(`Are you sure you want to ${action} ${company.name}?`)) {
      setCompanies(companies.map(c =>
        c.id === companyId ? { ...c, status: c.status === 'Active' ? 'Blocked' : 'Active' } : c
      ));
    }
  };

  const handleOpenPasswordResetModal = (company) => {
    setSelectedCompany(company);
    setPasswordResetData({
      newPassword: '',
      confirmPassword: '',
      sendEmail: true
    });
    setPasswordResetSuccess(false);
    setShowPasswordResetModal(true);
  };

  const handlePasswordResetChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPasswordResetData({
      ...passwordResetData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSavePasswordReset = () => {
    // Here you would typically make an API call to reset the password
    // For this example, we'll just show a success message
    setPasswordResetSuccess(true);
    
    // After showing success, close the modal after 2 seconds
    setTimeout(() => {
      setShowPasswordResetModal(false);
      setPasswordResetSuccess(false);
    }, 2000);
  };

  const getPlanName = (planId) => {
    const plan = plans.find(p => p.id === planId);
    return plan ? plan.name : 'N/A';
  };
  
  const handleInputChange = (e, targetState = 'newCompany') => {
    const { name, value } = e.target;
    if (targetState === 'selectedCompany') {
      setSelectedCompany({ ...selectedCompany, [name]: value });
    } else {
      setNewCompany({ ...newCompany, [name]: value });
    }
  };

  return (
    <div className="container-fluid p-0" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3">Company Management</h1>
          <Button variant="primary" onClick={handleAddCompany} className="d-flex align-items-center">
            <FaPlus className="me-2" />Add Company
          </Button>
        </div>

        {/* Card View for All Screen Sizes */}
        {/* The grid system (Row, Col) with xs, sm, lg props makes the layout responsive. */}
        <Row>
          {companies.map(company => (
            <Col key={company.id} xs={12} sm={6} lg={4} className="mb-4">
              <Card className="shadow-sm h-100">
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="d-flex align-items-center">
                      <FaBuilding className="me-2 text-muted" />
                      <h5 className="mb-0">{company.name}</h5>
                    </div>
                    <Badge bg={company.status === 'Active' ? 'success' : 'danger'}>
                      {company.status}
                    </Badge>
                  </div>
                  
                  <div className="mb-3 flex-grow-1">
                    <div className="mb-2">
                      <span className="text-muted">Email: </span>
                      <span>{company.email}</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-muted">Phone: </span>
                      <span>{company.phone}</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-muted">Plan: </span>
                      <span>{getPlanName(company.planId)}</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-muted">Plan Expiry: </span>
                      <span>{company.planExpiryDate}</span>
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-between mt-auto">
                    <div className="d-flex gap-2">
                      <FaEye 
                        className="text-primary" 
                        style={{ cursor: 'pointer' }} 
                        onClick={() => handleViewDetails(company)}
                        title="View Details"
                      />
                      <FaKey 
                        className="text-secondary" 
                        style={{ cursor: 'pointer' }} 
                        onClick={() => handleOpenPasswordResetModal(company)}
                        title="Reset Password"
                      />
                      <FaExchangeAlt 
                        className="text-warning" 
                        style={{ cursor: 'pointer' }} 
                        onClick={() => handleChangePlan(company)}
                        title="Change Plan"
                      />
                    </div>
                    {company.status === 'Active' ? 
                      <FaBan 
                        className="text-danger" 
                        style={{ cursor: 'pointer' }} 
                        onClick={() => handleBlockUnblock(company.id)}
                        title="Block Company"
                      /> : 
                      <FaCheckCircle 
                        className="text-success" 
                        style={{ cursor: 'pointer' }} 
                        onClick={() => handleBlockUnblock(company.id)}
                        title="Unblock Company"
                      />
                    }
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* --- MODALS --- */}

      {/* Add Company Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered size="lg" fullscreen="sm-down">
        <Modal.Header closeButton>
          <Modal.Title>Add New Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="companyName">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control type="text" name="name" value={newCompany.name} onChange={(e) => handleInputChange(e)} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="companyEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" value={newCompany.email} onChange={(e) => handleInputChange(e)} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="companyPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="text" name="phone" value={newCompany.phone} onChange={(e) => handleInputChange(e)} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="companyWebsite">
                  <Form.Label>Website</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>https://</InputGroup.Text>
                    <Form.Control type="text" name="website" value={newCompany.website} onChange={(e) => handleInputChange(e)} />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="planSelect">
                  <Form.Label>Select Plan</Form.Label>
                  <Form.Select name="planId" value={newCompany.planId} onChange={(e) => handleInputChange(e)}>
                    <option value="">Choose a plan...</option>
                    {plans.map(plan => <option key={plan.id} value={plan.id}>{plan.name}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="planStartDate">
                  <Form.Label>Plan Start Date</Form.Label>
                  <Form.Control type="date" name="planStartDate" value={newCompany.planStartDate} onChange={(e) => handleInputChange(e)} />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="planExpiryDate">
                  <Form.Label>Plan Expiry Date</Form.Label>
                  <Form.Control type="date" name="planExpiryDate" value={newCompany.planExpiryDate} onChange={(e) => handleInputChange(e)} />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSaveNewCompany}>Save Company</Button>
        </Modal.Footer>
      </Modal>

      {/* View Company Details Modal */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} centered size="lg" fullscreen="sm-down">
        <Modal.Header closeButton>
          <Modal.Title>Company Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCompany.id && (
            <ListGroup variant="flush">
              <ListGroup.Item><strong>Name:</strong> {selectedCompany.name}</ListGroup.Item>
              <ListGroup.Item><strong>Email:</strong> <FaEnvelope className="me-2" />{selectedCompany.email}</ListGroup.Item>
              <ListGroup.Item><strong>Phone:</strong> <FaPhone className="me-2" />{selectedCompany.phone}</ListGroup.Item>
              <ListGroup.Item><strong>Website:</strong> <FaGlobe className="me-2" />https://{selectedCompany.website}</ListGroup.Item>
              <ListGroup.Item><strong>Plan:</strong> {getPlanName(selectedCompany.planId)}</ListGroup.Item>
              <ListGroup.Item><strong>Plan Duration:</strong> {selectedCompany.planStartDate} to {selectedCompany.planExpiryDate}</ListGroup.Item>
              <ListGroup.Item><strong>Status:</strong> <Badge bg={selectedCompany.status === 'Active' ? 'success' : 'danger'}>{selectedCompany.status}</Badge></ListGroup.Item>
            </ListGroup>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Change Plan Modal */}
      <Modal show={showChangePlanModal} onHide={() => setShowChangePlanModal(false)} centered fullscreen="sm-down">
        <Modal.Header closeButton>
          <Modal.Title>Change Plan for {selectedCompany.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
              <strong>Current Plan:</strong> {getPlanName(selectedCompany.planId)}
            </p>
          <Form.Group controlId="newPlanSelect">
            <Form.Label>Select New Plan</Form.Label>
            <Form.Select name="planId" value={selectedCompany.planId} onChange={(e) => handleInputChange(e, 'selectedCompany')}>
              {plans.map(plan => <option key={plan.id} value={plan.id}>{plan.name}</option>)}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowChangePlanModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSavePlanChange}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Simplified Password Reset Modal */}
      <Modal show={showPasswordResetModal} onHide={() => setShowPasswordResetModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {passwordResetSuccess ? (
            <Alert variant="success">
              Password has been successfully reset for {selectedCompany.name}. 
              {passwordResetData.sendEmail && ' An email with the new password has been sent to ' + selectedCompany.email + '.'}
            </Alert>
          ) : (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Company</Form.Label>
                <Form.Control type="text" value={`${selectedCompany.name} (${selectedCompany.email})`} readOnly />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control 
                  type="password" 
                  name="newPassword"
                  value={passwordResetData.newPassword}
                  onChange={handlePasswordResetChange}
                  placeholder="Enter new password"
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                  type="password" 
                  name="confirmPassword"
                  value={passwordResetData.confirmPassword}
                  onChange={handlePasswordResetChange}
                  placeholder="Confirm new password"
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Check 
                  type="checkbox" 
                  id="sendEmail"
                  name="sendEmail"
                  label="Send password via email"
                  checked={passwordResetData.sendEmail}
                  onChange={handlePasswordResetChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPasswordResetModal(false)}>Cancel</Button>
          {!passwordResetSuccess && (
            <Button 
              variant="danger" // Changed to red
              onClick={handleSavePasswordReset}
              disabled={!passwordResetData.newPassword || passwordResetData.newPassword !== passwordResetData.confirmPassword}
            >
              Reset Password
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CompanyManagement;