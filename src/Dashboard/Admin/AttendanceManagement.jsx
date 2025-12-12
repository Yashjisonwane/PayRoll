import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCalendarAlt, FaCalendarWeek, FaFileExport, FaCog, FaEdit } from 'react-icons/fa';

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
  leave: '#3498db'
};

const AttendanceManagement = () => {
  const [activeTab, setActiveTab] = useState('daily');
  const [showRules, setShowRules] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [editingRecord, setEditingRecord] = useState(null);
  
  // Sample data for daily attendance
  const [dailyAttendance, setDailyAttendance] = useState([
    { id: 1, employee: 'Rahul', inTime: '09:12 AM', outTime: '06:10 PM', status: 'Present' },
    { id: 2, employee: 'Aman', inTime: '-', outTime: '-', status: 'Absent' },
    { id: 3, employee: 'Priya', inTime: '10:05 AM', outTime: '05:20 PM', status: 'Late' },
    { id: 4, employee: 'Neha', inTime: '09:00 AM', outTime: '06:30 PM', status: 'Present' },
    { id: 5, employee: 'Vikram', inTime: '09:30 AM', outTime: '06:45 PM', status: 'Late' }
  ]);
  
  // Sample data for monthly attendance
  const [monthlyAttendance, setMonthlyAttendance] = useState([
    { id: 1, employee: 'Rahul', present: 25, absent: 1, late: 3, leaves: 1, otHours: '4h' },
    { id: 2, employee: 'Aman', present: 22, absent: 3, late: 2, leaves: 2, otHours: '0h' },
    { id: 3, employee: 'Priya', present: 24, absent: 2, late: 1, leaves: 3, otHours: '2h' },
    { id: 4, employee: 'Neha', present: 26, absent: 0, late: 2, leaves: 2, otHours: '5h' },
    { id: 5, employee: 'Vikram', present: 23, absent: 1, late: 4, leaves: 2, otHours: '3h' }
  ]);
  
  // Sample data for employees
  const [employees] = useState([
    { id: 1, name: 'Rahul' },
    { id: 2, name: 'Aman' },
    { id: 3, name: 'Priya' },
    { id: 4, name: 'Neha' },
    { id: 5, name: 'Vikram' }
  ]);
  
  // Form state for edit
  const [editForm, setEditForm] = useState({
    id: '',
    employee: '',
    date: '',
    inTime: '',
    outTime: '',
    status: 'Present'
  });
  
  // Form state for attendance rules
  const [rulesForm, setRulesForm] = useState({
    shiftTiming: '09:00 AM - 06:00 PM',
    graceTime: '10',
    overtimeRule: 'After 30 mins beyond shift',
    halfDayRule: 'Less than 4 hours',
    weeklyOff: 'Sunday'
  });
  
  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRulesFormChange = (e) => {
    const { name, value } = e.target;
    setRulesForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Update the attendance record
    const updatedAttendance = dailyAttendance.map(record => {
      if (record.id === editForm.id) {
        return {
          ...record,
          employee: employees.find(emp => emp.id === parseInt(editForm.employee))?.name || record.employee,
          inTime: editForm.inTime || '-',
          outTime: editForm.outTime || '-',
          status: editForm.status
        };
      }
      return record;
    });
    
    setDailyAttendance(updatedAttendance);
    alert('Attendance updated successfully!');
    setShowEditModal(false);
    setEditForm({
      id: '',
      employee: '',
      date: '',
      inTime: '',
      outTime: '',
      status: 'Present'
    });
  };
  
  const handleRulesSubmit = (e) => {
    e.preventDefault();
    // Add logic to save attendance rules
    alert('Attendance rules updated successfully!');
    setShowRules(false);
  };
  
  const handleExport = (format) => {
    // Add logic to export data
    alert(`Exporting attendance data as ${format}`);
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
      case 'Leave':
        return 'bg-info';
      default:
        return 'bg-secondary';
    }
  };
  
  const handleEditAttendance = (id) => {
    // Find the record to edit
    const record = dailyAttendance.find(r => r.id === id);
    if (record) {
      setEditingRecord(record);
      setEditForm({
        id: record.id,
        employee: employees.find(emp => emp.name === record.employee)?.id || '',
        date: new Date().toISOString().split('T')[0], // Default to today's date
        inTime: record.inTime === '-' ? '' : record.inTime,
        outTime: record.outTime === '-' ? '' : record.outTime,
        status: record.status
      });
      setShowEditModal(true);
    }
  };
  
  const handleMarkNow = (id) => {
    // Find the record to mark
    const record = dailyAttendance.find(r => r.id === id);
    if (record) {
      setEditingRecord(record);
      setEditForm({
        id: record.id,
        employee: employees.find(emp => emp.name === record.employee)?.id || '',
        date: new Date().toISOString().split('T')[0], // Default to today's date
        inTime: '',
        outTime: '',
        status: 'Present'
      });
      setShowEditModal(true);
    }
  };
  
  return (
    <div className="container-fluid py-4" style={{ minHeight: '100vh', backgroundColor: colors.light }}>
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="fw-bold" style={{ color: colors.primary }}>Attendance Management</h1>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex flex-wrap justify-content-between">
                <button
                  className={`btn ${activeTab === 'daily' ? 'btn-primary' : 'btn-outline-primary'} mb-2 mb-md-0`}
                  onClick={() => setActiveTab('daily')}
                >
                  <FaCalendarAlt className="me-2" />Daily Attendance
                </button>
                <button
                  className={`btn ${activeTab === 'monthly' ? 'btn-primary' : 'btn-outline-primary'} mb-2 mb-md-0`}
                  onClick={() => setActiveTab('monthly')}
                >
                  <FaCalendarWeek className="me-2" />Monthly Attendance
                </button>
                <div className="dropdown mb-2 mb-md-0">
                  <button
                    className="btn btn-outline-primary dropdown-toggle"
                    type="button"
                    id="exportDropdown"
                    onClick={() => setShowExportOptions(!showExportOptions)}
                  >
                    <FaFileExport className="me-2" />Export
                  </button>
                  <ul className={`dropdown-menu ${showExportOptions ? 'show' : ''}`} aria-labelledby="exportDropdown">
                    <li><button className="dropdown-item" onClick={() => handleExport('CSV')}>CSV</button></li>
                    <li><button className="dropdown-item" onClick={() => handleExport('PDF')}>PDF</button></li>
                  </ul>
                </div>
                <button
                  className="btn btn-outline-primary mb-2 mb-md-0"
                  onClick={() => setShowRules(true)}
                >
                  <FaCog className="me-2" />Attendance Rules
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Daily Attendance */}
      {activeTab === 'daily' && (
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h5 className="mb-0">Daily Attendance Snapshot</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>IN Time</th>
                        <th>OUT Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dailyAttendance.map((record) => (
                        <tr key={record.id}>
                          <td>{record.employee}</td>
                          <td>{record.inTime}</td>
                          <td>{record.outTime}</td>
                          <td>
                            <span className={`badge ${getStatusBadgeClass(record.status)}`}>
                              {record.status}
                            </span>
                          </td>
                          <td>
                            {record.status === 'Absent' ? (
                              <button
                                className="btn btn-sm btn-primary"
                                onClick={() => handleMarkNow(record.id)}
                              >
                                Mark Now
                              </button>
                            ) : (
                              <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => handleEditAttendance(record.id)}
                              >
                                <FaEdit />
                              </button>
                            )}
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
      
      {/* Monthly Attendance */}
      {activeTab === 'monthly' && (
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h5 className="mb-0">Monthly Attendance Summary</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Present</th>
                        <th>Absent</th>
                        <th>Late</th>
                        <th>Leaves</th>
                        <th>OT Hours</th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthlyAttendance.map((record) => (
                        <tr key={record.id}>
                          <td>{record.employee}</td>
                          <td>{record.present}</td>
                          <td>{record.absent}</td>
                          <td>{record.late}</td>
                          <td>{record.leaves}</td>
                          <td>{record.otHours}</td>
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
      
      {/* Edit Attendance Modal */}
      {showEditModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Attendance</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleEditSubmit}>
                  <div className="mb-3">
                    <label htmlFor="editEmployee" className="form-label">Employee</label>
                    <select
                      className="form-select"
                      id="editEmployee"
                      name="employee"
                      value={editForm.employee}
                      onChange={handleEditFormChange}
                      required
                    >
                      <option value="">Select Employee</option>
                      {employees.map((emp) => (
                        <option key={emp.id} value={emp.id}>{emp.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editDate" className="form-label">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="editDate"
                      name="date"
                      value={editForm.date}
                      onChange={handleEditFormChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editInTime" className="form-label">IN Time</label>
                    <input
                      type="time"
                      className="form-control"
                      id="editInTime"
                      name="inTime"
                      value={editForm.inTime}
                      onChange={handleEditFormChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editOutTime" className="form-label">OUT Time</label>
                    <input
                      type="time"
                      className="form-control"
                      id="editOutTime"
                      name="outTime"
                      value={editForm.outTime}
                      onChange={handleEditFormChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editStatus" className="form-label">Status</label>
                    <select
                      className="form-select"
                      id="editStatus"
                      name="status"
                      value={editForm.status}
                      onChange={handleEditFormChange}
                      required
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                      <option value="Late">Late</option>
                      <option value="Leave">Leave</option>
                    </select>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-secondary me-2" onClick={() => setShowEditModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Update</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Attendance Rules Modal */}
      {showRules && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Attendance Rules</h5>
                <button type="button" className="btn-close" onClick={() => setShowRules(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleRulesSubmit}>
                  <div className="mb-3">
                    <label htmlFor="shiftTiming" className="form-label">Shift Timing</label>
                    <input
                      type="text"
                      className="form-control"
                      id="shiftTiming"
                      name="shiftTiming"
                      value={rulesForm.shiftTiming}
                      onChange={handleRulesFormChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="graceTime" className="form-label">Grace Time (minutes)</label>
                    <input
                      type="text"
                      className="form-control"
                      id="graceTime"
                      name="graceTime"
                      value={rulesForm.graceTime}
                      onChange={handleRulesFormChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="overtimeRule" className="form-label">Overtime Rule</label>
                    <input
                      type="text"
                      className="form-control"
                      id="overtimeRule"
                      name="overtimeRule"
                      value={rulesForm.overtimeRule}
                      onChange={handleRulesFormChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="halfDayRule" className="form-label">Half-Day Rule</label>
                    <input
                      type="text"
                      className="form-control"
                      id="halfDayRule"
                      name="halfDayRule"
                      value={rulesForm.halfDayRule}
                      onChange={handleRulesFormChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="weeklyOff" className="form-label">Weekly Off</label>
                    <select
                      className="form-select"
                      id="weeklyOff"
                      name="weeklyOff"
                      value={rulesForm.weeklyOff}
                      onChange={handleRulesFormChange}
                    >
                      <option value="Sunday">Sunday</option>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                    </select>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-secondary me-2" onClick={() => setShowRules(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Update</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceManagement;