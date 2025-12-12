import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCalendarAlt, FaCalendarWeek, FaFileExport, FaClock, FaUserTie, FaChartLine, FaUsers } from 'react-icons/fa';

// Color scheme
const colors = {
  primary: '#C62828',
  secondary: '#2c3e50',
  success: '#2ecc71',
  danger: '#e74c3c',
  warning: '#f39c12',
  info: '#9b59b6',
  light: '#f8f9fa',
  dark: '#343a40',
  present: '#2ecc71',
  absent: '#e74c3c',
  late: '#f39c12',
  early: '#3498db'
};

const EmployerAttendance = () => {
  const [activeTab, setActiveTab] = useState('daily');
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [companyName] = useState('TechCorp Solutions');
  
  // Sample data for daily attendance
  const [dailyAttendance, setDailyAttendance] = useState([
    { id: 1, employee: 'Rahul Sharma', department: 'Development', inTime: '09:12 AM', outTime: '06:10 PM', status: 'Present', lateBy: '12 min' },
    { id: 2, employee: 'Aman Verma', department: 'Marketing', inTime: '-', outTime: '-', status: 'Absent', lateBy: '-' },
    { id: 3, employee: 'Priya Patel', department: 'HR', inTime: '10:05 AM', outTime: '05:20 PM', status: 'Late', lateBy: '65 min' },
    { id: 4, employee: 'Neha Singh', department: 'Finance', inTime: '08:45 AM', outTime: '06:30 PM', status: 'Present', earlyBy: '15 min' },
    { id: 5, employee: 'Vikram Kumar', department: 'Development', inTime: '09:30 AM', outTime: '06:45 PM', status: 'Late', lateBy: '30 min' }
  ]);
  
  // Sample data for late/early tracking
  const [lateEarlyTracking, setLateEarlyTracking] = useState([
    { id: 1, employee: 'Rahul Sharma', department: 'Development', date: '05/12/2023', type: 'Late', duration: '12 min' },
    { id: 2, employee: 'Priya Patel', department: 'HR', date: '05/12/2023', type: 'Late', duration: '65 min' },
    { id: 3, employee: 'Vikram Kumar', department: 'Development', date: '05/12/2023', type: 'Late', duration: '30 min' },
    { id: 4, employee: 'Neha Singh', department: 'Finance', date: '05/12/2023', type: 'Early', duration: '15 min' },
    { id: 5, employee: 'Amit Jain', department: 'Sales', date: '04/12/2023', type: 'Late', duration: '45 min' }
  ]);
  
  // Sample data for monthly summary
  const [monthlySummary, setMonthlySummary] = useState([
    { id: 1, department: 'Development', totalEmployees: 15, avgPresent: '85%', avgLate: '12%', avgEarly: '8%' },
    { id: 2, department: 'Marketing', totalEmployees: 8, avgPresent: '88%', avgLate: '10%', avgEarly: '5%' },
    { id: 3, department: 'HR', totalEmployees: 5, avgPresent: '92%', avgLate: '8%', avgEarly: '6%' },
    { id: 4, department: 'Finance', totalEmployees: 6, avgPresent: '90%', avgLate: '9%', avgEarly: '7%' },
    { id: 5, department: 'Sales', totalEmployees: 10, avgPresent: '83%', avgLate: '15%', avgEarly: '10%' }
  ]);
  
  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const handleExport = (format) => {
    // Add logic to export data for this company only
    alert(`Exporting ${companyName} attendance data as ${format}`);
    setShowExportOptions(false);
  };
  
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Present':
        return 'bg-success';
      case 'Absent':
        return 'bg-danger';
      case 'Late':
        return 'bg-warning';
      case 'Early':
        return 'bg-info';
      default:
        return 'bg-secondary';
    }
  };
  
  const getTypeBadgeClass = (type) => {
    switch (type) {
      case 'Late':
        return 'bg-warning';
      case 'Early':
        return 'bg-info';
      default:
        return 'bg-secondary';
    }
  };
  
  return (
    <div className="container-fluid py-4" style={{ minHeight: '100vh', backgroundColor: colors.light }}>
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="fw-bold" style={{ color: colors.primary }}>Attendance Dashboard</h1>
              <p className="text-muted mb-0">{companyName}</p>
            </div>
            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id="exportDropdown"
                onClick={() => setShowExportOptions(!showExportOptions)}
              >
                <FaFileExport className="me-2" />Export Reports
              </button>
              <ul className={`dropdown-menu ${showExportOptions ? 'show' : ''}`} aria-labelledby="exportDropdown">
                <li><button className="dropdown-item" onClick={() => handleExport('CSV')}>Export as CSV</button></li>
                <li><button className="dropdown-item" onClick={() => handleExport('PDF')}>Export as PDF</button></li>
                <li><button className="dropdown-item" onClick={() => handleExport('Excel')}>Export as Excel</button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-12 col-sm-6 col-lg-3 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <p className="mb-1 text-muted">Total Employees</p>
                  <h3 className="fw-bold mb-0" style={{ color: colors.primary }}>44</h3>
                </div>
                <div className="ms-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" 
                       style={{ backgroundColor: colors.primary, width: "50px", height: "50px" }}>
                    <FaUsers className="text-white" style={{ fontSize: '1.5rem' }}></FaUsers>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <p className="mb-1 text-muted">Today's Present</p>
                  <h3 className="fw-bold mb-0" style={{ color: colors.success }}>38</h3>
                </div>
                <div className="ms-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" 
                       style={{ backgroundColor: colors.success, width: "50px", height: "50px" }}>
                    <FaUserTie className="text-white" style={{ fontSize: '1.5rem' }}></FaUserTie>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <p className="mb-1 text-muted">Today's Late</p>
                  <h3 className="fw-bold mb-0" style={{ color: colors.warning }}>3</h3>
                </div>
                <div className="ms-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" 
                       style={{ backgroundColor: colors.warning, width: "50px", height: "50px" }}>
                    <FaClock className="text-white" style={{ fontSize: '1.5rem' }}></FaClock>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <p className="mb-1 text-muted">Today's Absent</p>
                  <h3 className="fw-bold mb-0" style={{ color: colors.danger }}>3</h3>
                </div>
                <div className="ms-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" 
                       style={{ backgroundColor: colors.danger, width: "50px", height: "50px" }}>
                    <FaUserTie className="text-white" style={{ fontSize: '1.5rem' }}></FaUserTie>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'daily' ? 'active' : ''}`}
                    onClick={() => setActiveTab('daily')}
                  >
                    <FaCalendarAlt className="me-2" />Daily Attendance
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'lateEarly' ? 'active' : ''}`}
                    onClick={() => setActiveTab('lateEarly')}
                  >
                    <FaClock className="me-2" />Track Late/Early
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'monthly' ? 'active' : ''}`}
                    onClick={() => setActiveTab('monthly')}
                  >
                    <FaChartLine className="me-2" />Monthly Summary
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Daily Attendance */}
      {activeTab === 'daily' && (
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Daily Attendance - {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h5>
                <div>
                  <input
                    type="date"
                    className="form-control form-control-sm d-inline-block"
                    style={{ width: '150px' }}
                    defaultValue={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Department</th>
                        <th>IN Time</th>
                        <th>OUT Time</th>
                        <th>Status</th>
                        <th>Late/Early By</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dailyAttendance.map((record) => (
                        <tr key={record.id}>
                          <td>{record.employee}</td>
                          <td>{record.department}</td>
                          <td>{record.inTime}</td>
                          <td>{record.outTime}</td>
                          <td>
                            <span className={`badge ${getStatusBadgeClass(record.status)}`}>
                              {record.status}
                            </span>
                          </td>
                          <td>{record.lateBy || record.earlyBy || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Late/Early Tracking */}
      {activeTab === 'lateEarly' && (
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Late/Early Tracking</h5>
                <div>
                  <select 
                    className="form-select form-select-sm d-inline-block" 
                    style={{ width: '150px' }}
                    value={`${selectedMonth}-${selectedYear}`}
                    onChange={(e) => {
                      const [month, year] = e.target.value.split('-').map(Number);
                      setSelectedMonth(month);
                      setSelectedYear(year);
                    }}
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={`${i}-${selectedYear}`}>
                        {monthNames[i]} {selectedYear}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Department</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lateEarlyTracking.map((record) => (
                        <tr key={record.id}>
                          <td>{record.employee}</td>
                          <td>{record.department}</td>
                          <td>{record.date}</td>
                          <td>
                            <span className={`badge ${getTypeBadgeClass(record.type)}`}>
                              {record.type}
                            </span>
                          </td>
                          <td>{record.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Monthly Summary */}
      {activeTab === 'monthly' && (
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Monthly Summary - {monthNames[selectedMonth]} {selectedYear}</h5>
                <div>
                  <select 
                    className="form-select form-select-sm d-inline-block" 
                    style={{ width: '150px' }}
                    value={`${selectedMonth}-${selectedYear}`}
                    onChange={(e) => {
                      const [month, year] = e.target.value.split('-').map(Number);
                      setSelectedMonth(month);
                      setSelectedYear(year);
                    }}
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={`${i}-${selectedYear}`}>
                        {monthNames[i]} {selectedYear}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Department</th>
                        <th>Total Employees</th>
                        <th>Avg. Present</th>
                        <th>Avg. Late</th>
                        <th>Avg. Early</th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthlySummary.map((record) => (
                        <tr key={record.id}>
                          <td>{record.department}</td>
                          <td>{record.totalEmployees}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="progress flex-grow-1 me-2" style={{ height: '10px' }}>
                                <div 
                                  className="progress-bar bg-success" 
                                  role="progressbar" 
                                  style={{ width: record.avgPresent }}
                                  aria-valuenow={record.avgPresent.replace('%', '')} 
                                  aria-valuemin="0" 
                                  aria-valuemax="100"
                                ></div>
                              </div>
                              <span>{record.avgPresent}</span>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="progress flex-grow-1 me-2" style={{ height: '10px' }}>
                                <div 
                                  className="progress-bar bg-warning" 
                                  role="progressbar" 
                                  style={{ width: record.avgLate }}
                                  aria-valuenow={record.avgLate.replace('%', '')} 
                                  aria-valuemin="0" 
                                  aria-valuemax="100"
                                ></div>
                              </div>
                              <span>{record.avgLate}</span>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="progress flex-grow-1 me-2" style={{ height: '10px' }}>
                                <div 
                                  className="progress-bar bg-info" 
                                  role="progressbar" 
                                  style={{ width: record.avgEarly }}
                                  aria-valuenow={record.avgEarly.replace('%', '')} 
                                  aria-valuemin="0" 
                                  aria-valuemax="100"
                                ></div>
                              </div>
                              <span>{record.avgEarly}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerAttendance;