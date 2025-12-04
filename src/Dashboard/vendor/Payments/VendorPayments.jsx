import React, { useState, useEffect } from "react";

const COLORS = {
  primary: "#C62828",           // Primary Red (Buttons, Logo, Menu Icon)
  primaryDark: "#B71C1C",       // Dark Red / Logo Text Accent
  white: "#FFFFFF",             // Pure White
  black: "#000000",             // Black Text
  text: "#4A4A4A",             // Dark Gray Text
  border: "#E2E2E2",            // Light Gray Border
  chartLine: "#4BA8FF",         // Green-Blue Chart Line
  blueLabel: "#8BAFE3",         // Blue Label Badge (Payroll Guidance)
  oliveLabel: "#95A98A",        // Olive Green Label (Payroll Compliance)
  // Additional colors for UI elements
  success: "#2E7D32",
  warning: "#F57C00",
  danger: "#D32F2F",
  lightGray: "#F5F5F5",
  hoverBg: "#F0F0F0",
  info: "#1976D2",
};

const EmployeeVendorPayments = () => {
  const [activeTab, setActiveTab] = useState("payments");
  const [payments, setPayments] = useState([
    { 
      id: 1, 
      date: "2024-01-15", 
      paidBy: "Tech Solutions Inc.", 
      amount: 5000,
      status: "Completed",
      reference: "PAY-2024-001",
      description: "Monthly payment for services"
    },
    { 
      id: 2, 
      date: "2024-01-10", 
      paidBy: "Global Corp", 
      amount: 7500,
      status: "Completed",
      reference: "PAY-2024-002",
      description: "Project milestone payment"
    },
    { 
      id: 3, 
      date: "2024-01-05", 
      paidBy: "StartUp Hub", 
      amount: 3200,
      status: "Pending",
      reference: "PAY-2024-003",
      description: "Consulting fees"
    },
    { 
      id: 4, 
      date: "2023-12-28", 
      paidBy: "Digital Agency", 
      amount: 4500,
      status: "Completed",
      reference: "PAY-2023-098",
      description: "Design services payment"
    },
    { 
      id: 5, 
      date: "2023-12-20", 
      paidBy: "Innovation Labs", 
      amount: 6000,
      status: "Completed",
      reference: "PAY-2023-097",
      description: "Development services"
    },
  ]);

  const [bankAccounts, setBankAccounts] = useState([
    {
      id: 1,
      bankName: "State Bank of India",
      accountNumber: "123456789012",
      accountType: "Savings",
      ifscCode: "SBIN0001234",
      branch: "Main Branch, Delhi",
      isPrimary: true
    }
  ]);

  const [vendorProfile, setVendorProfile] = useState({
    businessName: "Tech Solutions Inc.",
    contactPerson: "John Doe",
    email: "john.doe@techsolutions.com",
    phone: "+91 9876543210",
    address: "123 Tech Park, Bangalore, Karnataka, 560001",
    taxId: "GSTIN1234567890ABCD",
    description: "We provide technology solutions for businesses."
  });

  const [showAddBankModal, setShowAddBankModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Track window width for responsive adjustments
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive breakpoints
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.paidBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || payment.status === filterStatus;
    const matchesDateRange = (!dateRange.start || payment.date >= dateRange.start) &&
                             (!dateRange.end || payment.date <= dateRange.end);
    
    return matchesSearch && matchesStatus && matchesDateRange;
  });

  const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Completed": return COLORS.oliveLabel;
      case "Pending": return COLORS.warning;
      case "Failed": return COLORS.danger;
      default: return COLORS.text;
    }
  };

  // Bank account form state
  const [bankForm, setBankForm] = useState({
    bankName: "",
    accountNumber: "",
    accountType: "Savings",
    ifscCode: "",
    branch: "",
    isPrimary: false
  });

  // Vendor profile form state
  const [profileForm, setProfileForm] = useState({...vendorProfile});

  // Export PDF function
  const handleExportPDF = () => {
    // Create a simple HTML representation of payment data
    let htmlContent = `
      <html>
        <head>
          <title>Payment Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin:20px; }
            h1 { color: ${COLORS.primary}; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid ${COLORS.border}; padding: 8px; text-align: left; }
            th { background-color: ${COLORS.lightGray}; }
            .total { font-weight: bold; margin-top: 20px; }
            .status-completed { color: ${COLORS.oliveLabel}; }
            .status-pending { color: ${COLORS.warning}; }
            .status-failed { color: ${COLORS.danger}; }
          </style>
        </head>
        <body>
          <h1>Payment Report</h1>
          <p>Generated on: ${new Date().toLocaleDateString()}</p>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Paid By</th>
                <th>Reference</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
    `;
    
    filteredPayments.forEach(payment => {
      htmlContent += `
        <tr>
          <td>${formatDate(payment.date)}</td>
          <td>${payment.paidBy}</td>
          <td>${payment.reference}</td>
          <td class="status-${payment.status.toLowerCase()}">${payment.status}</td>
          <td>$${payment.amount.toLocaleString()}</td>
        </tr>
      `;
    });
    
    htmlContent += `
            </tbody>
          </table>
          <div class="total">Total: $${totalAmount.toLocaleString()}</div>
        </body>
      </html>
    `;
    
    // In a real implementation, you would use a library like jsPDF or html2pdf
    // For this example, we'll create a simple text file download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `payment_report_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Import PDF function
  const handleImportPDF = () => {
    // Create a file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.html,.csv';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // In a real implementation, you would parse file and update payments state
        // For this example, we'll just show an alert
        alert(`File "${file.name}" would be processed here. In a real implementation, this would parse file and update payments data.`);
      }
    };
    
    input.click();
  };

  // Handle adding a new bank account
  const handleAddBankAccount = (e) => {
    e.preventDefault();
    const newAccount = {
      ...bankForm,
      id: bankAccounts.length + 1
    };
    
    // If this is set as primary, update all other accounts
    if (bankForm.isPrimary) {
      setBankAccounts(bankAccounts.map(account => ({
        ...account,
        isPrimary: account.id === newAccount.id
      })));
    } else {
      setBankAccounts([...bankAccounts, newAccount]);
    }
    
    // Reset form and close modal
    setBankForm({
      bankName: "",
      accountNumber: "",
      accountType: "Savings",
      ifscCode: "",
      branch: "",
      isPrimary: false
    });
    setShowAddBankModal(false);
  };

  // Handle updating vendor profile
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setVendorProfile(profileForm);
    setShowEditProfileModal(false);
    alert("Profile updated successfully!");
  };

  // Handle setting primary bank account
  const handleSetPrimaryBank = (id) => {
    setBankAccounts(bankAccounts.map(account => ({
      ...account,
      isPrimary: account.id === id
    })));
  };

  // Handle deleting bank account
  const handleDeleteBankAccount = (id) => {
    if (window.confirm("Are you sure you want to delete this bank account?")) {
      setBankAccounts(bankAccounts.filter(account => account.id !== id));
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "15px" : "20px" }}>
        {/* Header Section with Tabs */}
        <div style={{ 
          marginBottom: isMobile ? "20px" : "24px", 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: isMobile ? "flex-start" : "center",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "15px" : "0"
        }}>
          <div>
            <h1 style={{ 
              fontSize: isMobile ? "24px" : "28px", 
              fontWeight: 700, 
              margin: 0, 
              color: COLORS.black 
            }}>
              Vendor Management
            </h1>
            <p style={{ 
              fontSize: isMobile ? "14px" : "16px", 
              color: COLORS.text, 
              marginTop: "8px" 
            }}>
              Manage your vendor profile, bank accounts, and payment history
            </p>
          </div>
          <div style={{ 
            display: "flex", 
            gap: isMobile ? "8px" : "12px",
            width: isMobile ? "100%" : "auto"
          }}>
            <button
              style={{
                padding: isMobile ? "8px 12px" : "10px 16px",
                borderRadius: "8px",
                backgroundColor: activeTab === "payments" ? COLORS.primary : COLORS.lightGray,
                color: activeTab === "payments" ? COLORS.white : COLORS.text,
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: isMobile ? "13px" : "14px",
                transition: "all 0.2s ease",
              }}
              onClick={() => setActiveTab("payments")}
            >
              {isMobile ? "Payments" : "Payment History"}
            </button>
            <button
              style={{
                padding: isMobile ? "8px 12px" : "10px 16px",
                borderRadius: "8px",
                backgroundColor: activeTab === "bank" ? COLORS.primary : COLORS.lightGray,
                color: activeTab === "bank" ? COLORS.white : COLORS.text,
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: isMobile ? "13px" : "14px",
                transition: "all 0.2s ease",
              }}
              onClick={() => setActiveTab("bank")}
            >
              {isMobile ? "Bank" : "Bank Accounts"}
            </button>
            <button
              style={{
                padding: isMobile ? "8px 12px" : "10px 16px",
                borderRadius: "8px",
                backgroundColor: activeTab === "profile" ? COLORS.primary : COLORS.lightGray,
                color: activeTab === "profile" ? COLORS.white : COLORS.text,
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: isMobile ? "13px" : "14px",
                transition: "all 0.2s ease",
              }}
              onClick={() => setActiveTab("profile")}
            >
              {isMobile ? "Profile" : "Vendor Profile"}
            </button>
          </div>
        </div>

        {/* Payment History Tab */}
        {activeTab === "payments" && (
          <>
            {/* Stats Cards */}
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: isMobile ? "1fr" : (isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)"), 
              gap: isMobile ? "12px" : "16px", 
              marginBottom: isMobile ? "20px" : "24px" 
            }}>
              <div style={{
                backgroundColor: COLORS.white,
                borderRadius: "12px",
                padding: isMobile ? "15px" : "20px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                display: "flex",
                alignItems: "center",
                gap: "16px"
              }}>
                <div style={{ 
                  width: "48px", 
                  height: "48px", 
                  borderRadius: "50%", 
                  backgroundColor: COLORS.chartLine + "20", 
                  color: COLORS.chartLine,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: "14px", color: COLORS.text, marginBottom: "4px" }}>Total Received</div>
                  <div style={{ fontSize: "24px", fontWeight: 700, color: COLORS.black }}>${totalAmount.toLocaleString()}</div>
                </div>
              </div>
              <div style={{
                backgroundColor: COLORS.white,
                borderRadius: "12px",
                padding: isMobile ? "15px" : "20px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                display: "flex",
                alignItems: "center",
                gap: "16px"
              }}>
                <div style={{ 
                  width: "48px", 
                  height: "48px", 
                  borderRadius: "50%", 
                  backgroundColor: COLORS.oliveLabel + "20", 
                  color: COLORS.oliveLabel,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: "14px", color: COLORS.text, marginBottom: "4px" }}>Completed</div>
                  <div style={{ fontSize: "24px", fontWeight: 700, color: COLORS.black }}>{payments.filter(p => p.status === "Completed").length}</div>
                </div>
              </div>
              <div style={{
                backgroundColor: COLORS.white,
                borderRadius: "12px",
                padding: isMobile ? "15px" : "20px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                display: "flex",
                alignItems: "center",
                gap: "16px"
              }}>
                <div style={{ 
                  width: "48px", 
                  height: "48px", 
                  borderRadius: "50%", 
                  backgroundColor: COLORS.warning + "20", 
                  color: COLORS.warning,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: "14px", color: COLORS.text, marginBottom: "4px" }}>Pending</div>
                  <div style={{ fontSize: "24px", fontWeight: 700, color: COLORS.black }}>{payments.filter(p => p.status === "Pending").length}</div>
                </div>
              </div>
            </div>

            {/* Filters Section */}
            <div style={{ 
              backgroundColor: COLORS.white, 
              borderRadius: "12px", 
              padding: isMobile ? "15px" : "20px", 
              marginBottom: isMobile ? "20px" : "24px", 
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)" 
            }}>
              {/* Mobile Filter Toggle */}
              {isMobile && (
                <button
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    backgroundColor: COLORS.lightGray,
                    color: COLORS.text,
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "14px"
                  }}
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                >
                  <span>Filters</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              )}
              
              <div style={{
                display: isMobile ? (showMobileFilters ? "block" : "none") : "grid",
                gridTemplateColumns: isTablet ? "repeat(2, 1fr)" : "repeat(auto-fit, minmax(200px, 1fr))", 
                gap: isMobile ? "15px" : "16px", 
                alignItems: "end"
              }}>
                <div>
                  <label style={{ fontSize: "14px", fontWeight: "600", color: COLORS.text, marginBottom: "8px", display: "block" }}>Search</label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: "100%",
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: "8px",
                      padding: "10px 12px",
                      fontSize: "14px",
                      transition: "border-color 0.2s ease"
                    }}
                    placeholder="Search by name or reference"
                  />
                </div>
                <div>
                  <label style={{ fontSize: "14px", fontWeight: "600", color: COLORS.text, marginBottom: "8px", display: "block" }}>Status</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    style={{
                      width: "100%",
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: "8px",
                      padding: "10px 12px",
                      fontSize: "14px",
                      transition: "border-color 0.2s ease"
                    }}
                  >
                    <option value="all">All Status</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "14px", fontWeight: "600", color: COLORS.text, marginBottom: "8px", display: "block" }}>From Date</label>
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                    style={{
                      width: "100%",
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: "8px",
                      padding: "10px 12px",
                      fontSize: "14px",
                      transition: "border-color 0.2s ease"
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "14px", fontWeight: "600", color: COLORS.text, marginBottom: "8px", display: "block" }}>To Date</label>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                    style={{
                      width: "100%",
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: "8px",
                      padding: "10px 12px",
                      fontSize: "14px",
                      transition: "border-color 0.2s ease"
                    }}
                  />
                </div>
                <div>
                  <button
                    style={{
                      padding: "10px 16px",
                      borderRadius: "8px",
                      backgroundColor: COLORS.lightGray,
                      border: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: COLORS.text,
                      transition: "all 0.2s ease",
                    }}
                    onClick={() => {
                      setSearchTerm("");
                      setFilterStatus("all");
                      setDateRange({ start: "", end: "" });
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Payments Table */}
            <div style={{ 
              backgroundColor: COLORS.white, 
              borderRadius: "12px", 
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)", 
              overflow: "hidden" 
            }}>
              <div style={{ 
                padding: isMobile ? "15px" : "20px", 
                borderBottom: `1px solid ${COLORS.border}` 
              }}>
                <h2 style={{ 
                  fontSize: isMobile ? "18px" : "20px", 
                  fontWeight: 600, 
                  margin: 0, 
                  color: COLORS.black 
                }}>
                  Payments Received
                </h2>
              </div>
              
              {isMobile ? (
                // Mobile Card View
                <div style={{ padding: isMobile ? "15px" : "20px" }}>
                  {filteredPayments.map((payment) => (
                    <div 
                      key={payment.id} 
                      style={{
                        backgroundColor: COLORS.lightGray,
                        borderRadius: "8px",
                        padding: "15px",
                        marginBottom: "15px",
                        border: `1px solid ${COLORS.border}`
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                        <div style={{ fontWeight: 600, color: COLORS.black }}>{payment.paidBy}</div>
                        <span style={{
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: 600,
                          backgroundColor: getStatusColor(payment.status) + "20",
                          color: getStatusColor(payment.status)
                        }}>
                          {payment.status}
                        </span>
                      </div>
                      <div style={{ fontSize: "14px", color: COLORS.text, marginBottom: "5px" }}>
                        {payment.reference}
                      </div>
                      <div style={{ fontSize: "14px", color: COLORS.text, marginBottom: "10px" }}>
                        {formatDate(payment.date)}
                      </div>
                      <div style={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center" 
                      }}>
                        <div style={{ 
                          fontSize: "18px", 
                          fontWeight: 700, 
                          color: COLORS.oliveLabel 
                        }}>
                          ${payment.amount.toLocaleString()}
                        </div>
                        <button
                          style={{
                            padding: "6px 12px",
                            borderRadius: "6px",
                            border: "none",
                            color: COLORS.white,
                            cursor: "pointer",
                            fontSize: "12px",
                            fontWeight: 600,
                            backgroundColor: COLORS.primary,
                            display: "flex",
                            alignItems: "center",
                            gap: "4px"
                          }}
                          onClick={() => setSelectedPayment(payment)}
                          title="View Details"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Desktop Table View
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ backgroundColor: COLORS.lightGray }}>
                        <th style={{ padding: "16px", fontWeight: 600, color: COLORS.text, fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.5px", textAlign: "left" }}>Date</th>
                        <th style={{ padding: "16px", fontWeight: 600, color: COLORS.text, fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.5px", textAlign: "left" }}>Paid By</th>
                        <th style={{ padding: "16px", fontWeight: 600, color: COLORS.text, fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.5px", textAlign: "left" }}>Reference</th>
                        <th style={{ padding: "16px", fontWeight: 600, color: COLORS.text, fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.5px", textAlign: "left" }}>Status</th>
                        <th style={{ padding: "16px", fontWeight: 600, color: COLORS.text, fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.5px", textAlign: "right" }}>Amount</th>
                        <th style={{ padding: "16px", fontWeight: 600, color: COLORS.text, fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.5px", textAlign: "center" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPayments.map((payment, index) => (
                        <tr 
                          key={payment.id} 
                          style={{ 
                            backgroundColor: index % 2 === 0 ? COLORS.white : COLORS.lightGray, 
                            transition: "background-color 0.2s ease" 
                          }}
                        >
                          <td style={{ padding: "16px", fontWeight: 500, fontSize: "14px" }}>{formatDate(payment.date)}</td>
                          <td style={{ padding: "16px", fontWeight: 600, fontSize: "14px" }}>{payment.paidBy}</td>
                          <td style={{ padding: "16px", color: COLORS.text, fontSize: "14px" }}>{payment.reference}</td>
                          <td style={{ padding: "16px", fontSize: "14px" }}>
                            <span style={{
                              padding: "4px 8px",
                              borderRadius: "4px",
                              fontSize: "12px",
                              fontWeight: 600,
                              backgroundColor: getStatusColor(payment.status) + "20",
                              color: getStatusColor(payment.status)
                            }}>
                              {payment.status}
                            </span>
                          </td>
                          <td style={{ padding: "16px", textAlign: "right", fontWeight: 600, color: COLORS.oliveLabel, fontSize: "14px" }}>
                            ${payment.amount.toLocaleString()}
                          </td>
                          <td style={{ padding: "16px", textAlign: "center", fontSize: "14px" }}>
                            <button
                              style={{
                                padding: "6px 12px",
                                borderRadius: "6px",
                                border: "none",
                                color: COLORS.white,
                                cursor: "pointer",
                                backgroundColor: COLORS.primary,
                                display: "flex",
                                alignItems: "center",
                                gap: "4px"
                              }}
                              onClick={() => setSelectedPayment(payment)}
                              title="View Details"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                              </svg>
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Export/Import Buttons */}
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              marginTop: "20px",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? "12px" : "0"
            }}>
              <button
                style={{
                  padding: "10px 16px",
                  borderRadius: "8px",
                  backgroundColor: COLORS.primary,
                  border: "none",
                  color: COLORS.white,
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.2s ease",
                  width: isMobile ? "100%" : "auto"
                }}
                onClick={handleImportPDF}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px" }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                {isMobile ? "Import" : "Import PDF"}
              </button>
              <button
                style={{
                  padding: "10px 16px",
                  borderRadius: "8px",
                  backgroundColor: COLORS.primary,
                  border: "none",
                  color: COLORS.white,
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.2s ease",
                  width: isMobile ? "100%" : "auto"
                }}
                onClick={handleExportPDF}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px" }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                {isMobile ? "Export" : "Export PDF"}
              </button>
            </div>
          </>
        )}

        {/* Bank Accounts Tab */}
        {activeTab === "bank" && (
          <>
            {/* Bank Accounts Header with Add Button */}
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              marginBottom: "20px" 
            }}>
              <h2 style={{ 
                fontSize: isMobile ? "20px" : "24px", 
                fontWeight: 600, 
                margin: 0, 
                color: COLORS.black 
              }}>
                Bank Accounts
              </h2>
              <button
                style={{
                  padding: "10px 16px",
                  borderRadius: "8px",
                  backgroundColor: COLORS.primary,
                  border: "none",
                  color: COLORS.white,
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.2s ease",
                }}
                onClick={() => setShowAddBankModal(true)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px" }}>
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add Bank Account
              </button>
            </div>

            {/* Bank Accounts List */}
            <div style={{ 
              backgroundColor: COLORS.white, 
              borderRadius: "12px", 
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)", 
              overflow: "hidden" 
            }}>
              {bankAccounts.length > 0 ? (
                <div style={{ padding: isMobile ? "15px" : "20px" }}>
                  {bankAccounts.map((account, index) => (
                    <div 
                      key={account.id} 
                      style={{
                        backgroundColor: index % 2 === 0 ? COLORS.white : COLORS.lightGray,
                        padding: isMobile ? "15px" : "20px",
                        borderBottom: `1px solid ${COLORS.border}`,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                          <h3 style={{ 
                            fontSize: isMobile ? "16px" : "18px", 
                            fontWeight: 600, 
                            margin: 0, 
                            color: COLORS.black 
                          }}>
                            {account.bankName}
                          </h3>
                          {account.isPrimary && (
                            <span style={{
                              marginLeft: "10px",
                              padding: "4px 8px",
                              borderRadius: "4px",
                              fontSize: "12px",
                              fontWeight: 600,
                              backgroundColor: COLORS.primary + "20",
                              color: COLORS.primary
                            }}>
                              Primary
                            </span>
                          )}
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: "10px" }}>
                          <div>
                            <div style={{ fontSize: "14px", color: COLORS.text, marginBottom: "4px" }}>Account Number</div>
                            <div style={{ fontSize: "16px", fontWeight: 500, color: COLORS.black }}>
                              {account.accountNumber.replace(/(\d{4})(\d{4})(\d{4})/, "$1XXXXXX$3")}
                            </div>
                          </div>
                          <div>
                            <div style={{ fontSize: "14px", color: COLORS.text, marginBottom: "4px" }}>Account Type</div>
                            <div style={{ fontSize: "16px", fontWeight: 500, color: COLORS.black }}>
                              {account.accountType}
                            </div>
                          </div>
                          <div>
                            <div style={{ fontSize: "14px", color: COLORS.text, marginBottom: "4px" }}>IFSC Code</div>
                            <div style={{ fontSize: "16px", fontWeight: 500, color: COLORS.black }}>
                              {account.ifscCode}
                            </div>
                          </div>
                          <div>
                            <div style={{ fontSize: "14px", color: COLORS.text, marginBottom: "4px" }}>Branch</div>
                            <div style={{ fontSize: "16px", fontWeight: 500, color: COLORS.black }}>
                              {account.branch}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ 
                        display: "flex", 
                        gap: "8px",
                        alignItems: "center"
                      }}>
                        {!account.isPrimary && (
                          <button
                            style={{
                              padding: "6px 12px",
                              borderRadius: "6px",
                              border: "none",
                              color: COLORS.white,
                              cursor: "pointer",
                              fontSize: "12px",
                              fontWeight: 600,
                              backgroundColor: COLORS.primary,
                              transition: "all 0.2s ease",
                            }}
                            onClick={() => handleSetPrimaryBank(account.id)}
                          >
                            Set Primary
                          </button>
                        )}
                        <button
                          style={{
                              padding: "6px 12px",
                              borderRadius: "6px",
                              border: "none",
                              color: COLORS.danger,
                              cursor: "pointer",
                              fontSize: "12px",
                              fontWeight: 600,
                              backgroundColor: "transparent",
                              transition: "all 0.2s ease",
                            }}
                            onClick={() => handleDeleteBankAccount(account.id)}
                          >
                            Delete
                          </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ 
                  padding: isMobile ? "30px" : "40px", 
                  textAlign: "center" 
                }}>
                  <div style={{ 
                    width: "64px", 
                    height: "64px", 
                    borderRadius: "50%", 
                    backgroundColor: COLORS.lightGray, 
                    color: COLORS.text,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 15px"
                  }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                      <line x1="7" y1="8" x2="17" y2="8"></line>
                    </svg>
                  </div>
                  <h3 style={{ 
                    fontSize: isMobile ? "18px" : "20px", 
                    fontWeight: 600, 
                    margin: "15px 0 10px", 
                    color: COLORS.black 
                  }}>
                    No Bank Accounts
                  </h3>
                  <p style={{ 
                    fontSize: isMobile ? "14px" : "16px", 
                    color: COLORS.text, 
                    margin: 0 
                  }}>
                    Add your bank account to receive direct deposits from clients
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Vendor Profile Tab */}
        {activeTab === "profile" && (
          <>
            {/* Profile Header with Edit Button */}
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              marginBottom: "20px" 
            }}>
              <h2 style={{ 
                fontSize: isMobile ? "20px" : "24px", 
                fontWeight: 600, 
                margin: 0, 
                color: COLORS.black 
              }}>
                Vendor Profile
              </h2>
              <button
                style={{
                  padding: "10px 16px",
                  borderRadius: "8px",
                  backgroundColor: COLORS.primary,
                  border: "none",
                  color: COLORS.white,
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.2s ease",
                }}
                onClick={() => {
                  setProfileForm(vendorProfile);
                  setShowEditProfileModal(true);
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px" }}>
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 2.5z"></path>
                </svg>
                Edit Profile
              </button>
            </div>

            {/* Profile Details */}
            <div style={{ 
              backgroundColor: COLORS.white, 
              borderRadius: "12px", 
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)", 
              overflow: "hidden" 
            }}>
              <div style={{ padding: isMobile ? "20px" : "30px" }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: "20px" }}>
                  <div>
                    <div style={{ fontSize: "14px", color: COLORS.text, marginBottom: "8px" }}>Business Name</div>
                    <div style={{ fontSize: "16px", fontWeight: 500, color: COLORS.black }}>
                      {vendorProfile.businessName}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", color: COLORS.text, marginBottom: "8px" }}>Contact Person</div>
                    <div style={{ fontSize: "16px", fontWeight: 500, color: COLORS.black }}>
                      {vendorProfile.contactPerson}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", color: COLORS.text, marginBottom: "8px" }}>Email</div>
                    <div style={{ fontSize: "16px", fontWeight: 500, color: COLORS.black }}>
                      {vendorProfile.email}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", color: COLORS.text, marginBottom: "8px" }}>Phone</div>
                    <div style={{ fontSize: "16px", fontWeight: 500, color: COLORS.black }}>
                      {vendorProfile.phone}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", color: COLORS.text, marginBottom: "8px" }}>Tax ID</div>
                    <div style={{ fontSize: "16px", fontWeight: 500, color: COLORS.black }}>
                      {vendorProfile.taxId}
                    </div>
                  </div>
                </div>
                
                <div style={{ marginTop: "20px" }}>
                  <div style={{ fontSize: "14px", color: COLORS.text, marginBottom: "8px" }}>Address</div>
                  <div style={{ fontSize: "16px", fontWeight: 500, color: COLORS.black, marginBottom: "20px" }}>
                    {vendorProfile.address}
                  </div>
                  
                  <div style={{ fontSize: "14px", color: COLORS.text, marginBottom: "8px" }}>Description</div>
                  <div style={{ fontSize: "16px", fontWeight: 500, color: COLORS.black }}>
                    {vendorProfile.description}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Payment Details Modal */}
        {selectedPayment && (
          <div style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 99,
            padding: "20px"
          }}>
            <div style={{
              background: COLORS.white,
              padding: isMobile ? "20px" : "24px",
              width: isMobile ? "95%" : "500px",
              maxWidth: "90vw",
              borderRadius: "12px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}>
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center", 
                marginBottom: "20px",
                paddingBottom: "12px",
                borderBottom: `1px solid ${COLORS.border}`,
              }}>
                <h2 style={{ 
                  margin: 0, 
                  fontWeight: 600, 
                  fontSize: isMobile ? "18px" : "20px", 
                  color: COLORS.black 
                }}>
                  Payment Details
                </h2>
                <button
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: COLORS.text,
                    padding: "4px",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => setSelectedPayment(null)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div style={{ 
                backgroundColor: COLORS.lightGray, 
                borderRadius: "8px", 
                padding: "16px", 
                marginBottom: "16px" 
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontWeight: 600, color: COLORS.text, fontSize: "14px" }}>Reference</span>
                  <span style={{ fontWeight: 500, color: COLORS.black, fontSize: "14px" }}>{selectedPayment.reference}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontWeight: 600, color: COLORS.text, fontSize: "14px" }}>Date</span>
                  <span style={{ fontWeight: 500, color: COLORS.black, fontSize: "14px" }}>{formatDate(selectedPayment.date)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontWeight: 600, color: COLORS.text, fontSize: "14px" }}>Paid By</span>
                  <span style={{ fontWeight: 500, color: COLORS.black, fontSize: "14px" }}>{selectedPayment.paidBy}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0" }}>
                  <span style={{ fontWeight: 600, color: COLORS.text, fontSize: "14px" }}>Amount</span>
                  <span style={{ 
                    fontWeight: 500, 
                    fontSize: isMobile ? "16px" : "18px", 
                    fontWeight: 700, 
                    color: COLORS.oliveLabel 
                  }}>
                    ${selectedPayment.amount.toLocaleString()}
                  </span>
                </div>
              </div>

              <div style={{ 
                backgroundColor: COLORS.lightGray, 
                borderRadius: "8px", 
                padding: "16px", 
                marginBottom: "16px" 
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontWeight: 600, color: COLORS.text, fontSize: "14px" }}>Status</span>
                  <span style={{
                    fontWeight: 500,
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: 600,
                    backgroundColor: getStatusColor(selectedPayment.status) + "20",
                    color: getStatusColor(selectedPayment.status)
                  }}>
                    {selectedPayment.status}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0" }}>
                  <span style={{ fontWeight: 600, color: COLORS.text, fontSize: "14px" }}>Description</span>
                  <span style={{ fontWeight: 500, color: COLORS.black, fontSize: "14px" }}>{selectedPayment.description}</span>
                </div>
              </div>

              <div style={{
                marginTop: "24px",
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
                flexDirection: isMobile ? "column" : "row"
              }}>
                <button
                  style={{
                    padding: "10px 16px",
                    borderRadius: "8px",
                    backgroundColor: COLORS.primary,
                    border: "none",
                    color: COLORS.white,
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: 600,
                    transition: "all 0.2s ease",
                    width: isMobile ? "100%" : "auto"
                  }}
                  onClick={() => alert("Run payment functionality")}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px" }}>
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  Run Payment
                </button>
                <button
                  style={{
                    padding: "10px 16px",
                    borderRadius: "8px",
                    backgroundColor: COLORS.lightGray,
                    border: "none",
                    color: COLORS.text,
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: 600,
                    transition: "all 0.2s ease",
                    width: isMobile ? "100%" : "auto"
                  }}
                  onClick={() => setSelectedPayment(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Bank Account Modal */}
        {showAddBankModal && (
          <div style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 99,
            padding: "20px"
          }}>
            <div style={{
              background: COLORS.white,
              padding: isMobile ? "20px" : "24px",
              width: isMobile ? "95%" : "500px",
              maxWidth: "90vw",
              borderRadius: "12px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}>
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center", 
                marginBottom: "20px",
                paddingBottom: "12px",
                borderBottom: `1px solid ${COLORS.border}`,
              }}>
                <h2 style={{ 
                  margin: 0, 
                  fontWeight: 600, 
                  fontSize: isMobile ? "18px" : "20px", 
                  color: COLORS.black 
                }}>
                  Add Bank Account
                </h2>
                <button
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: COLORS.text,
                    padding: "4px",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => setShowAddBankModal(false)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <form onSubmit={handleAddBankAccount}>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: COLORS.text, marginBottom: "8px" }}>Bank Name</label>
                  <input
                    type="text"
                    value={bankForm.bankName}
                    onChange={(e) => setBankForm({...bankForm, bankName: e.target.value})}
                    required
                    style={{
                      width: "100%",
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: "8px",
                      padding: "10px 12px",
                      fontSize: "14px",
                      transition: "border-color 0.2s ease"
                    }}
                  />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: COLORS.text, marginBottom: "8px" }}>Account Number</label>
                  <input
                    type="text"
                    value={bankForm.accountNumber}
                    onChange={(e) => setBankForm({...bankForm, accountNumber: e.target.value})}
                    required
                    style={{
                      width: "100%",
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: "8px",
                      padding: "10px 12px",
                      fontSize: "14px",
                      transition: "border-color 0.2s ease"
                    }}
                  />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: COLORS.text, marginBottom: "8px" }}>Account Type</label>
                  <select
                    value={bankForm.accountType}
                    onChange={(e) => setBankForm({...bankForm, accountType: e.target.value})}
                    style={{
                      width: "100%",
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: "8px",
                      padding: "10px 12px",
                      fontSize: "14px",
                      transition: "border-color 0.2s ease"
                    }}
                  >
                    <option value="Savings">Savings</option>
                    <option value="Current">Current</option>
                    <option value="Salary">Salary</option>
                  </select>
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: COLORS.text, marginBottom: "8px" }}>IFSC Code</label>
                  <input
                    type="text"
                    value={bankForm.ifscCode}
                    onChange={(e) => setBankForm({...bankForm, ifscCode: e.target.value})}
                    required
                    style={{
                      width: "100%",
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: "8px",
                      padding: "10px 12px",
                      fontSize: "14px",
                      transition: "border-color 0.2s ease"
                    }}
                  />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: COLORS.text, marginBottom: "8px" }}>Branch</label>
                  <input
                    type="text"
                    value={bankForm.branch}
                    onChange={(e) => setBankForm({...bankForm, branch: e.target.value})}
                    required
                    style={{
                      width: "100%",
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: "8px",
                      padding: "10px 12px",
                      fontSize: "14px",
                      transition: "border-color 0.2s ease"
                    }}
                  />
                </div>
                <div style={{ marginBottom: "24px" }}>
                  <label style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    fontSize: "14px", 
                    fontWeight: 600, 
                    color: COLORS.text 
                  }}>
                    <input
                      type="checkbox"
                      checked={bankForm.isPrimary}
                      onChange={(e) => setBankForm({...bankForm, isPrimary: e.target.checked})}
                      style={{ marginRight: "8px" }}
                    />
                    Set as Primary Account
                  </label>
                </div>

                <div style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "12px"
                }}>
                  <button
                    type="button"
                    style={{
                      padding: "10px 16px",
                      borderRadius: "8px",
                      backgroundColor: COLORS.lightGray,
                      border: "none",
                      color: COLORS.text,
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: 600,
                      transition: "all 0.2s ease",
                    }}
                    onClick={() => setShowAddBankModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: "10px 16px",
                      borderRadius: "8px",
                      backgroundColor: COLORS.primary,
                      border: "none",
                      color: COLORS.white,
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: 600,
                      transition: "all 0.2s ease",
                    }}
                  >
                    Add Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Profile Modal */}
        {showEditProfileModal && (
          <div style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 99,
            padding: "20px"
          }}>
            <div style={{
              background: COLORS.white,
              padding: isMobile ? "20px" : "24px",
              width: isMobile ? "95%" : "600px",
              maxWidth: "90vw",
              borderRadius: "12px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}>
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center", 
                marginBottom: "20px",
                paddingBottom: "12px",
                borderBottom: `1px solid ${COLORS.border}`,
              }}>
                <h2 style={{ 
                  margin: 0, 
                  fontWeight: 600, 
                  fontSize: isMobile ? "18px" : "20px", 
                  color: COLORS.black 
                }}>
                  Edit Vendor Profile
                </h2>
                <button
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: COLORS.text,
                    padding: "4px",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => setShowEditProfileModal(false)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <form onSubmit={handleUpdateProfile}>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: COLORS.text, marginBottom: "8px" }}>Business Name</label>
                  <input
                    type="text"
                    value={profileForm.businessName}
                    onChange={(e) => setProfileForm({...profileForm, businessName: e.target.value})}
                    required
                    style={{
                      width: "100%",
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: "8px",
                      padding: "10px 12px",
                      fontSize: "14px",
                      transition: "border-color 0.2s ease"
                    }}
                  />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: COLORS.text, marginBottom: "8px" }}>Contact Person</label>
                  <input
                    type="text"
                    value={profileForm.contactPerson}
                    onChange={(e) => setProfileForm({...profileForm, contactPerson: e.target.value})}
                    required
                    style={{
                      width: "100%",
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: "8px",
                      padding: "10px 12px",
                      fontSize: "14px",
                      transition: "border-color 0.2s ease"
                    }}
                  />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: COLORS.text, marginBottom: "8px" }}>Email</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                    required
                    style={{
                      width: "100%",
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: "8px",
                      padding: "10px 12px",
                      fontSize: "14px",
                      transition: "border-color 0.2s ease"
                    }}
                  />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: COLORS.text, marginBottom: "8px" }}>Phone</label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                    required
                    style={{
                      width: "100%",
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: "8px",
                      padding: "10px 12px",
                      fontSize: "14px",
                      transition: "border-color 0.2s ease"
                    }}
                  />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: COLORS.text, marginBottom: "8px" }}>Address</label>
                  <input
                    type="text"
                    value={profileForm.address}
                    onChange={(e) => setProfileForm({...profileForm, address: e.target.value})}
                    required
                    style={{
                      width: "100%",
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: "8px",
                      padding: "10px 12px",
                      fontSize: "14px",
                      transition: "border-color 0.2s ease"
                    }}
                  />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: COLORS.text, marginBottom: "8px" }}>Tax ID</label>
                  <input
                    type="text"
                    value={profileForm.taxId}
                    onChange={(e) => setProfileForm({...profileForm, taxId: e.target.value})}
                    required
                    style={{
                      width: "100%",
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: "8px",
                      padding: "10px 12px",
                      fontSize: "14px",
                      transition: "border-color 0.2s ease"
                    }}
                  />
                </div>
                <div style={{ marginBottom: "24px" }}>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: COLORS.text, marginBottom: "8px" }}>Description</label>
                  <textarea
                    value={profileForm.description}
                    onChange={(e) => setProfileForm({...profileForm, description: e.target.value})}
                    rows="4"
                    style={{
                      width: "100%",
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: "8px",
                      padding: "10px 12px",
                      fontSize: "14px",
                      transition: "border-color 0.2s ease",
                      resize: "vertical"
                    }}
                  />
                </div>

                <div style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "12px"
                }}>
                  <button
                    type="button"
                    style={{
                      padding: "10px 16px",
                      borderRadius: "8px",
                      backgroundColor: COLORS.lightGray,
                      border: "none",
                      color: COLORS.text,
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: 600,
                      transition: "all 0.2s ease",
                    }}
                    onClick={() => setShowEditProfileModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: "10px 16px",
                      borderRadius: "8px",
                      backgroundColor: COLORS.primary,
                      border: "none",
                      color: COLORS.white,
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: 600,
                      transition: "all 0.2s ease",
                    }}
                  >
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeVendorPayments;