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
  faMoneyBillWave
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
        name: "Employers",
        icon: faUsers,
        path: "/admin/assign-credit",
      },
       {
        name: "Credits",
        icon: faCreditCard,
        path: "/admin/add",

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
        name: "Add Employee/Vendor",
        icon: faWallet,
        path: "/employer/AddEmployee",
      },
      {
        name: "My Credits",
        icon: faWallet,
        path: "/employer/credits/balance",
      },
      {
        name: "Pay Employee /Vendor",
        icon: faHandHoldingUsd,
        path: "/employer/payment/employee",
      },
      {
        name: "Transactions",
        icon: faList,
        path: "/employer/transactions",
      },
    ],

    // EMPLOYEE: [
    //   {
    //     name: "Dashboard",
    //     icon: faChartBar,
    //     path: "/employee/dashboard"
    //   },
    //   {
    //     name: "My Payments",
    //     icon: faMoneyBillWave,
    //     path: "/employee/payments"
    //   }
    // ],

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
