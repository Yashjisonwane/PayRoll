import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faUsers,
  faCreditCard,
  faList,
  faWallet,
  faHandHoldingUsd,
  faMoneyBillWave,
  faUserGroup,
  faClipboard,
  faBriefcase,
  faFileInvoiceDollar
} from "@fortawesome/free-solid-svg-icons";

import "./Sidebar.css";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role) setUserRole(role.toUpperCase());
  }, []);

  useEffect(() => {
    const handleStorage = () => {
      const role = localStorage.getItem("userRole");
      if (role) setUserRole(role.toUpperCase());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const toggleMenu = (key) => {
    setActiveMenu(activeMenu === key ? null : key);
  };

  const isActive = (path) => location.pathname === path;

  const handleNavigate = (path) => {
    navigate(path);
    if (window.innerWidth <= 768) setCollapsed(true);
  };

  // ---------------- MENUS -----------------
  const allMenus = {
    ADMIN: [
      {
        name: "Dashboard",
        icon: faChartBar,
        path: "/Admin/dashboard",
      },
    
      {
        name: "Employers",
        icon: faUsers,
        path: "/Admin/employer-list",
      },
        {
        name: " Credit",
        icon: faWallet,
        path: "/Admin/add-credit",
      },
      {
        name: "Job Portal",
        icon: faUserGroup,
        path: "/Admin/job-portal",
      },
      {
        name: "Bill Companies",
        icon: faClipboard,
        path: "/Admin/bill-companies",
      },
      // {
      //   name: "Payment Setup",
      //   icon: faUsers,
      //   path: "/Admin/payment-setup",
      // },
      {
        name: "Payment Setup",
        icon: faUsers,
        path: "/Admin/payment-setup",
      },
      {
        name: "Transactions",
        icon: faList,
        path: "/Admin/transactions",
      },
    ],

    EMPLOYER: [
      {
        name: "Dashboard",
        icon: faChartBar,
        path: "/employer/dashboard",
      },
           {
        name: "My Credits",
        icon: faWallet,
        path: "/employer/credits/balance",
      },
        {
    name: "Employees / Vendors",
    icon: faUsers,
    path: "/employer/add-employee",
  },

      {
        name: "Job Vacancies",
        icon: faWallet,
        path: "/employer/job-vacancies",
      },
 
      {
        name: "Payments",
        icon: faHandHoldingUsd,
        path: "/employer/payment",
      },
      {
        name: "Transactions",
        icon: faList,
        path: "/employer/transactions",
      },
    ],

    EMPLOYEE: [
      {
        name: "Dashboard",
        icon: faChartBar,
        path: "/Employee/dashboard",
      },
      {
        name: "My Salary",
        icon: faMoneyBillWave,
        path: "/Employee/salary",
      },
      {
        name: "Bill Payment",
        icon: faCreditCard,
        path: "/Employee/bill-payment",
      },
      {
        name: "Bank Details",
        icon: faFileInvoiceDollar,
        path: "/Employee/monthly-salary",
      },
      {
        name: "Job Application",
        icon: faBriefcase,
        path: "/Employee/job-application",
      }
    ],
    
    JOBSEEKER: [
      {
        name: "Dashboard",
        icon: faChartBar,
        path: "/job-portal/dashboard",
      },
      {
        name: "Job List",
        icon: faBriefcase,
        path: "/job-portal/job-list",
      },
      {
        name: "Submit Resume",
        icon: faFileInvoiceDollar,
        path: "/job-portal/submit-resume",
      },
      {
        name: "Apply For Jobs",
        icon: faUsers,
        path: "/job-portal/apply/:jobId",
      }
    ],

    VENDOR: [
      {
        name: "Dashboard",
        icon: faChartBar,
        path: "/Vendor/dashboard",
      },
      {
        name: "My Payments",
        icon: faMoneyBillWave,
        path: "/Vendor/payments",
      },
      ],
  };

  const userMenus = userRole ? allMenus[userRole] : allMenus.ADMIN;

  if (!userRole) {
    return (
      <div className="sidebar-container">
        <div className="sidebar p-3 text-center">
          <div className="spinner-border text-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`sidebar-container ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar">
        <ul className="menu">
          {userMenus.map((menu, index) => (
            <li key={index} className="menu-item">
              <div
                className={`menu-link ${isActive(menu.path) ? "active" : ""}`}
                onClick={() => handleNavigate(menu.path)}
              >
                <FontAwesomeIcon icon={menu.icon} className="menu-icon" />
                {!collapsed && <span className="menu-text">{menu.name}</span>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;