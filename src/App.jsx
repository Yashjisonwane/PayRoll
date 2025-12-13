import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
// LandingPage
import LandingPage from "../LandingPage";
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
import EmployerList from "./Dashboard/Admin/EmployerList";
import JobPortal from "./Dashboard/Admin/JobPortal";
import BillCompanies from "./Dashboard/Admin/BillCompanies";
import PaymentSetup from "./Dashboard/Admin/PaymentSetup";
import AttendanceManagement from "./Dashboard/Admin/AttendanceManagement";
import AdminTraining from "./Dashboard/Admin/AdminTraining";

// Employer
import EmployerDashboard from "./Dashboard/Employer/EmployerDashboard";
import CreditBalance from "./Dashboard/Employer/MyCredit";
import PayEmployee from "./Dashboard/Employer/PaymentEmployer";
import EmployerTransactions from "./Dashboard/Employer/EmployerTransactions";
import AddEmployee from "./Dashboard/Employer/AddEmployee"; // Fixed this import
import JobVacancies from "./Dashboard/Employer/JobVacancies";
import EmployerAttendance from "./Dashboard/Employer/EmployerAttendance";
import EmployerTraining from "./Dashboard/Employer/EmployerTraining";

// Employee
import EmployeeDashboard from "./Dashboard/Employee/EmployeeDashboard";
import MySalary from "./Dashboard/Employee/MySalary";
import BillPayment from "./Dashboard/Employee/BillPayment";
import MonthlySalary from "./Dashboard/Employee/MonthlySalary";
import JobApplication from "./Dashboard/Employee/JobApplication";
import EmployeeAttendance from "./Dashboard/Employee/EmployeeAttendance";
import CheckInOut from "./Dashboard/Employee/CheckInOut";
import EmployeeTraining from "./Dashboard/Employee/EmployeeTraining";

// job portal 
import JobDashboard from "./Dashboard/JobPortal/JobDashboard";
import UserProfilePage from "./Dashboard/JobPortal/UserProfilePage";
import JobList from "./Dashboard/JobPortal/JobList";
import SubmitResume from "./Dashboard/JobPortal/SubmitResume";

// Vendor
import VendorDashboard from "./Dashboard/Vendor/VendorDashboard";
import VendorPayments from "./Dashboard/Vendor/Payments/VendorPayments";


import SuperAdminDashboard from "./Dashboard/SuperAdmin/SuperAdminDashboard";
import PlansManagement from "./Dashboard/SuperAdmin/PlansManagement";
import CompanyManagement from "./Dashboard/SuperAdmin/CompanyManagement";
import PaymentsSubscriptions from "./Dashboard/SuperAdmin/PaymentsSubscriptions";
import Settings from "./Dashboard/SuperAdmin/Settings";

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
          <Route path="/" element={<LandingPage />} />
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
                
                 <Route path="/SuperAdmin/dashboard" element={<SuperAdminDashboard />} />
                  <Route path="/SuperAdmin/plans-management" element={<PlansManagement />} />
                   <Route path="/SuperAdmin/company-management" element={<CompanyManagement />} />
                    <Route path="/SuperAdmin/payments-subscriptions" element={<PaymentsSubscriptions />} />
                     <Route path="/SuperAdmin/settings" element={<Settings />} />


                {/* ---------------- ADMIN ---------------- */}
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/add-credit" element={<AddCredit />} />
                <Route path="/admin/transactions" element={<AllTransactions />} />
                <Route path="/admin/employer-list" element={<EmployerList />} />
                <Route path="/admin/job-portal" element={<JobPortal />} />
                <Route path="/admin/bill-companies" element={<BillCompanies />} />
                <Route path="/admin/payment-setup" element={<PaymentSetup />} />
                <Route path="/Admin/Attendance-management" element={<AttendanceManagement />} />
                <Route path="/Admin/Admin-Training" element={<AdminTraining />} />


                {/* ---------------- EMPLOYER ---------------- */}
                <Route path="/employer/dashboard" element={<EmployerDashboard />} />
                <Route path="/employer/credits/balance" element={<CreditBalance />} />
                <Route path="/employer/payment" element={<PayEmployee />} />
                <Route path="/employer/transactions" element={<EmployerTransactions />} />
                {/* <Route path="/employer/add-employee" element={<AddEmployee />} /> */}
                <Route path="/employer/job-vacancies" element={<JobVacancies />} />
                <Route path="/employer/employer-attendance" element={<EmployerAttendance />} />
                 <Route path="/employer/Employer-Training" element={<EmployerTraining />} />


                {/* ---------------- EMPLOYEE ---------------- */}
                <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
                <Route path="/employee/salary" element={<MySalary />} />
                <Route path="/employee/bill-payment" element={<BillPayment />} />
                <Route path="/employee/monthly-salary" element={<MonthlySalary />} />
                <Route path="/employee/job-application" element={<JobApplication />} />
                <Route path="/employer/add-employee" element={<AddEmployee />} />
                <Route path="/employer/employee-attendance" element={<EmployeeAttendance />} />
                <Route path="/employer/in-out" element={<CheckInOut />} />
                <Route path="/employer/Employee-Training" element={<EmployeeTraining />} />

                {/* ---------------- JOB PORTAL ---------------- */}
                <Route path="/job-portal/dashboard" element={<JobDashboard />} />
                <Route path="/job-portal/apply/:jobId" element={<UserProfilePage />} />
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