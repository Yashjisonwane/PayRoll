// src/pages/Employee/JobApplication.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Table, Badge, Button, Modal, Form, InputGroup, Dropdown, Alert, Spinner } from 'react-bootstrap';
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
  FaEllipsisV,
  FaFileUpload,
  FaFileAlt,
  FaTrash,
  FaEye,
  FaDownload
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
  const [resumeFile, setResumeFile] = useState(null);
  const [resumePreview, setResumePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const fileInputRef = useRef(null);
  
  // Track window width for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Data source: This would typically come from an API call to fetch job applications
  // API endpoint: GET /api/employee/job-applications
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
      description: 'We are looking for an experienced React developer to join our team.',
      resumeUrl: 'https://example.com/resume1.pdf'
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
      description: 'Join our frontend team to build amazing user experiences.',
      resumeUrl: 'https://example.com/resume2.pdf'
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
      description: 'Looking for a creative designer to enhance our product design.',
      resumeUrl: 'https://example.com/resume3.pdf'
    },
  ]);
  
  // Data source: This would typically come from an API call to fetch available jobs
  // API endpoint: GET /api/employee/available-jobs
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
    padding: windowWidth < 768 ? '0 10px' : '0 15px',
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
    padding: windowWidth < 768 ? '8px 12px' : '10px 14px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    fontSize: windowWidth < 768 ? '12px' : '14px',
  };

  const buttonStyle = {
    backgroundColor: colors.primaryRed,
    color: colors.white,
    border: 'none',
    padding: windowWidth < 768 ? '6px 10px' : '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontWeight: '500',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: windowWidth < 768 ? '11px' : '12px',
  };

  const secondaryButtonStyle = {
    backgroundColor: 'transparent',
    color: colors.primaryRed,
    border: `1px solid ${colors.primaryRed}`,
    padding: windowWidth < 768 ? '6px 10px' : '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontWeight: '500',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: windowWidth < 768 ? '11px' : '12px',
  };

  const tabStyle = {
    padding: windowWidth < 768 ? '6px 10px' : '8px 14px',
    cursor: 'pointer',
    borderBottom: '3px solid transparent',
    color: colors.darkGray,
    fontWeight: '500',
    transition: 'all 0.2s',
    fontSize: windowWidth < 768 ? '11px' : '13px',
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      if (file.type !== 'application/pdf' && 
          file.type !== 'application/msword' && 
          file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        alert('Please upload a PDF or Word document');
        return;
      }
      
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      setResumeFile(file);
      
      // Create preview for PDF files
      if (file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = () => {
          setResumePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setResumePreview(null);
      }
    }
  };

  const handleUploadResume = () => {
    if (!resumeFile) {
      alert('Please select a resume file');
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    
    // In a real app, this would be an API call to upload resume
    // API endpoint: POST /api/employee/upload-resume
    // Request body: FormData with resume file
    // Response: { success: true, fileUrl: 'https://example.com/resume.pdf' }
  };

  const handleRemoveResume = () => {
    setResumeFile(null);
    setResumePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    
    if (!resumeFile) {
      alert('Please upload your resume');
      return;
    }
    
    // Create a new application object
    const newApplication = {
      ...selectedJob,
      id: currentApplications.length + newJobs.length + 1,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      resumeUrl: URL.createObjectURL(resumeFile) // In a real app, this would be URL from upload response
    };
    
    // Update state using functional update to ensure proper re-render
    setCurrentApplications(prevApplications => [...prevApplications, newApplication]);
    
    // Remove job from new jobs
    setNewJobs(prevNewJobs => prevNewJobs.filter(job => job.id !== selectedJob.id));
    
    // Reset form and close modal
    setApplicationForm({
      coverLetter: '',
      expectedSalary: '',
      availableFromDate: '',
      currentCTC: '',
      noticePeriod: '',
    });
    setResumeFile(null);
    setResumePreview(null);
    setShowApplyModal(false);
    setShowJobDetailModal(false);
    
    // Show success message
    setShowSuccessAlert(true);
    
    // Switch to applications tab to show new application
    setActiveTab('applications');
    
    // Hide success alert after 3 seconds
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 3000);
    
    // In a real app, this would be an API call to submit application
    // API endpoint: POST /api/employee/apply-job
    // Request body: {
    //   jobId: selectedJob.id,
    //   coverLetter: applicationForm.coverLetter,
    //   expectedSalary: applicationForm.expectedSalary,
    //   availableFromDate: applicationForm.availableFromDate,
    //   currentCTC: applicationForm.currentCTC,
    //   noticePeriod: applicationForm.noticePeriod,
    //   resumeUrl: resumeUrl
    // }
    // Response: { success: true, applicationId: newApplication.id }
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
        <div className="row">
          {filteredApplications.map(application => (
            <div key={application.id} className="col-12 mb-3">
              <Card className="h-100" style={{ border: `1px solid ${colors.lightGray}` }}>
                <Card.Body className="p-3">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h5 className="mb-1" style={{ fontSize: '14px', fontWeight: '600' }}>{application.title}</h5>
                      <p className="mb-1" style={{ fontSize: '12px', color: colors.darkGray }}>{application.company}</p>
                      <div className="d-flex flex-wrap gap-1">
                        <Badge 
                          bg={
                            application.status === 'Accepted' ? 'success' : 
                            application.status === 'Rejected' ? 'danger' : 'warning'
                          }
                          style={{ fontSize: '10px' }}
                        >
                          {application.status}
                        </Badge>
                        <Badge bg="light" text="dark" style={{ fontSize: '10px' }}>
                          {application.experience}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-end">
                      <h5 className="mb-0" style={{ fontSize: '14px', fontWeight: '600', color: colors.primaryRed }}>
                        {application.salary}
                      </h5>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <div className="d-flex align-items-center mb-1">
                      <FaMapMarkerAlt className="me-2" size={12} color={colors.darkGray} />
                      <span style={{ fontSize: '12px', color: colors.darkGray }}>{application.location}</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <FaCalendarAlt className="me-2" size={12} color={colors.darkGray} />
                      <span style={{ fontSize: '12px', color: colors.darkGray }}>Applied: {formatDate(application.appliedDate)}</span>
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-wrap gap-1">
                      {application.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} bg="light" text="dark" style={{ fontSize: '10px' }}>
                          {skill}
                        </Badge>
                      ))}
                      {application.skills.length > 3 && (
                        <Badge bg="light" text="dark" style={{ fontSize: '10px' }}>
                          +{application.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <Button 
                      variant="link" 
                      size="sm"
                      style={{ color: colors.primaryRed, padding: '0', fontSize: '12px' }}
                      onClick={() => handleViewJobDetails(application)}
                    >
                      <FaInfoCircle /> Details
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
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
        <div className="row">
          {filteredNewJobs.map(job => (
            <div key={job.id} className="col-12 mb-3">
              <Card className="h-100" style={{ border: `1px solid ${colors.lightGray}` }}>
                <Card.Body className="p-3">
                  <div className="mb-2">
                    <h5 className="mb-1" style={{ fontSize: '14px', fontWeight: '600' }}>{job.title}</h5>
                    <p className="mb-1" style={{ fontSize: '12px', color: colors.darkGray }}>{job.company}</p>
                    <div className="d-flex flex-wrap gap-1">
                      <Badge bg="light" text="dark" style={{ fontSize: '10px' }}>
                        {job.experience}
                      </Badge>
                      <Badge bg="light" text="dark" style={{ fontSize: '10px' }}>
                        {job.jobType}
                      </Badge>
                    </div>
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
                    <div className="d-flex flex-wrap gap-1">
                      {job.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} bg="light" text="dark" style={{ fontSize: '10px' }}>
                          {skill}
                        </Badge>
                      ))}
                      {job.skills.length > 3 && (
                        <Badge bg="light" text="dark" style={{ fontSize: '10px' }}>
                          +{job.skills.length - 3} more
                        </Badge>
                      )}
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
            </div>
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
    <div style={{minHeight: '100vh',  }}>
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
              <h2 style={{ color: colors.black, margin: 0, fontSize: windowWidth < 768 ? '18px' : '20px' }}>Job Applications</h2>
            </div>
            <div className="d-flex align-items-center">
              <InputGroup className="me-2" style={{ maxWidth: windowWidth < 768 ? '150px' : '250px' }}>
                <InputGroup.Text style={{ backgroundColor: colors.lightGray, border: 'none' }}>
                  <FaSearch size={14} color={colors.darkGray} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ fontSize: windowWidth < 768 ? '11px' : '12px' }}
                />
              </InputGroup>
              
            </div>
          </div>
        </div>
      </div>

      <div style={containerStyle} className="py-4">
        {/* Success Alert */}
        {showSuccessAlert && (
          <Alert 
            variant="success" 
            className="d-flex align-items-center mb-3"
            style={{ fontSize: windowWidth < 768 ? '12px' : '14px' }}
            onClose={() => setShowSuccessAlert(false)}
            dismissible
          >
            <FaCheckCircle className="me-2" />
            Your application has been submitted successfully!
          </Alert>
        )}

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
                    style={{ fontSize: windowWidth < 768 ? '10px' : '12px' }}
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
                  style={{ fontSize: windowWidth < 768 ? '10px' : '12px' }}
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
                  <p style={{ color: colors.darkGray, marginTop: '10px', fontSize: windowWidth < 768 ? '12px' : '14px' }}>
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
                    style={{ fontSize: windowWidth < 768 ? '10px' : '12px' }}
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
                  style={{ fontSize: windowWidth < 768 ? '10px' : '12px' }}
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
                  <p style={{ color: colors.darkGray, marginTop: '10px', fontSize: windowWidth < 768 ? '12px' : '14px' }}>
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
              
              {selectedJob.resumeUrl && (
                <div className="mb-4">
                  <h6 style={{ color: colors.darkGray, fontSize: '14px', fontWeight: '500' }}>Resume:</h6>
                  <div className="d-flex align-items-center">
                    <FaFileAlt className="me-2" color={colors.primaryRed} />
                    <a 
                      href={selectedJob.resumeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: colors.primaryRed, textDecoration: 'none', fontSize: '13px' }}
                    >
                      View Resume
                    </a>
                  </div>
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

      {/* Apply Job Modal - Made more compact */}
      <Modal 
        show={showApplyModal} 
        onHide={() => setShowApplyModal(false)} 
        centered 
        size="md"
        dialogClassName={windowWidth < 768 ? "modal-90w" : ""}
        contentClassName={windowWidth < 768 ? "p-2" : ""}
      >
        <Modal.Header 
          closeButton 
          style={{ 
            backgroundColor: colors.primaryRed, 
            color: colors.white,
            padding: windowWidth < 768 ? '8px 12px' : '10px 15px'
          }}
        >
          <Modal.Title style={{ fontSize: windowWidth < 768 ? '14px' : '16px' }}>
            Apply for Job
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: windowWidth < 768 ? '10px' : '15px' }}>
          {selectedJob && (
            <div>
              <div className="mb-3">
                <h5 style={{ color: colors.black, fontWeight: '600', fontSize: windowWidth < 768 ? '14px' : '16px' }}>
                  {selectedJob.title}
                </h5>
                <h6 style={{ color: colors.darkGray, fontSize: windowWidth < 768 ? '12px' : '14px' }}>
                  {selectedJob.company}
                </h6>
              </div>
              
              <Form onSubmit={handleApplySubmit}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontSize: '13px' }}>Resume *</Form.Label>
                  <div className="border rounded p-2" style={{ backgroundColor: colors.lightBg }}>
                    {resumeFile ? (
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <FaFileAlt className="me-2" color={colors.primaryRed} />
                          <span style={{ fontSize: '12px' }}>{resumeFile.name}</span>
                          <span className="ms-2 text-muted" style={{ fontSize: '11px' }}>
                            ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                        <Button 
                          variant="link" 
                          className="text-danger p-0"
                          onClick={handleRemoveResume}
                          style={{ fontSize: '12px' }}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <div 
                          className="text-center p-2 border-dashed rounded"
                          style={{ 
                            border: '2px dashed #ccc', 
                            cursor: 'pointer',
                            backgroundColor: '#f9f9f9',
                            padding: windowWidth < 768 ? '10px' : '15px'
                          }}
                          onClick={() => fileInputRef.current.click()}
                        >
                          <FaFileUpload size={windowWidth < 768 ? 20 : 24} color={colors.darkGray} />
                          <p className="mt-1 mb-0" style={{ fontSize: '12px', color: colors.darkGray }}>
                            Click to upload
                          </p>
                          <p className="mb-0" style={{ fontSize: '10px', color: colors.darkGray }}>
                            PDF or Word, max 5MB
                          </p>
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
                        />
                      </div>
                    )}
                    
                    {isUploading && (
                      <div className="mt-2">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <span style={{ fontSize: '11px' }}>Uploading...</span>
                          <span style={{ fontSize: '11px' }}>{uploadProgress}%</span>
                        </div>
                        <div className="progress" style={{ height: '4px' }}>
                          <div 
                            className="progress-bar" 
                            role="progressbar" 
                            style={{ 
                              width: `${uploadProgress}%`,
                              backgroundColor: colors.primaryRed
                            }}
                            aria-valuenow={uploadProgress} 
                            aria-valuemin="0" 
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontSize: '13px' }}>Cover Letter *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={windowWidth < 768 ? 2 : 3}
                    value={applicationForm.coverLetter}
                    onChange={(e) => setApplicationForm({...applicationForm, coverLetter: e.target.value})}
                    placeholder="Tell us why you're a good fit for this role..."
                    required
                    style={{ fontSize: '12px' }}
                  />
                </Form.Group>
                
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: '13px' }}>Expected Salary *</Form.Label>
                      <Form.Control
                        type="text"
                        value={applicationForm.expectedSalary}
                        onChange={(e) => setApplicationForm({...applicationForm, expectedSalary: e.target.value})}
                        placeholder="e.g., ₹12 LPA"
                        required
                        style={{ fontSize: '12px' }}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: '13px' }}>Current CTC *</Form.Label>
                      <Form.Control
                        type="text"
                        value={applicationForm.currentCTC}
                        onChange={(e) => setApplicationForm({...applicationForm, currentCTC: e.target.value})}
                        placeholder="e.g., ₹10 LPA"
                        required
                        style={{ fontSize: '12px' }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: '13px' }}>Available From *</Form.Label>
                      <Form.Control
                        type="date"
                        value={applicationForm.availableFromDate}
                        onChange={(e) => setApplicationForm({...applicationForm, availableFromDate: e.target.value})}
                        required
                        style={{ fontSize: '12px' }}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: '13px' }}>Notice Period *</Form.Label>
                      <Form.Select
                        value={applicationForm.noticePeriod}
                        onChange={(e) => setApplicationForm({...applicationForm, noticePeriod: e.target.value})}
                        required
                        style={{ fontSize: '12px' }}
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
                    style={{ fontSize: '12px' }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    style={buttonStyle} 
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Submitting...
                      </>
                    ) : (
                      'Submit Application'
                    )}
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