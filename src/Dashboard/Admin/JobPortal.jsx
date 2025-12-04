import React, { useState, useEffect } from "react";

export default function JobPortal() {
  // Color scheme
  const colors = {
    primary: "#C62828",
    primaryDark: "#B71C1C",
    secondary: "#F44336",
    white: "#FFFFFF",
    black: "#212121",
    gray: "#757575",
    lightGray: "#E0E0E0",
    success: "#4CAF50",
    warning: "#FF9800",
    modalOverlay: "rgba(0, 0, 0, 0.6)",
  };

  // Initial data
  const [vacancies, setVacancies] = useState([
    { 
      id: 1, 
      title: "Senior Frontend Developer", 
      department: "Engineering", 
      location: "Mumbai",
      description: "We are looking for an experienced Frontend Developer with expertise in React, Redux, and modern CSS.", 
      status: "Active",
      postedDate: "2023-10-15",
      salary: "₹12-18 LPA",
      employer: "Tech Solutions Pvt Ltd",
      level: "Senior"
    },
    { 
      id: 2, 
      title: "HR Manager", 
      department: "Human Resources", 
      location: "Delhi",
      description: "5+ years of experience in recruitment and employee relations. MBA in HR is preferred.", 
      status: "Active",
      postedDate: "2023-10-10",
      salary: "₹8-12 LPA",
      employer: "PeopleFirst HR",
      level: "Manager"
    },
    { 
      id: 3, 
      title: "Project Manager", 
      department: "Management", 
      location: "Bangalore",
      description: "PMP certified with a track record of delivering projects on time. Experience in Agile methodologies is required.", 
      status: "Closed",
      postedDate: "2023-09-25",
      salary: "₹15-20 LPA",
      employer: "Digital Innovations",
      level: "Senior"
    },
  ]);

  const [jobSeekers, setJobSeekers] = useState([
    { 
      id: 101, 
      name: "Priya Singh", 
      email: "priya.s@email.com", 
      phone: "9876543210", 
      skills: "React, Node.js, MongoDB", 
      experience: "4 years",
      education: "B.Tech in Computer Science",
      currentCompany: "Tech Solutions Pvt Ltd",
      level: "Mid-level"
    },
    { 
      id: 102, 
      name: "Amit Kumar", 
      email: "amit.k@email.com", 
      phone: "9123456789", 
      skills: "Recruitment, Payroll, HR Policies", 
      experience: "6 years",
      education: "MBA in HR",
      currentCompany: "PeopleFirst HR",
      level: "Senior"
    },
    { 
      id: 103, 
      name: "Rohit Sharma", 
      email: "rohit.s@email.com", 
      phone: "9898765432", 
      skills: "Java, Spring Boot, Microservices", 
      experience: "5 years",
      education: "M.Tech in Computer Science",
      currentCompany: "Digital Innovations",
      level: "Senior"
    },
  ]);

  // State for tracking applications
  const [applications, setApplications] = useState([
    { id: 1001, vacancyId: 1, jobSeekerId: 101, status: "Applied", date: "2023-10-16" },
    { id: 1002, vacancyId: 2, jobSeekerId: 102, status: "Shortlisted", date: "2023-10-12" },
  ]);

  // UI state management
  const [modalType, setModalType] = useState(null);
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [selectedJobSeeker, setSelectedJobSeeker] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("vacancies"); // "vacancies" or "jobseekers"
  const [jobSeekerFilter, setJobSeekerFilter] = useState({
    skills: "",
    level: "All",
    experience: ""
  });

  // Update isMobileView on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Helper functions
  const getApplicationsForVacancy = (vacancyId) => {
    return applications.filter(app => app.vacancyId === vacancyId);
  };

  const getJobSeekerById = (id) => {
    return jobSeekers.find(js => js.id === id);
  };

  // Calculate match score between vacancy and job seeker
  const calculateMatchScore = (vacancy, jobSeeker) => {
    let score = 0;
    
    // Level matching
    if (vacancy.level === jobSeeker.level) {
      score += 30;
    } else if (
      (vacancy.level === "Senior" && jobSeeker.level === "Manager") ||
      (vacancy.level === "Manager" && jobSeeker.level === "Senior") ||
      (vacancy.level === "Mid-level" && jobSeeker.level === "Senior") ||
      (vacancy.level === "Entry" && jobSeeker.level === "Mid-level")
    ) {
      score += 15;
    }
    
    // Skills matching
    const vacancySkills = vacancy.description.toLowerCase().split(' ');
    const jobSeekerSkills = jobSeeker.skills.toLowerCase().split(', ');
    
    let skillMatch = 0;
    jobSeekerSkills.forEach(skill => {
      if (vacancySkills.some(vSkill => vSkill.includes(skill.toLowerCase()) || skill.toLowerCase().includes(vSkill))) {
        skillMatch++;
      }
    });
    
    if (jobSeekerSkills.length > 0) {
      score += (skillMatch / jobSeekerSkills.length) * 70;
    }
    
    return Math.round(score);
  };

  // Modal handlers
  const openModal = (type, data = null) => {
    setModalType(type);
    if (data) {
      if (type === 'jobSeekerDetails') {
        setSelectedJobSeeker(data);
      } else if (type === 'addJobSeeker') {
        setSelectedVacancy(data);
      } else if (type === 'editVacancy') {
        setSelectedVacancy(data);
      } else if (type === 'viewVacancy') {
        setSelectedVacancy(data);
      } else if (type === 'matchJobSeekers') {
        setSelectedVacancy(data);
      }
    }
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedJobSeeker(null);
    setSelectedVacancy(null);
  };

  // Action handlers
  const handleAddVacancy = (e) => {
    e.preventDefault();
    const newVacancy = {
      id: vacancies.length + 1,
      title: e.target.title.value,
      department: e.target.department.value,
      location: e.target.location.value,
      description: e.target.description.value,
      status: "Active",
      postedDate: new Date().toISOString().split('T')[0],
      salary: e.target.salary.value,
      employer: e.target.employer.value,
      level: e.target.level.value,
    };
    setVacancies([...vacancies, newVacancy]);
    closeModal();
  };

  const handleEditVacancy = (e) => {
    e.preventDefault();
    const updatedVacancy = {
      ...selectedVacancy,
      title: e.target.title.value,
      department: e.target.department.value,
      location: e.target.location.value,
      description: e.target.description.value,
      salary: e.target.salary.value,
      employer: e.target.employer.value,
      level: e.target.level.value,
    };
    setVacancies(vacancies.map(v => v.id === selectedVacancy.id ? updatedVacancy : v));
    closeModal();
  };

  const handleDeleteVacancy = (vacancyId) => {
    if (window.confirm("Are you sure you want to delete this vacancy?")) {
      setVacancies(vacancies.filter(v => v.id !== vacancyId));
      closeModal();
    }
  };

  const handleAddJobSeeker = (e) => {
    e.preventDefault();
    const newJobSeeker = {
      id: jobSeekers.length + 101,
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      skills: e.target.skills.value,
      experience: e.target.experience.value,
      education: e.target.education.value,
      currentCompany: e.target.currentCompany.value,
      level: e.target.level.value,
    };
    setJobSeekers([...jobSeekers, newJobSeeker]);
    closeModal();
  };

  const handleAddJobSeekerToVacancy = (jobSeekerId) => {
    const existingApplication = applications.find(
      app => app.vacancyId === selectedVacancy.id && app.jobSeekerId === jobSeekerId
    );
    
    if (existingApplication) {
      alert("This job seeker has already applied for this vacancy");
      return;
    }
    
    const newApplication = {
      id: applications.length + 1001,
      vacancyId: selectedVacancy.id,
      jobSeekerId: jobSeekerId,
      status: "Applied",
      date: new Date().toISOString().split('T')[0],
    };
    setApplications([...applications, newApplication]);
    alert("Candidate has been sent to the employer!");
    closeModal();
  };

  const handleUpdateApplicationStatus = (applicationId, newStatus) => {
    setApplications(applications.map(app => 
      app.id === applicationId ? { ...app, status: newStatus } : app
    ));
  };

  // Filter vacancies based on search and status
  const filteredVacancies = vacancies.filter(v => {
    const matchesSearch = v.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         v.employer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || v.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Filter job seekers based on filter criteria
  const filteredJobSeekers = jobSeekers.filter(js => {
    const matchesSkills = jobSeekerFilter.skills === "" || 
                         js.skills.toLowerCase().includes(jobSeekerFilter.skills.toLowerCase());
    const matchesLevel = jobSeekerFilter.level === "All" || js.level === jobSeekerFilter.level;
    const matchesExperience = jobSeekerFilter.experience === "" || 
                             js.experience.includes(jobSeekerFilter.experience);
    return matchesSkills && matchesLevel && matchesExperience;
  });

  return (
    <div style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ 
        borderBottom: `1px solid ${colors.lightGray}`, 
        padding: isMobileView ? '0.5rem 1rem' : '0.75rem 1.5rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: colors.white
      }}>
        <h1 style={{ margin: 0, color: colors.primary, fontSize: isMobileView ? '1.2rem' : '1.5rem' }}>Job Portal</h1>
        
        {isMobileView ? (
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: colors.primary
            }}
          >
            {showMobileMenu ? '✕' : '☰'}
          </button>
        ) : (
          <div>
            <button onClick={() => openModal('addVacancy')} style={styles.button(colors.primary, colors.white, 'small')}>+ Add Vacancy</button>
            <button onClick={() => openModal('addJobSeeker')} style={{...styles.button(colors.primary, colors.white, 'small'), marginLeft: '10px'}}>+ Add Job Seeker</button>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      {isMobileView && showMobileMenu && (
        <div style={{
          borderBottom: `1px solid ${colors.lightGray}`,
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <button onClick={() => { openModal('addVacancy'); setShowMobileMenu(false); }} style={styles.button(colors.primary, colors.white, 'small')}>+ Add Vacancy</button>
          <button onClick={() => { openModal('addJobSeeker'); setShowMobileMenu(false); }} style={styles.button(colors.secondary, colors.white, 'small')}>+ Add Job Seeker</button>
        </div>
      )}

      {/* Tab Navigation */}
      <div style={{ 
        display: 'flex', 
        borderBottom: `1px solid ${colors.lightGray}`,
        backgroundColor: colors.white
      }}>
        <button 
          onClick={() => setActiveTab("vacancies")}
          style={{
            ...styles.tabButton,
            borderBottom: activeTab === "vacancies" ? `3px solid ${colors.primary}` : 'none',
            color: activeTab === "vacancies" ? colors.primary : colors.gray,
            fontWeight: activeTab === "vacancies" ? 'bold' : 'normal'
          }}
        >
          Vacancies
        </button>
        <button 
          onClick={() => setActiveTab("jobseekers")}
          style={{
            ...styles.tabButton,
            borderBottom: activeTab === "jobseekers" ? `3px solid ${colors.primary}` : 'none',
            color: activeTab === "jobseekers" ? colors.primary : colors.gray,
            fontWeight: activeTab === "jobseekers" ? 'bold' : 'normal'
          }}
        >
          Job Seekers
        </button>
      </div>

      {/* Main Content */}
      <main style={{ 
        padding: isMobileView ? '0.5rem' : '1rem'
      }}>
        {/* Vacancies Tab */}
        {activeTab === "vacancies" && (
          <>
            {/* Search and Filter */}
            <div style={{ 
              marginBottom: '1rem', 
              display: 'flex', 
              gap: '1rem',
              flexDirection: isMobileView ? 'column' : 'row'
            }}>
              <input 
                type="text" 
                placeholder="Search vacancies..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  ...styles.input(colors.lightGray),
                  flex: 1,
                  padding: isMobileView ? '0.75rem' : '0.75rem',
                  fontSize: isMobileView ? '0.9rem' : '1rem'
                }}
              />
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{
                  ...styles.input(colors.lightGray),
                  width: isMobileView ? '100%' : '200px',
                  padding: isMobileView ? '0.75rem' : '0.75rem',
                  fontSize: isMobileView ? '0.9rem' : '1rem'
                }}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            {/* Vacancies Table/List */}
            <div style={{ 
              borderRadius: '8px', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              overflow: 'hidden'
            }}>
              {isMobileView ? (
                // Mobile Card View
                <div style={{ padding: '1rem' }}>
                  {filteredVacancies.length > 0 ? (
                    filteredVacancies.map(v => {
                      const appCount = getApplicationsForVacancy(v.id).length;
                      return (
                        <div key={v.id} style={{ 
                          border: `1px solid ${colors.lightGray}`, 
                          borderRadius: '8px', 
                          padding: '1rem', 
                          marginBottom: '1rem'
                        }}>
                          <div style={{ marginBottom: '0.75rem' }}>
                            <h3 style={{ 
                              margin: 0, 
                              color: colors.primary, 
                              fontSize: '1.1rem',
                              fontWeight: 'bold'
                            }}>
                              {v.title}
                            </h3>
                            <p style={{ 
                              margin: '0.25rem 0 0', 
                              color: colors.gray, 
                              fontSize: '0.9rem' 
                            }}>
                              {v.employer} • {v.level}
                            </p>
                          </div>
                          <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            marginBottom: '0.75rem'
                          }}>
                            <span style={{ 
                              fontSize: '0.9rem', 
                              color: colors.gray 
                            }}>
                              {appCount} Applicants
                            </span>
                            <span style={{ 
                              padding: '0.25rem 0.75rem', 
                              borderRadius: '20px', 
                              fontSize: '0.8rem', 
                              fontWeight: 'bold',
                              backgroundColor: v.status === 'Active' ? '#e8f5e9' : '#f3f3f3', 
                              color: v.status === 'Active' ? colors.success : colors.gray 
                            }}>
                              {v.status}
                            </span>
                          </div>
                          <div style={{ display: 'flex', gap: '5px', justifyContent: 'space-between' }}>
                            <button 
                              onClick={() => openModal('viewVacancy', v)}
                              title="View Details"
                              style={{ 
                                backgroundColor: colors.primary,
                                padding: "4px",
                                borderRadius: "4px",
                                fontSize: "10px",
                                fontWeight: "500",
                                width: "28px",
                                height: "28px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: colors.white,
                                border: "none",
                                cursor: "pointer"
                              }}
                            >
                              <i className="bi bi-eye-fill" style={{ fontSize: "12px" }}></i>
                            </button>
                            <button 
                              onClick={() => openModal('editVacancy', v)}
                              title="Edit Details"
                              style={{ 
                                backgroundColor: colors.primary,
                                padding: "4px",
                                borderRadius: "4px",
                                fontSize: "10px",
                                fontWeight: "500",
                                width: "28px",
                                height: "28px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: colors.white,
                                border: "none",
                                cursor: "pointer"
                              }}
                            >
                              <i className="bi bi-pencil-fill" style={{ fontSize: "12px" }}></i>
                            </button>
                            <button 
                              onClick={() => handleDeleteVacancy(v.id)}
                              title="Delete Vacancy"
                              style={{ 
                                backgroundColor: colors.primary,
                                padding: "4px",
                                borderRadius: "4px",
                                fontSize: "10px",
                                fontWeight: "500",
                                width: "28px",
                                height: "28px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: colors.white,
                                border: "none",
                                cursor: "pointer"
                              }}
                            >
                              <i className="bi bi-trash-fill" style={{ fontSize: "12px" }}></i>
                            </button>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div style={{ padding: '2rem', textAlign: 'center', color: colors.gray }}>
                      No vacancies found matching your criteria.
                    </div>
                  )}
                </div>
              ) : (
                // Desktop Table View
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: colors.primary, color: colors.white }}>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 'bold' }}>Employer</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 'bold' }}>Job Title</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 'bold' }}>Level</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 'bold' }}>Applicants</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 'bold' }}>Status</th>
                      <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVacancies.length > 0 ? (
                      filteredVacancies.map(v => {
                        const appCount = getApplicationsForVacancy(v.id).length;
                        return (
                          <tr key={v.id} style={{ borderBottom: `1px solid ${colors.lightGray}` }}>
                            <td style={{ padding: '1rem', color: colors.black }}>{v.employer}</td>
                            <td style={{ padding: '1rem' }}>
                              <div>
                                <strong style={{ color: colors.primary }}>{v.title}</strong>
                                <div style={{ fontSize: '0.85rem', color: colors.gray, marginTop: '0.25rem' }}>
                                  {v.location} • {v.salary}
                                </div>
                              </div>
                            </td>
                            <td style={{ padding: '1rem', color: colors.black }}>{v.level}</td>
                            <td style={{ padding: '1rem' }}>
                              <span style={{ 
                                padding: '0.25rem 0.75rem', 
                                borderRadius: '20px', 
                                fontSize: '0.9rem',
                                backgroundColor: colors.lightGray,
                                color: colors.black,
                                fontWeight: 'bold'
                              }}>
                                {appCount}
                              </span>
                            </td>
                            <td style={{ padding: '1rem' }}>
                              <span style={{ 
                                padding: '0.25rem 0.75rem', 
                                borderRadius: '20px', 
                                fontSize: '0.85rem', 
                                fontWeight: 'bold',
                                backgroundColor: v.status === 'Active' ? '#e8f5e9' : '#f3f3f3', 
                                color: v.status === 'Active' ? colors.success : colors.gray 
                              }}>
                                {v.status}
                              </span>
                            </td>
                            <td style={{ padding: '1rem', textAlign: 'center' }}>
                              <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
                                <button 
                                  onClick={() => openModal('viewVacancy', v)}
                                  title="View Details"
                                  style={{ 
                                    backgroundColor: colors.primary,
                                    padding: "4px",
                                    borderRadius: "4px",
                                    fontSize: "10px",
                                    fontWeight: "500",
                                    width: "28px",
                                    height: "28px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: colors.white,
                                    border: "none",
                                    cursor: "pointer"
                                  }}
                                >
                                  <i className="bi bi-eye-fill" style={{ fontSize: "12px" }}></i>
                                </button>
                                <button 
                                  onClick={() => openModal('editVacancy', v)}
                                  title="Edit Details"
                                  style={{ 
                                    backgroundColor: colors.primary,
                                    padding: "4px",
                                    borderRadius: "4px",
                                    fontSize: "10px",
                                    fontWeight: "500",
                                    width: "28px",
                                    height: "28px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: colors.white,
                                    border: "none",
                                    cursor: "pointer"
                                  }}
                                >
                                  <i className="bi bi-pencil-fill" style={{ fontSize: "12px" }}></i>
                                </button>
                                <button 
                                  onClick={() => handleDeleteVacancy(v.id)}
                                  title="Delete Vacancy"
                                  style={{ 
                                    backgroundColor: colors.primary,
                                    padding: "4px",
                                    borderRadius: "4px",
                                    fontSize: "10px",
                                    fontWeight: "500",
                                    width: "28px",
                                    height: "28px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: colors.white,
                                    border: "none",
                                    cursor: "pointer"
                                  }}
                                >
                                  <i className="bi bi-trash-fill" style={{ fontSize: "12px" }}></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      })
                    ) : (
                      <tr>
                        <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: colors.gray }}>
                          No vacancies found matching your criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {/* Job Seekers Tab */}
        {activeTab === "jobseekers" && (
          <>
            {/* Job Seeker Filters */}
            <div style={{ 
              marginBottom: '1rem', 
              display: 'flex', 
              gap: '1rem',
              flexDirection: isMobileView ? 'column' : 'row'
            }}>
              <input 
                type="text" 
                placeholder="Filter by skills..." 
                value={jobSeekerFilter.skills}
                onChange={(e) => setJobSeekerFilter({...jobSeekerFilter, skills: e.target.value})}
                style={{
                  ...styles.input(colors.lightGray),
                  flex: 1,
                  padding: isMobileView ? '0.75rem' : '0.75rem',
                  fontSize: isMobileView ? '0.9rem' : '1rem'
                }}
              />
              <select 
                value={jobSeekerFilter.level}
                onChange={(e) => setJobSeekerFilter({...jobSeekerFilter, level: e.target.value})}
                style={{
                  ...styles.input(colors.lightGray),
                  width: isMobileView ? '100%' : '200px',
                  padding: isMobileView ? '0.75rem' : '0.75rem',
                  fontSize: isMobileView ? '0.9rem' : '1rem'
                }}
              >
                <option value="All">All Levels</option>
                <option value="Entry">Entry Level</option>
                <option value="Mid-level">Mid-level</option>
                <option value="Senior">Senior</option>
                <option value="Manager">Manager</option>
                <option value="Director">Director</option>
              </select>
              <input 
                type="text" 
                placeholder="Filter by experience..." 
                value={jobSeekerFilter.experience}
                onChange={(e) => setJobSeekerFilter({...jobSeekerFilter, experience: e.target.value})}
                style={{
                  ...styles.input(colors.lightGray),
                  width: isMobileView ? '100%' : '200px',
                  padding: isMobileView ? '0.75rem' : '0.75rem',
                  fontSize: isMobileView ? '0.9rem' : '1rem'
                }}
              />
            </div>

            {/* Job Seekers List */}
            <div style={{ 
              borderRadius: '8px', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              overflow: 'hidden'
            }}>
              {isMobileView ? (
                // Mobile Card View
                <div style={{ padding: '1rem' }}>
                  {filteredJobSeekers.length > 0 ? (
                    filteredJobSeekers.map(js => (
                      <div key={js.id} style={{ 
                        border: `1px solid ${colors.lightGray}`, 
                        borderRadius: '8px', 
                        padding: '1rem', 
                        marginBottom: '1rem'
                      }}>
                        <div style={{ marginBottom: '0.75rem' }}>
                          <h3 style={{ 
                            margin: 0, 
                            color: colors.primary, 
                            fontSize: '1.1rem',
                            fontWeight: 'bold'
                          }}>
                            {js.name}
                          </h3>
                          <p style={{ 
                            margin: '0.25rem 0 0', 
                            color: colors.gray, 
                            fontSize: '0.9rem' 
                          }}>
                            {js.currentCompany} • {js.level}
                          </p>
                        </div>
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          marginBottom: '0.75rem'
                        }}>
                          <span style={{ 
                            fontSize: '0.9rem', 
                            color: colors.gray 
                          }}>
                            {js.experience} experience
                          </span>
                          <span style={{ 
                            padding: '0.25rem 0.75rem', 
                            borderRadius: '20px', 
                            fontSize: '0.8rem', 
                            fontWeight: 'bold',
                            backgroundColor: colors.lightGray, 
                            color: colors.black
                          }}>
                            {js.skills.split(',')[0]}{js.skills.split(',').length > 1 ? '...' : ''}
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: '5px', justifyContent: 'space-between' }}>
                          <button 
                            onClick={() => openModal('jobSeekerDetails', js)}
                            title="View Resume"
                            style={{ 
                              backgroundColor: colors.primary,
                              padding: "4px",
                              borderRadius: "4px",
                              fontSize: "10px",
                              fontWeight: "500",
                              width: "28px",
                              height: "28px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: colors.white,
                              border: "none",
                              cursor: "pointer"
                            }}
                          >
                            <i className="bi bi-eye-fill" style={{ fontSize: "12px" }}></i>
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ padding: '2rem', textAlign: 'center', color: colors.gray }}>
                      No job seekers found matching your criteria.
                    </div>
                  )}
                </div>
              ) : (
                // Desktop Table View
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: colors.primary, color: colors.white }}>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 'bold' }}>Name</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 'bold' }}>Current Company</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 'bold' }}>Level</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 'bold' }}>Experience</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 'bold' }}>Skills</th>
                      <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredJobSeekers.length > 0 ? (
                      filteredJobSeekers.map(js => (
                        <tr key={js.id} style={{ borderBottom: `1px solid ${colors.lightGray}` }}>
                          <td style={{ padding: '1rem', color: colors.black }}>
                            <div>
                              <strong>{js.name}</strong>
                              <div style={{ fontSize: '0.85rem', color: colors.gray, marginTop: '0.25rem' }}>
                                {js.email}
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '1rem', color: colors.black }}>{js.currentCompany}</td>
                          <td style={{ padding: '1rem', color: colors.black }}>{js.level}</td>
                          <td style={{ padding: '1rem', color: colors.black }}>{js.experience}</td>
                          <td style={{ padding: '1rem', color: colors.black }}>{js.skills}</td>
                          <td style={{ padding: '1rem', textAlign: 'center' }}>
                            <button 
                              onClick={() => openModal('jobSeekerDetails', js)}
                              title="View Resume"
                              style={{ 
                                backgroundColor: colors.primary,
                                padding: "4px",
                                borderRadius: "4px",
                                fontSize: "10px",
                                fontWeight: "500",
                                width: "28px",
                                height: "28px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: colors.white,
                                border: "none",
                                cursor: "pointer"
                              }}
                            >
                              <i className="bi bi-eye-fill" style={{ fontSize: "12px" }}></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: colors.gray }}>
                          No job seekers found matching your criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </main>

      {/* Modals */}
      {modalType && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={{
            ...styles.modalBox(colors.white),
            width: isMobileView ? '95%' : '70%',
            maxWidth: isMobileView ? '95%' : '600px',
            maxHeight: isMobileView ? '90vh' : '80vh',
            padding: isMobileView ? '1rem' : '1.5rem'
          }} onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} style={styles.closeButton}>×</button>
            
            {/* Add Vacancy Modal */}
            {modalType === 'addVacancy' && (
              <>
                <h2 style={{ fontSize: isMobileView ? '1.1rem' : '1.3rem', color: colors.primary }}>Add New Vacancy</h2>
                <form onSubmit={handleAddVacancy}>
                  <input name="employer" placeholder="Employer Name" required style={{...styles.input(colors.lightGray), fontSize: isMobileView ? '0.9rem' : '1rem'}} />
                  <input name="title" placeholder="Job Title" required style={{...styles.input(colors.lightGray), fontSize: isMobileView ? '0.9rem' : '1rem'}} />
                  <input name="department" placeholder="Department" required style={{...styles.input(colors.lightGray), fontSize: isMobileView ? '0.9rem' : '1rem'}} />
                  <input name="location" placeholder="Location" required style={{...styles.input(colors.lightGray), fontSize: isMobileView ? '0.9rem' : '1rem'}} />
                  <input name="salary" placeholder="Salary Range (e.g., ₹8-12 LPA)" required style={{...styles.input(colors.lightGray), fontSize: isMobileView ? '0.9rem' : '1rem'}} />
                  <select name="level" required style={{...styles.input(colors.lightGray), fontSize: isMobileView ? '0.9rem' : '1rem'}}>
                    <option value="">Select Level</option>
                    <option value="Entry">Entry Level</option>
                    <option value="Mid-level">Mid-level</option>
                    <option value="Senior">Senior</option>
                    <option value="Manager">Manager</option>
                    <option value="Director">Director</option>
                  </select>
                  <textarea name="description" placeholder="Job Description" rows="3" required style={{...styles.input(colors.lightGray), fontSize: isMobileView ? '0.9rem' : '1rem'}} />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1.5rem' }}>
                    <button type="button" onClick={closeModal} style={{...styles.button(colors.lightGray, colors.black, 'small'), background: colors.lightGray}}>Cancel</button>
                    <button type="submit" style={styles.button(colors.primary, colors.white, 'small')}>Create</button>
                  </div>
                </form>
              </>
            )}

            {/* Edit Vacancy Modal */}
            {modalType === 'editVacancy' && selectedVacancy && (
              <>
                <h2 style={{ fontSize: isMobileView ? '1.1rem' : '1.3rem', color: colors.primary }}>Edit Vacancy</h2>
                <form onSubmit={handleEditVacancy}>
                  <input name="employer" placeholder="Employer Name" defaultValue={selectedVacancy.employer} required style={{...styles.input(colors.lightGray), fontSize: isMobileView ? '0.9rem' : '1rem'}} />
                  <input name="title" placeholder="Job Title" defaultValue={selectedVacancy.title} required style={{...styles.input(colors.lightGray), fontSize: isMobileView ? '0.9rem' : '1rem'}} />
                  <input name="department" placeholder="Department" defaultValue={selectedVacancy.department} required style={{...styles.input(colors.lightGray), fontSize: isMobileView ? '0.9rem' : '1rem'}} />
                  <input name="location" placeholder="Location" defaultValue={selectedVacancy.location} required style={{...styles.input(colors.lightGray), fontSize: isMobileView ? '0.9rem' : '1rem'}} />
                  <input name="salary" placeholder="Salary Range (e.g., ₹8-12 LPA)" defaultValue={selectedVacancy.salary} required style={{...styles.input(colors.lightGray), fontSize: isMobileView ? '0.9rem' : '1rem'}} />
                  <select name="level" defaultValue={selectedVacancy.level} required style={{...styles.input(colors.lightGray), fontSize: isMobileView ? '0.9rem' : '1rem'}}>
                    <option value="">Select Level</option>
                    <option value="Entry">Entry Level</option>
                    <option value="Mid-level">Mid-level</option>
                    <option value="Senior">Senior</option>
                    <option value="Manager">Manager</option>
                    <option value="Director">Director</option>
                  </select>
                  <textarea name="description" placeholder="Job Description" defaultValue={selectedVacancy.description} rows="3" required style={{...styles.input(colors.lightGray), fontSize: isMobileView ? '0.9rem' : '1rem'}} />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1.5rem' }}>
                    <button type="button" onClick={closeModal} style={{...styles.button(colors.lightGray, colors.black, 'small'), background: colors.lightGray}}>Cancel</button>
                    <button type="submit" style={styles.button(colors.primary, colors.white, 'small')}>Save Changes</button>
                  </div>
                </form>
              </>
            )}

            {/* View Vacancy Modal */}
            {modalType === 'viewVacancy' && selectedVacancy && (
              <>
                <h2 style={{ fontSize: isMobileView ? '1.1rem' : '1.3rem', color: colors.primary }}>Vacancy Details</h2>
                <div style={{ display: isMobileView ? 'block' : 'flex', gap: '20px' }}>
                  <div style={{ flex: 1, marginBottom: isMobileView ? '1rem' : '0' }}>
                    <h4 style={{ color: colors.primary, fontSize: isMobileView ? '0.95rem' : '1rem' }}>Job Information</h4>
                    <p style={{ fontSize: isMobileView ? '0.9rem' : '1rem' }}><strong>Title:</strong> {selectedVacancy.title}</p>
                    <p style={{ fontSize: isMobileView ? '0.9rem' : '1rem' }}><strong>Department:</strong> {selectedVacancy.department}</p>
                    <p style={{ fontSize: isMobileView ? '0.9rem' : '1rem' }}><strong>Location:</strong> {selectedVacancy.location}</p>
                    <p style={{ fontSize: isMobileView ? '0.9rem' : '1rem' }}><strong>Salary:</strong> {selectedVacancy.salary}</p>
                    <p style={{ fontSize: isMobileView ? '0.9rem' : '1rem' }}><strong>Level:</strong> {selectedVacancy.level}</p>
                    <p style={{ fontSize: isMobileView ? '0.9rem' : '1rem' }}><strong>Status:</strong> {selectedVacancy.status}</p>
                    <p style={{ fontSize: isMobileView ? '0.9rem' : '1rem' }}><strong>Posted Date:</strong> {selectedVacancy.postedDate}</p>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ color: colors.primary, fontSize: isMobileView ? '0.95rem' : '1rem' }}>Employer Information</h4>
                    <p style={{ fontSize: isMobileView ? '0.9rem' : '1rem' }}><strong>Employer:</strong> {selectedVacancy.employer}</p>
                    <h4 style={{ color: colors.primary, fontSize: isMobileView ? '0.95rem' : '1rem', marginTop: '1rem' }}>Description</h4>
                    <p style={{ fontSize: isMobileView ? '0.9rem' : '1rem' }}>{selectedVacancy.description}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1.5rem' }}>
                  <button onClick={closeModal} style={styles.button(colors.primary, colors.white, 'small')}>Close</button>
                </div>
              </>
            )}

            {/* Match Job Seekers Modal */}
            {modalType === 'matchJobSeekers' && selectedVacancy && (
              <>
                <h2 style={{ fontSize: isMobileView ? '1.1rem' : '1.3rem', color: colors.primary }}>
                  Match Job Seekers for {selectedVacancy.title}
                </h2>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {jobSeekers.length > 0 ? (
                    jobSeekers.map(js => {
                      const matchScore = calculateMatchScore(selectedVacancy, js);
                      const isAlreadyApplied = applications.some(
                        app => app.vacancyId === selectedVacancy.id && app.jobSeekerId === js.id
                      );
                      
                      return (
                        <div key={js.id} style={{ 
                          border: `1px solid ${colors.lightGray}`, 
                          borderRadius: '8px', 
                          padding: '1rem', 
                          marginBottom: '1rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <div style={{ flex: 1 }}>
                            <h4 style={{ margin: '0 0 0.5rem 0', color: colors.primary }}>{js.name}</h4>
                            <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: colors.gray }}>
                              {js.currentCompany} • {js.level} • {js.experience}
                            </p>
                            <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                              <strong>Skills:</strong> {js.skills}
                            </p>
                            <div style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              marginTop: '0.5rem',
                              gap: '10px'
                            }}>
                              <span style={{ 
                                padding: '0.25rem 0.75rem', 
                                borderRadius: '20px', 
                                fontSize: '0.85rem', 
                                fontWeight: 'bold',
                                backgroundColor: matchScore >= 70 ? '#e8f5e9' : matchScore >= 40 ? '#fff3e0' : '#ffebee', 
                                color: matchScore >= 70 ? colors.success : matchScore >= 40 ? colors.warning : colors.secondary
                              }}>
                                Match Score: {matchScore}%
                              </span>
                              {isAlreadyApplied && (
                                <span style={{ 
                                  padding: '0.25rem 0.75rem', 
                                  borderRadius: '20px', 
                                  fontSize: '0.85rem', 
                                  fontWeight: 'bold',
                                  backgroundColor: colors.lightGray, 
                                  color: colors.black
                                }}>
                                  Already Applied
                                </span>
                              )}
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <button 
                              onClick={() => openModal('jobSeekerDetails', js)}
                              title="View Resume"
                              style={{ 
                                backgroundColor: colors.primary,
                                padding: "6px",
                                borderRadius: "4px",
                                fontSize: "10px",
                                fontWeight: "500",
                                width: "32px",
                                height: "32px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: colors.white,
                                border: "none",
                                cursor: "pointer"
                              }}
                            >
                              <i className="bi bi-eye-fill" style={{ fontSize: "14px" }}></i>
                            </button>
                            {!isAlreadyApplied && (
                              <button 
                                onClick={() => handleAddJobSeekerToVacancy(js.id)}
                                title="Send to Employer"
                                style={{ 
                                  backgroundColor: colors.secondary,
                                  padding: "6px",
                                  borderRadius: "4px",
                                  fontSize: "10px",
                                  fontWeight: "500",
                                  width: "32px",
                                  height: "32px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: colors.white,
                                  border: "none",
                                  cursor: "pointer"
                                }}
                              >
                                <i className="bi bi-send-fill" style={{ fontSize: "14px" }}></i>
                              </button>
                            )}
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div style={{ padding: '2rem', textAlign: 'center', color: colors.gray }}>
                      No job seekers available.
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1.5rem' }}>
                  <button onClick={closeModal} style={styles.button(colors.primary, colors.white, 'small')}>Close</button>
                </div>
              </>
            )}

            {/* Add Job Seeker Modal */}
            {modalType === 'addJobSeeker' && (
              <>
                <h2 style={{ fontSize: isMobileView ? '1.1rem' : '1.3rem', color: colors.primary }}>
                  Add Job Seeker Resume
                </h2>
                <form onSubmit={handleAddJobSeeker}>
                  <input name="name" placeholder="Full Name" required style={{...styles.input(colors.lightGray), fontSize: isMobileView ? '0.9rem' : '1rem'}} />
                  <input name="email" type="email" placeholder="Email Address" required style={{...styles.input(colors.lightGray), fontSize: isMobileView ? '0.9rem' : '1rem'}} />
                  <input name="phone" placeholder="Phone Number" required style={{...styles.input(colors.lightGray), fontSize: isMobileView ? '0.9rem' : '1rem'}} />
                  <input name="education" placeholder="Education" required style={{...styles.input(colors.lightGray), fontSize: isMobileView ? '0.9rem' : '1rem'}} />
                  <input name="currentCompany" placeholder="Current Company" required style={{...styles.input(colors.lightGray), fontSize: isMobileView ? '0.9rem' : '1rem'}} />
                  <input name="experience" placeholder="Experience (e.g., 3 years)" required style={{...styles.input(colors.lightGray), fontSize: isMobileView ? '0.9rem' : '1rem'}} />
                  <select name="level" required style={{...styles.input(colors.lightGray), fontSize: isMobileView ? '0.9rem' : '1rem'}}>
                    <option value="">Select Level</option>
                    <option value="Entry">Entry Level</option>
                    <option value="Mid-level">Mid-level</option>
                    <option value="Senior">Senior</option>
                    <option value="Manager">Manager</option>
                    <option value="Director">Director</option>
                  </select>
                  <input name="skills" placeholder="Key Skills (e.g., React, HR, PMP)" required style={{...styles.input(colors.lightGray), fontSize: isMobileView ? '0.9rem' : '1rem'}} />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1.5rem' }}>
                    <button type="button" onClick={closeModal} style={{...styles.button(colors.lightGray, colors.black, 'small'), background: colors.lightGray}}>Cancel</button>
                    <button type="submit" style={styles.button(colors.primary, colors.white, 'small')}>Save Resume</button>
                  </div>
                </form>
              </>
            )}

            {/* Job Seeker Details Modal */}
            {modalType === 'jobSeekerDetails' && selectedJobSeeker && (
              <>
                <h2 style={{ fontSize: isMobileView ? '1.1rem' : '1.3rem', color: colors.primary }}>Job Seeker Resume</h2>
                <div style={{ display: isMobileView ? 'block' : 'flex', gap: '20px' }}>
                  <div style={{ flex: 1, marginBottom: isMobileView ? '1rem' : '0' }}>
                    <h4 style={{ color: colors.primary, fontSize: isMobileView ? '0.95rem' : '1rem' }}>Personal Information</h4>
                    <p style={{ fontSize: isMobileView ? '0.9rem' : '1rem' }}><strong>Name:</strong> {selectedJobSeeker.name}</p>
                    <p style={{ fontSize: isMobileView ? '0.9rem' : '1rem' }}><strong>Email:</strong> {selectedJobSeeker.email}</p>
                    <p style={{ fontSize: isMobileView ? '0.9rem' : '1rem' }}><strong>Phone:</strong> {selectedJobSeeker.phone}</p>
                    <p style={{ fontSize: isMobileView ? '0.9rem' : '1rem' }}><strong>Level:</strong> {selectedJobSeeker.level}</p>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ color: colors.primary, fontSize: isMobileView ? '0.95rem' : '1rem' }}>Professional Information</h4>
                    <p style={{ fontSize: isMobileView ? '0.9rem' : '1rem' }}><strong>Education:</strong> {selectedJobSeeker.education}</p>
                    <p style={{ fontSize: isMobileView ? '0.9rem' : '1rem' }}><strong>Current Company:</strong> {selectedJobSeeker.currentCompany}</p>
                    <p style={{ fontSize: isMobileView ? '0.9rem' : '1rem' }}><strong>Experience:</strong> {selectedJobSeeker.experience}</p>
                    <p style={{ fontSize: isMobileView ? '0.9rem' : '1rem' }}><strong>Skills:</strong> {selectedJobSeeker.skills}</p>
                  </div>
                </div>
                {selectedVacancy && (
                  <div style={{ marginTop: '1rem' }}>
                    <h4 style={{ color: colors.primary, fontSize: isMobileView ? '0.95rem' : '1rem' }}>Match Score for {selectedVacancy.title}</h4>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      marginTop: '0.5rem'
                    }}>
                      <span style={{ 
                        padding: '0.25rem 0.75rem', 
                        borderRadius: '20px', 
                        fontSize: '0.85rem', 
                        fontWeight: 'bold',
                        backgroundColor: calculateMatchScore(selectedVacancy, selectedJobSeeker) >= 70 ? '#e8f5e9' : calculateMatchScore(selectedVacancy, selectedJobSeeker) >= 40 ? '#fff3e0' : '#ffebee', 
                        color: calculateMatchScore(selectedVacancy, selectedJobSeeker) >= 70 ? colors.success : calculateMatchScore(selectedVacancy, selectedJobSeeker) >= 40 ? colors.warning : colors.secondary
                      }}>
                        {calculateMatchScore(selectedVacancy, selectedJobSeeker)}%
                      </span>
                    </div>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1.5rem' }}>
                  <button onClick={closeModal} style={styles.button(colors.primary, colors.white, 'small')}>Close</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable Styles
const styles = {
  button: (bg, color, size = 'medium') => ({
    backgroundColor: bg,
    color: color,
    border: 'none',
    padding: size === 'small' ? '8px 16px' : '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
    fontSize: size === 'small' ? '0.9rem' : '1rem',
  }),
  input: (borderColor) => ({
    width: '100%',
    padding: '12px',
    margin: '8px 0',
    border: `1px solid ${borderColor}`,
    borderRadius: '5px',
    boxSizing: 'border-box',
    fontSize: '1rem',
  }),
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalBox: (bg) => ({
    backgroundColor: bg,
    padding: '1.5rem',
    borderRadius: '10px',
    width: '70%',
    maxWidth: '600px',
    maxHeight: '80vh',
    overflowY: 'auto',
    position: 'relative',
    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
  }),
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '15px',
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#757575',
  },
  tabButton: {
    flex: 1,
    padding: '1rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    textAlign: 'center',
    transition: 'all 0.3s',
  },
};