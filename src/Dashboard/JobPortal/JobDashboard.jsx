// src/pages/JobSeeker/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Table, Badge, Button, Modal, Form, Alert } from 'react-bootstrap';
import { 
  FaBriefcase, 
  FaUser, 
  FaCalendarAlt, 
  FaEnvelope, 
  FaPhone,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaFilter,
  FaFileUpload,
  FaChartBar,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowLeft,
  FaClock,
  FaMapMarkerAlt,
  FaBuilding,
  FaBookmark
} from 'react-icons/fa';

// Color Palette
const colors = {
  primaryRed: '#C62828',
  darkRed: '#B71C1C',
  white: '#FFFFFF',
  black: '#000000',
  darkGray: '#4A4A4A',
  lightGray: '#E2E2E2',
  lightBg: '#F8F9FA',
  successGreen: '#28A745',
  warningOrange: '#FFC107',
  lightRed: '#FFEBEE',
};

const JobSeekerDashboard = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Track window width for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+91 9876543210',
    location: 'Mumbai, India',
    profileImage: 'https://picsum.photos/seed/jobseeker123/200/200.jpg',
    totalApplications: 15,
    profileViews: 245,
    resumeUploaded: true,
    lastActive: '2023-07-10'
  });

  const [applications, setApplications] = useState([
    { 
      id: 1, 
      jobTitle: 'Senior React Developer', 
      company: 'Tech Solutions Pvt. Ltd.',
      location: 'Bangalore, India',
      salary: '₹12-15 LPA',
      appliedDate: '2023-07-01',
      status: 'Pending',
      jobType: 'Full-time',
      experience: '3-5 years'
    },
    { 
      id: 2, 
      jobTitle: 'Frontend Developer', 
      company: 'Digital Innovations',
      location: 'Mumbai, India',
      salary: '₹8-10 LPA',
      appliedDate: '2023-06-28',
      status: 'Accepted',
      jobType: 'Full-time',
      experience: '2-4 years'
    },
    { 
      id: 3, 
      jobTitle: 'UI/UX Designer', 
      company: 'Creative Minds',
      location: 'Pune, India',
      salary: '₹6-8 LPA',
      appliedDate: '2023-06-25',
      status: 'Rejected',
      jobType: 'Full-time',
      experience: '1-3 years'
    },
    { 
      id: 4, 
      jobTitle: 'Full Stack Developer', 
      company: 'Tech Innovations',
      location: 'Hyderabad, India',
      salary: '₹10-14 LPA',
      appliedDate: '2023-06-20',
      status: 'Pending',
      jobType: 'Full-time',
      experience: '3-6 years'
    },
    { 
      id: 5, 
      jobTitle: 'Mobile App Developer', 
      company: 'AppWorks',
      location: 'Remote',
      salary: '₹8-12 LPA',
      appliedDate: '2023-06-15',
      status: 'Pending',
      jobType: 'Remote',
      experience: '2-5 years'
    }
  ]);

  const [savedJobs, setSavedJobs] = useState([
    { 
      id: 6, 
      title: 'Backend Developer', 
      company: 'ServerSide Tech',
      location: 'Chennai, India',
      salary: '₹9-13 LPA',
      postedDate: '2023-07-05',
      experience: '2-5 years',
      jobType: 'Full-time'
    },
    { 
      id: 7, 
      title: 'Data Scientist', 
      company: 'DataDriven Inc.',
      location: 'Delhi, India',
      salary: '₹15-20 LPA',
      postedDate: '2023-07-04',
      experience: '3-6 years',
      jobType: 'Full-time'
    }
  ]);

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 15px',
  };

  const cardStyle = {
    backgroundColor: colors.white,
    border: `1px solid ${colors.lightGray}`,
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    marginBottom: '20px',
    transition: 'transform 0.3s ease',
    height: '100%',
    overflow: 'hidden',
  };

  const headerStyle = {
    backgroundColor: colors.primaryRed,
    color: colors.white,
    padding: '12px 16px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
  };

  const buttonStyle = {
    backgroundColor: colors.primaryRed,
    color: colors.white,
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontWeight: '500',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
  };

  const secondaryButtonStyle = {
    backgroundColor: 'transparent',
    color: colors.primaryRed,
    border: `1px solid ${colors.primaryRed}`,
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontWeight: '500',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
    setShowApplicationModal(true);
  };

  const handleDeleteApplication = (appId) => {
    setApplications(applications.filter(app => app.id !== appId));
    alert('Application deleted successfully!');
  };

  const handleSaveJob = (job) => {
    const isAlreadySaved = savedJobs.some(savedJob => savedJob.id === job.id);
    if (isAlreadySaved) {
      alert('This job is already saved!');
    } else {
      setSavedJobs([...savedJobs, job]);
      alert('Job saved successfully!');
    }
  };

  const handleUnsaveJob = (jobId) => {
    setSavedJobs(savedJobs.filter(job => job.id !== jobId));
    alert('Job removed from saved list!');
  };

  const filteredApplications = applications.filter(app => 
    app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.company.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(app => 
    filterStatus === 'all' || app.status === filterStatus
  );

  // Responsive application table component
  const ResponsiveApplicationTable = () => {
    if (windowWidth < 768) {
      // Mobile view - card layout
      return (
        <div className="application-cards">
          {filteredApplications.map(application => (
            <Card key={application.id} className="mb-3" style={{ border: `1px solid ${colors.lightGray}` }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h5 style={{ fontSize: '14px', fontWeight: '600', margin: 0 }}>{application.jobTitle}</h5>
                    <p style={{ fontSize: '12px', color: colors.darkGray, margin: 0 }}>{application.company}</p>
                  </div>
                  <Badge 
                    bg={
                      application.status === 'Accepted' ? 'success' : 
                      application.status === 'Rejected' ? 'danger' : 'warning'
                    }
                    style={{ fontSize: '11px' }}
                  >
                    {application.status}
                  </Badge>
                </div>
                
                <div className="mb-2">
                  <div className="d-flex align-items-center mb-1">
                    <FaMapMarkerAlt className="me-2" size={12} color={colors.darkGray} />
                    <span style={{ fontSize: '12px', color: colors.darkGray }}>{application.location}</span>
                  </div>
                  <div className="d-flex align-items-center mb-1">
                    <FaClock className="me-2" size={12} color={colors.darkGray} />
                    <span style={{ fontSize: '12px', color: colors.darkGray }}>Applied: {formatDate(application.appliedDate)}</span>
                  </div>
                </div>
                
                <div className="d-flex justify-content-between">
                  <Button 
                    variant="link" 
                    size="sm"
                    style={{ color: colors.primaryRed, padding: '0', fontSize: '12px' }}
                    onClick={() => handleViewApplication(application)}
                  >
                    <FaEye /> View
                  </Button>
                  <Button 
                    variant="link" 
                    size="sm"
                    style={{ color: colors.primaryRed, padding: '0', fontSize: '12px' }}
                    onClick={() => handleDeleteApplication(application.id)}
                  >
                    <FaTrash /> Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      );
    } else {
      // Desktop view - table layout
      return (
        <div className="table-responsive">
          <Table hover className="align-middle" style={{ fontSize: '13px' }}>
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Company</th>
                <th>Location</th>
                <th>Applied Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map(application => (
                <tr key={application.id}>
                  <td style={{ fontWeight: '600', fontSize: '12px' }}>{application.jobTitle}</td>
                  <td style={{ fontSize: '12px' }}>{application.company}</td>
                  <td style={{ fontSize: '12px' }}>{application.location}</td>
                  <td style={{ fontSize: '12px' }}>{formatDate(application.appliedDate)}</td>
                  <td>
                    <Badge 
                      bg={
                        application.status === 'Accepted' ? 'success' : 
                        application.status === 'Rejected' ? 'danger' : 'warning'
                      }
                      style={{ fontSize: '11px' }}
                    >
                      {application.status}
                    </Badge>
                  </td>
                  <td>
                    <div className="d-flex">
                      <Button 
                        variant="link" 
                        size="sm"
                        style={{ color: colors.primaryRed, padding: '0', fontSize: '12px', marginRight: '8px' }}
                        onClick={() => handleViewApplication(application)}
                      >
                        <FaEye />
                      </Button>
                      <Button 
                        variant="link" 
                        size="sm"
                        style={{ color: colors.primaryRed, padding: '0', fontSize: '12px' }}
                        onClick={() => handleDeleteApplication(application.id)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      );
    }
  };

  // Responsive saved jobs table component
  const ResponsiveSavedJobsTable = () => {
    if (windowWidth < 768) {
      // Mobile view - card layout
      return (
        <div className="saved-jobs-cards">
          {savedJobs.map(job => (
            <Card key={job.id} className="mb-3" style={{ border: `1px solid ${colors.lightGray}` }}>
              <Card.Body>
                <div className="mb-2">
                  <h5 style={{ fontSize: '14px', fontWeight: '600', margin: 0 }}>{job.title}</h5>
                  <p style={{ fontSize: '12px', color: colors.darkGray, margin: 0 }}>{job.company}</p>
                </div>
                
                <div className="mb-2">
                  <div className="d-flex align-items-center mb-1">
                    <FaMapMarkerAlt className="me-2" size={12} color={colors.darkGray} />
                    <span style={{ fontSize: '12px', color: colors.darkGray }}>{job.location}</span>
                  </div>
                  <div className="d-flex align-items-center mb-1">
                    <FaClock className="me-2" size={12} color={colors.darkGray} />
                    <span style={{ fontSize: '12px', color: colors.darkGray }}>Posted: {formatDate(job.postedDate)}</span>
                  </div>
                </div>
                
                <div className="d-flex justify-content-between">
                  <Button 
                    variant="link" 
                    size="sm"
                    style={{ color: colors.primaryRed, padding: '0', fontSize: '12px' }}
                    onClick={() => navigate(`/JobSeeker/apply/${job.id}`)}
                  >
                    <FaBriefcase /> Apply
                  </Button>
                  <Button 
                    variant="link" 
                    size="sm"
                    style={{ color: colors.primaryRed, padding: '0', fontSize: '12px' }}
                    onClick={() => handleUnsaveJob(job.id)}
                  >
                    <FaTrash /> Remove
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      );
    } else {
      // Desktop view - table layout
      return (
        <div className="table-responsive">
          <Table hover className="align-middle" style={{ fontSize: '13px' }}>
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Company</th>
                <th>Location</th>
                <th>Posted Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {savedJobs.map(job => (
                <tr key={job.id}>
                  <td style={{ fontWeight: '600', fontSize: '12px' }}>{job.title}</td>
                  <td style={{ fontSize: '12px' }}>{job.company}</td>
                  <td style={{ fontSize: '12px' }}>{job.location}</td>
                  <td style={{ fontSize: '12px' }}>{formatDate(job.postedDate)}</td>
                  <td>
                    <div className="d-flex">
                      <Button 
                        variant="link" 
                        size="sm"
                        style={{ color: colors.primaryRed, padding: '0', fontSize: '12px', marginRight: '8px' }}
                        onClick={() => navigate(`/JobSeeker/apply/${job.id}`)}
                      >
                        <FaBriefcase />
                      </Button>
                      <Button 
                        variant="link" 
                        size="sm"
                        style={{ color: colors.primaryRed, padding: '0', fontSize: '12px' }}
                        onClick={() => handleUnsaveJob(job.id)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      );
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
     

      <div style={containerStyle} className="py-4">
        {/* Profile Card */}
        <Row className="g-4 mb-4">
          <Col lg={4} md={6}>
            <Card style={cardStyle}>
              <div style={headerStyle}>
                <FaUser className="me-2" />
                Profile Overview
              </div>
              <Card.Body className="text-center p-3 p-md-4">
                <img 
                  src={userProfile.profileImage} 
                  alt="Profile" 
                  className="rounded-circle mb-3" 
                  style={{ 
                    width: windowWidth < 576 ? '80px' : '120px', 
                    height: windowWidth < 576 ? '80px' : '120px', 
                    objectFit: 'cover', 
                    border: `3px solid ${colors.primaryRed}` 
                  }}
                />
                <h4 style={{ color: colors.black, marginBottom: '5px', fontSize: windowWidth < 576 ? '18px' : '24px' }}>
                  {userProfile.name}
                </h4>
                <p style={{ color: colors.darkGray, marginBottom: '5px', fontSize: windowWidth < 576 ? '14px' : '16px' }}>
                  {userProfile.email}
                </p>
                <p style={{ color: colors.darkGray, marginBottom: '5px', fontSize: windowWidth < 576 ? '14px' : '16px' }}>
                  {userProfile.phone}
                </p>
                <p style={{ color: colors.darkGray, marginBottom: '15px', fontSize: windowWidth < 576 ? '14px' : '16px' }}>
                  {userProfile.location}
                </p>
                <Button 
                  style={buttonStyle}
                  onMouseEnter={(e) => e.target.style.backgroundColor = colors.darkRed}
                  onMouseLeave={(e) => e.target.style.backgroundColor = colors.primaryRed}
                  onClick={() => setShowProfileModal(true)}
                >
                  <FaEdit className="me-1" />
                  Edit Profile
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6}>
            <Card style={cardStyle}>
              <div style={headerStyle}>
                <FaChartBar className="me-2" />
                Application Stats
              </div>
              <Card.Body className="p-3 p-md-4">
                <div className="mb-3 mb-md-4">
                  <h5 style={{ color: colors.darkGray, fontSize: '14px', fontWeight: '500' }}>Total Applications</h5>
                  <h3 style={{ 
                    color: colors.primaryRed, 
                    fontWeight: '700',
                    fontSize: windowWidth < 576 ? '24px' : '28px'
                  }}>
                    {userProfile.totalApplications}
                  </h3>
                </div>
                <div className="mb-3 mb-md-4">
                  <h5 style={{ color: colors.darkGray, fontSize: '14px', fontWeight: '500' }}>Profile Views</h5>
                  <h3 style={{ 
                    color: colors.black, 
                    fontWeight: '600',
                    fontSize: windowWidth < 576 ? '24px' : '28px'
                  }}>
                    {userProfile.profileViews}
                  </h3>
                </div>
                <div className="mb-3 mb-md-4">
                  <h5 style={{ color: colors.darkGray, fontSize: '14px', fontWeight: '500' }}>Resume Status</h5>
                  <h5 style={{ 
                    color: userProfile.resumeUploaded ? colors.successGreen : colors.warningOrange, 
                    fontWeight: '600',
                    fontSize: windowWidth < 576 ? '18px' : '20px'
                  }}>
                    {userProfile.resumeUploaded ? 'Uploaded' : 'Not Uploaded'}
                  </h5>
                </div>
                <div>
                  <h5 style={{ color: colors.darkGray, fontSize: '14px', fontWeight: '500' }}>Last Active</h5>
                  <h5 style={{ 
                    color: colors.black, 
                    fontWeight: '600',
                    fontSize: windowWidth < 576 ? '16px' : '18px'
                  }}>
                    {formatDate(userProfile.lastActive)}
                  </h5>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={12}>
            <Card style={cardStyle}>
              <div style={headerStyle}>
                <FaFileUpload className="me-2" />
                Quick Actions
              </div>
              <Card.Body className="p-3 p-md-4">
                <div className="mb-3">
                  <Button 
                    style={buttonStyle}
                    className="w-100 mb-2"
                    onMouseEnter={(e) => e.target.style.backgroundColor = colors.darkRed}
                    onMouseLeave={(e) => e.target.style.backgroundColor = colors.primaryRed}
                    onClick={() => navigate('/JobSeeker/submit-resume')}
                  >
                    <FaFileUpload className="me-1" />
                    {windowWidth < 576 ? 'Upload Resume' : 'Upload New Resume'}
                  </Button>
                </div>
                <div className="mb-3">
                  <Button 
                    style={secondaryButtonStyle}
                    className="w-100 mb-2"
                    onMouseEnter={(e) => e.target.style.backgroundColor = colors.lightRed}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    onClick={() => navigate('/JobSeeker/job-list')}
                  >
                    <FaSearch className="me-1" />
                    {windowWidth < 576 ? 'Find Jobs' : 'Browse Jobs'}
                  </Button>
                </div>
                <div>
                  <Button 
                    style={secondaryButtonStyle}
                    className="w-100"
                    onMouseEnter={(e) => e.target.style.backgroundColor = colors.lightRed}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    onClick={() => alert('Feature coming soon!')}
                  >
                    <FaChartBar className="me-1" />
                    {windowWidth < 576 ? 'Analytics' : 'View Analytics'}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Applications and Saved Jobs */}
        <Row className="g-4">
          <Col lg={8}>
            <Card style={cardStyle}>
              <div style={headerStyle}>
                <FaBriefcase className="me-2" />
                My Applications
                <div className="ms-auto d-flex">
                  <div className="input-group me-2" style={{ maxWidth: '200px' }}>
                    <span className="input-group-text" style={{ backgroundColor: colors.lightGray, border: 'none' }}>
                      <FaSearch size={12} color={colors.darkGray} />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ fontSize: '12px' }}
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    style={{ 
                      border: `1px solid ${colors.lightGray}`,
                      borderRadius: '4px',
                      padding: '4px 8px',
                      fontSize: '12px'
                    }}
                  >
                    <option value="all">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
              <Card.Body className="p-3 p-md-4">
                {filteredApplications.length > 0 ? (
                  <ResponsiveApplicationTable />
                ) : (
                  <div className="text-center py-4">
                    <FaBriefcase size={40} color={colors.lightGray} />
                    <p style={{ color: colors.darkGray, marginTop: '10px', fontSize: '14px' }}>
                      No applications found
                    </p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card style={cardStyle}>
              <div style={headerStyle}>
                <FaBookmark className="me-2" />
                Saved Jobs
              </div>
              <Card.Body className="p-3 p-md-4">
                {savedJobs.length > 0 ? (
                  <ResponsiveSavedJobsTable />
                ) : (
                  <div className="text-center py-4">
                    <FaBookmark size={40} color={colors.lightGray} />
                    <p style={{ color: colors.darkGray, marginTop: '10px', fontSize: '14px' }}>
                      No saved jobs yet
                    </p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Application Details Modal */}
      <Modal show={showApplicationModal} onHide={() => setShowApplicationModal(false)} centered size="lg">
        <Modal.Header closeButton style={{ backgroundColor: colors.primaryRed, color: colors.white }}>
          <Modal.Title>Application Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedApplication && (
            <div>
              <div className="mb-4">
                <h4 style={{ color: colors.black, fontWeight: '600', fontSize: '18px' }}>{selectedApplication.jobTitle}</h4>
                <h5 style={{ color: colors.darkGray, fontSize: '16px' }}>{selectedApplication.company}</h5>
              </div>
              
              <Row className="mb-3">
                <Col md={6}>
                  <h6 style={{ color: colors.darkGray, fontSize: '13px', fontWeight: '500' }}>Location</h6>
                  <p style={{ color: colors.black, margin: 0, fontSize: '14px' }}>
                    {selectedApplication.location}
                  </p>
                </Col>
                <Col md={6}>
                  <h6 style={{ color: colors.darkGray, fontSize: '13px', fontWeight: '500' }}>Salary</h6>
                  <p style={{ color: colors.black, margin: 0, fontSize: '14px' }}>
                    {selectedApplication.salary}
                  </p>
                </Col>
              </Row>
              
              <Row className="mb-3">
                <Col md={6}>
                  <h6 style={{ color: colors.darkGray, fontSize: '13px', fontWeight: '500' }}>Job Type</h6>
                  <p style={{ color: colors.black, margin: 0, fontSize: '14px' }}>
                    {selectedApplication.jobType}
                  </p>
                </Col>
                <Col md={6}>
                  <h6 style={{ color: colors.darkGray, fontSize: '13px', fontWeight: '500' }}>Experience</h6>
                  <p style={{ color: colors.black, margin: 0, fontSize: '14px' }}>
                    {selectedApplication.experience}
                  </p>
                </Col>
              </Row>
              
              <Row className="mb-3">
                <Col md={6}>
                  <h6 style={{ color: colors.darkGray, fontSize: '13px', fontWeight: '500' }}>Applied Date</h6>
                  <p style={{ color: colors.black, margin: 0, fontSize: '14px' }}>
                    {formatDate(selectedApplication.appliedDate)}
                  </p>
                </Col>
                <Col md={6}>
                  <h6 style={{ color: colors.darkGray, fontSize: '13px', fontWeight: '500' }}>Status</h6>
                  <Badge 
                    bg={
                      selectedApplication.status === 'Accepted' ? 'success' : 
                      selectedApplication.status === 'Rejected' ? 'danger' : 'warning'
                    }
                    style={{ fontSize: '12px' }}
                  >
                    {selectedApplication.status}
                  </Badge>
                </Col>
              </Row>
              
              <div className="d-flex justify-content-end">
                <Button 
                  variant="secondary" 
                  className="me-2"
                  onClick={() => setShowApplicationModal(false)}
                  style={{ fontSize: '13px' }}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* Profile Modal */}
      <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)} centered size="md">
        <Modal.Header closeButton style={{ backgroundColor: colors.primaryRed, color: colors.white }}>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '13px' }}>Full Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={userProfile.name}
                style={{ fontSize: '13px' }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '13px' }}>Email</Form.Label>
              <Form.Control
                type="email"
                defaultValue={userProfile.email}
                style={{ fontSize: '13px' }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '13px' }}>Phone</Form.Label>
              <Form.Control
                type="text"
                defaultValue={userProfile.phone}
                style={{ fontSize: '13px' }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '13px' }}>Location</Form.Label>
              <Form.Control
                type="text"
                defaultValue={userProfile.location}
                style={{ fontSize: '13px' }}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button 
                variant="secondary" 
                className="me-2"
                onClick={() => setShowProfileModal(false)}
                style={{ fontSize: '13px' }}
              >
                Cancel
              </Button>
              <Button type="submit" style={buttonStyle}>
                Save Changes
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default JobSeekerDashboard;