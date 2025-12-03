import React, { useState, useEffect } from "react";

// --- Your Defined Color Palette ---
const colors = {
  primary: "#C62828",      // Buttons, highlights
  primaryDark: "#B71C1C",  // Logo accent, hover states
  white: "#FFFFFF",        // Backgrounds
  black: "#000000",        // Main text
  grayDark: "#4A4A4A",     // Secondary text
  grayBorder: "#E2E2E2",   // Borders
  // grayLight: "#FAFAFA",    // Table head background
};

const VendorDashboard = () => {
  // State to manage screen size for responsiveness
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- Common Styles ---
  const sectionTitleStyle = {
    marginTop: isMobile ? 32 : 40,
    fontSize: isMobile ? 18 : 20,
    fontWeight: 700,
    color: colors.black,
    marginBottom: isMobile ? 12 : 16,
  };

  const cardContainerStyle = {
    background: colors.white,
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    overflow: "hidden", // Ensures content respects the border radius
  };

  const tableHeaderStyle = {
    // background: colors.grayLight,
    color: colors.grayDark,
    fontWeight: 600,
    fontSize: 13,
    padding: "14px 16px",
    textAlign: "left",
    borderBottom: `1px solid ${colors.grayBorder}`,
  };

  const tableCellStyle = {
    color: colors.black,
    fontSize: 14,
    padding: "14px 16px",
    borderBottom: `1px solid ${colors.grayBorder}`,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        // backgroundColor: '#F5F7FA', // A light background for the whole page
        padding: isMobile ? "20px" : "30px 40px",
        fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: isMobile ? 24 : 32 }}>
        <h1
          style={{
            fontSize: isMobile ? 26 : 32,
            margin: 0,
            color: colors.black,
            fontWeight: 700,
          }}
        >
          Vendor Dashboard
        </h1>
        <p style={{ fontSize: 16, color: colors.grayDark, marginTop: 6 }}>
          Monitor your revenue, payments, and invoice status.
        </p>
      </div>

      {/* Overview Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(240px, 1fr))",
          gap: isMobile ? 16 : 24,
        }}
      >
        {[
          { title: "Total Revenue", value: "₹0", icon: "💰" },
          { title: "Pending Payments", value: "₹0", icon: "⏳" },
          { title: "Total Orders", value: "0", icon: "📦" },
          { title: "Avg. Order Value", value: "₹0", icon: "📈" },
        ].map((card, index) => (
          <div
            key={index}
            style={{
              ...cardContainerStyle,
              padding: isMobile ? "20px" : "24px",
              transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
            }}
          >
            <p style={{ color: colors.grayDark, fontSize: 14, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>{card.icon}</span>
                {card.title}
            </p>
            <h3
              style={{
                margin: "8px 0 0",
                fontSize: isMobile ? 24 : 28,
                fontWeight: 700,
                color: colors.primary,
              }}
            >
              {card.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Payments Received Section */}
      <h2 style={sectionTitleStyle}>💳 Payments Received</h2>
      {isMobile ? (
        // Mobile Card View
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            ["2023-11-15", "Client A", "₹5,000", "Completed", "INV-001"],
            ["2023-11-14", "Client B", "₹3,500", "Completed", "INV-002"],
            ["2023-11-13", "Client C", "₹7,200", "Pending", "INV-003"],
          ].map((row, i) => (
            <div key={i} style={cardContainerStyle}>
              <div style={{ padding: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 600, color: colors.black }}>{row[1]}</span>
                    <span style={{ fontSize: 18, fontWeight: 700, color: colors.primary }}>{row[2]}</span>
                </div>
                <div style={{ fontSize: 13, color: colors.grayDark }}>
                  <p style={{ margin: '4px 0' }}><strong>Date:</strong> {row[0]}</p>
                  <p style={{ margin: '4px 0' }}><strong>Invoice:</strong> {row[4]}</p>
                  <p style={{ margin: '4px 0' }}><strong>Status:</strong> <span style={{ color: row[3] === 'Pending' ? colors.primary : colors.black, fontWeight: '600' }}>{row[3]}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Desktop Table View
        <div style={cardContainerStyle}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Date", "Paid By", "Amount", "Status", "Invoice #"].map((h, i) => (
                  <th key={i} style={tableHeaderStyle}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["2023-11-15", "Client A", "₹5,000", "Completed", "INV-001"],
                ["2023-11-14", "Client B", "₹3,500", "Completed", "INV-002"],
                ["2023-11-13", "Client C", "₹7,200", "Pending", "INV-003"],
              ].map((row, i) => (
                <tr key={i} style={{transition: 'background-color 0.2s ease'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.grayLight} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.white}>
                  <td style={tableCellStyle}>{row[0]}</td>
                  <td style={{...tableCellStyle, fontWeight: 600}}>{row[1]}</td>
                  <td style={{...tableCellStyle, fontWeight: 700, color: colors.primary}}>{row[2]}</td>
                  <td style={tableCellStyle}>
                    <span style={{ color: row[3] === 'Pending' ? colors.primary : colors.black, fontWeight: 600 }}>
                      {row[3]}
                    </span>
                  </td>
                  <td style={tableCellStyle}>{row[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pending Invoices Section */}
      <h2 style={sectionTitleStyle}>📋 Pending Invoices</h2>
      {isMobile ? (
        // Mobile Card View
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            ["INV-003", "Client C", "₹7,200", "2023-11-20"],
            ["INV-004", "Client D", "₹4,500", "2023-11-22"],
          ].map((row, i) => (
            <div key={i} style={cardContainerStyle}>
              <div style={{ padding: "16px" }}>
                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 600, color: colors.black }}>{row[1]}</span>
                    <span style={{ fontSize: 18, fontWeight: 700, color: colors.primary }}>{row[2]}</span>
                </div>
                <div style={{ fontSize: 13, color: colors.grayDark }}>
                  <p style={{ margin: '4px 0' }}><strong>Invoice #:</strong> {row[0]}</p>
                  <p style={{ margin: '4px 0' }}><strong>Due Date:</strong> {row[3]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Desktop Table View
        <div style={cardContainerStyle}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Invoice #", "Client", "Amount", "Due Date"].map((h, i) => (
                  <th key={i} style={tableHeaderStyle}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["INV-003", "Client C", "₹7,200", "2023-11-20"],
                ["INV-004", "Client D", "₹4,500", "2023-11-22"],
              ].map((row, i) => (
                <tr key={i} style={{transition: 'background-color 0.2s ease'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.grayLight} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.white}>
                  <td style={{...tableCellStyle, fontWeight: 600}}>{row[0]}</td>
                  <td style={tableCellStyle}>{row[1]}</td>
                  <td style={{...tableCellStyle, fontWeight: 700, color: colors.primary}}>{row[2]}</td>
                  <td style={tableCellStyle}>{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VendorDashboard;