import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Color scheme as specified
const colors = {
  primaryRed: '#C62828',
  darkRed: '#B71C1C',
  pureWhite: '#FFFFFF',
  blackText: '#000000',
  darkGrayText: '#4A4A4A',
  lightGrayBorder: '#E2E2E2',
  lightBackground: '#F9F9F9', // Added back this color as it's used in table
};

const Transactions = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [activeTab, setActiveTab] = useState("all"); // "all", "employer", "employee", "vendor"

  // Mock data for transactions
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockData = [
        {
          id: "TXN-001",
          date: "2025-06-15",
          employer: "Tech Solutions Inc.",
          amount: 5000,
          type: "Credit Added",
          reference: "Bank Transfer",
          mode: "Bank",
          status: "Completed",
          processedBy: "Admin",
          category: "employer" // New field to categorize transactions
        },
        {
          id: "TXN-002",
          date: "2025-06-14",
          employer: "Global Industries Ltd.",
          amount: 3000,
          type: "Payment",
          reference: "Invoice #1234",
          mode: "UPI",
          status: "Completed",
          processedBy: "System",
          category: "employer"
        },
        {
          id: "TXN-003",
          date: "2025-06-14",
          employer: "Creative Agency",
          amount: 2000,
          type: "Credit Assigned",
          reference: "Manual Assignment",
          mode: "Cash",
          status: "Completed",
          processedBy: "Admin",
          category: "employer"
        },
        {
          id: "TXN-004",
          date: "2025-06-13",
          employer: "Tech Solutions Inc.",
          amount: 1500,
          type: "Payment",
          reference: "Vendor Payout",
          mode: "Bank",
          status: "Pending",
          processedBy: "Employer",
          category: "vendor"
        },
        {
          id: "TXN-005",
          date: "2025-06-12",
          employer: "Global Industries Ltd.",
          amount: 8000,
          type: "Credit Added",
          reference: "Bank Deposit",
          mode: "Bank",
          status: "Completed",
          processedBy: "Admin",
          category: "employer"
        },
        {
          id: "TXN-006",
          date: "2025-06-11",
          employer: "Creative Agency",
          amount: 2500,
          type: "Payment",
          reference: "Invoice #1235",
          mode: "UPI",
          status: "Completed",
          processedBy: "Employer",
          category: "vendor"
        },
        {
          id: "TXN-007",
          date: "2025-06-10",
          employer: "Tech Solutions Inc.",
          amount: 4000,
          type: "Credit Added",
          reference: "Bank Transfer",
          mode: "Bank",
          status: "Completed",
          processedBy: "Admin",
          category: "employer"
        },
        {
          id: "TXN-008",
          date: "2025-06-09",
          employer: "Global Industries Ltd.",
          amount: 1200,
          type: "Payment",
          reference: "Vendor Payout",
          mode: "Cash",
          status: "Completed",
          processedBy: "Employer",
          category: "vendor"
        },
        {
          id: "TXN-009",
          date: "2025-06-08",
          employer: "Creative Agency",
          amount: 6000,
          type: "Credit Added",
          reference: "Bank Deposit",
          mode: "Bank",
          status: "Completed",
          processedBy: "Admin",
          category: "employer"
        },
        {
          id: "TXN-010",
          date: "2025-06-07",
          employer: "Tech Solutions Inc.",
          amount: 3500,
          type: "Payment",
          reference: "Invoice #1236",
          mode: "UPI",
          status: "Pending",
          processedBy: "Employer",
          category: "vendor"
        },
        {
          id: "TXN-011",
          date: "2025-06-06",
          employer: "Global Industries Ltd.",
          amount: 2200,
          type: "Credit Assigned",
          reference: "Manual Assignment",
          mode: "Cash",
          status: "Completed",
          processedBy: "Admin",
          category: "employer"
        },
        {
          id: "TXN-012",
          date: "2025-06-05",
          employer: "Creative Agency",
          amount: 4800,
          type: "Credit Added",
          reference: "Bank Transfer",
          mode: "Bank",
          status: "Completed",
          processedBy: "Admin",
          category: "employer"
        },
        // Employee salary transactions
        {
          id: "TXN-013",
          date: "2025-06-15",
          employer: "Tech Solutions Inc.",
          employee: "John Doe",
          amount: 35000,
          type: "Salary Payment",
          reference: "June 2025 Salary",
          mode: "Bank",
          status: "Completed",
          processedBy: "Admin",
          category: "employee"
        },
        {
          id: "TXN-014",
          date: "2025-06-14",
          employer: "Global Industries Ltd.",
          employee: "Jane Smith",
          amount: 42000,
          type: "Salary Payment",
          reference: "June 2025 Salary",
          mode: "Bank",
          status: "Completed",
          processedBy: "Admin",
          category: "employee"
        },
        {
          id: "TXN-015",
          date: "2025-06-13",
          employer: "Creative Agency",
          employee: "Mike Johnson",
          amount: 28000,
          type: "Salary Payment",
          reference: "June 2025 Salary",
          mode: "Bank",
          status: "Completed",
          processedBy: "Admin",
          category: "employee"
        },
        {
          id: "TXN-016",
          date: "2025-06-12",
          employer: "Tech Solutions Inc.",
          employee: "Sarah Williams",
          amount: 38000,
          type: "Salary Payment",
          reference: "June 2025 Salary",
          mode: "Bank",
          status: "Completed",
          processedBy: "Admin",
          category: "employee"
        },
        {
          id: "TXN-017",
          date: "2025-06-11",
          employer: "Global Industries Ltd.",
          employee: "Robert Brown",
          amount: 45000,
          type: "Salary Payment",
          reference: "June 2025 Salary",
          mode: "Bank",
          status: "Completed",
          processedBy: "Admin",
          category: "employee"
        }
      ];
      
      setTransactions(mockData);
      setFilteredTransactions(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter transactions based on search term and active tab
  useEffect(() => {
    let filtered = transactions;
    
    // Filter by active tab
    if (activeTab !== "all") {
      filtered = filtered.filter(transaction => transaction.category === activeTab);
    }
    
    // Filter by search term
    filtered = filtered.filter(transaction => 
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.employer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.mode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (transaction.employee && transaction.employee.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    setFilteredTransactions(filtered);
    setCurrentPage(1);
  }, [searchTerm, transactions, activeTab]);

  // Get current transactions for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Get type color based on transaction type
  const getTypeColor = (type) => {
    switch(type) {
      case "Credit Added": return colors.primaryRed;
      case "Credit Assigned": return colors.darkRed;
      case "Payment": return colors.darkGrayText;
      case "Salary Payment": return colors.darkRed;
      default: return colors.blackText;
    }
  };

  // Get status badge style
  const getStatusStyle = (status) => {
    switch(status) {
      case "Completed": return { backgroundColor: "#E8F5E9", color: "#2E7D32" };
      case "Pending": return { backgroundColor: "#FFF8E1", color: "#F57C00" };
      case "Failed": return { backgroundColor: "#FFEBEE", color: "#C62828" };
      default: return { backgroundColor: "#F5F5F5", color: "#616161" };
    }
  };

  // Get tab title based on active tab
  const getTabTitle = () => {
    switch(activeTab) {
      case "all": return "All Transactions";
      case "employer": return "Employer Payment Logs";
      case "employee": return "Employee Salary Logs";
      case "vendor": return "Vendor Payment Logs";
      default: return "All Transactions";
    }
  };

  return (
    <div className="container-fluid py-2 py-md-4" style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-column flex-md-row">
        <h2 className="fw-bold mb-3 mb-md-0" style={{ color: colors.blackText, fontSize: isMobile ? '1.5rem' : '2rem' }}>Transactions</h2>
        <button 
          className="btn px-3 px-md-4 py-2 text-white"
          style={{ backgroundColor: colors.primaryRed, fontSize: isMobile ? '0.875rem' : '1rem' }}
          onClick={() => navigate('/admin/dashboard')}
        >
          <i className="bi bi-arrow-left me-2"></i>Back to Dashboard
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="card mb-4 shadow-sm" style={{ border: `1px solid ${colors.lightGrayBorder}` }}>
        <div className="card-body p-0">
          <ul className="nav nav-tabs nav-fill" style={{ borderBottom: `1px solid ${colors.lightGrayBorder}` }}>
            {/* <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === "all" ? "active" : ""}`}
                style={{ 
                  color: activeTab === "all" ? colors.primaryRed : colors.darkGrayText,
                  fontWeight: activeTab === "all" ? "bold" : "normal",
                  borderBottom: activeTab === "all" ? `3px solid ${colors.primaryRed}` : "none",
                  borderRadius: "0",
                  fontSize: isMobile ? '0.875rem' : '1rem'
                }}
                onClick={() => setActiveTab("all")}
              >
                All Transactions
              </button>
            </li> */}
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === "employer" ? "active" : ""}`}
                style={{ 
                  color: activeTab === "employer" ? colors.primaryRed : colors.darkGrayText,
                  fontWeight: activeTab === "employer" ? "bold" : "normal",
                  borderBottom: activeTab === "employer" ? `3px solid ${colors.primaryRed}` : "none",
                  borderRadius: "0",
                  fontSize: isMobile ? '0.875rem' : '1rem'
                }}
                onClick={() => setActiveTab("employer")}
              >
                Employer Payment Logs
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === "employee" ? "active" : ""}`}
                style={{ 
                  color: activeTab === "employee" ? colors.primaryRed : colors.darkGrayText,
                  fontWeight: activeTab === "employee" ? "bold" : "normal",
                  borderBottom: activeTab === "employee" ? `3px solid ${colors.primaryRed}` : "none",
                  borderRadius: "0",
                  fontSize: isMobile ? '0.875rem' : '1rem'
                }}
                onClick={() => setActiveTab("employee")}
              >
                Employee Salary Logs
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === "vendor" ? "active" : ""}`}
                style={{ 
                  color: activeTab === "vendor" ? colors.primaryRed : colors.darkGrayText,
                  fontWeight: activeTab === "vendor" ? "bold" : "normal",
                  borderBottom: activeTab === "vendor" ? `3px solid ${colors.primaryRed}` : "none",
                  borderRadius: "0",
                  fontSize: isMobile ? '0.875rem' : '1rem'
                }}
                onClick={() => setActiveTab("vendor")}
              >
                Vendor Payment Logs
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Search Bar */}
      <div className="card mb-4 shadow-sm" style={{ border: `1px solid ${colors.lightGrayBorder}` }}>
        <div className="card-body p-3">
          <div className="row g-2">
            <div className="col-12 col-md-6">
              <div className="input-group">
                <span className="input-group-text" style={{ backgroundColor: colors.pureWhite, border: `1px solid ${colors.lightGrayBorder}` }}>
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by ID, Employer, Type, etc."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ border: `1px solid ${colors.lightGrayBorder}`, fontSize: isMobile ? '0.875rem' : '1rem' }}
                />
              </div>
            </div>
            <div className="col-12 col-md-6 d-flex justify-content-md-end align-items-center">
              <span className="text-muted" style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>
                Showing {currentTransactions.length} of {filteredTransactions.length} transactions
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table / Cards */}
      <div className="card shadow-sm" style={{ border: `1px solid ${colors.lightGrayBorder}` }}>
        <div className="card-header py-3" style={{ backgroundColor: colors.pureWhite, borderBottom: `1px solid ${colors.lightGrayBorder}` }}>
          <h5 className="mb-0 fw-bold" style={{ color: colors.blackText, fontSize: isMobile ? '1.125rem' : '1.25rem' }}>{getTabTitle()}</h5>
        </div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : isMobile ? (
            // Mobile Card View for Table
            <div className="p-3">
              {currentTransactions.map((transaction) => (
                <div key={transaction.id} className="card mb-3 border" style={{ borderRadius: "10px" }}>
                  <div className="card-body p-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h6 className="fw-bold mb-0" style={{ color: colors.blackText, fontSize: '0.9rem' }}>{transaction.id}</h6>
                      <span className="badge px-2 py-1" style={getStatusStyle(transaction.status)}>
                        {transaction.status}
                      </span>
                    </div>
                    <div className="row g-2 mb-2">
                      <div className="col-6">
                        <small className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Date</small>
                        <span style={{ fontSize: '0.8rem' }}>{transaction.date}</span>
                      </div>
                      <div className="col-6">
                        <small className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Employer</small>
                        <span style={{ fontSize: '0.8rem' }}>{transaction.employer}</span>
                      </div>
                      {transaction.employee && (
                        <div className="col-6">
                          <small className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Employee</small>
                          <span style={{ fontSize: '0.8rem' }}>{transaction.employee}</span>
                        </div>
                      )}
                      <div className="col-6">
                        <small className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Amount</small>
                        <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>₹{transaction.amount.toLocaleString()}</span>
                      </div>
                      <div className="col-6">
                        <small className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Type</small>
                        <span style={{ fontSize: '0.8rem', color: getTypeColor(transaction.type), fontWeight: '600' }}>
                          {transaction.type}
                        </span>
                      </div>
                      <div className="col-6">
                        <small className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Mode</small>
                        <span style={{ fontSize: '0.8rem' }}>{transaction.mode}</span>
                      </div>
                      <div className="col-6">
                        <small className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Reference</small>
                        <span style={{ fontSize: '0.8rem' }}>{transaction.reference}</span>
                      </div>
                    </div>
                    <div className="mt-2 text-end">
                      <button
                        className="btn btn-sm"
                        style={{ 
                          color: colors.pureWhite, 
                          backgroundColor: colors.primaryRed, 
                          border: "none",
                          borderRadius: "4px",
                          padding: "0.25rem 0.5rem",
                          fontSize: '0.8rem'
                        }}
                        onClick={() => setSelectedTransaction(transaction)}
                      >
                        <i className="bi bi-eye-fill"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Desktop Table View
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr style={{ backgroundColor: colors.lightBackground, color: colors.darkGrayText }}>
                    <th className="border-0 py-3" style={{ color: colors.darkGrayText }}>Transaction ID</th>
                    <th className="border-0 py-3" style={{ color: colors.darkGrayText }}>Date</th>
                    <th className="border-0 py-3" style={{ color: colors.darkGrayText }}>Employer</th>
                    {activeTab === "employee" && <th className="border-0 py-3" style={{ color: colors.darkGrayText }}>Employee</th>}
                    <th className="border-0 py-3" style={{ color: colors.darkGrayText }}>Amount</th>
                    <th className="border-0 py-3" style={{ color: colors.darkGrayText }}>Type</th>
                    <th className="border-0 py-3" style={{ color: colors.darkGrayText }}>Mode</th>
                    <th className="border-0 py-3" style={{ color: colors.darkGrayText }}>Status</th>
                    <th className="border-0 py-3 text-center" style={{ color: colors.darkGrayText }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="py-3" style={{ color: colors.blackText }}>{transaction.id}</td>
                      <td className="py-3" style={{ color: colors.blackText }}>{transaction.date}</td>
                      <td className="py-3" style={{ color: colors.blackText }}>{transaction.employer}</td>
                      {activeTab === "employee" && (
                        <td className="py-3" style={{ color: colors.blackText }}>{transaction.employee}</td>
                      )}
                      <td className="py-3" style={{ color: colors.blackText }}>₹{transaction.amount.toLocaleString()}</td>
                      <td className="py-3">
                        <span style={{ color: getTypeColor(transaction.type), fontWeight: "600" }}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className="py-3" style={{ color: colors.blackText }}>{transaction.mode}</td>
                      <td className="py-3">
                        <span className="badge px-2 py-1" style={getStatusStyle(transaction.status)}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="py-3 text-center">
                        <button
                          className="btn btn-sm"
                          style={{ 
                            color: colors.pureWhite, 
                            backgroundColor: colors.primaryRed, 
                            border: "none",
                            borderRadius: "4px",
                            padding: "0.25rem 0.5rem"
                          }}
                          onClick={() => setSelectedTransaction(transaction)}
                        >
                          <i className="bi bi-eye-fill"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {filteredTransactions.length > itemsPerPage && (
        <nav aria-label="Page navigation" className="mt-4">
          <ul className={`pagination justify-content-center ${isMobile ? 'pagination-sm' : ''}`}>
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => paginate(currentPage - 1)}
                style={{ color: colors.primaryRed }}
              >
                Previous
              </button>
            </li>
            {[...Array(Math.ceil(filteredTransactions.length / itemsPerPage)).keys()].map(number => (
              <li key={number} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => paginate(number + 1)}
                  style={{
                    color: currentPage === number + 1 ? colors.pureWhite : colors.primaryRed,
                    backgroundColor: currentPage === number + 1 ? colors.primaryRed : "transparent",
                    border: currentPage === number + 1 ? `1px solid ${colors.primaryRed}` : "1px solid #dee2e6"
                  }}
                >
                  {number + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === Math.ceil(filteredTransactions.length / itemsPerPage) ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => paginate(currentPage + 1)}
                style={{ color: colors.primaryRed }}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className={`modal-dialog modal-dialog-centered ${isMobile ? 'modal-sm' : ''}`}>
            <div className="modal-content">
              <div className="modal-header border-0" style={{ backgroundColor: colors.pureWhite }}>
                <h5 className="modal-title fw-bold" style={{ color: colors.blackText, fontSize: isMobile ? '1.125rem' : '1.25rem' }}>Transaction Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedTransaction(null)}
                ></button>
              </div>
              <div className="modal-body" style={{ backgroundColor: colors.pureWhite }}>
                <div className="mb-3">
                  <h6 style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Transaction ID</h6>
                  <p style={{ color: colors.blackText, fontSize: isMobile ? '0.875rem' : '1rem' }}>{selectedTransaction.id}</p>
                </div>
                <div className="mb-3">
                  <h6 style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Date</h6>
                  <p style={{ color: colors.blackText, fontSize: isMobile ? '0.875rem' : '1rem' }}>{selectedTransaction.date}</p>
                </div>
                <div className="mb-3">
                  <h6 style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Employer</h6>
                  <p style={{ color: colors.blackText, fontSize: isMobile ? '0.875rem' : '1rem' }}>{selectedTransaction.employer}</p>
                </div>
                {selectedTransaction.employee && (
                  <div className="mb-3">
                    <h6 style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Employee</h6>
                    <p style={{ color: colors.blackText, fontSize: isMobile ? '0.875rem' : '1rem' }}>{selectedTransaction.employee}</p>
                  </div>
                )}
                <div className="mb-3">
                  <h6 style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Amount</h6>
                  <p style={{ color: colors.blackText, fontSize: isMobile ? '0.875rem' : '1rem' }}>₹{selectedTransaction.amount.toLocaleString()}</p>
                </div>
                <div className="mb-3">
                  <h6 style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Type</h6>
                  <p style={{ color: getTypeColor(selectedTransaction.type), fontWeight: "600", fontSize: isMobile ? '0.875rem' : '1rem' }}>
                    {selectedTransaction.type}
                  </p>
                </div>
                <div className="mb-3">
                  <h6 style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Reference</h6>
                  <p style={{ color: colors.blackText, fontSize: isMobile ? '0.875rem' : '1rem' }}>{selectedTransaction.reference}</p>
                </div>
                <div className="mb-3">
                  <h6 style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Payment Mode</h6>
                  <p style={{ color: colors.blackText, fontSize: isMobile ? '0.875rem' : '1rem' }}>{selectedTransaction.mode}</p>
                </div>
                <div className="mb-3">
                  <h6 style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Status</h6>
                  <span className="badge px-2 py-1" style={getStatusStyle(selectedTransaction.status)}>
                    {selectedTransaction.status}
                  </span>
                </div>
                <div className="mb-3">
                  <h6 style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Processed By</h6>
                  <p style={{ color: colors.blackText, fontSize: isMobile ? '0.875rem' : '1rem' }}>{selectedTransaction.processedBy}</p>
                </div>
              </div>
              <div className="modal-footer border-0" style={{ backgroundColor: colors.pureWhite }}>
                <button
                  type="button"
                  className="btn px-4 py-2 text-white"
                  style={{ backgroundColor: colors.primaryRed, fontSize: isMobile ? '0.875rem' : '1rem' }}
                  onClick={() => setSelectedTransaction(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;