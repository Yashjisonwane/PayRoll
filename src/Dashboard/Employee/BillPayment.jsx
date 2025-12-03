// src/pages/Employee/BillPayments.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Table, Badge, Button, Modal, Form, Nav, InputGroup, Dropdown } from 'react-bootstrap';
import { 
  FaFileInvoiceDollar, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaCheckCircle,
  FaTimesCircle,
  FaArrowLeft,
  FaBuilding,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaSearch,
  FaFilter,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaMobileAlt,
  FaWindowClose,
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

const BillPayments = () => {
  const navigate = useNavigate();
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);
  const [showEditCompanyModal, setShowEditCompanyModal] = useState(false);
  const [showAddBillModal, setShowAddBillModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeTab, setActiveTab] = useState('bills');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCompany, setEditingCompany] = useState(null);
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPaidByEmployer, setFilterPaidByEmployer] = useState('all');
  
  const [companies, setCompanies] = useState([
    { id: 1, name: 'Electricity Board', category: 'Utilities', contact: '1912', website: 'www.electricityboard.gov.in' },
    { id: 2, name: 'Airtel Broadband', category: 'Internet', contact: '121', website: 'www.airtel.in' },
    { id: 3, name: 'Gas Agency', category: 'Utilities', contact: '1800-123-4567', website: 'www.gasagency.in' },
    { id: 4, name: 'Water Supply', category: 'Utilities', contact: '1800-180-1234', website: 'www.watersupply.gov.in' },
    { id: 5, name: 'Jio Fiber', category: 'Internet', contact: '1800-889-9999', website: 'www.jio.com' },
    { id: 6, name: 'BSNL Landline', category: 'Telecom', contact: '1800-345-1500', website: 'www.bsnl.co.in' },
    { id: 7, name: 'Indane Gas', category: 'Utilities', contact: '1800-233-3555', website: 'www.indane.co.in' },
    { id: 8, name: 'HDFC Life Insurance', category: 'Insurance', contact: '1800-266-9777', website: 'www.hdfclife.com' },
    { id: 9, name: 'LIC India', category: 'Insurance', contact: '022-6827-6827', website: 'www.licindia.in' },
    { id: 10, name: 'SBI Home Loan', category: 'Loan', contact: '1800-11-22-11', website: 'www.sbi.co.in' },
    { id: 11, name: 'ICICI Bank Loan', category: 'Loan', contact: '1800-103-8181', website: 'www.icicibank.com' },
    { id: 12, name: 'Airtel Mobile', category: 'Telecom', contact: '121', website: 'www.airtel.in' },
    { id: 13, name: 'Vodafone Idea', category: 'Telecom', contact: '199', website: 'www.vi.in' },
    { id: 14, name: 'Tata Sky DTH', category: 'Entertainment', contact: '1800-208-6633', website: 'www.tatasky.com' },
    { id: 15, name: 'Dish TV', category: 'Entertainment', contact: '1800-315-0315', website: 'www.dishtv.in' },
  ]);
  
  const [pendingBills, setPendingBills] = useState([
    { 
      id: 1, 
      company: 'Electricity Board', 
      billNumber: 'ELB-2023-4567',
      amount: 3500, 
      dueDate: '2023-07-15', 
      status: 'Pending',
      paidByEmployer: false,
      category: 'Utilities'
    },
    { 
      id: 2, 
      company: 'Airtel Broadband', 
      billNumber: 'AIR-2023-7890',
      amount: 1200, 
      dueDate: '2023-07-20', 
      status: 'Pending',
      paidByEmployer: true,
      category: 'Internet'
    },
    { 
      id: 3, 
      company: 'Gas Agency', 
      billNumber: 'GAS-2023-3456',
      amount: 800, 
      dueDate: '2023-07-25', 
      status: 'Pending',
      paidByEmployer: false,
      category: 'Utilities'
    },
    { 
      id: 4, 
      company: 'Jio Fiber', 
      billNumber: 'JIO-2023-9876',
      amount: 999, 
      dueDate: '2023-07-28', 
      status: 'Pending',
      paidByEmployer: false,
      category: 'Internet'
    },
    { 
      id: 5, 
      company: 'BSNL Landline', 
      billNumber: 'BSN-2023-2345',
      amount: 450, 
      dueDate: '2023-07-30', 
      status: 'Pending',
      paidByEmployer: true,
      category: 'Telecom'
    },
  ]);
  
  const [paidBills, setPaidBills] = useState([
    { 
      id: 6, 
      company: 'Water Supply', 
      billNumber: 'WTR-2023-2345',
      amount: 600, 
      dueDate: '2023-06-15', 
      paidDate: '2023-06-10', 
      status: 'Paid',
      paidByEmployer: true,
      category: 'Utilities'
    },
    { 
      id: 7, 
      company: 'Electricity Board', 
      billNumber: 'ELB-2023-3456',
      amount: 3200, 
      dueDate: '2023-06-10', 
      paidDate: '2023-06-08', 
      status: 'Paid',
      paidByEmployer: false,
      category: 'Utilities'
    },
    { 
      id: 8, 
      company: 'Indane Gas', 
      billNumber: 'IND-2023-5678',
      amount: 950, 
      dueDate: '2023-06-05', 
      paidDate: '2023-06-01', 
      status: 'Paid',
      paidByEmployer: true,
      category: 'Utilities'
    },
    { 
      id: 9, 
      company: 'HDFC Life Insurance', 
      billNumber: 'HDF-2023-8901',
      amount: 5500, 
      dueDate: '2023-05-20', 
      paidDate: '2023-05-15', 
      status: 'Paid',
      paidByEmployer: false,
      category: 'Insurance'
    },
    { 
      id: 10, 
      company: 'Tata Sky DTH', 
      billNumber: 'TAT-2023-1234',
      amount: 350, 
      dueDate: '2023-05-10', 
      paidDate: '2023-05-08', 
      status: 'Paid',
      paidByEmployer: true,
      category: 'Entertainment'
    },
  ]);
  
  const [newCompany, setNewCompany] = useState({
    name: '',
    category: 'Utilities',
    contact: '',
    website: ''
  });
  
  const [newBill, setNewBill] = useState({
    company: '',
    billNumber: '',
    amount: '',
    dueDate: '',
    paidByEmployer: false,
    category: 'Utilities'
  });

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

  const tabStyle = {
    padding: '8px 14px',
    cursor: 'pointer',
    borderBottom: '3px solid transparent',
    color: colors.darkGray,
    fontWeight: '500',
    transition: 'all 0.2s',
    fontSize: '13px',
  };

  const activeTabStyle = {
    ...tabStyle,
    color: colors.primaryRed,
    borderBottom: `3px solid ${colors.primaryRed}`,
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

  const handleAddCompany = (e) => {
    e.preventDefault();
    const newId = companies.length > 0 ? Math.max(...companies.map(c => c.id)) + 1 : 1;
    setCompanies([...companies, { ...newCompany, id: newId }]);
    setNewCompany({ name: '', category: 'Utilities', contact: '', website: '' });
    setShowAddCompanyModal(false);
  };

  const handleEditCompany = (e) => {
    e.preventDefault();
    setCompanies(companies.map(company => 
      company.id === editingCompany.id ? editingCompany : company
    ));
    setEditingCompany(null);
    setShowEditCompanyModal(false);
  };

  const handleAddBill = (e) => {
    e.preventDefault();
    const newId = pendingBills.length > 0 ? Math.max(...pendingBills.map(b => b.id)) + 1 : 1;
    const billToAdd = {
      ...newBill,
      id: newId,
      amount: parseFloat(newBill.amount),
      status: 'Pending'
    };
    setPendingBills([...pendingBills, billToAdd]);
    setNewBill({
      company: '',
      billNumber: '',
      amount: '',
      dueDate: '',
      paidByEmployer: false,
      category: 'Utilities'
    });
    setShowAddBillModal(false);
  };

  const handlePayBill = (billId) => {
    const billToPay = pendingBills.find(bill => bill.id === billId);
    if (billToPay) {
      const updatedBill = {
        ...billToPay,
        status: 'Paid',
        paidDate: new Date().toISOString().split('T')[0]
      };
      setPaidBills([...paidBills, updatedBill]);
      setPendingBills(pendingBills.filter(bill => bill.id !== billId));
    }
  };

  const handleDeleteCompany = (companyId) => {
    setCompanies(companies.filter(company => company.id !== companyId));
  };

  const handleEditCompanyClick = (company) => {
    setEditingCompany(company);
    setShowEditCompanyModal(true);
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

  const applyFilters = (bills) => {
    let filtered = bills.filter(bill => 
      bill.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.billNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (filterCategory !== 'all') {
      filtered = filtered.filter(bill => bill.category === filterCategory);
    }
    
    if (filterPaidByEmployer !== 'all') {
      filtered = filtered.filter(bill => bill.paidByEmployer === (filterPaidByEmployer === 'true'));
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'amount') {
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

  const filterCompanies = () => {
    return companies.filter(company => 
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.website.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredPendingBills = applyFilters(pendingBills);
  const filteredPaidBills = applyFilters(paidBills);
  const filteredCompanies = filterCompanies();

  const getSearchPlaceholder = () => {
    return activeTab === 'bills' ? 'Search bills...' : 'Search companies...';
  };

  return (
    <div style={{  minHeight: '100vh' }}>
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
              <h2 style={{ color: colors.black, margin: 0, fontSize: '20px' }}>Bill Payments</h2>
            </div>
            <div className="d-flex align-items-center">
              <div className="input-group me-2" style={{ maxWidth: '250px' }}>
                <span className="input-group-text" style={{ backgroundColor: colors.lightGray, border: 'none' }}>
                  <FaSearch size={14} color={colors.darkGray} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder={getSearchPlaceholder()}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ fontSize: '12px' }}
                />
              </div>
              {activeTab === 'bills' && (
                <>
                  <Button 
                    variant="outline-secondary"
                    className="me-2 d-none d-md-inline-flex"
                    onClick={() => setShowFilterModal(true)}
                    style={{ fontSize: '12px' }}
                  >
                    <FaFilter className="me-1" />
                    Filter
                  </Button>
                  <Dropdown>
                    <Dropdown.Toggle 
                      variant="outline-secondary" 
                      id="dropdown-actions"
                      className="d-md-none"
                      style={{ fontSize: '12px' }}
                    >
                      <FaEllipsisV />
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end">
                      <Dropdown.Item onClick={() => setShowFilterModal(true)}>
                        <FaFilter className="me-2" />
                        Filter
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setShowAddBillModal(true)}>
                        <FaPlus className="me-2" />
                        Add Bill
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              )}

            </div>
          </div>
        </div>
      </div>

      <div style={containerStyle} className="py-4">
        {/* Tabs */}
        <div className="d-flex mb-3" style={{ borderBottom: `1px solid ${colors.lightGray}` }}>
          <div 
            style={activeTab === 'bills' ? activeTabStyle : tabStyle}
            onClick={() => setActiveTab('bills')}
          >
            Bills ({pendingBills.length + paidBills.length})
            
          </div>
          <div 
            style={activeTab === 'companies' ? activeTabStyle : tabStyle}
            onClick={() => setActiveTab('companies')}
          >
            Companies ({companies.length})
          </div>
        </div>

        {activeTab === 'bills' && (
          <>
            {/* Pending Bills Card */}
            <Card style={cardStyle}>
              <div style={headerStyle}>
                <FaFileInvoiceDollar className="me-2" />
                Pending Bills ({filteredPendingBills.length})
                <div className="ms-auto d-flex">
                  <Button 
                    variant="outline-light"
                    size="sm"
                    className="me-2 d-none d-md-inline-flex"
                    onClick={() => handleSort('dueDate')}
                  >
                    Due Date {getSortIcon('dueDate')}
                  </Button>
                  <Button 
                    variant="outline-light"
                    size="sm"
                    className="me-2 d-none d-md-inline-flex"
                    onClick={() => handleSort('amount')}
                  >
                    Amount {getSortIcon('amount')}
                  </Button>
                  <Button 
                    style={buttonStyle}
                    onMouseEnter={(e) => e.target.style.backgroundColor = colors.darkRed}
                    onMouseLeave={(e) => e.target.style.backgroundColor = colors.primaryRed}
                    onClick={() => setShowAddBillModal(true)}
                  >
                    <FaPlus className="me-1" />
                    <span className="d-none d-md-inline">Add Bill</span>
                  </Button>
                </div>
              </div>
              <Card.Body className="p-3">
                {filteredPendingBills.length > 0 ? (
                  <div className="table-responsive">
                    <Table hover className="align-middle" style={{ fontSize: '13px' }}>
                      <thead>
                        <tr>
                          <th>Company</th>
                          <th className="d-none d-md-table-cell">Bill Number</th>
                          <th>Amount</th>
                          <th>Due Date</th>
                          <th className="d-none d-md-table-cell">Paid by Employer</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPendingBills.map((bill) => (
                          <tr key={bill.id}>
                            <td style={{ fontWeight: '600', fontSize: '12px' }}>{bill.company}</td>
                            <td className="d-none d-md-table-cell" style={{ fontSize: '12px' }}>{bill.billNumber}</td>
                            <td style={{ fontWeight: '600', fontSize: '12px' }}>{formatCurrency(bill.amount)}</td>
                            <td style={{ fontSize: '12px' }}>{formatDate(bill.dueDate)}</td>
                            <td className="d-none d-md-table-cell">
                              <Badge 
                                bg={bill.paidByEmployer ? 'success' : 'warning'}
                                style={{ fontSize: '11px' }}
                              >
                                {bill.paidByEmployer ? 'Yes' : 'No'}
                              </Badge>
                            </td>
                            <td>
                              <Button 
                                variant="link" 
                                size="sm"
                                style={{ color: colors.primaryRed, padding: '0', textDecoration: 'none', fontSize: '12px' }}
                                onClick={() => handlePayBill(bill.id)}
                              >
                                <FaMoneyBillWave /> <span className="d-none d-md-inline">Pay Now</span>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <FaFileInvoiceDollar size={40} color={colors.lightGray} />
                    <p style={{ color: colors.darkGray, marginTop: '10px' }}>No pending bills found</p>
                    <Button 
                      style={buttonStyle}
                      onMouseEnter={(e) => e.target.style.backgroundColor = colors.darkRed}
                      onMouseLeave={(e) => e.target.style.backgroundColor = colors.primaryRed}
                      onClick={() => setShowAddBillModal(true)}
                    >
                      <FaPlus className="me-1" />
                      Add New Bill
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>

            {/* Paid Bills Card */}
            <Card style={cardStyle}>
              <div style={headerStyle}>
                <FaCheckCircle className="me-2" />
                Paid Bills ({filteredPaidBills.length})
              </div>
              <Card.Body className="p-3">
                {filteredPaidBills.length > 0 ? (
                  <div className="table-responsive">
                    <Table hover className="align-middle" style={{ fontSize: '13px' }}>
                      <thead>
                        <tr>
                          <th>Company</th>
                          <th className="d-none d-md-table-cell">Bill Number</th>
                          <th>Amount</th>
                          <th>Due Date</th>
                          <th className="d-none d-md-table-cell">Paid Date</th>
                          <th className="d-none d-md-table-cell">Paid by Employer</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPaidBills.map((bill) => (
                          <tr key={bill.id}>
                            <td style={{ fontWeight: '600', fontSize: '12px' }}>{bill.company}</td>
                            <td className="d-none d-md-table-cell" style={{ fontSize: '12px' }}>{bill.billNumber}</td>
                            <td style={{ fontWeight: '600', fontSize: '12px' }}>{formatCurrency(bill.amount)}</td>
                            <td style={{ fontSize: '12px' }}>{formatDate(bill.dueDate)}</td>
                            <td className="d-none d-md-table-cell" style={{ fontSize: '12px' }}>{formatDate(bill.paidDate)}</td>
                            <td className="d-none d-md-table-cell">
                              <Badge 
                                bg={bill.paidByEmployer ? 'success' : 'warning'}
                                style={{ fontSize: '11px' }}
                              >
                                {bill.paidByEmployer ? 'Yes' : 'No'}
                              </Badge>
                            </td>
                            <td>
                              <Badge bg="success" style={{ fontSize: '11px' }}>
                                Paid
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <FaCheckCircle size={40} color={colors.lightGray} />
                    <p style={{ color: colors.darkGray, marginTop: '10px' }}>No paid bills found</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </>
        )}

        {activeTab === 'companies' && (
          <Card style={cardStyle}>
            <div style={headerStyle}>
              <FaBuilding className="me-2" />
              Bill Payment Companies
              <Button 
                style={{...buttonStyle, marginLeft: 'auto'}}
                onMouseEnter={(e) => e.target.style.backgroundColor = colors.darkRed}
                onMouseLeave={(e) => e.target.style.backgroundColor = colors.primaryRed}
                onClick={() => setShowAddCompanyModal(true)}
              >
                <FaPlus className="me-1" />
                <span className="d-none d-md-inline">Add Company</span>
              </Button>
            </div>
            <Card.Body className="p-3">
              {filteredCompanies.length > 0 ? (
                <div className="table-responsive">
                  <Table hover className="align-middle" style={{ fontSize: '13px' }}>
                    <thead>
                      <tr>
                        <th>Company Name</th>
                        <th className="d-none d-md-table-cell">Category</th>
                        <th className="d-none d-md-table-cell">Contact</th>
                        <th className="d-none d-md-table-cell">Website</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCompanies.map((company) => (
                        <tr key={company.id}>
                          <td style={{ fontWeight: '600', fontSize: '12px' }}>{company.name}</td>
                          <td className="d-none d-md-table-cell" style={{ fontSize: '12px' }}>{company.category}</td>
                          <td className="d-none d-md-table-cell" style={{ fontSize: '12px' }}>{company.contact}</td>
                          <td className="d-none d-md-table-cell" style={{ fontSize: '12px' }}>{company.website}</td>
                          <td>
                            <Button 
                              variant="link" 
                              size="sm"
                              style={{ color: colors.darkGray, padding: '0', textDecoration: 'none', fontSize: '12px', marginRight: '10px' }}
                              onClick={() => handleEditCompanyClick(company)}
                            >
                              <FaEdit />
                            </Button>
                            <Button 
                              variant="link" 
                              size="sm"
                              style={{ color: colors.primaryRed, padding: '0', textDecoration: 'none', fontSize: '12px' }}
                              onClick={() => handleDeleteCompany(company.id)}
                            >
                              <FaTrash />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-4">
                  <FaBuilding size={40} color={colors.lightGray} />
                  <p style={{ color: colors.darkGray, marginTop: '10px' }}>No companies found</p>
                  <Button 
                    style={buttonStyle}
                    onMouseEnter={(e) => e.target.style.backgroundColor = colors.darkRed}
                    onMouseLeave={(e) => e.target.style.backgroundColor = colors.primaryRed}
                    onClick={() => setShowAddCompanyModal(true)}
                  >
                    <FaPlus className="me-1" />
                    Add Company
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        )}
      </div>

      {/* Add Company Modal */}
      <Modal show={showAddCompanyModal} onHide={() => setShowAddCompanyModal(false)} centered size="md">
        <Modal.Header closeButton style={{ backgroundColor: colors.primaryRed, color: colors.white }}>
          <Modal.Title>Add New Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddCompany}>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '13px' }}>Company Name</Form.Label>
              <Form.Control
                type="text"
                value={newCompany.name}
                onChange={(e) => setNewCompany({...newCompany, name: e.target.value})}
                required
                style={{ fontSize: '13px' }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '13px' }}>Category</Form.Label>
              <Form.Select
                value={newCompany.category}
                onChange={(e) => setNewCompany({...newCompany, category: e.target.value})}
                style={{ fontSize: '13px' }}
              >
                <option value="Utilities">Utilities</option>
                <option value="Internet">Internet</option>
                <option value="Telecom">Telecom</option>
                <option value="Insurance">Insurance</option>
                <option value="Loan">Loan</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '13px' }}>Contact Number</Form.Label>
              <Form.Control
                type="text"
                value={newCompany.contact}
                onChange={(e) => setNewCompany({...newCompany, contact: e.target.value})}
                style={{ fontSize: '13px' }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '13px' }}>Website</Form.Label>
              <Form.Control
                type="text"
                value={newCompany.website}
                onChange={(e) => setNewCompany({...newCompany, website: e.target.value})}
                style={{ fontSize: '13px' }}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button 
                variant="secondary" 
                className="me-2"
                onClick={() => setShowAddCompanyModal(false)}
                style={{ fontSize: '13px' }}
              >
                Cancel
              </Button>
              <Button type="submit" style={buttonStyle}>
                Add Company
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Company Modal */}
      <Modal show={showEditCompanyModal} onHide={() => setShowEditCompanyModal(false)} centered size="md">
        <Modal.Header closeButton style={{ backgroundColor: colors.primaryRed, color: colors.white }}>
          <Modal.Title>Edit Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditCompany}>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '13px' }}>Company Name</Form.Label>
              <Form.Control
                type="text"
                value={editingCompany?.name || ''}
                onChange={(e) => setEditingCompany({...editingCompany, name: e.target.value})}
                required
                style={{ fontSize: '13px' }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '13px' }}>Category</Form.Label>
              <Form.Select
                value={editingCompany?.category || 'Utilities'}
                onChange={(e) => setEditingCompany({...editingCompany, category: e.target.value})}
                style={{ fontSize: '13px' }}
              >
                <option value="Utilities">Utilities</option>
                <option value="Internet">Internet</option>
                <option value="Telecom">Telecom</option>
                <option value="Insurance">Insurance</option>
                <option value="Loan">Loan</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '13px' }}>Contact Number</Form.Label>
              <Form.Control
                type="text"
                value={editingCompany?.contact || ''}
                onChange={(e) => setEditingCompany({...editingCompany, contact: e.target.value})}
                style={{ fontSize: '13px' }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '13px' }}>Website</Form.Label>
              <Form.Control
                type="text"
                value={editingCompany?.website || ''}
                onChange={(e) => setEditingCompany({...editingCompany, website: e.target.value})}
                style={{ fontSize: '13px' }}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button 
                variant="secondary" 
                className="me-2"
                onClick={() => setShowEditCompanyModal(false)}
                style={{ fontSize: '13px' }}
              >
                Cancel
              </Button>
              <Button type="submit" style={buttonStyle}>
                Update Company
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Add Bill Modal */}
      <Modal show={showAddBillModal} onHide={() => setShowAddBillModal(false)} centered size="md">
        <Modal.Header closeButton style={{ backgroundColor: colors.primaryRed, color: colors.white }}>
          <Modal.Title>Add New Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddBill}>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '13px' }}>Company</Form.Label>
              <Form.Select
                value={newBill.company}
                onChange={(e) => setNewBill({...newBill, company: e.target.value})}
                required
                style={{ fontSize: '13px' }}
              >
                <option value="">Select Company</option>
                {companies.map(company => (
                  <option key={company.id} value={company.name}>{company.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '13px' }}>Bill Number</Form.Label>
              <Form.Control
                type="text"
                value={newBill.billNumber}
                onChange={(e) => setNewBill({...newBill, billNumber: e.target.value})}
                required
                style={{ fontSize: '13px' }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '13px' }}>Amount</Form.Label>
              <Form.Control
                type="number"
                value={newBill.amount}
                onChange={(e) => setNewBill({...newBill, amount: e.target.value})}
                required
                style={{ fontSize: '13px' }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '13px' }}>Due Date</Form.Label>
              <Form.Control
                type="date"
                value={newBill.dueDate}
                onChange={(e) => setNewBill({...newBill, dueDate: e.target.value})}
                required
                style={{ fontSize: '13px' }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Paid by Employer"
                checked={newBill.paidByEmployer}
                onChange={(e) => setNewBill({...newBill, paidByEmployer: e.target.checked})}
                style={{ fontSize: '13px' }}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button 
                variant="secondary" 
                className="me-2"
                onClick={() => setShowAddBillModal(false)}
                style={{ fontSize: '13px' }}
              >
                Cancel
              </Button>
              <Button type="submit" style={buttonStyle}>
                Add Bill
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Filter Modal */}
      <Modal show={showFilterModal} onHide={() => setShowFilterModal(false)} centered size="md">
        <Modal.Header closeButton style={{ backgroundColor: colors.primaryRed, color: colors.white }}>
          <Modal.Title>Filter Bills</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '13px' }}>Category</Form.Label>
              <Form.Select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                style={{ fontSize: '13px' }}
              >
                <option value="all">All Categories</option>
                <option value="Utilities">Utilities</option>
                <option value="Internet">Internet</option>
                <option value="Telecom">Telecom</option>
                <option value="Insurance">Insurance</option>
                <option value="Loan">Loan</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '13px' }}>Paid by Employer</Form.Label>
              <Form.Select
                value={filterPaidByEmployer}
                onChange={(e) => setFilterPaidByEmployer(e.target.value)}
                style={{ fontSize: '13px' }}
              >
                <option value="all">All</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Form.Select>
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button 
                variant="secondary" 
                className="me-2"
                onClick={() => {
                  setFilterCategory('all');
                  setFilterPaidByEmployer('all');
                  setShowFilterModal(false);
                }}
                style={{ fontSize: '13px' }}
              >
                Reset
              </Button>
              <Button 
                style={buttonStyle}
                onClick={() => setShowFilterModal(false)}
              >
                Apply Filters
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BillPayments;