// src/Dashboard/JobPortal/JobList.jsx

// NOTE: All import statements MUST be at the very top of the file.
import React, { useState, useMemo } from 'react';
import { Row, Col, Card, Button, Badge, Form, InputGroup, Modal, Table } from 'react-bootstrap'; // Added Table import
import { 
  FaMapMarkerAlt, 
  FaBriefcase, 
  FaRupeeSign, 
  FaSearch,
  FaCalendarAlt,
  FaEye,
  FaTrash,
  FaFileAlt
} from 'react-icons/fa';

// --- Dummy Applied Jobs Data ---
const appliedJobsData = [
  {
    id: 1,
    jobTitle: 'Senior Frontend Developer',
    company: 'Tech Solutions Inc.',
    location: 'Bangalore, India',
    salary: '₹15-25 LPA',
    jobType: 'Full-Time',
    appliedDate: new Date('2023-10-20'),
    status: 'Shortlisted',
    logo: 'https://i.pravatar.cc/150?img=1',
    resumeName: 'John_Doe_Resume.pdf',
    coverLetter: 'I am very excited about this opportunity...'
  },
  {
    id: 2,
    jobTitle: 'Product Manager',
    company: 'Innovate Corp',
    location: 'Mumbai, India',
    salary: '₹25-35 LPA',
    jobType: 'Full-Time',
    appliedDate: new Date('2023-10-18'),
    status: 'Pending',
    logo: 'https://i.pravatar.cc/150?img=2',
    resumeName: 'John_Doe_Resume.pdf',
    coverLetter: 'With my extensive experience in product...'
  },
  {
    id: 3,
    jobTitle: 'UX Designer',
    company: 'Creative Minds',
    location: 'Pune, India',
    salary: '₹8-12 LPA',
    jobType: 'Part-Time',
    appliedDate: new Date('2023-10-15'),
    status: 'Not Selected',
    logo: 'https://i.pravatar.cc/150?img=3',
    resumeName: 'John_Doe_Resume.pdf',
    coverLetter: 'My design philosophy aligns perfectly...'
  },
  {
    id: 4,
    jobTitle: 'Backend Developer (Node.js)',
    company: 'Digital Dynamics',
    location: 'Remote',
    salary: '₹12-20 LPA',
    jobType: 'Full-Time',
    appliedDate: new Date('2023-10-10'),
    status: 'Pending',
    logo: 'https://i.pravatar.cc/150?img=4',
    resumeName: 'John_Doe_Resume.pdf',
    coverLetter: 'I have a strong background in Node.js...'
  },
  {
    id: 5,
    jobTitle: 'Data Scientist',
    company: 'DataWise Analytics',
    location: 'Hyderabad, India',
    salary: '₹18-30 LPA',
    jobType: 'Contract',
    appliedDate: new Date('2023-10-05'),
    status: 'Shortlisted',
    logo: 'https://i.pravatar.cc/150?img=5',
    resumeName: 'John_Doe_Resume.pdf',
    coverLetter: 'My analytical skills and experience in ML...'
  },
];

// --- Main Applied Jobs Page Component ---
const JobList = () => {
  const [appliedJobs, setAppliedJobs] = useState(appliedJobsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Memoize unique values for filter dropdown
  const uniqueStatuses = useMemo(() => ['all', ...new Set(appliedJobs.map(job => job.status))], [appliedJobs]);

  // Filter logic
  const filteredJobs = useMemo(() => {
    let result = appliedJobs;

    // Search filter
    if (searchTerm) {
      result = result.filter(job =>
        job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filterStatus !== 'all') {
      result = result.filter(job => job.status === filterStatus);
    }

    return result;
  }, [appliedJobs, searchTerm, filterStatus]);

  // --- Handler Functions ---
  const handleViewJob = (jobId) => {
    alert(`Viewing job with ID: ${jobId}. In a real app, this would navigate to the job page.`);
  };

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
    setShowApplicationModal(true);
  };

  const handleWithdrawApplication = (jobId) => {
    const jobToWithdraw = appliedJobs.find(job => job.id === jobId);
    if (window.confirm(`Are you sure you want to withdraw your application for "${jobToWithdraw.jobTitle}" at "${jobToWithdraw.company}"?`)) {
      setAppliedJobs(appliedJobs.filter(job => job.id !== jobId));
      alert('Application withdrawn successfully.');
    }
  };

  // Helper function to format date
  const formatDate = (date) => {
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };
  
  // Helper function for status badge variant
  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'Shortlisted':
        return 'success';
      case 'Pending':
        return 'info';
      case 'Not Selected':
      case 'Rejected':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div className="container py-4">
        {/* Header Section */}
        <header className="mb-4">
          <h1 className="h2">Applied Jobs</h1>
          <p className="text-muted">Track the status of your job applications.</p>
        </header>

        {/* Search and Filter Bar */}
        <Row className="g-3 mb-4 align-items-end">
          <Col md={8}>
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
          <Col md={4}>
            <Form.Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">All Status</option>
              {uniqueStatuses.slice(1).map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        {/* Job List Table */}
        <Card className="shadow-sm">
          <Card.Body className="p-0">
            <div className="table-responsive">
              <Table hover className="mb-0">
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
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => (
                      <tr key={job.id}>
                        <td>{job.jobTitle}</td>
                        <td>{job.company}</td>
                        <td><FaMapMarkerAlt className="me-2" />{job.location}</td>
                        <td>{formatDate(job.appliedDate)}</td>
                        <td><Badge bg={getStatusBadgeVariant(job.status)}>{job.status}</Badge></td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button variant="outline-primary" size="sm" onClick={() => handleViewJob(job.id)}>
                              <FaEye className="me-1" /> View
                            </Button>
                            <Button variant="outline-secondary" size="sm" onClick={() => handleViewApplication(job)}>
                              <FaFileAlt className="me-1" /> App
                            </Button>
                            <Button variant="outline-danger" size="sm" onClick={() => handleWithdrawApplication(job.id)}>
                              <FaTrash className="me-1" /> Withdraw
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-muted">
                        No applied jobs found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Application Detail Modal */}
      <Modal show={showApplicationModal} onHide={() => setShowApplicationModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Application Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedApplication && (
            <>
              <h5>{selectedApplication.jobTitle}</h5>
              <p className="text-muted">{selectedApplication.company}</p>
              <hr />
              <Row>
                <Col md={6}>
                  <p><strong>Applied Date:</strong> {formatDate(selectedApplication.appliedDate)}</p>
                  <p><strong>Resume:</strong> {selectedApplication.resumeName}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Status:</strong> <Badge bg={getStatusBadgeVariant(selectedApplication.status)}>{selectedApplication.status}</Badge></p>
                </Col>
              </Row>
              <hr />
              <h6>Cover Letter</h6>
              <p>{selectedApplication.coverLetter}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowApplicationModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default JobList;