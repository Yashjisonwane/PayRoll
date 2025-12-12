import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Color scheme as specified
const colors = {
  primaryRed: '#C62828',
  darkRed: '#B71C1C',
  pureWhite: '#FFFFFF',
  blackText: '#000000',
  darkGrayText: '#4A4A4A',
  lightGrayBorder: '#E2E2E2',
  lightBackground: '#F9F9F9',
  successGreen: '#4CAF50',
  warningOrange: '#FF9800',
};

const AddCredit = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showTrashModal, setShowTrashModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [selectedCredit, setSelectedCredit] = useState(null);
  const [totalCredits, setTotalCredits] = useState(0);
  const [totalEmployers, setTotalEmployers] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const employers = ["Amit Enterprises", "Verma Industries", "TechSpark Pvt Ltd", "Global Solutions", "Innovate Tech"];

  const [history, setHistory] = useState([
    { 
      date: "02 Dec 2025", 
      employer: "Amit Enterprises", 
      amount: 8000, 
      ref: "Bank", 
      mode: "Bank", 
      txnId: "TXN-98341", 
      addedBy: "Admin",
      isOnline: false
    },
    { 
      date: "01 Dec 2025", 
      employer: "Verma Industries", 
      amount: 3000, 
      ref: "Ref-002", 
      mode: "Cash", 
      txnId: "---", 
      addedBy: "Admin",
      isOnline: false
    },
    { 
      date: "30 Nov 2025", 
      employer: "TechSpark Pvt Ltd", 
      amount: 5000, 
      ref: "Monthly Credit", 
      mode: "UPI", 
      txnId: "UPI-11234", 
      addedBy: "System",
      isOnline: true,
      paymentGateway: "Razorpay",
      paymentStatus: "Success",
      paymentTime: "30 Nov 2025, 14:35:22"
    },
    { 
      date: "28 Nov 2025", 
      employer: "Global Solutions", 
      amount: 7500, 
      ref: "Project Funding", 
      mode: "Bank", 
      txnId: "TXN-98290", 
      addedBy: "Admin",
      isOnline: false
    },
    { 
      date: "25 Nov 2025", 
      employer: "Innovate Tech", 
      amount: 4500, 
      ref: "Initial Credit", 
      mode: "Wallet", 
      txnId: "WAL-8876", 
      addedBy: "Admin",
      isOnline: true,
      paymentGateway: "Paytm",
      paymentStatus: "Success",
      paymentTime: "25 Nov 2025, 10:15:45"
    },
  ]);

  const [formData, setFormData] = useState({
    employer: "",
    amount: "",
    reference: "",
    mode: "",
    txnId: "",
    isOnline: false,
    paymentGateway: "",
    paymentStatus: "",
  });

  const [addFormData, setAddFormData] = useState({
    employer: "",
    amount: "",
    reference: "",
    mode: "",
    txnId: "",
    isOnline: false,
    paymentGateway: "",
    paymentStatus: "",
  });

  const [editFormData, setEditFormData] = useState({
    employer: "",
    amount: "",
    reference: "",
    mode: "",
    txnId: "",
    isOnline: false,
    paymentGateway: "",
    paymentStatus: "",
  });

  const [trashFormData, setTrashFormData] = useState({
    reason: "",
    note: "",
  });

  // Bulk form state
  const [bulkFormData, setBulkFormData] = useState({
    employers: [],
    amount: "",
    reference: "",
    mode: "",
    txnId: "",
    isOnline: false,
    paymentGateway: "",
    paymentStatus: "",
  });

  // Calculate statistics when component mounts or history changes
  useEffect(() => {
    const credits = history.reduce((sum, item) => sum + parseInt(item.amount), 0);
    setTotalCredits(credits);
    setTotalEmployers(new Set(history.map(item => item.employer)).size);
    setTotalTransactions(history.length);
  }, [history]);

  // Toggle employer selection in bulk modal
  const toggleBulkEmployer = (employer) => {
    setBulkFormData(prev => {
      const isSelected = prev.employers.includes(employer);
      if (isSelected) {
        return { ...prev, employers: prev.employers.filter(e => e !== employer) };
      } else {
        return { ...prev, employers: [...prev.employers, employer] };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
      ...formData,
      addedBy: "Admin",
      paymentTime: formData.isOnline ? new Date().toLocaleString('en-US', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }) : ""
    };
    setHistory([newEntry, ...history]);
    alert("Credit Added Successfully");
    setShowModal(false);
    setFormData({ 
      employer: "", 
      amount: "", 
      reference: "", 
      mode: "", 
      txnId: "",
      isOnline: false,
      paymentGateway: "",
      paymentStatus: ""
    });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
      ...addFormData,
      addedBy: "Admin",
      paymentTime: addFormData.isOnline ? new Date().toLocaleString('en-US', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }) : ""
    };
    setHistory([newEntry, ...history]);
    alert("Credit Added Successfully");
    setShowAddModal(false);
    setAddFormData({ 
      employer: "", 
      amount: "", 
      reference: "", 
      mode: "", 
      txnId: "",
      isOnline: false,
      paymentGateway: "",
      paymentStatus: ""
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const index = history.findIndex(item => item === selectedCredit);
    if (index !== -1) {
      const updatedHistory = [...history];
      updatedHistory[index] = {
        ...selectedCredit,
        ...editFormData,
        addedBy: "Admin",
        paymentTime: editFormData.isOnline && !selectedCredit.isOnline ? new Date().toLocaleString('en-US', { 
          day: '2-digit', 
          month: 'short', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }) : selectedCredit.paymentTime
      };
      setHistory(updatedHistory);
      alert("Credit Updated Successfully");
      setShowEditModal(false);
    }
  };

  const handleTrashSubmit = (e) => {
    e.preventDefault();
    const index = history.findIndex(item => item === selectedCredit);
    if (index !== -1) {
      const updatedHistory = history.filter((_, i) => i !== index);
      setHistory(updatedHistory);
      alert("Credit Removed Successfully");
      setShowTrashModal(false);
      setTrashFormData({ reason: "", note: "" });
    }
  };

  // Bulk submit handler
  const handleBulkSubmit = (e) => {
    e.preventDefault();
    if (bulkFormData.employers.length === 0) {
      alert("Please select at least one employer.");
      return;
    }
    if (!bulkFormData.amount || bulkFormData.amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const newEntries = bulkFormData.employers.map(employer => ({
      date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
      employer,
      amount: bulkFormData.amount,
      ref: bulkFormData.reference || "Bulk Credit",
      mode: bulkFormData.mode,
      txnId: bulkFormData.txnId || "---",
      addedBy: "Admin",
      isOnline: bulkFormData.isOnline,
      paymentGateway: bulkFormData.paymentGateway,
      paymentStatus: bulkFormData.paymentStatus,
      paymentTime: bulkFormData.isOnline ? new Date().toLocaleString('en-US', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }) : ""
    }));

    setHistory(prev => [...newEntries, ...prev]);
    alert(`${newEntries.length} credits added successfully!`);
    setShowBulkModal(false);
    setBulkFormData({ 
      employers: [], 
      amount: "", 
      reference: "", 
      mode: "", 
      txnId: "",
      isOnline: false,
      paymentGateway: "",
      paymentStatus: ""
    });
  };

  const handleViewDetails = (credit) => {
    setSelectedCredit(credit);
    setShowDetailsModal(true);
  };

  const handleAddCredit = (credit) => {
    setSelectedCredit(credit);
    setAddFormData({
      employer: credit.employer,
      amount: "",
      reference: "",
      mode: "",
      txnId: "",
      isOnline: false,
      paymentGateway: "",
      paymentStatus: "",
    });
    setShowAddModal(true);
  };

  const handleEditCredit = (credit) => {
    setSelectedCredit(credit);
    setEditFormData({
      employer: credit.employer,
      amount: credit.amount,
      reference: credit.ref,
      mode: credit.mode,
      txnId: credit.txnId,
      isOnline: credit.isOnline || false,
      paymentGateway: credit.paymentGateway || "",
      paymentStatus: credit.paymentStatus || "",
    });
    setShowEditModal(true);
  };

  const handleTrashCredit = (credit) => {
    setSelectedCredit(credit);
    setTrashFormData({ reason: "", note: "" });
    setShowTrashModal(true);
  };

  return (
    <div className="container-fluid py-2 py-md-4" style={{ minHeight: "100vh" }}>
      {/* Page Title */}
      <h2 className="fw-bold mb-4" style={{ color: colors.blackText, fontSize: isMobile ? '1.5rem' : '2rem' }}>Credits</h2>

      {/* Statistics Cards */}
      <div className="row mb-4">
        <div className="col-12 col-sm-6 col-lg-4 mb-3">
          <div className="card shadow-sm h-100" style={{ border: `1px solid ${colors.lightGrayBorder}` }}>
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <p className="mb-1" style={{ color: colors.darkGrayText, fontSize: isMobile ? "0.75rem" : "0.875rem" }}>TOTAL CREDITS</p>
                  <h3 className="fw-bold mb-0" style={{ color: colors.primaryRed, fontSize: isMobile ? '1.25rem' : '1.5rem' }}>₹{totalCredits.toLocaleString()}</h3>
                </div>
                <div className="ms-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" 
                       style={{ backgroundColor: colors.primaryRed, width: isMobile ? "40px" : "50px", height: isMobile ? "40px" : "50px" }}>
                    <i className="bi bi-currency-rupee text-white" style={{ fontSize: isMobile ? '1.25rem' : '1.5rem' }}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 mb-3">
          <div className="card shadow-sm h-100" style={{ border: `1px solid ${colors.lightGrayBorder}` }}>
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <p className="mb-1" style={{ color: colors.darkGrayText, fontSize: isMobile ? "0.75rem" : "0.875rem" }}>EMPLOYERS</p>
                  <h3 className="fw-bold mb-0" style={{ color: colors.primaryRed, fontSize: isMobile ? '1.25rem' : '1.5rem' }}>{totalEmployers}</h3>
                </div>
                <div className="ms-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" 
                       style={{ backgroundColor: colors.primaryRed, width: isMobile ? "40px" : "50px", height: isMobile ? "40px" : "50px" }}>
                    <i className="bi bi-people text-white" style={{ fontSize: isMobile ? '1.25rem' : '1.5rem' }}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 mb-3">
          <div className="card shadow-sm h-100" style={{ border: `1px solid ${colors.lightGrayBorder}` }}>
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <p className="mb-1" style={{ color: colors.darkGrayText, fontSize: isMobile ? "0.75rem" : "0.875rem" }}>TRANSACTIONS</p>
                  <h3 className="fw-bold mb-0" style={{ color: colors.primaryRed, fontSize: isMobile ? '1.25rem' : '1.5rem' }}>{totalTransactions}</h3>
                </div>
                <div className="ms-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" 
                       style={{ backgroundColor: colors.primaryRed, width: isMobile ? "40px" : "50px", height: isMobile ? "40px" : "50px" }}>
                    <i className="bi bi-arrow-left-right text-white" style={{ fontSize: isMobile ? '1.25rem' : '1.5rem' }}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ADD CREDIT BUTTONS - Right aligned */}
      <div className="d-flex justify-content-end mb-4 gap-2 flex-wrap">
        <button
          className="btn text-white fw-semibold px-3 px-md-4 py-2"
          style={{ background: colors.primaryRed, borderRadius: 8, fontSize: isMobile ? '0.875rem' : '1rem' }}
          onClick={() => setShowModal(true)}
        >
          <i className="bi bi-plus-circle me-2"></i>Add Credit
        </button>
        <button
          className="btn text-white fw-semibold px-3 px-md-4 py-2"
          style={{ background: colors.darkRed, borderRadius: 8, fontSize: isMobile ? '0.875rem' : '1rem' }}
          onClick={() => setShowBulkModal(true)}
        >
          <i className="bi bi-plus-circle-fill me-2"></i>Bulk Add
        </button>
      </div>

      {/* MODAL OVERLAY - Single Add */}
      {showModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center p-3"
          style={{ background: "rgba(0,0,0,0.60)", zIndex: 9999 }}
        >
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded shadow"
            style={{ 
              width: isMobile ? "100%" : "450px", 
              maxWidth: isMobile ? "100%" : "450px",
              animation: "zoomIn 0.2s" 
            }}
          >
            <h5 className="fw-bold mb-4 text-center" style={{ color: colors.primaryRed, fontSize: isMobile ? '1.125rem' : '1.25rem' }}>Add Credit to Employer</h5>

            <div className="mb-3">
              <label className="form-label" style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Employer</label>
              <select
                className="form-control"
                required
                value={formData.employer}
                onChange={(e) => setFormData({ ...formData, employer: e.target.value })}
                style={{ border: `1px solid ${colors.lightGrayBorder}`, fontSize: isMobile ? '0.875rem' : '1rem' }}
              >
                <option value="">Select Employer</option>
                {employers.map((emp) => (
                  <option key={emp} value={emp}>{emp}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label" style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Amount</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Amount"
                required
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                style={{ border: `1px solid ${colors.lightGrayBorder}`, fontSize: isMobile ? '0.875rem' : '1rem' }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label" style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Reference / Note</label>
              <input
                className="form-control"
                placeholder="Enter Reference / Note"
                value={formData.reference}
                onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                style={{ border: `1px solid ${colors.lightGrayBorder}`, fontSize: isMobile ? '0.875rem' : '1rem' }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label" style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Payment Mode</label>
              <select
                className="form-control"
                required
                value={formData.mode}
                onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                style={{ border: `1px solid ${colors.lightGrayBorder}`, fontSize: isMobile ? '0.875rem' : '1rem' }}
              >
                <option value="">Select Mode</option>
                <option value="Bank">Bank</option>
                <option value="UPI">UPI</option>
                <option value="Cash">Cash</option>
                <option value="Wallet">Wallet</option>
                <option value="Online">Online Payment</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label" style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Transaction ID (Optional)</label>
              <input
                className="form-control"
                placeholder="Enter Transaction ID"
                value={formData.txnId}
                onChange={(e) => setFormData({ ...formData, txnId: e.target.value })}
                style={{ border: `1px solid ${colors.lightGrayBorder}`, fontSize: isMobile ? '0.875rem' : '1rem' }}
              />
            </div>

            {/* Online Payment Details - Only show when Online Payment is selected */}
            {formData.mode === "Online" && (
              <>
                <div className="mb-3">
                  <label className="form-label" style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Payment Gateway</label>
                  <select
                    className="form-control"
                    required
                    value={formData.paymentGateway}
                    onChange={(e) => setFormData({ ...formData, paymentGateway: e.target.value })}
                    style={{ border: `1px solid ${colors.lightGrayBorder}`, fontSize: isMobile ? '0.875rem' : '1rem' }}
                  >
                    <option value="">Select Gateway</option>
                    <option value="Razorpay">Razorpay</option>
                    <option value="Paytm">Paytm</option>
                    <option value="PhonePe">PhonePe</option>
                    <option value="Google Pay">Google Pay</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Stripe">Stripe</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Payment Status</label>
                  <select
                    className="form-control"
                    required
                    value={formData.paymentStatus}
                    onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
                    style={{ border: `1px solid ${colors.lightGrayBorder}`, fontSize: isMobile ? '0.875rem' : '1rem' }}
                  >
                    <option value="">Select Status</option>
                    <option value="Success">Success</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>
              </>
            )}

            <div className="d-flex gap-2">
              <button
                type="submit"
                className="btn text-white fw-semibold w-100"
                style={{ background: colors.primaryRed, fontSize: isMobile ? '0.875rem' : '1rem' }}
              >
                Submit
              </button>
              <button
                type="button"
                className="btn fw-semibold w-100"
                style={{ border: `1px solid ${colors.lightGrayBorder}`, color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* BULK ADD MODAL - Made scrollable */}
      {showBulkModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center p-3"
          style={{ background: "rgba(0,0,0,0.60)", zIndex: 9999 }}
        >
          <div
            className="bg-white rounded shadow"
            style={{ 
              width: isMobile ? "100%" : "480px", 
              maxWidth: isMobile ? "100%" : "480px",
              animation: "zoomIn 0.2s",
              maxHeight: isMobile ? "90vh" : "85vh",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div className="p-4 border-bottom">
              <h5 className="fw-bold text-center mb-0" style={{ color: colors.primaryRed, fontSize: isMobile ? '1.125rem' : '1.25rem' }}>
                Bulk Add Credit
              </h5>
            </div>
            
            <form onSubmit={handleBulkSubmit} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <div className="p-4 overflow-auto" style={{ flex: 1, maxHeight: isMobile ? "calc(90vh - 180px)" : "calc(85vh - 180px)" }}>
                {/* Employer Multi-Select with Checkboxes */}
                <div className="mb-3">
                  <label className="form-label" style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>
                    Select Employers
                  </label>
                  <div className="border rounded p-2" style={{ 
                    maxHeight: isMobile ? '150px' : '200px', 
                    overflowY: 'auto', 
                    border: `1px solid ${colors.lightGrayBorder}` 
                  }}>
                    {employers.map(emp => (
                      <div key={emp} className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`bulk-emp-${emp}`}
                          checked={bulkFormData.employers.includes(emp)}
                          onChange={() => toggleBulkEmployer(emp)}
                        />
                        <label className="form-check-label" htmlFor={`bulk-emp-${emp}`} style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
                          {emp}
                        </label>
                      </div>
                    ))}
                  </div>
                  {bulkFormData.employers.length > 0 && (
                    <small className="text-muted mt-1 d-block">
                      {bulkFormData.employers.length} employer(s) selected
                    </small>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Amount (applied to all)"
                    required
                    value={bulkFormData.amount}
                    onChange={(e) => setBulkFormData({ ...bulkFormData, amount: e.target.value })}
                    style={{ border: `1px solid ${colors.lightGrayBorder}`, fontSize: isMobile ? '0.875rem' : '1rem' }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Reference / Note</label>
                  <input
                    className="form-control"
                    placeholder="Common Reference (Optional)"
                    value={bulkFormData.reference}
                    onChange={(e) => setBulkFormData({ ...bulkFormData, reference: e.target.value })}
                    style={{ border: `1px solid ${colors.lightGrayBorder}`, fontSize: isMobile ? '0.875rem' : '1rem' }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Payment Mode</label>
                  <select
                    className="form-control"
                    required
                    value={bulkFormData.mode}
                    onChange={(e) => setBulkFormData({ ...bulkFormData, mode: e.target.value })}
                    style={{ border: `1px solid ${colors.lightGrayBorder}`, fontSize: isMobile ? '0.875rem' : '1rem' }}
                  >
                    <option value="">Select Mode</option>
                    <option value="Bank">Bank</option>
                    <option value="UPI">UPI</option>
                    <option value="Cash">Cash</option>
                    <option value="Wallet">Wallet</option>
                    <option value="Online">Online Payment</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Transaction ID (Optional)</label>
                  <input
                    className="form-control"
                    placeholder="Common Txn ID (Optional)"
                    value={bulkFormData.txnId}
                    onChange={(e) => setBulkFormData({ ...bulkFormData, txnId: e.target.value })}
                    style={{ border: `1px solid ${colors.lightGrayBorder}`, fontSize: isMobile ? '0.875rem' : '1rem' }}
                  />
                </div>

                {/* Online Payment Details - Only show when Online Payment is selected */}
                {bulkFormData.mode === "Online" && (
                  <>
                    <div className="mb-3">
                      <label className="form-label" style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Payment Gateway</label>
                      <select
                        className="form-control"
                        required
                        value={bulkFormData.paymentGateway}
                        onChange={(e) => setBulkFormData({ ...bulkFormData, paymentGateway: e.target.value })}
                        style={{ border: `1px solid ${colors.lightGrayBorder}`, fontSize: isMobile ? '0.875rem' : '1rem' }}
                      >
                        <option value="">Select Gateway</option>
                        <option value="Razorpay">Razorpay</option>
                        <option value="Paytm">Paytm</option>
                        <option value="PhonePe">PhonePe</option>
                        <option value="Google Pay">Google Pay</option>
                        <option value="PayPal">PayPal</option>
                        <option value="Stripe">Stripe</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label" style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Payment Status</label>
                      <select
                        className="form-control"
                        required
                        value={bulkFormData.paymentStatus}
                        onChange={(e) => setBulkFormData({ ...bulkFormData, paymentStatus: e.target.value })}
                        style={{ border: `1px solid ${colors.lightGrayBorder}`, fontSize: isMobile ? '0.875rem' : '1rem' }}
                      >
                        <option value="">Select Status</option>
                        <option value="Success">Success</option>
                        <option value="Pending">Pending</option>
                        <option value="Failed">Failed</option>
                      </select>
                    </div>
                  </>
                )}
              </div>

              <div className="p-4 border-top d-flex gap-2">
                <button
                  type="submit"
                  className="btn text-white fw-semibold w-100"
                  style={{ background: colors.primaryRed, fontSize: isMobile ? '0.875rem' : '1rem' }}
                >
                  Add to Selected
                </button>
                <button
                  type="button"
                  className="btn fw-semibold w-100"
                  style={{ border: `1px solid ${colors.lightGrayBorder}`, color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}
                  onClick={() => setShowBulkModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rest of modals (Add, Edit, Trash, Details) remain unchanged */}
      {showAddModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center p-3"
          style={{ background: "rgba(0,0,0,0.60)", zIndex: 9999 }}
        >
          <form
            onSubmit={handleAddSubmit}
            className="bg-white p-4 rounded shadow"
            style={{ 
              width: isMobile ? "100%" : "400px", 
              maxWidth: isMobile ? "100%" : "400px",
              animation: "zoomIn 0.2s" 
            }}
          >
            <h5 className="fw-bold mb-4 text-center" style={{ color: colors.primaryRed, fontSize: isMobile ? '1.125rem' : '1.25rem' }}>Add Credit to {addFormData.employer}</h5>

            <div className="mb-3">
              <label className="form-label" style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Amount</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Amount"
                required
                value={addFormData.amount}
                onChange={(e) => setAddFormData({ ...addFormData, amount: e.target.value })}
                style={{ border: `1px solid ${colors.lightGrayBorder}`, fontSize: isMobile ? '0.875rem' : '1rem' }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label" style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Reference / Note</label>
              <input
                className="form-control"
                placeholder="Enter Reference / Note"
                value={addFormData.reference}
                onChange={(e) => setAddFormData({ ...addFormData, reference: e.target.value })}
                style={{ border: `1px solid ${colors.lightGrayBorder}`, fontSize: isMobile ? '0.875rem' : '1rem' }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label" style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Payment Mode</label>
              <select
                className="form-control"
                required
                value={addFormData.mode}
                onChange={(e) => setAddFormData({ ...addFormData, mode: e.target.value })}
                style={{ border: `1px solid ${colors.lightGrayBorder}`, fontSize: isMobile ? '0.875rem' : '1rem' }}
              >
                <option value="">Select Mode</option>
                <option value="Bank">Bank</option>
                <option value="UPI">UPI</option>
                <option value="Cash">Cash</option>
                <option value="Wallet">Wallet</option>
                <option value="Online">Online Payment</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label" style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Transaction ID (Optional)</label>
              <input
                className="form-control"
                placeholder="Enter Transaction ID"
                value={addFormData.txnId}
                onChange={(e) => setAddFormData({ ...addFormData, txnId: e.target.value })}
                style={{ border: `1px solid ${colors.lightGrayBorder}`, fontSize: isMobile ? '0.875rem' : '1rem' }}
              />
            </div>

            {/* Online Payment Details - Only show when Online Payment is selected */}
            {addFormData.mode === "Online" && (
              <>
                <div className="mb-3">
                  <label className="form-label" style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Payment Gateway</label>
                  <select
                    className="form-control"
                    required
                    value={addFormData.paymentGateway}
                    onChange={(e) => setAddFormData({ ...addFormData, paymentGateway: e.target.value })}
                    style={{ border: `1px solid ${colors.lightGrayBorder}`, fontSize: isMobile ? '0.875rem' : '1rem' }}
                  >
                    <option value="">Select Gateway</option>
                    <option value="Razorpay">Razorpay</option>
                    <option value="Paytm">Paytm</option>
                    <option value="PhonePe">PhonePe</option>
                    <option value="Google Pay">Google Pay</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Stripe">Stripe</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Payment Status</label>
                  <select
                    className="form-control"
                    required
                    value={addFormData.paymentStatus}
                    onChange={(e) => setAddFormData({ ...addFormData, paymentStatus: e.target.value })}
                    style={{ border: `1px solid ${colors.lightGrayBorder}`, fontSize: isMobile ? '0.875rem' : '1rem' }}
                  >
                    <option value="">Select Status</option>
                    <option value="Success">Success</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>
              </>
            )}

            <div className="d-flex gap-2">
              <button
                type="submit"
                className="btn text-white fw-semibold w-100"
                style={{ background: colors.primaryRed, fontSize: isMobile ? '0.875rem' : '1rem' }}
              >
                Submit
              </button>
              <button
                type="button"
                className="btn fw-semibold w-100"
                style={{ border: `1px solid ${colors.lightGrayBorder}`, color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {showEditModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center p-3"
          style={{ background: "rgba(0,0,0,0.60)", zIndex: 9999 }}
        >
          <form
            onSubmit={handleEditSubmit}
            className="bg-white p-4 rounded shadow"
            style={{ 
              width: isMobile ? "100%" : "400px", 
              maxWidth: isMobile ? "100%" : "400px",
              animation: "zoomIn 0.2s" 
            }}
          >
            <h5 className="fw-bold mb-4 text-center" style={{ color: colors.primaryRed, fontSize: isMobile ? '1.125rem' : '1.25rem' }}>Edit Credit for {editFormData.employer}</h5>

            <div className="mb-3">
              <label className="form-label" style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Employer</label>
              <select
                className="form-control"
                required
                value={editFormData.employer}
                onChange={(e) => setEditFormData({ ...editFormData, employer: e.target.value })}
                style={{ border: `1px solid ${colors.lightGrayBorder}`, fontSize: isMobile ? '0.875rem' : '1rem' }}
              >
                {employers.map((emp) => (
                  <option key={emp} value={emp}>{emp}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label" style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Amount</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Amount"
                required
                value={editFormData.amount}
                onChange={(e) => setEditFormData({ ...editFormData, amount: e.target.value })}
                style={{ border: `1px solid ${colors.lightGrayBorder}`, fontSize: isMobile ? '0.875rem' : '1rem' }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label" style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Reference / Note</label>
              <input
                className="form-control"
                placeholder="Enter Reference / Note"
                value={editFormData.reference}
                onChange={(e) => setEditFormData({ ...editFormData, reference: e.target.value })}
                style={{ border: `1px solid ${colors.lightGrayBorder}`, fontSize: isMobile ? '0.875rem' : '1rem' }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label" style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Payment Mode</label>
              <select
                className="form-control"
                required
                value={editFormData.mode}
                onChange={(e) => setEditFormData({ ...editFormData, mode: e.target.value })}
                style={{ border: `1px solid ${colors.lightGrayBorder}`, fontSize: isMobile ? '0.875rem' : '1rem' }}
              >
                <option value="">Select Mode</option>
                <option value="Bank">Bank</option>
                <option value="UPI">UPI</option>
                <option value="Cash">Cash</option>
                <option value="Wallet">Wallet</option>
                <option value="Online">Online Payment</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label" style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Transaction ID (Optional)</label>
              <input
                className="form-control"
                placeholder="Enter Transaction ID"
                value={editFormData.txnId}
                onChange={(e) => setEditFormData({ ...editFormData, txnId: e.target.value })}
                style={{ border: `1px solid ${colors.lightGrayBorder}`, fontSize: isMobile ? '0.875rem' : '1rem' }}
              />
            </div>

            {/* Online Payment Details - Only show when Online Payment is selected */}
            {editFormData.mode === "Online" && (
              <>
                <div className="mb-3">
                  <label className="form-label" style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Payment Gateway</label>
                  <select
                    className="form-control"
                    required
                    value={editFormData.paymentGateway}
                    onChange={(e) => setEditFormData({ ...editFormData, paymentGateway: e.target.value })}
                    style={{ border: `1px solid ${colors.lightGrayBorder}`, fontSize: isMobile ? '0.875rem' : '1rem' }}
                  >
                    <option value="">Select Gateway</option>
                    <option value="Razorpay">Razorpay</option>
                    <option value="Paytm">Paytm</option>
                    <option value="PhonePe">PhonePe</option>
                    <option value="Google Pay">Google Pay</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Stripe">Stripe</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Payment Status</label>
                  <select
                    className="form-control"
                    required
                    value={editFormData.paymentStatus}
                    onChange={(e) => setEditFormData({ ...editFormData, paymentStatus: e.target.value })}
                    style={{ border: `1px solid ${colors.lightGrayBorder}`, fontSize: isMobile ? '0.875rem' : '1rem' }}
                  >
                    <option value="">Select Status</option>
                    <option value="Success">Success</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>
              </>
            )}

            <div className="d-flex gap-2">
              <button
                type="submit"
                className="btn text-white fw-semibold w-100"
                style={{ background: colors.primaryRed, fontSize: isMobile ? '0.875rem' : '1rem' }}
              >
                Update
              </button>
              <button
                type="button"
                className="btn fw-semibold w-100"
                style={{ border: `1px solid ${colors.lightGrayBorder}`, color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {showTrashModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center p-3"
          style={{ background: "rgba(0,0,0,0.60)", zIndex: 9999 }}
        >
          <form
            onSubmit={handleTrashSubmit}
            className="bg-white p-4 rounded shadow"
            style={{ 
              width: isMobile ? "100%" : "400px", 
              maxWidth: isMobile ? "100%" : "400px",
              animation: "zoomIn 0.2s" 
            }}
          >
            <h5 className="fw-bold mb-4 text-center" style={{ color: colors.primaryRed, fontSize: isMobile ? '1.125rem' : '1.25rem' }}>Remove Credit from {selectedCredit?.employer}</h5>

            <div className="mb-3">
              <label className="form-label" style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Reason for Removal</label>
              <select
                className="form-control"
                required
                value={trashFormData.reason}
                onChange={(e) => setTrashFormData({ ...trashFormData, reason: e.target.value })}
                style={{ border: `1px solid ${colors.lightGrayBorder}`, fontSize: isMobile ? '0.875rem' : '1rem' }}
              >
                <option value="">Select Reason</option>
                <option value="Error in transaction">Error in transaction</option>
                <option value="Duplicate entry">Duplicate entry</option>
                <option value="Refund processed">Refund processed</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label" style={{ color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}>Additional Note</label>
              <textarea
                className="form-control"
                placeholder="Enter Additional Note"
                rows="3"
                value={trashFormData.note}
                onChange={(e) => setTrashFormData({ ...trashFormData, note: e.target.value })}
                style={{ border: `1px solid ${colors.lightGrayBorder}`, fontSize: isMobile ? '0.875rem' : '1rem' }}
              />
            </div>

            <div className="d-flex gap-2">
              <button
                type="submit"
                className="btn text-white fw-semibold w-100"
                style={{ background: colors.primaryRed, fontSize: isMobile ? '0.875rem' : '1rem' }}
              >
                Remove Credit
              </button>
              <button
                type="button"
                className="btn fw-semibold w-100"
                style={{ border: `1px solid ${colors.lightGrayBorder}`, color: colors.darkGrayText, fontSize: isMobile ? '0.875rem' : '1rem' }}
                onClick={() => setShowTrashModal(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* CREDIT HISTORY TABLE */}
      <div className="card shadow-sm" style={{ borderRadius: 14, border: `1px solid ${colors.lightGrayBorder}` }}>
        <div className="card-header bg-white" style={{ borderBottom: `1px solid ${colors.lightGrayBorder}` }}>
          <h5 className="fw-bold" style={{ color: colors.blackText, fontSize: isMobile ? '1.125rem' : '1.25rem' }}>Credit History</h5>
        </div>
        <div className="card-body p-0">
          {isMobile ? (
            <div className="p-3">
              {history.map((row, i) => (
                <div key={i} className="card mb-3 border" style={{ borderRadius: "10px" }}>
                  <div className="card-body p-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="fw-bold mb-0" style={{ color: colors.primaryRed, fontSize: '0.9rem' }}>{row.employer}</h6>
                      <span style={{ color: colors.primaryRed, fontWeight: "600", fontSize: '0.9rem' }}>₹ {row.amount}</span>
                    </div>
                    <div className="row g-2">
                      <div className="col-6">
                        <small className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Date</small>
                        <span style={{ fontSize: '0.8rem' }}>{row.date}</span>
                      </div>
                      <div className="col-6">
                        <small className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Mode</small>
                        <span style={{ fontSize: '0.8rem' }}>{row.mode}</span>
                      </div>
                      <div className="col-6">
                        <small className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Reference</small>
                        <span style={{ fontSize: '0.8rem' }}>{row.ref || "-"}</span>
                      </div>
                      <div className="col-6">
                        <small className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Txn ID</small>
                        <span style={{ fontSize: '0.8rem' }}>{row.txnId || "-"}</span>
                      </div>
                    </div>
                    <div className="mt-2 d-flex justify-content-end gap-1">
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
                        onClick={() => handleViewDetails(row)}
                      >
                        <i className="bi bi-eye-fill"></i>
                      </button>
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
                        onClick={() => handleEditCredit(row)}
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </button>
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
                        onClick={() => handleTrashCredit(row)}
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr style={{ background: colors.lightBackground, color: colors.darkGrayText }}>
                    <th>Date</th>
                    <th>Employer</th>
                    <th>Amount</th>
                    <th>Reference</th>
                    <th>Mode</th>
                    <th>Txn ID</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((row, i) => (
                    <tr key={i}>
                      <td style={{ color: colors.blackText }}>{row.date}</td>
                      <td style={{ color: colors.blackText }}>{row.employer}</td>
                      <td style={{ color: colors.primaryRed, fontWeight: "600" }}>₹ {row.amount}</td>
                      <td style={{ color: colors.blackText }}>{row.ref || "-"}</td>
                      <td style={{ color: colors.blackText }}>{row.mode}</td>
                      <td style={{ color: colors.blackText }}>{row.txnId || "-"}</td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-1">
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
                            onClick={() => handleViewDetails(row)}
                          >
                            <i className="bi bi-eye-fill"></i>
                          </button>
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
                            onClick={() => handleEditCredit(row)}
                          >
                            <i className="bi bi-pencil-fill"></i>
                          </button>
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
                            onClick={() => handleTrashCredit(row)}
                          >
                            <i className="bi bi-trash-fill"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* VIEW DETAILS MODAL - Updated to show online payment details */}
      {showDetailsModal && selectedCredit && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center p-3"
          style={{ background: "rgba(0,0,0,0.60)", zIndex: 9999 }}
        >
          <div
            className="bg-white p-4 rounded shadow"
            style={{ 
              width: isMobile ? "100%" : "470px", 
              maxWidth: isMobile ? "100%" : "470px",
              animation: "zoomIn 0.2s" 
            }}
          >
            <h5 className="fw-bold mb-3 text-center" style={{ color: colors.primaryRed, fontSize: isMobile ? '1.125rem' : '1.25rem' }}>
              Credit Details
            </h5>

            <table className="table table-borderless mb-3">
              <tbody>
                <tr><th style={{ color: colors.darkGrayText, width: '40%', fontSize: isMobile ? '0.875rem' : '1rem' }}>Date:</th><td style={{ color: colors.blackText, fontSize: isMobile ? '0.875rem' : '1rem' }}>{selectedCredit.date}</td></tr>
                <tr><th style={{ color: colors.darkGrayText, width: '40%', fontSize: isMobile ? '0.875rem' : '1rem' }}>Employer:</th><td style={{ color: colors.blackText, fontSize: isMobile ? '0.875rem' : '1rem' }}>{selectedCredit.employer}</td></tr>
                <tr><th style={{ color: colors.darkGrayText, width: '40%', fontSize: isMobile ? '0.875rem' : '1rem' }}>Amount:</th><td style={{ color: colors.primaryRed, fontWeight: "600", fontSize: isMobile ? '0.875rem' : '1rem' }}>₹ {selectedCredit.amount}</td></tr>
                <tr><th style={{ color: colors.darkGrayText, width: '40%', fontSize: isMobile ? '0.875rem' : '1rem' }}>Reference:</th><td style={{ color: colors.blackText, fontSize: isMobile ? '0.875rem' : '1rem' }}>{selectedCredit.ref || "-"}</td></tr>
                <tr><th style={{ color: colors.darkGrayText, width: '40%', fontSize: isMobile ? '0.875rem' : '1rem' }}>Mode:</th><td style={{ color: colors.blackText, fontSize: isMobile ? '0.875rem' : '1rem' }}>{selectedCredit.mode}</td></tr>
                <tr><th style={{ color: colors.darkGrayText, width: '40%', fontSize: isMobile ? '0.875rem' : '1rem' }}>Transaction ID:</th><td style={{ color: colors.blackText, fontSize: isMobile ? '0.875rem' : '1rem' }}>{selectedCredit.txnId || "-"}</td></tr>
                <tr><th style={{ color: colors.darkGrayText, width: '40%', fontSize: isMobile ? '0.875rem' : '1rem' }}>Added By:</th><td style={{ color: colors.blackText, fontSize: isMobile ? '0.875rem' : '1rem' }}>{selectedCredit.addedBy}</td></tr>
                
                {/* Online Payment Details - Only show for online payments */}
                {selectedCredit.mode === "Online" && (
                  <>
                    <tr><th style={{ color: colors.darkGrayText, width: '40%', fontSize: isMobile ? '0.875rem' : '1rem' }}>Payment Gateway:</th><td style={{ color: colors.blackText, fontSize: isMobile ? '0.875rem' : '1rem' }}>{selectedCredit.paymentGateway || "-"}</td></tr>
                    <tr><th style={{ color: colors.darkGrayText, width: '40%', fontSize: isMobile ? '0.875rem' : '1rem' }}>Payment Status:</th>
                      <td style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
                        <span className={`badge ${
                          selectedCredit.paymentStatus === "Success" ? "bg-success" : 
                          selectedCredit.paymentStatus === "Pending" ? "bg-warning" : 
                          "bg-danger"
                        }`}>
                          {selectedCredit.paymentStatus || "-"}
                        </span>
                      </td>
                    </tr>
                    {selectedCredit.paymentTime && (
                      <tr><th style={{ color: colors.darkGrayText, width: '40%', fontSize: isMobile ? '0.875rem' : '1rem' }}>Payment Time:</th><td style={{ color: colors.blackText, fontSize: isMobile ? '0.875rem' : '1rem' }}>{selectedCredit.paymentTime}</td></tr>
                    )}
                  </>
                )}
              </tbody>
            </table>

            <button
              className="btn fw-semibold w-100"
              style={{ borderRadius: 8, background: colors.primaryRed, color: colors.pureWhite, fontSize: isMobile ? '0.875rem' : '1rem' }}
              onClick={() => setShowDetailsModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Small Popup Animation CSS */}
      <style>{`
        @keyframes zoomIn {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default AddCredit;