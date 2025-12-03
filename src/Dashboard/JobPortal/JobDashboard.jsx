// src/pages/JobSeeker/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Table, Badge, Button, Modal, Form, Alert, Dropdown } from 'react-bootstrap';
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
  FaCamera
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
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+91 9876543210',
    location: 'Mumbai, India',
    profileImage: 'https://picsum.photos/seed/jobseeker123/200/200.jpg',
  });
  
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

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 15px',
  };

  const cardStyle = {
    backgroundColor: colors.white,
    border: `1px solid ${colors.lightGray}`,
    borderRadius: '8px', // Reduced from 12px
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)', // Reduced shadow
    marginBottom: '12px', // Reduced from 20px
    transition: 'transform 0.3s ease',
    height: '100%',
    overflow: 'hidden',
  };

  const headerStyle = {
    backgroundColor: colors.primaryRed,
    color: colors.white,
    padding: '8px 12px', // Reduced from 12px 16px
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px', // Reduced from 14px
  };

  const buttonStyle = {
    backgroundColor: colors.primaryRed,
    color: colors.white,
    border: 'none',
    padding: '6px 12px', // Reduced from 8px 16px
    borderRadius: '4px', // Reduced from 6px
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontWeight: '500',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px', // Reduced from 6px
    fontSize: '11px', // Reduced from 12px
  };

  const secondaryButtonStyle = {
    backgroundColor: 'transparent',
    color: colors.primaryRed,
    border: `1px solid ${colors.primaryRed}`,
    padding: '6px 12px', // Reduced from 8px 16px
    borderRadius: '4px', // Reduced from 6px
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontWeight: '500',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px', // Reduced from 6px
    fontSize: '11px', // Reduced from 12px
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

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setUserProfile({
      ...userProfile,
      ...profileData
    });
    setShowProfileModal(false);
    alert('Profile updated successfully!');
  };

  const handleProfileChange = (field, value) => {
    setProfileData({
      ...profileData,
      [field]: value
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      // In a real app, you would upload file to a server
      // For this example, we'll create a local URL
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileData({
          ...profileData,
          profileImage: event.target.result
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
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
            <Card key={application.id} className="mb-2" style={{ border: `1px solid ${colors.lightGray}` }}>
              <Card.Body className="p-2">
                <div className="d-flex justify-content-between align-items-start mb-1">
                  <div>
                    <h5 style={{ fontSize: '12px', fontWeight: '600', margin: 0 }}>{application.jobTitle}</h5>
                    <p style={{ fontSize: '10px', color: colors.darkGray, margin: 0 }}>{application.company}</p>
                  </div>
                  <Badge 
                    bg={
                      application.status === 'Accepted' ? 'success' : 
                      application.status === 'Rejected' ? 'danger' : 'warning'
                    }
                    style={{ fontSize: '9px' }}
                  >
                    {application.status}
                  </Badge>
                </div>
                
                <div className="mb-1">
                  <div className="d-flex align-items-center mb-1">
                    <FaMapMarkerAlt className="me-1" size={10} color={colors.darkGray} />
                    <span style={{ fontSize: '10px', color: colors.darkGray }}>{application.location}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <FaClock className="me-1" size={10} color={colors.darkGray} />
                    <span style={{ fontSize: '10px', color: colors.darkGray }}>Applied: {formatDate(application.appliedDate)}</span>
                  </div>
                </div>
                
                <div className="d-flex justify-content-between mt-2">
                  <Button 
                    variant="link" 
                    size="sm"
                    style={{ color: colors.primaryRed, padding: '0', fontSize: '10px' }}
                    onClick={() => handleViewApplication(application)}
                  >
                    <FaEye /> View
                  </Button>
                  <Button 
                    variant="link" 
                    size="sm"
                    style={{ color: colors.primaryRed, padding: '0', fontSize: '10px' }}
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
          <Table hover className="align-middle" style={{ fontSize: '11px' }}>
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
                  <td style={{ fontWeight: '600', fontSize: '10px' }}>{application.jobTitle}</td>
                  <td style={{ fontSize: '10px' }}>{application.company}</td>
                  <td style={{ fontSize: '10px' }}>{application.location}</td>
                  <td style={{ fontSize: '10px' }}>{formatDate(application.appliedDate)}</td>
                  <td>
                    <Badge 
                      bg={
                        application.status === 'Accepted' ? 'success' : 
                        application.status === 'Rejected' ? 'danger' : 'warning'
                      }
                      style={{ fontSize: '9px' }}
                    >
                      {application.status}
                    </Badge>
                  </td>
                  <td>
                    <div className="d-flex">
                      <Button 
                        variant="link" 
                        size="sm"
                        style={{ color: colors.primaryRed, padding: '0', fontSize: '10px', marginRight: '8px' }}
                        onClick={() => handleViewApplication(application)}
                      >
                        <FaEye />
                      </Button>
                      <Button 
                        variant="link" 
                        size="sm"
                        style={{ color: colors.primaryRed, padding: '0', fontSize: '10px' }}
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

  return (
    <div style={{ minHeight: '100vh' }}>
      <div style={containerStyle} className="py-3">
        {/* Profile Card */}
        <Row className="g-3 mb-3">
          <Col lg={6} md={6}>
            <Card style={cardStyle}>
              <div style={headerStyle}>
                <FaUser className="me-2" />
                Profile Overview
              </div>
              <Card.Body className="text-center p-2">
                <div className="position-relative d-inline-block mb-2">
                  <img 
                    src={userProfile.profileImage} 
                    alt="Profile" 
                    className="rounded-circle" 
                    style={{ 
                      width: windowWidth < 576 ? '60px' : '80px', // Reduced from 80px and 120px
                      height: windowWidth < 576 ? '60px' : '80px', 
                      objectFit: 'cover', 
                      border: `2px solid ${colors.primaryRed}` // Reduced from 3px
                    }}
                  />
                </div>
                <h4 style={{ color: colors.black, marginBottom: '3px', fontSize: windowWidth < 576 ? '14px' : '16px' }}>
                  {userProfile.name}
                </h4>
                <p style={{ color: colors.darkGray, marginBottom: '3px', fontSize: windowWidth < 576 ? '11px' : '12px' }}>
                  {userProfile.email}
                </p>
                <p style={{ color: colors.darkGray, marginBottom: '3px', fontSize: windowWidth < 576 ? '11px' : '12px' }}>
                  {userProfile.phone}
                </p>
                <p style={{ color: colors.darkGray, marginBottom: '10px', fontSize: windowWidth < 576 ? '11px' : '12px' }}>
                  {userProfile.location}
                </p>
                <Button 
                  style={buttonStyle}
                  onMouseEnter={(e) => e.target.style.backgroundColor = colors.darkRed}
                  onMouseLeave={(e) => e.target.style.backgroundColor = colors.primaryRed}
                  onClick={() => {
                    setProfileData({
                      name: userProfile.name,
                      email: userProfile.email,
                      phone: userProfile.phone,
                      location: userProfile.location,
                      profileImage: userProfile.profileImage
                    });
                    setShowProfileModal(true);
                  }}
                >
                  <FaEdit className="me-1" />
                  Edit Profile
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6} md={6}>
            <Card style={cardStyle}>
              <div style={headerStyle}>
                <FaChartBar className="me-2" />
                Application Stats
              </div>
              <Card.Body className="p-2">
                <div className="mb-2">
                  <h5 style={{ color: colors.darkGray, fontSize: '11px', fontWeight: '500' }}>Total Applications</h5>
                  <h3 style={{ 
                    color: colors.primaryRed, 
                    fontWeight: '700',
                    fontSize: windowWidth < 576 ? '18px' : '22px' // Reduced from 24px and 28px
                  }}>
                    {userProfile.totalApplications}
                  </h3>
                </div>
                <div className="mb-2">
                  <h5 style={{ color: colors.darkGray, fontSize: '11px', fontWeight: '500' }}>Profile Views</h5>
                  <h3 style={{ 
                    color: colors.black, 
                    fontWeight: '600',
                    fontSize: windowWidth < 576 ? '18px' : '22px' // Reduced from 24px and 28px
                  }}>
                    {userProfile.profileViews}
                  </h3>
                </div>
                <div className="mb-2">
                  <h5 style={{ color: colors.darkGray, fontSize: '11px', fontWeight: '500' }}>Resume Status</h5>
                  <h5 style={{ 
                    color: userProfile.resumeUploaded ? colors.successGreen : colors.warningOrange, 
                    fontWeight: '600',
                    fontSize: windowWidth < 576 ? '14px' : '16px' // Reduced from 18px and 20px
                  }}>
                    {userProfile.resumeUploaded ? 'Uploaded' : 'Not Uploaded'}
                  </h5>
                </div>
                <div>
                  <h5 style={{ color: colors.darkGray, fontSize: '11px', fontWeight: '500' }}>Last Active</h5>
                  <h5 style={{ 
                    color: colors.black, 
                    fontWeight: '600',
                    fontSize: windowWidth < 576 ? '12px' : '14px' // Reduced from 16px and 18px
                  }}>
                    {formatDate(userProfile.lastActive)}
                  </h5>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Applications - Now takes full width */}
        <Row className="g-3">
          <Col lg={12}>
            <Card style={cardStyle}>
              <div style={headerStyle}>
                <FaBriefcase className="me-2" />
                My Applications
                <div className="ms-auto d-flex">
                  {windowWidth >= 768 ? (
                    <>
                      <div className="input-group me-2" style={{ maxWidth: '180px' }}>
                        <span className="input-group-text" style={{ backgroundColor: colors.lightGray, border: 'none' }}>
                          <FaSearch size={10} color={colors.darkGray} />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          style={{ fontSize: '10px' }}
                        />
                      </div>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        style={{ 
                          border: `1px solid ${colors.lightGray}`,
                          borderRadius: '4px',
                          padding: '2px 6px',
                          fontSize: '10px'
                        }}
                      >
                        <option value="all">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </>
                  ) : (
                    <Dropdown>
                      <Dropdown.Toggle 
                        variant="outline-light" 
                        id="dropdown-filter"
                        style={{ fontSize: '10px' }}
                      >
                        <FaFilter />
                      </Dropdown.Toggle>
                      <Dropdown.Menu align="end">
                        <div className="px-3 py-2">
                          <div className="mb-2">
                            <small className="text-muted">Search</small>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              placeholder="Search..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              style={{ fontSize: '10px' }}
                            />
                          </div>
                          <div className="mb-2">
                            <small className="text-muted">Status</small>
                            <select
                              value={filterStatus}
                              onChange={(e) => setFilterStatus(e.target.value)}
                              className="form-select form-select-sm"
                              style={{ fontSize: '10px' }}
                            >
                              <option value="all">All Status</option>
                              <option value="Pending">Pending</option>
                              <option value="Accepted">Accepted</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </div>
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </div>
              </div>
              <Card.Body className="p-2">
                {filteredApplications.length > 0 ? (
                  <ResponsiveApplicationTable />
                ) : (
                  <div className="text-center py-3">
                    <FaBriefcase size={30} color={colors.lightGray} />
                    <p style={{ color: colors.darkGray, marginTop: '8px', fontSize: '12px' }}>
                      No applications found
                    </p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Application Details Modal */}
      <Modal show={showApplicationModal} onHide={() => setShowApplicationModal(false)} centered size={windowWidth < 768 ? 'sm' : 'lg'}>
        <Modal.Header closeButton style={{ backgroundColor: colors.primaryRed, color: colors.white }}>
          <Modal.Title>Application Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedApplication && (
            <div>
              <div className="mb-3">
                <h4 style={{ color: colors.black, fontWeight: '600', fontSize: '16px' }}>{selectedApplication.jobTitle}</h4>
                <h5 style={{ color: colors.darkGray, fontSize: '14px' }}>{selectedApplication.company}</h5>
              </div>
              
              <Row className="mb-2">
                <Col md={6}>
                  <h6 style={{ color: colors.darkGray, fontSize: '11px', fontWeight: '500' }}>Location</h6>
                  <p style={{ color: colors.black, margin: 0, fontSize: '12px' }}>
                    {selectedApplication.location}
                  </p>
                </Col>
                <Col md={6}>
                  <h6 style={{ color: colors.darkGray, fontSize: '11px', fontWeight: '500' }}>Salary</h6>
                  <p style={{ color: colors.black, margin: 0, fontSize: '12px' }}>
                    {selectedApplication.salary}
                  </p>
                </Col>
              </Row>
              
              <Row className="mb-2">
                <Col md={6}>
                  <h6 style={{ color: colors.darkGray, fontSize: '11px', fontWeight: '500' }}>Job Type</h6>
                  <p style={{ color: colors.black, margin: 0, fontSize: '12px' }}>
                    {selectedApplication.jobType}
                  </p>
                </Col>
                <Col md={6}>
                  <h6 style={{ color: colors.darkGray, fontSize: '11px', fontWeight: '500' }}>Experience</h6>
                  <p style={{ color: colors.black, margin: 0, fontSize: '12px' }}>
                    {selectedApplication.experience}
                  </p>
                </Col>
              </Row>
              
              <Row className="mb-2">
                <Col md={6}>
                  <h6 style={{ color: colors.darkGray, fontSize: '11px', fontWeight: '500' }}>Applied Date</h6>
                  <p style={{ color: colors.black, margin: 0, fontSize: '12px' }}>
                    {formatDate(selectedApplication.appliedDate)}
                  </p>
                </Col>
                <Col md={6}>
                  <h6 style={{ color: colors.darkGray, fontSize: '11px', fontWeight: '500' }}>Status</h6>
                  <Badge 
                    bg={
                      selectedApplication.status === 'Accepted' ? 'success' : 
                      selectedApplication.status === 'Rejected' ? 'danger' : 'warning'
                    }
                    style={{ fontSize: '10px' }}
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
                  style={{ fontSize: '11px' }}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* Profile Modal */}
      <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)} centered size={windowWidth < 768 ? 'sm' : 'md'}>
        <Modal.Header closeButton style={{ backgroundColor: colors.primaryRed, color: colors.white }}>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleProfileSubmit}>
            <div className="text-center mb-3">
              <div className="position-relative d-inline-block">
                <img 
                  src={profileData.profileImage} 
                  alt="Profile" 
                  className="rounded-circle" 
                  style={{ 
                    width: '100px', // Reduced from 120px
                    height: '100px', // Reduced from 120px
                    objectFit: 'cover', 
                    border: `2px solid ${colors.primaryRed}` // Reduced from 3px
                  }}
                />
                <label htmlFor="profileImageUpload" className="position-absolute bottom-0 end-0 bg-white rounded-circle p-1" style={{ cursor: 'pointer', border: `1px solid ${colors.lightGray}` }}>
                  <FaCamera color={colors.primaryRed} size={12} />
                  <input
                    id="profileImageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            </div>
            <Form.Group className="mb-2">
              <Form.Label style={{ fontSize: '11px' }}>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={profileData.name}
                onChange={(e) => handleProfileChange('name', e.target.value)}
                style={{ fontSize: '11px' }}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label style={{ fontSize: '11px' }}>Email</Form.Label>
              <Form.Control
                type="email"
                value={profileData.email}
                onChange={(e) => handleProfileChange('email', e.target.value)}
                style={{ fontSize: '11px' }}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label style={{ fontSize: '11px' }}>Phone</Form.Label>
              <Form.Control
                type="text"
                value={profileData.phone}
                onChange={(e) => handleProfileChange('phone', e.target.value)}
                style={{ fontSize: '11px' }}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label style={{ fontSize: '11px' }}>Location</Form.Label>
              <Form.Control
                type="text"
                value={profileData.location}
                onChange={(e) => handleProfileChange('location', e.target.value)}
                style={{ fontSize: '11px' }}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button 
                variant="secondary" 
                className="me-2"
                onClick={() => setShowProfileModal(false)}
                style={{ fontSize: '11px' }}
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