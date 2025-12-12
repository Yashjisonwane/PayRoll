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
  danger: "#D32F2F",
};

const ManagementSystem = () => {
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
  const [selectedItem, setSelectedItem] = useState(null);
  const [credit, setCredit] = useState("");
  
  // State for Add Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "", email: "", phone: "", address: "", username: "", password: "", balance: "", level: "",
    bankName: "", accountNumber: "", ifscCode: "", branch: "", panNumber: "", gstNumber: ""
  });
  
  // State for View Modal
  const [showViewModal, setShowViewModal] = useState(false);
  const [itemToView, setItemToView] = useState(null);
  
  // State for Edit Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

  // --- Handlers for Assign Credit ---
  const openAssignModal = (item) => {
    setSelectedItem(item);
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
      emp.id === selectedItem.id
        ? { ...emp, balance: emp.balance + parseInt(credit) }
        : emp
    ));
    alert(`Assigned ₹${credit} to ${selectedItem.name}`);
    
    closeAssignModal();
  };

  // --- Handlers for Add Item ---
  const openAddModal = () => {
    setShowAddModal(true);
  };
  const closeAddModal = () => {
    setShowAddModal(false);
    setNewItem({ 
      name: "", email: "", phone: "", address: "", username: "", password: "", balance: "", level: "",
      bankName: "", accountNumber: "", ifscCode: "", branch: "", panNumber: "", gstNumber: ""
    });
  };
  const handleAddChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };
  const addItem = () => {
    if (!newItem.name || !newItem.email || !newItem.username || !newItem.password) {
      alert("Please fill in all required fields (Name, Email, Username, Password).");
      return;
    }
    
    let itemToAdd = {
      ...newItem,
      id: employers.length > 0 ? Math.max(...employers.map(e => e.id)) + 1 : 1,
      balance: parseInt(newItem.balance) || 0,
    };
    
    setEmployers([...employers, itemToAdd]);
    alert(`Added new employer: ${newItem.name}`);
    
    closeAddModal();
  };

  // --- Handlers for View Item ---
  const openViewModal = (item) => {
    setItemToView(item);
    setShowViewModal(true);
  };
  const closeViewModal = () => {
    setShowViewModal(false);
    setItemToView(null);
  };

  // --- Handlers for Edit Item ---
  const openEditModal = (item) => {
    setItemToEdit(item);
    setShowEditModal(true);
  };
  const closeEditModal = () => {
    setShowEditModal(false);
    setItemToEdit(null);
  };
  const handleEditChange = (e) => {
    setItemToEdit({ ...itemToEdit, [e.target.name]: e.target.value });
  };
  const updateItem = () => {
    setEmployers(employers.map(emp =>
      emp.id === itemToEdit.id ? itemToEdit : emp
    ));
    alert(`Updated details for ${itemToEdit.name}`);
    
    closeEditModal();
  };

  // --- Handler for Delete Item ---
  const deleteEmployer = (id) => {
    const employerToDelete = employers.find(emp => emp.id === id);
    if (window.confirm(`Are you sure you want to delete ${employerToDelete.name}? This action cannot be undone.`)) {
      setEmployers(employers.filter(emp => emp.id !== id));
      alert(`Employer ${employerToDelete.name} has been deleted.`);
    }
  };

  return (
    <div className="container py-2 py-md-4" style={{ minHeight: "100vh" }}>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-column flex-md-row">
        <h2 className="fw-bold mb-3 mb-md-0" style={{ color: COLORS.primary, fontSize: isMobile ? '1.5rem' : '2rem' }}>Employer Management</h2>
      </div>

      {/* Add Button */}
      <div className="d-flex justify-content-end mb-4">
        <button 
          className="btn text-white px-3 px-md-4 py-2" 
          onClick={openAddModal} 
          style={{ 
            backgroundColor: COLORS.primary, 
            border: "none", 
            fontSize: isMobile ? '0.875rem' : '1rem' 
          }}
        >
          Add Employer
        </button>
      </div>

      {/* --- SECTION 1: LIST WITH CONTACT DETAILS --- */}
      <div className="card shadow-sm mb-4" style={{ borderRadius: "10px", border: `1px solid ${COLORS.border}` }}>
        <div className="card-header" style={{ background: COLORS.primary, color: COLORS.white, borderRadius: "10px 10px 0 0" }}>
          <h4 className="mb-0" style={{ fontSize: isMobile ? '1.1rem' : '1.3rem' }}>
            Employer List
          </h4>
        </div>
        <div className="card-body p-0">
          {isMobile ? (
            // Mobile Card View
            <div className="p-3">
              {employers.map((item) => (
                <div key={item.id} className="card shadow-sm mb-3" style={{ borderRadius: "10px", border: `1px solid ${COLORS.border}` }}>
                  <div className="card-body p-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title mb-0" style={{ color: COLORS.primary }}>{item.name}</h5>
                      <span className="badge" style={{ backgroundColor: COLORS.primary, color: COLORS.white }}>₹{item.balance}</span>
                    </div>
                    <div className="mb-2">
                      <p className="mb-1 small"><strong>Email:</strong> {item.email}</p>
                      <p className="mb-1 small"><strong>Phone:</strong> {item.phone}</p>
                      <p className="mb-1 small"><strong>Address:</strong> {item.address}</p>
                      <p className="mb-1 small"><strong>Username:</strong> {item.username}</p>
                      <p className="mb-2 small"><strong>Level:</strong> {item.level}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="d-flex gap-1">
                        <button 
                          className="btn btn-sm text-white d-flex align-items-center justify-content-center" 
                          onClick={() => openViewModal(item)} 
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
                          onClick={() => openEditModal(item)} 
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
                          className="btn btn-sm text-white d-flex align-items-center justify-content-center" 
                          onClick={() => deleteEmployer(item.id)} 
                          title="Delete Employer"
                          style={{ 
                            backgroundColor: COLORS.danger,
                            padding: "4px",
                            borderRadius: "4px",
                            fontSize: "10px",
                            fontWeight: "500",
                            width: "28px",
                            height: "28px"
                          }}
                        >
                          <i className="bi bi-trash-fill" style={{ fontSize: "12px" }}></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Desktop Table View
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
                  {employers.map((item) => (
                    <tr key={item.id}>
                      <td style={{ color: COLORS.text }}>{item.name}</td>
                      <td style={{ color: COLORS.text }}>{item.email}</td>
                      <td style={{ color: COLORS.text }}>{item.phone}</td>
                      <td style={{ color: COLORS.text }}>{item.address}</td>
                      <td style={{ color: COLORS.text }}>{item.username}</td>
                      <td style={{ color: COLORS.text }}>{item.level}</td>
                      <td style={{ color: COLORS.text }}>₹{item.balance}</td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-1">
                          <button 
                            className="btn btn-sm text-white d-inline-flex align-items-center justify-content-center" 
                            onClick={() => openViewModal(item)} 
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
                            onClick={() => openEditModal(item)} 
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
                            onClick={() => deleteEmployer(item.id)} 
                            title="Delete Employer"
                            style={{ 
                              backgroundColor: COLORS.danger,
                              padding: "4px",
                              borderRadius: "4px",
                              fontSize: "10px",
                              fontWeight: "500",
                              width: "28px",
                              height: "28px"
                            }}
                          >
                            <i className="bi bi-trash-fill" style={{ fontSize: "12px" }}></i>
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

      {/* --- SECTION 2: BANK DETAILS --- */}
      <div className="card shadow-sm mb-4" style={{ borderRadius: "10px", border: `1px solid ${COLORS.border}` }}>
        <div className="card-header" style={{ background: COLORS.primary, color: COLORS.white, borderRadius: "10px 10px 0 0" }}>
          <h4 className="mb-0" style={{ fontSize: isMobile ? '1.1rem' : '1.3rem' }}>
            Employer Bank Details
          </h4>
        </div>
        <div className="card-body p-0">
          {isMobile ? (
            // Mobile Card View for Bank Details
            <div className="p-3">
              {employers.map((item) => (
                <div key={item.id} className="card shadow-sm mb-3" style={{ borderRadius: "10px", border: `1px solid ${COLORS.border}` }}>
                  <div className="card-body p-3">
                    <h5 className="card-title mb-2" style={{ color: COLORS.primary }}>{item.name}</h5>
                    <div className="mb-2">
                      <p className="mb-1 small"><strong>Bank Name:</strong> {item.bankName}</p>
                      <p className="mb-1 small"><strong>Account Number:</strong> {item.accountNumber}</p>
                      <p className="mb-1 small"><strong>IFSC Code:</strong> {item.ifscCode}</p>
                      <p className="mb-1 small"><strong>Branch:</strong> {item.branch}</p>
                      <p className="mb-1 small"><strong>PAN Number:</strong> {item.panNumber}</p>
                      <p className="mb-0 small"><strong>GST Number:</strong> {item.gstNumber}</p>
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
                    <th>Name</th>
                    <th>Bank Name</th>
                    <th>Account Number</th>
                    <th>IFSC Code</th>
                    <th>Branch</th>
                    <th>PAN Number</th>
                    <th>GST Number</th>
                  </tr>
                </thead>
                <tbody>
                  {employers.map((item) => (
                    <tr key={item.id}>
                      <td style={{ color: COLORS.text }}>{item.name}</td>
                      <td style={{ color: COLORS.text }}>{item.bankName}</td>
                      <td style={{ color: COLORS.text }}>{item.accountNumber}</td>
                      <td style={{ color: COLORS.text }}>{item.ifscCode}</td>
                      <td style={{ color: COLORS.text }}>{item.branch}</td>
                      <td style={{ color: COLORS.text }}>{item.panNumber}</td>
                      <td style={{ color: COLORS.text }}>{item.gstNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* --- Add Modal --- */}
      {showAddModal && (
        <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.4)" }}>
          <div className={`modal-dialog modal-dialog-centered ${isMobile ? 'modal-sm' : ''}`} style={{ 
            // Much smaller modal for mobile
            maxWidth: isMobile ? '90%' : '80%', 
            width: isMobile ? '90%' : '800px',
            margin: isMobile ? '5px auto' : '1.75rem auto'
          }}>
            <div className="modal-content" style={{ borderRadius: "10px" }}>
              <div className="modal-header" style={{ background: COLORS.primary, color: COLORS.white, padding: isMobile ? '8px 12px' : '' }}>
                <h5 className="modal-title" style={{ fontSize: isMobile ? '0.9rem' : '1.25rem' }}>
                  Add New Employer
                </h5>
                <button className="btn-close btn-close-white" onClick={closeAddModal}></button>
              </div>
              <div className="modal-body" style={{ 
                padding: isMobile ? '8px' : '20px',
                maxHeight: isMobile ? '70vh' : 'auto',
                overflowY: isMobile ? 'auto' : 'visible'
              }}>
                <div className="row">
                  <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-3'}>
                    <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>Name</label>
                    <input type="text" className={`form-control ${isMobile ? 'form-control-sm' : ''}`} name="name" value={newItem.name} onChange={handleAddChange} style={{ fontSize: isMobile ? '0.75rem' : '1rem' }} />
                  </div>
                  <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-3'}>
                    <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>Email</label>
                    <input type="email" className={`form-control ${isMobile ? 'form-control-sm' : ''}`} name="email" value={newItem.email} onChange={handleAddChange} style={{ fontSize: isMobile ? '0.75rem' : '1rem' }} />
                  </div>
                  <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-3'}>
                    <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>Phone</label>
                    <input type="text" className={`form-control ${isMobile ? 'form-control-sm' : ''}`} name="phone" value={newItem.phone} onChange={handleAddChange} style={{ fontSize: isMobile ? '0.75rem' : '1rem' }} />
                  </div>
                  <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-3'}>
                    <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>Initial Balance</label>
                    <input type="number" className={`form-control ${isMobile ? 'form-control-sm' : ''}`} name="balance" value={newItem.balance} onChange={handleAddChange} style={{ fontSize: isMobile ? '0.75rem' : '1rem' }} />
                  </div>
                  <div className={isMobile ? 'col-12 mb-1' : 'col-12 mb-3'}>
                    <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>Address</label>
                    <input type="text" className={`form-control ${isMobile ? 'form-control-sm' : ''}`} name="address" value={newItem.address} onChange={handleAddChange} style={{ fontSize: isMobile ? '0.75rem' : '1rem' }} />
                  </div>
                  <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-3'}>
                    <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>Username</label>
                    <input type="text" className={`form-control ${isMobile ? 'form-control-sm' : ''}`} name="username" value={newItem.username} onChange={handleAddChange} style={{ fontSize: isMobile ? '0.75rem' : '1rem' }} />
                  </div>
                  <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-3'}>
                    <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>Password</label>
                    <input type="password" className={`form-control ${isMobile ? 'form-control-sm' : ''}`} name="password" value={newItem.password} onChange={handleAddChange} style={{ fontSize: isMobile ? '0.75rem' : '1rem' }} />
                  </div>
                  <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-3'}>
                    <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>Level</label>
                    <select className={`form-select ${isMobile ? 'form-select-sm' : ''}`} name="level" value={newItem.level} onChange={handleAddChange} style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>
                      <option value="">Select Level</option>
                      <option value="Bronze">Bronze</option>
                      <option value="Silver">Silver</option>
                      <option value="Gold">Gold</option>
                      <option value="Platinum">Platinum</option>
                    </select>
                  </div>
                  
                  <div className={isMobile ? 'col-12 mt-2 mb-1' : 'col-12 mt-4 mb-3'}>
                    <h5 style={{ color: COLORS.primary, borderBottom: `1px solid ${COLORS.border}`, paddingBottom: '8px', fontSize: isMobile ? '0.85rem' : '1.1rem' }}>Bank Details</h5>
                  </div>
                  <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-3'}>
                    <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>Bank Name</label>
                    <input type="text" className={`form-control ${isMobile ? 'form-control-sm' : ''}`} name="bankName" value={newItem.bankName} onChange={handleAddChange} style={{ fontSize: isMobile ? '0.75rem' : '1rem' }} />
                  </div>
                  <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-3'}>
                    <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>Account Number</label>
                    <input type="text" className={`form-control ${isMobile ? 'form-control-sm' : ''}`} name="accountNumber" value={newItem.accountNumber} onChange={handleAddChange} style={{ fontSize: isMobile ? '0.75rem' : '1rem' }} />
                  </div>
                  <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-3'}>
                    <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>IFSC Code</label>
                    <input type="text" className={`form-control ${isMobile ? 'form-control-sm' : ''}`} name="ifscCode" value={newItem.ifscCode} onChange={handleAddChange} style={{ fontSize: isMobile ? '0.75rem' : '1rem' }} />
                  </div>
                  <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-3'}>
                    <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>Branch</label>
                    <input type="text" className={`form-control ${isMobile ? 'form-control-sm' : ''}`} name="branch" value={newItem.branch} onChange={handleAddChange} style={{ fontSize: isMobile ? '0.75rem' : '1rem' }} />
                  </div>
                  <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-3'}>
                    <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>PAN Number</label>
                    <input type="text" className={`form-control ${isMobile ? 'form-control-sm' : ''}`} name="panNumber" value={newItem.panNumber} onChange={handleAddChange} style={{ fontSize: isMobile ? '0.75rem' : '1rem' }} />
                  </div>
                  <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-3'}>
                    <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>GST Number</label>
                    <input type="text" className={`form-control ${isMobile ? 'form-control-sm' : ''}`} name="gstNumber" value={newItem.gstNumber} onChange={handleAddChange} style={{ fontSize: isMobile ? '0.75rem' : '1rem' }} />
                  </div>
                </div>
              </div>
              <div className="modal-footer" style={{ padding: isMobile ? '8px 12px' : '' }}>
                <button className="btn" onClick={closeAddModal} style={{ background: COLORS.border, color: COLORS.black, fontSize: isMobile ? '0.75rem' : '1rem' }}>Cancel</button>
                <button className="btn text-white" style={{ background: COLORS.primary, fontSize: isMobile ? '0.75rem' : '1rem' }} onClick={addItem}>
                  Add Employer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- View Modal --- */}
      {showViewModal && itemToView && (
        <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.4)" }}>
          <div className={`modal-dialog modal-dialog-centered ${isMobile ? 'modal-sm' : ''}`} style={{ 
            maxWidth: isMobile ? '90%' : '80%',
            width: isMobile ? '90%' : '800px',
            margin: isMobile ? '5px auto' : '1.75rem auto'
          }}>
            <div className="modal-content" style={{ borderRadius: "10px" }}>
              <div className="modal-header" style={{ background: COLORS.primary, color: COLORS.white, padding: isMobile ? '8px 12px' : '' }}>
                <h5 className="modal-title" style={{ fontSize: isMobile ? '0.9rem' : '1.25rem' }}>
                  Employer Details
                </h5>
                <button className="btn-close btn-close-white" onClick={closeViewModal}></button>
              </div>
              <div className="modal-body" style={{ 
                padding: isMobile ? '8px' : '20px',
                maxHeight: isMobile ? '70vh' : 'auto',
                overflowY: isMobile ? 'auto' : 'visible'
              }}>
                <div className="row">
                  <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-3'}>
                    <h5 style={{ color: COLORS.primary, borderBottom: `1px solid ${COLORS.border}`, paddingBottom: '8px', fontSize: isMobile ? '0.85rem' : '1.1rem' }}>Basic Information</h5>
                    <p style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}><strong>Name:</strong> {itemToView.name}</p>
                    <p style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}><strong>Email:</strong> {itemToView.email}</p>
                    <p style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}><strong>Phone:</strong> {itemToView.phone}</p>
                    <p style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}><strong>Address:</strong> {itemToView.address}</p>
                    <p style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}><strong>Username:</strong> {itemToView.username}</p>
                    <p style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}><strong>Level:</strong> {itemToView.level}</p>
                    <p style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}><strong>Current Balance:</strong> ₹{itemToView.balance}</p>
                  </div>
                  <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-3'}>
                    <h5 style={{ color: COLORS.primary, borderBottom: `1px solid ${COLORS.border}`, paddingBottom: '8px', fontSize: isMobile ? '0.85rem' : '1.1rem' }}>Bank Details</h5>
                    <p style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}><strong>Bank Name:</strong> {itemToView.bankName}</p>
                    <p style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}><strong>Account Number:</strong> {itemToView.accountNumber}</p>
                    <p style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}><strong>IFSC Code:</strong> {itemToView.ifscCode}</p>
                    <p style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}><strong>Branch:</strong> {itemToView.branch}</p>
                    <p style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}><strong>PAN Number:</strong> {itemToView.panNumber}</p>
                    <p style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}><strong>GST Number:</strong> {itemToView.gstNumber}</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer" style={{ padding: isMobile ? '8px 12px' : '' }}>
                <button className="btn text-white" style={{ background: COLORS.primary, fontSize: isMobile ? '0.75rem' : '1rem' }} onClick={closeViewModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Edit Modal --- */}
      {showEditModal && itemToEdit && (
        <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.4)" }}>
          <div className={`modal-dialog modal-dialog-centered ${isMobile ? 'modal-sm' : ''}`} style={{ 
            maxWidth: isMobile ? '90%' : '80%',
            width: isMobile ? '90%' : '800px',
            margin: isMobile ? '5px auto' : '1.75rem auto'
          }}>
            <div className="modal-content" style={{ borderRadius: "10px" }}>
              <div className="modal-header" style={{ background: COLORS.primary, color: COLORS.white, padding: isMobile ? '8px 12px' : '' }}>
                <h5 className="modal-title" style={{ fontSize: isMobile ? '0.9rem' : '1.25rem' }}>
                  Edit Employer
                </h5>
                <button className="btn-close btn-close-white" onClick={closeEditModal}></button>
              </div>
              <div className="modal-body" style={{ 
                padding: isMobile ? '8px' : '20px',
                maxHeight: isMobile ? '70vh' : 'auto',
                overflowY: isMobile ? 'auto' : 'visible'
              }}>
                <div className="row">
                  <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-3'}>
                    <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>Name</label>
                    <input type="text" className={`form-control ${isMobile ? 'form-control-sm' : ''}`} name="name" value={itemToEdit.name} onChange={handleEditChange} style={{ fontSize: isMobile ? '0.75rem' : '1rem' }} />
                  </div>
                  <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-3'}>
                    <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>Email</label>
                    <input type="email" className={`form-control ${isMobile ? 'form-control-sm' : ''}`} name="email" value={itemToEdit.email} onChange={handleEditChange} style={{ fontSize: isMobile ? '0.75rem' : '1rem' }} />
                  </div>
                  <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-3'}>
                    <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>Phone</label>
                    <input type="text" className={`form-control ${isMobile ? 'form-control-sm' : ''}`} name="phone" value={itemToEdit.phone} onChange={handleEditChange} style={{ fontSize: isMobile ? '0.75rem' : '1rem' }} />
                  </div>
                  <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-3'}>
                    <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>Balance</label>
                    <input type="number" className={`form-control ${isMobile ? 'form-control-sm' : ''}`} name="balance" value={itemToEdit.balance} onChange={handleEditChange} style={{ fontSize: isMobile ? '0.75rem' : '1rem' }} />
                  </div>
                  <div className={isMobile ? 'col-12 mb-1' : 'col-12 mb-3'}>
                    <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>Address</label>
                    <input type="text" className={`form-control ${isMobile ? 'form-control-sm' : ''}`} name="address" value={itemToEdit.address} onChange={handleEditChange} style={{ fontSize: isMobile ? '0.75rem' : '1rem' }} />
                  </div>
                  <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-3'}>
                    <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>Username</label>
                    <input type="text" className={`form-control ${isMobile ? 'form-control-sm' : ''}`} name="username" value={itemToEdit.username} onChange={handleEditChange} style={{ fontSize: isMobile ? '0.75rem' : '1rem' }} />
                  </div>
                  <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-3'}>
                    <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>Password</label>
                    <input type="password" className={`form-control ${isMobile ? 'form-control-sm' : ''}`} name="password" value={itemToEdit.password} onChange={handleEditChange} style={{ fontSize: isMobile ? '0.75rem' : '1rem' }} />
                  </div>
                  <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-3'}>
                    <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>Level</label>
                    <select className={`form-select ${isMobile ? 'form-select-sm' : ''}`} name="level" value={itemToEdit.level} onChange={handleEditChange} style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>
                      <option value="">Select Level</option>
                      <option value="Bronze">Bronze</option>
                      <option value="Silver">Silver</option>
                      <option value="Gold">Gold</option>
                      <option value="Platinum">Platinum</option>
                    </select>
                  </div>
                  
                  <div className={isMobile ? 'col-12 mt-2 mb-1' : 'col-12 mt-4 mb-3'}>
                    <h5 style={{ color: COLORS.primary, borderBottom: `1px solid ${COLORS.border}`, paddingBottom: '8px', fontSize: isMobile ? '0.85rem' : '1.1rem' }}>Bank Details</h5>
                  </div>
                  <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-3'}>
                    <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>Bank Name</label>
                    <input type="text" className={`form-control ${isMobile ? 'form-control-sm' : ''}`} name="bankName" value={itemToEdit.bankName} onChange={handleEditChange} style={{ fontSize: isMobile ? '0.75rem' : '1rem' }} />
                  </div>
                  <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-3'}>
                    <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>Account Number</label>
                    <input type="text" className={`form-control ${isMobile ? 'form-control-sm' : ''}`} name="accountNumber" value={itemToEdit.accountNumber} onChange={handleEditChange} style={{ fontSize: isMobile ? '0.75rem' : '1rem' }} />
                  </div>
                  <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-3'}>
                    <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>IFSC Code</label>
                    <input type="text" className={`form-control ${isMobile ? 'form-control-sm' : ''}`} name="ifscCode" value={itemToEdit.ifscCode} onChange={handleEditChange} style={{ fontSize: isMobile ? '0.75rem' : '1rem' }} />
                  </div>
                  <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-3'}>
                    <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>Branch</label>
                    <input type="text" className={`form-control ${isMobile ? 'form-control-sm' : ''}`} name="branch" value={itemToEdit.branch} onChange={handleEditChange} style={{ fontSize: isMobile ? '0.75rem' : '1rem' }} />
                  </div>
                  <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-3'}>
                    <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>PAN Number</label>
                    <input type="text" className={`form-control ${isMobile ? 'form-control-sm' : ''}`} name="panNumber" value={itemToEdit.panNumber} onChange={handleEditChange} style={{ fontSize: isMobile ? '0.75rem' : '1rem' }} />
                  </div>
                  <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-3'}>
                    <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>GST Number</label>
                    <input type="text" className={`form-control ${isMobile ? 'form-control-sm' : ''}`} name="gstNumber" value={itemToEdit.gstNumber} onChange={handleEditChange} style={{ fontSize: isMobile ? '0.75rem' : '1rem' }} />
                  </div>
                </div>
              </div>
              <div className="modal-footer" style={{ padding: isMobile ? '8px 12px' : '' }}>
                <button className="btn" onClick={closeEditModal} style={{ background: COLORS.border, color: COLORS.black, fontSize: isMobile ? '0.75rem' : '1rem' }}>Cancel</button>
                <button className="btn text-white" style={{ background: COLORS.primary, fontSize: isMobile ? '0.75rem' : '1rem' }} onClick={updateItem}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Assign Credit Modal --- */}
      {showAssignModal && selectedItem && (
        <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.4)" }}>
          <div className={`modal-dialog modal-dialog-centered ${isMobile ? 'modal-sm' : ''}`} style={{ 
            maxWidth: isMobile ? '90%' : '500px',
            width: isMobile ? '90%' : '500px',
            margin: isMobile ? '5px auto' : '1.75rem auto'
          }}>
            <div className="modal-content" style={{ borderRadius: "10px" }}>
              <div className="modal-header" style={{ background: COLORS.primary, color: COLORS.white, padding: isMobile ? '8px 12px' : '' }}>
                <h5 className="modal-title" style={{ fontSize: isMobile ? '0.9rem' : '1.25rem' }}>Assign Credit</h5>
                <button className="btn-close btn-close-white" onClick={closeAssignModal}></button>
              </div>
              <div className="modal-body" style={{ padding: isMobile ? '8px' : '20px' }}>
                <div className="mb-3">
                  <p style={{ color: COLORS.black, fontSize: isMobile ? '0.75rem' : '1rem' }}>
                    Employer: <strong>{selectedItem.name}</strong>
                  </p>
                  <p style={{ color: COLORS.black, fontSize: isMobile ? '0.75rem' : '1rem' }}>Current Balance: <strong>₹{selectedItem.balance}</strong></p>
                </div>
                <label className="form-label" style={{ color: COLORS.text, fontSize: isMobile ? '0.75rem' : '1rem' }}>Enter Credit Amount</label>
                <input 
                  type="number" 
                  className={`form-control ${isMobile ? 'form-control-sm' : ''}`} 
                  style={{ border: `1px solid ${COLORS.border}`, color: COLORS.black, fontSize: isMobile ? '0.75rem' : '1rem' }} 
                  value={credit} 
                  onChange={(e) => setCredit(e.target.value)} 
                  placeholder="Enter amount to add"
                />
                {credit && (
                  <div className="mt-2">
                    <small style={{ color: COLORS.text, fontSize: isMobile ? '0.75rem' : '1rem' }}>
                      New Balance: <strong>₹{selectedItem.balance + parseInt(credit)}</strong>
                    </small>
                  </div>
                )}
              </div>
              <div className="modal-footer" style={{ padding: isMobile ? '8px 12px' : '' }}>
                <button className="btn" onClick={closeAssignModal} style={{ background: COLORS.border, color: COLORS.black, fontSize: isMobile ? '0.75rem' : '1rem' }}>Cancel</button>
                <button className="btn text-white" style={{ background: COLORS.primary, fontSize: isMobile ? '0.75rem' : '1rem' }} onClick={assignCredit}>Assign Credit</button>
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

export default ManagementSystem;