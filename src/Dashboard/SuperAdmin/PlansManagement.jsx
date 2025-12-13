// src/pages/Admin/PlansManagement.js

import React, { useState } from 'react';
import { Button, Row, Col, Card, Table, Form, Modal, Badge } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

// --- Dummy Initial Data ---
const initialPlansData = [
  {
    id: 1,
    name: 'Basic Plan',
    priceMonthly: 999,
    priceYearly: 9999,
    users: 5,
    modules: { employee: true, jobPortal: false, vendor: false },
    storage: '5 GB',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Professional Plan',
    priceMonthly: 2499,
    priceYearly: 24999,
    users: 20,
    modules: { employee: true, jobPortal: true, vendor: false },
    storage: '50 GB',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Enterprise Plan',
    priceMonthly: 7999,
    priceYearly: 79999,
    users: 'Unlimited',
    modules: { employee: true, jobPortal: true, vendor: true },
    storage: 'Unlimited',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Legacy Plan',
    priceMonthly: 499,
    priceYearly: 4999,
    users: 2,
    modules: { employee: true, jobPortal: false, vendor: false },
    storage: '1 GB',
    status: 'Inactive',
  },
];

// --- Main PlansManagementPage Component ---
const PlansManagement = () => {
  const [plans, setPlans] = useState(initialPlansData);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPlan, setCurrentPlan] = useState({});

  // --- Handler Functions ---
  const handleAddNew = () => {
    setIsEditMode(false);
    setCurrentPlan({
      name: '',
      priceMonthly: '',
      priceYearly: '',
      users: '',
      modules: { employee: false, jobPortal: false, vendor: false },
      storage: '',
      status: 'Active',
    });
    setShowModal(true);
  };

  const handleEdit = (plan) => {
    setIsEditMode(true);
    setCurrentPlan({ ...plan });
    setShowModal(true);
  };

  const handleDelete = (planId) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      setPlans(plans.filter(p => p.id !== planId));
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentPlan({});
  };

  const handleSave = () => {
    if (isEditMode) {
      // Update existing plan
      setPlans(plans.map(p => (p.id === currentPlan.id ? currentPlan : p)));
    } else {
      // Add new plan
      const newPlan = { ...currentPlan, id: Date.now() }; // Simple unique ID
      setPlans([...plans, newPlan]);
    }
    handleCloseModal();
  };
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setCurrentPlan({
        ...currentPlan,
        modules: { ...currentPlan.modules, [name]: checked },
      });
    } else {
      setCurrentPlan({ ...currentPlan, [name]: value });
    }
  };
  
  const handleStatusToggle = () => {
    setCurrentPlan({ ...currentPlan, status: currentPlan.status === 'Active' ? 'Inactive' : 'Active' });
  };

  return (
    <div className="container-fluid p-0" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3">Plans Management</h1>
          <Button variant="primary" onClick={handleAddNew} className="d-flex align-items-center">
            <FaPlus className="me-2" />Add New
          </Button>
        </div>

        {/* Desktop Table View */}
        <Card className="shadow-sm d-none d-md-block">
          <Card.Body className="p-0">
            <div className="table-responsive">
              <Table hover className="mb-0">
                <thead>
                  <tr>
                    <th>Plan Name</th>
                    <th>Price</th>
                    <th>Users</th>
                    <th>Modules Access</th>
                    <th>Storage Limit</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map(plan => (
                    <tr key={plan.id}>
                      <td className="align-middle">{plan.name}</td>
                      <td className="align-middle">
                        ₹{plan.priceMonthly.toLocaleString('en-IN')}/mo <br />
                        <small className="text-muted">₹{plan.priceYearly.toLocaleString('en-IN')}/yr</small>
                      </td>
                      <td className="align-middle">{plan.users}</td>
                      <td className="align-middle">
                        <div className="d-flex flex-column gap-1">
                          <Badge bg={plan.modules.employee ? 'success' : 'secondary'}>Employee</Badge>
                          <Badge bg={plan.modules.jobPortal ? 'success' : 'secondary'}>Job Portal</Badge>
                          <Badge bg={plan.modules.vendor ? 'success' : 'secondary'}>Vendor</Badge>
                        </div>
                      </td>
                      <td className="align-middle">{plan.storage}</td>
                      <td className="align-middle">
                        <Badge bg={plan.status === 'Active' ? 'success' : 'danger'}>
                          {plan.status}
                        </Badge>
                      </td>
                      <td className="align-middle">
                        <div className="d-flex gap-2">
                          <FaEdit 
                            className="text-primary" 
                            style={{ cursor: 'pointer' }} 
                            onClick={() => handleEdit(plan)}
                          />
                          <FaTrash 
                            className="text-danger" 
                            style={{ cursor: 'pointer' }} 
                            onClick={() => handleDelete(plan.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>

        {/* Mobile Card View */}
        <div className="d-md-none">
          {plans.map(plan => (
            <Card key={plan.id} className="mb-3 shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="mb-0">{plan.name}</h5>
                  <div className="d-flex gap-2">
                    <FaEdit 
                      className="text-primary" 
                      style={{ cursor: 'pointer' }} 
                      onClick={() => handleEdit(plan)}
                    />
                    <FaTrash 
                      className="text-danger" 
                      style={{ cursor: 'pointer' }} 
                      onClick={() => handleDelete(plan.id)}
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-muted">Price: </span>
                  <span>₹{plan.priceMonthly.toLocaleString('en-IN')}/mo</span>
                  <small className="text-muted d-block">₹{plan.priceYearly.toLocaleString('en-IN')}/yr</small>
                </div>
                <div className="mb-2">
                  <span className="text-muted">Users: </span>
                  <span>{plan.users}</span>
                </div>
                <div className="mb-2">
                  <span className="text-muted">Modules: </span>
                  <div className="d-flex flex-wrap gap-1 mt-1">
                    <Badge bg={plan.modules.employee ? 'success' : 'secondary'}>Employee</Badge>
                    <Badge bg={plan.modules.jobPortal ? 'success' : 'secondary'}>Job Portal</Badge>
                    <Badge bg={plan.modules.vendor ? 'success' : 'secondary'}>Vendor</Badge>
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-muted">Storage: </span>
                  <span>{plan.storage}</span>
                </div>
                <div>
                  <span className="text-muted">Status: </span>
                  <Badge bg={plan.status === 'Active' ? 'success' : 'danger'}>
                    {plan.status}
                  </Badge>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>

      {/* Add/Edit Plan Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg" fullscreen="sm-down">
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? 'Edit Plan' : 'Add New Plan'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="planName">
                  <Form.Label>Plan Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={currentPlan.name || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="users">
                  <Form.Label>Number of Users</Form.Label>
                  <Form.Control
                    type="text" // Using text to allow 'Unlimited'
                    name="users"
                    value={currentPlan.users || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="priceMonthly">
                  <Form.Label>Price (Monthly)</Form.Label>
                  <Form.Control
                    type="number"
                    name="priceMonthly"
                    value={currentPlan.priceMonthly || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="priceYearly">
                  <Form.Label>Price (Yearly)</Form.Label>
                  <Form.Control
                    type="number"
                    name="priceYearly"
                    value={currentPlan.priceYearly || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="storage">
                  <Form.Label>Storage Limit</Form.Label>
                  <Form.Control
                    type="text" // Using text to allow 'Unlimited'
                    name="storage"
                    value={currentPlan.storage || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Label>Modules Access</Form.Label>
                <div>
                  <Form.Check
                    type="checkbox"
                    id="module-employee"
                    label="Employee"
                    name="employee"
                    checked={currentPlan.modules?.employee || false}
                    onChange={handleInputChange}
                  />
                  <Form.Check
                    type="checkbox"
                    id="module-jobPortal"
                    label="Job Portal"
                    name="jobPortal"
                    checked={currentPlan.modules?.jobPortal || false}
                    onChange={handleInputChange}
                  />
                  <Form.Check
                    type="checkbox"
                    id="module-vendor"
                    label="Vendor"
                    name="vendor"
                    checked={currentPlan.modules?.vendor || false}
                    onChange={handleInputChange}
                  />
                </div>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Plan Status</Form.Label>
                  <Form.Check
                    type="switch"
                    id="plan-status-switch"
                    label={currentPlan.status === 'Active' ? 'Active' : 'Inactive'}
                    checked={currentPlan.status === 'Active'}
                    onChange={handleStatusToggle}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            <FaTimes className="me-2" />Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            <FaSave className="me-2" />Save Plan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PlansManagement;