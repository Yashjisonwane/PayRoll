import React, { useState } from 'react';
import { FaUserTie, FaBuilding, FaUniversity, FaTimes, FaEye, FaCalendarAlt, FaMoneyBillWave, FaUser, FaStore, FaFilter, FaSearch } from 'react-icons/fa';
// Make sure to import Bootstrap CSS in your main App.js or index.js file
// import "bootstrap/dist/css/bootstrap.min.css";

const PaymentEmployer = () => {
  // --- MOCK DATA ---
  const employees = [
    { id: 'EMP001', name: 'Rahul Sharma' },
    { id: 'EMP002', name: 'Priya Patel' },
    { id: 'EMP003', name: 'Amit Singh' },
  ];

  const vendors = [
    { id: 'VEN001', name: 'Office Supplies Inc.' },
    { id: 'VEN002', name: 'Tech Solutions Ltd.' },
    { id: 'VEN003', name: 'CleanPro Services' },
  ];

  // --- STATE MANAGEMENT ---
  const [recentPayments, setRecentPayments] = useState([
    { id: 1, date: '2025-12-10', recipient: 'Rahul Sharma', type: 'Employee', amount: 85000, method: 'Bank Transfer', status: 'Success', notes: 'November Salary' },
    { id: 2, date: '2025-12-08', recipient: 'Office Supplies Inc.', type: 'Vendor', amount: 15000, method: 'Credits', status: 'Success', notes: 'Monthly stationery order' },
    { id: 3, date: '2025-12-05', recipient: 'Priya Patel', type: 'Employee', amount: 92000, method: 'Bank Transfer', status: 'Success', notes: 'November Salary + Bonus' },
    { id: 4, date: '2025-12-01', recipient: 'Tech Solutions Ltd.', type: 'Vendor', amount: 50000, method: 'Credits', status: 'Pending', notes: 'Annual software license' },
    { id: 5, date: '2025-11-28', recipient: 'Amit Singh', type: 'Employee', amount: 75000, method: 'Bank Transfer', status: 'Failed', notes: 'Incorrect account number' },
  ]);

  // Modal visibility states
  const [showPayEmployeeModal, setShowPayEmployeeModal] = useState(false);
  const [showPayVendorModal, setShowPayVendorModal] = useState(false);
  const [showBankTransferModal, setShowBankTransferModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  // Form data states
  const [employeePayment, setEmployeePayment] = useState({ employeeId: '', amount: '', method: 'Credits', notes: '' });
  const [vendorPayment, setVendorPayment] = useState({ vendorId: '', amount: '', method: 'Credits', notes: '' });
  const [bankTransfer, setBankTransfer] = useState({ recipientType: 'Employee', recipientName: '', accountNumber: '', ifsc: '', amount: '', notes: '' });

  // State for viewing receipt
  const [selectedPayment, setSelectedPayment] = useState(null);
  
  // State for filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  // --- HANDLER FUNCTIONS ---

  // Handle Pay Employee submission
  const handlePayEmployee = (e) => {
    e.preventDefault();
    const employee = employees.find(emp => emp.id === employeePayment.employeeId);
    if (!employee || !employeePayment.amount) {
      alert('Please select an employee and enter a valid amount.');
      return;
    }

    const newPayment = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      recipient: employee.name,
      type: 'Employee',
      amount: parseFloat(employeePayment.amount),
      method: employeePayment.method,
      status: Math.random() > 0.2 ? 'Success' : 'Pending', // Simulate status
      notes: employeePayment.notes,
    };

    setRecentPayments([newPayment, ...recentPayments]);
    alert(`Payment of ₹${newPayment.amount.toLocaleString()} to ${employee.name} via ${newPayment.method} is ${newPayment.status.toLowerCase()}.`);
    setShowPayEmployeeModal(false);
    setEmployeePayment({ employeeId: '', amount: '', method: 'Credits', notes: '' }); // Reset form
  };

  // Handle Pay Vendor submission
  const handlePayVendor = (e) => {
    e.preventDefault();
    const vendor = vendors.find(v => v.id === vendorPayment.vendorId);
    if (!vendor || !vendorPayment.amount) {
      alert('Please select a vendor and enter a valid amount.');
      return;
    }

    const newPayment = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      recipient: vendor.name,
      type: 'Vendor',
      amount: parseFloat(vendorPayment.amount),
      method: vendorPayment.method,
      status: Math.random() > 0.2 ? 'Success' : 'Pending',
      notes: vendorPayment.notes,
    };

    setRecentPayments([newPayment, ...recentPayments]);
    alert(`Payment of ₹${newPayment.amount.toLocaleString()} to ${vendor.name} via ${newPayment.method} is ${newPayment.status.toLowerCase()}.`);
    setShowPayVendorModal(false);
    setVendorPayment({ vendorId: '', amount: '', method: 'Credits', notes: '' }); // Reset form
  };

  // Handle Bank Transfer submission
  const handleBankTransfer = (e) => {
    e.preventDefault();
    if (!bankTransfer.recipientName || !bankTransfer.amount || !bankTransfer.accountNumber || !bankTransfer.ifsc) {
      alert('Please fill in all bank details.');
      return;
    }

    const newPayment = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      recipient: bankTransfer.recipientName,
      type: bankTransfer.recipientType,
      amount: parseFloat(bankTransfer.amount),
      method: 'Bank Transfer',
      status: Math.random() > 0.1 ? 'Success' : 'Failed', // Simulate status
      notes: bankTransfer.notes,
    };

    setRecentPayments([newPayment, ...recentPayments]);
    alert(`Bank transfer of ₹${newPayment.amount.toLocaleString()} to ${newPayment.recipientName} is ${newPayment.status.toLowerCase()}.`);
    setShowBankTransferModal(false);
    setBankTransfer({ recipientType: 'Employee', recipientName: '', accountNumber: '', ifsc: '', amount: '', notes: '' }); // Reset form
  };

  // Handle View Receipt
  const handleViewReceipt = (payment) => {
    setSelectedPayment(payment);
    setShowReceiptModal(true);
  };

  // Filter payments based on search, status, and type
  const filteredPayments = recentPayments.filter(payment => {
    const matchesSearch = payment.recipient.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         payment.notes.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || payment.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesType = filterType === 'all' || payment.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="container-fluid p-3 p-md-4" style={{ minHeight: "100vh" }}>
      {/* Header Section */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <h2 className="fw-bold mb-3 mb-md-0" style={{ color: "#C62828" }}>Payments</h2>
      </div>

      {/* Action Cards */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm border-0" style={{ borderRadius: "14px" }}>
            <div className="card-body d-flex flex-column justify-content-between p-4">
              <div>
                <h5 className="fw-bold mb-3">Pay Employee</h5>
                <p className="text-muted small">Process salary and other payments to your employees quickly.</p>
              </div>
              <button className="btn text-white mt-3 w-100" style={{ background: "#C62828", borderRadius: "8px" }} onClick={() => setShowPayEmployeeModal(true)}>
                <FaUserTie className="me-2" /> Pay Now
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm border-0" style={{ borderRadius: "14px" }}>
            <div className="card-body d-flex flex-column justify-content-between p-4">
              <div>
                <h5 className="fw-bold mb-3">Pay Vendor</h5>
                <p className="text-muted small">Make payments to your registered vendors for services and goods.</p>
              </div>
              <button className="btn text-white mt-3 w-100" style={{ background: "#C62828", borderRadius: "8px" }} onClick={() => setShowPayVendorModal(true)}>
                <FaBuilding className="me-2" /> Pay Vendor
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm border-0" style={{ borderRadius: "14px" }}>
            <div className="card-body d-flex flex-column justify-content-between p-4">
              <div>
                <h5 className="fw-bold mb-3">Bank Transfer</h5>
                <p className="text-muted small">Send a direct deposit to any bank account.</p>
              </div>
              <button className="btn text-white mt-3 w-100" style={{ background: "#C62828", borderRadius: "8px" }} onClick={() => setShowBankTransferModal(true)}>
                <FaUniversity className="me-2" /> Proceed
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Payments Table */}
      <div className="card shadow-sm border-0" style={{ borderRadius: "14px" }}>
        <div className="card-header bg-white p-4 border-0">
          <div className="row align-items-center">
            <div className="col-12 col-md-6 mb-3 mb-md-0">
              <h5 className="fw-bold mb-0">Recent Payments</h5>
            </div>
            <div className="col-12 col-md-6">
              <div className="d-flex flex-column flex-md-row gap-2">
                <div className="position-relative flex-grow-1">
                  <input
                    type="text"
                    className="form-control ps-4"
                    style={{ border: "1px solid #E2E2E2", borderRadius: "8px" }}
                    placeholder="Search payments..."
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
                <div className="d-flex gap-2">
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
                  <select
                    className="form-select"
                    style={{ border: "1px solid #E2E2E2", borderRadius: "8px" }}
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="all">All Types</option>
                    <option value="employee">Employee</option>
                    <option value="vendor">Vendor</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body p-0">
          {/* Desktop Table View */}
          <div className="table-responsive d-none d-md-block">
            <table className="table table-hover align-middle mb-0">
              <thead style={{ background: "#FFF5F5" }}>
                <tr>
                  <th>Date</th>
                  <th>Employee/Vendor</th>
                  <th>Amount</th>
                  <th>Payment Method</th>
                  <th>Status</th>
                  <th>Notes</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.slice(0, 10).map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.date}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className={`me-2 rounded-circle d-flex align-items-center justify-content-center`} style={{ width: "32px", height: "32px", backgroundColor: payment.type === 'Employee' ? '#e3f2fd' : '#f3e5f5' }}>
                          {payment.type === 'Employee' ? <FaUser size={16} color="#1976d2" /> : <FaStore size={16} color="#7b1fa2" />}
                        </div>
                        {payment.recipient}
                      </div>
                    </td>
                    <td className="fw-semibold">₹{payment.amount.toLocaleString()}</td>
                    <td>{payment.method}</td>
                    <td>
                      <span className={`badge rounded-pill ${
                        payment.status === 'Success' ? 'bg-success' : 
                        payment.status === 'Pending' ? 'bg-warning text-dark' : 
                        'bg-danger'
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="text-truncate" style={{ maxWidth: '150px' }}>{payment.notes}</td>
                    <td>
                      <button className="btn btn-sm" style={{ color: "#C62828" }} onClick={() => handleViewReceipt(payment)}>
                        <FaEye /> <span className="d-none d-lg-inline">View Receipt</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="d-md-none p-3">
            {filteredPayments.length === 0 ? (
              <div className="text-center p-4">
                <p className="text-muted">No payments found matching your criteria.</p>
              </div>
            ) : (
              filteredPayments.slice(0, 10).map((payment) => (
                <div key={payment.id} className="card mb-3 border" style={{ borderRadius: "12px" }}>
                  <div className="card-body p-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="d-flex align-items-center">
                        <div className={`me-2 rounded-circle d-flex align-items-center justify-content-center`} style={{ width: "32px", height: "32px", backgroundColor: payment.type === 'Employee' ? '#e3f2fd' : '#f3e5f5' }}>
                          {payment.type === 'Employee' ? <FaUser size={16} color="#1976d2" /> : <FaStore size={16} color="#7b1fa2" />}
                        </div>
                        <span className="fw-semibold">{payment.recipient}</span>
                      </div>
                      <span className={`badge rounded-pill ${
                        payment.status === 'Success' ? 'bg-success' : 
                        payment.status === 'Pending' ? 'bg-warning text-dark' : 
                        'bg-danger'
                      }`}>
                        {payment.status}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-muted small">{payment.date}</span>
                      <span className="fw-bold" style={{ color: "#C62828" }}>₹{payment.amount.toLocaleString()}</span>
                    </div>
                    <div className="mb-2">
                      <p className="text-muted small mb-0">{payment.method}</p>
                    </div>
                    <div className="mb-2">
                      <p className="text-muted small mb-0">{payment.notes}</p>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button className="btn btn-sm" style={{ color: "#C62828" }} onClick={() => handleViewReceipt(payment)}>
                        <FaEye /> View Receipt
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* --- MODALS --- */}

      {/* Pay Employee Modal */}
      {showPayEmployeeModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content" style={{ borderRadius: "14px", border: 'none' }}>
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold"><FaUserTie className="me-2" style={{ color: "#C62828" }} />Pay Employee</h5>
                <button type="button" className="btn-close" onClick={() => setShowPayEmployeeModal(false)}></button>
              </div>
              <form onSubmit={handlePayEmployee}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Employee Name</label>
                    <select className="form-select" value={employeePayment.employeeId} onChange={(e) => setEmployeePayment({ ...employeePayment, employeeId: e.target.value })} required>
                      <option value="">Select Employee</option>
                      {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name} ({emp.id})</option>)}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Amount (₹)</label>
                    <input type="number" className="form-control" value={employeePayment.amount} onChange={(e) => setEmployeePayment({ ...employeePayment, amount: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Payment Method</label>
                    <select className="form-select" value={employeePayment.method} onChange={(e) => setEmployeePayment({ ...employeePayment, method: e.target.value })}>
                      <option value="Credits">Credits</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Notes</label>
                    <textarea className="form-control" rows="2" value={employeePayment.notes} onChange={(e) => setEmployeePayment({ ...employeePayment, notes: e.target.value })}></textarea>
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button type="button" className="btn btn-secondary w-100 w-md-auto" onClick={() => setShowPayEmployeeModal(false)}>Cancel</button>
                  <button type="submit" className="btn text-white px-4 w-100 w-md-auto" style={{ background: "#C62828" }}>Pay Now</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Pay Vendor Modal */}
      {showPayVendorModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content" style={{ borderRadius: "14px", border: 'none' }}>
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold"><FaBuilding className="me-2" style={{ color: "#C62828" }} />Pay Vendor</h5>
                <button type="button" className="btn-close" onClick={() => setShowPayVendorModal(false)}></button>
              </div>
              <form onSubmit={handlePayVendor}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Vendor Name</label>
                    <select className="form-select" value={vendorPayment.vendorId} onChange={(e) => setVendorPayment({ ...vendorPayment, vendorId: e.target.value })} required>
                      <option value="">Select Vendor</option>
                      {vendors.map(vendor => <option key={vendor.id} value={vendor.id}>{vendor.name} ({vendor.id})</option>)}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Amount (₹)</label>
                    <input type="number" className="form-control" value={vendorPayment.amount} onChange={(e) => setVendorPayment({ ...vendorPayment, amount: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Payment Method</label>
                    <select className="form-select" value={vendorPayment.method} onChange={(e) => setVendorPayment({ ...vendorPayment, method: e.target.value })}>
                      <option value="Credits">Credits</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Notes</label>
                    <textarea className="form-control" rows="2" value={vendorPayment.notes} onChange={(e) => setVendorPayment({ ...vendorPayment, notes: e.target.value })}></textarea>
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button type="button" className="btn btn-secondary w-100 w-md-auto" onClick={() => setShowPayVendorModal(false)}>Cancel</button>
                  <button type="submit" className="btn text-white px-4 w-100 w-md-auto" style={{ background: "#C62828" }}>Pay Vendor</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Bank Transfer Modal */}
      {showBankTransferModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content" style={{ borderRadius: "14px", border: 'none' }}>
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold"><FaUniversity className="me-2" style={{ color: "#C62828" }} />Bank Transfer / Direct Deposit</h5>
                <button type="button" className="btn-close" onClick={() => setShowBankTransferModal(false)}></button>
              </div>
              <form onSubmit={handleBankTransfer}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Recipient Type</label>
                    <select className="form-select" value={bankTransfer.recipientType} onChange={(e) => setBankTransfer({ ...bankTransfer, recipientType: e.target.value })}>
                      <option value="Employee">Employee</option>
                      <option value="Vendor">Vendor</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Recipient Name</label>
                    <input type="text" className="form-control" value={bankTransfer.recipientName} onChange={(e) => setBankTransfer({ ...bankTransfer, recipientName: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Account Number</label>
                    <input type="text" className="form-control" value={bankTransfer.accountNumber} onChange={(e) => setBankTransfer({ ...bankTransfer, accountNumber: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">IFSC Code</label>
                    <input type="text" className="form-control" value={bankTransfer.ifsc} onChange={(e) => setBankTransfer({ ...bankTransfer, ifsc: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Amount (₹)</label>
                    <input type="number" className="form-control" value={bankTransfer.amount} onChange={(e) => setBankTransfer({ ...bankTransfer, amount: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Notes</label>
                    <textarea className="form-control" rows="2" value={bankTransfer.notes} onChange={(e) => setBankTransfer({ ...bankTransfer, notes: e.target.value })}></textarea>
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button type="button" className="btn btn-secondary w-100 w-md-auto" onClick={() => setShowBankTransferModal(false)}>Cancel</button>
                  <button type="submit" className="btn text-white px-4 w-100 w-md-auto" style={{ background: "#C62828" }}>Proceed Bank Transfer</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {showReceiptModal && selectedPayment && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content" style={{ borderRadius: "14px", border: 'none' }}>
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">Payment Receipt</h5>
                <button type="button" className="btn-close" onClick={() => setShowReceiptModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label text-muted small">Transaction ID</label>
                  <p className="fw-bold mb-0">#{selectedPayment.id}</p>
                </div>
                <div className="row mb-3">
                  <div className="col-6">
                    <label className="form-label text-muted small">Date</label>
                    <p className="fw-bold mb-0"><FaCalendarAlt className="me-1" />{selectedPayment.date}</p>
                  </div>
                  <div className="col-6">
                    <label className="form-label text-muted small">Status</label>
                    <p className="mb-0">
                      <span className={`badge rounded-pill ${
                        selectedPayment.status === 'Success' ? 'bg-success' : 
                        selectedPayment.status === 'Pending' ? 'bg-warning text-dark' : 
                        'bg-danger'
                      }`}>
                        {selectedPayment.status}
                      </span>
                    </p>
                  </div>
                </div>
                <hr />
                <div className="mb-3">
                  <label className="form-label text-muted small">Paid To</label>
                  <p className="fw-bold mb-0">{selectedPayment.recipient} ({selectedPayment.type})</p>
                </div>
                <div className="mb-3">
                  <label className="form-label text-muted small">Amount</label>
                  <p className="fw-bold mb-0" style={{ color: "#C62828", fontSize: '1.5rem' }}>₹{selectedPayment.amount.toLocaleString()}</p>
                </div>
                <div className="mb-3">
                  <label className="form-label text-muted small">Payment Method</label>
                  <p className="fw-bold mb-0"><FaMoneyBillWave className="me-1" />{selectedPayment.method}</p>
                </div>
                <div className="mb-3">
                  <label className="form-label text-muted small">Notes</label>
                  <p className="mb-0">{selectedPayment.notes || '-'}</p>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button type="button" className="btn text-white w-100" style={{ background: "#C62828" }} onClick={() => setShowReceiptModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentEmployer;