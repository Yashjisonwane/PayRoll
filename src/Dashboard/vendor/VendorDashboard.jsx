import React from "react";

const VendorDashboard = () => {
  const primary = "#C62828";

  return (
    <div
      style={{
        minHeight: "100vh",

        padding: "26px 34px",
      }}
    >
      {/* Heading */}
      <h2
        style={{
          fontSize: 22,
          margin: 0,
          color: "#000",
          fontWeight: 600,
        }}
      >
        Vendor Dashboard
      </h2>
      <p style={{ fontSize: 13, color: "#4A4A4A", marginTop: 4 }}>
        Monitor vendor revenue, payments and invoice status
      </p>

      {/* Overview Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: 18,
          marginTop: 26,
        }}
      >
        {[
          { title: "Total Revenue", value: "₹0" },
          { title: "Pending Payments", value: "₹0" },
          { title: "Total Orders", value: "0" },
          { title: "Average Order Value", value: "₹0" },
        ].map((c, i) => (
          <div
            key={i}
            style={{
              background: "#FFFFFF",
              borderRadius: 14,
              padding: "18px 22px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.07)",
            }}
          >
            <p style={{ color: "#4A4A4A", fontSize: 13, margin: 0 }}>
              {c.title}
            </p>
            <h3
              style={{
                margin: "6px 0 0",
                fontSize: 22,
                fontWeight: 700,
                color: primary,
              }}
            >
              {c.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Payments Received */}
      <h3
        style={{
          marginTop: 34,
          fontSize: 17,
          fontWeight: 600,
          color: "#000",
        }}
      >
        💳 Payments Received
      </h3>
      <div
        style={{
          overflowX: "auto",
          marginTop: 12,
          background: "#FFFFFF",
          borderRadius: 12,
          boxShadow: "0 6px 16px rgba(0,0,0,0.07)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#FAFAFA" }}>
            <tr>
              {["Date", "Paid By", "Amount", "Status", "Invoice #"].map(
                (h, i) => (
                  <th
                    key={i}
                    style={{
                      textAlign: "left",
                      padding: "12px 14px",
                      fontSize: 12,
                      color: "#4A4A4A",
                      fontWeight: 600,
                      borderBottom: "1px solid #E2E2E2",
                    }}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {[
              ["2023-11-15", "Client A", "₹5,000", "Completed", "INV-001"],
              ["2023-11-14", "Client B", "₹3,500", "Completed", "INV-002"],
              ["2023-11-13", "Client C", "₹7,200", "Pending", "INV-003"],
            ].map((row, i) => (
              <tr key={i}>
                {row.map((col, j) => (
                  <td
                    key={j}
                    style={{
                      padding: "12px 14px",
                      fontSize: 13,
                      color: j === 3 && col === "Pending" ? primary : "#000",
                      fontWeight: j === 2 ? 600 : 400,
                      borderBottom: "1px solid #E2E2E2",
                    }}
                  >
                    {col}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      {/* Pending Invoices */}
      <h3
        style={{
          marginTop: 36,
          fontSize: 17,
          fontWeight: 600,
          color: "#000",
        }}
      >
        📋 Pending Invoices
      </h3>
      <div
        style={{
          overflowX: "auto",
          marginTop: 12,
          background: "#FFFFFF",
          borderRadius: 12,
          boxShadow: "0 6px 16px rgba(0,0,0,0.07)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#FAFAFA" }}>
            <tr>
              {["Invoice #", "Client", "Amount", "Due Date"].map((h, i) => (
                <th
                  key={i}
                  style={{
                    textAlign: "left",
                    padding: "12px 14px",
                    fontSize: 12,
                    color: "#4A4A4A",
                    fontWeight: 600,
                    borderBottom: "1px solid #E2E2E2",
                  }}
                >
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
              <tr key={i}>
                {row.map((col, j) => (
                  <td
                    key={j}
                    style={{
                      padding: "12px 14px",
                      fontSize: 13,
                      color: j === 2 ? primary : "#000",
                      fontWeight: j === 2 ? 700 : 400,
                      borderBottom: "1px solid #E2E2E2",
                    }}
                  >
                    {col}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorDashboard;