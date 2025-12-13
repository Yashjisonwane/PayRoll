// src/pages/Admin/CompanyManagement.js

import React, { useState } from 'react';
import { Button, Row, Col, Card, Table, Form, Modal, Badge, ListGroup, InputGroup } from 'react-bootstrap';
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

  // Data for modals
  const [selectedCompany, setSelectedCompany] = useState({});
  const [newCompany, setNewCompany] = useState({
    name: '', email: '', phone: '', website: '', planId: '', planStartDate: '', planExpiryDate: ''
  });

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

  const handleGenerateLogin = (company) => {
    alert(`Login ID for ${company.name} has been generated: ${company.email.replace(/[@.]/g, '')}_admin`);
  };

  const handleResetPassword = (company) => {
    alert(`Password for ${company.name} has been reset and sent to ${company.email}.`);
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
    <div className="container-fluid" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Company Management</h1>
          <Button variant="primary" onClick={handleAddCompany}>
            <FaPlus className="me-2" />Add Company
          </Button>
        </div>

        <Card className="shadow-sm">
          <Card.Body className="p-0">
            <div className="table-responsive">
              <Table hover className="mb-0">
                <thead>
                  <tr>
                    <th>Company Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Selected Plan</th>
                    <th>Plan Expiry</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.map(company => (
                    <tr key={company.id}>
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          <FaBuilding className="me-2 text-muted" />
                          {company.name}
                        </div>
                      </td>
                      <td className="align-middle">{company.email}</td>
                      <td className="align-middle">{company.phone}</td>
                      <td className="align-middle">{getPlanName(company.planId)}</td>
                      <td className="align-middle">{company.planExpiryDate}</td>
                      <td className="align-middle">
                        <Badge bg={company.status === 'Active' ? 'success' : 'danger'}>
                          {company.status}
                        </Badge>
                      </td>
                      <td className="align-middle">
                        <div className="d-flex flex-column gap-1">
                          <Button variant="outline-primary" size="sm" onClick={() => handleViewDetails(company)}>
                            <FaEye className="me-1" /> View Details
                          </Button>
                          <div className="d-flex gap-1">
                            <Button variant="outline-secondary" size="sm" onClick={() => handleGenerateLogin(company)} title="Generate Login ID">
                              <FaKey />
                            </Button>
                            <Button variant="outline-warning" size="sm" onClick={() => handleChangePlan(company)} title="Change Plan">
                              <FaExchangeAlt />
                            </Button>
                            <Button 
                              variant={company.status === 'Active' ? 'outline-danger' : 'outline-success'} 
                              size="sm" 
                              onClick={() => handleBlockUnblock(company.id)}
                              title={company.status === 'Active' ? 'Block Company' : 'Unblock Company'}
                            >
                              {company.status === 'Active' ? <FaBan /> : <FaCheckCircle />}
                            </Button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* --- MODALS --- */}

      {/* Add Company Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered size="lg">
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
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} centered size="lg">
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
      <Modal show={showChangePlanModal} onHide={() => setShowChangePlanModal(false)} centered>
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
    </div>
  );
};

export default CompanyManagement;