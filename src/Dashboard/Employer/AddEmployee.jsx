import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPlus, FaEdit, FaTrash, FaUserTie, FaUsers, FaChartLine, FaBuilding } from 'react-icons/fa';

const EmployerDashboard = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState("employees");
  
  // State for detecting mobile view
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // Update isMobile state on window resize
  useState(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // State for list of employees (changed from employers)
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "9876543210",
      joiningDate: "2023-01-15",
      jobTitle: "Software Engineer",
      salaryAmount: "75000"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "9876543211",
      joiningDate: "2023-02-20",
      jobTitle: "UI/UX Designer",
      salaryAmount: "65000"
    }
  ]);
  
  // State for list of vendors
  const [vendors, setVendors] = useState([
    {
      id: 1,
      name: "ABC Supplies",
      email: "abc@supplies.com",
      phone: "9876543220",
      joiningDate: "2023-01-10",
      jobTitle: "Material Supplier",
      salaryAmount: "55000"
    },
    {
      id: 2,
      name: "XYZ Services",
      email: "xyz@services.com",
      phone: "9876543221",
      joiningDate: "2023-02-15",
      jobTitle: "Equipment Provider",
      salaryAmount: "45000"
    }
  ]);
  
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    joiningDate: "",
    jobTitle: "",
    salaryAmount: ""
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      ...formData,
      id: activeTab === "employees" 
        ? (employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) + 1 : 1)
        : (vendors.length > 0 ? Math.max(...vendors.map(v => v.id)) + 1 : 1)
    };
    
    if (activeTab === "employees") {
      setEmployees([...employees, newItem]);
    } else {
      setVendors([...vendors, newItem]);
    }
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      joiningDate: "",
      jobTitle: "",
      salaryAmount: ""
    });
    setShowModal(false);
  };
  
  const handleEdit = (id) => {
    const item = activeTab === "employees" 
      ? employees.find(emp => emp.id === id)
      : vendors.find(v => v.id === id);
      
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        email: item.email,
        phone: item.phone,
        joiningDate: item.joiningDate,
        jobTitle: item.jobTitle,
        salaryAmount: item.salaryAmount
      });
      setShowEditModal(true);
    }
  };
  
  const handleUpdate = (e) => {
    e.preventDefault();
    
    if (activeTab === "employees") {
      const updatedEmployees = employees.map(emp => 
        emp.id === editingItem.id ? { ...emp, ...formData } : emp
      );
      setEmployees(updatedEmployees);
    } else {
      const updatedVendors = vendors.map(v => 
        v.id === editingItem.id ? { ...v, ...formData } : v
      );
      setVendors(updatedVendors);
    }
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      joiningDate: "",
      jobTitle: "",
      salaryAmount: ""
    });
    setShowEditModal(false);
    setEditingItem(null);
  };
  
  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete this ${activeTab === "employees" ? "employee" : "vendor"}?`)) {
      if (activeTab === "employees") {
        setEmployees(employees.filter(employee => employee.id !== id));
      } else {
        setVendors(vendors.filter(vendor => vendor.id !== id));
      }
    }
  };
  
  // Get current data based on active tab
  const getCurrentData = () => {
    return activeTab === "employees" ? employees : vendors;
  };
  
  // Calculate unique departments based on job titles
  const uniqueDepartments = [...new Set(getCurrentData().map(item => item.jobTitle))].length;
  
  const customStyles = {
    primaryRed: '#C62828',
    darkRed: '#B71C1C',
    pureWhite: '#FFFFFF',
    blackText: '#000000',
    darkGrayText: '#4A4A4A',
    lightGrayBorder: '#E2E2E2',
    lightBg: '#F9F9F9'
  };
  
  return (
    <div className="min-vh-100" style={{ }}>
      {/* Header */}
      <div className="bg-white shadow-sm mb-4" style={{ borderBottom: `1px solid ${customStyles.lightGrayBorder}` }}>
        <div className="container-fluid p-3 p-md-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <div className="d-flex align-items-center mb-3 mb-md-0">
              <div className="me-2 me-md-3" style={{ width: '35px', height: '35px', backgroundColor: customStyles.primaryRed, borderRadius: '6px' }}></div>
              <h1 className="h3 h2-md mb-0" style={{ color: customStyles.darkRed }}>
                {activeTab === "employees" ? "Employee" : "Vendor"} Management
              </h1>
            </div>
            <button 
              className="btn d-flex align-items-center text-white px-3 py-2" 
              onClick={() => setShowModal(true)}
              style={{ backgroundColor: customStyles.primaryRed, fontSize: '0.875rem' }}
            >
              <FaPlus className="me-2" /> Add {activeTab === "employees" ? "Employee" : "Vendor"}
            </button>
          </div>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="container-fluid p-3 p-md-4">
        <div className="card shadow-sm mb-4" style={{ borderRadius: "10px", border: `1px solid ${customStyles.lightGrayBorder}` }}>
          <div className="card-body p-0">
            <ul className="nav nav-tabs" style={{ borderBottom: `1px solid ${customStyles.lightGrayBorder}` }}>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === "employees" ? "active" : ""}`} 
                  onClick={() => setActiveTab("employees")}
                  style={{ 
                    color: activeTab === "employees" ? customStyles.pureWhite : customStyles.primaryRed,
                    backgroundColor: activeTab === "employees" ? customStyles.primaryRed : "transparent",
                    border: "none",
                    borderBottom: activeTab === "employees" ? `3px solid ${customStyles.darkRed}` : "none",
                    fontWeight: "bold",
                    borderRadius: "0"
                  }}
                >
                  Employees
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === "vendors" ? "active" : ""}`} 
                  onClick={() => setActiveTab("vendors")}
                  style={{ 
                    color: activeTab === "vendors" ? customStyles.pureWhite : customStyles.primaryRed,
                    backgroundColor: activeTab === "vendors" ? customStyles.primaryRed : "transparent",
                    border: "none",
                    borderBottom: activeTab === "vendors" ? `3px solid ${customStyles.darkRed}` : "none",
                    fontWeight: "bold",
                    borderRadius: "0"
                  }}
                >
                  Vendors
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container-fluid p-3 p-md-4">
        {/* Employee/Vendor Cards */}
        <div className="row g-3 g-md-4 mb-4">
          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="card-subtitle mb-2 small" style={{ color: customStyles.darkGrayText }}>
                      Total {activeTab === "employees" ? "Employees" : "Vendors"}
                    </h6>
                    <h3 className="card-title mb-0" style={{ color: customStyles.blackText }}>
                      {getCurrentData().length}
                    </h3>
                  </div>
                  <FaUsers className="text-muted" size={24} style={{ opacity: 0.3 }} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="card-subtitle mb-2 small" style={{ color: customStyles.darkGrayText }}>New This Month</h6>
                    <h3 className="card-title mb-0" style={{ color: customStyles.blackText }}>2</h3>
                  </div>
                  <FaChartLine className="text-muted" size={24} style={{ opacity: 0.3 }} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="card-subtitle mb-2 small" style={{ color: customStyles.darkGrayText }}>
                      Active {activeTab === "employees" ? "Employees" : "Vendors"}
                    </h6>
                    <h3 className="card-title mb-0" style={{ color: customStyles.blackText }}>
                      {getCurrentData().length}
                    </h3>
                  </div>
                  <FaUserTie className="text-muted" size={24} style={{ opacity: 0.3 }} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="card-subtitle mb-2 small" style={{ color: customStyles.darkGrayText }}>Departments</h6>
                    <h3 className="card-title mb-0" style={{ color: customStyles.blackText }}>{uniqueDepartments}</h3>
                  </div>
                  <FaBuilding className="text-muted" size={24} style={{ opacity: 0.3 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Employee/Vendor List */}
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white" style={{ borderBottom: `1px solid ${customStyles.lightGrayBorder}` }}>
            <h5 className="mb-0" style={{ color: customStyles.blackText }}>
              {activeTab === "employees" ? "Employee" : "Vendor"} List
            </h5>
          </div>
          <div className="card-body p-0">
            {/* Desktop Table View */}
            <div className="d-none d-md-block">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr style={{ backgroundColor: customStyles.lightBg }}>
                      <th style={{ color: customStyles.darkGrayText }}>Name</th>
                      <th style={{ color: customStyles.darkGrayText }}>Email</th>
                      <th style={{ color: customStyles.darkGrayText }}>Phone</th>
                      <th style={{ color: customStyles.darkGrayText }}>Joining Date</th>
                      <th style={{ color: customStyles.darkGrayText }}>Job Title</th>
                      <th style={{ color: customStyles.darkGrayText }}>Salary</th>
                      <th style={{ color: customStyles.darkGrayText }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getCurrentData().map(item => (
                      <tr key={item.id}>
                        <td style={{ color: customStyles.blackText }}>{item.name}</td>
                        <td style={{ color: customStyles.blackText }}>{item.email}</td>
                        <td style={{ color: customStyles.blackText }}>{item.phone}</td>
                        <td style={{ color: customStyles.blackText }}>{item.joiningDate}</td>
                        <td style={{ color: customStyles.blackText }}>{item.jobTitle}</td>
                        <td style={{ color: customStyles.blackText }}>₹{item.salaryAmount}</td>
                        <td>
                          <button 
                            className="btn btn-sm me-2" 
                            onClick={() => handleEdit(item.id)}
                            style={{ color: customStyles.primaryRed, backgroundColor: 'transparent' }}
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            className="btn btn-sm" 
                            onClick={() => handleDelete(item.id)}
                            style={{ color: customStyles.primaryRed, backgroundColor: 'transparent' }}
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Mobile Card View */}
            <div className="d-md-none">
              {getCurrentData().map(item => (
                <div key={item.id} className="border-bottom p-3">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h6 className="mb-0" style={{ color: customStyles.blackText }}>{item.name}</h6>
                    <div>
                      <button 
                        className="btn btn-sm me-1" 
                        onClick={() => handleEdit(item.id)}
                        style={{ color: customStyles.primaryRed, backgroundColor: 'transparent', padding: '0.25rem 0.5rem' }}
                        title="Edit"
                      >
                        <FaEdit size={14} />
                      </button>
                      <button 
                        className="btn btn-sm" 
                        onClick={() => handleDelete(item.id)}
                        style={{ color: customStyles.primaryRed, backgroundColor: 'transparent', padding: '0.25rem 0.5rem' }}
                        title="Delete"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="row g-2 small">
                    <div className="col-6">
                      <span style={{ color: customStyles.darkGrayText }}>Email:</span>
                      <div style={{ color: customStyles.blackText }}>{item.email}</div>
                    </div>
                    <div className="col-6">
                      <span style={{ color: customStyles.darkGrayText }}>Phone:</span>
                      <div style={{ color: customStyles.blackText }}>{item.phone}</div>
                    </div>
                    <div className="col-6">
                      <span style={{ color: customStyles.darkGrayText }}>Joining:</span>
                      <div style={{ color: customStyles.blackText }}>{item.joiningDate}</div>
                    </div>
                    <div className="col-6">
                      <span style={{ color: customStyles.darkGrayText }}>Job:</span>
                      <div style={{ color: customStyles.blackText }}>{item.jobTitle}</div>
                    </div>
                    <div className="col-6">
                      <span style={{ color: customStyles.darkGrayText }}>Salary:</span>
                      <div style={{ color: customStyles.blackText }}>₹{item.salaryAmount}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Add Employee/Vendor Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className={`modal-dialog modal-dialog-centered ${isMobile ? 'modal-sm' : ''}`} style={{ 
            maxWidth: isMobile ? '95%' : '600px', 
            width: isMobile ? '95%' : '600px',
            margin: isMobile ? '5px auto' : '1.75rem auto'
          }}>
            <div className="modal-content">
              <div className="modal-header" style={{ backgroundColor: customStyles.primaryRed, color: customStyles.pureWhite, padding: isMobile ? '8px 12px' : '' }}>
                <h5 className="modal-title" style={{ fontSize: isMobile ? '0.9rem' : '1.25rem' }}>
                  Add New {activeTab === "employees" ? "Employee" : "Vendor"}
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body" style={{ 
                  padding: isMobile ? '8px' : '15px',
                  maxHeight: isMobile ? '70vh' : 'auto',
                  overflowY: isMobile ? 'auto' : 'visible'
                }}>
                  <div className="row g-2">
                    <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-2'}>
                      <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Name</label>
                      <input 
                        type="text" 
                        className={`form-control ${isMobile ? 'form-control-sm' : ''}`} 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange}
                        style={{ borderColor: customStyles.lightGrayBorder, fontSize: isMobile ? '0.75rem' : '0.875rem' }}
                        required
                      />
                    </div>
                    <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-2'}>
                      <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Email</label>
                      <input 
                        type="email" 
                        className={`form-control ${isMobile ? 'form-control-sm' : ''}`} 
                        name="email" 
                        value={formData.email} 
                        onChange={handleInputChange}
                        style={{ borderColor: customStyles.lightGrayBorder, fontSize: isMobile ? '0.75rem' : '0.875rem' }}
                        required
                      />
                    </div>
                    <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-2'}>
                      <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Phone</label>
                      <input 
                        type="tel" 
                        className={`form-control ${isMobile ? 'form-control-sm' : ''}`} 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleInputChange}
                        style={{ borderColor: customStyles.lightGrayBorder, fontSize: isMobile ? '0.75rem' : '0.875rem' }}
                        required
                      />
                    </div>
                    <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-2'}>
                      <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Joining Date</label>
                      <input 
                        type="date" 
                        className={`form-control ${isMobile ? 'form-control-sm' : ''}`} 
                        name="joiningDate" 
                        value={formData.joiningDate} 
                        onChange={handleInputChange}
                        style={{ borderColor: customStyles.lightGrayBorder, fontSize: isMobile ? '0.75rem' : '0.875rem' }}
                        required
                      />
                    </div>
                    <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-2'}>
                      <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Job Title</label>
                      <input 
                        type="text" 
                        className={`form-control ${isMobile ? 'form-control-sm' : ''}`} 
                        name="jobTitle" 
                        value={formData.jobTitle} 
                        onChange={handleInputChange}
                        style={{ borderColor: customStyles.lightGrayBorder, fontSize: isMobile ? '0.75rem' : '0.875rem' }}
                        required
                      />
                    </div>
                    <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-2'}>
                      <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Salary Amount</label>
                      <input 
                        type="number" 
                        className={`form-control ${isMobile ? 'form-control-sm' : ''}`} 
                        name="salaryAmount" 
                        value={formData.salaryAmount} 
                        onChange={handleInputChange}
                        style={{ borderColor: customStyles.lightGrayBorder, fontSize: isMobile ? '0.75rem' : '0.875rem' }}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer" style={{ padding: isMobile ? '8px 12px' : '' }}>
                  <button type="button" className="btn btn-sm" onClick={() => setShowModal(false)} style={{ backgroundColor: customStyles.lightGrayBorder, color: customStyles.blackText, fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Cancel</button>
                  <button type="submit" className="btn btn-sm text-white" style={{ backgroundColor: customStyles.primaryRed, fontSize: isMobile ? '0.75rem' : '0.875rem' }}>
                    Add {activeTab === "employees" ? "Employee" : "Vendor"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Employee/Vendor Modal */}
      {showEditModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className={`modal-dialog modal-dialog-centered ${isMobile ? 'modal-sm' : ''}`} style={{ 
            maxWidth: isMobile ? '95%' : '600px', 
            width: isMobile ? '95%' : '600px',
            margin: isMobile ? '5px auto' : '1.75rem auto'
          }}>
            <div className="modal-content">
              <div className="modal-header" style={{ backgroundColor: customStyles.primaryRed, color: customStyles.pureWhite, padding: isMobile ? '8px 12px' : '' }}>
                <h5 className="modal-title" style={{ fontSize: isMobile ? '0.9rem' : '1.25rem' }}>
                  Edit {activeTab === "employees" ? "Employee" : "Vendor"}
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowEditModal(false)}></button>
              </div>
              <form onSubmit={handleUpdate}>
                <div className="modal-body" style={{ 
                  padding: isMobile ? '8px' : '15px',
                  maxHeight: isMobile ? '70vh' : 'auto',
                  overflowY: isMobile ? 'auto' : 'visible'
                }}>
                  <div className="row g-2">
                    <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-2'}>
                      <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Name</label>
                      <input 
                        type="text" 
                        className={`form-control ${isMobile ? 'form-control-sm' : ''}`} 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange}
                        style={{ borderColor: customStyles.lightGrayBorder, fontSize: isMobile ? '0.75rem' : '0.875rem' }}
                        required
                      />
                    </div>
                    <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-2'}>
                      <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Email</label>
                      <input 
                        type="email" 
                        className={`form-control ${isMobile ? 'form-control-sm' : ''}`} 
                        name="email" 
                        value={formData.email} 
                        onChange={handleInputChange}
                        style={{ borderColor: customStyles.lightGrayBorder, fontSize: isMobile ? '0.75rem' : '0.875rem' }}
                        required
                      />
                    </div>
                    <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-2'}>
                      <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Phone</label>
                      <input 
                        type="tel" 
                        className={`form-control ${isMobile ? 'form-control-sm' : ''}`} 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleInputChange}
                        style={{ borderColor: customStyles.lightGrayBorder, fontSize: isMobile ? '0.75rem' : '0.875rem' }}
                        required
                      />
                    </div>
                    <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-2'}>
                      <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Joining Date</label>
                      <input 
                        type="date" 
                        className={`form-control ${isMobile ? 'form-control-sm' : ''}`} 
                        name="joiningDate" 
                        value={formData.joiningDate} 
                        onChange={handleInputChange}
                        style={{ borderColor: customStyles.lightGrayBorder, fontSize: isMobile ? '0.75rem' : '0.875rem' }}
                        required
                      />
                    </div>
                    <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-2'}>
                      <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Job Title</label>
                      <input 
                        type="text" 
                        className={`form-control ${isMobile ? 'form-control-sm' : ''}`} 
                        name="jobTitle" 
                        value={formData.jobTitle} 
                        onChange={handleInputChange}
                        style={{ borderColor: customStyles.lightGrayBorder, fontSize: isMobile ? '0.75rem' : '0.875rem' }}
                        required
                      />
                    </div>
                    <div className={isMobile ? 'col-12 mb-1' : 'col-md-6 mb-2'}>
                      <label className="form-label" style={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Salary Amount</label>
                      <input 
                        type="number" 
                        className={`form-control ${isMobile ? 'form-control-sm' : ''}`} 
                        name="salaryAmount" 
                        value={formData.salaryAmount} 
                        onChange={handleInputChange}
                        style={{ borderColor: customStyles.lightGrayBorder, fontSize: isMobile ? '0.75rem' : '0.875rem' }}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer" style={{ padding: isMobile ? '8px 12px' : '' }}>
                  <button type="button" className="btn btn-sm" onClick={() => setShowEditModal(false)} style={{ backgroundColor: customStyles.lightGrayBorder, color: customStyles.blackText, fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Cancel</button>
                  <button type="submit" className="btn btn-sm text-white" style={{ backgroundColor: customStyles.primaryRed, fontSize: isMobile ? '0.75rem' : '0.875rem' }}>
                    Update {activeTab === "employees" ? "Employee" : "Vendor"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerDashboard;