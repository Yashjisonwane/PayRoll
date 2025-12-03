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
  // lightBackground: '#F9F9F9',
};

const Transactions = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

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
          processedBy: "Admin"
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
          processedBy: "System"
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
          processedBy: "Admin"
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
          processedBy: "Employer"
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
          processedBy: "Admin"
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
          processedBy: "Employer"
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
          processedBy: "Admin"
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
          processedBy: "Employer"
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
          processedBy: "Admin"
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
          processedBy: "Employer"
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
          processedBy: "Admin"
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
          processedBy: "Admin"
        }
      ];
      
      setTransactions(mockData);
      setFilteredTransactions(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter transactions based on search term
  useEffect(() => {
    const filtered = transactions.filter(transaction => 
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.employer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.mode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTransactions(filtered);
    setCurrentPage(1);
  }, [searchTerm, transactions]);

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

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: colors.lightBackground, minHeight: "100vh" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold" style={{ color: colors.blackText }}>Transactions</h2>
        <button 
          className="btn px-3 py-2 text-white"
          style={{ backgroundColor: colors.primaryRed }}
          onClick={() => navigate('/admin/dashboard')}
        >
          <i className="bi bi-arrow-left me-2"></i>Back to Dashboard
        </button>
      </div>

      {/* Search Bar */}
      <div className="card mb-4 shadow-sm" style={{ border: `1px solid ${colors.lightGrayBorder}` }}>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
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
                  style={{ border: `1px solid ${colors.lightGrayBorder}` }}
                />
              </div>
            </div>
            <div className="col-md-6 d-flex justify-content-end align-items-center">
              <span className="text-muted" style={{ color: colors.darkGrayText }}>
                Showing {currentTransactions.length} of {filteredTransactions.length} transactions
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="card shadow-sm" style={{ border: `1px solid ${colors.lightGrayBorder}` }}>
        <div className="card-header py-3" style={{ backgroundColor: colors.pureWhite, borderBottom: `1px solid ${colors.lightGrayBorder}` }}>
          <h5 className="mb-0 fw-bold" style={{ color: colors.blackText }}>Payment Logs</h5>
        </div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr style={{ backgroundColor: colors.lightBackground }}>
                    <th className="border-0 py-3" style={{ color: colors.darkGrayText }}>Transaction ID</th>
                    <th className="border-0 py-3" style={{ color: colors.darkGrayText }}>Date</th>
                    <th className="border-0 py-3" style={{ color: colors.darkGrayText }}>Employer</th>
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
                          style={{ color: colors.primaryRed, backgroundColor: "transparent", border: "none" }}
                          onClick={() => setSelectedTransaction(transaction)}
                        >
                          <i className="bi bi-eye-fill"></i> View
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
          <ul className="pagination justify-content-center">
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
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0" style={{ backgroundColor: colors.pureWhite }}>
                <h5 className="modal-title fw-bold" style={{ color: colors.blackText }}>Transaction Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedTransaction(null)}
                ></button>
              </div>
              <div className="modal-body" style={{ backgroundColor: colors.pureWhite }}>
                <div className="mb-3">
                  <h6 style={{ color: colors.darkGrayText }}>Transaction ID</h6>
                  <p style={{ color: colors.blackText }}>{selectedTransaction.id}</p>
                </div>
                <div className="mb-3">
                  <h6 style={{ color: colors.darkGrayText }}>Date</h6>
                  <p style={{ color: colors.blackText }}>{selectedTransaction.date}</p>
                </div>
                <div className="mb-3">
                  <h6 style={{ color: colors.darkGrayText }}>Employer</h6>
                  <p style={{ color: colors.blackText }}>{selectedTransaction.employer}</p>
                </div>
                <div className="mb-3">
                  <h6 style={{ color: colors.darkGrayText }}>Amount</h6>
                  <p style={{ color: colors.blackText }}>₹{selectedTransaction.amount.toLocaleString()}</p>
                </div>
                <div className="mb-3">
                  <h6 style={{ color: colors.darkGrayText }}>Type</h6>
                  <p style={{ color: getTypeColor(selectedTransaction.type), fontWeight: "600" }}>
                    {selectedTransaction.type}
                  </p>
                </div>
                <div className="mb-3">
                  <h6 style={{ color: colors.darkGrayText }}>Reference</h6>
                  <p style={{ color: colors.blackText }}>{selectedTransaction.reference}</p>
                </div>
                <div className="mb-3">
                  <h6 style={{ color: colors.darkGrayText }}>Payment Mode</h6>
                  <p style={{ color: colors.blackText }}>{selectedTransaction.mode}</p>
                </div>
                <div className="mb-3">
                  <h6 style={{ color: colors.darkGrayText }}>Status</h6>
                  <span className="badge px-2 py-1" style={getStatusStyle(selectedTransaction.status)}>
                    {selectedTransaction.status}
                  </span>
                </div>
                <div className="mb-3">
                  <h6 style={{ color: colors.darkGrayText }}>Processed By</h6>
                  <p style={{ color: colors.blackText }}>{selectedTransaction.processedBy}</p>
                </div>
              </div>
              <div className="modal-footer border-0" style={{ backgroundColor: colors.pureWhite }}>
                <button
                  type="button"
                  className="btn px-4 py-2 text-white"
                  style={{ backgroundColor: colors.primaryRed }}
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