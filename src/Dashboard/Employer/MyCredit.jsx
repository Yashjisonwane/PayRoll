import React, { useState, useEffect } from 'react';
import { FaCreditCard, FaPlus, FaEye, FaExclamationTriangle, FaFilter, FaTimes, FaHistory, FaDownload, FaSearch } from 'react-icons/fa';
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import "bootstrap/dist/css/bootstrap.min.css";

const MyCredits = () => {
  const [showLowBalanceAlert, setShowLowBalanceAlert] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [requestAmount, setRequestAmount] = useState('');
  const [requestReason, setRequestReason] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const [creditBalance, setCreditBalance] = useState(45000);
  const lastUpdated = '12 Dec 2025';
  const lowBalanceThreshold = 10000;

  const [creditHistory, setCreditHistory] = useState([
    { id: 1, date: '2025-12-10', type: 'Added', amount: 20000, status: 'Success', notes: 'Monthly credit allocation' },
    { id: 2, date: '2025-12-05', type: 'Deducted', amount: 15000, status: 'Success', notes: 'Payment to employees' },
    { id: 3, date: '2025-11-28', type: 'Added', amount: 30000, status: 'Success', notes: 'Quarterly bonus credits' },
    { id: 4, date: '2025-11-15', type: 'Deducted', amount: 10000, status: 'Success', notes: 'Vendor payment for supplies' },
    { id: 5, date: '2025-11-10', type: 'Added', amount: 5000, status: 'Pending', notes: 'Requested credits for marketing campaign' },
    { id: 6, date: '2025-11-05', type: 'Deducted', amount: 8000, status: 'Success', notes: 'Software subscription renewal' },
    { id: 7, date: '2025-10-28', type: 'Added', amount: 15000, status: 'Success', notes: 'Monthly credit allocation' },
    { id: 8, date: '2025-10-15', type: 'Deducted', amount: 12000, status: 'Failed', notes: 'Failed payment to equipment vendor' },
  ]);

  // Calculate statistics
  const totalAdded = creditHistory
    .filter(item => item.type === 'Added' && item.status === 'Success')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalDeducted = creditHistory
    .filter(item => item.type === 'Deducted' && item.status === 'Success')
    .reduce((sum, item) => sum + item.amount, 0);

  // Calculate percentage change
  const netChange = totalAdded - totalDeducted;
  const percentageChange = creditHistory.length > 0 ? (netChange / totalAdded * 100).toFixed(1) : 0;

  // Filter
  const filteredHistory = creditHistory.filter(item => {
    const matchesSearch = item.notes.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Check for low balance
  useEffect(() => {
    if (creditBalance < lowBalanceThreshold) {
      setShowLowBalanceAlert(true);
    } else {
      setShowLowBalanceAlert(false);
    }
  }, [creditBalance]);

  const handleRequestCredits = () => {
    if (!requestAmount || !requestReason) {
      alert('Please enter both an amount and a reason.');
      return;
    }

    const newTransaction = {
      id: creditHistory.length + 1,
      date: new Date().toISOString().split('T')[0],
      type: 'Added',
      amount: parseFloat(requestAmount),
      status: 'Pending',
      notes: requestReason,
    };

    setCreditHistory([newTransaction, ...creditHistory]);

    alert(`Your request for ₹${parseFloat(requestAmount).toLocaleString()} has been submitted!`);

    setRequestAmount('');
    setRequestReason('');
    setShowRequestModal(false);
  };

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailsModal(true);
  };

  return (
    <div className="container-fluid p-3 p-md-4" style={{ minHeight: "100vh", backgroundColor: '#f8f9fa' }}>
      {/* Header Section */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <h2 className="fw-bold mb-3 mb-md-0" style={{ color: "#C62828" }}>My Credits</h2>
        <div className="d-flex align-items-center text-muted small">
          <span className="me-2">Last updated:</span>
          <span>{lastUpdated}</span>
        </div>
      </div>

      {/* Low Balance Alert */}
      {showLowBalanceAlert && (
        <div className="alert alert-warning d-flex align-items-center mb-4" style={{ borderRadius: "12px", border: "none" }}>
          <FaExclamationTriangle className="me-2 flex-shrink-0" />
          <div className="flex-grow-1">
            Your credit balance is below ₹{lowBalanceThreshold.toLocaleString()}. Please request more credits.
          </div>
          <button type="button" className="btn-close flex-shrink-0" onClick={() => setShowLowBalanceAlert(false)}></button>
        </div>
      )}

      {/* Credit Balance Cards */}
      <div className="row mb-4">
        <div className="col-12 col-lg-4 mb-4 mb-lg-0">
          <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: "16px", background: "linear-gradient(135deg, #C62828 0%, #D32F2F 100%)" }}>
            <div className="card-body p-4 text-white">
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                  <p className="mb-2 text-white-50">Current Balance</p>
                  <h1 className="fw-bold mb-0" style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)" }}>₹{creditBalance.toLocaleString()}</h1>
                </div>
                <div className="d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: "60px", height: "60px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)" }}>
                  <FaCreditCard size={30} color="white" />
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className={`d-flex align-items-center me-3 ${netChange >= 0 ? 'text-white-50' : 'text-white-50'}`}>
                  {netChange >= 0 ? <FaArrowTrendUp className="me-1" /> : <FaArrowTrendDown className="me-1" />}
                  <span>{Math.abs(percentageChange)}%</span>
                </div>
                <div className="text-white-50 small">from last month</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
          <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: "16px" }}>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0 fw-semibold">Total Added</h5>
                <div className="d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#e8f5e9" }}>
                  <FaArrowTrendUp size={20} color="#2e7d32" />
                </div>
              </div>
              <h3 className="fw-bold text-success mb-2" style={{ fontSize: "clamp(1.25rem, 4vw, 1.75rem)" }}>₹{totalAdded.toLocaleString()}</h3>
              <div className="progress" style={{ height: "6px" }}>
                <div className="progress-bar bg-success" role="progressbar" style={{ width: `${totalAdded > 0 ? (totalAdded / (totalAdded + totalDeducted) * 100) : 0}%` }}></div>
              </div>
              <p className="text-muted small mt-2 mb-0">{creditHistory.filter(item => item.type === 'Added' && item.status === 'Success').length} transactions</p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
          <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: "16px" }}>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0 fw-semibold">Total Deducted</h5>
                <div className="d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#ffebee" }}>
                  <FaArrowTrendDown size={20} color="#c62828" />
                </div>
              </div>
              <h3 className="fw-bold text-danger mb-2" style={{ fontSize: "clamp(1.25rem, 4vw, 1.75rem)" }}>₹{totalDeducted.toLocaleString()}</h3>
              <div className="progress" style={{ height: "6px" }}>
                <div className="progress-bar bg-danger" role="progressbar" style={{ width: `${totalDeducted > 0 ? (totalDeducted / (totalAdded + totalDeducted) * 100) : 0}%` }}></div>
              </div>
              <p className="text-muted small mt-2 mb-0">{creditHistory.filter(item => item.type === 'Deducted' && item.status === 'Success').length} transactions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: "16px" }}>
        <div className="card-body p-4">
          <h5 className="mb-4 fw-semibold">Quick Actions</h5>
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <button
                className="btn d-flex align-items-center justify-content-center w-100 py-3 text-white"
                style={{ background: "linear-gradient(135deg, #C62828 0%, #D32F2F 100%)", borderRadius: "12px", transition: "all 0.3s ease" }}
                onClick={() => setShowRequestModal(true)}
              >
                <FaPlus className="me-2" />
                Request More Credits
              </button>
            </div>
            <div className="col-12 col-md-6">
              <button
                className="btn d-flex align-items-center justify-content-center w-100 py-3"
                style={{ border: "2px solid #C62828", color: "#C62828", borderRadius: "12px", background: "white", transition: "all 0.3s ease" }}
              >
                <FaDownload className="me-2" />
                Download Statement
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Credit History */}
      <div className="card border-0 shadow-sm" style={{ borderRadius: "16px" }}>
        <div className="card-header bg-white p-4 border-0">
          <div className="row align-items-center">
            <div className="col-12 col-md-6 mb-3 mb-md-0">
              <h5 className="mb-0 fw-semibold d-flex align-items-center">
                <FaHistory className="me-2" style={{ color: "#C62828" }} />
                Credit History
              </h5>
            </div>

            <div className="col-12 col-md-6">
              <div className="d-flex flex-column flex-md-row gap-2">
                <div className="position-relative flex-grow-1">
                  <input
                    type="text"
                    className="form-control ps-4"
                    style={{ border: "1px solid #E2E2E2", borderRadius: "8px" }}
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FaSearch
                    size={16}
                    color="#C62828"
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)"
                    }}
                  />
                </div>

                <select
                  className="form-select"
                  style={{ border: "1px solid #E2E2E2", borderRadius: "8px" }}
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="success">Success</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="card-body p-0">
          {/* Desktop Table View */}
          <div className="table-responsive d-none d-md-block">
            <table className="table table-hover mb-0 align-middle">
              <thead style={{ background: "#FFF5F5", position: 'sticky', top: 0, zIndex: 10 }}>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Notes</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {filteredHistory.map((item) => (
                  <tr key={item.id} style={{ transition: "all 0.2s ease" }}>
                    <td>{item.date}</td>

                    <td>
                      <div className="d-flex align-items-center">
                        <div className="me-2 p-1 rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            width: "28px",
                            height: "28px",
                            backgroundColor: item.type === 'Added' ? '#e8f5e9' : '#ffebee'
                          }}>
                          {item.type === 'Added'
                            ? <FaArrowTrendUp size={14} color="#2e7d32" />
                            : <FaArrowTrendDown size={14} color="#c62828" />
                          }
                        </div>
                        {item.type}
                      </div>
                    </td>

                    <td className={`fw-semibold ${item.type === 'Added' ? 'text-success' : 'text-danger'}`}>
                      {item.type === 'Added' ? '+' : '-'}₹{item.amount.toLocaleString()}
                    </td>

                    <td>
                      <span className={`badge rounded-pill ${item.status === 'Success'
                        ? 'bg-success'
                        : item.status === 'Pending'
                          ? 'bg-warning text-dark'
                          : 'bg-danger'
                        }`}>
                        {item.status}
                      </span>
                    </td>

                    <td className="text-truncate" style={{ maxWidth: '200px' }} title={item.notes}>
                      {item.notes}
                    </td>

                    <td>
                      <button
                        className="btn btn-sm text-white px-2"
                        style={{ background: "#C62828", borderRadius: "8px", transition: "all 0.2s ease" }}
                        onClick={() => handleViewDetails(item)}
                        title="View Details"
                      >
                        <FaEye size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="d-md-none p-3">
            {filteredHistory.length === 0 ? (
              <div className="text-center p-4">
                <p className="text-muted">No transactions found matching your criteria.</p>
              </div>
            ) : (
              filteredHistory.map((item) => (
                <div key={item.id} className="card mb-3 border" style={{ borderRadius: "12px" }}>
                  <div className="card-body p-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="d-flex align-items-center">
                        <div className="me-2 p-1 rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            width: "28px",
                            height: "28px",
                            backgroundColor: item.type === 'Added' ? '#e8f5e9' : '#ffebee'
                          }}>
                          {item.type === 'Added'
                            ? <FaArrowTrendUp size={14} color="#2e7d32" />
                            : <FaArrowTrendDown size={14} color="#c62828" />
                          }
                        </div>
                        <span className="fw-semibold">{item.type}</span>
                      </div>
                      <span className={`badge rounded-pill ${item.status === 'Success'
                        ? 'bg-success'
                        : item.status === 'Pending'
                          ? 'bg-warning text-dark'
                          : 'bg-danger'
                        }`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-muted small">{item.date}</span>
                      <span className={`fw-bold ${item.type === 'Added' ? 'text-success' : 'text-danger'}`}>
                        {item.type === 'Added' ? '+' : '-'}₹{item.amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="mb-2">
                      <p className="text-muted small mb-0">{item.notes}</p>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-sm text-white px-2"
                        style={{ background: "#C62828", borderRadius: "8px", transition: "all 0.2s ease" }}
                        onClick={() => handleViewDetails(item)}
                        title="View Details"
                      >
                        <FaEye size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {filteredHistory.length === 0 && (
            <div className="text-center p-4 d-none d-md-block">
              <p className="text-muted">No transactions found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Request Credits Modal */}
      {showRequestModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content" style={{ borderRadius: "16px", border: 'none' }}>
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold" style={{ color: "#C62828" }}>Request More Credits</h5>
                <button type="button" className="btn-close" onClick={() => setShowRequestModal(false)}></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Amount (₹)</label>
                  <input
                    type="number"
                    className="form-control"
                    style={{ borderRadius: "8px", border: "1px solid #E2E2E2" }}
                    placeholder="Enter amount"
                    value={requestAmount}
                    onChange={(e) => setRequestAmount(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Reason</label>
                  <textarea
                    className="form-control"
                    style={{ borderRadius: "8px", border: "1px solid #E2E2E2" }}
                    rows="3"
                    placeholder="Explain why you need more credits"
                    value={requestReason}
                    onChange={(e) => setRequestReason(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="modal-footer border-0">
                <button type="button" className="btn w-100 w-md-auto" style={{ borderRadius: "8px" }} onClick={() => setShowRequestModal(false)}>Cancel</button>
                <button type="button" className="btn text-white px-4 w-100 w-md-auto" style={{ background: "#C62828", borderRadius: "8px" }} onClick={handleRequestCredits}>Submit Request</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transaction Details Modal */}
      {showDetailsModal && selectedTransaction && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content" style={{ borderRadius: "16px", border: 'none' }}>
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold" style={{ color: "#C62828" }}>Transaction Details</h5>
                <button type="button" className="btn-close" onClick={() => setShowDetailsModal(false)}></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label text-muted small">Transaction ID</label>
                  <p className="mb-0 fw-semibold">#{selectedTransaction.id}</p>
                </div>

                <div className="mb-3">
                  <label className="form-label text-muted small">Date</label>
                  <p className="mb-0 fw-semibold">{selectedTransaction.date}</p>
                </div>

                <div className="mb-3">
                  <label className="form-label text-muted small">Type</label>
                  <div className="d-flex align-items-center">
                    <div className="me-2 p-1 rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "28px",
                        height: "28px",
                        backgroundColor: selectedTransaction.type === 'Added' ? '#e8f5e9' : '#ffebee'
                      }}>
                      {selectedTransaction.type === 'Added'
                        ? <FaArrowTrendUp size={14} color="#2e7d32" />
                        : <FaArrowTrendDown size={14} color="#c62828" />}
                    </div>
                    <p className="mb-0 fw-semibold">{selectedTransaction.type}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label text-muted small">Amount</label>
                  <p className={`mb-0 fw-bold ${selectedTransaction.type === 'Added' ? 'text-success' : 'text-danger'}`}>
                    {selectedTransaction.type === 'Added' ? '+' : '-'}₹{selectedTransaction.amount.toLocaleString()}
                  </p>
                </div>

                <div className="mb-3">
                  <label className="form-label text-muted small">Status</label>
                  <span className={`badge rounded-pill ${selectedTransaction.status === 'Success'
                    ? 'bg-success'
                    : selectedTransaction.status === 'Pending'
                      ? 'bg-warning text-dark'
                      : 'bg-danger'
                    }`}>
                    {selectedTransaction.status}
                  </span>
                </div>

                <div className="mb-3">
                  <label className="form-label text-muted small">Notes</label>
                  <p className="mb-0">{selectedTransaction.notes}</p>
                </div>
              </div>

              <div className="modal-footer border-0">
                <button
                  type="button"
                  className="btn text-white w-100"
                  style={{ background: "#C62828", borderRadius: "8px" }}
                  onClick={() => setShowDetailsModal(false)}
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

export default MyCredits;