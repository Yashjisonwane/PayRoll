import React, { useState, useEffect } from "react";

const COLORS = {
  primary: "#C62828",
  primaryDark: "#B71C1C",
  white: "#FFFFFF",
  black: "#000000",
  text: "#4A4A4A",
  border: "#E2E2E2",
  // Additional colors for different actions
  info: "#1976D2",
  warning: "#F57C00",
  success: "#2E7D32",
  lightGray: "#F5F5F5",
};

const EmployerList = () => {
  // State for detecting mobile view
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // State for list of employers
  const [employers, setEmployers] = useState([
    { 
      id: 1, 
      name: "ABC Pvt Ltd", 
      email: "contact@abc.com", 
      phone: "9876543210", 
      address: "123 Main St, Delhi", 
      username: "abc_user", 
      password: "password123", 
      balance: 1200, 
      level: "Gold",
      bankName: "State Bank of India",
      accountNumber: "123456789012",
      ifscCode: "SBIN0001234",
      branch: "Delhi Main",
      panNumber: "ABCDE1234F",
      gstNumber: "07ABCDE1234F1ZV"
    },
    { 
      id: 2, 
      name: "XYZ Enterprises", 
      email: "info@xyz.com", 
      phone: "9876543211", 
      address: "456 Park Ave, Mumbai", 
      username: "xyz_user", 
      password: "password123", 
      balance: 800, 
      level: "Silver",
      bankName: "ICICI Bank",
      accountNumber: "987654321098",
      ifscCode: "ICIC0000987",
      branch: "Mumbai Branch",
      panNumber: "FGHIJ5678K",
      gstNumber: "27FGHIJ5678K1ZV"
    },
    { 
      id: 3, 
      name: "TechSoft Solutions", 
      email: "hello@techsoft.com", 
      phone: "9876543212", 
      address: "789 Tech Blvd, Bangalore", 
      username: "techsoft_user", 
      password: "password123", 
      balance: 3000, 
      level: "Platinum",
      bankName: "HDFC Bank",
      accountNumber: "567890123456",
      ifscCode: "HDFC0005678",
      branch: "Bangalore Tech Park",
      panNumber: "KLMNO9012L",
      gstNumber: "29KLMNO9012L1ZV"
    },
  ]);

  // State for Assign Credit Modal
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [credit, setCredit] = useState("");
  
  // State for Add Employer Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmployer, setNewEmployer] = useState({
    name: "", email: "", phone: "", address: "", username: "", password: "", balance: "", level: "",
    bankName: "", accountNumber: "", ifscCode: "", branch: "", panNumber: "", gstNumber: ""
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
    setNewEmployer({ 
      name: "", email: "", phone: "", address: "", username: "", password: "", balance: "", level: "",
      bankName: "", accountNumber: "", ifscCode: "", branch: "", panNumber: "", gstNumber: ""
    });
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
    <div className="container py-2 py-md-4" style={{ minHeight: "100vh" }}>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-column flex-md-row">
        <h2 className="fw-bold mb-3 mb-md-0" style={{ color: COLORS.primary, fontSize: isMobile ? '1.5rem' : '2rem' }}>Employer Management</h2>
        <button className="btn text-white px-3 px-md-4 py-2" onClick={openAddModal} style={{ backgroundColor: COLORS.primary, border: "none", fontSize: isMobile ? '0.875rem' : '1rem' }}>
          Add Employer
        </button>
      </div>

      {/* --- SECTION 1: EMPLOYER LIST WITH CONTACT DETAILS --- */}
      <div className="card shadow-sm mb-4" style={{ borderRadius: "10px", border: `1px solid ${COLORS.border}` }}>
        <div className="card-header" style={{ background: COLORS.primary, color: COLORS.white, borderRadius: "10px 10px 0 0" }}>
          <h4 className="mb-0" style={{ fontSize: isMobile ? '1.1rem' : '1.3rem' }}>Employer List</h4>
        </div>
        <div className="card-body p-0">
          {isMobile ? (
            // Mobile Card View for Employers
            <div className="p-3">
              {employers.map((emp) => (
                <div key={emp.id} className="card shadow-sm mb-3" style={{ borderRadius: "10px", border: `1px solid ${COLORS.border}` }}>
                  <div className="card-body p-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title mb-0" style={{ color: COLORS.primary }}>{emp.name}</h5>
                      <span className="badge" style={{ backgroundColor: COLORS.primary, color: COLORS.white }}>₹{emp.balance}</span>
                    </div>
                    <div className="mb-2">
                      <p className="mb-1 small"><strong>Email:</strong> {emp.email}</p>
                      <p className="mb-1 small"><strong>Phone:</strong> {emp.phone}</p>
                      <p className="mb-1 small"><strong>Address:</strong> {emp.address}</p>
                      <p className="mb-1 small"><strong>Username:</strong> {emp.username}</p>
                      <p className="mb-2 small"><strong>Level:</strong> {emp.level}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="d-flex gap-1">
                        <button 
                          className="btn btn-sm text-white d-flex align-items-center justify-content-center" 
                          onClick={() => openViewModal(emp)} 
                          title="View Details"
                          style={{ 
                            backgroundColor: COLORS.primary,
                            padding: "4px",
                            borderRadius: "4px",
                            fontSize: "10px",
                            fontWeight: "500",
                            width: "28px",
                            height: "28px"
                          }}
                        >
                          <i className="bi bi-eye-fill" style={{ fontSize: "12px" }}></i>
                        </button>
                        <button 
                          className="btn btn-sm text-white d-flex align-items-center justify-content-center" 
                          onClick={() => openEditModal(emp)} 
                          title="Edit Details"
                          style={{ 
                            backgroundColor: COLORS.primary,
                            padding: "4px",
                            borderRadius: "4px",
                            fontSize: "10px",
                            fontWeight: "500",
                            width: "28px",
                            height: "28px"
                          }}
                        >
                          <i className="bi bi-pencil-fill" style={{ fontSize: "12px" }}></i>
                        </button>
                      </div>
                      <button 
                        className="btn btn-sm text-white d-flex align-items-center justify-content-center" 
                        onClick={() => openAssignModal(emp)} 
                        title="Assign Credit"
                        style={{ 
                          backgroundColor: COLORS.primary,
                          padding: "4px",
                          borderRadius: "4px",
                          fontSize: "10px",
                          fontWeight: "500",
                          width: "28px",
                          height: "28px"
                        }}
                      >
                        <i className="bi bi-cash-stack" style={{ fontSize: "12px" }}></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Desktop Table View for Employers
            <div className="table-responsive">
              <table className="table table-bordered align-middle mb-0">
                <thead style={{ background: COLORS.primary, color: COLORS.white }}>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Username</th>
                    <th>Level</th>
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
                      <td style={{ color: COLORS.text }}>{emp.username}</td>
                      <td style={{ color: COLORS.text }}>{emp.level}</td>
                      <td style={{ color: COLORS.text }}>₹{emp.balance}</td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-1">
                          <button 
                            className="btn btn-sm text-white d-inline-flex align-items-center justify-content-center" 
                            onClick={() => openViewModal(emp)} 
                            title="View Details"
                            style={{ 
                              backgroundColor: COLORS.primary,
                              padding: "4px",
                              borderRadius: "4px",
                              fontSize: "10px",
                              fontWeight: "500",
                              width: "28px",
                              height: "28px"
                            }}
                          >
                            <i className="bi bi-eye-fill" style={{ fontSize: "12px" }}></i>
                          </button>
                          <button 
                            className="btn btn-sm text-white d-inline-flex align-items-center justify-content-center" 
                            onClick={() => openEditModal(emp)} 
                            title="Edit Details"
                            style={{ 
                              backgroundColor: COLORS.primary,
                              padding: "4px",
                              borderRadius: "4px",
                              fontSize: "10px",
                              fontWeight: "500",
                              width: "28px",
                              height: "28px"
                            }}
                          >
                            <i className="bi bi-pencil-fill" style={{ fontSize: "12px" }}></i>
                          </button>
                          <button 
                            className="btn btn-sm text-white d-inline-flex align-items-center justify-content-center" 
                            onClick={() => openAssignModal(emp)} 
                            title="Assign Credit"
                            style={{ 
                              backgroundColor: COLORS.primary,
                              padding: "4px",
                              borderRadius: "4px",
                              fontSize: "10px",
                              fontWeight: "500",
                              width: "28px",
                              height: "28px"
                            }}
                          >
                            <i className="bi bi-cash-stack" style={{ fontSize: "12px" }}></i>
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

      {/* --- SECTION 2: EMPLOYER BANK DETAILS --- */}
      <div className="card shadow-sm mb-4" style={{ borderRadius: "10px", border: `1px solid ${COLORS.border}` }}>
        <div className="card-header" style={{ background: COLORS.primary, color: COLORS.white, borderRadius: "10px 10px 0 0" }}>
          <h4 className="mb-0" style={{ fontSize: isMobile ? '1.1rem' : '1.3rem' }}>Employer Bank Details</h4>
        </div>
        <div className="card-body p-0">
          {isMobile ? (
            // Mobile Card View for Bank Details
            <div className="p-3">
              {employers.map((emp) => (
                <div key={emp.id} className="card shadow-sm mb-3" style={{ borderRadius: "10px", border: `1px solid ${COLORS.border}` }}>
                  <div className="card-body p-3">
                    <h5 className="card-title mb-2" style={{ color: COLORS.primary }}>{emp.name}</h5>
                    <div className="mb-2">
                      <p className="mb-1 small"><strong>Bank Name:</strong> {emp.bankName}</p>
                      <p className="mb-1 small"><strong>Account Number:</strong> {emp.accountNumber}</p>
                      <p className="mb-1 small"><strong>IFSC Code:</strong> {emp.ifscCode}</p>
                      <p className="mb-1 small"><strong>Branch:</strong> {emp.branch}</p>
                      <p className="mb-1 small"><strong>PAN Number:</strong> {emp.panNumber}</p>
                      <p className="mb-0 small"><strong>GST Number:</strong> {emp.gstNumber}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Desktop Table View for Bank Details
            <div className="table-responsive">
              <table className="table table-bordered align-middle mb-0">
                <thead style={{ background: COLORS.primary, color: COLORS.white }}>
                  <tr>
                    <th>Employer Name</th>
                    <th>Bank Name</th>
                    <th>Account Number</th>
                    <th>IFSC Code</th>
                    <th>Branch</th>
                    <th>PAN Number</th>
                    <th>GST Number</th>
                  </tr>
                </thead>
                <tbody>
                  {employers.map((emp) => (
                    <tr key={emp.id}>
                      <td style={{ color: COLORS.text }}>{emp.name}</td>
                      <td style={{ color: COLORS.text }}>{emp.bankName}</td>
                      <td style={{ color: COLORS.text }}>{emp.accountNumber}</td>
                      <td style={{ color: COLORS.text }}>{emp.ifscCode}</td>
                      <td style={{ color: COLORS.text }}>{emp.branch}</td>
                      <td style={{ color: COLORS.text }}>{emp.panNumber}</td>
                      <td style={{ color: COLORS.text }}>{emp.gstNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* --- Add Employer Modal --- */}
      {showAddModal && (
        <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.4)" }}>
          <div className="modal-dialog modal-dialog-centered" style={{ 
            maxWidth: isMobile ? '95%' : '90%',
            width: isMobile ? '95%' : '900px'
          }}>
            <div className="modal-content" style={{ borderRadius: "10px" }}>
              <div className="modal-header" style={{ background: COLORS.primary, color: COLORS.white }}>
                <h5 className="modal-title" style={{ fontSize: isMobile ? '1rem' : '1.25rem' }}>Add New Employer</h5>
                <button className="btn-close btn-close-white" onClick={closeAddModal}></button>
              </div>
              <div className="modal-body" style={{ padding: isMobile ? '15px' : '20px' }}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label" style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>Name</label>
                    <input type="text" className="form-control" name="name" value={newEmployer.name} onChange={handleAddChange} style={{ fontSize: isMobile ? '0.875rem' : '1rem' }} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>Email</label>
                    <input type="email" className="form-control" name="email" value={newEmployer.email} onChange={handleAddChange} style={{ fontSize: isMobile ? '0.875rem' : '1rem' }} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>Phone</label>
                    <input type="text" className="form-control" name="phone" value={newEmployer.phone} onChange={handleAddChange} style={{ fontSize: isMobile ? '0.875rem' : '1rem' }} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>Initial Balance</label>
                    <input type="number" className="form-control" name="balance" value={newEmployer.balance} onChange={handleAddChange} style={{ fontSize: isMobile ? '0.875rem' : '1rem' }} />
                  </div>
                  <div className="col-12 mb-3">
                    <label className="form-label" style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>Address</label>
                    <input type="text" className="form-control" name="address" value={newEmployer.address} onChange={handleAddChange} style={{ fontSize: isMobile ? '0.875rem' : '1rem' }} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>Username</label>
                    <input type="text" className="form-control" name="username" value={newEmployer.username} onChange={handleAddChange} style={{ fontSize: isMobile ? '0.875rem' : '1rem' }} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>Password</label>
                    <input type="password" className="form-control" name="password" value={newEmployer.password} onChange={handleAddChange} style={{ fontSize: isMobile ? '0.875rem' : '1rem' }} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>Level</label>
                    <select className="form-select" name="level" value={newEmployer.level} onChange={handleAddChange} style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
                      <option value="">Select Level</option>
                      <option value="Bronze">Bronze</option>
                      <option value="Silver">Silver</option>
                      <option value="Gold">Gold</option>
                      <option value="Platinum">Platinum</option>
                    </select>
                  </div>
                  
                  <div className="col-12 mt-4 mb-3">
                    <h5 style={{ color: COLORS.primary, borderBottom: `1px solid ${COLORS.border}`, paddingBottom: '8px', fontSize: isMobile ? '1rem' : '1.1rem' }}>Bank Details</h5>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>Bank Name</label>
                    <input type="text" className="form-control" name="bankName" value={newEmployer.bankName} onChange={handleAddChange} style={{ fontSize: isMobile ? '0.875rem' : '1rem' }} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>Account Number</label>
                    <input type="text" className="form-control" name="accountNumber" value={newEmployer.accountNumber} onChange={handleAddChange} style={{ fontSize: isMobile ? '0.875rem' : '1rem' }} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>IFSC Code</label>
                    <input type="text" className="form-control" name="ifscCode" value={newEmployer.ifscCode} onChange={handleAddChange} style={{ fontSize: isMobile ? '0.875rem' : '1rem' }} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>Branch</label>
                    <input type="text" className="form-control" name="branch" value={newEmployer.branch} onChange={handleAddChange} style={{ fontSize: isMobile ? '0.875rem' : '1rem' }} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>PAN Number</label>
                    <input type="text" className="form-control" name="panNumber" value={newEmployer.panNumber} onChange={handleAddChange} style={{ fontSize: isMobile ? '0.875rem' : '1rem' }} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>GST Number</label>
                    <input type="text" className="form-control" name="gstNumber" value={newEmployer.gstNumber} onChange={handleAddChange} style={{ fontSize: isMobile ? '0.875rem' : '1rem' }} />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn" onClick={closeAddModal} style={{ background: COLORS.border, color: COLORS.black, fontSize: isMobile ? '0.875rem' : '1rem' }}>Cancel</button>
                <button className="btn text-white" style={{ background: COLORS.primary, fontSize: isMobile ? '0.875rem' : '1rem' }} onClick={addEmployer}>Add Employer</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- View Employer Modal --- */}
      {showViewModal && employerToView && (
        <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.4)" }}>
          <div className="modal-dialog modal-dialog-centered" style={{ 
            maxWidth: isMobile ? '95%' : '90%',
            width: isMobile ? '95%' : '900px'
          }}>
            <div className="modal-content" style={{ borderRadius: "10px" }}>
              <div className="modal-header" style={{ background: COLORS.primary, color: COLORS.white }}>
                <h5 className="modal-title" style={{ fontSize: isMobile ? '1rem' : '1.25rem' }}>Employer Details</h5>
                <button className="btn-close btn-close-white" onClick={closeViewModal}></button>
              </div>
              <div className="modal-body" style={{ padding: isMobile ? '15px' : '20px' }}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <h5 style={{ color: COLORS.primary, borderBottom: `1px solid ${COLORS.border}`, paddingBottom: '8px', fontSize: isMobile ? '1rem' : '1.1rem' }}>Basic Information</h5>
                    <p style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}><strong>Name:</strong> {employerToView.name}</p>
                    <p style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}><strong>Email:</strong> {employerToView.email}</p>
                    <p style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}><strong>Phone:</strong> {employerToView.phone}</p>
                    <p style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}><strong>Address:</strong> {employerToView.address}</p>
                    <p style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}><strong>Username:</strong> {employerToView.username}</p>
                    <p style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}><strong>Level:</strong> {employerToView.level}</p>
                    <p style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}><strong>Current Balance:</strong> ₹{employerToView.balance}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <h5 style={{ color: COLORS.primary, borderBottom: `1px solid ${COLORS.border}`, paddingBottom: '8px', fontSize: isMobile ? '1rem' : '1.1rem' }}>Bank Details</h5>
                    <p style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}><strong>Bank Name:</strong> {employerToView.bankName}</p>
                    <p style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}><strong>Account Number:</strong> {employerToView.accountNumber}</p>
                    <p style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}><strong>IFSC Code:</strong> {employerToView.ifscCode}</p>
                    <p style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}><strong>Branch:</strong> {employerToView.branch}</p>
                    <p style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}><strong>PAN Number:</strong> {employerToView.panNumber}</p>
                    <p style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}><strong>GST Number:</strong> {employerToView.gstNumber}</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn text-white" style={{ background: COLORS.primary, fontSize: isMobile ? '0.875rem' : '1rem' }} onClick={closeViewModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Edit Employer Modal --- */}
      {showEditModal && employerToEdit && (
        <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.4)" }}>
          <div className="modal-dialog modal-dialog-centered" style={{ 
            maxWidth: isMobile ? '95%' : '90%',
            width: isMobile ? '95%' : '900px'
          }}>
            <div className="modal-content" style={{ borderRadius: "10px" }}>
              <div className="modal-header" style={{ background: COLORS.primary, color: COLORS.white }}>
                <h5 className="modal-title" style={{ fontSize: isMobile ? '1rem' : '1.25rem' }}>Edit Employer</h5>
                <button className="btn-close btn-close-white" onClick={closeEditModal}></button>
              </div>
              <div className="modal-body" style={{ padding: isMobile ? '15px' : '20px' }}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label" style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>Name</label>
                    <input type="text" className="form-control" name="name" value={employerToEdit.name} onChange={handleEditChange} style={{ fontSize: isMobile ? '0.875rem' : '1rem' }} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>Email</label>
                    <input type="email" className="form-control" name="email" value={employerToEdit.email} onChange={handleEditChange} style={{ fontSize: isMobile ? '0.875rem' : '1rem' }} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>Phone</label>
                    <input type="text" className="form-control" name="phone" value={employerToEdit.phone} onChange={handleEditChange} style={{ fontSize: isMobile ? '0.875rem' : '1rem' }} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>Balance</label>
                    <input type="number" className="form-control" name="balance" value={employerToEdit.balance} onChange={handleEditChange} style={{ fontSize: isMobile ? '0.875rem' : '1rem' }} />
                  </div>
                  <div className="col-12 mb-3">
                    <label className="form-label" style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>Address</label>
                    <input type="text" className="form-control" name="address" value={employerToEdit.address} onChange={handleEditChange} style={{ fontSize: isMobile ? '0.875rem' : '1rem' }} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>Username</label>
                    <input type="text" className="form-control" name="username" value={employerToEdit.username} onChange={handleEditChange} style={{ fontSize: isMobile ? '0.875rem' : '1rem' }} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>Password</label>
                    <input type="password" className="form-control" name="password" value={employerToEdit.password} onChange={handleEditChange} style={{ fontSize: isMobile ? '0.875rem' : '1rem' }} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>Level</label>
                    <select className="form-select" name="level" value={employerToEdit.level} onChange={handleEditChange} style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
                      <option value="">Select Level</option>
                      <option value="Bronze">Bronze</option>
                      <option value="Silver">Silver</option>
                      <option value="Gold">Gold</option>
                      <option value="Platinum">Platinum</option>
                    </select>
                  </div>
                  
                  <div className="col-12 mt-4 mb-3">
                    <h5 style={{ color: COLORS.primary, borderBottom: `1px solid ${COLORS.border}`, paddingBottom: '8px', fontSize: isMobile ? '1rem' : '1.1rem' }}>Bank Details</h5>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>Bank Name</label>
                    <input type="text" className="form-control" name="bankName" value={employerToEdit.bankName} onChange={handleEditChange} style={{ fontSize: isMobile ? '0.875rem' : '1rem' }} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>Account Number</label>
                    <input type="text" className="form-control" name="accountNumber" value={employerToEdit.accountNumber} onChange={handleEditChange} style={{ fontSize: isMobile ? '0.875rem' : '1rem' }} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>IFSC Code</label>
                    <input type="text" className="form-control" name="ifscCode" value={employerToEdit.ifscCode} onChange={handleEditChange} style={{ fontSize: isMobile ? '0.875rem' : '1rem' }} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>Branch</label>
                    <input type="text" className="form-control" name="branch" value={employerToEdit.branch} onChange={handleEditChange} style={{ fontSize: isMobile ? '0.875rem' : '1rem' }} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>PAN Number</label>
                    <input type="text" className="form-control" name="panNumber" value={employerToEdit.panNumber} onChange={handleEditChange} style={{ fontSize: isMobile ? '0.875rem' : '1rem' }} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" style={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>GST Number</label>
                    <input type="text" className="form-control" name="gstNumber" value={employerToEdit.gstNumber} onChange={handleEditChange} style={{ fontSize: isMobile ? '0.875rem' : '1rem' }} />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn" onClick={closeEditModal} style={{ background: COLORS.border, color: COLORS.black, fontSize: isMobile ? '0.875rem' : '1rem' }}>Cancel</button>
                <button className="btn text-white" style={{ background: COLORS.primary, fontSize: isMobile ? '0.875rem' : '1rem' }} onClick={updateEmployer}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Assign Credit Modal --- */}
      {showAssignModal && selectedEmployer && (
        <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.4)" }}>
          <div className="modal-dialog modal-dialog-centered" style={{ 
            maxWidth: isMobile ? '95%' : '500px',
            width: isMobile ? '95%' : '500px'
          }}>
            <div className="modal-content" style={{ borderRadius: "10px" }}>
              <div className="modal-header" style={{ background: COLORS.primary, color: COLORS.white }}>
                <h5 className="modal-title" style={{ fontSize: isMobile ? '1rem' : '1.25rem' }}>Assign Credit</h5>
                <button className="btn-close btn-close-white" onClick={closeAssignModal}></button>
              </div>
              <div className="modal-body" style={{ padding: isMobile ? '15px' : '20px' }}>
                <div className="mb-3">
                  <p style={{ color: COLORS.black, fontSize: isMobile ? '0.875rem' : '1rem' }}>Employer: <strong>{selectedEmployer.name}</strong></p>
                  <p style={{ color: COLORS.black, fontSize: isMobile ? '0.875rem' : '1rem' }}>Current Balance: <strong>₹{selectedEmployer.balance}</strong></p>
                </div>
                <label className="form-label" style={{ color: COLORS.text, fontSize: isMobile ? '0.875rem' : '1rem' }}>Enter Credit Amount</label>
                <input 
                  type="number" 
                  className="form-control" 
                  style={{ border: `1px solid ${COLORS.border}`, color: COLORS.black, fontSize: isMobile ? '0.875rem' : '1rem' }} 
                  value={credit} 
                  onChange={(e) => setCredit(e.target.value)} 
                  placeholder="Enter amount to add"
                />
                {credit && (
                  <div className="mt-2">
                    <small style={{ color: COLORS.text, fontSize: isMobile ? '0.875rem' : '1rem' }}>
                      New Balance: <strong>₹{selectedEmployer.balance + parseInt(credit)}</strong>
                    </small>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn" onClick={closeAssignModal} style={{ background: COLORS.border, color: COLORS.black, fontSize: isMobile ? '0.875rem' : '1rem' }}>Cancel</button>
                <button className="btn text-white" style={{ background: COLORS.primary, fontSize: isMobile ? '0.875rem' : '1rem' }} onClick={assignCredit}>Assign Credit</button>
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