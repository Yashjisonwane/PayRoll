// src/Dashboard/SuperAdmin/SettingsPage.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Nav,
  Tab,
  Form,
  Button,
  Row,
  Col,
  Container,
  Navbar,
  InputGroup
} from 'react-bootstrap';
import {
  FaTachometerAlt,
  FaBuilding,
  FaCreditCard,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaGlobe,
  FaKey,
  FaEnvelope,
  FaPhone,
  FaSave
} from 'react-icons/fa';

// --- Main SettingsPage Component ---
const Settings = () => {
  // State for each settings section
  const [websiteDetails, setWebsiteDetails] = useState({
    siteName: 'PayRoll Admin',
    siteUrl: 'https://payroll.example.com',
    adminEmail: 'admin@payroll.example.com',
    logoUrl: 'https://i.pravatar.cc/150?img=5',
  });

  const [paymentKeys, setPaymentKeys] = useState({
    razorpayKey: 'rzp_test_1234567890abcdef',
    razorpaySecret: '****************',
    stripeKey: 'pk_test_1234567890abcdef',
    stripeSecret: '****************',
  });

  const [emailTemplate, setEmailTemplate] = useState({
    welcomeSubject: 'Welcome to PayRoll!',
    welcomeBody: 'Hello {{name}},\n\nYour account has been created successfully. Your login credentials are:\nEmail: {{email}}\nPassword: {{password}}\n\nThank you!',
  });

  const [supportInfo, setSupportInfo] = useState({
    supportEmail: 'support@payroll.example.com',
    supportPhone: '+1 555-0101',
  });

  // --- Handler Functions ---
  const handleSaveWebsiteDetails = () => {
    alert('Website Details have been saved!');
  };

  const handleSavePaymentKeys = () => {
    alert('Payment Gateway Keys have been saved!');
  };

  const handleSaveEmailTemplate = () => {
    alert('Email Template has been saved!');
  };

  const handleSaveSupportInfo = () => {
    alert('Support Information has been saved!');
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

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* --- Main Content Area --- */}
      <div style={{ flexGrow: 1, backgroundColor: '#f8f9fa' }}>
        {/* --- Top Bar --- */}
        <Navbar bg="white" className="shadow-sm px-4 py-2 mb-4">
          <Container fluid>
            <h4 className="mb-0">Settings</h4>
          </Container>
        </Navbar>

        <Container fluid className="p-4">
          <Tab.Container id="settings-tab" defaultActiveKey="website">
            <Row>
              {/* --- Left Sidebar for Navigation --- */}
              <Col md={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="website">Website Details</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="payment">Payment Gateway Keys</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="email">Email Templates</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="support">Support Email / Phone</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>

              {/* --- Right Content Area for Forms --- */}
              <Col md={9}>
                <Tab.Content>
                  {/* Website Details Tab */}
                  <Tab.Pane eventKey="website" title="Website Details">
                    <Card className="shadow-sm">
                      <Card.Header as="h5">Website Details</Card.Header>
                      <Card.Body>
                        <Form>
                          {/* This Row creates a two-column layout for the first two fields */}
                          <Row className="g-3">
                            <Col md={6}>
                              <Form.Group controlId="siteName" className="mb-3">
                                <Form.Label>Site Name</Form.Label>
                                <Form.Control type="text" name="siteName" value={websiteDetails.siteName} onChange={(e) => handleInputChange(e, 'website')} />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group controlId="siteUrl" className="mb-3">
                                <Form.Label>Site URL</Form.Label>
                                <InputGroup>
                                  <InputGroup.Text><FaGlobe /></InputGroup.Text>
                                  <Form.Control type="text" name="siteUrl" value={websiteDetails.siteUrl} onChange={(e) => handleInputChange(e, 'website')} />
                                </InputGroup>
                              </Form.Group>
                            </Col>
                          </Row>
                          {/* This Row creates a two-column layout for the next two fields */}
                          <Row className="g-3">
                            <Col md={6}>
                              <Form.Group controlId="adminEmail" className="mb-3">
                                <Form.Label>Admin Email</Form.Label>
                                <InputGroup>
                                  <InputGroup.Text><FaEnvelope /></InputGroup.Text>
                                  <Form.Control type="email" name="adminEmail" value={websiteDetails.adminEmail} onChange={(e) => handleInputChange(e, 'website')} />
                                </InputGroup>
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group controlId="logoUrl" className="mb-3">
                                <Form.Label>Logo URL</Form.Label>
                                <Form.Control type="text" name="logoUrl" value={websiteDetails.logoUrl} onChange={(e) => handleInputChange(e, 'website')} />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={12}>
                              <Button variant="primary" onClick={handleSaveWebsiteDetails}>
                                <FaSave className="me-2" />Save Changes
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>

                  {/* Payment Gateway Keys Tab */}
                  <Tab.Pane eventKey="payment" title="Payment Gateway Keys">
                    <Card className="shadow-sm">
                      <Card.Header as="h5">Payment Gateway Keys</Card.Header>
                      <Card.Body>
                        <Form>
                          <Row className="g-3">
                            <Col md={12}><h6>Razorpay</h6></Col>
                            <Col md={6}>
                              <Form.Group controlId="razorpayKey" className="mb-3">
                                <Form.Label>Key</Form.Label>
                                <Form.Control type="text" name="razorpayKey" value={paymentKeys.razorpayKey} onChange={(e) => handleInputChange(e, 'payment')} />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group controlId="razorpaySecret" className="mb-3">
                                <Form.Label>Secret</Form.Label>
                                <Form.Control type="password" name="razorpaySecret" value={paymentKeys.razorpaySecret} onChange={(e) => handleInputChange(e, 'payment')} />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row className="g-3">
                            <Col md={12}><h6 className="mt-3">Stripe</h6></Col>
                            <Col md={6}>
                              <Form.Group controlId="stripeKey" className="mb-3">
                                <Form.Label>Publishable Key</Form.Label>
                                <Form.Control type="text" name="stripeKey" value={paymentKeys.stripeKey} onChange={(e) => handleInputChange(e, 'payment')} />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group controlId="stripeSecret" className="mb-3">
                                <Form.Label>Secret Key</Form.Label>
                                <Form.Control type="password" name="stripeSecret" value={paymentKeys.stripeSecret} onChange={(e) => handleInputChange(e, 'payment')} />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={12}>
                              <Button variant="primary" onClick={handleSavePaymentKeys}>
                                <FaSave className="me-2" />Save Keys
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>

                  {/* Email Templates Tab */}
                  <Tab.Pane eventKey="email" title="Email Templates">
                    <Card className="shadow-sm">
                      <Card.Header as="h5">Email Templates</Card.Header>
                      <Card.Body>
                        <Form>
                          <Row className="g-3">
                            <Col md={12}>
                              <Form.Group controlId="welcomeSubject" className="mb-3">
                                <Form.Label>Welcome Email Subject</Form.Label>
                                <Form.Control type="text" name="welcomeSubject" value={emailTemplate.welcomeSubject} onChange={(e) => handleInputChange(e, 'email')} />
                              </Form.Group>
                            </Col>
                            <Col md={12}>
                              <Form.Group controlId="welcomeBody" className="mb-3">
                                <Form.Label>Welcome Email Body</Form.Label>
                                <Form.Control as="textarea" rows={8} name="welcomeBody" value={emailTemplate.welcomeBody} onChange={(e) => handleInputChange(e, 'email')} />
                                <Form.Text className="text-muted">
                                  Use {'{{name}}'}, {'{{email}}'}, and {'{{password}}'} as placeholders.
                                </Form.Text>
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={12}>
                              <Button variant="primary" onClick={handleSaveEmailTemplate}>
                                <FaSave className="me-2" />Save Template
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>

                  {/* Support Info Tab */}
                  <Tab.Pane eventKey="support" title="Support Email / Phone">
                    <Card className="shadow-sm">
                      <Card.Header as="h5">Support Contact Information</Card.Header>
                      <Card.Body>
                        <Form>
                          <Row className="g-3">
                            <Col md={6}>
                              <Form.Group controlId="supportEmail" className="mb-3">
                                <Form.Label>Support Email</Form.Label>
                                <InputGroup>
                                  <InputGroup.Text><FaEnvelope /></InputGroup.Text>
                                  <Form.Control type="email" name="supportEmail" value={supportInfo.supportEmail} onChange={(e) => handleInputChange(e, 'support')} />
                                </InputGroup>
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group controlId="supportPhone" className="mb-3">
                                <Form.Label>Support Phone</Form.Label>
                                <InputGroup>
                                  <InputGroup.Text><FaPhone /></InputGroup.Text>
                                  <Form.Control type="tel" name="supportPhone" value={supportInfo.supportPhone} onChange={(e) => handleInputChange(e, 'support')} />
                                </InputGroup>
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={12}>
                              <Button variant="primary" onClick={handleSaveSupportInfo}>
                                <FaSave className="me-2" />Save Information
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </div>
    </div>
  );
};

export default Settings;