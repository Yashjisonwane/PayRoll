import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaClock, FaSignInAlt, FaSignOutAlt, FaChartBar, FaCheckCircle, FaTimesCircle, FaUserCircle } from 'react-icons/fa';

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
  early: '#3498db',
  halfDay: '#9b59b6'
};

const EmployeeAttendance = () => {
  const [activeView, setActiveView] = useState('list');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [employeeName] = useState('Rahul Sharma');
  const [employeeId] = useState('EMP001');
  
  // Sample attendance data for employee
  const [attendanceData, setAttendanceData] = useState([
    { id: 1, date: '2023-12-05', day: 'Monday', inTime: '09:12 AM', outTime: '06:10 PM', status: 'Present', duration: '8h 58m', lateBy: '12 min' },
    { id: 2, date: '2023-12-04', day: 'Sunday', inTime: '-', outTime: '-', status: 'Weekly Off', duration: '-', lateBy: '-' },
    { id: 3, date: '2023-12-02', day: 'Saturday', inTime: '09:00 AM', outTime: '02:00 PM', status: 'Half Day', duration: '5h 00m', lateBy: '-' },
    { id: 4, date: '2023-12-01', day: 'Friday', inTime: '10:05 AM', outTime: '06:20 PM', status: 'Late', duration: '8h 15m', lateBy: '65 min' },
    { id: 5, date: '2023-11-30', day: 'Thursday', inTime: '08:45 AM', outTime: '06:30 PM', status: 'Early', duration: '9h 45m', lateBy: '-' },
    { id: 6, date: '2023-11-29', day: 'Wednesday', inTime: '09:30 AM', outTime: '06:45 PM', status: 'Late', duration: '9h 15m', lateBy: '30 min' },
    { id: 7, date: '2023-11-28', day: 'Tuesday', inTime: '-', outTime: '-', status: 'Absent', duration: '-', lateBy: '-' },
    { id: 8, date: '2023-11-27', day: 'Monday', inTime: '09:00 AM', outTime: '06:00 PM', status: 'Present', duration: '9h 00m', lateBy: '-' }
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
  
  // Calculate monthly statistics
  const calculateMonthlyStats = () => {
    const monthData = attendanceData.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate.getMonth() === selectedMonth && recordDate.getFullYear() === selectedYear;
    });
    
    const present = monthData.filter(r => r.status === 'Present').length;
    const absent = monthData.filter(r => r.status === 'Absent').length;
    const late = monthData.filter(r => r.status === 'Late').length;
    const early = monthData.filter(r => r.status === 'Early').length;
    const halfDay = monthData.filter(r => r.status === 'Half Day').length;
    const weeklyOff = monthData.filter(r => r.status === 'Weekly Off').length;
    
    return { present, absent, late, early, halfDay, weeklyOff, total: monthData.length };
  };
  
  const monthlyStats = calculateMonthlyStats();
  
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
      case 'Half Day':
        return 'bg-secondary';
      case 'Weekly Off':
        return 'bg-primary';
      default:
        return 'bg-light text-dark';
    }
  };
  
  return (
    <div className="container-fluid py-4" style={{ minHeight: '100vh', backgroundColor: colors.light }}>
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <FaUserCircle style={{ fontSize: '3rem', color: colors.primary }} />
                </div>
                <div>
                  <h1 className="fw-bold mb-1" style={{ color: colors.primary }}>My Attendance</h1>
                  <p className="text-muted mb-0">{employeeName} | {employeeId}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="row mb-4">
        <div className="col-12 col-sm-6 col-lg-3 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <p className="mb-1 text-muted">This Month</p>
                  <h3 className="fw-bold mb-0" style={{ color: colors.success }}>{monthlyStats.present}</h3>
                  <small className="text-muted">Present Days</small>
                </div>
                <div className="ms-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" 
                       style={{ backgroundColor: colors.success, width: "50px", height: "50px" }}>
                    <FaCheckCircle className="text-white" style={{ fontSize: '1.5rem' }}></FaCheckCircle>
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
                  <p className="mb-1 text-muted">This Month</p>
                  <h3 className="fw-bold mb-0" style={{ color: colors.danger }}>{monthlyStats.absent}</h3>
                  <small className="text-muted">Absent Days</small>
                </div>
                <div className="ms-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" 
                       style={{ backgroundColor: colors.danger, width: "50px", height: "50px" }}>
                    <FaTimesCircle className="text-white" style={{ fontSize: '1.5rem' }}></FaTimesCircle>
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
                  <p className="mb-1 text-muted">This Month</p>
                  <h3 className="fw-bold mb-0" style={{ color: colors.warning }}>{monthlyStats.late}</h3>
                  <small className="text-muted">Late Arrivals</small>
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
                  <p className="mb-1 text-muted">This Month</p>
                  <h3 className="fw-bold mb-0" style={{ color: colors.info }}>{monthlyStats.early}</h3>
                  <small className="text-muted">Early Departures</small>
                </div>
                <div className="ms-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" 
                       style={{ backgroundColor: colors.info, width: "50px", height: "50px" }}>
                    <FaSignInAlt className="text-white" style={{ fontSize: '1.5rem' }}></FaSignInAlt>
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
                    className={`nav-link ${activeView === 'list' ? 'active' : ''}`}
                    onClick={() => setActiveView('list')}
                  >
                    <FaClock className="me-2" />Attendance List
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeView === 'summary' ? 'active' : ''}`}
                    onClick={() => setActiveView('summary')}
                  >
                    <FaChartBar className="me-2" />Monthly Summary
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Attendance List View */}
      {activeView === 'list' && (
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Attendance History</h5>
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
                        <th>Date</th>
                        <th>Day</th>
                        <th>Punch In</th>
                        <th>Punch Out</th>
                        <th>Status</th>
                        <th>Duration</th>
                        <th>Late By</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceData
                        .filter(record => {
                          const recordDate = new Date(record.date);
                          return recordDate.getMonth() === selectedMonth && recordDate.getFullYear() === selectedYear;
                        })
                        .map((record) => (
                        <tr key={record.id}>
                          <td>{record.date}</td>
                          <td>{record.day}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <FaSignInAlt className="me-2 text-success" />
                              {record.inTime}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <FaSignOutAlt className="me-2 text-danger" />
                              {record.outTime}
                            </div>
                          </td>
                          <td>
                            <span className={`badge ${getStatusBadgeClass(record.status)}`}>
                              {record.status}
                            </span>
                          </td>
                          <td>{record.duration}</td>
                          <td>{record.lateBy}</td>
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
      
      {/* Monthly Summary View */}
      {activeView === 'summary' && (
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
                <div className="row">
                  <div className="col-12 col-md-6 mb-4">
                    <h6 className="mb-3">Attendance Overview</h6>
                    <div className="table-responsive">
                      <table className="table">
                        <tbody>
                          <tr>
                            <td>Present Days</td>
                            <td className="text-end">
                              <span className="badge bg-success fs-6">{monthlyStats.present}</span>
                            </td>
                          </tr>
                          <tr>
                            <td>Absent Days</td>
                            <td className="text-end">
                              <span className="badge bg-danger fs-6">{monthlyStats.absent}</span>
                            </td>
                          </tr>
                          <tr>
                            <td>Late Arrivals</td>
                            <td className="text-end">
                              <span className="badge bg-warning fs-6">{monthlyStats.late}</span>
                            </td>
                          </tr>
                          <tr>
                            <td>Early Departures</td>
                            <td className="text-end">
                              <span className="badge bg-info fs-6">{monthlyStats.early}</span>
                            </td>
                          </tr>
                          <tr>
                            <td>Half Days</td>
                            <td className="text-end">
                              <span className="badge bg-secondary fs-6">{monthlyStats.halfDay}</span>
                            </td>
                          </tr>
                          <tr>
                            <td>Weekly Off</td>
                            <td className="text-end">
                              <span className="badge bg-primary fs-6">{monthlyStats.weeklyOff}</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 mb-4">
                    <h6 className="mb-3">Attendance Percentage</h6>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span>Present</span>
                        <span>{Math.round((monthlyStats.present / monthlyStats.total) * 100)}%</span>
                      </div>
                      <div className="progress" style={{ height: '20px' }}>
                        <div 
                          className="progress-bar bg-success" 
                          role="progressbar" 
                          style={{ width: `${(monthlyStats.present / monthlyStats.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span>Absent</span>
                        <span>{Math.round((monthlyStats.absent / monthlyStats.total) * 100)}%</span>
                      </div>
                      <div className="progress" style={{ height: '20px' }}>
                        <div 
                          className="progress-bar bg-danger" 
                          role="progressbar" 
                          style={{ width: `${(monthlyStats.absent / monthlyStats.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span>Late</span>
                        <span>{Math.round((monthlyStats.late / monthlyStats.total) * 100)}%</span>
                      </div>
                      <div className="progress" style={{ height: '20px' }}>
                        <div 
                          className="progress-bar bg-warning" 
                          role="progressbar" 
                          style={{ width: `${(monthlyStats.late / monthlyStats.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeAttendance;