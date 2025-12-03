import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faUsers,
  faCalendarAlt,
  faClipboardCheck,
  faDollarSign,
  faComments,
  faChalkboardTeacher,
  faGear,
  faChevronDown,
  faUserTag,
  faFileAlt,
  faUserGear,
  faCalculator,
  faChartLine,
  faAddressBook,
  faCalendarDays,
  faClapperboard,
  faStarOfDavid,
  faMoneyBillAlt,
  faNetworkWired,
  faChartArea,
  faCaretRight,
  faEye,
  faBookAtlas,
  faUserGroup,
  faCogs,
  faCreditCard,
  faHandHoldingUsd,
  faHistory,
  faPlusCircle,
  faList,
  faUserCheck,
  faMoneyBillWave,
  faWallet
} from "@fortawesome/free-solid-svg-icons";

import "./Sidebar.css";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Get role from localStorage and ensure it's uppercase to match our keys
    const role = localStorage.getItem("userRole");
    if (role) {
      setUserRole(role.toUpperCase());
    }
  }, []);

  // Listen for storage changes to update role when it changes
  useEffect(() => {
    const handleStorageChange = () => {
      const role = localStorage.getItem("userRole");
      if (role) {
        setUserRole(role.toUpperCase());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleMenu = (menuKey) => {
    setActiveMenu(activeMenu === menuKey ? null : menuKey);
  };

  const isActive = (path) => location.pathname === path;

  const handleNavigate = (path) => {
    navigate(path);
    if (window.innerWidth <= 768) setCollapsed(true);
  };

  // ------------------ MENUS ------------------
  const allMenus = {
    ADMIN: [
      {
        name: "Dashboard",
        icon: faChartBar,
        path: "/admin/dashboard"
      },
      {
        name: "Credits",
        icon: faCreditCard,
        path: "/admin/add",

      },
      {
        name: "Employers",
        icon: faUsers,
         path: "/admin/assign-credit"
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
        path: "/admin/transactions"
      }
    ],

    EMPLOYER: [
      {
        name: "Dashboard",
        icon: faChartBar,
        path: "/employer/dashboard"
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
        path: "/employer/transactions"
      }
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
        path: "/vendor/dashboard"
      },
      {
        name: "My Payments",
        icon: faMoneyBillWave,
        path: "/vendor/payments"
      }
    ]
  };

  // Default to ADMIN if no role is found
  const userMenus = userRole ? allMenus[userRole] : allMenus.ADMIN;

  // Add a loading state or fallback if userRole is still null
  if (!userRole) {
    return <div className="sidebar-container">
      <div className="sidebar">
        <div className="p-3 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>;
  }

  return (
    <div className={`sidebar-container ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar">
        <ul className="menu">
          {userMenus.map((menu, index) => {
            if (!menu.subItems) {
              return (
                <li key={index} className="menu-item">
                  <div
                    className={`menu-link ${isActive(menu.path) ? "active" : ""}`}
                    onClick={() => handleNavigate(menu.path)}
                  >
                    <FontAwesomeIcon icon={menu.icon} className="menu-icon" />
                    {!collapsed && <span className="menu-text">{menu.name}</span>}
                  </div>
                </li>
              );
            }

            return (
              <li key={index} className="menu-item">
                <div
                  className="menu-link mb-2"
                  onClick={() => toggleMenu(menu.key)}
                >
                  <FontAwesomeIcon icon={menu.icon} className="menu-icon" />
                  {!collapsed && <span className="menu-text">{menu.name}</span>}
                  {!collapsed && (
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`arrow-icon ${activeMenu === menu.key ? "rotate" : ""}`}
                    />
                  )}
                </div>

                {!collapsed && activeMenu === menu.key && (
                  <ul className="submenu">
                    {menu.subItems.map((sub, i) => (
                      <li
                        key={i}
                        className={`submenu-item mb-2 ${isActive(sub.path) ? "active-sub" : ""}`}
                        onClick={() => handleNavigate(sub.path)}
                      >
                        {sub.label}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;