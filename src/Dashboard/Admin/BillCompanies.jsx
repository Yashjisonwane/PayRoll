import React, { useState, useEffect } from "react";

export default function BillCompaniesPage() {
  // --- Color Palette as per requirements ---
  const colors = {
    primary: "#C62828",      // Primary Red for buttons
    primaryDark: "#B71C1C",  // Dark Red for logo accent
    white: "#FFFFFF",        // Pure White for navbar background
    black: "#000000",        // Black Text for main text inside modal
    darkGray: "#4A4A4A",      // Dark Gray Text for secondary text
    border: "#E2E2E2",       // Light Gray Border for input borders
    modalOverlay: "rgba(0, 0, 0, 0.5)",
    // background: "#F0F4F8",    // Removed background color
  };

  // --- Initial Mock Data (यह आप API से लाएंगे) ---
  const initialCompanies = [
    { id: 1, name: "Delhi Electricity Board", category: "Electricity", billingCode: "DEL-VSB-001", status: "Active" },
    { id: 2, name: "Airtel Mobile", category: "Mobile", billingCode: "AIR-MOB-002", status: "Active" },
    { id: 3, name: "Mahanagar Gas Limited", category: "Gas", billingCode: "MGL-GAS-003", status: "Inactive" },
    { id: 4, name: "ACT Fibernet", category: "Internet", billingCode: "ACT-NET-004", status: "Active" },
  ];

  // --- State Management ---
  const [companies, setCompanies] = useState(initialCompanies);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCompany, setCurrentCompany] = useState({}); // For Add/Edit

  // --- Handlers ---
  const openAddModal = () => {
    setCurrentCompany({}); // Reset for new company
    setIsModalOpen(true);
  };

  const openEditModal = (company) => {
    setCurrentCompany(company);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCompany({});
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (currentCompany.id) {
      // Edit existing company
      setCompanies(companies.map(c => (c.id === currentCompany.id ? currentCompany : c)));
    } else {
      // Add new company
      const newCompany = { ...currentCompany, id: Date.now() }; // Simple unique ID
      setCompanies([...companies, newCompany]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      setCompanies(companies.filter(c => c.id !== id));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCompany({ ...currentCompany, [name]: value });
  };

  // --- Filter companies based on search ---
  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', padding: '20px' }}>
      
      {/* --- HEADER --- */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px',
        backgroundColor: colors.white,
        padding: '15px 20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ 
            height: '40px', 
            width: '5px', 
            backgroundColor: colors.primary, 
            marginRight: '15px',
            borderRadius: '2px'
          }}></div>
          <h1 style={{ color: colors.primary, margin: 0 }}>Bill Companies</h1>
        </div>
        <button onClick={openAddModal} style={styles.button(colors.primary, colors.white)}>
          + Add New Bill Company
        </button>
      </div>

      {/* --- SEARCH BOX --- */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by company name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input(colors.border)}
        />
      </div>

      {/* --- TABLE LIST --- */}
      <div style={{ backgroundColor: colors.white, borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: colors.primary, color: colors.white }}>
            <tr>
              <th style={styles.th}>Company Name</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Billing Code</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map(company => (
                <tr key={company.id} style={{ borderBottom: `1px solid ${colors.border}` }}>
                  <td style={styles.td}>{company.name}</td>
                  <td style={styles.td}>{company.category}</td>
                  <td style={styles.td}>{company.billingCode}</td>
                  <td style={styles.td}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      backgroundColor: company.status === 'Active' ? '#e8f5e9' : '#ffcdd2',
                      color: company.status === 'Active' ? '#2e7d32' : '#c62828',
                    }}>
                      {company.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button onClick={() => openEditModal(company)} style={{...styles.actionButton, color: colors.primary, border: `1px solid ${colors.primary}`}}>Edit</button>
                    <button onClick={() => handleDelete(company.id)} style={{...styles.actionButton, color: colors.primary, border: `1px solid ${colors.primary}`, marginLeft: '8px'}}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ ...styles.td, textAlign: 'center', padding: '20px', color: colors.darkGray }}>
                  No companies found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- ADD/EDIT MODAL --- */}
      {isModalOpen && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalBox(colors.white)} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ 
                height: '30px', 
                width: '4px', 
                backgroundColor: colors.primaryDark, 
                marginRight: '15px',
                borderRadius: '2px'
              }}></div>
              <h2 style={{ marginTop: 0, color: colors.black }}>
                {currentCompany.id ? 'Edit Bill Company' : 'Add New Bill Company'}
              </h2>
            </div>
            <form onSubmit={handleSave}>
              <input
                type="text"
                name="name"
                placeholder="Company Name"
                value={currentCompany.name || ''}
                onChange={handleInputChange}
                required
                style={styles.input(colors.border)}
              />
              <select
                name="category"
                value={currentCompany.category || ''}
                onChange={handleInputChange}
                required
                style={styles.input(colors.border)}
              >
                <option value="">Select Category</option>
                <option value="Electricity">Electricity</option>
                <option value="Water">Water</option>
                <option value="Mobile">Mobile</option>
                <option value="Internet">Internet</option>
                <option value="Gas">Gas</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="text"
                name="billingCode"
                placeholder="Billing Code / Reference Number"
                value={currentCompany.billingCode || ''}
                onChange={handleInputChange}
                required
                style={styles.input(colors.border)}
              />
              <select
                name="status"
                value={currentCompany.status || 'Active'}
                onChange={handleInputChange}
                required
                style={styles.input(colors.border)}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" onClick={closeModal} style={{...styles.button(colors.white, colors.darkGray), background: colors.white, border: `1px solid ${colors.border}`}}>
                  Cancel
                </button>
                <button type="submit" style={styles.button(colors.primary, colors.white)}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Reusable Styles ---
const styles = {
  button: (bg, color) => ({
    backgroundColor: bg,
    color: color,
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
    transition: 'background-color 0.3s',
  }),
  actionButton: {
    background: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '13px',
    transition: 'all 0.2s',
  },
  input: (borderColor) => ({
    width: '100%',
    padding: '10px',
    margin: '8px 0',
    border: `1px solid ${borderColor}`,
    borderRadius: '5px',
    boxSizing: 'border-box',
    fontSize: '14px',
  }),
  th: {
    padding: '12px 15px',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  td: {
    padding: '12px 15px',
    color: '#000000',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalBox: (bg) => ({
    backgroundColor: bg,
    padding: '25px',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '450px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  }),
};