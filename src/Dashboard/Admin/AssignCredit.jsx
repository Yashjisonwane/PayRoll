import React, { useState } from "react";

const COLORS = {
  primary: "#C62828",
  primaryDark: "#B71C1C",
  white: "#FFFFFF",
  black: "#000000",
  text: "#4A4A4A",
  border: "#E2E2E2",
};

const EmployerList = () => {
  // State for the list of employers
  const [employers, setEmployers] = useState([
    { id: 1, name: "ABC Pvt Ltd", email: "contact@abc.com", phone: "9876543210", address: "123 Main St, Delhi", username: "abc_user", password: "password123", balance: 1200 },
    { id: 2, name: "XYZ Enterprises", email: "info@xyz.com", phone: "9876543211", address: "456 Park Ave, Mumbai", username: "xyz_user", password: "password123", balance: 800 },
    { id: 3, name: "TechSoft Solutions", email: "hello@techsoft.com", phone: "9876543212", address: "789 Tech Blvd, Bangalore", username: "techsoft_user", password: "password123", balance: 3000 },
  ]);

  // State for Assign Credit Modal
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [credit, setCredit] = useState("");

  // State for Add Employer Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmployer, setNewEmployer] = useState({
    name: "", email: "", phone: "", address: "", username: "", password: "", balance: ""
  });

  // State for View Employer Modal
  const [showViewModal, setShowViewModal] = useState(false);
  const [employerToView, setEmployerToView] = useState(null);

  // State for Edit Employer Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [employerToEdit, setEmployerToEdit] = useState(null);

  // --- Handlers for Assign Credit ---
  const openAssignModal = (employer) => {
    setSelectedEmployer(employer);
    setShowAssignModal(true);
  };
  const closeAssignModal = () => {
    setShowAssignModal(false);
    setCredit("");
  };
  const assignCredit = () => {
    if (!credit || credit <= 0) {
      alert("Please enter a valid credit amount.");
      return;
    }
    setEmployers(employers.map(emp =>
      emp.id === selectedEmployer.id
        ? { ...emp, balance: emp.balance + parseInt(credit) }
        : emp
    ));
    alert(`Assigned ₹${credit} to ${selectedEmployer.name}`);
    closeAssignModal();
  };

  // --- Handlers for Add Employer ---
  const openAddModal = () => {
    setShowAddModal(true);
  };
  const closeAddModal = () => {
    setShowAddModal(false);
    setNewEmployer({ name: "", email: "", phone: "", address: "", username: "", password: "", balance: "" });
  };
  const handleAddChange = (e) => {
    setNewEmployer({ ...newEmployer, [e.target.name]: e.target.value });
  };
  const addEmployer = () => {
    if (!newEmployer.name || !newEmployer.email || !newEmployer.username || !newEmployer.password) {
      alert("Please fill in all required fields (Name, Email, Username, Password).");
      return;
    }
    const employerToAdd = {
      ...newEmployer,
      id: employers.length > 0 ? Math.max(...employers.map(e => e.id)) + 1 : 1,
      balance: parseInt(newEmployer.balance) || 0,
    };
    setEmployers([...employers, employerToAdd]);
    alert(`Added new employer: ${newEmployer.name}`);
    closeAddModal();
  };

  // --- Handlers for View Employer ---
  const openViewModal = (employer) => {
    setEmployerToView(employer);
    setShowViewModal(true);
  };
  const closeViewModal = () => {
    setShowViewModal(false);
    setEmployerToView(null);
  };

  // --- Handlers for Edit Employer ---
  const openEditModal = (employer) => {
    setEmployerToEdit(employer);
    setShowEditModal(true);
  };
  const closeEditModal = () => {
    setShowEditModal(false);
    setEmployerToEdit(null);
  };
  const handleEditChange = (e) => {
    setEmployerToEdit({ ...employerToEdit, [e.target.name]: e.target.value });
  };
  const updateEmployer = () => {
    setEmployers(employers.map(emp =>
      emp.id === employerToEdit.id ? employerToEdit : emp
    ));
    alert(`Updated details for ${employerToEdit.name}`);
    closeEditModal();
  };

  return (
    <div className="container py-4" style={{ minHeight: "100vh" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold" style={{ color: COLORS.primary }}>Employer List</h2>
        <button className="btn text-white" onClick={openAddModal} style={{ backgroundColor: COLORS.primary, border: "none" }}>
          Add Employer
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead style={{ background: COLORS.primary, color: COLORS.white }}>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Balance</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employers.map((emp) => (
              <tr key={emp.id}>
                <td style={{ color: COLORS.text }}>{emp.name}</td>
                <td style={{ color: COLORS.text }}>{emp.email}</td>
                <td style={{ color: COLORS.text }}>{emp.phone}</td>
                <td style={{ color: COLORS.text }}>{emp.address}</td>
                <td style={{ color: COLORS.text }}>₹{emp.balance}</td>
                <td className="text-center">
                  <button className="btn btn-sm btn-info text-white me-2" onClick={() => openViewModal(emp)} title="View">
                    <i className="bi bi-eye"></i>
                  </button>
                  <button className="btn btn-sm btn-warning text-white me-2" onClick={() => openEditModal(emp)} title="Edit">
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button className="btn btn-sm text-white" style={{ backgroundColor: COLORS.primary }} onClick={() => openAssignModal(emp)} title="Assign Credit">
                    <i className="bi bi-credit-card"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Add Employer Modal --- */}
      {showAddModal && (
        <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.4)" }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content" style={{ borderRadius: "10px" }}>
              <div className="modal-header" style={{ background: COLORS.primary, color: COLORS.white }}>
                <h5 className="modal-title">Add New Employer</h5>
                <button className="btn-close btn-close-white" onClick={closeAddModal}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-3"><label>Name</label><input type="text" className="form-control" name="name" value={newEmployer.name} onChange={handleAddChange} /></div>
                  <div className="col-md-6 mb-3"><label>Email</label><input type="email" className="form-control" name="email" value={newEmployer.email} onChange={handleAddChange} /></div>
                  <div className="col-md-6 mb-3"><label>Phone</label><input type="text" className="form-control" name="phone" value={newEmployer.phone} onChange={handleAddChange} /></div>
                  <div className="col-md-6 mb-3"><label>Initial Balance</label><input type="number" className="form-control" name="balance" value={newEmployer.balance} onChange={handleAddChange} /></div>
                  <div className="col-12 mb-3"><label>Address</label><input type="text" className="form-control" name="address" value={newEmployer.address} onChange={handleAddChange} /></div>
                  <div className="col-md-6 mb-3"><label>Username</label><input type="text" className="form-control" name="username" value={newEmployer.username} onChange={handleAddChange} /></div>
                  <div className="col-md-6 mb-3"><label>Password</label><input type="password" className="form-control" name="password" value={newEmployer.password} onChange={handleAddChange} /></div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn" onClick={closeAddModal} style={{ background: COLORS.border, color: COLORS.black }}>Cancel</button>
                <button className="btn text-white" style={{ background: COLORS.primary }} onClick={addEmployer}>Add Employer</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- View Employer Modal --- */}
      {showViewModal && employerToView && (
        <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.4)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ borderRadius: "10px" }}>
              <div className="modal-header" style={{ background: COLORS.primary, color: COLORS.white }}>
                <h5 className="modal-title">Employer Details</h5>
                <button className="btn-close btn-close-white" onClick={closeViewModal}></button>
              </div>
              <div className="modal-body">
                <p><strong>Name:</strong> {employerToView.name}</p>
                <p><strong>Email:</strong> {employerToView.email}</p>
                <p><strong>Phone:</strong> {employerToView.phone}</p>
                <p><strong>Address:</strong> {employerToView.address}</p>
                <p><strong>Username:</strong> {employerToView.username}</p>
                <p><strong>Current Balance:</strong> ₹{employerToView.balance}</p>
              </div>
              <div className="modal-footer">
                <button className="btn text-white" style={{ background: COLORS.primary }} onClick={closeViewModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Edit Employer Modal --- */}
      {showEditModal && employerToEdit && (
        <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.4)" }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content" style={{ borderRadius: "10px" }}>
              <div className="modal-header" style={{ background: COLORS.primary, color: COLORS.white }}>
                <h5 className="modal-title">Edit Employer</h5>
                <button className="btn-close btn-close-white" onClick={closeEditModal}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-3"><label>Name</label><input type="text" className="form-control" name="name" value={employerToEdit.name} onChange={handleEditChange} /></div>
                  <div className="col-md-6 mb-3"><label>Email</label><input type="email" className="form-control" name="email" value={employerToEdit.email} onChange={handleEditChange} /></div>
                  <div className="col-md-6 mb-3"><label>Phone</label><input type="text" className="form-control" name="phone" value={employerToEdit.phone} onChange={handleEditChange} /></div>
                  <div className="col-md-6 mb-3"><label>Balance</label><input type="number" className="form-control" name="balance" value={employerToEdit.balance} onChange={handleEditChange} /></div>
                  <div className="col-12 mb-3"><label>Address</label><input type="text" className="form-control" name="address" value={employerToEdit.address} onChange={handleEditChange} /></div>
                  <div className="col-md-6 mb-3"><label>Username</label><input type="text" className="form-control" name="username" value={employerToEdit.username} onChange={handleEditChange} /></div>
                  <div className="col-md-6 mb-3"><label>Password</label><input type="password" className="form-control" name="password" value={employerToEdit.password} onChange={handleEditChange} /></div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn" onClick={closeEditModal} style={{ background: COLORS.border, color: COLORS.black }}>Cancel</button>
                <button className="btn text-white" style={{ background: COLORS.primary }} onClick={updateEmployer}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Assign Credit Modal --- */}
      {showAssignModal && selectedEmployer && (
        <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.4)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ borderRadius: "10px" }}>
              <div className="modal-header" style={{ background: COLORS.primary, color: COLORS.white }}>
                <h5 className="modal-title">Assign Credit</h5>
                <button className="btn-close btn-close-white" onClick={closeAssignModal}></button>
              </div>
              <div className="modal-body">
                <p style={{ color: COLORS.black }}>Employer: <strong>{selectedEmployer.name}</strong></p>
                <label className="form-label" style={{ color: COLORS.text }}>Enter Credit Amount</label>
                <input type="number" className="form-control" style={{ border: `1px solid ${COLORS.border}`, color: COLORS.black }} value={credit} onChange={(e) => setCredit(e.target.value)} />
              </div>
              <div className="modal-footer">
                <button className="btn" onClick={closeAssignModal} style={{ background: COLORS.border, color: COLORS.black }}>Cancel</button>
                <button className="btn text-white" style={{ background: COLORS.primary }} onClick={assignCredit}>Assign Credit</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prevent page scroll when any modal is open */}
      {(showAddModal || showViewModal || showEditModal || showAssignModal) && <div style={{ height: "1px" }}></div>}
    </div>
  );
};

export default EmployerList;