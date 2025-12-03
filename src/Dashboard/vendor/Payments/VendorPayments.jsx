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

  // Export PDF function
  const handleExportPDF = () => {
    // Create a simple HTML representation of payment data
    let htmlContent = `
      <html>
        <head>
          <title>Payment Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
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

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "15px" : "20px" }}>
        {/* Header Section */}
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
              My Payments
            </h1>
            <p style={{ 
              fontSize: isMobile ? "14px" : "16px", 
              color: COLORS.text, 
              marginTop: "8px" 
            }}>
              View and manage all your received payments
            </p>
          </div>
          <div style={{ 
            display: "flex", 
            gap: isMobile ? "8px" : "12px",
            width: isMobile ? "100%" : "auto"
          }}>
            <button
              style={{
                ...actionBtn,
                flex: isMobile ? 1 : "auto",
                padding: isMobile ? "8px 12px" : "10px 16px",
                fontSize: isMobile ? "13px" : "14px"
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
                ...actionBtn,
                flex: isMobile ? 1 : "auto",
                padding: isMobile ? "8px 12px" : "10px 16px",
                fontSize: isMobile ? "13px" : "14px"
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
        </div>

        {/* Stats Cards */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: isMobile ? "1fr" : (isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)"), 
          gap: isMobile ? "12px" : "16px", 
          marginBottom: isMobile ? "20px" : "24px" 
        }}>
          <div style={statsCard}>
            <div style={{ ...statsIcon, backgroundColor: COLORS.chartLine + "20", color: COLORS.chartLine }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <div>
              <div style={statsLabel}>Total Received</div>
              <div style={statsValue}>${totalAmount.toLocaleString()}</div>
            </div>
          </div>
          <div style={statsCard}>
            <div style={{ ...statsIcon, backgroundColor: COLORS.oliveLabel + "20", color: COLORS.oliveLabel }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div>
              <div style={statsLabel}>Completed</div>
              <div style={statsValue}>{payments.filter(p => p.status === "Completed").length}</div>
            </div>
          </div>
          <div style={statsCard}>
            <div style={{ ...statsIcon, backgroundColor: COLORS.warning + "20", color: COLORS.warning }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div>
              <div style={statsLabel}>Pending</div>
              <div style={statsValue}>{payments.filter(p => p.status === "Pending").length}</div>
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
                ...actionBtn,
                width: "100%",
                marginBottom: "15px",
                backgroundColor: COLORS.lightGray,
                color: COLORS.text,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
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
              <label style={filterLabel}>Search</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={filterInput}
                placeholder="Search by name or reference"
              />
            </div>
            <div>
              <label style={filterLabel}>Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={filterInput}
              >
                <option value="all">All Status</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
            <div>
              <label style={filterLabel}>From Date</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                style={filterInput}
              />
            </div>
            <div>
              <label style={filterLabel}>To Date</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                style={filterInput}
              />
            </div>
            <div>
              <button
                style={clearFilterBtn}
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
                      style={{ ...viewBtn, backgroundColor: COLORS.primary }}
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
                    <th style={{ ...th, textAlign: "left" }}>Date</th>
                    <th style={{ ...th, textAlign: "left" }}>Paid By</th>
                    <th style={{ ...th, textAlign: "left" }}>Reference</th>
                    <th style={{ ...th, textAlign: "left" }}>Status</th>
                    <th style={{ ...th, textAlign: "right" }}>Amount</th>
                    <th style={{ ...th, textAlign: "center" }}>Actions</th>
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
                      <td style={{ ...td, fontWeight: 500 }}>{formatDate(payment.date)}</td>
                      <td style={{ ...td, fontWeight: 600 }}>{payment.paidBy}</td>
                      <td style={{ ...td, color: COLORS.text }}>{payment.reference}</td>
                      <td style={{ ...td }}>
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
                      <td style={{ ...td, textAlign: "right", fontWeight: 600, color: COLORS.oliveLabel }}>
                        ${payment.amount.toLocaleString()}
                      </td>
                      <td style={{ ...td, textAlign: "center" }}>
                        <button
                          style={{ ...viewBtn, backgroundColor: COLORS.primary }}
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

        {/* Payment Details Modal */}
        {selectedPayment && (
          <div style={overlay}>
            <div style={{
              ...modal,
              width: isMobile ? "95%" : "500px",
              maxHeight: isMobile ? "90vh" : "auto",
              overflow: isMobile ? "auto" : "visible"
            }}>
              <div style={modalHeader}>
                <h2 style={{ 
                  margin: 0, 
                  fontWeight: 600, 
                  fontSize: isMobile ? "18px" : "20px", 
                  color: COLORS.black 
                }}>
                  Payment Details
                </h2>
                <button
                  style={closeBtn}
                  onClick={() => setSelectedPayment(null)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div style={detailSection}>
                <div style={detailRow}>
                  <span style={detailLabel}>Reference</span>
                  <span style={detailValue}>{selectedPayment.reference}</span>
                </div>
                <div style={detailRow}>
                  <span style={detailLabel}>Date</span>
                  <span style={detailValue}>{formatDate(selectedPayment.date)}</span>
                </div>
                <div style={detailRow}>
                  <span style={detailLabel}>Paid By</span>
                  <span style={detailValue}>{selectedPayment.paidBy}</span>
                </div>
                <div style={detailRow}>
                  <span style={detailLabel}>Amount</span>
                  <span style={{ 
                    ...detailValue, 
                    fontSize: isMobile ? "16px" : "18px", 
                    fontWeight: 700, 
                    color: COLORS.oliveLabel 
                  }}>
                    ${selectedPayment.amount.toLocaleString()}
                  </span>
                </div>
                <div style={detailRow}>
                  <span style={detailLabel}>Status</span>
                  <span style={{
                    ...detailValue,
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
                <div style={{ ...detailRow, marginBottom: 0, borderBottom: "none" }}>
                  <span style={detailLabel}>Description</span>
                  <span style={detailValue}>{selectedPayment.description}</span>
                </div>
              </div>

              <div style={{
                ...footer,
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? "10px" : "12px"
              }}>
                <button
                  style={{
                    ...runBtn,
                    width: isMobile ? "100%" : "auto"
                  }}
                  onClick={() => alert("Run payment functionality")}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px" }}>
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  Run
                </button>
                <button
                  style={{
                    ...saveBtn,
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
      </div>
    </div>
  );
};

/* shared UI styles */
const th = {
  padding: "16px",
  fontWeight: 600,
  color: COLORS.text,
  fontSize: "14px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};
const td = {
  padding: "16px",
  borderBottom: `1px solid ${COLORS.border}`,
  fontSize: "14px",
  color: COLORS.text,
};
const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 99,
  padding: "20px"
};
const modal = {
  background: COLORS.white,
  padding: "24px",
  width: "500px",
  maxWidth: "90vw",
  borderRadius: "12px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
};
const modalHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
  paddingBottom: "12px",
  borderBottom: `1px solid ${COLORS.border}`,
};
const closeBtn = {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  color: COLORS.text,
  padding: "4px",
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const detailSection = {
  backgroundColor: COLORS.lightGray,
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "16px",
};
const detailRow = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "12px",
  paddingBottom: "8px",
  borderBottom: `1px solid ${COLORS.border}`,
};
const detailLabel = {
  fontWeight: 600,
  color: COLORS.text,
  fontSize: "14px",
};
const detailValue = {
  color: COLORS.black,
  fontSize: "14px",
};
const footer = {
  marginTop: "24px",
  display: "flex",
  justifyContent: "flex-end",
  gap: "12px",
};
const saveBtn = {
  padding: "10px 16px",
  borderRadius: "8px",
  backgroundColor: COLORS.primary,
  border: "none",
  color: COLORS.white,
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: 600,
  transition: "all 0.2s ease",
};
const runBtn = {
  padding: "10px 16px",
  borderRadius: "8px",
  backgroundColor: COLORS.primary,
  border: "none",
  color: COLORS.white,
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: 600,
  transition: "all 0.2s ease",
  display: "flex",
  alignItems: "center",
};
const viewBtn = {
  padding: "6px 12px",
  borderRadius: "6px",
  border: "none",
  color: COLORS.white,
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: 600,
  transition: "all 0.2s ease",
  display: "flex",
  alignItems: "center",
  gap: "4px",
};
const statsCard = {
  backgroundColor: COLORS.white,
  borderRadius: "12px",
  padding: "20px",
  display: "flex",
  alignItems: "center",
  gap: "16px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};
const statsIcon = {
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const statsLabel = {
  fontSize: "14px",
  color: COLORS.text,
  marginBottom: "4px",
};
const statsValue = {
  fontSize: "24px",
  fontWeight: 700,
  color: COLORS.black,
};
const filterLabel = {
  fontSize: "14px",
  fontWeight: 600,
  marginBottom: "8px",
  display: "block",
  color: COLORS.text,
};
const filterInput = {
  width: "100%",
  border: `1px solid ${COLORS.border}`,
  borderRadius: "8px",
  padding: "10px 12px",
  fontSize: "14px",
  transition: "border-color 0.2s ease",
};
const clearFilterBtn = {
  padding: "10px 16px",
  borderRadius: "8px",
  backgroundColor: COLORS.lightGray,
  border: "none",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: 600,
  color: COLORS.text,
  transition: "all 0.2s ease",
};
const actionBtn = {
  padding: "10px 16px",
  borderRadius: "8px",
  backgroundColor: COLORS.primary,
  border: "none",
  color: COLORS.white,
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: 600,
  transition: "all 0.2s ease",
  display: "flex",
  alignItems: "center",
};

export default EmployeeVendorPayments;