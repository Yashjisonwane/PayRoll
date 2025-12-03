// src/pages/Employee/MySalary.js
import React, { useState, useEffect } from 'react';
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
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Color Palette
const colors = {
  primaryRed: '#C62828',
  darkRed: '#B71C1C',
  white: '#FFFFFF',
  black: '#000000',
  darkGray: '#4A4A4A',
  lightGray: '#E2E2E2',
  lightBg: '#FFFFFF',
  successGreen: '#28A745',
  warningOrange: '#FFC107',
  lightRed: '#FFEBEE',
};

const MySalary = () => {
  const navigate = useNavigate();
  const [showPayslipModal, setShowPayslipModal] = useState(false);
  const [selectedSalary, setSelectedSalary] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // Employee data - can be fetched from API or context
  const employeeData = {
    name: 'Rahul Sharma',
    id: 'EMP102',
    department: 'Engineering',
    bankAccount: 'XXXXXX1234',
  };
  
  // Track window width for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
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
      netSalary: 63000,
      basicPay: 50000,
      hra: 15000,
      allowances: 10000,
      pf: 6000,
      tax: 5000,
      otherDeductions: 1000,
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
      netSalary: 63500,
      basicPay: 50000,
      hra: 15000,
      allowances: 10000,
      pf: 6000,
      tax: 5000,
      otherDeductions: 500,
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
      netSalary: 64000,
      basicPay: 50000,
      hra: 15000,
      allowances: 10000,
      pf: 6000,
      tax: 5000,
      otherDeductions: 0,
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
      netSalary: 64500,
      basicPay: 50000,
      hra: 15000,
      allowances: 10000,
      pf: 6000,
      tax: 4500,
      otherDeductions: 0,
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
      netSalary: 63000,
      basicPay: 50000,
      hra: 15000,
      allowances: 10000,
      pf: 6000,
      tax: 5000,
      otherDeductions: 1000,
    },
  ]);

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: windowWidth < 768 ? '0 10px' : '0 15px',
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
    fontSize: windowWidth < 768 ? '12px' : '14px',
  };

  const buttonStyle = {
    backgroundColor: colors.primaryRed,
    color: colors.white,
    border: 'none',
    padding: windowWidth < 768 ? '4px 8px' : '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontWeight: '500',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: windowWidth < 768 ? '10px' : '12px',
  };

  const secondaryButtonStyle = {
    backgroundColor: 'transparent',
    color: colors.primaryRed,
    border: `1px solid ${colors.primaryRed}`,
    padding: windowWidth < 768 ? '4px 8px' : '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontWeight: '500',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: windowWidth < 768 ? '10px' : '12px',
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

  // Function to generate and download payslip PDF
  const generatePayslipPDF = (salary) => {
    try {
      // Create a new jsPDF instance
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      
      // Helper function to draw a line
      const drawLine = (y) => {
        doc.setDrawColor(200, 200, 200);
        doc.line(20, y, pageWidth - 20, y);
      };

      // Payslip Title
      doc.setFontSize(22);
      doc.setTextColor(colors.primaryRed);
      doc.text('Salary Slip', pageWidth / 2, 25, { align: 'center' });
      
      // Pay Period
      doc.setFontSize(14);
      doc.setTextColor(100);
      doc.text(`Pay Period: ${salary.month}`, pageWidth / 2, 35, { align: 'center' });
      
      drawLine(45);

      // Employee Details Section
      doc.setFontSize(16);
      doc.setTextColor(0);
      doc.text('Employee Details', 20, 58);
      
      doc.setFontSize(12);
      doc.setTextColor(60);
      doc.text(`Name: ${employeeData.name}`, 20, 68);
      doc.text(`Employee ID: ${employeeData.id}`, 20, 76);
      doc.text(`Department: ${employeeData.department}`, 20, 84);
      doc.text(`Bank Account: ${employeeData.bankAccount}`, 20, 92);
      
      // Earnings Section
      doc.setFontSize(16);
      doc.text('Earnings', pageWidth / 2, 58);
      
      // Add earnings data manually instead of using autoTable
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text('Basic Salary:', pageWidth / 2, 68);
      doc.text(formatCurrency(salary.basicPay), pageWidth - 20, 68, { align: 'right' });
      
      doc.text('House Rent Allowance (HRA):', pageWidth / 2, 76);
      doc.text(formatCurrency(salary.hra), pageWidth - 20, 76, { align: 'right' });
      
      doc.text('Other Allowances:', pageWidth / 2, 84);
      doc.text(formatCurrency(salary.allowances), pageWidth - 20, 84, { align: 'right' });
      
      // Gross Salary
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.setFont(undefined, 'bold');
      doc.text('Gross Earnings:', pageWidth / 2, 92);
      doc.text(formatCurrency(salary.amount), pageWidth - 20, 92, { align: 'right' });

      drawLine(102);

      // Deductions Section
      doc.setFontSize(16);
      doc.setTextColor(0);
      doc.setFont(undefined, 'normal');
      doc.text('Deductions', 20, 112);
      
      // Add deductions data manually instead of using autoTable
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text('Provident Fund (PF):', 20, 122);
      doc.text(formatCurrency(salary.pf), 110, 122, { align: 'right' });
      
      doc.text('Income Tax:', 20, 130);
      doc.text(formatCurrency(salary.tax), 110, 130, { align: 'right' });
      
      doc.text('Other Deductions:', 20, 138);
      doc.text(formatCurrency(salary.otherDeductions), 110, 138, { align: 'right' });
      
      // Total Deductions
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.setFont(undefined, 'bold');
      doc.text('Total Deductions:', 20, 146);
      doc.text(formatCurrency(salary.deductions), 110, 146, { align: 'right' });

      drawLine(156);

      // Net Salary Section
      doc.setFillColor(colors.primaryRed);
      doc.rect(20, 166, pageWidth - 40, 20, 'F');
      
      doc.setFontSize(16);
      doc.setTextColor(255);
      doc.text('Net Salary for month:', 25, 180);
      doc.setFontSize(18);
      doc.text(formatCurrency(salary.netSalary), pageWidth - 25, 180, { align: 'right' });
      
      // Payment Details
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.setFont(undefined, 'normal');
      doc.text(`Payment Date: ${formatDate(salary.paymentDate)}`, 20, 200);
      doc.text(`Status: ${salary.status}`, 20, 208);
      
      // Footer
      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text('This is a computer-generated document and does not require a signature.', pageWidth / 2, doc.internal.pageSize.getHeight() - 15, { align: 'center' });
      
      // Save PDF
      doc.save(`SalarySlip_${salary.month.replace(' ', '_')}.pdf`);
      
      // Show success message
      alert('Salary slip downloaded successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error downloading salary slip. Please try again.');
    }
  };

  const handleActualDownload = () => {
    if (selectedSalary) {
      console.log('Generating PDF for:', selectedSalary.month);
      generatePayslipPDF(selectedSalary);
      setShowPayslipModal(false);
    }
  };

  // Responsive salary history table component
  const ResponsiveSalaryHistoryTable = () => {
    if (windowWidth < 768) {
      // Mobile view - card layout
      return (
        <div className="salary-history-cards">
          {salaryHistory.map((salary) => (
            <Card key={salary.id} className="mb-3" style={{ border: `1px solid ${colors.lightGray}` }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h6 style={{ fontSize: '14px', fontWeight: '600' }}>{salary.month}</h6>
                    <Badge 
                      bg={salary.status === 'Paid' ? 'success' : 'warning'}
                      style={{ fontSize: '12px' }}
                    >
                      {salary.status === 'Paid' ? 
                        <><FaCheckCircle className="me-1" /> Paid</> :
                        <><FaTimesCircle className="me-1" /> Unpaid</>
                      }
                    </Badge>
                  </div>
                  <h5 style={{ color: colors.successGreen, fontWeight: '600', fontSize: '16px' }}>
                    {formatCurrency(salary.netSalary)}
                  </h5>
                </div>
                <div className="mb-2">
                  <p style={{ margin: 0, fontSize: '12px', color: colors.darkGray }}>
                    Gross: {formatCurrency(salary.amount)} | 
                    Deductions: {formatCurrency(salary.deductions)}
                  </p>
                  <p style={{ margin: 0, fontSize: '12px', color: colors.darkGray }}>
                    Payment Date: {formatDate(salary.paymentDate)}
                  </p>
                </div>
                <div className="text-end">
                  <Button 
                    variant="link" 
                    size="sm"
                    style={{ color: colors.primaryRed, padding: '0', fontSize: '12px' }}
                    onClick={() => handleDownloadPayslip(salary)}
                    disabled={!salary.payslipAvailable}
                  >
                    <FaDownload /> Download
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
      );
    }
  };

  return (
    <div style={{minHeight: '100vh', backgroundColor: colors.lightBg }}>
      <div style={containerStyle} className="py-4">
        {/* Header with Back Button */}
        <div className="d-flex align-items-center mb-4">
          <Button 
            variant="link" 
            className="p-0 me-3"
            style={{ color: colors.primaryRed }}
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft size={20} />
          </Button>
          <h2 style={{ color: colors.black, margin: 0, fontSize: windowWidth < 768 ? '18px' : '24px' }}>
            My Salary
          </h2>
        </div>

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
                  <h5 style={{ color: colors.darkGray, marginBottom: '5px', fontSize: windowWidth < 768 ? '12px' : '14px' }}>Monthly Salary</h5>
                  <h2 style={{ color: colors.primaryRed, fontWeight: '700', margin: 0, fontSize: windowWidth < 768 ? '20px' : '24px' }}>
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
                        <h6 style={{ color: colors.darkGray, margin: 0, fontSize: windowWidth < 768 ? '11px' : '12px' }}>Employer</h6>
                        <p style={{ color: colors.black, margin: 0, fontWeight: '500', fontSize: windowWidth < 768 ? '12px' : '14px' }}>
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
                        <h6 style={{ color: colors.darkGray, margin: 0, fontSize: windowWidth < 768 ? '11px' : '12px' }}>Status</h6>
                        <Badge 
                          bg={currentSalary.status === 'Paid' ? 'success' : 'warning'}
                          style={{ fontSize: windowWidth < 768 ? '10px' : '12px', padding: '3px 8px' }}
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
                        <h6 style={{ color: colors.darkGray, margin: 0, fontSize: windowWidth < 768 ? '11px' : '12px' }}>Payment Date</h6>
                        <p style={{ color: colors.black, margin: 0, fontWeight: '500', fontSize: windowWidth < 768 ? '12px' : '14px' }}>
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
                        {windowWidth < 768 ? 'Download Slip' : 'Download Salary Slip'}
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
              <h6 style={{ color: colors.darkGray, fontSize: windowWidth < 768 ? '12px' : '14px', marginBottom: '10px' }}>Earnings</h6>
              <div className="d-flex justify-content-between mb-2">
                <span style={{ fontSize: windowWidth < 768 ? '11px' : '13px' }}>Basic Pay</span>
                <span style={{ fontSize: windowWidth < 768 ? '11px' : '13px', fontWeight: '500' }}>{formatCurrency(currentSalary.basicPay)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span style={{ fontSize: windowWidth < 768 ? '11px' : '13px' }}>HRA</span>
                <span style={{ fontSize: windowWidth < 768 ? '11px' : '13px', fontWeight: '500' }}>{formatCurrency(currentSalary.hra)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span style={{ fontSize: windowWidth < 768 ? '11px' : '13px' }}>Other Allowances</span>
                <span style={{ fontSize: windowWidth < 768 ? '11px' : '13px', fontWeight: '500' }}>{formatCurrency(currentSalary.allowances)}</span>
              </div>
              <hr style={{ margin: '10px 0' }} />
              <div className="d-flex justify-content-between mb-3">
                <span style={{ fontSize: windowWidth < 768 ? '12px' : '14px', fontWeight: '600' }}>Gross Salary</span>
                <span style={{ fontSize: windowWidth < 768 ? '12px' : '14px', fontWeight: '600' }}>{formatCurrency(currentSalary.amount)}</span>
              </div>
            </div>
            
            <div className="mb-3">
              <h6 style={{ color: colors.darkGray, fontSize: windowWidth < 768 ? '12px' : '14px', marginBottom: '10px' }}>Deductions</h6>
              <div className="d-flex justify-content-between mb-2">
                <span style={{ fontSize: windowWidth < 768 ? '11px' : '13px' }}>Provident Fund</span>
                <span style={{ fontSize: windowWidth < 768 ? '11px' : '13px', fontWeight: '500' }}>{formatCurrency(currentSalary.pf)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span style={{ fontSize: windowWidth < 768 ? '11px' : '13px' }}>Tax</span>
                <span style={{ fontSize: windowWidth < 768 ? '11px' : '13px', fontWeight: '500' }}>{formatCurrency(currentSalary.tax)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span style={{ fontSize: windowWidth < 768 ? '11px' : '13px' }}>Other Deductions</span>
                <span style={{ fontSize: windowWidth < 768 ? '11px' : '13px', fontWeight: '500' }}>{formatCurrency(currentSalary.otherDeductions)}</span>
              </div>
              <hr style={{ margin: '10px 0' }} />
              <div className="d-flex justify-content-between mb-3">
                <span style={{ fontSize: windowWidth < 768 ? '12px' : '14px', fontWeight: '600' }}>Total Deductions</span>
                <span style={{ fontSize: windowWidth < 768 ? '12px' : '14px', fontWeight: '600' }}>{formatCurrency(currentSalary.deductions)}</span>
              </div>
            </div>
            
            <div style={{ 
              backgroundColor: colors.lightRed, 
              padding: '10px', 
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div className="d-flex justify-content-between">
                <span style={{ fontSize: windowWidth < 768 ? '12px' : '14px', fontWeight: '600' }}>Net Salary</span>
                <span style={{ fontSize: windowWidth < 768 ? '14px' : '16px', fontWeight: '700', color: colors.primaryRed }}>
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
            <ResponsiveSalaryHistoryTable />
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
                    <h5 style={{ color: colors.darkGray, marginTop: '15px', fontSize: windowWidth < 768 ? '14px' : '16px' }}>Chart Placeholder</h5>
                    <p style={{ color: colors.darkGray, fontSize: windowWidth < 768 ? '10px' : '12px' }}>
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
                  <h6 style={{ color: colors.darkGray, fontSize: windowWidth < 768 ? '12px' : '14px', marginBottom: '8px' }}>Year-to-Date Summary</h6>
                  <div className="d-flex justify-content-between mb-2">
                    <span style={{ fontSize: windowWidth < 768 ? '11px' : '13px' }}>Total Gross Salary</span>
                    <span style={{ fontSize: windowWidth < 768 ? '11px' : '13px', fontWeight: '500' }}>{formatCurrency(300000)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span style={{ fontSize: windowWidth < 768 ? '11px' : '13px' }}>Total Deductions</span>
                    <span style={{ fontSize: windowWidth < 768 ? '11px' : '13px', fontWeight: '500' }}>{formatCurrency(45000)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span style={{ fontSize: windowWidth < 768 ? '11px' : '13px' }}>Net Salary Received</span>
                    <span style={{ fontSize: windowWidth < 768 ? '11px' : '13px', fontWeight: '500' }}>{formatCurrency(255000)}</span>
                  </div>
                  <hr style={{ margin: '8px 0' }} />
                  <div className="d-flex justify-content-between mb-2">
                    <span style={{ fontSize: windowWidth < 768 ? '12px' : '14px', fontWeight: '600' }}>Average Monthly Salary</span>
                    <span style={{ fontSize: windowWidth < 768 ? '12px' : '14px', fontWeight: '600' }}>{formatCurrency(75000)}</span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <h6 style={{ color: colors.darkGray, fontSize: windowWidth < 768 ? '12px' : '14px', marginBottom: '8px' }}>Tax Information</h6>
                  <div className="d-flex justify-content-between mb-2">
                    <span style={{ fontSize: windowWidth < 768 ? '11px' : '13px' }}>Tax Deducted (YTD)</span>
                    <span style={{ fontSize: windowWidth < 768 ? '11px' : '13px', fontWeight: '500' }}>{formatCurrency(20000)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span style={{ fontSize: windowWidth < 768 ? '11px' : '13px' }}>Estimated Annual Tax</span>
                    <span style={{ fontSize: windowWidth < 768 ? '11px' : '13px', fontWeight: '500' }}>{formatCurrency(60000)}</span>
                  </div>
                </div>
                
                <Button 
                  style={secondaryButtonStyle}
                  className="w-100"
                  onMouseEnter={(e) => e.target.style.backgroundColor = colors.lightRed}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  {windowWidth < 768 ? 'Tax Report' : 'View Detailed Tax Report'}
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