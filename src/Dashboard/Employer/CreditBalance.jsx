import React, { useState } from 'react';
import { FaCreditCard, FaSearch, FaFilter, FaUserFriends, FaMoneyBillWave, FaPlus, FaTimes, FaEye } from 'react-icons/fa';
import "bootstrap/dist/css/bootstrap.min.css";

const CreditBalance = () => {
  const [showPayEmployee, setShowPayEmployee] = useState(false);
  const [showPayVendor, setShowPayVendor] = useState(false);
  const [showTransactionDetails, setShowTransactionDetails] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('this-month');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedVendor, setSelectedVendor] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentReference, setPaymentReference] = useState('');
  
  // Mock data
  const creditBalance = 45000;
  const lastUpdated = '12 Dec 2025';
  
  const creditHistory = [
    { 
      id: 1,
      date: '2025-12-10', 
      type: 'Added', 
      amount: 20000, 
      reference: 'REF123456', 
      balance: 45000, 
      status: 'Success',
      description: 'Monthly credit allocation',
      paymentMethod: 'Bank Transfer',
      recipient: 'Company Account'
    },
    { 
      id: 2,
      date: '2025-12-05', 
      type: 'Deducted', 
      amount: 15000, 
      reference: 'REF123455', 
      balance: 25000, 
      status: 'Success',
      description: 'Payment to employees',
      paymentMethod: 'Credit Transfer',
      recipient: 'Employee Payroll'
    },
    { 
      id: 3,
      date: '2025-11-28', 
      type: 'Added', 
      amount: 30000, 
      reference: 'REF123454', 
      balance: 40000, 
      status: 'Success',
      description: 'Quarterly bonus credits',
      paymentMethod: 'Bank Transfer',
      recipient: 'Company Account'
    },
    { 
      id: 4,
      date: '2025-11-15', 
      type: 'Deducted', 
      amount: 10000, 
      reference: 'REF123453', 
      balance: 10000, 
      status: 'Success',
      description: 'Vendor payment',
      paymentMethod: 'Credit Transfer',
      recipient: 'Office Supplies Inc.'
    },
  ];

  const employees = [
    { id: 1, name: 'John Doe', position: 'Developer' },
    { id: 2, name: 'Jane Smith', position: 'Designer' },
    { id: 3, name: 'Mike Johnson', position: 'Manager' },
  ];

  const vendors = [
    { id: 1, name: 'Office Supplies Inc.', service: 'Stationery' },
    { id: 2, name: 'Tech Solutions Ltd.', service: 'IT Services' },
    { id: 3, name: 'CleanPro Services', service: 'Cleaning' },
  ];

  // Filter credit history based on search and date filter
  const filteredHistory = creditHistory.filter(item => {
    const matchesSearch = item.reference.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesDate = true;
    if (dateFilter === 'this-month') {
      const itemDate = new Date(item.date);
      const currentDate = new Date();
      matchesDate = itemDate.getMonth() === currentDate.getMonth() && 
                   itemDate.getFullYear() === currentDate.getFullYear();
    } else if (dateFilter === 'last-3-months') {
      const itemDate = new Date(item.date);
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      matchesDate = itemDate >= threeMonthsAgo;
    }
    
    return matchesSearch && matchesDate;
  });

  const handlePayEmployee = () => {
    if (!selectedEmployee || !paymentAmount) {
      alert('Please select an employee and enter an amount');
      return;
    }
    
    // Simulate payment processing
    const newTransaction = {
      id: creditHistory.length + 1,
      date: new Date().toISOString().split('T')[0],
      type: 'Deducted',
      amount: parseFloat(paymentAmount),
      reference: `REF${Date.now()}`,
      balance: creditBalance - parseFloat(paymentAmount),
      status: 'Success',
      description: `Payment to ${employees.find(e => e.id === parseInt(selectedEmployee))?.name}`,
      paymentMethod: 'Credit Transfer',
      recipient: employees.find(e => e.id === parseInt(selectedEmployee))?.name
    };
    
    // Update credit balance
    // In a real app, this would update the state or make an API call
    alert(`Payment of ₹${paymentAmount} to ${employees.find(e => e.id === parseInt(selectedEmployee))?.name} processed successfully!`);
    
    // Reset form
    setSelectedEmployee('');
    setPaymentAmount('');
    setPaymentReference('');
    setShowPayEmployee(false);
  };

  const handlePayVendor = () => {
    if (!selectedVendor || !paymentAmount) {
      alert('Please select a vendor and enter an amount');
      return;
    }
    
    // Simulate payment processing
    const newTransaction = {
      id: creditHistory.length + 1,
      date: new Date().toISOString().split('T')[0],
      type: 'Deducted',
      amount: parseFloat(paymentAmount),
      reference: `REF${Date.now()}`,
      balance: creditBalance - parseFloat(paymentAmount),
      status: 'Success',
      description: `Payment to ${vendors.find(v => v.id === parseInt(selectedVendor))?.name}`,
      paymentMethod: 'Credit Transfer',
      recipient: vendors.find(v => v.id === parseInt(selectedVendor))?.name
    };
    
    // Update credit balance
    // In a real app, this would update the state or make an API call
    alert(`Payment of ₹${paymentAmount} to ${vendors.find(v => v.id === parseInt(selectedVendor))?.name} processed successfully!`);
    
    // Reset form
    setSelectedVendor('');
    setPaymentAmount('');
    setPaymentReference('');
    setShowPayVendor(false);
  };

  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setShowTransactionDetails(true);
  };

  return (
    <div className="container-fluid p-3 p-md-4" style={{ minHeight: "100vh", }}>
      <h2 className="fw-bold mb-4" style={{ color: "#C62828" }}>My Credits</h2>

      {/* Header Card - My Credit Balance */}
      <div className="card shadow mb-4" style={{ borderRadius: "14px", border: "1px solid #E2E2E2" }}>
        <div className="card-body p-3 p-md-4">
          <div className="row align-items-center">
            <div className="col-8 col-md-9">
              <p className="text-muted mb-2" style={{ color: "#4A4A4A" }}>Available Balance</p>
              <h2 className="fw-bold mb-2" style={{ color: "#B71C1C" }}>₹{creditBalance.toLocaleString()}</h2>
              <p className="text-muted small" style={{ color: "#4A4A4A" }}>Last updated: {lastUpdated}</p>
            </div>
            <div className="col-4 col-md-3 d-flex justify-content-end">
              <div className="d-flex align-items-center justify-content-center" 
                   style={{ width: "60px", height: "60px", borderRadius: "50%", backgroundColor: "#F7EFE9" }}>
                <FaCreditCard size={30} color="#C62828" />
              </div>
            </div>
          </div>
        </div>
      </div>

    

      {/* Credit History Section */}
      <div className="card shadow" style={{ borderRadius: "14px", border: "1px solid #E2E2E2" }}>
        <div className="card-header bg-white p-3 p-md-4">
          <div className="row align-items-center">
            <div className="col-12 col-md-6 mb-3 mb-md-0">
              <h5 className="fw-bold mb-0" style={{ color: "#000000" }}>Credit History</h5>
            </div>
            <div className="col-12 col-md-6">
              <div className="d-flex flex-column flex-md-row gap-2">
                <div className="position-relative flex-grow-1">
                  <select
                    className="form-select pe-4"
                    style={{ border: "1px solid #E2E2E2" }}
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  >
                    <option value="this-month">This Month</option>
                    <option value="last-3-months">Last 3 Months</option>
                    <option value="all">All</option>
                  </select>
                </div>
                <div className="position-relative flex-grow-1">
                  <input
                    type="text"
                    className="form-control ps-4"
                    style={{ border: "1px solid #E2E2E2" }}
                    placeholder="Search..."
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
              </div>
            </div>
          </div>
        </div>
        
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr style={{ background: "#FFF5F5", color: "#000000" }}>
                  <th style={{ color: "#4A4A4A" }}>Date</th>
                  <th style={{ color: "#4A4A4A" }}>Type</th>
                  <th className="d-none d-md-table-cell" style={{ color: "#4A4A4A" }}>Amount</th>
                  <th className="d-none d-lg-table-cell" style={{ color: "#4A4A4A" }}>Reference ID</th>
                  <th className="d-none d-md-table-cell" style={{ color: "#4A4A4A" }}>Balance</th>
                  <th style={{ color: "#4A4A4A" }}>Status</th>
                  <th style={{ color: "#4A4A4A" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((item, index) => (
                  <tr key={index}>
                    <td>{item.date}</td>
                    <td>{item.type}</td>
                    <td className={`d-none d-md-table-cell ${item.type === 'Added' ? 'text-success' : 'text-danger'}`}>
                      {item.type === 'Added' ? '+' : '-'}₹{item.amount.toLocaleString()}
                    </td>
                    <td className="d-none d-lg-table-cell">{item.reference}</td>
                    <td className="d-none d-md-table-cell">₹{item.balance.toLocaleString()}</td>
                    <td>
                      <span className={`badge ${
                        item.type === 'Added' ? 'bg-success' : 'bg-danger'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn btn-sm text-white" 
                        style={{ background: "#C62828", borderRadius: "8px" }}
                        onClick={() => handleViewTransaction(item)}
                      >
                        <FaEye size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredHistory.length === 0 && (
            <div className="text-center p-4">
              <p className="text-muted">No credit history found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Pay Employee Modal */}
      {showPayEmployee && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
             style={{ background: "rgba(0,0,0,0.55)", zIndex: 1050 }}>
          <div className="bg-white p-4 rounded shadow w-100" style={{ maxWidth: "420px", borderRadius: "14px" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0" style={{ color: "#C62828" }}>Pay Employee</h5>
              <button 
                className="btn btn-sm p-0" 
                onClick={() => setShowPayEmployee(false)}
                style={{ color: "#4A4A4A" }}
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ color: "#4A4A4A" }}>Select Employee</label>
              <select 
                className="form-select" 
                style={{ border: "1px solid #E2E2E2" }}
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
              >
                <option value="">Choose an employee</option>
                {employees.map(employee => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name} - {employee.position}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ color: "#4A4A4A" }}>Amount</label>
              <input 
                type="number" 
                className="form-control" 
                style={{ border: "1px solid #E2E2E2" }} 
                placeholder="Enter amount"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="form-label" style={{ color: "#4A4A4A" }}>Reference (Optional)</label>
              <input 
                type="text" 
                className="form-control" 
                style={{ border: "1px solid #E2E2E2" }} 
                placeholder="Payment reference"
                value={paymentReference}
                onChange={(e) => setPaymentReference(e.target.value)}
              />
            </div>
            <button 
              className="btn text-white w-100 mb-2 py-2" 
              style={{ background: "#C62828", borderRadius: "10px" }}
              onClick={handlePayEmployee}
            >
              Confirm Payment
            </button>
            <button 
              className="btn w-100 py-2" 
              onClick={() => setShowPayEmployee(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Pay Vendor Modal */}
      {showPayVendor && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
             style={{ background: "rgba(0,0,0,0.55)", zIndex: 1050 }}>
          <div className="bg-white p-4 rounded shadow w-100" style={{ maxWidth: "420px", borderRadius: "14px" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0" style={{ color: "#C62828" }}>Pay Vendor</h5>
              <button 
                className="btn btn-sm p-0" 
                onClick={() => setShowPayVendor(false)}
                style={{ color: "#4A4A4A" }}
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ color: "#4A4A4A" }}>Select Vendor</label>
              <select 
                className="form-select" 
                style={{ border: "1px solid #E2E2E2" }}
                value={selectedVendor}
                onChange={(e) => setSelectedVendor(e.target.value)}
              >
                <option value="">Choose a vendor</option>
                {vendors.map(vendor => (
                  <option key={vendor.id} value={vendor.id}>
                    {vendor.name} - {vendor.service}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ color: "#4A4A4A" }}>Amount</label>
              <input 
                type="number" 
                className="form-control" 
                style={{ border: "1px solid #E2E2E2" }} 
                placeholder="Enter amount"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="form-label" style={{ color: "#4A4A4A" }}>Reference (Optional)</label>
              <input 
                type="text" 
                className="form-control" 
                style={{ border: "1px solid #E2E2E2" }} 
                placeholder="Payment reference"
                value={paymentReference}
                onChange={(e) => setPaymentReference(e.target.value)}
              />
            </div>
            <button 
              className="btn text-white w-100 mb-2 py-2" 
              style={{ background: "#C62828", borderRadius: "10px" }}
              onClick={handlePayVendor}
            >
              Confirm Payment
            </button>
            <button 
              className="btn w-100 py-2" 
              onClick={() => setShowPayVendor(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Transaction Details Modal */}
      {showTransactionDetails && selectedTransaction && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
             style={{ background: "rgba(0,0,0,0.55)", zIndex: 1050 }}>
          <div className="bg-white p-4 rounded shadow w-100" style={{ maxWidth: "500px", borderRadius: "14px" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0" style={{ color: "#C62828" }}>Transaction Details</h5>
              <button 
                className="btn btn-sm p-0" 
                onClick={() => setShowTransactionDetails(false)}
                style={{ color: "#4A4A4A" }}
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ color: "#4A4A4A" }}>Transaction ID</label>
              <input 
                type="text" 
                className="form-control" 
                style={{ border: "1px solid #E2E2E2" }} 
                value={selectedTransaction.reference}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ color: "#4A4A4A" }}>Date</label>
              <input 
                type="text" 
                className="form-control" 
                style={{ border: "1px solid #E2E2E2" }} 
                value={selectedTransaction.date}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ color: "#4A4A4A" }}>Type</label>
              <input 
                type="text" 
                className="form-control" 
                style={{ border: "1px solid #E2E2E2" }} 
                value={selectedTransaction.type}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ color: "#4A4A4A" }}>Amount</label>
              <input 
                type="text" 
                className="form-control" 
                style={{ border: "1px solid #E2E2E2" }} 
                value={`${selectedTransaction.type === 'Added' ? '+' : '-'}₹${selectedTransaction.amount.toLocaleString()}`}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ color: "#4A4A4A" }}>Description</label>
              <input 
                type="text" 
                className="form-control" 
                style={{ border: "1px solid #E2E2E2" }} 
                value={selectedTransaction.description}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ color: "#4A4A4A" }}>Payment Method</label>
              <input 
                type="text" 
                className="form-control" 
                style={{ border: "1px solid #E2E2E2" }} 
                value={selectedTransaction.paymentMethod}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="form-label" style={{ color: "#4A4A4A" }}>Recipient</label>
              <input 
                type="text" 
                className="form-control" 
                style={{ border: "1px solid #E2E2E2" }} 
                value={selectedTransaction.recipient}
                readOnly
              />
            </div>
            <button 
              className="btn text-white w-100 py-2" 
              style={{ background: "#C62828", borderRadius: "10px" }}
              onClick={() => setShowTransactionDetails(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditBalance;