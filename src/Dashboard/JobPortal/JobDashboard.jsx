// src/pages/JobSeeker/JobListing.js

import React, { useState, useMemo } from 'react';
import { Row, Col, Card, Button, Badge, Form, InputGroup } from 'react-bootstrap';
import { 
  FaMapMarkerAlt, 
  FaBriefcase, 
  FaRupeeSign, 
  FaSearch,
  FaCalendarAlt,
  FaBuilding,
  FaLaptopHouse,
  FaUsers,
  FaArrowLeft
} from 'react-icons/fa';

// --- Dummy Job Data ---
const jobsData = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'Tech Solutions Inc.',
    location: 'Bangalore, India',
    experience: '4-6 years',
    salary: '₹15-25 LPA',
    jobType: 'Full-Time',
    workMode: 'Remote',
    postedDate: new Date('2023-10-26'),
    logo: 'https://i.pravatar.cc/150?img=1',
    description: 'We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user-facing web applications and ensuring a great user experience.',
    skills: ['React', 'JavaScript', 'CSS', 'HTML', 'Redux']
  },
  {
    id: 2,
    title: 'Product Manager',
    company: 'Innovate Corp',
    location: 'Mumbai, India',
    experience: '5-8 years',
    salary: '₹25-35 LPA',
    jobType: 'Full-Time',
    workMode: 'On-site',
    postedDate: new Date('2023-10-25'),
    logo: 'https://i.pravatar.cc/150?img=2',
    description: 'Seeking an experienced Product Manager to lead our product strategy and development lifecycle. The ideal candidate will have a strong background in tech and a passion for user-centric products.',
    skills: ['Product Strategy', 'Agile', 'Scrum', 'User Research', 'Data Analysis']
  },
  {
    id: 3,
    title: 'UX Designer',
    company: 'Creative Minds',
    location: 'Pune, India',
    experience: '2-4 years',
    salary: '₹8-12 LPA',
    jobType: 'Part-Time',
    workMode: 'Hybrid',
    postedDate: new Date('2023-10-24'),
    logo: 'https://i.pravatar.cc/150?img=3',
    description: 'Join our creative team as a UX Designer. You will be responsible for creating wireframes, prototypes, and high-fidelity designs for our web and mobile applications.',
    skills: ['Figma', 'Adobe XD', 'Wireframing', 'Prototyping', 'User Flows']
  },
  {
    id: 4,
    title: 'Backend Developer (Node.js)',
    company: 'Digital Dynamics',
    location: 'Remote',
    experience: '3-5 years',
    salary: '₹12-20 LPA',
    jobType: 'Full-Time',
    workMode: 'Remote',
    postedDate: new Date('2023-10-23'),
    logo: 'https://i.pravatar.cc/150?img=4',
    description: 'We are hiring a Backend Developer with expertise in Node.js to build and maintain our server-side logic. You will work closely with frontend developers to ensure seamless integration.',
    skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'JWT']
  },
  {
    id: 5,
    title: 'Data Scientist',
    company: 'DataWise Analytics',
    location: 'Hyderabad, India',
    experience: '3-6 years',
    salary: '₹18-30 LPA',
    jobType: 'Contract',
    workMode: 'Hybrid',
    postedDate: new Date('2023-10-22'),
    logo: 'https://i.pravatar.cc/150?img=5',
    description: 'Looking for a Data Scientist to analyze large datasets and generate actionable insights. Experience with machine learning models is a must.',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'Pandas', 'SQL']
  },
  {
    id: 6,
    title: 'Junior React Developer',
    company: 'StartUp Hub',
    location: 'Delhi, India',
    experience: '1-2 years',
    salary: '₹4-8 LPA',
    jobType: 'Full-Time',
    workMode: 'On-site',
    postedDate: new Date('2023-10-21'),
    logo: 'https://i.pravatar.cc/150?img=6',
    description: 'An exciting opportunity for a Junior React Developer to grow their skills in a fast-paced startup environment. You will contribute to various client projects.',
    skills: ['React', 'JavaScript', 'CSS', 'Git', 'HTML']
  },
  {
    id: 7,
    title: 'DevOps Engineer',
    company: 'CloudTech Systems',
    location: 'Bangalore, India',
    experience: '4-7 years',
    salary: '₹20-30 LPA',
    jobType: 'Full-Time',
    workMode: 'Remote',
    postedDate: new Date('2023-10-20'),
    logo: 'https://i.pravatar.cc/150?img=7',
    description: 'We need a DevOps Engineer to automate and streamline our operations and processes. You will be responsible for building and maintaining CI/CD pipelines.',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform']
  },
  {
    id: 8,
    title: 'Marketing Intern',
    company: 'Growth Hackers',
    location: 'Mumbai, India',
    experience: '0-1 year',
    salary: '₹2-3 LPA',
    jobType: 'Internship',
    workMode: 'Remote',
    postedDate: new Date('2023-10-19'),
    logo: 'https://i.pravatar.cc/150?img=8',
    description: 'A great learning opportunity for a Marketing Intern to assist with our digital marketing campaigns and social media presence.',
    skills: ['Social Media', 'Content Writing', 'SEO', 'Google Analytics']
  },
];

// --- Reusable JobCard Component ---
const JobCard = ({ job, onViewClick }) => {
  const formatDate = (date) => {
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  return (
    <Card className="h-100 shadow-sm job-card">
      <Card.Body className="d-flex flex-column">
        <div className="d-flex align-items-center mb-3">
          <img src={job.logo} alt={job.company} className="me-3" style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px' }} />
          <div>
            <Card.Title as="h5" className="mb-1">{job.title}</Card.Title>
            <Card.Subtitle className="text-muted">{job.company}</Card.Subtitle>
          </div>
        </div>
        
        <div className="mb-2 text-muted small">
          <div className="mb-1"><FaMapMarkerAlt className="me-2" />{job.location}</div>
          <div className="mb-1"><FaBriefcase className="me-2" />{job.experience}</div>
          <div className="mb-1"><FaRupeeSign className="me-2" />{job.salary}</div>
        </div>

        <div className="d-flex flex-wrap gap-1 mb-3 mt-auto">
          <Badge bg="info" text="dark">{job.jobType}</Badge>
          <Badge bg={job.workMode === 'Remote' ? 'success' : job.workMode === 'Hybrid' ? 'warning' : 'secondary'}>
            {job.workMode === 'Remote' && <FaLaptopHouse className="me-1"/>}
            {job.workMode === 'On-site' && <FaBuilding className="me-1"/>}
            {job.workMode === 'Hybrid' && <FaUsers className="me-1"/>}
            {job.workMode}
          </Badge>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-auto gap-2">
          <small className="text-muted"><FaCalendarAlt className="me-1" />{formatDate(job.postedDate)}</small>
          <div>
            <Button variant="outline-primary" size="sm" className="me-2">Apply Now</Button>
            <Button variant="primary" size="sm" onClick={() => onViewClick(job.id)}>View Job</Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

// --- Job Details View Component ---
const JobDetailsView = ({ job, onBackClick }) => {
  if (!job) return null;

  const formatDate = (date) => {
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="container">
      <Button variant="secondary" onClick={onBackClick} className="mb-4">
        <FaArrowLeft className="me-2" /> Back to Jobs
      </Button>
      
      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <Row className="mb-4">
            <Col md={8}>
              <div className="d-flex align-items-center mb-3">
                <img src={job.logo} alt={job.company} className="me-3" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                <div>
                  <Card.Title as="h2" className="mb-1">{job.title}</Card.Title>
                  <Card.Subtitle as="h5" className="text-muted">{job.company}</Card.Subtitle>
                </div>
              </div>
            </Col>
            <Col md={4} className="text-md-end mt-3 mt-md-0">
              <Button variant="primary" size="lg">Apply Now</Button>
            </Col>
          </Row>
          
          <Row className="mb-4 text-muted">
            <Col sm={6} md={3} className="mb-2">
              <FaMapMarkerAlt className="me-2" />{job.location}
            </Col>
            <Col sm={6} md={3} className="mb-2">
              <FaBriefcase className="me-2" />{job.experience}
            </Col>
            <Col sm={6} md={3} className="mb-2">
              <FaRupeeSign className="me-2" />{job.salary}
            </Col>
            <Col sm={6} md={3} className="mb-2">
              <FaCalendarAlt className="me-2" />{formatDate(job.postedDate)}
            </Col>
          </Row>

          <div className="mb-4">
            <h5>Job Description</h5>
            <p>{job.description}</p>
          </div>

          <div className="mb-4">
            <h5>Skills Required</h5>
            <div className="d-flex flex-wrap gap-2">
              {job.skills.map(skill => <Badge key={skill} bg="light" text="dark">{skill}</Badge>)}
            </div>
          </div>

          <div className="d-flex flex-wrap gap-2">
            <Badge bg="info" text="dark">{job.jobType}</Badge>
            <Badge bg={job.workMode === 'Remote' ? 'success' : job.workMode === 'Hybrid' ? 'warning' : 'secondary'}>
              {job.workMode === 'Remote' && <FaLaptopHouse className="me-1"/>}
              {job.workMode === 'On-site' && <FaBuilding className="me-1"/>}
              {job.workMode === 'Hybrid' && <FaUsers className="me-1"/>}
              {job.workMode}
            </Badge>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

// --- Main Job Listing Page Component ---
const JobDashboard = () => {
  const [jobs] = useState(jobsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    jobType: '',
    location: '',
    experience: '',
    workMode: '',
  });
  const [selectedJobId, setSelectedJobId] = useState(null); // State to control the view

  // Memoize unique values for dropdowns
  const uniqueLocations = useMemo(() => [...new Set(jobs.map(job => job.location))], [jobs]);
  const uniqueExperiences = useMemo(() => [...new Set(jobs.map(job => job.experience))], [jobs]);
  const uniqueJobTypes = useMemo(() => [...new Set(jobs.map(job => job.jobType))], [jobs]);
  const uniqueWorkModes = useMemo(() => [...new Set(jobs.map(job => job.workMode))], [jobs]);

  // Filter logic
  const filteredJobs = useMemo(() => {
    let result = jobs;

    if (searchTerm) {
      result = result.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.jobType) {
      result = result.filter(job => job.jobType === filters.jobType);
    }

    if (filters.location) {
      result = result.filter(job => job.location === filters.location);
    }

    if (filters.experience) {
      result = result.filter(job => job.experience === filters.experience);
    }

    if (filters.workMode) {
      result = result.filter(job => job.workMode === filters.workMode);
    }

    return result;
  }, [jobs, searchTerm, filters]);

  const handleViewJob = (jobId) => {
    setSelectedJobId(jobId);
  };

  const handleBackToList = () => {
    setSelectedJobId(null);
  };

  const selectedJob = jobs.find(job => job.id === selectedJobId);

  return (
    <div className="container-fluid" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Conditional Rendering: Show Job Details or Job List */}
      {selectedJobId ? (
        <JobDetailsView job={selectedJob} onBackClick={handleBackToList} />
      ) : (
        <>
          {/* Header Section */}
          <header className="bg-white py-3 mb-4 shadow-sm">
            <div className="container">
              <h1 className="h2 mb-3">Find Jobs</h1>
              <Row className="align-items-center">
                <Col md={6} lg={8}>
                  <InputGroup>
                    <InputGroup.Text><FaSearch /></InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Search by Job Title, Company, or Location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                </Col>
              </Row>
            </div>
          </header>

          {/* Filter Bar */}
          <div className="container mb-4">
            <Card className="shadow-sm">
              <Card.Body className="py-2">
                <Row className="g-2 align-items-center">
                  <Col sm={6} md={3}>
                    <Form.Select value={filters.jobType} onChange={(e) => setFilters(prev => ({ ...prev, jobType: e.target.value }))}>
                      <option value="">All Job Types</option>
                      {uniqueJobTypes.map(type => <option key={type} value={type}>{type}</option>)}
                    </Form.Select>
                  </Col>
                  <Col sm={6} md={3}>
                    <Form.Select value={filters.location} onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}>
                      <option value="">All Locations</option>
                      {uniqueLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                    </Form.Select>
                  </Col>
                  <Col sm={6} md={3}>
                    <Form.Select value={filters.experience} onChange={(e) => setFilters(prev => ({ ...prev, experience: e.target.value }))}>
                      <option value="">All Experience</option>
                      {uniqueExperiences.map(exp => <option key={exp} value={exp}>{exp}</option>)}
                    </Form.Select>
                  </Col>
                  <Col sm={6} md={3}>
                    <Form.Select value={filters.workMode} onChange={(e) => setFilters(prev => ({ ...prev, workMode: e.target.value }))}>
                      <option value="">All Work Modes</option>
                      {uniqueWorkModes.map(mode => <option key={mode} value={mode}>{mode}</option>)}
                    </Form.Select>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>

          {/* Main Job List */}
          <div className="container">
            <h4 className="mb-4">All Jobs ({filteredJobs.length})</h4>
            <Row xs={1} sm={1} md={2} lg={2} xl={2} className="g-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                  <Col key={job.id}>
                    <JobCard job={job} onViewClick={handleViewJob} />
                  </Col>
                ))
              ) : (
                <Col>
                  <p className="text-center text-muted mt-4">No jobs found matching your criteria.</p>
                </Col>
              )}
            </Row>
          </div>
        </>
      )}
    </div>
  );
};

export default JobDashboard;