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
  faUserGroup ,
  faClapperboard
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
        path: "/admin/dashboard",
      },
      {
        name: "Assign Credit",
        icon: faWallet,
        path: "/admin/add",
      },

      {
        name: "Employers",
        icon: faUsers,
        path: "/admin/assign-credit",
      },
       {
        name: "Job Portal",
        icon: faUserGroup,
        path: "/admin/job-portal",

      },
      {
        name: "Bill Companies",
        icon: faClapperboard,
        path: "/admin/bill-companies",

      },
      {
        name: "Transactions",
        icon: faList,
        path: "/admin/transactions",
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
    name: "Job Vacancy",
    icon: faWallet,
    path: "/employer/job-vacancies",
  },
  {
    name: "Payment",
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
        path: "/employee/dashboard",
      },
      {
        name: "My Salary",
        icon: faMoneyBillWave,
        path: "/employee/salary",
      },
      {
        name: "Bill Payment",
        icon: faCreditCard,
        path: "/employee/bill-payment",
      },
      {
        name: "Monthly Salary",
        icon: faCreditCard,
        path: "/employee/monthly-salary",
      },
      {
        name: "Job Application",
        icon: faUsers,
        path: "/employee/job-application",
      }
    ],

    VENDOR: [
      {
        name: "Dashboard",
        icon: faChartBar,
        path: "/vendor/dashboard",
      },
      {
        name: "My Payments",
        icon: faMoneyBillWave,
        path: "/vendor/payments",
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
