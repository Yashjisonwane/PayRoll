import React, { useState, useEffect } from 'react';
import { FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave, FaPlus, FaTimes, FaEye, FaSearch, FaFilter, FaUser, FaCalendarAlt, FaEdit, FaTrash, FaCheck, FaClock } from 'react-icons/fa';
import "bootstrap/dist/css/bootstrap.min.css";

const JobVacancies = () => {
  // State for managing job postings
  const [jobPostings, setJobPostings] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      salary: "₹80,000 - ₹120,000",
      location: "Mumbai, Maharashtra",
      department: "Engineering",
      type: "Full-time",
      experience: "5+ years",
      description: "We are looking for an experienced frontend developer with expertise in React.js and modern UI/UX practices.",
      requirements: "5+ years of experience in frontend development, Proficiency in React.js, Strong understanding of UI/UX principles",
      postedDate: "2025-12-01",
      expiryDate: "2025-12-31",
      status: "Active",
      applicants: 12,
      views: 245
    },
    {
      id: 2,
      title: "Product Manager",
      salary: "₹100,000 - ₹150,000",
      location: "Bangalore, Karnataka",
      department: "Product",
      type: "Full-time",
      experience: "7+ years",
      description: "Seeking a strategic product manager to lead our product development lifecycle and collaborate with cross-functional teams.",
      requirements: "7+ years of product management experience, MBA or equivalent, Strong analytical and leadership skills",
      postedDate: "2025-11-28",
      expiryDate: "2025-12-28",
      status: "Active",
      applicants: 8,
      views: 189
    },
    {
      id: 3,
      title: "UX Designer",
      salary: "₹70,000 - ₹100,000",
      location: "Pune, Maharashtra",
      department: "Design",
      type: "Full-time",
      experience: "3+ years",
      description: "Looking for a creative UX designer to create intuitive and visually appealing user interfaces for our products.",
      requirements: "3+ years of UX design experience, Proficiency in design tools, Strong portfolio of UX projects",
      postedDate: "2025-11-25",
      expiryDate: "2025-12-25",
      status: "Closed",
      applicants: 15,
      views: 312
    }
  ]);

  // State for managing job applications
  const [jobApplications, setJobApplications] = useState([
    {
      id: 1,
      jobId: 1,
      applicantName: "Rahul Sharma",
      email: "rahul.sharma@email.com",
      phone: "+91 9876543210",
      experience: "5 years",
      skills: "React.js, JavaScript, CSS, HTML",
      education: "B.Tech in Computer Science",
      appliedDate: "2025-12-05",
      status: "Under Review",
      resume: "resume_rahul.pdf"
    },
    {
      id: 2,
      jobId: 1,
      applicantName: "Priya Patel",
      email: "priya.patel@email.com",
      phone: "+91 9876543211",
      experience: "3 years",
      skills: "Vue.js, JavaScript, CSS, HTML",
      education: "MCA",
      appliedDate: "2025-12-04",
      status: "Shortlisted",
      resume: "resume_priya.pdf"
    },
    {
      id: 3,
      jobId: 2,
      applicantName: "Amit Singh",
      email: "amit.singh@email.com",
      phone: "+91 9876543212",
      experience: "7 years",
      skills: "Product Strategy, Market Research, Data Analysis",
      education: "MBA from IIM",
      appliedDate: "2025-12-03",
      status: "Interview Scheduled",
      resume: "resume_amit.pdf"
    }
  ]);

  // State for form inputs
  const [newJob, setNewJob] = useState({
    title: "",
    salary: "",
    location: "",
    department: "",
    type: "Full-time",
    experience: "",
    description: "",
    requirements: "",
    expiryDate: ""
  });

  // State for UI controls
  const [showPostForm, setShowPostForm] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [activeTab, setActiveTab] = useState("postings");
  const [editingJob, setEditingJob] = useState(null);
  const [viewingApplication, setViewingApplication] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob(prev => ({ ...prev, [name]: value }));
  };

  // Handle job posting submission
  const handlePostJob = (e) => {
    e.preventDefault();
    
    if (!newJob.title || !newJob.salary || !newJob.location || !newJob.description || !newJob.requirements) {
      alert("Please fill in all required fields");
      return;
    }

    const jobToAdd = {
      id: editingJob ? editingJob.id : Date.now(),
      ...newJob,
      postedDate: editingJob ? editingJob.postedDate : new Date().toISOString().split('T')[0],
      status: "Active",
      applicants: editingJob ? editingJob.applicants : 0,
      views: editingJob ? editingJob.views : 0
    };

    if (editingJob) {
      // Update existing job
      setJobPostings(jobPostings.map(job => job.id === editingJob.id ? jobToAdd : job));
      setEditingJob(null);
      alert("Job updated successfully!");
    } else {
      // Add new job
      setJobPostings([jobToAdd, ...jobPostings]);
      alert("Job posted successfully!");
    }
    
    // Reset form
    setNewJob({
      title: "",
      salary: "",
      location: "",
      department: "",
      type: "Full-time",
      experience: "",
      description: "",
      requirements: "",
      expiryDate: ""
    });
    
    setShowPostForm(false);
  };

  // Edit job posting
  const handleEditJob = (job) => {
    setEditingJob(job);
    setNewJob({
      title: job.title,
      salary: job.salary,
      location: job.location,
      department: job.department,
      type: job.type,
      experience: job.experience,
      description: job.description,
      requirements: job.requirements,
      expiryDate: job.expiryDate
    });
    setShowPostForm(true);
  };

  // Delete job posting
  const handleDeleteJob = (jobId) => {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      setJobPostings(jobPostings.filter(job => job.id !== jobId));
      alert("Job posting deleted successfully!");
    }
  };

  // View applications for a specific job
  const viewJobApplications = (jobId) => {
    setSelectedJobId(jobId);
    setShowApplications(true);
  };

  // View application details
  const viewApplicationDetails = (application) => {
    setViewingApplication(application);
  };

  // Update application status
  const updateApplicationStatus = (applicationId, newStatus) => {
    setJobApplications(jobApplications.map(app => 
      app.id === applicationId ? { ...app, status: newStatus } : app
    ));
    alert(`Application status updated to ${newStatus}`);
  };

  // Filter job postings based on search and status
  const filteredJobs = jobPostings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || job.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesDepartment = filterDepartment === "all" || job.department.toLowerCase() === filterDepartment.toLowerCase();
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  // Get applications for selected job
  const getApplicationsForJob = () => {
    return jobApplications.filter(app => app.jobId === selectedJobId);
  };

  // Get unique departments for filter
  const departments = [...new Set(jobPostings.map(job => job.department))];

  return (
    <div className="container-fluid p-3 p-md-4" style={{ minHeight: "100vh" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0" style={{ color: "#C62828" }}>Job Vacancies</h2>
        <button 
          className="btn text-white d-flex align-items-center" 
          style={{ background: "#C62828", borderRadius: "10px" }}
          onClick={() => setShowPostForm(true)}
        >
          <FaPlus className="me-2" />
          Post New Vacancy
        </button>
      </div>

      {/* Tabs for navigation */}
      <div className="card shadow-sm mb-4" style={{ borderRadius: "14px", border: "1px solid #E2E2E2" }}>
        <div className="card-body p-0">
          <ul className="nav nav-tabs nav-fill" id="jobTabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button 
                className={`nav-link ${activeTab === "postings" ? "active" : ""}`} 
                id="postings-tab" 
                data-bs-toggle="tab" 
                data-bs-target="#postings" 
                type="button" 
                role="tab"
                onClick={() => setActiveTab("postings")}
                style={{ color: activeTab === "postings" ? "#C62828" : "#4A4A4A", fontWeight: "500" }}
              >
                Job Postings
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button 
                className={`nav-link ${activeTab === "applications" ? "active" : ""}`} 
                id="applications-tab" 
                data-bs-toggle="tab" 
                data-bs-target="#applications" 
                type="button" 
                role="tab"
                onClick={() => setActiveTab("applications")}
                style={{ color: activeTab === "applications" ? "#C62828" : "#4A4A4A", fontWeight: "500" }}
              >
                Applications
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-content" id="jobTabContent">
        {/* Job Postings Tab */}
        <div className={`tab-pane fade ${activeTab === "postings" ? "show active" : ""}`} id="postings" role="tabpanel">
          {/* Filters */}
          <div className="card shadow-sm mb-4" style={{ borderRadius: "14px", border: "1px solid #E2E2E2" }}>
            <div className="card-body p-3">
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control ps-4"
                      style={{ border: "1px solid #E2E2E2", borderRadius: "8px" }}
                      placeholder="Search jobs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch
                      size={16}
                      color="#C62828"
                      style={{
                        position: "absolute",
                        left: "12px",
                        top: "50%",
                        transform: "translateY(-50%)"
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <select
                    className="form-select"
                    style={{ border: "1px solid #E2E2E2", borderRadius: "8px" }}
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <select
                    className="form-select"
                    style={{ border: "1px solid #E2E2E2", borderRadius: "8px" }}
                    value={filterDepartment}
                    onChange={(e) => setFilterDepartment(e.target.value)}
                  >
                    <option value="all">All Departments</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Job Postings Grid */}
          {filteredJobs.length === 0 ? (
            <div className="card shadow-sm" style={{ borderRadius: "14px", border: "1px solid #E2E2E2" }}>
              <div className="card-body text-center p-5">
                <FaBriefcase size={48} className="text-muted mb-3" />
                <h5 className="text-muted">No job postings found</h5>
                <p className="text-muted">Try adjusting your search or filter criteria</p>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {filteredJobs.map((job) => (
                <div className="col-md-6 col-lg-4" key={job.id}>
                  <div className="card h-100 shadow-sm" style={{ borderRadius: "14px", border: "1px solid #E2E2E2" }}>
                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <h5 className="card-title fw-bold">{job.title}</h5>
                        <span className={`badge ${job.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                          {job.status}
                        </span>
                      </div>
                      <div className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <FaMoneyBillWave size={14} className="me-2 text-muted" />
                          <span className="text-muted small">{job.salary}</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <FaMapMarkerAlt size={14} className="me-2 text-muted" />
                          <span className="text-muted small">{job.location}</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <FaBriefcase size={14} className="me-2 text-muted" />
                          <span className="text-muted small">{job.experience} • {job.type}</span>
                        </div>
                      </div>
                      <p className="card-text text-muted small mb-3" style={{ height: "60px", overflow: "hidden" }}>
                        {job.description}
                      </p>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <span className="text-muted small">Posted: {job.postedDate}</span>
                        </div>
                        <div>
                          <span className="text-muted small">Expires: {job.expiryDate}</span>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <span className="text-muted small me-2">{job.applicants} Applicants</span>
                          <span className="text-muted small">{job.views} Views</span>
                        </div>
                        <div className="btn-group" role="group">
                          <button 
                            className="btn btn-sm text-white" 
                            style={{ background: "#C62828", borderRadius: "8px" }}
                            onClick={() => viewJobApplications(job.id)}
                          >
                            <FaEye size={14} />
                          </button>
                          <button 
                            className="btn btn-sm" 
                            style={{ border: "1px solid #E2E2E2", borderRadius: "8px" }}
                            onClick={() => handleEditJob(job)}
                          >
                            <FaEdit size={14} color="#4A4A4A" />
                          </button>
                          <button 
                            className="btn btn-sm" 
                            style={{ border: "1px solid #E2E2E2", borderRadius: "8px" }}
                            onClick={() => handleDeleteJob(job.id)}
                          >
                            <FaTrash size={14} color="#C62828" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Applications Tab */}
        <div className={`tab-pane fade ${activeTab === "applications" ? "show active" : ""}`} id="applications" role="tabpanel">
          {jobApplications.length === 0 ? (
            <div className="card shadow-sm" style={{ borderRadius: "14px", border: "1px solid #E2E2E2" }}>
              <div className="card-body text-center p-5">
                <FaUser size={48} className="text-muted mb-3" />
                <h5 className="text-muted">No applications found</h5>
                <p className="text-muted">Applications will appear here once candidates start applying</p>
              </div>
            </div>
          ) : (
            <div className="card shadow-sm" style={{ borderRadius: "14px", border: "1px solid #E2E2E2" }}>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr style={{ background: "#FFF5F5" }}>
                        <th style={{ color: "#4A4A4A" }}>Applicant</th>
                        <th style={{ color: "#4A4A4A" }}>Job</th>
                        <th style={{ color: "#4A4A4A" }}>Applied Date</th>
                        <th style={{ color: "#4A4A4A" }}>Experience</th>
                        <th style={{ color: "#4A4A4A" }}>Status</th>
                        <th style={{ color: "#4A4A4A" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobApplications.map((application) => {
                        const job = jobPostings.find(j => j.id === application.jobId);
                        return (
                          <tr key={application.id}>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="me-2 rounded-circle d-flex align-items-center justify-content-center" 
                                     style={{ width: "36px", height: "36px", backgroundColor: "#F7EFE9" }}>
                                  <FaUser size={18} color="#C62828" />
                                </div>
                                <div>
                                  <div className="fw-semibold">{application.applicantName}</div>
                                  <div className="text-muted small">{application.email}</div>
                                </div>
                              </div>
                            </td>
                            <td>{job ? job.title : "Unknown Position"}</td>
                            <td>{application.appliedDate}</td>
                            <td>{application.experience}</td>
                            <td>
                              <span className={`badge ${
                                application.status === 'Under Review' ? 'bg-warning text-dark' : 
                                application.status === 'Shortlisted' ? 'bg-info text-dark' : 
                                application.status === 'Interview Scheduled' ? 'bg-primary' :
                                application.status === 'Rejected' ? 'bg-danger' :
                                'bg-success'
                              }`}>
                                {application.status}
                              </span>
                            </td>
                            <td>
                              <div className="btn-group" role="group">
                                <button 
                                  className="btn btn-sm" 
                                  style={{ border: "1px solid #E2E2E2", borderRadius: "8px" }}
                                  onClick={() => viewApplicationDetails(application)}
                                >
                                  <FaEye size={14} color="#4A4A4A" />
                                </button>
                                <button 
                                  className="btn btn-sm" 
                                  style={{ border: "1px solid #E2E2E2", borderRadius: "8px" }}
                                  onClick={() => updateApplicationStatus(application.id, "Shortlisted")}
                                >
                                  <FaCheck size={14} color="#28a745" />
                                </button>
                                <button 
                                  className="btn btn-sm" 
                                  style={{ border: "1px solid #E2E2E2", borderRadius: "8px" }}
                                  onClick={() => updateApplicationStatus(application.id, "Interview Scheduled")}
                                >
                                  <FaCalendarAlt size={14} color="#007bff" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Post/Edit Job Modal */}
      {showPostForm && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
             style={{ background: "rgba(0,0,0,0.55)", zIndex: 1050 }}>
          <div className="bg-white p-4 rounded shadow w-100" style={{ maxWidth: "600px", borderRadius: "14px" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0" style={{ color: "#C62828" }}>
                {editingJob ? "Edit Job Vacancy" : "Post New Vacancy"}
              </h5>
              <button 
                className="btn btn-sm p-0" 
                onClick={() => {
                  setShowPostForm(false);
                  setEditingJob(null);
                }}
                style={{ color: "#4A4A4A" }}
              >
                <FaTimes size={20} />
              </button>
            </div>
            <form onSubmit={handlePostJob}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{ color: "#4A4A4A" }}>Job Title</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    style={{ border: "1px solid #E2E2E2" }} 
                    placeholder="e.g. Senior Frontend Developer"
                    name="title"
                    value={newJob.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{ color: "#4A4A4A" }}>Department</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    style={{ border: "1px solid #E2E2E2" }} 
                    placeholder="e.g. Engineering"
                    name="department"
                    value={newJob.department}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{ color: "#4A4A4A" }}>Salary Range</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    style={{ border: "1px solid #E2E2E2" }} 
                    placeholder="e.g. ₹80,000 - ₹120,000"
                    name="salary"
                    value={newJob.salary}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{ color: "#4A4A4A" }}>Location</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    style={{ border: "1px solid #E2E2E2" }} 
                    placeholder="e.g. Mumbai, Maharashtra"
                    name="location"
                    value={newJob.location}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{ color: "#4A4A4A" }}>Employment Type</label>
                  <select 
                    className="form-select" 
                    style={{ border: "1px solid #E2E2E2" }}
                    name="type"
                    value={newJob.type}
                    onChange={handleInputChange}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{ color: "#4A4A4A" }}>Experience Required</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    style={{ border: "1px solid #E2E2E2" }} 
                    placeholder="e.g. 3+ years"
                    name="experience"
                    value={newJob.experience}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label" style={{ color: "#4A4A4A" }}>Expiry Date</label>
                <input 
                  type="date" 
                  className="form-control" 
                  style={{ border: "1px solid #E2E2E2" }}
                  name="expiryDate"
                  value={newJob.expiryDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" style={{ color: "#4A4A4A" }}>Job Description</label>
                <textarea 
                  className="form-control" 
                  style={{ border: "1px solid #E2E2E2" }} 
                  rows="3"
                  placeholder="Provide a detailed job description..."
                  name="description"
                  value={newJob.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="form-label" style={{ color: "#4A4A4A" }}>Requirements</label>
                <textarea 
                  className="form-control" 
                  style={{ border: "1px solid #E2E2E2" }} 
                  rows="3"
                  placeholder="List the key requirements for this position..."
                  name="requirements"
                  value={newJob.requirements}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <button 
                type="submit"
                className="btn text-white w-100 mb-2 py-2" 
                style={{ background: "#C62828", borderRadius: "10px" }}
              >
                {editingJob ? "Update Job" : "Post Vacancy"}
              </button>
              <button 
                type="button"
                className="btn w-100 py-2" 
                onClick={() => {
                  setShowPostForm(false);
                  setEditingJob(null);
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* View Applications Modal */}
      {showApplications && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
             style={{ background: "rgba(0,0,0,0.55)", zIndex: 1050 }}>
          <div className="bg-white p-4 rounded shadow w-100" style={{ maxWidth: "900px", borderRadius: "14px" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0" style={{ color: "#C62828" }}>
                Applications for {jobPostings.find(job => job.id === selectedJobId)?.title}
              </h5>
              <button 
                className="btn btn-sm p-0" 
                onClick={() => setShowApplications(false)}
                style={{ color: "#4A4A4A" }}
              >
                <FaTimes size={20} />
              </button>
            </div>
            
            {getApplicationsForJob().length === 0 ? (
              <div className="text-center p-4">
                <p className="text-muted">No applications for this job yet.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr style={{ background: "#FFF5F5" }}>
                      <th style={{ color: "#4A4A4A" }}>Applicant</th>
                      <th style={{ color: "#4A4A4A" }}>Contact</th>
                      <th style={{ color: "#4A4A4A" }}>Experience</th>
                      <th style={{ color: "#4A4A4A" }}>Applied Date</th>
                      <th style={{ color: "#4A4A4A" }}>Status</th>
                      <th style={{ color: "#4A4A4A" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getApplicationsForJob().map((application) => (
                      <tr key={application.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="me-2 rounded-circle d-flex align-items-center justify-content-center" 
                                 style={{ width: "36px", height: "36px", backgroundColor: "#F7EFE9" }}>
                              <FaUser size={18} color="#C62828" />
                            </div>
                            <div>
                              <div className="fw-semibold">{application.applicantName}</div>
                              <div className="text-muted small">{application.education}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div>{application.email}</div>
                          <div className="text-muted small">{application.phone}</div>
                        </td>
                        <td>{application.experience}</td>
                        <td>{application.appliedDate}</td>
                        <td>
                          <span className={`badge ${
                            application.status === 'Under Review' ? 'bg-warning text-dark' : 
                            application.status === 'Shortlisted' ? 'bg-info text-dark' : 
                            application.status === 'Interview Scheduled' ? 'bg-primary' :
                            application.status === 'Rejected' ? 'bg-danger' :
                            'bg-success'
                          }`}>
                            {application.status}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <button 
                              className="btn btn-sm" 
                              style={{ border: "1px solid #E2E2E2", borderRadius: "8px" }}
                              onClick={() => viewApplicationDetails(application)}
                            >
                              <FaEye size={14} color="#4A4A4A" />
                            </button>
                            <button 
                              className="btn btn-sm" 
                              style={{ border: "1px solid #E2E2E2", borderRadius: "8px" }}
                              onClick={() => updateApplicationStatus(application.id, "Shortlisted")}
                            >
                              <FaCheck size={14} color="#28a745" />
                            </button>
                            <button 
                              className="btn btn-sm" 
                              style={{ border: "1px solid #E2E2E2", borderRadius: "8px" }}
                              onClick={() => updateApplicationStatus(application.id, "Interview Scheduled")}
                            >
                              <FaCalendarAlt size={14} color="#007bff" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Application Details Modal */}
      {viewingApplication && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
             style={{ background: "rgba(0,0,0,0.55)", zIndex: 1050 }}>
          <div className="bg-white p-4 rounded shadow w-100" style={{ maxWidth: "600px", borderRadius: "14px" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0" style={{ color: "#C62828" }}>Application Details</h5>
              <button 
                className="btn btn-sm p-0" 
                onClick={() => setViewingApplication(null)}
                style={{ color: "#4A4A4A" }}
              >
                <FaTimes size={20} />
              </button>
            </div>
            
            <div className="mb-4">
              <div className="d-flex align-items-center mb-3">
                <div className="me-3 rounded-circle d-flex align-items-center justify-content-center" 
                     style={{ width: "60px", height: "60px", backgroundColor: "#F7EFE9" }}>
                  <FaUser size={30} color="#C62828" />
                </div>
                <div>
                  <h5 className="mb-1">{viewingApplication.applicantName}</h5>
                  <p className="text-muted mb-0">{jobPostings.find(job => job.id === viewingApplication.jobId)?.title}</p>
                </div>
              </div>
              
              <div className="row mb-3">
                <div className="col-md-6 mb-2">
                  <strong>Email:</strong> {viewingApplication.email}
                </div>
                <div className="col-md-6 mb-2">
                  <strong>Phone:</strong> {viewingApplication.phone}
                </div>
                <div className="col-md-6 mb-2">
                  <strong>Experience:</strong> {viewingApplication.experience}
                </div>
                <div className="col-md-6 mb-2">
                  <strong>Education:</strong> {viewingApplication.education}
                </div>
                <div className="col-md-6 mb-2">
                  <strong>Applied Date:</strong> {viewingApplication.appliedDate}
                </div>
                <div className="col-md-6 mb-2">
                  <strong>Status:</strong> 
                  <span className={`badge ms-2 ${
                    viewingApplication.status === 'Under Review' ? 'bg-warning text-dark' : 
                    viewingApplication.status === 'Shortlisted' ? 'bg-info text-dark' : 
                    viewingApplication.status === 'Interview Scheduled' ? 'bg-primary' :
                    viewingApplication.status === 'Rejected' ? 'bg-danger' :
                    'bg-success'
                  }`}>
                    {viewingApplication.status}
                  </span>
                </div>
              </div>
              
              <div className="mb-3">
                <strong>Skills:</strong>
                <div className="mt-2">
                  {viewingApplication.skills.split(', ').map((skill, index) => (
                    <span key={index} className="badge bg-light text-dark me-2 mb-2">{skill}</span>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <strong>Resume:</strong>
                <div className="mt-2">
                  <a href="#" className="btn btn-sm" style={{ border: "1px solid #E2E2E2", borderRadius: "8px" }}>
                    {viewingApplication.resume}
                  </a>
                </div>
              </div>
            </div>
            
            <div className="d-flex justify-content-between">
              <div className="btn-group" role="group">
                <button 
                  className="btn" 
                  style={{ border: "1px solid #E2E2E2", borderRadius: "8px" }}
                  onClick={() => updateApplicationStatus(viewingApplication.id, "Shortlisted")}
                >
                  <FaCheck size={14} color="#28a745" className="me-2" />
                  Shortlist
                </button>
                <button 
                  className="btn" 
                  style={{ border: "1px solid #E2E2E2", borderRadius: "8px" }}
                  onClick={() => updateApplicationStatus(viewingApplication.id, "Interview Scheduled")}
                >
                  <FaCalendarAlt size={14} color="#007bff" className="me-2" />
                  Schedule Interview
                </button>
                <button 
                  className="btn" 
                  style={{ border: "1px solid #E2E2E2", borderRadius: "8px" }}
                  onClick={() => updateApplicationStatus(viewingApplication.id, "Rejected")}
                >
                  <FaTimes size={14} color="#dc3545" className="me-2" />
                  Reject
                </button>
              </div>
              <button 
                className="btn text-white px-4" 
                style={{ background: "#C62828", borderRadius: "10px" }}
                onClick={() => setViewingApplication(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobVacancies;