import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSignInAlt, FaSignOutAlt, FaClock, FaCalendarAlt, FaUserCircle, FaHistory, FaMapMarkerAlt } from 'react-icons/fa';

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

const CheckInOut = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [location, setLocation] = useState('Office');
  const [notes, setNotes] = useState('');
  const [todayAttendance, setTodayAttendance] = useState(null);
  const [recentHistory, setRecentHistory] = useState([
    { id: 1, date: '2023-12-04', checkIn: '09:05 AM', checkOut: '06:15 PM', duration: '9h 10m', status: 'Present' },
    { id: 2, date: '2023-12-03', checkIn: '09:12 AM', checkOut: '06:05 PM', duration: '8h 53m', status: 'Present' },
    { id: 3, date: '2023-12-02', checkIn: '08:55 AM', checkOut: '05:30 PM', duration: '8h 35m', status: 'Early' },
    { id: 4, date: '2023-12-01', checkIn: '09:45 AM', checkOut: '06:30 PM', duration: '8h 45m', status: 'Late' },
    { id: 5, date: '2023-11-30', checkIn: '09:00 AM', checkOut: '06:00 PM', duration: '9h 00m', status: 'Present' }
  ]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [employeeName] = useState('Rahul Sharma');
  const [employeeId] = useState('EMP001');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  
  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Check if already checked in today
  useEffect(() => {
    // Simulate checking today's attendance status
    const today = new Date().toISOString().split('T')[0];
    const todayRecord = recentHistory.find(record => record.date === today);
    
    if (todayRecord) {
      setTodayAttendance(todayRecord);
      setIsCheckedIn(true);
      setCheckInTime(todayRecord.checkIn);
      setCheckOutTime(todayRecord.checkOut);
    }
  }, [recentHistory]);
  
  const handleCheckIn = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    setCheckInTime(timeString);
    setIsCheckedIn(true);
    
    // Update today's attendance
    const today = new Date().toISOString().split('T')[0];
    const newAttendance = {
      id: recentHistory.length + 1,
      date: today,
      checkIn: timeString,
      checkOut: '-',
      duration: '-',
      status: 'Working'
    };
    
    setTodayAttendance(newAttendance);
    setRecentHistory([newAttendance, ...recentHistory]);
    
    // Show success message
    setAlertMessage(`Successfully checked in at ${timeString}`);
    setShowSuccessAlert(true);
    
    // Hide alert after 3 seconds
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 3000);
  };
  
  const handleCheckOut = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    setCheckOutTime(timeString);
    setIsCheckedIn(false);
    
    // Calculate duration
    if (checkInTime && checkInTime !== '-') {
      const [hoursIn, minutesIn, periodIn] = checkInTime.match(/(\d+):(\d+)\s*(AM|PM)/).slice(1);
      const [hoursOut, minutesOut, periodOut] = timeString.match(/(\d+):(\d+)\s*(AM|PM)/).slice(1);
      
      let totalMinutesIn = parseInt(hoursIn) * 60 + parseInt(minutesIn);
      let totalMinutesOut = parseInt(hoursOut) * 60 + parseInt(minutesOut);
      
      if (periodIn === 'PM' && hoursIn !== '12') totalMinutesIn += 12 * 60;
      if (periodOut === 'PM' && hoursOut !== '12') totalMinutesOut += 12 * 60;
      
      const durationMinutes = totalMinutesOut - totalMinutesIn;
      const durationHours = Math.floor(durationMinutes / 60);
      const remainingMinutes = durationMinutes % 60;
      const durationString = `${durationHours}h ${remainingMinutes}m`;
      
      // Determine status
      let status = 'Present';
      if (totalMinutesIn > 9 * 60 + 10) status = 'Late';
      else if (totalMinutesOut < 6 * 60) status = 'Early';
      
      // Update today's attendance
      const today = new Date().toISOString().split('T')[0];
      const updatedAttendance = {
        ...todayAttendance,
        checkOut: timeString,
        duration: durationString,
        status: status
      };
      
      setTodayAttendance(updatedAttendance);
      setRecentHistory([updatedAttendance, ...recentHistory.filter(r => r.id !== todayAttendance.id)]);
      
      // Show success message
      setAlertMessage(`Successfully checked out at ${timeString}. Total duration: ${durationString}`);
      setShowSuccessAlert(true);
      
      // Hide alert after 3 seconds
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 3000);
    }
  };
  
  const formatCurrentTime = () => {
    return currentTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };
  
  const formatDate = () => {
    return currentTime.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  return (
    <div className="container-fluid py-4" style={{ minHeight: '100vh', backgroundColor: colors.light }}>
      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="alert alert-success alert-dismissible fade show position-fixed" style={{ top: '20px', right: '20px', zIndex: 9999, minWidth: '300px' }} role="alert">
          <strong>Success!</strong> {alertMessage}
          <button type="button" className="btn-close" onClick={() => setShowSuccessAlert(false)}></button>
        </div>
      )}
      
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
                  <h1 className="fw-bold mb-1" style={{ color: colors.primary }}>Check In / Check Out</h1>
                  <p className="text-muted mb-0">{employeeName} | {employeeId}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Current Time Display */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h2 className="fw-bold mb-2" style={{ color: colors.primary }}>{formatCurrentTime()}</h2>
              <p className="text-muted mb-0">{formatDate()}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Check In/Out Section */}
      <div className="row mb-4">
        <div className="col-12 col-lg-6 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title mb-4">Today's Attendance</h5>
              
              {todayAttendance ? (
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Status:</span>
                    <span className={`badge ${todayAttendance.status === 'Present' ? 'bg-success' : todayAttendance.status === 'Late' ? 'bg-warning' : todayAttendance.status === 'Early' ? 'bg-info' : 'bg-secondary'}`}>
                      {todayAttendance.status}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Check In:</span>
                    <span>{todayAttendance.checkIn}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Check Out:</span>
                    <span>{todayAttendance.checkOut}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Duration:</span>
                    <span>{todayAttendance.duration}</span>
                  </div>
                </div>
              ) : (
                <div className="mb-4 text-center">
                  <p className="text-muted">You haven't checked in today</p>
                </div>
              )}
              
              <div className="d-grid gap-2">
                {!isCheckedIn ? (
                  <button
                    className="btn btn-success btn-lg"
                    onClick={handleCheckIn}
                  >
                    <FaSignInAlt className="me-2" />Check In
                  </button>
                ) : (
                  <button
                    className="btn btn-danger btn-lg"
                    onClick={handleCheckOut}
                  >
                    <FaSignOutAlt className="me-2" />Check Out
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-12 col-lg-6 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title mb-4">Additional Details</h5>
              
              <div className="mb-3">
                <label htmlFor="location" className="form-label">Location</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaMapMarkerAlt />
                  </span>
                  <select
                    className="form-select"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="Office">Office</option>
                    <option value="Remote">Remote</option>
                    <option value="Client Site">Client Site</option>
                    <option value="Field Work">Field Work</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-3">
                <label htmlFor="notes" className="form-label">Notes (Optional)</label>
                <textarea
                  className="form-control"
                  id="notes"
                  rows="3"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any notes about your work today..."
                ></textarea>
              </div>
              
              <div className="d-grid">
                <button className="btn btn-outline-primary">
                  Save Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent History */}
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <FaHistory className="me-2" />Recent History
              </h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Check In</th>
                      <th>Check Out</th>
                      <th>Duration</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentHistory.map((record) => (
                      <tr key={record.id}>
                        <td>{record.date}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <FaSignInAlt className="me-2 text-success" />
                            {record.checkIn}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <FaSignOutAlt className="me-2 text-danger" />
                            {record.checkOut}
                          </div>
                        </td>
                        <td>{record.duration}</td>
                        <td>
                          <span className={`badge ${record.status === 'Present' ? 'bg-success' : record.status === 'Late' ? 'bg-warning' : record.status === 'Early' ? 'bg-info' : 'bg-secondary'}`}>
                            {record.status}
                          </span>
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
    </div>
  );
};

export default CheckInOut;