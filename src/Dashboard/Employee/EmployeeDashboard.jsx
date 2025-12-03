// src/pages/Employee/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Table, Badge, Button, Modal, Form, ProgressBar, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { 
  FaUser, 
  FaMoneyBillWave, 
  FaCalendarAlt, 
  FaFileInvoiceDollar, 
  FaReceipt, 
  FaHistory,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaEye,
  FaDownload,
  FaChartPie,
  FaChartLine,
  FaWallet,
  FaBars,
  FaTimes
} from 'react-icons/fa';

// Color Palette
const colors = {
  primaryRed: '#C62828',
  darkRed: '#B71C1C',
  white: '#FFFFFF',
  black: '#000000',
  darkGray: '#4A4A4A',
  lightGray: '#E2E2E2',
  lightBg: '#F8F9FA',
};

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showBillModal, setShowBillModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [notificationCount, setNotificationCount] = useState(3);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // Track window width for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const [employeeData, setEmployeeData] = useState({
    name: 'Rahul Sharma',
    id: 'EMP102',
    email: 'rahul.sharma@company.com',
    department: 'Engineering',
    position: 'Senior Developer',
    profileImage: 'https://picsum.photos/seed/employee123/200/200.jpg',
    phone: '+91 9876543210',
    address: '123, Tech Park, Bangalore, India',
    joinDate: '2021-03-15',
    bankAccount: 'XXXXXX1234',
  });
  
  const [salaryData, setSalaryData] = useState({
    currentMonthSalary: 75000,
    lastSalaryDate: '2023-06-25',
    pendingBills: 3,
    totalBillPayments: 15000,
    yearToDateSalary: 450000,
    monthlyAverage: 75000,
  });
  
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'Salary', date: '2023-06-25', amount: 75000, status: 'Completed', description: 'Monthly Salary - June 2023' },
    { id: 2, type: 'Payment', date: '2023-06-20', amount: 5000, status: 'Completed', description: 'Project Bonus' },
    { id: 3, type: 'Bill Payment', date: '2023-06-18', amount: 2500, status: 'Completed', description: 'Internet Bill' },
    { id: 4, type: 'Salary', date: '2023-05-25', amount: 75000, status: 'Completed', description: 'Monthly Salary - May 2023' },
    { id: 5, type: 'Bill Payment', date: '2023-05-15', amount: 3000, status: 'Completed', description: 'Electricity Bill' },
  ]);
  
  const [bills, setBills] = useState([
    { id: 1, name: 'Electricity Bill', amount: 3500, dueDate: '2023-07-10', status: 'Pending' },
    { id: 2, name: 'Internet Bill', amount: 1200, dueDate: '2023-07-15', status: 'Pending' },
    { id: 3, name: 'Water Bill', amount: 800, dueDate: '2023-07-20', status: 'Pending' },
  ]);

  const [profileForm, setProfileForm] = useState({
    name: employeeData.name,
    email: employeeData.email,
    phone: employeeData.phone,
    address: employeeData.address,
  });

  const cardStyle = {
    backgroundColor: colors.white,
    border: `1px solid ${colors.lightGray}`,
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    marginBottom: '24px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    height: '100%',
    overflow: 'hidden',
  };

  const headerStyle = {
    backgroundColor: colors.primaryRed,
    color: colors.white,
    padding: '10px 14px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
  };

  const buttonStyle = {
    backgroundColor: colors.primaryRed,
    color: colors.white,
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontWeight: '500',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
  };

  const secondaryButtonStyle = {
    backgroundColor: 'transparent',
    color: colors.primaryRed,
    border: `1px solid ${colors.primaryRed}`,
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontWeight: '500',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
  };

  const navbarStyle = {
    backgroundColor: colors.white,
    borderBottom: `1px solid ${colors.lightGray}`,
    padding: '12px 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  };

  const handleViewAllTransactions = () => {
    navigate('/Employee/transactions');
  };

  const handleViewBills = () => {
    navigate('/Employee/bills');
  };

  const handleViewTransactionDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setShowTransactionModal(true);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Update employee data
    setEmployeeData({
      ...employeeData,
      name: profileForm.name,
      email: profileForm.email,
      phone: profileForm.phone,
      address: profileForm.address,
    });
    setShowProfileModal(false);
    // Show success notification
    alert('Profile updated successfully!');
  };

  const handlePayBill = (billId) => {
    // Update bill status
    setBills(bills.map(bill => 
      bill.id === billId ? { ...bill, status: 'Paid' } : bill
    ));
    // Update pending bills count
    setSalaryData({
      ...salaryData,
      pendingBills: salaryData.pendingBills - 1,
      totalBillPayments: salaryData.totalBillPayments + bills.find(bill => bill.id === billId).amount,
    });
    // Show success notification
    alert('Bill paid successfully!');
  };

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    // Redirect to login
    navigate('/login');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Responsive transaction table component
  const ResponsiveTransactionTable = () => {
    if (windowWidth < 768) {
      // Mobile view - card layout
      return (
        <div className="transaction-cards">
          {transactions.map(transaction => (
            <Card key={transaction.id} className="mb-3" style={{ border: `1px solid ${colors.lightGray}` }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <Badge 
                      bg={transaction.type === 'Salary' ? 'success' : transaction.type === 'Payment' ? 'info' : 'warning'}
                      style={{ fontSize: '12px' }}
                    >
                      {transaction.type}
                    </Badge>
                  </div>
                  <Badge bg="success">
                    {transaction.status}
                  </Badge>
                </div>
                <h6 className="mb-1" style={{ fontSize: '13px' }}>{transaction.description}</h6>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0" style={{ fontSize: '12px', color: colors.darkGray }}>
                    {formatDate(transaction.date)}
                  </p>
                  <h5 className="mb-0" style={{ color: colors.primaryRed, fontWeight: '600', fontSize: '14px' }}>
                    {formatCurrency(transaction.amount)}
                  </h5>
                </div>
                <div className="text-end mt-2">
                  <Button 
                    variant="link" 
                    size="sm"
                    style={{ color: colors.primaryRed, padding: '0', fontSize: '12px' }}
                    onClick={() => handleViewTransactionDetails(transaction)}
                  >
                    <FaEye /> View Details
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      );
    } else {
      // Desktop view - table layout
      return (
        <div className="table-responsive">
          <Table hover className="align-middle" style={{ fontSize: '13px' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Description</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td style={{ fontSize: '12px' }}>{transaction.id}</td>
                  <td>
                    <Badge 
                      bg={transaction.type === 'Salary' ? 'success' : transaction.type === 'Payment' ? 'info' : 'warning'}
                      style={{ fontSize: '12px' }}
                    >
                      {transaction.type}
                    </Badge>
                  </td>
                  <td style={{ fontSize: '12px' }}>{transaction.description}</td>
                  <td style={{ fontSize: '12px' }}>{formatDate(transaction.date)}</td>
                  <td style={{ fontWeight: '600', fontSize: '12px' }}>{formatCurrency(transaction.amount)}</td>
                  <td>
                    <Badge bg="success" style={{ fontSize: '12px' }}>
                      {transaction.status}
                    </Badge>
                  </td>
                  <td>
                    <Button 
                      variant="link" 
                      size="sm"
                      style={{ color: colors.primaryRed, padding: '0', fontSize: '12px' }}
                      onClick={() => handleViewTransactionDetails(transaction)}
                    >
                      <FaEye />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      );
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightBg }}>

      <Container fluid className="px-3 px-md-4 py-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
          <h2 style={{ color: colors.black, marginBottom: windowWidth < 768 ? '15px' : '0', fontSize: '20px' }}>
            Welcome, {employeeData.name.split(' ')[0]}!
          </h2>
          <div className="d-flex flex-column flex-sm-row">
            <Button 
              style={secondaryButtonStyle}
              className="mb-2 mb-sm-0 me-sm-2"
              onClick={() => navigate('/Employee/reports')}
            >
              <FaChartPie className="me-2" />
              {windowWidth < 576 ? 'Reports' : 'View Reports'}
            </Button>
            <Button 
              style={buttonStyle}
              onMouseEnter={(e) => e.target.style.backgroundColor = colors.darkRed}
              onMouseLeave={(e) => e.target.style.backgroundColor = colors.primaryRed}
            >
              <FaDownload className="me-2" />
              {windowWidth < 576 ? 'Payslip' : 'Download Payslip'}
            </Button>
          </div>
        </div>

        <Row className="g-3 g-md-4">
          {/* Employee Profile Card */}
          <Col xs={12} lg={4} md={6}>
            <Card style={cardStyle}>
              <div style={headerStyle}>
                <FaUser className="me-2" /> Employee Profile
              </div>
              <Card.Body className="text-center p-3 p-md-4">
                <img 
                  src={employeeData.profileImage} 
                  alt="Profile" 
                  className="rounded-circle mb-3" 
                  style={{ 
                    width: windowWidth < 576 ? '80px' : '120px', 
                    height: windowWidth < 576 ? '80px' : '120px', 
                    objectFit: 'cover', 
                    border: `3px solid ${colors.primaryRed}` 
                  }}
                />
                <h4 style={{ color: colors.black, marginBottom: '5px', fontSize: windowWidth < 576 ? '18px' : '24px' }}>
                  {employeeData.name}
                </h4>
                <p style={{ color: colors.darkGray, marginBottom: '5px', fontSize: windowWidth < 576 ? '14px' : '16px' }}>
                  {employeeData.position}
                </p>
                <p style={{ color: colors.darkGray, marginBottom: '5px', fontSize: windowWidth < 576 ? '14px' : '16px' }}>
                  {employeeData.department}
                </p>
                <p style={{ color: colors.darkGray, marginBottom: '5px', fontSize: windowWidth < 576 ? '14px' : '16px' }}>
                  ID: {employeeData.id}
                </p>
                <p style={{ 
                  color: colors.darkGray, 
                  marginBottom: '15px', 
                  fontSize: windowWidth < 576 ? '12px' : '14px',
                  wordBreak: 'break-all'
                }}>
                  {employeeData.email}
                </p>
                <Button 
                  style={buttonStyle}
                  onMouseEnter={(e) => e.target.style.backgroundColor = colors.darkRed}
                  onMouseLeave={(e) => e.target.style.backgroundColor = colors.primaryRed}
                  onClick={() => setShowProfileModal(true)}
                >
                  Edit Profile
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Salary Information Card */}
          <Col xs={12} lg={4} md={6}>
            <Card style={cardStyle}>
              <div style={headerStyle}>
                <FaMoneyBillWave className="me-2" /> Salary Information
              </div>
              <Card.Body className="p-3 p-md-4">
                <div className="mb-3 mb-md-4">
                  <h5 style={{ color: colors.darkGray, fontSize: '14px', fontWeight: '500' }}>Current Month Salary</h5>
                  <h3 style={{ 
                    color: colors.primaryRed, 
                    fontWeight: '700',
                    fontSize: windowWidth < 576 ? '24px' : '28px'
                  }}>
                    {formatCurrency(salaryData.currentMonthSalary)}
                  </h3>
                </div>
                <div className="mb-3 mb-md-4">
                  <h5 style={{ color: colors.darkGray, fontSize: '14px', fontWeight: '500' }}>Last Salary Received</h5>
                  <p style={{ color: colors.black, display: 'flex', alignItems: 'center', margin: 0, fontSize: '13px' }}>
                    <FaCalendarAlt className="me-2" /> {formatDate(salaryData.lastSalaryDate)}
                  </p>
                </div>
                <div className="mb-3 mb-md-4">
                  <h5 style={{ color: colors.darkGray, fontSize: '14px', fontWeight: '500' }}>Year-to-Date Salary</h5>
                  <h5 style={{ color: colors.black, fontWeight: '600', fontSize: '16px' }}>
                    {formatCurrency(salaryData.yearToDateSalary)}
                  </h5>
                </div>
                <div className="mb-3 mb-md-4">
                  <h5 style={{ color: colors.darkGray, fontSize: '14px', fontWeight: '500' }}>Monthly Average</h5>
                  <h5 style={{ color: colors.black, fontWeight: '600', fontSize: '16px' }}>
                    {formatCurrency(salaryData.monthlyAverage)}
                  </h5>
                </div>
                <Button 
                  style={secondaryButtonStyle}
                  className="w-100"
                  onClick={() => navigate('/Employee/salary-details')}
                >
                  <FaChartLine className="me-2" />
                  {windowWidth < 576 ? 'Salary History' : 'View Salary History'}
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Bills Card */}
          <Col xs={12} lg={4} md={12}>
            <Card style={cardStyle}>
              <div style={headerStyle}>
                <FaFileInvoiceDollar className="me-2" /> Bills & Payments
              </div>
              <Card.Body className="p-3 p-md-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 style={{ color: colors.darkGray, fontSize: '14px', fontWeight: '500' }}>Pending Bills</h5>
                  <Badge bg="danger" style={{ fontSize: '14px', padding: '5px 10px' }}>
                    {salaryData.pendingBills}
                  </Badge>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3 mb-md-4">
                  <h5 style={{ color: colors.darkGray, fontSize: '14px', fontWeight: '500' }}>Total Payments</h5>
                  <h5 style={{ color: colors.black, fontWeight: '600', fontSize: '16px' }}>
                    {formatCurrency(salaryData.totalBillPayments)}
                  </h5>
                </div>
                <div className="mb-3 mb-md-4">
                  <h5 style={{ color: colors.darkGray, fontSize: '14px', fontWeight: '500', marginBottom: '10px' }}>
                    Recent Bills
                  </h5>
                  {bills.slice(0, 2).map(bill => (
                    <div key={bill.id} className="d-flex justify-content-between align-items-center mb-2 p-2" style={{ backgroundColor: colors.lightBg, borderRadius: '6px' }}>
                      <div>
                        <p style={{ margin: 0, color: colors.black, fontWeight: '500', fontSize: '12px' }}>{bill.name}</p>
                        <p style={{ margin: 0, color: colors.darkGray, fontSize: '12px' }}>
                          Due: {formatDate(bill.dueDate)}
                        </p>
                      </div>
                      <div className="d-flex align-items-center">
                        <span style={{ color: colors.black, fontWeight: '600', marginRight: '10px', fontSize: '12px' }}>
                          {formatCurrency(bill.amount)}
                        </span>
                        <Button 
                          size="sm"
                          style={buttonStyle}
                          onMouseEnter={(e) => e.target.style.backgroundColor = colors.darkRed}
                          onMouseLeave={(e) => e.target.style.backgroundColor = colors.primaryRed}
                          onClick={() => handlePayBill(bill.id)}
                        >
                          Pay
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="primary" 
                  className="w-100"
                  style={buttonStyle}
                  onMouseEnter={(e) => e.target.style.backgroundColor = colors.darkRed}
                  onMouseLeave={(e) => e.target.style.backgroundColor = colors.primaryRed}
                  onClick={handleViewBills}
                >
                  View All Bills
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Latest Transactions Card */}
          <Col xs={12}>
            <Card style={cardStyle}>
              <div style={headerStyle}>
                <FaHistory className="me-2" /> Latest Transactions
              </div>
              <Card.Body className="p-3 p-md-4">
                <ResponsiveTransactionTable />
                <div className="text-center mt-4">
                  <Button 
                    variant="primary"
                    style={buttonStyle}
                    onMouseEnter={(e) => e.target.style.backgroundColor = colors.darkRed}
                    onMouseLeave={(e) => e.target.style.backgroundColor = colors.primaryRed}
                    onClick={handleViewAllTransactions}
                  >
                    View All Transactions
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Profile Modal */}
      <Modal 
        show={showProfileModal} 
        onHide={() => setShowProfileModal(false)} 
        centered
        size={windowWidth < 576 ? 'sm' : 'md'}
      >
        <Modal.Header closeButton style={{ backgroundColor: colors.primaryRed, color: colors.white }}>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleProfileUpdate}>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '13px' }}>Name</Form.Label>
              <Form.Control
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                required
                style={{ fontSize: '13px' }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '13px' }}>Email</Form.Label>
              <Form.Control
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                required
                style={{ fontSize: '13px' }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '13px' }}>Phone</Form.Label>
              <Form.Control
                type="text"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                style={{ fontSize: '13px' }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '13px' }}>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={profileForm.address}
                onChange={(e) => setProfileForm({...profileForm, address: e.target.value})}
                style={{ fontSize: '13px' }}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button 
                variant="secondary" 
                className="me-2"
                onClick={() => setShowProfileModal(false)}
                style={{ fontSize: '13px' }}
              >
                Cancel
              </Button>
              <Button type="submit" style={buttonStyle}>
                Save Changes
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Transaction Details Modal */}
      <Modal 
        show={showTransactionModal} 
        onHide={() => setShowTransactionModal(false)} 
        centered
        size={windowWidth < 576 ? 'sm' : 'md'}
      >
        <Modal.Header closeButton style={{ backgroundColor: colors.primaryRed, color: colors.white }}>
          <Modal.Title>Transaction Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTransaction && (
            <div>
              <div className="mb-3">
                <h5 style={{ color: colors.darkGray, fontSize: '13px', fontWeight: '500' }}>Transaction ID</h5>
                <p style={{ color: colors.black, margin: 0, fontSize: '13px' }}>{selectedTransaction.id}</p>
              </div>
              <div className="mb-3">
                <h5 style={{ color: colors.darkGray, fontSize: '13px', fontWeight: '500' }}>Type</h5>
                <Badge 
                  bg={selectedTransaction.type === 'Salary' ? 'success' : selectedTransaction.type === 'Payment' ? 'info' : 'warning'}
                  style={{ fontSize: '12px' }}
                >
                  {selectedTransaction.type}
                </Badge>
              </div>
              <div className="mb-3">
                <h5 style={{ color: colors.darkGray, fontSize: '13px', fontWeight: '500' }}>Description</h5>
                <p style={{ color: colors.black, margin: 0, fontSize: '13px' }}>{selectedTransaction.description}</p>
              </div>
              <div className="mb-3">
                <h5 style={{ color: colors.darkGray, fontSize: '13px', fontWeight: '500' }}>Date</h5>
                <p style={{ color: colors.black, margin: 0, fontSize: '13px' }}>{formatDate(selectedTransaction.date)}</p>
              </div>
              <div className="mb-3">
                <h5 style={{ color: colors.darkGray, fontSize: '13px', fontWeight: '500' }}>Amount</h5>
                <p style={{ color: colors.black, fontWeight: '600', fontSize: '18px', margin: 0 }}>
                  {formatCurrency(selectedTransaction.amount)}
                </p>
              </div>
              <div className="mb-3">
                <h5 style={{ color: colors.darkGray, fontSize: '13px', fontWeight: '500' }}>Status</h5>
                <Badge bg="success" style={{ fontSize: '12px' }}>
                  {selectedTransaction.status}
                </Badge>
              </div>
              <div className="d-flex justify-content-end">
                <Button 
                  style={buttonStyle}
                  onMouseEnter={(e) => e.target.style.backgroundColor = colors.darkRed}
                  onMouseLeave={(e) => e.target.style.backgroundColor = colors.primaryRed}
                >
                  <FaDownload className="me-2" />
                  Download Receipt
                </Button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EmployeeDashboard;