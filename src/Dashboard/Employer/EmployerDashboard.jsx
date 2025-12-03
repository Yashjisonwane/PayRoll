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
  FaTimesCircle
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
    { id: "TXN123456", date: "15 Dec 2023", beneficiary: "Vendor A", amount: 2500, status: "Success", description: "Office Supplies" },
    { id: "TXN123457", date: "10 Dec 2023", beneficiary: "Employee B", amount: 1200, status: "Success", description: "Project Bonus" },
    { id: "TXN123458", date: "05 Dec 2023", beneficiary: "Vendor C", amount: 3000, status: "Pending", description: "Equipment Purchase" },
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

  return (
    <div className="container-fluid p-3 p-md-4" style={{ minHeight: "100vh",  }}>
      <h2 className="fw-bold mb-4" style={{ color: "#C62828" }}>Employee Dashboard</h2>

      {/* Credit Balance Card */}
      <div className="row mb-4">
        <div className="col-12 col-lg-4 mb-3">
          <div className="card shadow h-100" style={{ borderRadius: "14px" }}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="text-muted">Credit Balance</h5>
                  <h2 className="fw-bold" style={{ color: "#C62828" }}>₹ {creditBalance.toLocaleString()}</h2>
                </div>
                <div className="d-flex align-items-center justify-content-center" 
                     style={{ width: "60px", height: "60px", borderRadius: "50%", backgroundColor: "rgba(198,40,40,0.1)" }}>
                  <FaCreditCard size={30} color="#C62828" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Credit History */}
        <div className="col-12 col-lg-8 mb-3">
          <div className="card shadow h-100" style={{ borderRadius: "14px" }}>
            <div className="card-header bg-white">
              <h5 className="fw-bold" style={{ color: "#C62828" }}>Credit History</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr style={{ background: "#FFF5F5", color: "#C62828" }}>
                      <th>Date</th>
                      <th className="d-none d-md-table-cell">Description</th>
                      <th>Type</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {creditHistory.map((item) => (
                      <tr key={item.id}>
                        <td>{item.date}</td>
                        <td className="d-none d-md-table-cell">{item.description}</td>
                        <td>
                          <span className={`badge ${item.type === 'Credit' ? 'bg-success' : 'bg-danger'}`}>
                            {item.type}
                          </span>
                        </td>
                        <td className={item.type === 'Credit' ? 'text-success' : 'text-danger'}>
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
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow" style={{ borderRadius: "14px" }}>
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="fw-bold mb-0" style={{ color: "#C62828" }}>Pay Employee / Vendor</h5>
              <button
                className="btn text-white fw-semibold"
                style={{ background: "#C62828", borderRadius: "10px" }}
                onClick={() => setShowPayForm(!showPayForm)}
              >
                <FaMoneyBillWave className="me-2" /> {showPayForm ? 'Cancel' : 'Make Payment'}
              </button>
            </div>
            {showPayForm && (
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label">Select Beneficiary</label>
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
                    <label className="form-label">Amount</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      placeholder="Enter amount"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Reference (Optional)</label>
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
                      className="btn text-white fw-semibold"
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
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow" style={{ borderRadius: "14px" }}>
            <div className="card-header bg-white">
              <h5 className="fw-bold mb-0" style={{ color: "#C62828" }}>Transactions</h5>
            </div>
            <div className="card-body">
              {/* Filters */}
              <div className="row g-3 mb-3">
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
                <div className="col-12 col-md-3 d-flex gap-2">
                  <button className="btn btn-outline-secondary flex-fill">
                    <FaFilter /> Filter
                  </button>
                  <button className="btn btn-outline-secondary flex-fill">
                    <FaDownload /> Export
                  </button>
                </div>
              </div>

              {/* Transactions Table */}
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr style={{ background: "#FFF5F5", color: "#C62828" }}>
                      <th>Transaction ID</th>
                      <th className="d-none d-md-table-cell">Date</th>
                      <th>Beneficiary</th>
                      <th className="d-none d-lg-table-cell">Description</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td>{transaction.id}</td>
                        <td className="d-none d-md-table-cell">{transaction.date}</td>
                        <td>{transaction.beneficiary}</td>
                        <td className="d-none d-lg-table-cell">{transaction.description}</td>
                        <td>₹ {transaction.amount.toLocaleString()}</td>
                        <td>
                          <span className={`badge ${
                            transaction.status === 'Success' ? 'bg-success' : 
                            transaction.status === 'Pending' ? 'bg-warning' : 'bg-danger'
                          }`}>
                            {transaction.status === 'Success' && <FaCheckCircle className="me-1" />}
                            {transaction.status === 'Pending' && <FaTimesCircle className="me-1" />}
                            {transaction.status === 'Failed' && <FaTimesCircle className="me-1" />}
                            {transaction.status}
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-sm text-white" style={{ background: "#C62828", borderRadius: "8px" }}>
                            <FaEye /> View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
      <div className="row g-4 mb-4">
        <div className="col-12 col-lg-8">
          <div className="card shadow h-100">
            <div className="card-header bg-white fw-semibold" style={{ color: "#C62828" }}>
              Credit Balance Trend
            </div>
            <div className="card-body">
              <Line data={lineData} height={120} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="card shadow h-100">
            <div className="card-header bg-white fw-semibold" style={{ color: "#C62828" }}>
              Credit Usage
            </div>
            <div className="card-body d-flex justify-content-center">
              <Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;