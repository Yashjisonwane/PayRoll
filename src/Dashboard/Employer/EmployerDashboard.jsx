import React, { useState } from "react";
import { 
  FaCreditCard, 
  FaHistory, 
  FaMoneyBillWave, 
  FaUserFriends, 
  FaSearch,
  FaPlus,
  FaFilter,
  FaDownload,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
  FaTimes
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, ArcElement, LineElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, ArcElement);

const EmployeeDashboard = () => {
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentReference, setPaymentReference] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [showPayForm, setShowPayForm] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [mobileView, setMobileView] = useState(window.innerWidth < 768);

  // Sample data
  const creditBalance = 12500;
  const creditHistory = [
    { id: 1, date: "15 Dec 2023", amount: 5000, type: "Credit", description: "Monthly Credit Allocation" },
    { id: 2, date: "10 Dec 2023", amount: -2500, type: "Debit", description: "Payment to Vendor A" },
    { id: 3, date: "05 Dec 2023", amount: -1200, type: "Debit", description: "Payment to Employee B" },
  ];

  const beneficiaries = [
    { id: 1, name: "Vendor A", type: "Vendor" },
    { id: 2, name: "Employee B", type: "Employee" },
    { id: 3, name: "Vendor C", type: "Vendor" },
  ];

  const transactions = [
    { 
      id: "TXN123456", 
      date: "15 Dec 2023", 
      beneficiary: "Vendor A", 
      amount: 2500, 
      status: "Success", 
      description: "Office Supplies",
      paymentMethod: "Credit Transfer",
      reference: "REF-2023-12345",
      processedBy: "Admin User"
    },
    { 
      id: "TXN123457", 
      date: "10 Dec 2023", 
      beneficiary: "Employee B", 
      amount: 1200, 
      status: "Success", 
      description: "Project Bonus",
      paymentMethod: "Credit Transfer",
      reference: "REF-2023-12346",
      processedBy: "HR Manager"
    },
    { 
      id: "TXN123458", 
      date: "05 Dec 2023", 
      beneficiary: "Vendor C", 
      amount: 3000, 
      status: "Pending", 
      description: "Equipment Purchase",
      paymentMethod: "Credit Transfer",
      reference: "REF-2023-12347",
      processedBy: "Finance Team"
    },
  ];

  const lineData = {
    labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Credit Balance",
        data: [8000, 9500, 7500, 11000, 9000, 12500],
        borderColor: "#C62828",
        backgroundColor: "rgba(198,40,40,0.18)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const doughnutData = {
    labels: ["Used", "Available"],
    datasets: [
      {
        data: [creditBalance * 0.6, creditBalance * 0.4],
        backgroundColor: ["#C62828", "#F7EFE9"],
      },
    ],
  };

  // Chart options for responsiveness
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: mobileView ? 'bottom' : 'top',
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '₹' + value.toLocaleString();
          }
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: mobileView ? 'bottom' : 'right',
      }
    }
  };

  // Filter transactions
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         transaction.beneficiary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesDate = true;
    if (dateFilter === 'this-month') {
      const transactionDate = new Date(transaction.date);
      const currentDate = new Date();
      matchesDate = transactionDate.getMonth() === currentDate.getMonth() && 
                   transactionDate.getFullYear() === currentDate.getFullYear();
    }
    
    return matchesSearch && matchesDate;
  });

  const handlePaymentSubmit = () => {
    if (selectedBeneficiary && paymentAmount) {
      alert(`Payment of ₹${paymentAmount} to ${selectedBeneficiary.name} confirmed!`);
      setSelectedBeneficiary(null);
      setPaymentAmount('');
      setPaymentReference('');
      setShowPayForm(false);
    } else {
      alert('Please select a beneficiary and enter an amount');
    }
  };

  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setShowTransactionModal(true);
  };

  const handleDownloadReceipt = () => {
    if (!selectedTransaction) return;
    
    // Create receipt content
    const receiptContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Transaction Receipt</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .header h1 { color: #C62828; }
          .receipt-details { margin-bottom: 20px; }
          .receipt-details table { width: 100%; border-collapse: collapse; }
          .receipt-details td { padding: 8px; border-bottom: 1px solid #ddd; }
          .receipt-details td:first-child { font-weight: bold; width: 40%; }
          .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Payment Receipt</h1>
          <p>Employee Credit Management System</p>
        </div>
        
        <div class="receipt-details">
          <table>
            <tr>
              <td>Transaction ID:</td>
              <td>${selectedTransaction.id}</td>
            </tr>
            <tr>
              <td>Date:</td>
              <td>${selectedTransaction.date}</td>
            </tr>
            <tr>
              <td>Beneficiary:</td>
              <td>${selectedTransaction.beneficiary}</td>
            </tr>
            <tr>
              <td>Amount:</td>
              <td>₹ ${selectedTransaction.amount.toLocaleString()}</td>
            </tr>
            <tr>
              <td>Status:</td>
              <td>${selectedTransaction.status}</td>
            </tr>
            <tr>
              <td>Payment Method:</td>
              <td>${selectedTransaction.paymentMethod}</td>
            </tr>
            <tr>
              <td>Description:</td>
              <td>${selectedTransaction.description}</td>
            </tr>
            <tr>
              <td>Reference:</td>
              <td>${selectedTransaction.reference}</td>
            </tr>
            <tr>
              <td>Processed By:</td>
              <td>${selectedTransaction.processedBy}</td>
            </tr>
          </table>
        </div>
        
        <div class="footer">
          <p>This is a computer-generated receipt and does not require a signature.</p>
          <p>Generated on ${new Date().toLocaleString()}</p>
        </div>
      </body>
      </html>
    `;
    
    // Create a blob from the HTML content
    const blob = new Blob([receiptContent], { type: 'text/html' });
    
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link element and trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = `Receipt_${selectedTransaction.id}.html`;
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Show success message
    alert('Receipt downloaded successfully!');
  };

  // Transaction Card for Mobile View
  const TransactionCard = ({ transaction }) => (
    <div className="card mb-3 shadow-sm" style={{ borderRadius: "10px" }}>
      <div className="card-body p-3">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <h6 className="mb-1 fw-bold" style={{ color: "#C62828", fontSize: "0.9rem" }}>
              {transaction.id}
            </h6>
            <p className="text-muted mb-0" style={{ fontSize: "0.8rem" }}>{transaction.date}</p>
          </div>
          <span className={`badge ${
            transaction.status === 'Success' ? 'bg-success' : 
            transaction.status === 'Pending' ? 'bg-warning' : 'bg-danger'
          }`} style={{ fontSize: "0.75rem" }}>
            {transaction.status === 'Success' && <FaCheckCircle className="me-1" />}
            {transaction.status === 'Pending' && <FaTimesCircle className="me-1" />}
            {transaction.status === 'Failed' && <FaTimesCircle className="me-1" />}
            {transaction.status}
          </span>
        </div>
        
        <div className="mb-2">
          <p className="mb-1" style={{ fontSize: "0.9rem" }}>
            <span className="text-muted">Beneficiary:</span> <span className="fw-semibold">{transaction.beneficiary}</span>
          </p>
          <p className="mb-1" style={{ fontSize: "0.9rem" }}>
            <span className="text-muted">Description:</span> {transaction.description}
          </p>
          <p className="mb-0" style={{ fontSize: "0.9rem" }}>
            <span className="text-muted">Amount:</span> 
            <span className="fw-bold" style={{ color: "#C62828" }}> ₹ {transaction.amount.toLocaleString()}</span>
          </p>
        </div>
        
        <div className="d-flex justify-content-end">
          <button 
            className="btn btn-sm text-white px-3 py-1" 
            style={{ background: "#C62828", borderRadius: "8px", fontSize: "0.8rem" }}
            onClick={() => handleViewTransaction(transaction)}
          >
            <FaEye /> View
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-fluid p-2 p-md-4" style={{ minHeight: "100vh"}}>
      <div className="row">
        <div className="col-12">
          <h2 className="fw-bold mb-3 mb-md-4" style={{ color: "#C62828", fontSize: "clamp(1.5rem, 4vw, 2rem)" }}>Employer Dashboard</h2>
        </div>
      </div>

      {/* Credit Balance Card */}
      <div className="row mb-3 mb-md-4">
        <div className="col-12 col-lg-4 mb-3">
          <div className="card shadow-sm h-100" style={{ borderRadius: "14px", border: "none" }}>
            <div className="card-body p-3 p-md-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="flex-grow-1">
                  <h5 className="text-muted mb-2" style={{ fontSize: "0.9rem" }}>Credit Balance</h5>
                  <h2 className="fw-bold mb-0" style={{ color: "#C62828", fontSize: "clamp(1.5rem, 5vw, 2rem)" }}>₹ {creditBalance.toLocaleString()}</h2>
                </div>
                <div className="d-flex align-items-center justify-content-center flex-shrink-0" 
                     style={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "rgba(198,40,40,0.1)" }}>
                  <FaCreditCard size={24} color="#C62828" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Credit History */}
        <div className="col-12 col-lg-8 mb-3">
          <div className="card shadow-sm h-100" style={{ borderRadius: "14px", border: "none" }}>
            <div className="card-header bg-white px-3 px-md-4 py-3">
              <h5 className="fw-bold mb-0" style={{ color: "#C62828", fontSize: "1rem" }}>Credit History</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr style={{ background: "#FFF5F5", color: "#C62828" }}>
                      <th style={{ fontSize: "0.85rem" }}>Date</th>
                      <th className="d-none d-md-table-cell" style={{ fontSize: "0.85rem" }}>Description</th>
                      <th style={{ fontSize: "0.85rem" }}>Type</th>
                      <th style={{ fontSize: "0.85rem" }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {creditHistory.map((item) => (
                      <tr key={item.id}>
                        <td style={{ fontSize: "0.9rem" }}>{item.date}</td>
                        <td className="d-none d-md-table-cell" style={{ fontSize: "0.9rem" }}>{item.description}</td>
                        <td>
                          <span className={`badge ${item.type === 'Credit' ? 'bg-success' : 'bg-danger'}`} style={{ fontSize: "0.75rem" }}>
                            {item.type}
                          </span>
                        </td>
                        <td className={item.type === 'Credit' ? 'text-success' : 'text-danger'} style={{ fontSize: "0.9rem" }}>
                          {item.type === 'Credit' ? '+' : ''}₹ {Math.abs(item.amount).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pay Employee / Vendor Section */}
      <div className="row mb-3 mb-md-4">
        <div className="col-12">
          <div className="card shadow-sm" style={{ borderRadius: "14px", border: "none" }}>
            <div className="card-header bg-white px-3 px-md-4 py-3 d-flex justify-content-between align-items-center">
              <h5 className="fw-bold mb-0" style={{ color: "#C62828", fontSize: "1rem" }}>Pay Employee / Vendor</h5>
              <button
                className="btn text-white fw-semibold px-3 py-2"
                style={{ background: "#C62828", borderRadius: "10px", fontSize: "0.9rem" }}
                onClick={() => setShowPayForm(!showPayForm)}
              >
                <FaMoneyBillWave className="me-2" /> {showPayForm ? 'Cancel' : 'Make Payment'}
              </button>
            </div>
            {showPayForm && (
              <div className="card-body p-3 p-md-4">
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label" style={{ fontSize: "0.9rem" }}>Select Beneficiary</label>
                    <select 
                      className="form-select"
                      value={selectedBeneficiary?.id || ''}
                      onChange={(e) => {
                        const beneficiary = beneficiaries.find(b => b.id === parseInt(e.target.value));
                        setSelectedBeneficiary(beneficiary);
                      }}
                    >
                      <option value="">Choose...</option>
                      {beneficiaries.map((beneficiary) => (
                        <option key={beneficiary.id} value={beneficiary.id}>
                          {beneficiary.name} ({beneficiary.type})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label" style={{ fontSize: "0.9rem" }}>Amount</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      placeholder="Enter amount"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label" style={{ fontSize: "0.9rem" }}>Reference (Optional)</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Payment reference"
                      value={paymentReference}
                      onChange={(e) => setPaymentReference(e.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <button
                      className="btn text-white fw-semibold px-4 py-2"
                      style={{ background: "#C62828", borderRadius: "10px" }}
                      onClick={handlePaymentSubmit}
                    >
                      Confirm Payment
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Transactions Section */}
      <div className="row mb-3 mb-md-4">
        <div className="col-12">
          <div className="card shadow-sm" style={{ borderRadius: "14px", border: "none" }}>
            <div className="card-header bg-white px-3 px-md-4 py-3">
              <h5 className="fw-bold mb-0" style={{ color: "#C62828", fontSize: "1rem" }}>Transactions</h5>
            </div>
            <div className="card-body p-3 p-md-4">
              {/* Filters */}
              <div className="row g-2 g-md-3 mb-3">
                <div className="col-12 col-md-6">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaSearch />
                    </span>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Search transactions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-3">
                  <select 
                    className="form-select"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  >
                    <option value="all">All Time</option>
                    <option value="this-month">This Month</option>
                  </select>
                </div>
                <div className="col-12 col-md-3">
                  <div className="d-grid gap-2 d-md-flex">
                    <button className="btn btn-outline-secondary flex-fill flex-md-grow-0">
                      <FaFilter /> <span className="d-none d-md-inline">Filter</span>
                    </button>
                    <button className="btn btn-outline-secondary flex-fill flex-md-grow-0">
                      <FaDownload /> <span className="d-none d-md-inline">Export</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Desktop Table View */}
              <div className="d-none d-md-block">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr style={{ background: "#FFF5F5", color: "#C62828" }}>
                        <th style={{ fontSize: "0.85rem", whiteSpace: "nowrap" }}>Transaction ID</th>
                        <th style={{ fontSize: "0.85rem" }}>Date</th>
                        <th style={{ fontSize: "0.85rem" }}>Beneficiary</th>
                        <th className="d-none d-lg-table-cell" style={{ fontSize: "0.85rem" }}>Description</th>
                        <th style={{ fontSize: "0.85rem" }}>Amount</th>
                        <th style={{ fontSize: "0.85rem" }}>Status</th>
                        <th style={{ fontSize: "0.85rem" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions.map((transaction) => (
                        <tr key={transaction.id}>
                          <td style={{ fontSize: "0.9rem", whiteSpace: "nowrap" }}>{transaction.id}</td>
                          <td style={{ fontSize: "0.9rem" }}>{transaction.date}</td>
                          <td style={{ fontSize: "0.9rem" }}>{transaction.beneficiary}</td>
                          <td className="d-none d-lg-table-cell" style={{ fontSize: "0.9rem" }}>{transaction.description}</td>
                          <td style={{ fontSize: "0.9rem" }}>₹ {transaction.amount.toLocaleString()}</td>
                          <td>
                            <span className={`badge ${
                              transaction.status === 'Success' ? 'bg-success' : 
                              transaction.status === 'Pending' ? 'bg-warning' : 'bg-danger'
                            }`} style={{ fontSize: "0.75rem" }}>
                              {transaction.status === 'Success' && <FaCheckCircle className="me-1" />}
                              {transaction.status === 'Pending' && <FaTimesCircle className="me-1" />}
                              {transaction.status === 'Failed' && <FaTimesCircle className="me-1" />}
                              {transaction.status}
                            </span>
                          </td>
                          <td>
                            <button 
                              className="btn btn-sm text-white px-2 py-1" 
                              style={{ background: "#C62828", borderRadius: "8px", fontSize: "0.8rem" }}
                              onClick={() => handleViewTransaction(transaction)}
                            >
                              <FaEye /> <span className="d-none d-lg-inline ms-1">View</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Card View */}
              <div className="d-md-none">
                {filteredTransactions.map((transaction) => (
                  <TransactionCard key={transaction.id} transaction={transaction} />
                ))}
              </div>
              
              {filteredTransactions.length === 0 && (
                <div className="text-center p-4">
                  <p className="text-muted">No transactions found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Credit Balance Chart */}
      <div className="row g-3 g-md-4 mb-4">
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm h-100" style={{ borderRadius: "14px", border: "none" }}>
            <div className="card-header bg-white px-3 px-md-4 py-3">
              <h5 className="fw-semibold mb-0" style={{ color: "#C62828", fontSize: "1rem" }}>
                Credit Balance Trend
              </h5>
            </div>
            <div className="card-body p-3 p-md-4" style={{ height: "300px" }}>
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="card shadow-sm h-100" style={{ borderRadius: "14px", border: "none" }}>
            <div className="card-header bg-white px-3 px-md-4 py-3">
              <h5 className="fw-semibold mb-0" style={{ color: "#C62828", fontSize: "1rem" }}>
                Credit Usage
              </h5>
            </div>
            <div className="card-body p-3 p-md-4 d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {showTransactionModal && selectedTransaction && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header" style={{ borderBottom: '1px solid #f0f0f0' }}>
                <h5 className="modal-title fw-bold" style={{ color: "#C62828" }}>Transaction Details</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowTransactionModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-12 col-sm-6">
                    <p className="text-muted mb-1" style={{ fontSize: "0.85rem" }}>Transaction ID</p>
                    <p className="fw-bold mb-0" style={{ fontSize: "0.95rem" }}>{selectedTransaction.id}</p>
                  </div>
                  <div className="col-12 col-sm-6">
                    <p className="text-muted mb-1" style={{ fontSize: "0.85rem" }}>Date</p>
                    <p className="fw-bold mb-0" style={{ fontSize: "0.95rem" }}>{selectedTransaction.date}</p>
                  </div>
                  <div className="col-12 col-sm-6">
                    <p className="text-muted mb-1" style={{ fontSize: "0.85rem" }}>Beneficiary</p>
                    <p className="fw-bold mb-0" style={{ fontSize: "0.95rem" }}>{selectedTransaction.beneficiary}</p>
                  </div>
                  <div className="col-12 col-sm-6">
                    <p className="text-muted mb-1" style={{ fontSize: "0.85rem" }}>Amount</p>
                    <p className="fw-bold mb-0" style={{ color: "#C62828", fontSize: "0.95rem" }}>₹ {selectedTransaction.amount.toLocaleString()}</p>
                  </div>
                  <div className="col-12 col-sm-6">
                    <p className="text-muted mb-1" style={{ fontSize: "0.85rem" }}>Status</p>
                    <p className="mb-0">
                      <span className={`badge ${
                        selectedTransaction.status === 'Success' ? 'bg-success' : 
                        selectedTransaction.status === 'Pending' ? 'bg-warning' : 'bg-danger'
                      }`} style={{ fontSize: "0.8rem" }}>
                        {selectedTransaction.status}
                      </span>
                    </p>
                  </div>
                  <div className="col-12 col-sm-6">
                    <p className="text-muted mb-1" style={{ fontSize: "0.85rem" }}>Payment Method</p>
                    <p className="fw-bold mb-0" style={{ fontSize: "0.95rem" }}>{selectedTransaction.paymentMethod}</p>
                  </div>
                  <div className="col-12">
                    <p className="text-muted mb-1" style={{ fontSize: "0.85rem" }}>Description</p>
                    <p className="fw-bold mb-0" style={{ fontSize: "0.95rem" }}>{selectedTransaction.description}</p>
                  </div>
                  <div className="col-12 col-sm-6">
                    <p className="text-muted mb-1" style={{ fontSize: "0.85rem" }}>Reference</p>
                    <p className="fw-bold mb-0" style={{ fontSize: "0.95rem" }}>{selectedTransaction.reference}</p>
                  </div>
                  <div className="col-12 col-sm-6">
                    <p className="text-muted mb-1" style={{ fontSize: "0.85rem" }}>Processed By</p>
                    <p className="fw-bold mb-0" style={{ fontSize: "0.95rem" }}>{selectedTransaction.processedBy}</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer" style={{ borderTop: '1px solid #f0f0f0' }}>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowTransactionModal(false)}
                >
                  Close
                </button>
                <button 
                  type="button" 
                  className="btn text-white" 
                  style={{ background: "#C62828" }}
                  onClick={handleDownloadReceipt}
                >
                  <FaDownload className="me-2" />Download Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;