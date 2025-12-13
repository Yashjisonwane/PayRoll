import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserGraduate, FaChartBar, FaClipboardCheck, FaPlus, FaBook, FaUserCheck, FaTrophy, FaPlay, FaCheckCircle, FaTimesCircle, FaSearch } from 'react-icons/fa';

// Color scheme
const colors = {
  primary: '#C62828',
  secondary: '#2c3e50',
  success: '#2ecc71',
  danger: '#e74c3c',
  warning: '#f39c12',
  info: '#9b59b6',
  light: '#f8f9fa',
  dark: '#343a40'
};

const EmployerTraining = () => {
  const [activeView, setActiveView] = useState('assign');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [companyName] = useState('TechCorp Solutions');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample employees data
  const [employees] = useState([
    { id: 1, name: 'Rahul Sharma', department: 'Development', email: 'rahul@company.com' },
    { id: 2, name: 'Priya Patel', department: 'HR', email: 'priya@company.com' },
    { id: 3, name: 'Amit Kumar', department: 'Marketing', email: 'amit@company.com' },
    { id: 4, name: 'Neha Singh', department: 'Finance', email: 'neha@company.com' },
    { id: 5, name: 'Vikram Verma', department: 'Development', email: 'vikram@company.com' }
  ]);
  
  // Sample training courses data
  const [trainingCourses] = useState([
    { id: 1, title: 'Advanced JavaScript', instructor: 'John Doe', duration: '4 weeks', category: 'Technical' },
    { id: 2, title: 'Leadership Skills', instructor: 'Jane Smith', duration: '2 weeks', category: 'Soft Skills' },
    { id: 3, title: 'Project Management', instructor: 'Mike Johnson', duration: '6 weeks', category: 'Management' },
    { id: 4, title: 'Communication Excellence', instructor: 'Sarah Williams', duration: '3 weeks', category: 'Soft Skills' }
  ]);
  
  // Sample assigned trainings data
  const [assignedTrainings, setAssignedTrainings] = useState([
    { id: 1, courseId: 1, courseTitle: 'Advanced JavaScript', employeeId: 1, employeeName: 'Rahul Sharma', assignDate: '2023-11-01', dueDate: '2023-12-01', status: 'In Progress', completion: 75 },
    { id: 2, courseId: 2, courseTitle: 'Leadership Skills', employeeId: 2, employeeName: 'Priya Patel', assignDate: '2023-11-05', dueDate: '2023-12-05', status: 'Completed', completion: 100 },
    { id: 3, courseId: 3, courseTitle: 'Project Management', employeeId: 3, employeeName: 'Amit Kumar', assignDate: '2023-11-10', dueDate: '2023-12-10', status: 'In Progress', completion: 40 },
    { id: 4, courseId: 4, courseTitle: 'Communication Excellence', employeeId: 4, employeeName: 'Neha Singh', assignDate: '2023-11-15', dueDate: '2023-12-15', status: 'Not Started', completion: 0 },
    { id: 5, courseId: 1, courseTitle: 'Advanced JavaScript', employeeId: 5, employeeName: 'Vikram Verma', assignDate: '2023-11-20', dueDate: '2023-12-20', status: 'In Progress', completion: 60 }
  ]);
  
  // Sample assessment results data
  const [assessmentResults] = useState([
    { id: 1, courseId: 1, courseTitle: 'Advanced JavaScript', employeeId: 1, employeeName: 'Rahul Sharma', assessmentDate: '2023-11-28', score: 85, status: 'Passed' },
    { id: 2, courseId: 2, courseTitle: 'Leadership Skills', employeeId: 2, employeeName: 'Priya Patel', assessmentDate: '2023-11-25', score: 92, status: 'Passed' },
    { id: 3, courseId: 3, courseTitle: 'Project Management', employeeId: 3, employeeName: 'Amit Kumar', assessmentDate: '2023-11-30', score: 78, status: 'Passed' },
    { id: 4, courseId: 4, courseTitle: 'Communication Excellence', employeeId: 4, employeeName: 'Neha Singh', assessmentDate: '2023-11-22', score: 65, status: 'Failed' },
    { id: 5, courseId: 1, courseTitle: 'Advanced JavaScript', employeeId: 5, employeeName: 'Vikram Verma', assessmentDate: '2023-11-18', score: 88, status: 'Passed' }
  ]);
  
  // Form state for assigning training
  const [assignForm, setAssignForm] = useState({
    courseId: '',
    employeeId: '',
    dueDate: ''
  });
  
  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleAssignTraining = (e) => {
    e.preventDefault();
    const course = trainingCourses.find(c => c.id === parseInt(assignForm.courseId));
    const employee = employees.find(emp => emp.id === parseInt(assignForm.employeeId));
    
    const newAssignment = {
      id: assignedTrainings.length + 1,
      courseId: parseInt(assignForm.courseId),
      courseTitle: course ? course.title : 'Unknown',
      employeeId: parseInt(assignForm.employeeId),
      employeeName: employee ? employee.name : 'Unknown',
      assignDate: new Date().toISOString().split('T')[0],
      dueDate: assignForm.dueDate,
      status: 'Not Started',
      completion: 0
    };
    
    setAssignedTrainings([...assignedTrainings, newAssignment]);
    setShowAssignModal(false);
    setAssignForm({ courseId: '', employeeId: '', dueDate: '' });
    alert(`Training assigned to ${employee.name} successfully!`);
  };
  
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-success';
      case 'In Progress':
        return 'bg-info';
      case 'Not Started':
        return 'bg-warning';
      case 'Failed':
        return 'bg-danger';
      case 'Passed':
        return 'bg-success';
      default:
        return 'bg-secondary';
    }
  };
  
  const getScoreBadgeClass = (score) => {
    if (score >= 90) return 'bg-success';
    if (score >= 75) return 'bg-info';
    if (score >= 60) return 'bg-warning';
    return 'bg-danger';
  };
  
  const getCompletionColor = (completion) => {
    if (completion >= 80) return colors.success;
    if (completion >= 50) return colors.info;
    if (completion > 0) return colors.warning;
    return colors.light;
  };
  
  // Filter data based on search term
  const filteredAssignedTrainings = assignedTrainings.filter(training => 
    training.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    training.courseTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredAssessmentResults = assessmentResults.filter(result => 
    result.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.courseTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate statistics
  const totalEmployees = employees.length;
  const totalCourses = trainingCourses.length;
  const totalAssignments = assignedTrainings.length;
  const completedAssignments = assignedTrainings.filter(t => t.status === 'Completed').length;
  const averageCompletion = totalAssignments > 0 
    ? Math.round(assignedTrainings.reduce((sum, t) => sum + t.completion, 0) / totalAssignments)
    : 0;
  
  return (
    <div className="container-fluid py-4" style={{ minHeight: '100vh', backgroundColor: colors.light }}>
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <FaUserGraduate style={{ fontSize: '3rem', color: colors.primary }} />
                </div>
                <div>
                  <h1 className="fw-bold mb-1" style={{ color: colors.primary }}>Training Management</h1>
                  <p className="text-muted mb-0">{companyName}</p>
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
                  <p className="mb-1 text-muted">Total Employees</p>
                  <h3 className="fw-bold mb-0" style={{ color: colors.primary }}>{totalEmployees}</h3>
                </div>
                <div className="ms-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" 
                       style={{ backgroundColor: colors.primary, width: "50px", height: "50px" }}>
                    <FaUserCheck className="text-white" style={{ fontSize: '1.5rem' }}></FaUserCheck>
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
                  <p className="mb-1 text-muted">Total Courses</p>
                  <h3 className="fw-bold mb-0" style={{ color: colors.info }}>{totalCourses}</h3>
                </div>
                <div className="ms-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" 
                       style={{ backgroundColor: colors.info, width: "50px", height: "50px" }}>
                    <FaBook className="text-white" style={{ fontSize: '1.5rem' }}></FaBook>
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
                  <p className="mb-1 text-muted">Completed</p>
                  <h3 className="fw-bold mb-0" style={{ color: colors.success }}>{completedAssignments}</h3>
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
                  <p className="mb-1 text-muted">Avg. Completion</p>
                  <h3 className="fw-bold mb-0" style={{ color: colors.warning }}>{averageCompletion}%</h3>
                </div>
                <div className="ms-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" 
                       style={{ backgroundColor: colors.warning, width: "50px", height: "50px" }}>
                    <FaChartBar className="text-white" style={{ fontSize: '1.5rem' }}></FaChartBar>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Button */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <button
                className="btn btn-primary"
                onClick={() => setShowAssignModal(true)}
              >
                <FaPlus className="me-2" />Assign Training
              </button>
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
                    className={`nav-link ${activeView === 'assign' ? 'active' : ''}`}
                    onClick={() => setActiveView('assign')}
                  >
                    <FaUserCheck className="me-2" />Assign Training
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeView === 'completion' ? 'active' : ''}`}
                    onClick={() => setActiveView('completion')}
                  >
                    <FaChartBar className="me-2" />Completion Tracking
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeView === 'assessment' ? 'active' : ''}`}
                    onClick={() => setActiveView('assessment')}
                  >
                    <FaClipboardCheck className="me-2" />Assessment Results
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Assign Training View */}
      {activeView === 'assign' && (
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Assigned Trainings</h5>
                <div className="d-flex align-items-center">
                  <div className="input-group" style={{ width: '250px' }}>
                    <span className="input-group-text">
                      <FaSearch />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Course</th>
                        <th>Assign Date</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Completion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAssignedTrainings.map((training) => (
                        <tr key={training.id}>
                          <td>{training.employeeName}</td>
                          <td>{training.courseTitle}</td>
                          <td>{training.assignDate}</td>
                          <td>{training.dueDate}</td>
                          <td>
                            <span className={`badge ${getStatusBadgeClass(training.status)}`}>
                              {training.status}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="progress flex-grow-1 me-2" style={{ height: '10px' }}>
                                <div 
                                  className="progress-bar" 
                                  role="progressbar" 
                                  style={{ 
                                    width: `${training.completion}%`,
                                    backgroundColor: getCompletionColor(training.completion)
                                  }}
                                ></div>
                              </div>
                              <span>{training.completion}%</span>
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
      
      {/* Completion Tracking View */}
      {activeView === 'completion' && (
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Completion Tracking</h5>
                <div className="d-flex align-items-center">
                  <div className="input-group" style={{ width: '250px' }}>
                    <span className="input-group-text">
                      <FaSearch />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Course</th>
                        <th>Assign Date</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Completion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAssignedTrainings.map((training) => (
                        <tr key={training.id}>
                          <td>{training.employeeName}</td>
                          <td>{training.courseTitle}</td>
                          <td>{training.assignDate}</td>
                          <td>{training.dueDate}</td>
                          <td>
                            <span className={`badge ${getStatusBadgeClass(training.status)}`}>
                              {training.status}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="progress flex-grow-1 me-2" style={{ height: '15px' }}>
                                <div 
                                  className="progress-bar" 
                                  role="progressbar" 
                                  style={{ 
                                    width: `${training.completion}%`,
                                    backgroundColor: getCompletionColor(training.completion)
                                  }}
                                ></div>
                              </div>
                              <span className="fw-bold">{training.completion}%</span>
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
      
      {/* Assessment Results View */}
      {activeView === 'assessment' && (
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Assessment Results</h5>
                <div className="d-flex align-items-center">
                  <div className="input-group" style={{ width: '250px' }}>
                    <span className="input-group-text">
                      <FaSearch />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Course</th>
                        <th>Assessment Date</th>
                        <th>Score</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAssessmentResults.map((result) => (
                        <tr key={result.id}>
                          <td>{result.employeeName}</td>
                          <td>{result.courseTitle}</td>
                          <td>{result.assessmentDate}</td>
                          <td>
                            <span className={`badge ${getScoreBadgeClass(result.score)}`}>
                              {result.score}%
                            </span>
                          </td>
                          <td>
                            <span className={`badge ${getStatusBadgeClass(result.status)}`}>
                              {result.status}
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
      )}
      
      {/* Assign Training Modal */}
      {showAssignModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Assign Training to Employee</h5>
                <button type="button" className="btn-close" onClick={() => setShowAssignModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAssignTraining}>
                  <div className="mb-3">
                    <label className="form-label">Select Employee</label>
                    <select
                      className="form-select"
                      value={assignForm.employeeId}
                      onChange={(e) => setAssignForm({...assignForm, employeeId: e.target.value})}
                      required
                    >
                      <option value="">Select Employee</option>
                      {employees.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                          {employee.name} - {employee.department}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Select Course</label>
                    <select
                      className="form-select"
                      value={assignForm.courseId}
                      onChange={(e) => setAssignForm({...assignForm, courseId: e.target.value})}
                      required
                    >
                      <option value="">Select Course</option>
                      {trainingCourses.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.title} - {course.duration}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Due Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={assignForm.dueDate}
                      onChange={(e) => setAssignForm({...assignForm, dueDate: e.target.value})}
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-secondary me-2" onClick={() => setShowAssignModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Assign Training</button>
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

export default EmployerTraining;