// src/pages/JobSeeker/ApplyForVacancy.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Row, Col, Form, Button, Alert, ProgressBar, Modal } from 'react-bootstrap';
import { 
  FaBriefcase, 
  FaBuilding, 
  FaFileUpload, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaFilePdf,
  FaArrowLeft,
  FaCheckCircle,
  FaTimesCircle,
  FaTrash,
  FaSave,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaClock
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

const ApplyForVacancy = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [jobDetails, setJobDetails] = useState(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    resumeFile: null,
    coverLetter: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [coverLetterFileName, setCoverLetterFileName] = useState('');
  const [coverLetterFile, setCoverLetterFile] = useState(null);

  // Track window width for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch job details on component mount
  useEffect(() => {
    // In a real app, this would be an API call
    // For demo purposes, we'll use mock data that matches JobList
    const mockJobs = {
      1: {
        id: 1,
        title: 'Senior React Developer',
        company: 'Tech Solutions Pvt. Ltd.',
        location: 'Bangalore, India',
        postedDate: '2023-07-01',
        experience: '3-5 years',
        jobType: 'Full-time',
        description: 'We are looking for an experienced React developer to join our team. You will be responsible for developing and implementing user interface components using React.js concepts and workflows. You will also be required to optimize components for maximum performance across a vast array of web-capable devices and browsers.',
        requirements: [
          '3+ years of experience with React.js and JavaScript',
          'Strong proficiency in HTML, CSS, and modern JavaScript',
          'Experience with state management libraries (Redux, MobX, etc.)',
          'Familiarity with RESTful APIs and modern front-end build pipelines',
          'Experience with common front-end development tools such as Babel, Webpack, etc.',
          'A knack for benchmarking and optimization',
          'Familiarity with code versioning tools such as Git'
        ],
        salary: '₹12-15 LPA'
      },
      2: {
        id: 2,
        title: 'Frontend Developer',
        company: 'Digital Innovations',
        location: 'Mumbai, India',
        postedDate: '2023-07-05',
        experience: '2-4 years',
        jobType: 'Full-time',
        description: 'Join our frontend team to build amazing user experiences. You will be responsible for translating UI/UX design wireframes to actual code that will produce visual elements of application. You will work with UI/UX designer and bridge gap between graphical design and technical implementation.',
        requirements: [
          '2+ years of experience in frontend development',
          'Proficiency in HTML5, CSS3, and JavaScript',
          'Experience with modern JavaScript frameworks (React, Vue, Angular)',
          'Understanding of responsive design principles',
          'Experience with version control systems like Git',
          'Good problem-solving skills',
          'Ability to work in an agile environment'
        ],
        salary: '₹8-10 LPA'
      },
      3: {
        id: 3,
        title: 'UI/UX Designer',
        company: 'Creative Minds',
        location: 'Pune, India',
        postedDate: '2023-07-03',
        experience: '1-3 years',
        jobType: 'Full-time',
        description: 'Looking for a creative designer to enhance our product design. You will be responsible for creating beautiful and intuitive user interfaces.',
        requirements: [
          '1-3 years of design experience',
          'Proficiency in design tools',
          'Strong portfolio showcasing your work'
        ],
        salary: '₹6-8 LPA'
      },
      4: {
        id: 4,
        title: 'Full Stack Developer',
        company: 'Tech Innovations',
        location: 'Hyderabad, India',
        postedDate: '2023-07-02',
        experience: '3-6 years',
        jobType: 'Full-time',
        description: 'We are seeking a talented full stack developer to work on our cutting-edge projects. You will work on both frontend and backend development.',
        requirements: [
          '3-6 years of full stack development',
          'Experience with React and Node.js',
          'Knowledge of databases',
          'Understanding of RESTful APIs'
        ],
        salary: '₹10-14 LPA'
      },
      5: {
        id: 5,
        title: 'Mobile App Developer',
        company: 'AppWorks',
        location: 'Remote',
        postedDate: '2023-07-01',
        experience: '2-5 years',
        jobType: 'Remote',
        description: 'Join our mobile team to build innovative apps for millions of users. You will work on both iOS and Android platforms.',
        requirements: [
          '2-5 years of mobile development',
          'Experience with React Native or Flutter',
          'Knowledge of app store guidelines'
        ],
        salary: '₹8-12 LPA'
      },
      6: {
        id: 6,
        title: 'Data Scientist',
        company: 'DataDriven Inc.',
        location: 'Delhi, India',
        postedDate: '2023-06-25',
        experience: '3-6 years',
        jobType: 'Full-time',
        description: 'Join our data science team to build predictive models and analyze complex datasets. You will work with cutting-edge machine learning technologies.',
        requirements: [
          '3-6 years of data science experience',
          'Strong Python skills',
          'Experience with machine learning frameworks',
          'Knowledge of statistics'
        ],
        salary: '₹15-20 LPA'
      },
      7: {
        id: 7,
        title: 'Backend Developer',
        company: 'ServerSide Tech',
        location: 'Chennai, India',
        postedDate: '2023-06-20',
        experience: '2-5 years',
        jobType: 'Full-time',
        description: 'Looking for a backend developer to build scalable APIs and maintain our server infrastructure. You will work with modern backend technologies.',
        requirements: [
          '2-5 years of backend development',
          'Experience with Java or Node.js',
          'Knowledge of databases',
          'Understanding of RESTful APIs'
        ],
        salary: '₹9-13 LPA'
      },
      8: {
        id: 8,
        title: 'HR Manager',
        company: 'People First',
        location: 'Hyderabad, India',
        postedDate: '2023-06-15',
        experience: '3-6 years',
        jobType: 'Full-time',
        description: 'Looking for an experienced HR manager to lead our human resources initiatives. You will manage recruitment, employee relations, and organizational development.',
        requirements: [
          '3-6 years of HR experience',
          'Strong communication skills',
          'Knowledge of HR policies',
          'Experience with recruitment systems'
        ],
        salary: '₹8-12 LPA'
      }
    };

    // If jobId exists, get job details
    if (jobId && mockJobs[jobId]) {
      setJobDetails(mockJobs[jobId]);
    } else {
      // Default job if no jobId provided
      setJobDetails(mockJobs[1]);
    }
  }, [jobId]);

  // Load user data from localStorage if available
  useEffect(() => {
    const userResume = localStorage.getItem('userResume');
    if (userResume) {
      const resumeData = JSON.parse(userResume);
      setFormData({
        fullName: resumeData.fullName || '',
        email: resumeData.email || '',
        phone: resumeData.phone || '',
        resumeFile: null,
        coverLetter: ''
      });
    }
  }, []);

  const containerStyle = {
    maxWidth: '900px',
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
    gap: '8px',
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
    gap: '8px',
    fontSize: '12px',
  };

  const formGroupStyle = {
    marginBottom: '20px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '500',
    color: colors.black,
    fontSize: '13px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    border: `1px solid ${colors.lightGray}`,
    borderRadius: '6px',
    fontSize: '13px',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '120px',
    resize: 'vertical',
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!formData.resumeFile) {
      newErrors.resumeFile = 'Resume file is required';
    } else if (formData.resumeFile.type !== 'application/pdf') {
      newErrors.resumeFile = 'Only PDF files are allowed';
    } else if (formData.resumeFile.size > 5 * 1024 * 1024) {
      newErrors.resumeFile = 'File size must be less than 5MB';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (file) {
      if (fileType === 'resume') {
        setFormData({
          ...formData,
          resumeFile: file
        });
        setUploadedFileName(file.name);
        
        // Clear error for this field
        if (errors.resumeFile) {
          setErrors({
            ...errors,
            resumeFile: ''
          });
        }
      } else if (fileType === 'coverLetter') {
        setCoverLetterFile(file);
        setCoverLetterFileName(file.name);
        
        // Clear error for this field
        if (errors.coverLetterFile) {
          setErrors({
            ...errors,
            coverLetterFile: ''
          });
        }
      }
    }
  };

  const handleRemoveFile = (fileType) => {
    if (fileType === 'resume') {
      setFormData({
        ...formData,
        resumeFile: null
      });
      setUploadedFileName('');
    } else if (fileType === 'coverLetter') {
      setCoverLetterFile(null);
      setCoverLetterFileName('');
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      resumeFile: null,
      coverLetter: ''
    });
    setUploadedFileName('');
    setCoverLetterFileName('');
    setCoverLetterFile(null);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      // Simulate file upload with progress
      const uploadInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(uploadInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setUploadProgress(100);
      
      // Save application data to localStorage (in real app, this would be an API call)
      const applicationData = {
        jobId: jobDetails.id,
        jobTitle: jobDetails.title,
        company: jobDetails.company,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        resumeFileName: uploadedFileName,
        coverLetterFileName: coverLetterFileName,
        coverLetter: formData.coverLetter,
        appliedAt: new Date().toISOString(),
        status: 'Pending'
      };
      
      // Get existing applications or initialize empty array
      const existingApplications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
      localStorage.setItem('jobApplications', JSON.stringify([...existingApplications, applicationData]));
      
      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccessModal(true);
        setShowApplicationModal(false);
      }, 500);
      
    } catch (error) {
      setIsSubmitting(false);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const handleSaveDraft = () => {
    const draftData = {
      jobId: jobDetails.id,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      coverLetter: formData.coverLetter,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem('applicationDraft', JSON.stringify(draftData));
    alert('Draft saved successfully!');
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    resetForm();
    setUploadProgress(0);
    // Don't navigate to another page, just close the modal
  };

  const handleCloseApplicationModal = () => {
    setShowApplicationModal(false);
  };

  // Load draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('applicationDraft');
    if (savedDraft) {
      const draft = JSON.parse(savedDraft);
      // Only load draft if it's for the same job
      if (draft.jobId === jobDetails?.id) {
        setFormData({
          fullName: draft.fullName || '',
          email: draft.email || '',
          phone: draft.phone || '',
          resumeFile: null,
          coverLetter: draft.coverLetter || ''
        });
      }
    }
  }, [jobDetails]);

  if (!jobDetails) {
    return (
      <div style={{ backgroundColor: colors.lightBg, minHeight: '100vh' }}>
        <div style={containerStyle} className="py-4">
          <div className="text-center py-5">
            <div className="spinner-border text-primary"></div>
            <p className="mt-3" style={{ color: colors.darkGray }}>Loading job details...</p>
          </div>
        </div>
      </div>
    );
  }

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
        <div style={containerStyle}>
          <div className="d-flex align-items-center">
            <Button 
              variant="link" 
              className="me-3 p-0"
              onClick={() => navigate('/job-portal/job-list')}
              style={{ color: colors.primaryRed }}
            >
              <FaArrowLeft size={18} />
            </Button>
            <h2 style={{ color: colors.black, margin: 0, fontSize: '20px' }}>Apply for Job</h2>
          </div>
        </div>
      </div>

      <div style={containerStyle} className="py-4">
        {/* Error Alert */}
        {showError && (
          <Alert variant="danger" className="mb-4" style={{ fontSize: '13px' }}>
            <FaTimesCircle className="me-2" />
            Failed to submit application. Please try again later.
          </Alert>
        )}

        {/* Job Details Card */}
        <Card style={cardStyle}>
          <div style={headerStyle}>
            <FaBriefcase className="me-2" />
            Job Details
          </div>
          <Card.Body className="p-4">
            <Row className="mb-3">
              <Col md={8}>
                <h4 style={{ color: colors.black, fontWeight: '600', fontSize: '18px' }}>{jobDetails.title}</h4>
                <h5 style={{ color: colors.darkGray, fontSize: '16px' }}>{jobDetails.company}</h5>
              </Col>
              <Col md={4} className="text-md-end">
                <h5 style={{ color: colors.primaryRed, fontWeight: '600', fontSize: '16px' }}>{jobDetails.salary}</h5>
              </Col>
            </Row>
            
            <Row className="mb-3">
              <Col md={4}>
                <div className="d-flex align-items-center mb-2">
                  <FaMapMarkerAlt className="me-2" color={colors.primaryRed} />
                  <span style={{ fontSize: '13px', color: colors.darkGray }}>{jobDetails.location}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className="d-flex align-items-center mb-2">
                  <FaGraduationCap className="me-2" color={colors.primaryRed} />
                  <span style={{ fontSize: '13px', color: colors.darkGray }}>{jobDetails.experience}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className="d-flex align-items-center mb-2">
                  <FaClock className="me-2" color={colors.primaryRed} />
                  <span style={{ fontSize: '13px', color: colors.darkGray }}>Posted: {formatDate(jobDetails.postedDate)}</span>
                </div>
              </Col>
            </Row>
            
            <div className="mb-3">
              <h6 style={{ color: colors.black, fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Job Description</h6>
              <p style={{ fontSize: '13px', color: colors.black, lineHeight: '1.5' }}>{jobDetails.description}</p>
            </div>
            
            <div>
              <h6 style={{ color: colors.black, fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Requirements</h6>
              <ul style={{ fontSize: '13px', color: colors.black, paddingLeft: '20px' }}>
                {jobDetails.requirements.map((req, index) => (
                  <li key={index} style={{ marginBottom: '5px' }}>{req}</li>
                ))}
              </ul>
            </div>
            
            <div className="mt-4 text-center">
              <Button 
                style={buttonStyle}
                onClick={() => setShowApplicationModal(true)}
                size="lg"
              >
                Apply for this Position
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Application Form Modal */}
      <Modal 
        show={showApplicationModal} 
        onHide={handleCloseApplicationModal} 
        centered 
        size="lg"
        scrollable
      >
        <Modal.Header closeButton style={{ backgroundColor: colors.primaryRed, color: colors.white }}>
          <Modal.Title className="d-flex align-items-center">
            <FaFileUpload className="me-2" />
            Application Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group style={formGroupStyle}>
                  <Form.Label style={labelStyle}>
                    <FaUser className="me-2" />
                    Full Name *
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    isInvalid={!!errors.fullName}
                    style={inputStyle}
                  />
                  <Form.Control.Feedback type="invalid" style={{ fontSize: '12px' }}>
                    {errors.fullName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group style={formGroupStyle}>
                  <Form.Label style={labelStyle}>
                    <FaEnvelope className="me-2" />
                    Email *
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    isInvalid={!!errors.email}
                    style={inputStyle}
                  />
                  <Form.Control.Feedback type="invalid" style={{ fontSize: '12px' }}>
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group style={formGroupStyle}>
                  <Form.Label style={labelStyle}>
                    <FaPhone className="me-2" />
                    Phone *
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    isInvalid={!!errors.phone}
                    style={inputStyle}
                  />
                  <Form.Control.Feedback type="invalid" style={{ fontSize: '12px' }}>
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group style={formGroupStyle}>
              <Form.Label style={labelStyle}>
                <FaFilePdf className="me-2" />
                Upload Resume (PDF) *
              </Form.Label>
              <div className="d-flex align-items-center">
                <Form.Control
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileChange(e, 'resume')}
                  isInvalid={!!errors.resumeFile}
                  style={{ display: 'none' }}
                  id="resume-upload"
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => document.getElementById('resume-upload').click()}
                  style={{
                    ...secondaryButtonStyle,
                    backgroundColor: colors.lightBg,
                    borderColor: colors.lightGray,
                    color: colors.darkGray
                  }}
                >
                  <FaFileUpload className="me-2" />
                  Choose File
                </Button>
                {uploadedFileName && (
                  <div className="d-flex align-items-center ms-3">
                    <FaFilePdf color={colors.primaryRed} className="me-2" />
                    <span style={{ fontSize: '13px', color: colors.black }}>{uploadedFileName}</span>
                    <Button
                      variant="link"
                      onClick={() => handleRemoveFile('resume')}
                      style={{ color: colors.primaryRed, padding: '0 0 0 10px' }}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                )}
              </div>
              <Form.Control.Feedback type="invalid" style={{ fontSize: '12px', display: 'block' }}>
                {errors.resumeFile}
              </Form.Control.Feedback>
              <Form.Text style={{ fontSize: '11px', color: colors.darkGray }}>
                Maximum file size: 5MB. Only PDF files are allowed.
              </Form.Text>
            </Form.Group>

            <Form.Group style={formGroupStyle}>
              <Form.Label style={labelStyle}>
                <FaFilePdf className="me-2" />
                Upload Cover Letter (Optional)
              </Form.Label>
              <div className="d-flex align-items-center">
                <Form.Control
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileChange(e, 'coverLetter')}
                  isInvalid={!!errors.coverLetterFile}
                  style={{ display: 'none' }}
                  id="cover-letter-upload"
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => document.getElementById('cover-letter-upload').click()}
                  style={{
                    ...secondaryButtonStyle,
                    backgroundColor: colors.lightBg,
                    borderColor: colors.lightGray,
                    color: colors.darkGray
                  }}
                >
                  <FaFileUpload className="me-2" />
                  Choose File
                </Button>
                {coverLetterFileName && (
                  <div className="d-flex align-items-center ms-3">
                    <FaFilePdf color={colors.primaryRed} className="me-2" />
                    <span style={{ fontSize: '13px', color: colors.black }}>{coverLetterFileName}</span>
                    <Button
                      variant="link"
                      onClick={() => handleRemoveFile('coverLetter')}
                      style={{ color: colors.primaryRed, padding: '0 0 0 10px' }}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                )}
              </div>
              <Form.Control.Feedback type="invalid" style={{ fontSize: '12px', display: 'block' }}>
                {errors.coverLetterFile}
              </Form.Control.Feedback>
              <Form.Text style={{ fontSize: '11px', color: colors.darkGray }}>
                Maximum file size: 5MB. Only PDF files are allowed.
              </Form.Text>
            </Form.Group>

            <Form.Group style={formGroupStyle}>
              <Form.Label style={labelStyle}>Cover Letter (Optional)</Form.Label>
              <Form.Control
                as="textarea"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                placeholder="Tell us why you're a good fit for this role..."
                style={textareaStyle}
              />
              <Form.Text style={{ fontSize: '11px', color: colors.darkGray }}>
                You can either upload a PDF cover letter or type it here.
              </Form.Text>
            </Form.Group>

            {isSubmitting && (
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span style={{ fontSize: '12px', color: colors.darkGray }}>Submitting...</span>
                  <span style={{ fontSize: '12px', color: colors.darkGray }}>{uploadProgress}%</span>
                </div>
                <ProgressBar 
                  now={uploadProgress} 
                  style={{ height: '8px' }}
                  variant="danger"
                />
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary"
            onClick={handleCloseApplicationModal}
            style={{ fontSize: '13px' }}
          >
            Cancel
          </Button>
          <div>
            <Button 
              variant="outline-secondary"
              className="me-2"
              onClick={handleSaveDraft}
              style={{ fontSize: '13px' }}
            >
              <FaSave className="me-1" />
              Save Draft
            </Button>
            <Button 
              type="submit"
              style={buttonStyle}
              disabled={isSubmitting}
              onClick={handleSubmit}
              onMouseEnter={(e) => !isSubmitting && (e.target.style.backgroundColor = colors.darkRed)}
              onMouseLeave={(e) => !isSubmitting && (e.target.style.backgroundColor = colors.primaryRed)}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} centered>
        <Modal.Header closeButton style={{ backgroundColor: colors.primaryRed, color: colors.white }}>
          <Modal.Title className="d-flex align-items-center">
            <FaCheckCircle className="me-2" />
            Applied Successfully!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          <div className="mb-4">
            <FaCheckCircle size={60} color={colors.successGreen} />
          </div>
          <h5 style={{ color: colors.black, marginBottom: '10px' }}>
            Your application has been submitted successfully!
          </h5>
          <p style={{ color: colors.darkGray, fontSize: '14px', marginBottom: '20px' }}>
            We will review your application and get back to you soon.
          </p>
          <div className="d-flex justify-content-center">
            <Button 
              style={buttonStyle}
              onClick={() => {
                setShowSuccessModal(false);
                resetForm();
                setUploadProgress(0);
                navigate('/job-portal/job-list');
              }}
            >
              View More Jobs
            </Button>
            <Button 
              variant="outline-secondary"
              className="ms-2"
              onClick={handleCloseSuccessModal}
            >
              Close
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ApplyForVacancy;