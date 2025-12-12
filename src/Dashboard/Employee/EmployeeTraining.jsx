import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBook, FaChartLine, FaClipboardCheck, FaAward, FaPlay, FaDownload, FaCheckCircle, FaTimesCircle, FaClock, FaUserCircle } from 'react-icons/fa';

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

const EmployeeTraining = () => {
  const [activeView, setActiveView] = useState('assigned');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [employeeName] = useState('Rahul Sharma');
  const [employeeId] = useState('EMP001');
  
  // Sample assigned trainings data
  const [assignedTrainings] = useState([
    { 
      id: 1, 
      title: 'Advanced JavaScript', 
      instructor: 'John Doe', 
      duration: '4 weeks', 
      category: 'Technical',
      assignDate: '2023-11-01', 
      dueDate: '2023-12-01', 
      status: 'In Progress',
      completion: 75,
      startDate: '2023-11-05'
    },
    { 
      id: 2, 
      title: 'Leadership Skills', 
      instructor: 'Jane Smith', 
      duration: '2 weeks', 
      category: 'Soft Skills',
      assignDate: '2023-11-10', 
      dueDate: '2023-11-24', 
      status: 'Completed',
      completion: 100,
      startDate: '2023-11-12'
    },
    { 
      id: 3, 
      title: 'Project Management', 
      instructor: 'Mike Johnson', 
      duration: '6 weeks', 
      category: 'Management',
      assignDate: '2023-11-15', 
      dueDate: '2023-12-27', 
      status: 'Not Started',
      completion: 0,
      startDate: '-'
    },
    { 
      id: 4, 
      title: 'Communication Excellence', 
      instructor: 'Sarah Williams', 
      duration: '3 weeks', 
      category: 'Soft Skills',
      assignDate: '2023-10-20', 
      dueDate: '2023-11-10', 
      status: 'Completed',
      completion: 100,
      startDate: '2023-10-22'
    }
  ]);
  
  // Sample assessment tests data
  const [assessmentTests] = useState([
    { 
      id: 1, 
      courseId: 1, 
      courseTitle: 'Advanced JavaScript', 
      title: 'JavaScript Fundamentals Quiz',
      testDate: '2023-11-20',
      duration: '30 minutes',
      questions: 25,
      status: 'Available',
      score: null,
      attemptDate: null
    },
    { 
      id: 2, 
      courseId: 2, 
      courseTitle: 'Leadership Skills', 
      title: 'Leadership Assessment',
      testDate: '2023-11-22',
      duration: '45 minutes',
      questions: 30,
      status: 'Completed',
      score: 92,
      attemptDate: '2023-11-22'
    },
    { 
      id: 3, 
      courseId: 3, 
      courseTitle: 'Project Management', 
      title: 'PM Basics Test',
      testDate: '2023-12-15',
      duration: '40 minutes',
      questions: 35,
      status: 'Locked',
      score: null,
      attemptDate: null
    },
    { 
      id: 4, 
      courseId: 4, 
      courseTitle: 'Communication Excellence', 
      title: 'Communication Skills Test',
      testDate: '2023-11-08',
      duration: '25 minutes',
      questions: 20,
      status: 'Completed',
      score: 88,
      attemptDate: '2023-11-08'
    }
  ]);
  
  // Sample certificates data
  const [certificates] = useState([
    { 
      id: 1, 
      courseId: 2, 
      courseTitle: 'Leadership Skills', 
      issueDate: '2023-11-25',
      certificateId: 'CERT-2023-LS-001',
      status: 'Available'
    },
    { 
      id: 2, 
      courseId: 4, 
      courseTitle: 'Communication Excellence', 
      issueDate: '2023-11-12',
      certificateId: 'CERT-2023-CE-002',
      status: 'Available'
    }
  ]);
  
  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-success';
      case 'In Progress':
        return 'bg-info';
      case 'Not Started':
        return 'bg-warning';
      case 'Available':
        return 'bg-success';
      case 'Locked':
        return 'bg-secondary';
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
  
  const handleStartTraining = (courseId) => {
    alert(`Starting training for course ID: ${courseId}`);
  };
  
  const handleTakeTest = (testId) => {
    alert(`Starting test for test ID: ${testId}`);
  };
  
  const handleDownloadCertificate = (certificateId) => {
    alert(`Downloading certificate: ${certificateId}`);
  };
  
  // Calculate statistics
  const totalTrainings = assignedTrainings.length;
  const completedTrainings = assignedTrainings.filter(t => t.status === 'Completed').length;
  const inProgressTrainings = assignedTrainings.filter(t => t.status === 'In Progress').length;
  const averageCompletion = totalTrainings > 0 
    ? Math.round(assignedTrainings.reduce((sum, t) => sum + t.completion, 0) / totalTrainings)
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
                  <FaUserCircle style={{ fontSize: '3rem', color: colors.primary }} />
                </div>
                <div>
                  <h1 className="fw-bold mb-1" style={{ color: colors.primary }}>My Training</h1>
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
                  <p className="mb-1 text-muted">Total Trainings</p>
                  <h3 className="fw-bold mb-0" style={{ color: colors.primary }}>{totalTrainings}</h3>
                </div>
                <div className="ms-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" 
                       style={{ backgroundColor: colors.primary, width: "50px", height: "50px" }}>
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
                  <h3 className="fw-bold mb-0" style={{ color: colors.success }}>{completedTrainings}</h3>
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
                  <p className="mb-1 text-muted">In Progress</p>
                  <h3 className="fw-bold mb-0" style={{ color: colors.info }}>{inProgressTrainings}</h3>
                </div>
                <div className="ms-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" 
                       style={{ backgroundColor: colors.info, width: "50px", height: "50px" }}>
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
                  <p className="mb-1 text-muted">Avg. Completion</p>
                  <h3 className="fw-bold mb-0" style={{ color: colors.warning }}>{averageCompletion}%</h3>
                </div>
                <div className="ms-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" 
                       style={{ backgroundColor: colors.warning, width: "50px", height: "50px" }}>
                    <FaChartLine className="text-white" style={{ fontSize: '1.5rem' }}></FaChartLine>
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
                    className={`nav-link ${activeView === 'assigned' ? 'active' : ''}`}
                    onClick={() => setActiveView('assigned')}
                  >
                    <FaBook className="me-2" />Assigned Trainings
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeView === 'progress' ? 'active' : ''}`}
                    onClick={() => setActiveView('progress')}
                  >
                    <FaChartLine className="me-2" />Current Progress
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeView === 'assessment' ? 'active' : ''}`}
                    onClick={() => setActiveView('assessment')}
                  >
                    <FaClipboardCheck className="me-2" />Assessment Tests
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeView === 'certificates' ? 'active' : ''}`}
                    onClick={() => setActiveView('certificates')}
                  >
                    <FaAward className="me-2" />Certificates
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Assigned Trainings View */}
      {activeView === 'assigned' && (
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h5 className="mb-0">Assigned Trainings</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Course Title</th>
                        <th>Instructor</th>
                        <th>Duration</th>
                        <th>Category</th>
                        <th>Assign Date</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assignedTrainings.map((training) => (
                        <tr key={training.id}>
                          <td>{training.title}</td>
                          <td>{training.instructor}</td>
                          <td>{training.duration}</td>
                          <td>{training.category}</td>
                          <td>{training.assignDate}</td>
                          <td>{training.dueDate}</td>
                          <td>
                            <span className={`badge ${getStatusBadgeClass(training.status)}`}>
                              {training.status}
                            </span>
                          </td>
                          <td>
                            {training.status === 'Not Started' ? (
                              <button
                                className="btn btn-sm btn-primary"
                                onClick={() => handleStartTraining(training.id)}
                              >
                                <FaPlay className="me-1" />Start
                              </button>
                            ) : training.status === 'In Progress' ? (
                              <button
                                className="btn btn-sm btn-info"
                                onClick={() => handleStartTraining(training.id)}
                              >
                                <FaPlay className="me-1" />Continue
                              </button>
                            ) : (
                              <button
                                className="btn btn-sm btn-success"
                                disabled
                              >
                                <FaCheckCircle className="me-1" />Completed
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
      
      {/* Current Progress View */}
      {activeView === 'progress' && (
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h5 className="mb-0">Current Training Progress</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Course Title</th>
                        <th>Start Date</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Completion</th>
                        <th>Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assignedTrainings.map((training) => (
                        <tr key={training.id}>
                          <td>{training.title}</td>
                          <td>{training.startDate}</td>
                          <td>{training.dueDate}</td>
                          <td>
                            <span className={`badge ${getStatusBadgeClass(training.status)}`}>
                              {training.status}
                            </span>
                          </td>
                          <td>{training.completion}%</td>
                          <td>
                            <div className="progress" style={{ height: '20px' }}>
                              <div 
                                className="progress-bar" 
                                role="progressbar" 
                                style={{ 
                                  width: `${training.completion}%`,
                                  backgroundColor: getCompletionColor(training.completion)
                                }}
                              >
                                {training.completion}%
                              </div>
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
      
      {/* Assessment Tests View */}
      {activeView === 'assessment' && (
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h5 className="mb-0">Assessment Tests</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Course</th>
                        <th>Test Title</th>
                        <th>Test Date</th>
                        <th>Duration</th>
                        <th>Questions</th>
                        <th>Status</th>
                        <th>Score</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assessmentTests.map((test) => (
                        <tr key={test.id}>
                          <td>{test.courseTitle}</td>
                          <td>{test.title}</td>
                          <td>{test.testDate}</td>
                          <td>{test.duration}</td>
                          <td>{test.questions}</td>
                          <td>
                            <span className={`badge ${getStatusBadgeClass(test.status)}`}>
                              {test.status}
                            </span>
                          </td>
                          <td>
                            {test.score !== null ? (
                              <span className={`badge ${getScoreBadgeClass(test.score)}`}>
                                {test.score}%
                              </span>
                            ) : (
                              <span className="badge bg-secondary">-</span>
                            )}
                          </td>
                          <td>
                            {test.status === 'Available' ? (
                              <button
                                className="btn btn-sm btn-primary"
                                onClick={() => handleTakeTest(test.id)}
                              >
                                Take Test
                              </button>
                            ) : test.status === 'Completed' ? (
                              <button
                                className="btn btn-sm btn-success"
                                disabled
                              >
                                Completed
                              </button>
                            ) : (
                              <button
                                className="btn btn-sm btn-secondary"
                                disabled
                              >
                                Locked
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
      
      {/* Certificates View */}
      {activeView === 'certificates' && (
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h5 className="mb-0">My Certificates</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Course Title</th>
                        <th>Certificate ID</th>
                        <th>Issue Date</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {certificates.map((certificate) => (
                        <tr key={certificate.id}>
                          <td>{certificate.courseTitle}</td>
                          <td>{certificate.certificateId}</td>
                          <td>{certificate.issueDate}</td>
                          <td>
                            <span className="badge bg-success">
                              {certificate.status}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() => handleDownloadCertificate(certificate.certificateId)}
                            >
                              <FaDownload className="me-1" />Download PDF
                            </button>
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

export default EmployeeTraining;