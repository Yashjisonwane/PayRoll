import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPlus, FaUpload, FaChartBar, FaBook, FaUsers, FaCheckCircle, FaTimesCircle, FaClock, FaGraduationCap, FaPlay, FaFileAlt, FaUserGraduate } from 'react-icons/fa';

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

const AdminTraining = () => {
  const [activeView, setActiveView] = useState('courses');
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // Sample training courses data
  const [trainingCourses, setTrainingCourses] = useState([
    { 
      id: 1, 
      title: 'Advanced JavaScript', 
      instructor: 'John Doe', 
      duration: '4 weeks', 
      status: 'Active',
      enrolled: 45,
      completed: 32,
      category: 'Technical'
    },
    { 
      id: 2, 
      title: 'Leadership Skills', 
      instructor: 'Jane Smith', 
      duration: '2 weeks', 
      status: 'Active',
      enrolled: 28,
      completed: 15,
      category: 'Soft Skills'
    },
    { 
      id: 3, 
      title: 'Project Management', 
      instructor: 'Mike Johnson', 
      duration: '6 weeks', 
      status: 'Upcoming',
      enrolled: 0,
      completed: 0,
      category: 'Management'
    },
    { 
      id: 4, 
      title: 'Communication Excellence', 
      instructor: 'Sarah Williams', 
      duration: '3 weeks', 
      status: 'Completed',
      enrolled: 35,
      completed: 35,
      category: 'Soft Skills'
    }
  ]);
  
  // Sample employees data
  const [employees] = useState([
    { id: 1, name: 'Rahul Sharma', department: 'Development', email: 'rahul@company.com' },
    { id: 2, name: 'Priya Patel', department: 'HR', email: 'priya@company.com' },
    { id: 3, name: 'Amit Kumar', department: 'Marketing', email: 'amit@company.com' },
    { id: 4, name: 'Neha Singh', department: 'Finance', email: 'neha@company.com' },
    { id: 5, name: 'Vikram Verma', department: 'Development', email: 'vikram@company.com' }
  ]);
  
  // Sample training materials
  const [trainingMaterials, setTrainingMaterials] = useState([
    { id: 1, courseId: 1, fileName: 'JavaScript_Basics.pdf', fileSize: '2.5 MB', uploadDate: '2023-12-01', type: 'PDF' },
    { id: 2, courseId: 1, fileName: 'Advanced_Concepts.mp4', fileSize: '150 MB', uploadDate: '2023-12-02', type: 'Video' },
    { id: 3, courseId: 2, fileName: 'Leadership_Guide.pdf', fileSize: '1.8 MB', uploadDate: '2023-12-03', type: 'PDF' },
    { id: 4, courseId: 2, fileName: 'Team_Activities.docx', fileSize: '850 KB', uploadDate: '2023-12-04', type: 'Document' }
  ]);
  
  // Sample training results
  const [trainingResults, setTrainingResults] = useState([
    { 
      id: 1, 
      courseTitle: 'Advanced JavaScript', 
      employeeName: 'Rahul Sharma', 
      score: 85, 
      status: 'Completed',
      completionDate: '2023-12-01',
      certificate: 'Generated'
    },
    { 
      id: 2, 
      courseTitle: 'Leadership Skills', 
      employeeName: 'Priya Patel', 
      score: 92, 
      status: 'Completed',
      completionDate: '2023-11-28',
      certificate: 'Generated'
    },
    { 
      id: 3, 
      courseTitle: 'Advanced JavaScript', 
      employeeName: 'Amit Kumar', 
      score: 78, 
      status: 'In Progress',
      completionDate: '-',
      certificate: 'Pending'
    },
    { 
      id: 4, 
      courseTitle: 'Communication Excellence', 
      employeeName: 'Neha Singh', 
      score: 88, 
      status: 'Completed',
      completionDate: '2023-11-25',
      certificate: 'Generated'
    }
  ]);
  
  // Form states
  const [courseForm, setCourseForm] = useState({
    title: '',
    instructor: '',
    duration: '',
    category: 'Technical',
    description: ''
  });
  
  const [assignForm, setAssignForm] = useState({
    courseId: '',
    employees: [],
    dueDate: ''
  });
  
  const [uploadForm, setUploadForm] = useState({
    courseId: '',
    fileName: '',
    file: null
  });
  
  const [completionForm, setCompletionForm] = useState({
    employeeId: '',
    courseId: '',
    score: '',
    status: 'Completed'
  });
  
  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleAddCourse = (e) => {
    e.preventDefault();
    const newCourse = {
      id: trainingCourses.length + 1,
      title: courseForm.title,
      instructor: courseForm.instructor,
      duration: courseForm.duration,
      status: 'Upcoming',
      enrolled: 0,
      completed: 0,
      category: courseForm.category
    };
    setTrainingCourses([...trainingCourses, newCourse]);
    setShowAddCourseModal(false);
    setCourseForm({ title: '', instructor: '', duration: '', category: 'Technical', description: '' });
    alert('Training course added successfully!');
  };
  
  const handleAssignTraining = (e) => {
    e.preventDefault();
    alert(`Training assigned to ${assignForm.employees.length} employees successfully!`);
    setShowAssignModal(false);
    setAssignForm({ courseId: '', employees: [], dueDate: '' });
  };
  
  const handleUploadMaterial = (e) => {
    e.preventDefault();
    const newMaterial = {
      id: trainingMaterials.length + 1,
      courseId: parseInt(uploadForm.courseId),
      fileName: uploadForm.fileName,
      fileSize: '2.5 MB',
      uploadDate: new Date().toISOString().split('T')[0],
      type: 'PDF'
    };
    setTrainingMaterials([...trainingMaterials, newMaterial]);
    setShowUploadModal(false);
    setUploadForm({ courseId: '', fileName: '', file: null });
    alert('Training material uploaded successfully!');
  };
  
  const handleMarkCompletion = (e) => {
    e.preventDefault();
    const newResult = {
      id: trainingResults.length + 1,
      courseTitle: trainingCourses.find(c => c.id === parseInt(completionForm.courseId))?.title || '',
      employeeName: employees.find(emp => emp.id === parseInt(completionForm.employeeId))?.name || '',
      score: completionForm.score,
      status: completionForm.status,
      completionDate: new Date().toISOString().split('T')[0],
      certificate: completionForm.status === 'Completed' ? 'Generated' : 'Pending'
    };
    setTrainingResults([...trainingResults, newResult]);
    setShowCompletionModal(false);
    setCompletionForm({ employeeId: '', courseId: '', score: '', status: 'Completed' });
    alert('Training completion marked successfully!');
  };
  
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-success';
      case 'Completed':
        return 'bg-primary';
      case 'Upcoming':
        return 'bg-warning';
      case 'In Progress':
        return 'bg-info';
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
  
  return (
    <div className="container-fluid py-4" style={{ minHeight: '100vh', backgroundColor: colors.light }}>
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="fw-bold" style={{ color: colors.primary }}>Training Management</h1>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="row mb-4">
        <div className="col-12 col-sm-6 col-lg-3 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <p className="mb-1 text-muted">Total Courses</p>
                  <h3 className="fw-bold mb-0" style={{ color: colors.primary }}>{trainingCourses.length}</h3>
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
                  <p className="mb-1 text-muted">Active Courses</p>
                  <h3 className="fw-bold mb-0" style={{ color: colors.success }}>
                    {trainingCourses.filter(c => c.status === 'Active').length}
                  </h3>
                </div>
                <div className="ms-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" 
                       style={{ backgroundColor: colors.success, width: "50px", height: "50px" }}>
                    <FaPlay className="text-white" style={{ fontSize: '1.5rem' }}></FaPlay>
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
                  <p className="mb-1 text-muted">Total Enrolled</p>
                  <h3 className="fw-bold mb-0" style={{ color: colors.warning }}>
                    {trainingCourses.reduce((sum, course) => sum + course.enrolled, 0)}
                  </h3>
                </div>
                <div className="ms-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" 
                       style={{ backgroundColor: colors.warning, width: "50px", height: "50px" }}>
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
                  <p className="mb-1 text-muted">Completed</p>
                  <h3 className="fw-bold mb-0" style={{ color: colors.info }}>
                    {trainingCourses.reduce((sum, course) => sum + course.completed, 0)}
                  </h3>
                </div>
                <div className="ms-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" 
                       style={{ backgroundColor: colors.info, width: "50px", height: "50px" }}>
                    <FaCheckCircle className="text-white" style={{ fontSize: '1.5rem' }}></FaCheckCircle>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex flex-wrap gap-2">
                <button
                  className="btn btn-primary"
                  onClick={() => setShowAddCourseModal(true)}
                >
                  <FaPlus className="me-2" />Add Training Course
                </button>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => setShowAssignModal(true)}
                >
                  <FaUsers className="me-2" />Assign Training
                </button>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => setShowUploadModal(true)}
                >
                  <FaUpload className="me-2" />Upload Material
                </button>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => setShowCompletionModal(true)}
                >
                  <FaCheckCircle className="me-2" />Mark Completion
                </button>
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
                    className={`nav-link ${activeView === 'courses' ? 'active' : ''}`}
                    onClick={() => setActiveView('courses')}
                  >
                    <FaBook className="me-2" />Courses
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeView === 'materials' ? 'active' : ''}`}
                    onClick={() => setActiveView('materials')}
                  >
                    <FaFileAlt className="me-2" />Materials
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeView === 'results' ? 'active' : ''}`}
                    onClick={() => setActiveView('results')}
                  >
                    <FaChartBar className="me-2" />Results Dashboard
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Courses View */}
      {activeView === 'courses' && (
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h5 className="mb-0">Training Courses</h5>
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
                        <th>Status</th>
                        <th>Enrolled</th>
                        <th>Completed</th>
                        <th>Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trainingCourses.map((course) => (
                        <tr key={course.id}>
                          <td>{course.title}</td>
                          <td>{course.instructor}</td>
                          <td>{course.duration}</td>
                          <td>{course.category}</td>
                          <td>
                            <span className={`badge ${getStatusBadgeClass(course.status)}`}>
                              {course.status}
                            </span>
                          </td>
                          <td>{course.enrolled}</td>
                          <td>{course.completed}</td>
                          <td>
                            <div className="progress" style={{ height: '20px' }}>
                              <div 
                                className="progress-bar" 
                                role="progressbar" 
                                style={{ 
                                  width: `${course.enrolled > 0 ? (course.completed / course.enrolled) * 100 : 0}%`,
                                  backgroundColor: colors.primary
                                }}
                              >
                                {course.enrolled > 0 ? Math.round((course.completed / course.enrolled) * 100) : 0}%
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
      
      {/* Materials View */}
      {activeView === 'materials' && (
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h5 className="mb-0">Training Materials</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>File Name</th>
                        <th>Course</th>
                        <th>Type</th>
                        <th>File Size</th>
                        <th>Upload Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trainingMaterials.map((material) => (
                        <tr key={material.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <FaFileAlt className="me-2 text-primary" />
                              {material.fileName}
                            </div>
                          </td>
                          <td>{trainingCourses.find(c => c.id === material.courseId)?.title || 'Unknown'}</td>
                          <td>
                            <span className="badge bg-secondary">{material.type}</span>
                          </td>
                          <td>{material.fileSize}</td>
                          <td>{material.uploadDate}</td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-1">Download</button>
                            <button className="btn btn-sm btn-outline-danger">Delete</button>
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
      
      {/* Results Dashboard View */}
      {activeView === 'results' && (
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h5 className="mb-0">Training Results Dashboard</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Course</th>
                        <th>Score</th>
                        <th>Status</th>
                        <th>Completion Date</th>
                        <th>Certificate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trainingResults.map((result) => (
                        <tr key={result.id}>
                          <td>{result.employeeName}</td>
                          <td>{result.courseTitle}</td>
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
                          <td>{result.completionDate}</td>
                          <td>
                            <span className={`badge ${result.certificate === 'Generated' ? 'bg-success' : 'bg-warning'}`}>
                              {result.certificate}
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
      
      {/* Add Course Modal */}
      {showAddCourseModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Training Course</h5>
                <button type="button" className="btn-close" onClick={() => setShowAddCourseModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAddCourse}>
                  <div className="mb-3">
                    <label className="form-label">Course Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={courseForm.title}
                      onChange={(e) => setCourseForm({...courseForm, title: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Instructor</label>
                    <input
                      type="text"
                      className="form-control"
                      value={courseForm.instructor}
                      onChange={(e) => setCourseForm({...courseForm, instructor: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Duration</label>
                    <input
                      type="text"
                      className="form-control"
                      value={courseForm.duration}
                      onChange={(e) => setCourseForm({...courseForm, duration: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select
                      className="form-select"
                      value={courseForm.category}
                      onChange={(e) => setCourseForm({...courseForm, category: e.target.value})}
                    >
                      <option value="Technical">Technical</option>
                      <option value="Soft Skills">Soft Skills</option>
                      <option value="Management">Management</option>
                      <option value="Compliance">Compliance</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={courseForm.description}
                      onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-secondary me-2" onClick={() => setShowAddCourseModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Add Course</button>
                  </div>
                </form>
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
                <h5 className="modal-title">Assign Training to Employees</h5>
                <button type="button" className="btn-close" onClick={() => setShowAssignModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAssignTraining}>
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
                        <option key={course.id} value={course.id}>{course.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Select Employees</label>
                    <div className="border rounded p-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                      {employees.map((employee) => (
                        <div key={employee.id} className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`emp-${employee.id}`}
                            checked={assignForm.employees.includes(employee.id.toString())}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setAssignForm({...assignForm, employees: [...assignForm.employees, employee.id.toString()]});
                              } else {
                                setAssignForm({...assignForm, employees: assignForm.employees.filter(id => id !== employee.id.toString())});
                              }
                            }}
                          />
                          <label className="form-check-label" htmlFor={`emp-${employee.id}`}>
                            {employee.name} - {employee.department}
                          </label>
                        </div>
                      ))}
                    </div>
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
      
      {/* Upload Material Modal */}
      {showUploadModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Upload Training Material</h5>
                <button type="button" className="btn-close" onClick={() => setShowUploadModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleUploadMaterial}>
                  <div className="mb-3">
                    <label className="form-label">Select Course</label>
                    <select
                      className="form-select"
                      value={uploadForm.courseId}
                      onChange={(e) => setUploadForm({...uploadForm, courseId: e.target.value})}
                      required
                    >
                      <option value="">Select Course</option>
                      {trainingCourses.map((course) => (
                        <option key={course.id} value={course.id}>{course.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">File Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={uploadForm.fileName}
                      onChange={(e) => setUploadForm({...uploadForm, fileName: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Choose File</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => setUploadForm({...uploadForm, file: e.target.files[0]})}
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-secondary me-2" onClick={() => setShowUploadModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Upload</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Mark Completion Modal */}
      {showCompletionModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Mark Training Completion</h5>
                <button type="button" className="btn-close" onClick={() => setShowCompletionModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleMarkCompletion}>
                  <div className="mb-3">
                    <label className="form-label">Select Employee</label>
                    <select
                      className="form-select"
                      value={completionForm.employeeId}
                      onChange={(e) => setCompletionForm({...completionForm, employeeId: e.target.value})}
                      required
                    >
                      <option value="">Select Employee</option>
                      {employees.map((employee) => (
                        <option key={employee.id} value={employee.id}>{employee.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Select Course</label>
                    <select
                      className="form-select"
                      value={completionForm.courseId}
                      onChange={(e) => setCompletionForm({...completionForm, courseId: e.target.value})}
                      required
                    >
                      <option value="">Select Course</option>
                      {trainingCourses.map((course) => (
                        <option key={course.id} value={course.id}>{course.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Score (%)</label>
                    <input
                      type="number"
                      className="form-control"
                      min="0"
                      max="100"
                      value={completionForm.score}
                      onChange={(e) => setCompletionForm({...completionForm, score: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      className="form-select"
                      value={completionForm.status}
                      onChange={(e) => setCompletionForm({...completionForm, status: e.target.value})}
                    >
                      <option value="Completed">Completed</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Failed">Failed</option>
                    </select>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-secondary me-2" onClick={() => setShowCompletionModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Mark Completion</button>
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

export default AdminTraining;