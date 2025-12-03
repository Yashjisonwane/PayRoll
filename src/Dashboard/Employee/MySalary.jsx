// src/pages/Employee/MySalary.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Table, Badge, Button, Modal } from 'react-bootstrap';
import { 
  FaMoneyBillWave, 
  FaCalendarAlt, 
  FaDownload, 
  FaBuilding,
  FaCheckCircle,
  FaTimesCircle,
  FaFileInvoice,
  FaArrowLeft,
  FaChartBar,
  FaReceipt,
  FaInfoCircle
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
  successGreen: '#28A745',
  warningOrange: '#FFC107',
  lightRed: '#FFEBEE',
};

const MySalary = () => {
  const navigate = useNavigate();
  const [showPayslipModal, setShowPayslipModal] = useState(false);
  const [selectedSalary, setSelectedSalary] = useState(null);
  
  const [currentSalary, setCurrentSalary] = useState({
    month: 'July 2023',
    amount: 75000,
    employer: 'Tech Solutions Pvt. Ltd.',
    status: 'Paid',
    paymentDate: '2023-07-25',
    payslipAvailable: true,
    deductions: 12000,
    netSalary: 63000,
    basicPay: 50000,
    hra: 15000,
    allowances: 10000,
    pf: 6000,
    tax: 5000,
    otherDeductions: 1000,
  });

  const [salaryHistory, setSalaryHistory] = useState([
    { 
      id: 1, 
      month: 'July 2023', 
      amount: 75000, 
      employer: 'Tech Solutions Pvt. Ltd.', 
      status: 'Paid', 
      paymentDate: '2023-07-25',
      payslipAvailable: true,
      deductions: 12000,
      netSalary: 63000
    },
    { 
      id: 2, 
      month: 'June 2023', 
      amount: 75000, 
      employer: 'Tech Solutions Pvt. Ltd.', 
      status: 'Paid', 
      paymentDate: '2023-06-25',
      payslipAvailable: true,
      deductions: 11500,
      netSalary: 63500
    },
    { 
      id: 3, 
      month: 'May 2023', 
      amount: 75000, 
      employer: 'Tech Solutions Pvt. Ltd.', 
      status: 'Paid', 
      paymentDate: '2023-05-25',
      payslipAvailable: true,
      deductions: 11000,
      netSalary: 64000
    },
    { 
      id: 4, 
      month: 'April 2023', 
      amount: 75000, 
      employer: 'Tech Solutions Pvt. Ltd.', 
      status: 'Paid', 
      paymentDate: '2023-04-25',
      payslipAvailable: true,
      deductions: 10500,
      netSalary: 64500
    },
    { 
      id: 5, 
      month: 'August 2023', 
      amount: 75000, 
      employer: 'Tech Solutions Pvt. Ltd.', 
      status: 'Unpaid', 
      paymentDate: '-',
      payslipAvailable: false,
      deductions: 12000,
      netSalary: 63000
    },
  ]);

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 15px',
  };

  const cardStyle = {
    backgroundColor: colors.white,
    border: `1px solid ${colors.lightGray}`,
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    marginBottom: '20px',
    transition: 'transform 0.3s ease',
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (dateString === '-') return '-';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDownloadPayslip = (salary) => {
    setSelectedSalary(salary);
    setShowPayslipModal(true);
  };

  const handleActualDownload = () => {
    // Simulate download
    alert(`Downloading payslip for ${selectedSalary.month}...`);
    setShowPayslipModal(false);
  };

  return (
    <div style={{minHeight: '100vh' }}>


      <div style={containerStyle} className="py-4">
        {/* Current Month Salary Card - Redesigned as a standalone card */}
        <Card style={cardStyle}>
          <div style={headerStyle}>
            <FaMoneyBillWave className="me-2" />
            Current Month Salary - {currentSalary.month}
          </div>
          <Card.Body className="p-3">
            <Row>
              {/* Salary Amount Section */}
              <Col md={4} className="mb-3 mb-md-0">
                <div style={{ 
                  backgroundColor: colors.lightRed, 
                  padding: '15px', 
                  borderRadius: '8px',
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <h5 style={{ color: colors.darkGray, marginBottom: '5px', fontSize: '14px' }}>Monthly Salary</h5>
                  <h2 style={{ color: colors.primaryRed, fontWeight: '700', margin: 0, fontSize: '24px' }}>
                    {formatCurrency(currentSalary.amount)}
                  </h2>
                </div>
              </Col>
              
              {/* Salary Details Section */}
              <Col md={8}>
                <Row>
                  <Col sm={6} className="mb-3">
                    <div className="d-flex align-items-center">
                      <FaBuilding className="me-2" color={colors.darkGray} size={16} />
                      <div>
                        <h6 style={{ color: colors.darkGray, margin: 0, fontSize: '12px' }}>Employer</h6>
                        <p style={{ color: colors.black, margin: 0, fontWeight: '500', fontSize: '14px' }}>
                          {currentSalary.employer}
                        </p>
                      </div>
                    </div>
                  </Col>
                  
                  <Col sm={6} className="mb-3">
                    <div className="d-flex align-items-center">
                      {currentSalary.status === 'Paid' ? 
                        <FaCheckCircle className="me-2" color={colors.successGreen} size={16} /> :
                        <FaTimesCircle className="me-2" color={colors.warningOrange} size={16} />
                      }
                      <div>
                        <h6 style={{ color: colors.darkGray, margin: 0, fontSize: '12px' }}>Status</h6>
                        <Badge 
                          bg={currentSalary.status === 'Paid' ? 'success' : 'warning'}
                          style={{ fontSize: '12px', padding: '3px 8px' }}
                        >
                          {currentSalary.status}
                        </Badge>
                      </div>
                    </div>
                  </Col>
                  
                  <Col sm={6} className="mb-3">
                    <div className="d-flex align-items-center">
                      <FaCalendarAlt className="me-2" color={colors.darkGray} size={16} />
                      <div>
                        <h6 style={{ color: colors.darkGray, margin: 0, fontSize: '12px' }}>Payment Date</h6>
                        <p style={{ color: colors.black, margin: 0, fontWeight: '500', fontSize: '14px' }}>
                          {formatDate(currentSalary.paymentDate)}
                        </p>
                      </div>
                    </div>
                  </Col>
                  
                  <Col sm={6} className="mb-3">
                    <div className="d-flex align-items-center justify-content-end">
                      <Button 
                        style={buttonStyle}
                        onMouseEnter={(e) => e.target.style.backgroundColor = colors.darkRed}
                        onMouseLeave={(e) => e.target.style.backgroundColor = colors.primaryRed}
                        onClick={() => handleDownloadPayslip(currentSalary)}
                        disabled={!currentSalary.payslipAvailable}
                      >
                        <FaDownload className="me-1" />
                        Download Salary Slip
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Salary Breakdown Card */}
        <Card style={cardStyle}>
          <div style={headerStyle}>
            <FaReceipt className="me-2" />
            Salary Breakdown
          </div>
          <Card.Body className="p-3">
            <div className="mb-3">
              <h6 style={{ color: colors.darkGray, fontSize: '14px', marginBottom: '10px' }}>Earnings</h6>
              <div className="d-flex justify-content-between mb-2">
                <span style={{ fontSize: '13px' }}>Basic Pay</span>
                <span style={{ fontSize: '13px', fontWeight: '500' }}>{formatCurrency(currentSalary.basicPay)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span style={{ fontSize: '13px' }}>HRA</span>
                <span style={{ fontSize: '13px', fontWeight: '500' }}>{formatCurrency(currentSalary.hra)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span style={{ fontSize: '13px' }}>Other Allowances</span>
                <span style={{ fontSize: '13px', fontWeight: '500' }}>{formatCurrency(currentSalary.allowances)}</span>
              </div>
              <hr style={{ margin: '10px 0' }} />
              <div className="d-flex justify-content-between mb-3">
                <span style={{ fontSize: '14px', fontWeight: '600' }}>Gross Salary</span>
                <span style={{ fontSize: '14px', fontWeight: '600' }}>{formatCurrency(currentSalary.amount)}</span>
              </div>
            </div>
            
            <div className="mb-3">
              <h6 style={{ color: colors.darkGray, fontSize: '14px', marginBottom: '10px' }}>Deductions</h6>
              <div className="d-flex justify-content-between mb-2">
                <span style={{ fontSize: '13px' }}>Provident Fund</span>
                <span style={{ fontSize: '13px', fontWeight: '500' }}>{formatCurrency(currentSalary.pf)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span style={{ fontSize: '13px' }}>Tax</span>
                <span style={{ fontSize: '13px', fontWeight: '500' }}>{formatCurrency(currentSalary.tax)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span style={{ fontSize: '13px' }}>Other Deductions</span>
                <span style={{ fontSize: '13px', fontWeight: '500' }}>{formatCurrency(currentSalary.otherDeductions)}</span>
              </div>
              <hr style={{ margin: '10px 0' }} />
              <div className="d-flex justify-content-between mb-3">
                <span style={{ fontSize: '14px', fontWeight: '600' }}>Total Deductions</span>
                <span style={{ fontSize: '14px', fontWeight: '600' }}>{formatCurrency(currentSalary.deductions)}</span>
              </div>
            </div>
            
            <div style={{ 
              backgroundColor: colors.lightRed, 
              padding: '10px', 
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div className="d-flex justify-content-between">
                <span style={{ fontSize: '14px', fontWeight: '600' }}>Net Salary</span>
                <span style={{ fontSize: '16px', fontWeight: '700', color: colors.primaryRed }}>
                  {formatCurrency(currentSalary.netSalary)}
                </span>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Salary History Card */}
        <Card style={cardStyle}>
          <div style={headerStyle}>
            <FaCalendarAlt className="me-2" />
            Salary History
          </div>
          <Card.Body className="p-3">
            <div className="table-responsive">
              <Table hover className="align-middle" style={{ fontSize: '14px' }}>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Gross Salary</th>
                    <th>Deductions</th>
                    <th>Net Salary</th>
                    <th>Status</th>
                    <th>Payment Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {salaryHistory.map((salary) => (
                    <tr key={salary.id}>
                      <td style={{ fontWeight: '600', fontSize: '13px' }}>{salary.month}</td>
                      <td style={{ fontSize: '13px' }}>{formatCurrency(salary.amount)}</td>
                      <td style={{ color: colors.darkGray, fontSize: '13px' }}>{formatCurrency(salary.deductions)}</td>
                      <td style={{ fontWeight: '600', color: colors.successGreen, fontSize: '13px' }}>
                        {formatCurrency(salary.netSalary)}
                      </td>
                      <td>
                        <Badge 
                          bg={salary.status === 'Paid' ? 'success' : 'warning'}
                          style={{ fontSize: '12px' }}
                        >
                          {salary.status === 'Paid' ? 
                            <><FaCheckCircle className="me-1" /> Paid</> :
                            <><FaTimesCircle className="me-1" /> Unpaid</>
                          }
                        </Badge>
                      </td>
                      <td style={{ fontSize: '13px' }}>{formatDate(salary.paymentDate)}</td>
                      <td>
                        <Button 
                          variant="link" 
                          size="sm"
                          style={{ color: colors.primaryRed, padding: '0', textDecoration: 'none', fontSize: '13px' }}
                          onClick={() => handleDownloadPayslip(salary)}
                          disabled={!salary.payslipAvailable}
                        >
                          <FaDownload /> Download
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>

        {/* Salary Analysis Section */}
        <Row>
          <Col lg={6} md={12}>
            <Card style={cardStyle}>
              <div style={headerStyle}>
                <FaChartBar className="me-2" />
                Yearly Salary Analysis
              </div>
              <Card.Body className="p-3">
                <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ textAlign: 'center' }}>
                    <FaChartBar size={40} color={colors.primaryRed} />
                    <h5 style={{ color: colors.darkGray, marginTop: '15px', fontSize: '16px' }}>Chart Placeholder</h5>
                    <p style={{ color: colors.darkGray, fontSize: '12px' }}>
                      Yearly salary trend chart will be displayed here
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={6} md={12}>
            <Card style={cardStyle}>
              <div style={headerStyle}>
                <FaReceipt className="me-2" />
                Salary Summary
              </div>
              <Card.Body className="p-3">
                <div className="mb-3">
                  <h6 style={{ color: colors.darkGray, fontSize: '14px', marginBottom: '8px' }}>Year-to-Date Summary</h6>
                  <div className="d-flex justify-content-between mb-2">
                    <span style={{ fontSize: '13px' }}>Total Gross Salary</span>
                    <span style={{ fontSize: '13px', fontWeight: '500' }}>{formatCurrency(300000)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span style={{ fontSize: '13px' }}>Total Deductions</span>
                    <span style={{ fontSize: '13px', fontWeight: '500' }}>{formatCurrency(45000)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span style={{ fontSize: '13px' }}>Net Salary Received</span>
                    <span style={{ fontSize: '13px', fontWeight: '500' }}>{formatCurrency(255000)}</span>
                  </div>
                  <hr style={{ margin: '8px 0' }} />
                  <div className="d-flex justify-content-between mb-2">
                    <span style={{ fontSize: '14px', fontWeight: '600' }}>Average Monthly Salary</span>
                    <span style={{ fontSize: '14px', fontWeight: '600' }}>{formatCurrency(75000)}</span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <h6 style={{ color: colors.darkGray, fontSize: '14px', marginBottom: '8px' }}>Tax Information</h6>
                  <div className="d-flex justify-content-between mb-2">
                    <span style={{ fontSize: '13px' }}>Tax Deducted (YTD)</span>
                    <span style={{ fontSize: '13px', fontWeight: '500' }}>{formatCurrency(20000)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span style={{ fontSize: '13px' }}>Estimated Annual Tax</span>
                    <span style={{ fontSize: '13px', fontWeight: '500' }}>{formatCurrency(60000)}</span>
                  </div>
                </div>
                
                <Button 
                  style={secondaryButtonStyle}
                  className="w-100"
                  onMouseEnter={(e) => e.target.style.backgroundColor = colors.lightRed}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  View Detailed Tax Report
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Payslip Download Modal */}
      <Modal show={showPayslipModal} onHide={() => setShowPayslipModal(false)} centered size="md">
        <Modal.Header closeButton style={{ backgroundColor: colors.primaryRed, color: colors.white }}>
          <Modal.Title>Download Salary Slip</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSalary && (
            <div>
              <div className="text-center mb-4">
                <div style={{ 
                  backgroundColor: colors.lightRed, 
                  padding: '15px', 
                  borderRadius: '8px',
                  marginBottom: '15px'
                }}>
                  <h5 style={{ color: colors.darkGray, marginBottom: '5px', fontSize: '14px' }}>Salary Slip for</h5>
                  <h4 style={{ color: colors.black, fontWeight: '600', fontSize: '18px' }}>{selectedSalary.month}</h4>
                </div>
              </div>
              
              <Row className="mb-3">
                <Col md={6}>
                  <h6 style={{ color: colors.darkGray, fontSize: '13px' }}>Gross Salary</h6>
                  <p style={{ color: colors.black, fontWeight: '600', margin: 0, fontSize: '16px' }}>
                    {formatCurrency(selectedSalary.amount)}
                  </p>
                </Col>
                <Col md={6}>
                  <h6 style={{ color: colors.darkGray, fontSize: '13px' }}>Net Salary</h6>
                  <p style={{ color: colors.successGreen, fontWeight: '600', margin: 0, fontSize: '16px' }}>
                    {formatCurrency(selectedSalary.netSalary)}
                  </p>
                </Col>
              </Row>
              
              <Row className="mb-3">
                <Col md={6}>
                  <h6 style={{ color: colors.darkGray, fontSize: '13px' }}>Deductions</h6>
                  <p style={{ color: colors.black, margin: 0, fontSize: '14px' }}>
                    {formatCurrency(selectedSalary.deductions)}
                  </p>
                </Col>
                <Col md={6}>
                  <h6 style={{ color: colors.darkGray, fontSize: '13px' }}>Payment Status</h6>
                  <Badge bg={selectedSalary.status === 'Paid' ? 'success' : 'warning'}>
                    {selectedSalary.status}
                  </Badge>
                </Col>
              </Row>
              
              <div className="text-center mt-4">
                <Button 
                  style={buttonStyle}
                  onMouseEnter={(e) => e.target.style.backgroundColor = colors.darkRed}
                  onMouseLeave={(e) => e.target.style.backgroundColor = colors.primaryRed}
                  onClick={handleActualDownload}
                >
                  <FaDownload className="me-1" />
                  Confirm Download
                </Button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MySalary;