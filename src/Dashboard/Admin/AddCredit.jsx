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
  // lightBackground: '#F9F9F9',
};

const AddCredit = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCredit, setSelectedCredit] = useState(null);
  const [totalCredits, setTotalCredits] = useState(0);
  const [totalEmployers, setTotalEmployers] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);

  const employers = ["Amit Enterprises", "Verma Industries", "TechSpark Pvt Ltd", "Global Solutions", "Innovate Tech"];

  const [history, setHistory] = useState([
    { date: "02 Dec 2025", employer: "Amit Enterprises", amount: 8000, ref: "Bank", mode: "Bank", txnId: "TXN-98341", addedBy: "Admin" },
    { date: "01 Dec 2025", employer: "Verma Industries", amount: 3000, ref: "Ref-002", mode: "Cash", txnId: "---", addedBy: "Admin" },
    { date: "30 Nov 2025", employer: "TechSpark Pvt Ltd", amount: 5000, ref: "Monthly Credit", mode: "UPI", txnId: "UPI-11234", addedBy: "System" },
    { date: "28 Nov 2025", employer: "Global Solutions", amount: 7500, ref: "Project Funding", mode: "Bank", txnId: "TXN-98290", addedBy: "Admin" },
    { date: "25 Nov 2025", employer: "Innovate Tech", amount: 4500, ref: "Initial Credit", mode: "Wallet", txnId: "WAL-8876", addedBy: "Admin" },
  ]);

  const [formData, setFormData] = useState({
    employer: "",
    amount: "",
    reference: "",
    mode: "",
    txnId: "",
  });

  // Calculate statistics when component mounts or history changes
  useEffect(() => {
    const credits = history.reduce((sum, item) => sum + parseInt(item.amount), 0);
    setTotalCredits(credits);
    setTotalEmployers(new Set(history.map(item => item.employer)).size);
    setTotalTransactions(history.length);
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
      ...formData,
      addedBy: "Admin"
    };
    setHistory([newEntry, ...history]);
    alert("Credit Added Successfully");
    setShowModal(false);
    setFormData({ employer: "", amount: "", reference: "", mode: "", txnId: "" });
  };

  const handleViewDetails = (credit) => {
    setSelectedCredit(credit);
    setShowDetailsModal(true);
  };

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: colors.lightBackground, minHeight: "100vh" }}>
      {/* Page Title */}
      <h2 className="fw-bold mb-4" style={{ color: colors.blackText }}>Credits</h2>

      {/* Statistics Cards */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3 mb-md-0">
          <div className="card shadow-sm h-100" style={{ border: `1px solid ${colors.lightGrayBorder}` }}>
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <p className="mb-1" style={{ color: colors.darkGrayText, fontSize: "0.875rem" }}>TOTAL CREDITS</p>
                  <h3 className="fw-bold mb-0" style={{ color: colors.primaryRed }}>₹{totalCredits.toLocaleString()}</h3>
                </div>
                <div className="ms-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" 
                       style={{ backgroundColor: colors.primaryRed, width: "50px", height: "50px" }}>
                    <i className="bi bi-currency-rupee text-white fs-4"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3 mb-md-0">
          <div className="card shadow-sm h-100" style={{ border: `1px solid ${colors.lightGrayBorder}` }}>
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <p className="mb-1" style={{ color: colors.darkGrayText, fontSize: "0.875rem" }}>EMPLOYERS</p>
                  <h3 className="fw-bold mb-0" style={{ color: colors.primaryRed }}>{totalEmployers}</h3>
                </div>
                <div className="ms-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" 
                       style={{ backgroundColor: colors.primaryRed, width: "50px", height: "50px" }}>
                    <i className="bi bi-people text-white fs-4"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3 mb-md-0">
          <div className="card shadow-sm h-100" style={{ border: `1px solid ${colors.lightGrayBorder}` }}>
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <p className="mb-1" style={{ color: colors.darkGrayText, fontSize: "0.875rem" }}>TRANSACTIONS</p>
                  <h3 className="fw-bold mb-0" style={{ color: colors.primaryRed }}>{totalTransactions}</h3>
                </div>
                <div className="ms-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" 
                       style={{ backgroundColor: colors.primaryRed, width: "50px", height: "50px" }}>
                    <i className="bi bi-arrow-left-right text-white fs-4"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ADD CREDIT BUTTON - Now aligned to the right */}
      <div className="d-flex justify-content-end mb-4">
        <button
          className="btn text-white fw-semibold px-4 py-2"
          style={{ background: colors.primaryRed, borderRadius: 8 }}
          onClick={() => setShowModal(true)}
        >
          <i className="bi bi-plus-circle me-2"></i>Add Credits
        </button>
      </div>

      {/* MODAL OVERLAY */}
      {showModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.60)", zIndex: 9999 }}
        >
          {/* MODAL CARD */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded shadow"
            style={{ width: 450, animation: "zoomIn 0.2s" }}
          >
            <h5 className="fw-bold mb-4 text-center" style={{ color: colors.primaryRed }}>
              Add Credit to Employer
            </h5>

            <select
              className="form-control mb-3"
              required
              value={formData.employer}
              onChange={(e) => setFormData({ ...formData, employer: e.target.value })}
              style={{ border: `1px solid ${colors.lightGrayBorder}` }}
            >
              <option value="">Select Employer</option>
              {employers.map((emp) => (
                <option key={emp} value={emp}>{emp}</option>
              ))}
            </select>

            <input
              type="number"
              className="form-control mb-3"
              placeholder="Amount"
              required
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              style={{ border: `1px solid ${colors.lightGrayBorder}` }}
            />

            <input
              className="form-control mb-3"
              placeholder="Reference / Note"
              value={formData.reference}
              onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
              style={{ border: `1px solid ${colors.lightGrayBorder}` }}
            />

            <select
              className="form-control mb-3"
              required
              value={formData.mode}
              onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
              style={{ border: `1px solid ${colors.lightGrayBorder}` }}
            >
              <option value="">Select Mode</option>
              <option value="Bank">Bank</option>
              <option value="UPI">UPI</option>
              <option value="Cash">Cash</option>
              <option value="Wallet">Wallet</option>
            </select>

            <input
              className="form-control mb-4"
              placeholder="Transaction ID (Optional)"
              value={formData.txnId}
              onChange={(e) => setFormData({ ...formData, txnId: e.target.value })}
              style={{ border: `1px solid ${colors.lightGrayBorder}` }}
            />

            <div className="d-flex gap-2">
              <button
                type="submit"
                className="btn text-white fw-semibold w-100"
                style={{ background: colors.primaryRed }}
              >
                Submit
              </button>
              <button
                type="button"
                className="btn fw-semibold w-100"
                style={{ border: `1px solid ${colors.lightGrayBorder}`, color: colors.darkGrayText }}
                onClick={() => setShowModal(false)}
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
          <h5 className="fw-bold" style={{ color: colors.blackText }}>Credit History</h5>
        </div>
        <div className="card-body p-0">
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
                      <button
                        className="btn btn-sm"
                        style={{ 
                          color: colors.primaryRed, 
                          backgroundColor: "transparent", 
                          border: "none",
                          padding: "0.25rem 0.5rem"
                        }}
                        onClick={() => handleViewDetails(row)}
                      >
                        <i className="bi bi-eye-fill me-1"></i>View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* VIEW DETAILS MODAL */}
      {showDetailsModal && selectedCredit && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.60)", zIndex: 9999 }}
        >
          <div
            className="bg-white p-4 rounded shadow"
            style={{ width: 470, animation: "zoomIn 0.2s" }}
          >
            <h5 className="fw-bold mb-3 text-center" style={{ color: colors.primaryRed }}>
              Credit Details
            </h5>

            <table className="table table-borderless mb-3">
              <tbody>
                <tr><th style={{ color: colors.darkGrayText }}>Date:</th><td style={{ color: colors.blackText }}>{selectedCredit.date}</td></tr>
                <tr><th style={{ color: colors.darkGrayText }}>Employer:</th><td style={{ color: colors.blackText }}>{selectedCredit.employer}</td></tr>
                <tr><th style={{ color: colors.darkGrayText }}>Amount:</th><td style={{ color: colors.primaryRed, fontWeight: "600" }}>₹ {selectedCredit.amount}</td></tr>
                <tr><th style={{ color: colors.darkGrayText }}>Reference:</th><td style={{ color: colors.blackText }}>{selectedCredit.ref || "-"}</td></tr>
                <tr><th style={{ color: colors.darkGrayText }}>Mode:</th><td style={{ color: colors.blackText }}>{selectedCredit.mode}</td></tr>
                <tr><th style={{ color: colors.darkGrayText }}>Transaction ID:</th><td style={{ color: colors.blackText }}>{selectedCredit.txnId || "-"}</td></tr>
                <tr><th style={{ color: colors.darkGrayText }}>Added By:</th><td style={{ color: colors.blackText }}>{selectedCredit.addedBy}</td></tr>
              </tbody>
            </table>

            <button
              className="btn fw-semibold w-100"
              style={{ borderRadius: 8, background: colors.primaryRed, color: colors.pureWhite }}
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