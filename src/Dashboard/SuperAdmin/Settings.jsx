// src/Dashboard/SuperAdmin/SettingsPage.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Form,
  Button,
  Row,
  Col,
  Container,
  Navbar,
  InputGroup,
  Alert,
  Dropdown
} from 'react-bootstrap';
import {
  FaGlobe,
  FaKey,
  FaEnvelope,
  FaPhone,
  FaSave,
  FaCheck,
  FaCaretDown,
  FaCreditCard
} from 'react-icons/fa';

// --- Main SettingsPage Component ---
const Settings = () => {
  // State for each settings section with new dummy data
  const [websiteDetails, setWebsiteDetails] = useState({
    siteName: 'TechCorp Solutions',
    siteUrl: 'https://techcorp.example.com',
    adminEmail: 'administrator@techcorp.example.com',
    logoUrl: 'https://picsum.photos/seed/techcorp/150/150.jpg',
  });

  const [paymentKeys, setPaymentKeys] = useState({
    razorpayKey: 'rzp_live_9876543210fedcba',
    razorpaySecret: '****************',
    stripeKey: 'pk_live_9876543210fedcba',
    stripeSecret: '****************',
  });

  const [emailTemplate, setEmailTemplate] = useState({
    welcomeSubject: 'Welcome to TechCorp Solutions!',
    welcomeBody: 'Dear Yash,\n\nWe are pleased to inform you that your account has been successfully created in our system.\n\nYour login credentials are:\nEmail: asdfg@gmail.com\nTemporary Password: 123456789\n\nPlease change your password after your first login for security purposes.\n\nIf you have any questions or need assistance, please don\'t hesitate to contact our support team.\n\nBest regards,\nThe TechCorp Team',
  });

  const [supportInfo, setSupportInfo] = useState({
    supportEmail: 'helpdesk@techcorp.example.com',
    supportPhone: '+1 (800) 123-4567',
  });

  // State for active section
  const [activeSection, setActiveSection] = useState('website');

  // State for save notifications
  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // --- Handler Functions ---
  const handleSaveWebsiteDetails = () => {
    // In a real app, you would save this to a backend
    setSaveMessage('Website Details have been saved successfully!');
    setShowSaveAlert(true);
    setTimeout(() => setShowSaveAlert(false), 3000);
  };

  const handleSavePaymentKeys = () => {
    // In a real app, you would save this to a backend
    setSaveMessage('Payment Gateway Keys have been saved successfully!');
    setShowSaveAlert(true);
    setTimeout(() => setShowSaveAlert(false), 3000);
  };

  const handleSaveEmailTemplate = () => {
    // In a real app, you would save this to a backend
    setSaveMessage('Email Template has been saved successfully!');
    setShowSaveAlert(true);
    setTimeout(() => setShowSaveAlert(false), 3000);
  };

  const handleSaveSupportInfo = () => {
    // In a real app, you would save this to a backend
    setSaveMessage('Support Information has been saved successfully!');
    setShowSaveAlert(true);
    setTimeout(() => setShowSaveAlert(false), 3000);
  };

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    switch (section) {
      case 'website':
        setWebsiteDetails({ ...websiteDetails, [name]: value });
        break;
      case 'payment':
        setPaymentKeys({ ...paymentKeys, [name]: value });
        break;
      case 'email':
        setEmailTemplate({ ...emailTemplate, [name]: value });
        break;
      case 'support':
        setSupportInfo({ ...supportInfo, [name]: value });
        break;
      default:
        break;
    }
  };

  const handleSectionSelect = (key) => {
    setActiveSection(key);
  };

  // Function to get section title from key
  const getSectionTitle = (key) => {
    switch (key) {
      case 'website':
        return 'Website Details';
      case 'payment':
        return 'Payment Gateway Keys';
      case 'email':
        return 'Email Templates';
      case 'support':
        return 'Support Email / Phone';
      default:
        return 'Select Section';
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', width: '100%' }}>
      {/* --- Top Bar --- */}
      <Navbar bg="white" className="shadow-sm px-3 px-md-4 py-2 mb-4">
        <Container fluid>
          <div className="d-flex justify-content-between align-items-center w-100">
            <h4 className="mb-0 fs-5 fs-md-4">Settings</h4>
          </div>
        </Container>
      </Navbar>

      {/* Save Notification Alert */}
      {showSaveAlert && (
        <Alert variant="info" className="position-fixed top-0 start-50 translate-middle-x mt-3" style={{ zIndex: 1000, width: '90%', maxWidth: '500px' }}>
          <FaCheck className="me-2" />
          {saveMessage}
        </Alert>
      )}

      <Container fluid className="px-3 px-md-4">
        {/* Section Selector Dropdown */}
        <Card className="shadow-sm mb-4 border-danger">
          <Card.Body className="p-3 bg-white">
            <Row className="align-items-center">
              <Col xs={12} md={6}>
                <h5 className="mb-3 mb-md-0 text-danger">
                  Settings Section
                </h5>
              </Col>

              <Col xs={12} md={6}>
                <Dropdown className="w-100">
                  <Dropdown.Toggle
                    id="settings-dropdown"
                    className="w-100 bg-white text-danger border-danger"
                  >
                    {getSectionTitle(activeSection)}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="w-100 bg-white border-danger">
                    <Dropdown.Item
                      className="text-danger"
                      onClick={() => handleSectionSelect("website")}
                    >
                      <FaGlobe className="me-2 text-danger" />
                      Website Details
                    </Dropdown.Item>

                    <Dropdown.Item
                      className="text-danger"
                      onClick={() => handleSectionSelect("payment")}
                    >
                      <FaCreditCard className="me-2 text-danger" />
                      Payment Gateway Keys
                    </Dropdown.Item>

                    <Dropdown.Item
                      className="text-danger"
                      onClick={() => handleSectionSelect("email")}
                    >
                      <FaEnvelope className="me-2 text-danger" />
                      Email Templates
                    </Dropdown.Item>

                    <Dropdown.Item
                      className="text-danger"
                      onClick={() => handleSectionSelect("support")}
                    >
                      <FaPhone className="me-2 text-danger" />
                      Support Email / Phone
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          </Card.Body>
        </Card>



        {/* Website Details Section */}
        {activeSection === 'website' && (
          <Card className="shadow-sm mb-4">
            <Card.Header as="h5" className="fs-6 fs-md-5">Website Details</Card.Header>
            <Card.Body className="p-3 p-md-4">
              <Form>
                <Row className="g-3">
                  <Col xs={12} lg={6}>
                    <Form.Group controlId="siteName" className="mb-3">
                      <Form.Label className="fs-6">Site Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="siteName"
                        value={websiteDetails.siteName}
                        onChange={(e) => handleInputChange(e, 'website')}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} lg={6}>
                    <Form.Group controlId="siteUrl" className="mb-3">
                      <Form.Label className="fs-6">Site URL</Form.Label>
                      <InputGroup>
                        <InputGroup.Text><FaGlobe /></InputGroup.Text>
                        <Form.Control
                          type="text"
                          name="siteUrl"
                          value={websiteDetails.siteUrl}
                          onChange={(e) => handleInputChange(e, 'website')}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="g-3">
                  <Col xs={12} lg={6}>
                    <Form.Group controlId="adminEmail" className="mb-3">
                      <Form.Label className="fs-6">Admin Email</Form.Label>
                      <InputGroup>
                        <InputGroup.Text><FaEnvelope /></InputGroup.Text>
                        <Form.Control
                          type="email"
                          name="adminEmail"
                          value={websiteDetails.adminEmail}
                          onChange={(e) => handleInputChange(e, 'website')}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col xs={12} lg={6}>
                    <Form.Group controlId="logoUrl" className="mb-3">
                      <Form.Label className="fs-6">Logo URL</Form.Label>
                      <Form.Control
                        type="text"
                        name="logoUrl"
                        value={websiteDetails.logoUrl}
                        onChange={(e) => handleInputChange(e, 'website')}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <Button variant="primary" onClick={handleSaveWebsiteDetails} className="w-100 w-md-auto">
                      <FaSave className="me-2" />Save Changes
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        )}

        {/* Payment Gateway Keys Section */}
        {activeSection === 'payment' && (
          <Card className="shadow-sm mb-4">
            <Card.Header as="h5" className="fs-6 fs-md-5">Payment Gateway Keys</Card.Header>
            <Card.Body className="p-3 p-md-4">
              <Form>
                <Row className="g-3">
                  <Col xs={12}><h6 className="fs-6 fs-md-5">Razorpay</h6></Col>
                  <Col xs={12} lg={6}>
                    <Form.Group controlId="razorpayKey" className="mb-3">
                      <Form.Label className="fs-6">Key</Form.Label>
                      <Form.Control
                        type="text"
                        name="razorpayKey"
                        value={paymentKeys.razorpayKey}
                        onChange={(e) => handleInputChange(e, 'payment')}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} lg={6}>
                    <Form.Group controlId="razorpaySecret" className="mb-3">
                      <Form.Label className="fs-6">Secret</Form.Label>
                      <Form.Control
                        type="password"
                        name="razorpaySecret"
                        value={paymentKeys.razorpaySecret}
                        onChange={(e) => handleInputChange(e, 'payment')}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="g-3">
                  <Col xs={12}><h6 className="mt-3 fs-6 fs-md-5">Stripe</h6></Col>
                  <Col xs={12} lg={6}>
                    <Form.Group controlId="stripeKey" className="mb-3">
                      <Form.Label className="fs-6">Publishable Key</Form.Label>
                      <Form.Control
                        type="text"
                        name="stripeKey"
                        value={paymentKeys.stripeKey}
                        onChange={(e) => handleInputChange(e, 'payment')}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} lg={6}>
                    <Form.Group controlId="stripeSecret" className="mb-3">
                      <Form.Label className="fs-6">Secret Key</Form.Label>
                      <Form.Control
                        type="password"
                        name="stripeSecret"
                        value={paymentKeys.stripeSecret}
                        onChange={(e) => handleInputChange(e, 'payment')}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <Button variant="primary" onClick={handleSavePaymentKeys} className="w-100 w-md-auto">
                      <FaSave className="me-2" />Save Keys
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        )}

        {/* Email Templates Section */}
        {activeSection === 'email' && (
          <Card className="shadow-sm mb-4">
            <Card.Header as="h5" className="fs-6 fs-md-5">Email Templates</Card.Header>
            <Card.Body className="p-3 p-md-4">
              <Form>
                <Row className="g-3">
                  <Col xs={12}>
                    <Form.Group controlId="welcomeSubject" className="mb-3">
                      <Form.Label className="fs-6">Welcome Email Subject</Form.Label>
                      <Form.Control
                        type="text"
                        name="welcomeSubject"
                        value={emailTemplate.welcomeSubject}
                        onChange={(e) => handleInputChange(e, 'email')}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group controlId="welcomeBody" className="mb-3">
                      <Form.Label className="fs-6">Welcome Email Body</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={8}
                        name="welcomeBody"
                        value={emailTemplate.welcomeBody}
                        onChange={(e) => handleInputChange(e, 'email')}
                        style={{ fontSize: '0.9rem' }}
                      />
                      <Form.Text className="text-muted">
                        Use {'{{name}}'}, {'{{email}}'}, and {'{{password}}'} as placeholders.
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <Button variant="primary" onClick={handleSaveEmailTemplate} className="w-100 w-md-auto">
                      <FaSave className="me-2" />Save Template
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        )}

        {/* Support Info Section */}
        {activeSection === 'support' && (
          <Card className="shadow-sm mb-4">
            <Card.Header as="h5" className="fs-6 fs-md-5">Support Contact Information</Card.Header>
            <Card.Body className="p-3 p-md-4">
              <Form>
                <Row className="g-3">
                  <Col xs={12} lg={6}>
                    <Form.Group controlId="supportEmail" className="mb-3">
                      <Form.Label className="fs-6">Support Email</Form.Label>
                      <InputGroup>
                        <InputGroup.Text><FaEnvelope /></InputGroup.Text>
                        <Form.Control
                          type="email"
                          name="supportEmail"
                          value={supportInfo.supportEmail}
                          onChange={(e) => handleInputChange(e, 'support')}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col xs={12} lg={6}>
                    <Form.Group controlId="supportPhone" className="mb-3">
                      <Form.Label className="fs-6">Support Phone</Form.Label>
                      <InputGroup>
                        <InputGroup.Text><FaPhone /></InputGroup.Text>
                        <Form.Control
                          type="tel"
                          name="supportPhone"
                          value={supportInfo.supportPhone}
                          onChange={(e) => handleInputChange(e, 'support')}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <Button variant="primary" onClick={handleSaveSupportInfo} className="w-100 w-md-auto">
                      <FaSave className="me-2" />Save Information
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        )}
      </Container>
    </div>
  );
};

export default Settings;