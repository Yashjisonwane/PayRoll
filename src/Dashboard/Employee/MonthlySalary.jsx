// src/pages/Employee/MonthlySalaryHistory.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Table, Badge, Button, Modal, Form, InputGroup, Dropdown } from 'react-bootstrap';
import { 
  FaMoneyBillWave, 
  FaCalendarAlt, 
  FaDownload, 
  FaBuilding,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowLeft,
  FaReceipt,
  FaInfoCircle,
  FaSearch,
  FaFilter,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaFileInvoiceDollar,
  FaMinusCircle,
  FaPlusCircle,
  FaEllipsisV
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

const MonthlySalaryHistory = () => {
  const navigate = useNavigate();
  const [showPayslipModal, setShowPayslipModal] = useState(false);
  const [showDeductionModal, setShowDeductionModal] = useState(false);
  const [selectedSalary, setSelectedSalary] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('month');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterYear, setFilterYear] = useState('all');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // Track window width for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const [salaryHistory, setSalaryHistory] = useState([
    { 
      id: 1, 
      month: 'July 2023', 
      grossSalary: 75000, 
      deductions: 12000,
      netSalary: 63000,
      status: 'Paid', 
      paymentDate: '2023-07-25',
      modeOfPayment: 'Bank Transfer',
      billDeductions: [
        { name: 'Electricity', amount: 3500, autoDeducted: true },
        { name: 'Internet', amount: 1200, autoDeducted: true },
        { name: 'Gas', amount: 800, autoDeducted: false }
      ]
    },
    { 
      id: 2, 
      month: 'June 2023', 
      grossSalary: 75000, 
      deductions: 11500,
      netSalary: 63500,
      status: 'Paid', 
      paymentDate: '2023-06-25',
      modeOfPayment: 'Bank Transfer',
      billDeductions: [
        { name: 'Electricity', amount: 3200, autoDeducted: true },
        { name: 'Internet', amount: 1200, autoDeducted: true },
        { name: 'Gas', amount: 750, autoDeducted: false }
      ]
    },
    { 
      id: 3, 
      month: 'May 2023', 
      grossSalary: 75000, 
      deductions: 11000,
      netSalary: 64000,
      status: 'Paid', 
      paymentDate: '2023-05-25',
      modeOfPayment: 'Bank Transfer',
      billDeductions: [
        { name: 'Electricity', amount: 3000, autoDeducted: true },
        { name: 'Internet', amount: 1200, autoDeducted: true },
        { name: 'Gas', amount: 700, autoDeducted: false }
      ]
    },
    { 
      id: 4, 
      month: 'April 2023', 
      grossSalary: 75000, 
      deductions: 10500,
      netSalary: 64500,
      status: 'Paid', 
      paymentDate: '2023-04-25',
      modeOfPayment: 'Bank Transfer',
      billDeductions: [
        { name: 'Electricity', amount: 2800, autoDeducted: true },
        { name: 'Internet', amount: 1200, autoDeducted: true },
        { name: 'Gas', amount: 650, autoDeducted: false }
      ]
    },
    { 
      id: 5, 
      month: 'March 2023', 
      grossSalary: 75000, 
      deductions: 10000,
      netSalary: 65000,
      status: 'Paid', 
      paymentDate: '2023-03-25',
      modeOfPayment: 'Bank Transfer',
      billDeductions: [
        { name: 'Electricity', amount: 2600, autoDeducted: true },
        { name: 'Internet', amount: 1200, autoDeducted: true },
        { name: 'Gas', amount: 600, autoDeducted: false }
      ]
    },
    { 
      id: 6, 
      month: 'February 2023', 
      grossSalary: 75000, 
      deductions: 9500,
      netSalary: 65500,
      status: 'Paid', 
      paymentDate: '2023-02-25',
      modeOfPayment: 'Bank Transfer',
      billDeductions: [
        { name: 'Electricity', amount: 2400, autoDeducted: true },
        { name: 'Internet', amount: 1200, autoDeducted: true },
        { name: 'Gas', amount: 550, autoDeducted: false }
      ]
    },
    { 
      id: 7, 
      month: 'January 2023', 
      grossSalary: 75000, 
      deductions: 9000,
      netSalary: 66000,
      status: 'Paid', 
      paymentDate: '2023-01-25',
      modeOfPayment: 'Bank Transfer',
      billDeductions: [
        { name: 'Electricity', amount: 2200, autoDeducted: true },
        { name: 'Internet', amount: 1200, autoDeducted: true },
        { name: 'Gas', amount: 500, autoDeducted: false }
      ]
    },
    { 
      id: 8, 
      month: 'December 2022', 
      grossSalary: 75000, 
      deductions: 8500,
      netSalary: 66500,
      status: 'Paid', 
      paymentDate: '2022-12-25',
      modeOfPayment: 'Bank Transfer',
      billDeductions: [
        { name: 'Electricity', amount: 2000, autoDeducted: true },
        { name: 'Internet', amount: 1200, autoDeducted: true },
        { name: 'Gas', amount: 450, autoDeducted: false }
      ]
    },
    { 
      id: 9, 
      month: 'November 2022', 
      grossSalary: 75000, 
      deductions: 8000,
      netSalary: 67000,
      status: 'Paid', 
      paymentDate: '2022-11-25',
      modeOfPayment: 'Bank Transfer',
      billDeductions: [
        { name: 'Electricity', amount: 1800, autoDeducted: true },
        { name: 'Internet', amount: 1200, autoDeducted: true },
        { name: 'Gas', amount: 400, autoDeducted: false }
      ]
    },
    { 
      id: 10, 
      month: 'October 2022', 
      grossSalary: 75000, 
      deductions: 7500,
      netSalary: 67500,
      status: 'Paid', 
      paymentDate: '2022-10-25',
      modeOfPayment: 'Bank Transfer',
      billDeductions: [
        { name: 'Electricity', amount: 1600, autoDeducted: true },
        { name: 'Internet', amount: 1200, autoDeducted: true },
        { name: 'Gas', amount: 350, autoDeducted: false }
      ]
    },
    { 
      id: 11, 
      month: 'September 2022', 
      grossSalary: 75000, 
      deductions: 7000,
      netSalary: 68000,
      status: 'Paid', 
      paymentDate: '2022-09-25',
      modeOfPayment: 'Bank Transfer',
      billDeductions: [
        { name: 'Electricity', amount: 1400, autoDeducted: true },
        { name: 'Internet', amount: 1200, autoDeducted: true },
        { name: 'Gas', amount: 300, autoDeducted: false }
      ]
    },
    { 
      id: 12, 
      month: 'August 2022', 
      grossSalary: 75000, 
      deductions: 6500,
      netSalary: 68500,
      status: 'Paid', 
      paymentDate: '2022-08-25',
      modeOfPayment: 'Bank Transfer',
      billDeductions: [
        { name: 'Electricity', amount: 1200, autoDeducted: true },
        { name: 'Internet', amount: 1200, autoDeducted: true },
        { name: 'Gas', amount: 250, autoDeducted: false }
      ]
    }
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
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDownloadPayslip = (salary) => {
    setSelectedSalary(salary);
    setShowPayslipModal(true);
  };

  const handleViewDeductions = (salary) => {
    setSelectedSalary(salary);
    setShowDeductionModal(true);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return <FaSort />;
    return sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  const applyFiltersAndSort = () => {
    let filtered = [...salaryHistory];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(salary => 
        salary.month.toLowerCase().includes(searchTerm.toLowerCase()) ||
        salary.modeOfPayment.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply year filter
    if (filterYear !== 'all') {
      filtered = filtered.filter(salary => 
        salary.month.includes(filterYear)
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'month') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (sortBy === 'grossSalary' || sortBy === 'deductions' || sortBy === 'netSalary') {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    return filtered;
  };

  const filteredSalaryHistory = applyFiltersAndSort();

  // Get unique years for filter dropdown
  const years = [...new Set(salaryHistory.map(salary => salary.month.split(' ')[1]))];

  // Responsive salary table component
  const ResponsiveSalaryTable = () => {
    if (windowWidth < 768) {
      // Mobile view - card layout
      return (
        <div className="salary-cards">
          {filteredSalaryHistory.map(salary => (
            <Card key={salary.id} className="mb-3" style={{ border: `1px solid ${colors.lightGray}` }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h5 style={{ fontSize: '14px', fontWeight: '600', margin: 0 }}>{salary.month}</h5>
                    <Badge 
                      bg={salary.status === 'Paid' ? 'success' : 'warning'}
                      style={{ fontSize: '11px' }}
                    >
                      {salary.status}
                    </Badge>
                  </div>
                  <h5 style={{ fontSize: '14px', fontWeight: '600', color: colors.primaryRed, margin: 0 }}>
                    {formatCurrency(salary.netSalary)}
                  </h5>
                </div>
                
                <div className="mb-2">
                  <div className="d-flex justify-content-between mb-1">
                    <span style={{ fontSize: '12px', color: colors.darkGray }}>Gross Salary:</span>
                    <span style={{ fontSize: '12px' }}>{formatCurrency(salary.grossSalary)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <span style={{ fontSize: '12px', color: colors.darkGray }}>Deductions:</span>
                    <span style={{ fontSize: '12px' }}>{formatCurrency(salary.deductions)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <span style={{ fontSize: '12px', color: colors.darkGray }}>Payment Date:</span>
                    <span style={{ fontSize: '12px' }}>{formatDate(salary.paymentDate)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span style={{ fontSize: '12px', color: colors.darkGray }}>Mode:</span>
                    <span style={{ fontSize: '12px' }}>{salary.modeOfPayment}</span>
                  </div>
                </div>
                
                <div className="d-flex justify-content-between">
                  <Button 
                    variant="link" 
                    size="sm"
                    style={{ color: colors.primaryRed, padding: '0', fontSize: '12px' }}
                    onClick={() => handleViewDeductions(salary)}
                  >
                    <FaFileInvoiceDollar className="me-1" /> Deductions
                  </Button>
                  <Button 
                    variant="link" 
                    size="sm"
                    style={{ color: colors.primaryRed, padding: '0', fontSize: '12px' }}
                    onClick={() => handleDownloadPayslip(salary)}
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
          <Table hover className="align-middle" style={{ fontSize: '13px' }}>
            <thead>
              <tr>
                <th onClick={() => handleSort('month')} style={{ cursor: 'pointer' }}>
                  Month {getSortIcon('month')}
                </th>
                <th onClick={() => handleSort('grossSalary')} style={{ cursor: 'pointer' }}>
                  Gross Salary {getSortIcon('grossSalary')}
                </th>
                <th onClick={() => handleSort('deductions')} style={{ cursor: 'pointer' }}>
                  Deductions {getSortIcon('deductions')}
                </th>
                <th onClick={() => handleSort('netSalary')} style={{ cursor: 'pointer' }}>
                  Net Salary {getSortIcon('netSalary')}
                </th>
                <th>Status</th>
                <th>Payment Date</th>
                <th>Mode of Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSalaryHistory.map(salary => (
                <tr key={salary.id}>
                  <td style={{ fontWeight: '600', fontSize: '12px' }}>{salary.month}</td>
                  <td style={{ fontSize: '12px' }}>{formatCurrency(salary.grossSalary)}</td>
                  <td style={{ fontSize: '12px' }}>{formatCurrency(salary.deductions)}</td>
                  <td style={{ fontWeight: '600', fontSize: '12px', color: colors.primaryRed }}>
                    {formatCurrency(salary.netSalary)}
                  </td>
                  <td>
                    <Badge 
                      bg={salary.status === 'Paid' ? 'success' : 'warning'}
                      style={{ fontSize: '11px' }}
                    >
                      {salary.status}
                    </Badge>
                  </td>
                  <td style={{ fontSize: '12px' }}>{formatDate(salary.paymentDate)}</td>
                  <td style={{ fontSize: '12px' }}>{salary.modeOfPayment}</td>
                  <td>
                    <div className="d-flex">
                      <Button 
                        variant="link" 
                        size="sm"
                        style={{ color: colors.primaryRed, padding: '0', fontSize: '12px', marginRight: '8px' }}
                        onClick={() => handleViewDeductions(salary)}
                        title="View Deductions"
                      >
                        <FaFileInvoiceDollar />
                      </Button>
                      <Button 
                        variant="link" 
                        size="sm"
                        style={{ color: colors.primaryRed, padding: '0', fontSize: '12px' }}
                        onClick={() => handleDownloadPayslip(salary)}
                        title="Download Payslip"
                      >
                        <FaDownload />
                      </Button>
                    </div>
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
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: colors.white, 
        borderBottom: `1px solid ${colors.lightGray}`,
        padding: '12px 0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={containerStyle}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <Button 
                variant="link" 
                className="me-3 p-0"
                onClick={() => navigate('/Employee/dashboard')}
                style={{ color: colors.primaryRed }}
              >
                <FaArrowLeft size={18} />
              </Button>
              <h2 style={{ color: colors.black, margin: 0, fontSize: '20px' }}>Monthly Salary History</h2>
            </div>
            <div className="d-flex align-items-center">
              <div className="input-group me-2" style={{ maxWidth: '250px' }}>
                <span className="input-group-text" style={{ backgroundColor: colors.lightGray, border: 'none' }}>
                  <FaSearch size={14} color={colors.darkGray} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search salary history..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ fontSize: '12px' }}
                />
              </div>
              <Dropdown>
                <Dropdown.Toggle 
                  variant="outline-secondary" 
                  id="dropdown-year-filter"
                  style={{ fontSize: '12px' }}
                >
                  {filterYear === 'all' ? 'All Years' : filterYear}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setFilterYear('all')}>All Years</Dropdown.Item>
                  {years.map(year => (
                    <Dropdown.Item key={year} onClick={() => setFilterYear(year)}>
                      {year}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>

      <div style={containerStyle} className="py-4">
        {/* Summary Cards */}
        <Row className="mb-4">
          <Col xs={12} md={4}>
            <Card style={cardStyle}>
              <div style={headerStyle}>
                <FaMoneyBillWave className="me-2" />
                Salary Summary
              </div>
              <Card.Body className="p-3">
                <div className="mb-2">
                  <h6 style={{ color: colors.darkGray, fontSize: '13px', fontWeight: '500' }}>Total Gross Salary</h6>
                  <h5 style={{ color: colors.black, fontWeight: '600', fontSize: '16px' }}>
                    {formatCurrency(salaryHistory.reduce((sum, salary) => sum + salary.grossSalary, 0))}
                  </h5>
                </div>
                <div className="mb-2">
                  <h6 style={{ color: colors.darkGray, fontSize: '13px', fontWeight: '500' }}>Total Deductions</h6>
                  <h5 style={{ color: colors.black, fontWeight: '600', fontSize: '16px' }}>
                    {formatCurrency(salaryHistory.reduce((sum, salary) => sum + salary.deductions, 0))}
                  </h5>
                </div>
                <div>
                  <h6 style={{ color: colors.darkGray, fontSize: '13px', fontWeight: '500' }}>Total Net Salary</h6>
                  <h5 style={{ color: colors.primaryRed, fontWeight: '700', fontSize: '18px' }}>
                    {formatCurrency(salaryHistory.reduce((sum, salary) => sum + salary.netSalary, 0))}
                  </h5>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col xs={12} md={4}>
            <Card style={cardStyle}>
              <div style={headerStyle}>
                <FaReceipt className="me-2" />
                Bill Auto-Deduction
              </div>
              <Card.Body className="p-3">
                <div className="mb-2">
                  <h6 style={{ color: colors.darkGray, fontSize: '13px', fontWeight: '500' }}>Total Auto-Deducted</h6>
                  <h5 style={{ color: colors.black, fontWeight: '600', fontSize: '16px' }}>
                    {formatCurrency(
                      salaryHistory.reduce((sum, salary) => 
                        sum + salary.billDeductions
                          .filter(bill => bill.autoDeducted)
                          .reduce((billSum, bill) => billSum + bill.amount, 0)
                      , 0)
                    )}
                  </h5>
                </div>
                <div className="mb-2">
                  <h6 style={{ color: colors.darkGray, fontSize: '13px', fontWeight: '500' }}>Total Self-Paid</h6>
                  <h5 style={{ color: colors.black, fontWeight: '600', fontSize: '16px' }}>
                    {formatCurrency(
                      salaryHistory.reduce((sum, salary) => 
                        sum + salary.billDeductions
                          .filter(bill => !bill.autoDeducted)
                          .reduce((billSum, bill) => billSum + bill.amount, 0)
                      , 0)
                    )}
                  </h5>
                </div>
                <div>
                  <h6 style={{ color: colors.darkGray, fontSize: '13px', fontWeight: '500' }}>Total Bill Amount</h6>
                  <h5 style={{ color: colors.warningOrange, fontWeight: '700', fontSize: '18px' }}>
                    {formatCurrency(
                      salaryHistory.reduce((sum, salary) => 
                        sum + salary.billDeductions
                          .reduce((billSum, bill) => billSum + bill.amount, 0)
                      , 0)
                    )}
                  </h5>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col xs={12} md={4}>
            <Card style={cardStyle}>
              <div style={headerStyle}>
                <FaCalendarAlt className="me-2" />
                Payment Statistics
              </div>
              <Card.Body className="p-3">
                <div className="mb-2">
                  <h6 style={{ color: colors.darkGray, fontSize: '13px', fontWeight: '500' }}>Average Monthly Salary</h6>
                  <h5 style={{ color: colors.black, fontWeight: '600', fontSize: '16px' }}>
                    {formatCurrency(
                      Math.round(salaryHistory.reduce((sum, salary) => sum + salary.netSalary, 0) / salaryHistory.length)
                    )}
                  </h5>
                </div>
                <div className="mb-2">
                  <h6 style={{ color: colors.darkGray, fontSize: '13px', fontWeight: '500' }}>Highest Salary</h6>
                  <h5 style={{ color: colors.successGreen, fontWeight: '600', fontSize: '16px' }}>
                    {formatCurrency(Math.max(...salaryHistory.map(salary => salary.netSalary)))}
                  </h5>
                </div>
                <div>
                  <h6 style={{ color: colors.darkGray, fontSize: '13px', fontWeight: '500' }}>Lowest Salary</h6>
                  <h5 style={{ color: colors.warningOrange, fontWeight: '600', fontSize: '16px' }}>
                    {formatCurrency(Math.min(...salaryHistory.map(salary => salary.netSalary)))}
                  </h5>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Salary History Table */}
        <Card style={cardStyle}>
          <div style={headerStyle}>
            <FaCalendarAlt className="me-2" />
            Month-wise Salary History
            <div className="ms-auto d-flex">
              <Button 
                variant="outline-light"
                size="sm"
                className="me-2 d-none d-md-inline-flex"
                onClick={() => handleSort('month')}
              >
                Month {getSortIcon('month')}
              </Button>
              <Button 
                variant="outline-light"
                size="sm"
                className="me-2 d-none d-md-inline-flex"
                onClick={() => handleSort('netSalary')}
              >
                Amount {getSortIcon('netSalary')}
              </Button>
            </div>
          </div>
          <Card.Body className="p-3">
            {filteredSalaryHistory.length > 0 ? (
              <ResponsiveSalaryTable />
            ) : (
              <div className="text-center py-4">
                <FaCalendarAlt size={40} color={colors.lightGray} />
                <p style={{ color: colors.darkGray, marginTop: '10px', fontSize: '14px' }}>
                  No salary history found matching your criteria
                </p>
              </div>
            )}
          </Card.Body>
        </Card>
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
                    {formatCurrency(selectedSalary.grossSalary)}
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
              
              <Row className="mb-3">
                <Col md={6}>
                  <h6 style={{ color: colors.darkGray, fontSize: '13px' }}>Payment Date</h6>
                  <p style={{ color: colors.black, margin: 0, fontSize: '14px' }}>
                    {formatDate(selectedSalary.paymentDate)}
                  </p>
                </Col>
                <Col md={6}>
                  <h6 style={{ color: colors.darkGray, fontSize: '13px' }}>Mode of Payment</h6>
                  <p style={{ color: colors.black, margin: 0, fontSize: '14px' }}>
                    {selectedSalary.modeOfPayment}
                  </p>
                </Col>
              </Row>
              
              <div className="text-center mt-4">
                <Button 
                  style={buttonStyle}
                  onMouseEnter={(e) => e.target.style.backgroundColor = colors.darkRed}
                  onMouseLeave={(e) => e.target.style.backgroundColor = colors.primaryRed}
                >
                  <FaDownload className="me-1" />
                  Confirm Download
                </Button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* Bill Deductions Modal */}
      <Modal show={showDeductionModal} onHide={() => setShowDeductionModal(false)} centered size="md">
        <Modal.Header closeButton style={{ backgroundColor: colors.primaryRed, color: colors.white }}>
          <Modal.Title>Bill Deductions</Modal.Title>
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
                  <h5 style={{ color: colors.darkGray, marginBottom: '5px', fontSize: '14px' }}>Bill Deductions for</h5>
                  <h4 style={{ color: colors.black, fontWeight: '600', fontSize: '18px' }}>{selectedSalary.month}</h4>
                </div>
              </div>
              
              <div className="mb-4">
                <h6 style={{ color: colors.darkGray, fontSize: '14px', fontWeight: '500', marginBottom: '15px' }}>Bill Details</h6>
                {selectedSalary.billDeductions.map((bill, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-3 p-2" style={{ backgroundColor: colors.lightBg, borderRadius: '6px' }}>
                    <div className="d-flex align-items-center">
                      {bill.autoDeducted ? 
                        <FaMinusCircle className="me-2" color={colors.primaryRed} /> :
                        <FaPlusCircle className="me-2" color={colors.successGreen} />
                      }
                      <div>
                        <p style={{ margin: 0, color: colors.black, fontWeight: '500', fontSize: '13px' }}>{bill.name}</p>
                        <p style={{ margin: 0, color: colors.darkGray, fontSize: '11px' }}>
                          {bill.autoDeducted ? 'Auto-deducted from salary' : 'Paid separately'}
                        </p>
                      </div>
                    </div>
                    <div className="text-end">
                      <p style={{ margin: 0, color: colors.black, fontWeight: '600', fontSize: '14px' }}>
                        {formatCurrency(bill.amount)}
                      </p>
                      <Badge 
                        bg={bill.autoDeducted ? 'primary' : 'success'}
                        style={{ fontSize: '10px' }}
                      >
                        {bill.autoDeducted ? 'Auto' : 'Self'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="d-flex justify-content-between align-items-center p-2" style={{ backgroundColor: colors.lightRed, borderRadius: '6px' }}>
                <h6 style={{ color: colors.darkGray, fontSize: '14px', fontWeight: '500', margin: 0 }}>Total Bill Deductions</h6>
                <h5 style={{ color: colors.primaryRed, fontWeight: '700', fontSize: '16px', margin: 0 }}>
                  {formatCurrency(
                    selectedSalary.billDeductions.reduce((sum, bill) => sum + bill.amount, 0)
                  )}
                </h5>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MonthlySalaryHistory;