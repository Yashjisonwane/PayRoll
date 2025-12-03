import React, { useState } from "react";
import { FaPlus, FaMoneyBillWave, FaUsers, FaExchangeAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, ArcElement, LineElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, ArcElement);

const AdminDashboard = () => {
  const [showAddCredit, setShowAddCredit] = useState(false);
  const [showAssignCredit, setShowAssignCredit] = useState(false);
  const [selectedEmployer, setSelectedEmployer] = useState(null);

  const summary = {
    totalCreditsAdded: 250000,
    creditsAssigned: 180000,
    totalTransactions: 42,
  };

  const employers = [
    { id: 1, name: "Amit Enterprises", used: 32000, remaining: 5000, transactions: 12, lastPayment: "02 Dec 2025" },
    { id: 2, name: "Verma Industries", used: 18000, remaining: 3200, transactions: 8, lastPayment: "01 Dec 2025" },
    { id: 3, name: "TechSpark Pvt Ltd", used: 41000, remaining: 8900, transactions: 15, lastPayment: "30 Nov 2025" },
  ];

  const lineData = {
    labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Credits Added",
        data: [22000, 27000, 35000, 42000, 39000, 58000],
        borderColor: "#C62828",
        backgroundColor: "rgba(198,40,40,0.18)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const doughnutData = {
    labels: ["Assigned", "Remaining"],
    datasets: [
      {
        data: [summary.creditsAssigned, summary.totalCreditsAdded - summary.creditsAssigned],
        backgroundColor: ["#C62828", "#F7EFE9"],
      },
    ],
  };

  return (
    <div style={{ minHeight: "100vh" }} className="p-4">
      <h2 className="fw-bold mb-4" style={{ color: "#C62828" }}>Admin Dashboard</h2>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        {[
          { icon: <FaMoneyBillWave />, label: "Total Credits Added", value: `₹ ${summary.totalCreditsAdded}` },
          { icon: <FaUsers />, label: "Credits Assigned", value: `₹ ${summary.creditsAssigned}` },
          { icon: <FaExchangeAlt />, label: "Total Transactions", value: summary.totalTransactions },
        ].map((card, i) => (
          <div key={i} className="col-12 col-md-4">
            <div className="card shadow" style={{ borderRadius: "14px" }}>
              <div className="card-body d-flex gap-3 align-items-center">
                <span style={{ fontSize: 36, color: "#C62828" }}>{card.icon}</span>
                <div>
                  <h5 className="fw-bold mb-0">{card.value}</h5>
                  <p className="text-muted small mb-0">{card.label}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Credit Button */}
      {/* <div className="d-flex justify-content-end mb-4">
        <button
          onClick={() => setShowAddCredit(true)}
          className="btn text-white fw-semibold"
          style={{ background: "#C62828", borderRadius: "10px" }}
        >
          <FaPlus className="me-2" /> Add Credits
        </button>
      </div> */}

      {/* GRAPH SECTION */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-lg-8">
          <div className="card shadow h-100">
            <div className="card-header bg-white fw-semibold" style={{ color: "#C62828" }}>
              Credits Trend
            </div>
            <div className="card-body">
              <Line data={lineData} height={120} />
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="card shadow h-100">
            <div className="card-header bg-white fw-semibold" style={{ color: "#C62828" }}>
              Credit Distribution
            </div>
            <div className="card-body d-flex justify-content-center">
              <Doughnut data={doughnutData} />
            </div>
          </div>
        </div>
      </div>

      {/* TABLE UNDER GRAPH */}
      <div className="card shadow" style={{ borderRadius: "14px" }}>
        <div className="card-header bg-white">
          <h5 className="fw-bold" style={{ color: "#C62828" }}>Overall Summary</h5>
        </div>
        <div className="card-body p-0">
          <table className="table table-hover mb-0">
            <thead>
              <tr style={{ background: "#FFF5F5", color: "#C62828" }}>
                <th>Employer</th>
                <th>Used Credits</th>
                <th>Remaining Credits</th>
                <th>Total Transactions</th>
                <th>Last Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employers.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td>₹ {emp.used}</td>
                  <td>₹ {emp.remaining}</td>
                  <td>{emp.transactions}</td>
                  <td>{emp.lastPayment}</td>
                  <td>
                    <button
                      className="btn btn-sm text-white"
                      style={{ background: "#C62828", borderRadius: "8px" }}
                      onClick={() => {
                        setSelectedEmployer(emp);
                        setShowAssignCredit(true);
                      }}
                    >
                      Assign Credit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* POPUP — Add Credits */}
      {showAddCredit && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ background: "rgba(0,0,0,0.55)" }}>
          <div className="bg-white p-4 rounded shadow" style={{ width: 420 }}>
            <h5 className="fw-bold mb-4 text-center" style={{ color: "#C62828" }}>Add Credits</h5>
            <input className="form-control mb-3" placeholder="Amount" />
            <input className="form-control mb-3" placeholder="Reference / Note" />
            <input className="form-control mb-4" placeholder="Mode (Bank / Cash)" />
            <button className="btn text-white w-100 mb-2" style={{ background: "#C62828" }}
              onClick={() => { alert("Credits Added"); setShowAddCredit(false); }}>
              Confirm
            </button>
            <button className="btn w-100" onClick={() => setShowAddCredit(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* POPUP — Assign Credits */}
      {showAssignCredit && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ background: "rgba(0,0,0,0.55)" }}>
          <div className="bg-white p-4 rounded shadow" style={{ width: 420 }}>
            <h5 className="fw-bold mb-4 text-center" style={{ color: "#C62828" }}>
              Assign Credits — {selectedEmployer?.name}
            </h5>
            <input className="form-control mb-3" placeholder="Amount to assign" />
            <input className="form-control mb-4" placeholder="Reference (optional)" />
            <button className="btn text-white w-100 mb-2" style={{ background: "#C62828" }}
              onClick={() => { alert("Credit Assigned"); setShowAssignCredit(false); }}>
              Assign
            </button>
            <button className="btn w-100" onClick={() => setShowAssignCredit(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;