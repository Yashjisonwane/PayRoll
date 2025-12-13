// src/Dashboard/SuperAdmin/PaymentsSubscriptions.jsx

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Card, 
  Nav, 
  Tab, 
  Table, 
  Button, 
  Badge, 
  Row, 
  Col, 
  Container,
  Form,
  InputGroup,
  Navbar
} from 'react-bootstrap';
import { 
  FaDownload, 
  FaTachometerAlt, 
  FaBuilding, 
  FaCreditCard, 
  FaUser,
  FaRupeeSign,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaBars,
  FaCog,
  FaSignOutAlt,
  FaSearch
} from 'react-icons/fa';

// --- Dummy Data ---
const paymentHistoryData = [
  { id: 'INV-001', companyName: 'Tech Innovators Inc.', planName: 'Enterprise Plan', amount: 79999, paymentMode: 'Credit Card', date: '2023-10-25', status: 'Success' },
  { id: 'INV-002', companyName: 'Creative Solutions Ltd.', planName: 'Professional Plan', amount: 24999, paymentMode: 'UPI', date: '2023-10-24', status: 'Success' },
  { id: 'INV-003', companyName: 'Global Services Co.', planName: 'Basic Plan', amount: 999, paymentMode: 'Bank Transfer', date: '2023-10-22', status: 'Pending' },
  { id: 'INV-004', companyName: 'Tech Innovators Inc.', planName: 'Enterprise Plan', amount: 79999, paymentMode: 'Credit Card', date: '2023-09-25', status: 'Success' },
];

const activeSubscriptionsData = [
  { id: 'SUB-A-001', companyName: 'Tech Innovators Inc.', planName: 'Enterprise Plan', amount: 79999, nextBillingDate: '2024-01-15' },
  { id: 'SUB-A-002', companyName: 'Creative Solutions Ltd.', planName: 'Professional Plan', amount: 24999, nextBillingDate: '2024-06-01' },
  { id: 'SUB-A-003', companyName: 'Future Corp', planName: 'Basic Plan', amount: 999, nextBillingDate: '2023-12-20' },
];

const expiredSubscriptionsData = [
  { id: 'SUB-E-001', companyName: 'Global Services Co.', planName: 'Basic Plan', amount: 999, expiryDate: '2023-04-20' },
  { id: 'SUB-E-002', companyName: 'Innovate LLC', planName: 'Professional Plan', amount: 24999, expiryDate: '2023-08-15' },
];

const summaryData = [
  { title: 'Total Revenue', count: 115997, icon: <FaRupeeSign />, bgColor: '#28a745' },
  { title: 'Active Subscriptions', count: activeSubscriptionsData.length, icon: <FaCheckCircle />, bgColor: '#007bff' },
  { title: 'Recent Transactions', count: paymentHistoryData.length, icon: <FaCalendarAlt />, bgColor: '#ffc107' },
];

// --- Reusable Components ---
const SummaryCard = ({ title, count, icon, bgColor }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Col md={4} className="mb-4">
      <Card className="shadow-sm border-0 h-100">
        <Card.Body className="d-flex align-items-center">
          <div className="icon-box rounded-circle p-3 d-flex align-items-center justify-content-center me-3 text-white" style={{ backgroundColor: bgColor }}>
            {icon}
          </div>
          <div>
            <h4 className="mb-1" style={{ color: bgColor, fontWeight: '700' }}>
              {title.includes('Revenue') ? formatCurrency(count) : count}
            </h4>
            <p className="text-muted mb-0">{title}</p>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

const SubscriptionTable = ({ data, showInvoiceDownload = true, showNextBilling = false, showExpiryDate = false }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleDownloadInvoice = (id) => {
    alert(`Downloading invoice #${id}...`);
  };

  return (
    <Card className="shadow-sm">
      <Card.Body className="p-0">
        <div className="table-responsive">
          <Table striped bordered hover className="mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>Company Name</th>
                <th>Plan Name</th>
                <th>Amount Paid</th>
                <th>{showNextBilling ? 'Next Billing Date' : showExpiryDate ? 'Expiry Date' : 'Payment Mode'}</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map(item => (
                  <tr key={item.id}>
                    <td>{item.companyName}</td>
                    <td>{item.planName}</td>
                    <td>{formatCurrency(item.amount)}</td>
                    <td>{showNextBilling ? item.nextBillingDate : showExpiryDate ? item.expiryDate : item.paymentMode}</td>
                    <td>
                      {showInvoiceDownload && (
                        <Button variant="primary" size="sm" onClick={() => handleDownloadInvoice(item.id)}>
                          <FaDownload className="me-1" /> Invoice
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">No records found.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

// --- Main Component ---
const PaymentsSubscriptions = () => {
  const location = useLocation();
  const [activeKey, setActiveKey] = useState(location.pathname === '/admin/payments' ? 'history' : 'history');

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* --- Main Content Area --- */}
      <div style={{ flexGrow: 1, backgroundColor: '#f8f9fa' }}>
        {/* --- Top Bar --- */}
        <Navbar bg="white" className="shadow-sm px-4 py-2 mb-4">
          <Container fluid>
            <Form className="d-flex">
              <InputGroup style={{ width: '300px' }}>
                <InputGroup.Text><FaSearch /></InputGroup.Text>
                <Form.Control type="text" placeholder="Search..." />
              </InputGroup>
            </Form>
          </Container>
        </Navbar>

        <Container fluid className="p-4">
          <h1 className="mb-4">Payments & Subscriptions</h1>

          {/* --- Summary Cards --- */}
          <Row className="mb-4">
            {summaryData.map((summary, index) => (
              <SummaryCard
                key={index}
                title={summary.title}
                count={summary.count}
                icon={summary.icon}
                bgColor={summary.bgColor}
              />
            ))}
          </Row>

          {/* --- Tabs --- */}
          <Tab.Container id="payments-tab" activeKey={activeKey}>
            <Nav variant="pills" className="mb-4">
              <Nav.Item>
                <Nav.Link eventKey="history" onClick={() => setActiveKey('history')}>Payment History</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="active" onClick={() => setActiveKey('active')}>Active Subscriptions</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="expired" onClick={() => setActiveKey('expired')}>Expired Subscriptions</Nav.Link>
              </Nav.Item>
            </Nav>

            <Tab.Content>
              {activeKey === 'history' && (
                <SubscriptionTable data={paymentHistoryData} showInvoiceDownload={true} />
              )}
              {activeKey === 'active' && (
                <SubscriptionTable data={activeSubscriptionsData} showInvoiceDownload={true} showNextBilling={true} />
              )}
              {activeKey === 'expired' && (
                <SubscriptionTable data={expiredSubscriptionsData} showInvoiceDownload={true} showExpiryDate={true} />
              )}
            </Tab.Content>
          </Tab.Container>
        </Container>
      </div>
    </div>
  );
};

export default PaymentsSubscriptions;