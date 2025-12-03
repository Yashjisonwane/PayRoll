// src/pages/Employee/JobApplication.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Table, Badge, Button, Modal, Form, InputGroup, Dropdown } from 'react-bootstrap';
import { 
  FaBriefcase, 
  FaPlus, 
  FaCheckCircle,
  FaTimesCircle,
  FaArrowLeft,
  FaBuilding,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaClock,
  FaSearch,
  FaFilter,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaInfoCircle,
  FaUserTie,
  FaEllipsisV
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

const JobApplication = () => {
  const navigate = useNavigate();
  const [showJobDetailModal, setShowJobDetailModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [activeTab, setActiveTab] = useState('applications');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('postedDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedJob, setSelectedJob] = useState(null);
  
  // Track window width for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const [currentApplications, setCurrentApplications] = useState([
    { 
      id: 1, 
      title: 'Senior React Developer', 
      company: 'Tech Solutions Pvt. Ltd.',
      location: 'Bangalore, India',
      salary: '₹12-15 LPA',
      postedDate: '2023-06-15',
      appliedDate: '2023-06-18',
      status: 'Pending',
      experience: '3-5 years',
      skills: ['React', 'Node.js', 'MongoDB'],
      jobType: 'Full-time',
      description: 'We are looking for an experienced React developer to join our team.'
    },
    { 
      id: 2, 
      title: 'Frontend Developer', 
      company: 'Digital Innovations',
      location: 'Mumbai, India',
      salary: '₹8-10 LPA',
      postedDate: '2023-06-10',
      appliedDate: '2023-06-12',
      status: 'Accepted',
      experience: '2-4 years',
      skills: ['HTML', 'CSS', 'JavaScript', 'React'],
      jobType: 'Full-time',
      description: 'Join our frontend team to build amazing user experiences.'
    },
    { 
      id: 3, 
      title: 'UI/UX Designer', 
      company: 'Creative Minds',
      location: 'Pune, India',
      salary: '₹6-8 LPA',
      postedDate: '2023-06-05',
      appliedDate: '2023-06-07',
      status: 'Rejected',
      experience: '1-3 years',
      skills: ['Figma', 'Adobe XD', 'Sketch'],
      jobType: 'Full-time',
      description: 'Looking for a creative designer to enhance our product design.'
    },
  ]);
  
  const [newJobs, setNewJobs] = useState([
    { 
      id: 4, 
      title: 'Full Stack Developer', 
      company: 'Tech Innovations',
      location: 'Bangalore, India',
      salary: '₹10-14 LPA',
      postedDate: '2023-07-01',
      experience: '3-6 years',
      skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
      jobType: 'Full-time',
      description: 'We are seeking a talented full stack developer to work on our cutting-edge projects.'
    },
    { 
      id: 5, 
      title: 'Mobile App Developer', 
      company: 'AppWorks',
      location: 'Hyderabad, India',
      salary: '₹8-12 LPA',
      postedDate: '2023-07-02',
      experience: '2-5 years',
      skills: ['React Native', 'Flutter', 'iOS', 'Android'],
      jobType: 'Full-time',
      description: 'Join our mobile team to build innovative apps for millions of users.'
    },
    { 
      id: 6, 
      title: 'DevOps Engineer', 
      company: 'CloudTech Solutions',
      location: 'Remote',
      salary: '₹12-16 LPA',
      postedDate: '2023-07-03',
      experience: '4-7 years',
      skills: ['Docker', 'Kubernetes', 'Jenkins', 'AWS'],
      jobType: 'Full-time',
      description: 'We need a DevOps expert to streamline our deployment processes.'
    },
    { 
      id: 7, 
      title: 'Data Scientist', 
      company: 'DataDriven Inc.',
      location: 'Delhi, India',
      salary: '₹15-20 LPA',
      postedDate: '2023-07-04',
      experience: '3-6 years',
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL'],
      jobType: 'Full-time',
      description: 'Join our data science team to build predictive models.'
    },
    { 
      id: 8, 
      title: 'Backend Developer', 
      company: 'ServerSide Tech',
      location: 'Chennai, India',
      salary: '₹9-13 LPA',
      postedDate: '2023-07-05',
      experience: '2-5 years',
      skills: ['Java', 'Spring Boot', 'MySQL', 'Redis'],
      jobType: 'Full-time',
      description: 'Looking for a backend developer to build scalable APIs.'
    },
  ]);
  
  const [applicationForm, setApplicationForm] = useState({
    coverLetter: '',
    expectedSalary: '',
    availableFromDate: '',
    currentCTC: '',
    noticePeriod: '',
  });

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
    padding: '10px 14px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
  };

  const buttonStyle = {
    backgroundColor: colors.primaryRed,
    color: colors.white,
    border: 'none',
    padding: '6px 12px',
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
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontWeight: '500',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
  };

  const tabStyle = {
    padding: '8px 14px',
    cursor: 'pointer',
    borderBottom: '3px solid transparent',
    color: colors.darkGray,
    fontWeight: '500',
    transition: 'all 0.2s',
    fontSize: '13px',
  };

  const activeTabStyle = {
    ...tabStyle,
    color: colors.primaryRed,
    borderBottom: `3px solid ${colors.primaryRed}`,
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleViewJobDetails = (job) => {
    setSelectedJob(job);
    setShowJobDetailModal(true);
  };

  const handleApplyJob = (job) => {
    setSelectedJob(job);
    setShowApplyModal(true);
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    
    // Add the job to current applications with "Pending" status
    const newApplication = {
      ...selectedJob,
      id: currentApplications.length + newJobs.length + 1,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
    };
    
    setCurrentApplications([...currentApplications, newApplication]);
    
    // Remove the job from new jobs
    setNewJobs(newJobs.filter(job => job.id !== selectedJob.id));
    
    // Reset form and close modal
    setApplicationForm({
      coverLetter: '',
      expectedSalary: '',
      availableFromDate: '',
      currentCTC: '',
      noticePeriod: '',
    });
    setShowApplyModal(false);
    setShowJobDetailModal(false);
    
    // Show success message
    alert('Application submitted successfully!');
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return <FaSort />;
    return sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  const applyFiltersAndSort = (jobs) => {
    let filtered = [...jobs];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter for applications
    if (activeTab === 'applications' && filterStatus !== 'all') {
      filtered = filtered.filter(job => job.status === filterStatus);
    }
    
    // Apply location filter for new jobs
    if (activeTab === 'newjobs' && filterLocation !== 'all') {
      filtered = filtered.filter(job => job.location === filterLocation);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'postedDate' || sortBy === 'appliedDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    return filtered;
  };

  const filteredApplications = applyFiltersAndSort(currentApplications);
  const filteredNewJobs = applyFiltersAndSort(newJobs);

  // Get unique locations for filter dropdown
  const locations = [...new Set(newJobs.map(job => job.location))];

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
                    <h5 style={{ fontSize: '14px', fontWeight: '600', margin: 0 }}>{application.title}</h5>
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
                    <FaMoneyBillWave className="me-2" size={12} color={colors.darkGray} />
                    <span style={{ fontSize: '12px', color: colors.darkGray }}>{application.salary}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <FaCalendarAlt className="me-2" size={12} color={colors.darkGray} />
                    <span style={{ fontSize: '12px', color: colors.darkGray }}>Applied: {formatDate(application.appliedDate)}</span>
                  </div>
                </div>
                
                <div className="d-flex justify-content-between">
                  <Button 
                    variant="link" 
                    size="sm"
                    style={{ color: colors.primaryRed, padding: '0', fontSize: '12px' }}
                    onClick={() => handleViewJobDetails(application)}
                  >
                    <FaInfoCircle /> Details
                  </Button>
                  <Badge bg="light" text="dark" style={{ fontSize: '11px' }}>
                    {application.experience}
                  </Badge>
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
                <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
                  Job Title {getSortIcon('title')}
                </th>
                <th onClick={() => handleSort('company')} style={{ cursor: 'pointer' }}>
                  Company {getSortIcon('company')}
                </th>
                <th>Location</th>
                <th>Salary</th>
                <th onClick={() => handleSort('appliedDate')} style={{ cursor: 'pointer' }}>
                  Applied Date {getSortIcon('appliedDate')}
                </th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map(application => (
                <tr key={application.id}>
                  <td style={{ fontWeight: '600', fontSize: '12px' }}>{application.title}</td>
                  <td style={{ fontSize: '12px' }}>{application.company}</td>
                  <td style={{ fontSize: '12px' }}>{application.location}</td>
                  <td style={{ fontSize: '12px' }}>{application.salary}</td>
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
                    <Button 
                      variant="link" 
                      size="sm"
                      style={{ color: colors.primaryRed, padding: '0', fontSize: '12px' }}
                      onClick={() => handleViewJobDetails(application)}
                    >
                      <FaInfoCircle />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      );
    }
  };

  // Responsive new jobs table component
  const ResponsiveNewJobsTable = () => {
    if (windowWidth < 768) {
      // Mobile view - card layout
      return (
        <div className="job-cards">
          {filteredNewJobs.map(job => (
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
                    <FaMoneyBillWave className="me-2" size={12} color={colors.darkGray} />
                    <span style={{ fontSize: '12px', color: colors.darkGray }}>{job.salary}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <FaCalendarAlt className="me-2" size={12} color={colors.darkGray} />
                    <span style={{ fontSize: '12px', color: colors.darkGray }}>Posted: {formatDate(job.postedDate)}</span>
                  </div>
                </div>
                
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <Badge bg="light" text="dark" style={{ fontSize: '11px', marginRight: '5px' }}>
                      {job.experience}
                    </Badge>
                    <Badge bg="light" text="dark" style={{ fontSize: '11px' }}>
                      {job.jobType}
                    </Badge>
                  </div>
                  <Button 
                    style={buttonStyle}
                    onMouseEnter={(e) => e.target.style.backgroundColor = colors.darkRed}
                    onMouseLeave={(e) => e.target.style.backgroundColor = colors.primaryRed}
                    onClick={() => handleApplyJob(job)}
                  >
                    Apply
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
                <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
                  Job Title {getSortIcon('title')}
                </th>
                <th onClick={() => handleSort('company')} style={{ cursor: 'pointer' }}>
                  Company {getSortIcon('company')}
                </th>
                <th>Location</th>
                <th>Salary</th>
                <th onClick={() => handleSort('postedDate')} style={{ cursor: 'pointer' }}>
                  Posted Date {getSortIcon('postedDate')}
                </th>
                <th>Experience</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredNewJobs.map(job => (
                <tr key={job.id}>
                  <td style={{ fontWeight: '600', fontSize: '12px' }}>{job.title}</td>
                  <td style={{ fontSize: '12px' }}>{job.company}</td>
                  <td style={{ fontSize: '12px' }}>{job.location}</td>
                  <td style={{ fontSize: '12px' }}>{job.salary}</td>
                  <td style={{ fontSize: '12px' }}>{formatDate(job.postedDate)}</td>
                  <td>
                    <Badge bg="light" text="dark" style={{ fontSize: '11px' }}>
                      {job.experience}
                    </Badge>
                  </td>
                  <td>
                    <div className="d-flex">
                      <Button 
                        variant="link" 
                        size="sm"
                        style={{ color: colors.primaryRed, padding: '0', fontSize: '12px', marginRight: '8px' }}
                        onClick={() => handleViewJobDetails(job)}
                      >
                        <FaInfoCircle />
                      </Button>
                      <Button 
                        style={buttonStyle}
                        onMouseEnter={(e) => e.target.style.backgroundColor = colors.darkRed}
                        onMouseLeave={(e) => e.target.style.backgroundColor = colors.primaryRed}
                        onClick={() => handleApplyJob(job)}
                      >
                        Apply
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
    <div style={{  minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: colors.white, 
        borderBottom: `1px solid ${colors.lightGray}`,
        padding: '12px 0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={containerStyle}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <Button 
                variant="link" 
                className="me-3 p-0"
                onClick={() => navigate('/Employee/dashboard')}
                style={{ color: colors.primaryRed }}
              >
                <FaArrowLeft size={18} />
              </Button>
              <h2 style={{ color: colors.black, margin: 0, fontSize: '20px' }}>Job Applications</h2>
            </div>
            <div className="d-flex align-items-center">
              <div className="input-group me-2" style={{ maxWidth: '250px' }}>
                <span className="input-group-text" style={{ backgroundColor: colors.lightGray, border: 'none' }}>
                  <FaSearch size={14} color={colors.darkGray} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ fontSize: '12px' }}
                />
              </div>
              
            </div>
          </div>
        </div>
      </div>

      <div style={containerStyle} className="py-4">
        {/* Tabs */}
        <div className="d-flex mb-3" style={{ borderBottom: `1px solid ${colors.lightGray}` }}>
          <div 
            style={activeTab === 'applications' ? activeTabStyle : tabStyle}
            onClick={() => setActiveTab('applications')}
          >
            Current Applications ({currentApplications.length})
          </div>
          <div 
            style={activeTab === 'newjobs' ? activeTabStyle : tabStyle}
            onClick={() => setActiveTab('newjobs')}
          >
            New Jobs ({newJobs.length})
          </div>
        </div>

        {activeTab === 'applications' && (
          <Card style={cardStyle}>
            <div style={headerStyle}>
              <FaBriefcase className="me-2" />
              Current Applications
              <div className="ms-auto d-flex">
                <Dropdown className="me-2">
                  <Dropdown.Toggle 
                    variant="outline-light" 
                    id="dropdown-status-filter"
                    style={{ fontSize: '12px' }}
                  >
                    Status: {filterStatus === 'all' ? 'All' : filterStatus}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setFilterStatus('all')}>All</Dropdown.Item>
                    <Dropdown.Item onClick={() => setFilterStatus('Pending')}>Pending</Dropdown.Item>
                    <Dropdown.Item onClick={() => setFilterStatus('Accepted')}>Accepted</Dropdown.Item>
                    <Dropdown.Item onClick={() => setFilterStatus('Rejected')}>Rejected</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Button 
                  variant="outline-light"
                  size="sm"
                  onClick={() => handleSort('appliedDate')}
                >
                  Applied Date {getSortIcon('appliedDate')}
                </Button>
              </div>
            </div>
            <Card.Body className="p-3">
              {filteredApplications.length > 0 ? (
                <ResponsiveApplicationTable />
              ) : (
                <div className="text-center py-4">
                  <FaBriefcase size={40} color={colors.lightGray} />
                  <p style={{ color: colors.darkGray, marginTop: '10px', fontSize: '14px' }}>
                    No applications found matching your criteria
                  </p>
                </div>
              )}
            </Card.Body>
          </Card>
        )}

        {activeTab === 'newjobs' && (
          <Card style={cardStyle}>
            <div style={headerStyle}>
              <FaBriefcase className="me-2" />
              New Jobs List
              <div className="ms-auto d-flex">
                <Dropdown className="me-2">
                  <Dropdown.Toggle 
                    variant="outline-light" 
                    id="dropdown-location-filter"
                    style={{ fontSize: '12px' }}
                  >
                    Location: {filterLocation === 'all' ? 'All' : filterLocation}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setFilterLocation('all')}>All</Dropdown.Item>
                    {locations.map(location => (
                      <Dropdown.Item key={location} onClick={() => setFilterLocation(location)}>
                        {location}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <Button 
                  variant="outline-light"
                  size="sm"
                  onClick={() => handleSort('postedDate')}
                >
                  Posted Date {getSortIcon('postedDate')}
                </Button>
              </div>
            </div>
            <Card.Body className="p-3">
              {filteredNewJobs.length > 0 ? (
                <ResponsiveNewJobsTable />
              ) : (
                <div className="text-center py-4">
                  <FaBriefcase size={40} color={colors.lightGray} />
                  <p style={{ color: colors.darkGray, marginTop: '10px', fontSize: '14px' }}>
                    No jobs found matching your criteria
                  </p>
                </div>
              )}
            </Card.Body>
          </Card>
        )}
      </div>

      {/* Job Details Modal */}
      <Modal show={showJobDetailModal} onHide={() => setShowJobDetailModal(false)} centered size="lg">
        <Modal.Header closeButton style={{ backgroundColor: colors.primaryRed, color: colors.white }}>
          <Modal.Title>Job Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedJob && (
            <div>
              <div className="mb-3">
                <h4 style={{ color: colors.black, fontWeight: '600', fontSize: '18px' }}>{selectedJob.title}</h4>
                <h5 style={{ color: colors.darkGray, fontSize: '16px' }}>{selectedJob.company}</h5>
              </div>
              
              <Row className="mb-3">
                <Col md={6}>
                  <div className="d-flex align-items-center mb-2">
                    <FaMapMarkerAlt className="me-2" color={colors.primaryRed} />
                    <span style={{ fontSize: '13px' }}>Location: {selectedJob.location}</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <FaMoneyBillWave className="me-2" color={colors.primaryRed} />
                    <span style={{ fontSize: '13px' }}>Salary: {selectedJob.salary}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <FaClock className="me-2" color={colors.primaryRed} />
                    <span style={{ fontSize: '13px' }}>Experience: {selectedJob.experience}</span>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="d-flex align-items-center mb-2">
                    <FaCalendarAlt className="me-2" color={colors.primaryRed} />
                    <span style={{ fontSize: '13px' }}>
                      Posted: {formatDate(selectedJob.postedDate)}
                    </span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <FaBriefcase className="me-2" color={colors.primaryRed} />
                    <span style={{ fontSize: '13px' }}>Job Type: {selectedJob.jobType}</span>
                  </div>
                  {selectedJob.appliedDate && (
                    <div className="d-flex align-items-center">
                      <FaCalendarAlt className="me-2" color={colors.primaryRed} />
                      <span style={{ fontSize: '13px' }}>
                        Applied: {formatDate(selectedJob.appliedDate)}
                      </span>
                    </div>
                  )}
                </Col>
              </Row>
              
              <div className="mb-3">
                <h6 style={{ color: colors.darkGray, fontSize: '14px', fontWeight: '500' }}>Required Skills:</h6>
                <div className="d-flex flex-wrap">
                  {selectedJob.skills.map((skill, index) => (
                    <Badge key={index} bg="light" text="dark" className="me-2 mb-2" style={{ fontSize: '11px' }}>
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <h6 style={{ color: colors.darkGray, fontSize: '14px', fontWeight: '500' }}>Job Description:</h6>
                <p style={{ fontSize: '13px', color: colors.black }}>{selectedJob.description}</p>
              </div>
              
              {selectedJob.status && (
                <div className="mb-4">
                  <h6 style={{ color: colors.darkGray, fontSize: '14px', fontWeight: '500' }}>Application Status:</h6>
                  <Badge 
                    bg={
                      selectedJob.status === 'Accepted' ? 'success' : 
                      selectedJob.status === 'Rejected' ? 'danger' : 'warning'
                    }
                    style={{ fontSize: '12px' }}
                  >
                    {selectedJob.status}
                  </Badge>
                </div>
              )}
              
              <div className="d-flex justify-content-end">
                {!selectedJob.status && (
                  <Button 
                    style={buttonStyle}
                    onMouseEnter={(e) => e.target.style.backgroundColor = colors.darkRed}
                    onMouseLeave={(e) => e.target.style.backgroundColor = colors.primaryRed}
                    onClick={() => handleApplyJob(selectedJob)}
                  >
                    Apply Now
                  </Button>
                )}
                <Button 
                  variant="secondary" 
                  className="ms-2"
                  onClick={() => setShowJobDetailModal(false)}
                  style={{ fontSize: '13px' }}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* Apply Job Modal */}
      <Modal show={showApplyModal} onHide={() => setShowApplyModal(false)} centered size="lg">
        <Modal.Header closeButton style={{ backgroundColor: colors.primaryRed, color: colors.white }}>
          <Modal.Title>Apply for Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedJob && (
            <div>
              <div className="mb-4">
                <h5 style={{ color: colors.black, fontWeight: '600', fontSize: '16px' }}>{selectedJob.title}</h5>
                <h6 style={{ color: colors.darkGray, fontSize: '14px' }}>{selectedJob.company}</h6>
              </div>
              
              <Form onSubmit={handleApplySubmit}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontSize: '13px' }}>Cover Letter</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={applicationForm.coverLetter}
                    onChange={(e) => setApplicationForm({...applicationForm, coverLetter: e.target.value})}
                    placeholder="Tell us why you're a good fit for this role..."
                    required
                    style={{ fontSize: '13px' }}
                  />
                </Form.Group>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: '13px' }}>Expected Salary</Form.Label>
                      <Form.Control
                        type="text"
                        value={applicationForm.expectedSalary}
                        onChange={(e) => setApplicationForm({...applicationForm, expectedSalary: e.target.value})}
                        placeholder="e.g., ₹12 LPA"
                        required
                        style={{ fontSize: '13px' }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: '13px' }}>Current CTC</Form.Label>
                      <Form.Control
                        type="text"
                        value={applicationForm.currentCTC}
                        onChange={(e) => setApplicationForm({...applicationForm, currentCTC: e.target.value})}
                        placeholder="e.g., ₹10 LPA"
                        required
                        style={{ fontSize: '13px' }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: '13px' }}>Available From</Form.Label>
                      <Form.Control
                        type="date"
                        value={applicationForm.availableFromDate}
                        onChange={(e) => setApplicationForm({...applicationForm, availableFromDate: e.target.value})}
                        required
                        style={{ fontSize: '13px' }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: '13px' }}>Notice Period</Form.Label>
                      <Form.Select
                        value={applicationForm.noticePeriod}
                        onChange={(e) => setApplicationForm({...applicationForm, noticePeriod: e.target.value})}
                        required
                        style={{ fontSize: '13px' }}
                      >
                        <option value="">Select Notice Period</option>
                        <option value="Immediate">Immediate</option>
                        <option value="15 days">15 days</option>
                        <option value="30 days">30 days</option>
                        <option value="60 days">60 days</option>
                        <option value="90 days">90 days</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                
                <div className="d-flex justify-content-end">
                  <Button 
                    variant="secondary" 
                    className="me-2"
                    onClick={() => setShowApplyModal(false)}
                    style={{ fontSize: '13px' }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" style={buttonStyle}>
                    Submit Application
                  </Button>
                </div>
              </Form>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default JobApplication;