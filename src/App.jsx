import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";

// Layout
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";

// Auth Pages
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import ForgotPassword from "./Auth/ForgotPassword";

// Admin
import AdminDashboard from "./Dashboard/Admin/AdminDashboard";
import AddCredit from "./Dashboard/Admin/AddCredit";
import AllTransactions from "./Dashboard/Admin/AllTransactions";
// import AssignCredit from "./Dashboard/Admin/AssignCredit";
import AssignCredit from "./Dashboard/Admin/AssignCredit";
import JobPortal from "./Dashboard/Admin/JobPortal";
import BillCompanies from "./Dashboard/Admin/BillCompanies";

// Employer
import EmployerDashboard from "./Dashboard/Employer/EmployerDashboard";
import CreditBalance from "./Dashboard/Employer/MyCredit";
import PayEmployee from "./Dashboard/Employer/PaymentEmployer";
import EmployerTransactions from "./Dashboard/Employer/EmployerTransactions";
import AddEmployee from "./Dashboard/Employer/JobVacancies";
import JobVacancies from "./Dashboard/Employer/JobVacancies"; // Added this import

// Employee
import EmployeeDashboard from "./Dashboard/Employee/EmployeeDashboard";
import MySalary from "./Dashboard/Employee/MySalary";
import BillPayment from "./Dashboard/Employee/BillPayment";
import MonthlySalary from "./Dashboard/Employee/MonthlySalary";
import JobApplication from "./Dashboard/Employee/JobApplication";

// job portal 
import JobDashboard from "./Dashboard/JobPortal/JobDashboard";
import Apply from "./Dashboard/JobPortal/Apply";
import JobList from "./Dashboard/JobPortal/JobList";
import SubmitResume from "./Dashboard/JobPortal/SubmitResume";

// Vendor
import VendorDashboard from "./Dashboard/Vendor/VendorDashboard";
import VendorPayments from "./Dashboard/Vendor/Payments/VendorPayments";

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();

  // Auto-hide sidebar on mobile
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsSidebarCollapsed(true);
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  // Pages where sidebar + navbar should NOT show
  const hideLayout =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/forgot-password";

  return (
    <>
      {hideLayout ? (
        // -------- AUTH ROUTES --------
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      ) : (
        // -------- MAIN LAYOUT --------
        <>
          <Navbar toggleSidebar={toggleSidebar} />

          <div className="main-content">
            {/* Sidebar */}
            <Sidebar
              collapsed={isSidebarCollapsed}
              setCollapsed={setIsSidebarCollapsed}
            />

            {/* Right Content */}
            <div className={`right-side-content ${isSidebarCollapsed ? "collapsed" : ""}`}>
              <Routes>
                {/* ---------------- ADMIN ---------------- */}
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/add" element={<AddCredit />} />
                <Route path="/admin/transactions" element={<AllTransactions />} />
                <Route path="/admin/assign-credit" element={<AssignCredit />} />
                <Route path="/admin/job-portal" element={<JobPortal />} />
                <Route path="/admin/bill-companies" element={<BillCompanies />} />

                {/* ---------------- EMPLOYER ---------------- */}
                <Route path="/employer/dashboard" element={<EmployerDashboard />} />
                <Route path="/employer/credits/balance" element={<CreditBalance />} />
                <Route path="/employer/payment" element={<PayEmployee />} />
                <Route path="/employer/transactions" element={<EmployerTransactions />} />
                <Route path="/employer/AddEmployee" element={<AddEmployee />} />
                <Route path="/employer/job-vacancies" element={<JobVacancies />} />

                {/* ---------------- EMPLOYEE ---------------- */}
                <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
                <Route path="/employee/salary" element={<MySalary />} />
                <Route path="/employee/bill-payment" element={<BillPayment />} />
                <Route path="/employee/monthly-salary" element={<MonthlySalary />} />
                <Route path="/employee/job-application" element={<JobApplication />} />

                {/* ---------------- JOB PORTAL ---------------- */}
                <Route path="/job-portal/dashboard" element={<JobDashboard />} />
                <Route path="/job-portal/apply/:jobId" element={<Apply />} />
                <Route path="/job-portal/job-list" element={<JobList />} />
                <Route path="/job-portal/submit-resume" element={<SubmitResume />} />

                {/* ---------------- VENDOR ---------------- */}
                <Route path="/vendor/dashboard" element={<VendorDashboard />} />
                <Route path="/vendor/payments" element={<VendorPayments />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;