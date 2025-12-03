// src/pages/JobSeeker/JobList.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Table, Badge, Button, Modal, Form } from 'react-bootstrap';
import { 
  FaBriefcase, 
  FaBuilding, 
  FaMapMarkerAlt, 
  FaMoneyBillWave, 
  FaCalendarAlt,
  FaSearch,
  FaFilter,
  FaArrowLeft,
  FaBookmark,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaGraduationCap
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
};

const JobList = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobDetailsModal, setShowJobDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('all');
  const [filterSalary, setFilterSalary] = useState('all');
  const [filterExperience, setFilterExperience] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('postedDate');
  const [sortOrder, setSortOrder] = useState('desc');
  
  // Track window width for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [jobs, setJobs] = useState([
    { 
      id: 1, 
      title: 'Senior React Developer', 
      company: 'Tech Solutions Pvt. Ltd.',
      location: 'Bangalore, India',
      salary: '₹12-15 LPA',
      postedDate: '2023-07-01',
      experience: '3-5 years',
      jobType: 'Full-time',
      category: 'IT',
      description: 'We are looking for an experienced React developer to join our team. You will be responsible for developing and implementing user interface components using React.js concepts and workflows.',
      requirements: ['3+ years of experience with React.js', 'Strong proficiency in HTML, CSS, and modern JavaScript', 'Experience with state management libraries'],
      status: 'Open'
    },
    { 
      id: 2, 
      title: 'Frontend Developer', 
      company: 'Digital Innovations',
      location: 'Mumbai, India',
      salary: '₹8-10 LPA',
      postedDate: '2023-07-05',
      experience: '2-4 years',
      jobType: 'Full-time',
      category: 'IT',
      description: 'Join our frontend team to build amazing user experiences. You will be responsible for translating UI/UX design wireframes to actual code that will produce visual elements of application.',
      requirements: ['2+ years of experience in frontend development', 'Proficiency in HTML5, CSS3, and JavaScript', 'Experience with modern JavaScript frameworks'],
      status: 'Open'
    },
    { 
      id: 3, 
      title: 'UI/UX Designer', 
      company: 'Creative Minds',
      location: 'Pune, India',
      salary: '₹6-8 LPA',
      postedDate: '2023-07-03',
      experience: '1-3 years',
      jobType: 'Full-time',
      category: 'Design',
      description: 'Looking for a creative designer to enhance our product design. You will be responsible for creating beautiful and intuitive user interfaces.',
      requirements: ['1-3 years of design experience', 'Proficiency in design tools', 'Strong portfolio showcasing your work'],
      status: 'Open'
    },
    { 
      id: 4, 
      title: 'Full Stack Developer', 
      company: 'Tech Innovations',
      location: 'Hyderabad, India',
      salary: '₹10-14 LPA',
      postedDate: '2023-07-02',
      experience: '3-6 years',
      jobType: 'Full-time',
      category: 'IT',
      description: 'We are seeking a talented full stack developer to work on our cutting-edge projects. You will work on both frontend and backend development.',
      requirements: ['3-6 years of full stack development', 'Experience with React and Node.js', 'Knowledge of databases', 'Understanding of RESTful APIs'],
      status: 'Open'
    },
    { 
      id: 5, 
      title: 'Mobile App Developer', 
      company: 'AppWorks',
      location: 'Remote',
      salary: '₹8-12 LPA',
      postedDate: '2023-07-01',
      experience: '2-5 years',
      jobType: 'Remote',
      category: 'IT',
      description: 'Join our mobile team to build innovative apps for millions of users. You will work on both iOS and Android platforms.',
      requirements: ['2-5 years of mobile development', 'Experience with React Native or Flutter', 'Knowledge of app store guidelines'],
      status: 'Open'
    },
    { 
      id: 6, 
      title: 'Data Scientist', 
      company: 'DataDriven Inc.',
      location: 'Delhi, India',
      salary: '₹15-20 LPA',
      postedDate: '2023-06-25',
      experience: '3-6 years',
      jobType: 'Full-time',
      category: 'IT',
      description: 'Join our data science team to build predictive models and analyze complex datasets. You will work with cutting-edge machine learning technologies.',
      requirements: ['3-6 years of data science experience', 'Strong Python skills', 'Experience with machine learning frameworks', 'Knowledge of statistics'],
      status: 'Open'
    },
    { 
      id: 7, 
      title: 'Backend Developer', 
      company: 'ServerSide Tech',
      location: 'Chennai, India',
      salary: '₹9-13 LPA',
      postedDate: '2023-06-20',
      experience: '2-5 years',
      jobType: 'Full-time',
      category: 'IT',
      description: 'Looking for a backend developer to build scalable APIs and maintain our server infrastructure. You will work with modern backend technologies.',
      requirements: ['2-5 years of backend development', 'Experience with Java or Node.js', 'Knowledge of databases', 'Understanding of RESTful APIs'],
      status: 'Open'
    },
    { 
      id: 8, 
      title: 'HR Manager', 
      company: 'People First',
      location: 'Hyderabad, India',
      salary: '₹8-12 LPA',
      postedDate: '2023-06-15',
      experience: '3-6 years',
      jobType: 'Full-time',
      category: 'HR',
      description: 'Looking for an experienced HR manager to lead our human resources initiatives. You will manage recruitment, employee relations, and organizational development.',
      requirements: ['3-6 years of HR experience', 'Strong communication skills', 'Knowledge of HR policies', 'Experience with recruitment systems'],
      status: 'Open'
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

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return <FaClock />;
    return sortOrder === 'asc' ? <FaArrowLeft /> : <FaArrowLeft style={{ transform: 'rotate(180deg)' }} />;
  };

  const applyFiltersAndSort = () => {
    let filtered = [...jobs];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply filters
    if (filterLocation !== 'all') {
      filtered = filtered.filter(job => job.location === filterLocation);
    }
    
    if (filterSalary !== 'all') {
      const [min, max] = filterSalary.split('-').map(s => parseInt(s.trim()));
      filtered = filtered.filter(job => {
        const jobMin = parseInt(job.salary.split('-')[0].replace(/[₹, LPA]/g, '').trim());
        return jobMin >= min && jobMin <= max;
      });
    }
    
    if (filterExperience !== 'all') {
      const [min, max] = filterExperience.split('-').map(s => parseInt(s.replace(' years', '').trim()));
      filtered = filtered.filter(job => {
        const jobMin = parseInt(job.experience.split('-')[0].replace(' years', '').trim());
        return jobMin >= min && jobMin <= max;
      });
    }
    
    if (filterType !== 'all') {
      filtered = filtered.filter(job => job.jobType === filterType);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'postedDate') {
        aValue = new Date(a[sortBy]);
        bValue = new Date(b[sortBy]);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    return filtered;
  };

  const filteredJobs = applyFiltersAndSort();

  // Get unique values for filters
  const locations = [...new Set(jobs.map(job => job.location))];
  const salaryRanges = ['0-5 LPA', '5-10 LPA', '10-15 LPA', '15-20 LPA', '20+ LPA'];
  const experienceLevels = ['0-2 years', '2-4 years', '4-6 years', '6+ years'];
  const jobTypes = ['Full-time', 'Remote', 'Part-time'];
  
  // Function to handle Apply Now button click
  const handleApplyNow = (jobId) => {
    navigate(`/job-portal/apply/${jobId}`);
  };

  // Function to handle View Details button click
  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setShowJobDetailsModal(true);
  };
  
  // Responsive job list component
  const ResponsiveJobList = () => {
    if (windowWidth < 768) {
      // Mobile view - card layout
      return (
        <div className="job-cards">
          {filteredJobs.map(job => (
            <Card key={job.id} className="mb-3" style={{ border: `1px solid ${colors.lightGray}` }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h5 style={{ fontSize: '14px', fontWeight: '600', margin: '0' }}>{job.title}</h5>
                    <p style={{ fontSize: '12px', color: colors.darkGray, margin: '0' }}>{job.company}</p>
                  </div>
                  <Badge 
                    bg={
                      job.status === 'Accepted' ? 'success' : 
                      job.status === 'Rejected' ? 'danger' : 'warning'
                    }
                    style={{ fontSize: '11px' }}
                  >
                    {job.status}
                  </Badge>
                </div>
                
                <div className="mb-2">
                  <div className="d-flex align-items-center mb-1">
                    <FaMapMarkerAlt className="me-2" size={12} color={colors.darkGray} />
                    <span style={{ fontSize: '12px', color: colors.darkGray }}>{job.location}</span>
                  </div>
                  <div className="d-flex align-items-center mb-1">
                    <FaMoneyBillWave className="me-2" size={12} color={colors.darkGray} />
                    <span style={{ fontSize: '12px', color: colors.black }}>{job.salary}</span>
                  </div>
                  <div className="d-flex align-items-center mb-1">
                    <FaClock className="me-2" size={12} color={colors.darkGray} />
                    <span style={{ fontSize: '12px', color: colors.black }}>{formatDate(job.postedDate)}</span>
                  </div>
                </div>
                
                <div className="mb-2">
                  <div className="d-flex align-items-center mb-1">
                    <span style={{ fontSize: '12px', color: colors.darkGray }}>Experience:</span>
                    <span style={{ fontSize: '12px', color: colors.black }}>{job.experience}</span>
                  </div>
                </div>
                
                <div className="d-flex justify-content-between">
                  <Button 
                    variant="link" 
                    size="sm"
                    style={{ color: colors.primaryRed, padding: '0', fontSize: '12px' }}
                    onClick={() => handleViewDetails(job)}
                  >
                    View Details
                  </Button>
                  <Button 
                    variant="link" 
                    size="sm"
                    style={buttonStyle}
                    onClick={() => handleApplyNow(job.id)}
                  >
                    Apply Now
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
                  Title {getSortIcon('title')}
                </th>
                <th onClick={() => handleSort('company')} style={{ cursor: 'pointer' }}>
                  Company {getSortIcon('company')}
                </th>
                <th onClick={() => handleSort('location')} style={{ cursor: 'pointer' }}>
                  Location {getSortIcon('location')}
                </th>
                <th onClick={() => handleSort('salary')} style={{ cursor: 'pointer' }}>
                  Salary {getSortIcon('salary')}
                </th>
                <th onClick={() => handleSort('experience')} style={{ cursor: 'pointer' }}>
                  Experience {getSortIcon('experience')}
                </th>
                <th onClick={() => handleSort('postedDate')} style={{ cursor: 'pointer' }}>
                  Posted {getSortIcon('postedDate')}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map(job => (
                <tr key={job.id}>
                  <td style={{ fontWeight: '600', fontSize: '12px' }}>{job.title}</td>
                  <td style={{ fontSize: '12px' }}>{job.company}</td>
                  <td style={{ fontSize: '12px' }}>{job.location}</td>
                  <td style={{ fontSize: '12px' }}>{job.salary}</td>
                  <td style={{ fontSize: '12px' }}>{job.experience}</td>
                  <td style={{ fontSize: '12px' }}>{formatDate(job.postedDate)}</td>
                  <td>
                    <Button 
                      variant="link" 
                      size="sm"
                      style={buttonStyle}
                      onClick={() => handleApplyNow(job.id)}
                    >
                      Apply Now
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

  return (
    <div style={{ backgroundColor: colors.lightBg, minHeight: '100vh' }}>
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
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <Button 
                variant="link" 
                className="me-3 p-0"
                onClick={() => navigate('/job-portal/dashboard')}
                style={{ color: colors.primaryRed }}
              >
                <FaArrowLeft size={18} />
              </Button>
              <h2 style={{ color: colors.black, margin: 0, fontSize: '20px' }}>Job Vacancies</h2>
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
              <Button 
                variant="outline-secondary"
                className="ms-2"
                onClick={() => setShowFilterModal(true)}
                style={{ fontSize: '12px' }}
              >
                <FaFilter className="me-1" />
                {windowWidth < 576 ? '' : 'Filter'}
              </Button>
            </div>
            </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
        {/* Results Count */}
        <div className="mb-3">
          <h5 style={{ color: colors.darkGray, fontSize: '14px', fontWeight: '500', marginBottom: '10px' }}>
            Found {filteredJobs.length} active job openings
          </h5>
        </div>

        {/* Job List */}
        <Card style={cardStyle}>
          <div style={headerStyle}>
            <FaBriefcase className="me-2" />
            Job Vacancies
          </div>
          <Card.Body className="p-3">
            {filteredJobs.length > 0 ? (
              <ResponsiveJobList />
            ) : (
              <div className="text-center py-5">
                  <FaBriefcase size={40} color={colors.lightGray} />
                  <p style={{ color: colors.darkGray, marginTop: '10px', fontSize: '14px' }}>
                    No job openings found
                  </p>
            </div>
            )}
          </Card.Body>
        </Card>
      </div>

      {/* Job Details Modal */}
      <Modal 
        show={showJobDetailsModal} 
        onHide={() => setShowJobDetailsModal(false)} 
        centered 
        size="lg"
        scrollable
      >
        <Modal.Header closeButton style={{ backgroundColor: colors.primaryRed, color: colors.white }}>
          <Modal.Title className="d-flex align-items-center">
            <FaBriefcase className="me-2" />
            Job Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedJob && (
            <>
              <Row className="mb-3">
                <Col md={8}>
                  <h4 style={{ color: colors.black, fontWeight: '600', fontSize: '18px' }}>{selectedJob.title}</h4>
                  <h5 style={{ color: colors.darkGray, fontSize: '16px' }}>{selectedJob.company}</h5>
                </Col>
                <Col md={4} className="text-md-end">
                  <h5 style={{ color: colors.primaryRed, fontWeight: '600', fontSize: '16px' }}>{selectedJob.salary}</h5>
                </Col>
              </Row>
              
              <Row className="mb-3">
                <Col md={4}>
                  <div className="d-flex align-items-center mb-2">
                    <FaMapMarkerAlt className="me-2" color={colors.primaryRed} />
                    <span style={{ fontSize: '13px', color: colors.darkGray }}>{selectedJob.location}</span>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="d-flex align-items-center mb-2">
                    <FaGraduationCap className="me-2" color={colors.primaryRed} />
                    <span style={{ fontSize: '13px', color: colors.darkGray }}>{selectedJob.experience}</span>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="d-flex align-items-center mb-2">
                    <FaClock className="me-2" color={colors.primaryRed} />
                    <span style={{ fontSize: '13px', color: colors.darkGray }}>Posted: {formatDate(selectedJob.postedDate)}</span>
                  </div>
                </Col>
              </Row>
              
              <div className="mb-3">
                <h6 style={{ color: colors.black, fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Job Description</h6>
                <p style={{ fontSize: '13px', color: colors.black, lineHeight: '1.5' }}>{selectedJob.description}</p>
              </div>
              
              <div className="mb-3">
                <h6 style={{ color: colors.black, fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Requirements</h6>
                <ul style={{ fontSize: '13px', color: colors.black, paddingLeft: '20px' }}>
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index} style={{ marginBottom: '5px' }}>{req}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary"
            onClick={() => setShowJobDetailsModal(false)}
            style={{ fontSize: '13px' }}
          >
            Close
          </Button>
          <Button 
            style={buttonStyle}
            onClick={() => {
              setShowJobDetailsModal(false);
              handleApplyNow(selectedJob.id);
            }}
          >
            Apply for this Position
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Filter Modal */}
      <Modal show={showFilterModal} onHide={() => setShowFilterModal(false)} centered size="md">
        <Modal.Header closeButton style={{ backgroundColor: colors.primaryRed, color: colors.white }}>
          <Modal.Title>Filter Jobs</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '13px' }}>Location</Form.Label>
              <Form.Select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                style={{ fontSize: '13px' }}
              >
                <option value="all">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '13px' }}>Salary Range</Form.Label>
              <Form.Select
                value={filterSalary}
                onChange={(e) => setFilterSalary(e.target.value)}
                style={{ fontSize: '13px' }}
              >
                <option value="all">All Salaries</option>
                {salaryRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '13px' }}>Experience</Form.Label>
              <Form.Select
                value={filterExperience}
                onChange={(e) => setFilterExperience(e.target.value)}
                style={{ fontSize: '13px' }}
              >
                <option value="all">All Experience</option>
                {experienceLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '13px' }}>Job Type</Form.Label>
              <Form.Select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                style={{ fontSize: '13px' }}
              >
                <option value="all">All Types</option>
                {jobTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Form.Select>
            </Form.Group>
            
            <div className="d-flex justify-content-end">
              <Button 
                variant="secondary" 
                className="me-2"
                onClick={() => {
                  setFilterLocation('all');
                  setFilterSalary('all');
                  setFilterExperience('all');
                  setFilterType('all');
                  setShowFilterModal(false);
                }}
                style={{ fontSize: '13px' }}
              >
                Reset Filters
              </Button>
              <Button 
                style={buttonStyle}
                onClick={() => setShowFilterModal(false)}
              >
                Apply Filters
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default JobList;