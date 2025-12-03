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
    // background: "#FAFAFA", // Removed background color
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
      salary: "₹12-18 LPA"
    },
    { 
      id: 2, 
      title: "HR Manager", 
      department: "Human Resources", 
      location: "Delhi",
      description: "5+ years of experience in recruitment and employee relations. MBA in HR is preferred.", 
      status: "Active",
      postedDate: "2023-10-10",
      salary: "₹8-12 LPA"
    },
    { 
      id: 3, 
      title: "Project Manager", 
      department: "Management", 
      location: "Bangalore",
      description: "PMP certified with a track record of delivering projects on time. Experience in Agile methodologies is required.", 
      status: "Closed",
      postedDate: "2023-09-25",
      salary: "₹15-20 LPA"
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
      currentCompany: "Tech Solutions Pvt Ltd"
    },
    { 
      id: 102, 
      name: "Amit Kumar", 
      email: "amit.k@email.com", 
      phone: "9123456789", 
      skills: "Recruitment, Payroll, HR Policies", 
      experience: "6 years",
      education: "MBA in HR",
      currentCompany: "PeopleFirst HR"
    },
    { 
      id: 103, 
      name: "Rohit Sharma", 
      email: "rohit.s@email.com", 
      phone: "9898765432", 
      skills: "Java, Spring Boot, Microservices", 
      experience: "5 years",
      education: "M.Tech in Computer Science",
      currentCompany: "Digital Innovations"
    },
  ]);

  // State for tracking applications
  const [applications, setApplications] = useState([
    { id: 1001, vacancyId: 1, jobSeekerId: 101, status: "Applied", date: "2023-10-16" },
    { id: 1002, vacancyId: 2, jobSeekerId: 102, status: "Shortlisted", date: "2023-10-12" },
  ]);

  // UI state management
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [modalType, setModalType] = useState(null); // Controls which modal is open
  const [selectedJobSeeker, setSelectedJobSeeker] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Helper functions
  const getApplicationsForVacancy = (vacancyId) => {
    return applications.filter(app => app.vacancyId === vacancyId);
  };

  const getJobSeekerById = (id) => {
    return jobSeekers.find(js => js.id === id);
  };

  const getVacancyById = (id) => {
    return vacancies.find(v => v.id === id);
  };

  // Modal handlers
  const openModal = (type, data = null) => {
    setModalType(type);
    if (data) {
      if (type === 'jobSeekerDetails') {
        setSelectedJobSeeker(data);
      } else if (type === 'addJobSeeker') {
        setSelectedVacancy(data);
      }
    }
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedJobSeeker(null);
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
    };
    setVacancies([...vacancies, newVacancy]);
    closeModal();
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
    };
    setJobSeekers([...jobSeekers, newJobSeeker]);
    closeModal();
  };

  const handleAddJobSeekerToVacancy = (jobSeekerId) => {
    const newApplication = {
      id: applications.length + 1001,
      vacancyId: selectedVacancy.id,
      jobSeekerId: jobSeekerId,
      status: "Applied",
      date: new Date().toISOString().split('T')[0],
    };
    setApplications([...applications, newApplication]);
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
                         v.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || v.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ backgroundColor: colors.white, borderBottom: `1px solid ${colors.lightGray}`, padding: '0.75rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, color: colors.primary, fontSize: '1.5rem' }}>Job Portal</h1>
        <div>
          <button onClick={() => openModal('addVacancy')} style={styles.button(colors.primary, colors.white, 'small')}>+ Add Vacancy</button>
          <button onClick={() => openModal('addJobSeeker')} style={{...styles.button(colors.secondary, colors.white, 'small'), marginLeft: '10px'}}>+ Add Job Seeker</button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ display: 'flex', padding: '1rem', gap: '1rem' }}>
        {/* Left Panel: Vacancies List */}
        <aside style={{ flex: '1', maxWidth: '350px' }}>
          <div style={{ marginBottom: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <input 
              type="text" 
              placeholder="Search vacancies..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{...styles.input(colors.lightGray), padding: '0.5rem', fontSize: '0.85rem'}}
            />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{...styles.input(colors.lightGray), padding: '0.5rem', fontSize: '0.85rem'}}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          
          <h2 style={{ color: colors.black, borderBottom: `2px solid ${colors.primary}`, paddingBottom: '0.5rem', fontSize: '1.1rem' }}>Vacancies</h2>
          {filteredVacancies.length > 0 ? (
            filteredVacancies.map(v => {
              const appCount = getApplicationsForVacancy(v.id).length;
              return (
                <div 
                  key={v.id} 
                  onClick={() => setSelectedVacancy(v)} 
                  style={{ 
                    ...styles.vacancyCard, 
                    backgroundColor: selectedVacancy?.id === v.id ? colors.primary : colors.white, 
                    color: selectedVacancy?.id === v.id ? colors.white : colors.black,
                    padding: '0.75rem',
                    marginBottom: '0.5rem'
                  }}
                >
                  <h3 style={{ margin: '0 0 0.25rem', fontSize: '0.95rem' }}>{v.title}</h3>
                  <p style={{ margin: '0 0 0.1rem', fontSize: '0.8rem', color: selectedVacancy?.id === v.id ? colors.white : colors.gray }}>
                    {v.department} • {v.location}
                  </p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: selectedVacancy?.id === v.id ? colors.white : colors.gray }}>
                    {appCount} Applications • {v.status}
                  </p>
                </div>
              )
            })
          ) : (
            <div style={{ padding: '0.75rem', textAlign: 'center', color: colors.gray, fontSize: '0.85rem' }}>
              No vacancies found matching your criteria.
            </div>
          )}
        </aside>

        {/* Right Panel: Vacancy Details & Actions */}
        <section style={{ flex: '2' }}>
          {selectedVacancy ? (
            <div style={{ backgroundColor: colors.white, padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <h2 style={{ color: colors.primary, marginTop: 0, fontSize: '1.3rem' }}>{selectedVacancy.title}</h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem' }}>
                    <p style={{ margin: 0, fontSize: '0.85rem' }}><strong>Department:</strong> {selectedVacancy.department}</p>
                    <p style={{ margin: 0, fontSize: '0.85rem' }}><strong>Location:</strong> {selectedVacancy.location}</p>
                    <p style={{ margin: 0, fontSize: '0.85rem' }}><strong>Salary:</strong> {selectedVacancy.salary}</p>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem' }}>
                    <p style={{ margin: 0, fontSize: '0.85rem' }}><strong>Posted:</strong> {selectedVacancy.postedDate}</p>
                    <p style={{ margin: 0, fontSize: '0.85rem' }}><strong>Status:</strong> <span style={{ color: selectedVacancy.status === 'Active' ? colors.success : colors.gray }}>{selectedVacancy.status}</span></p>
                  </div>
                </div>
                <div>
                  <span style={{ 
                    padding: '0.2rem 0.5rem', 
                    borderRadius: '20px', 
                    fontSize: '0.75rem', 
                    backgroundColor: selectedVacancy.status === 'Active' ? '#e8f5e9' : '#f3f3f3', 
                    color: selectedVacancy.status === 'Active' ? colors.success : colors.gray 
                  }}>
                    {selectedVacancy.status}
                  </span>
                </div>
              </div>
              
              <div style={{ marginTop: '0.75rem' }}>
                <h3 style={{ margin: '0 0 0.25rem', fontSize: '1rem' }}>Job Description</h3>
                <p style={{ margin: 0, lineHeight: '1.4', fontSize: '0.85rem' }}>{selectedVacancy.description}</p>
              </div>
              
              <div style={{ marginTop: '1rem', display: 'flex', gap: '10px' }}>
                <button onClick={() => openModal('addJobSeeker', selectedVacancy)} style={styles.button(colors.primary, colors.white, 'small')}>+ Add Job Seeker</button>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ borderBottom: `1px solid ${colors.lightGray}`, paddingBottom: '0.5rem', fontSize: '1rem' }}>Applications</h3>
                {getApplicationsForVacancy(selectedVacancy.id).length > 0 ? (
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '0.75rem', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ borderBottom: `1px solid ${colors.lightGray}` }}>
                        <th style={{ textAlign: 'left', padding: '0.4rem' }}>Name</th>
                        <th style={{ textAlign: 'left', padding: '0.4rem' }}>Date</th>
                        <th style={{ textAlign: 'left', padding: '0.4rem' }}>Status</th>
                        <th style={{ textAlign: 'left', padding: '0.4rem' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getApplicationsForVacancy(selectedVacancy.id).map(app => {
                        const seeker = getJobSeekerById(app.jobSeekerId);
                        return (
                          <tr key={app.id} style={{ borderBottom: `1px solid ${colors.lightGray}` }}>
                            <td style={{ padding: '0.4rem' }}>
                              <button 
                                onClick={() => openModal('jobSeekerDetails', seeker)}
                                style={{ background: 'none', border: 'none', color: colors.primary, cursor: 'pointer', textDecoration: 'underline', fontSize: '0.85rem' }}
                              >
                                {seeker.name}
                              </button>
                            </td>
                            <td style={{ padding: '0.4rem' }}>{app.date}</td>
                            <td style={{ padding: '0.4rem' }}>
                              <select 
                                value={app.status} 
                                onChange={(e) => handleUpdateApplicationStatus(app.id, e.target.value)}
                                style={{ padding: '0.2rem', borderRadius: '4px', border: `1px solid ${colors.lightGray}`, fontSize: '0.8rem' }}
                              >
                                <option value="Applied">Applied</option>
                                <option value="Shortlisted">Shortlisted</option>
                                <option value="Interview">Interview</option>
                                <option value="Offered">Offered</option>
                                <option value="Rejected">Rejected</option>
                              </select>
                            </td>
                            <td style={{ padding: '0.4rem' }}>
                              <button 
                                onClick={() => openModal('jobSeekerDetails', seeker)}
                                style={{ background: 'none', border: 'none', color: colors.primary, cursor: 'pointer', fontSize: '0.8rem' }}
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <p style={{ color: colors.gray, fontSize: '0.85rem' }}>No applications yet for this vacancy.</p>
                )}
              </div>
            </div>
          ) : (
            <div style={{ ...styles.placeholder, backgroundColor: colors.white, padding: '2rem' }}>
              <h2 style={{ fontSize: '1.3rem' }}>Welcome to Job Portal</h2>
              <p style={{ fontSize: '0.9rem' }}>Please select a vacancy from list to view details and manage applicants.</p>
            </div>
          )}
        </section>
      </main>

      {/* Modals */}
      {modalType && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalBox(colors.white)} onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} style={styles.closeButton}>×</button>
            
            {/* Add Vacancy Modal */}
            {modalType === 'addVacancy' && (
              <>
                <h2 style={{ fontSize: '1.1rem' }}>Add New Vacancy</h2>
                <form onSubmit={handleAddVacancy}>
                  <input name="title" placeholder="Job Title" required style={{...styles.input(colors.lightGray), padding: '0.5rem', fontSize: '0.85rem'}} />
                  <input name="department" placeholder="Department" required style={{...styles.input(colors.lightGray), padding: '0.5rem', fontSize: '0.85rem'}} />
                  <input name="location" placeholder="Location" required style={{...styles.input(colors.lightGray), padding: '0.5rem', fontSize: '0.85rem'}} />
                  <input name="salary" placeholder="Salary Range (e.g., ₹8-12 LPA)" required style={{...styles.input(colors.lightGray), padding: '0.5rem', fontSize: '0.85rem'}} />
                  <textarea name="description" placeholder="Job Description" rows="3" required style={{...styles.input(colors.lightGray), padding: '0.5rem', fontSize: '0.85rem'}} />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1rem' }}>
                    <button type="button" onClick={closeModal} style={{...styles.button(colors.lightGray, colors.black, 'small'), background: colors.lightGray}}>Cancel</button>
                    <button type="submit" style={styles.button(colors.primary, colors.white, 'small')}>Create</button>
                  </div>
                </form>
              </>
            )}

            {/* Add Job Seeker Modal */}
            {modalType === 'addJobSeeker' && (
              <>
                <h2 style={{ fontSize: '1.1rem' }}>Add New Job Seeker</h2>
                <form onSubmit={handleAddJobSeeker}>
                  <input name="name" placeholder="Full Name" required style={{...styles.input(colors.lightGray), padding: '0.5rem', fontSize: '0.85rem'}} />
                  <input name="email" type="email" placeholder="Email Address" required style={{...styles.input(colors.lightGray), padding: '0.5rem', fontSize: '0.85rem'}} />
                  <input name="phone" placeholder="Phone Number" required style={{...styles.input(colors.lightGray), padding: '0.5rem', fontSize: '0.85rem'}} />
                  <input name="education" placeholder="Education" required style={{...styles.input(colors.lightGray), padding: '0.5rem', fontSize: '0.85rem'}} />
                  <input name="currentCompany" placeholder="Current Company" required style={{...styles.input(colors.lightGray), padding: '0.5rem', fontSize: '0.85rem'}} />
                  <input name="experience" placeholder="Experience (e.g., 3 years)" required style={{...styles.input(colors.lightGray), padding: '0.5rem', fontSize: '0.85rem'}} />
                  <input name="skills" placeholder="Key Skills (e.g., React, HR, PMP)" required style={{...styles.input(colors.lightGray), padding: '0.5rem', fontSize: '0.85rem'}} />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1rem' }}>
                    <button type="button" onClick={closeModal} style={{...styles.button(colors.lightGray, colors.black, 'small'), background: colors.lightGray}}>Cancel</button>
                    <button type="submit" style={styles.button(colors.primary, colors.white, 'small')}>Add</button>
                  </div>
                </form>
              </>
            )}

            {/* Add Job Seeker to Vacancy Modal */}
            {modalType === 'addJobSeeker' && selectedVacancy && (
              <>
                <h2 style={{ fontSize: '1.1rem' }}>Add Job Seeker to Vacancy</h2>
                <p style={{ fontSize: '0.85rem' }}>Select a job seeker to add to <strong>{selectedVacancy.title}</strong></p>
                {jobSeekers.filter(js => !applications.some(app => app.vacancyId === selectedVacancy.id && app.jobSeekerId === js.id)).length > 0 ? (
                  jobSeekers.filter(js => !applications.some(app => app.vacancyId === selectedVacancy.id && app.jobSeekerId === js.id)).map(js => (
                    <div key={js.id} style={styles.jobSeekerCard}>
                      <div>
                        <strong style={{ fontSize: '0.9rem' }}>{js.name}</strong>
                        <div style={{ fontSize: '0.8rem', color: colors.gray }}>
                          {js.skills} • {js.experience}
                        </div>
                      </div>
                      <button onClick={() => handleAddJobSeekerToVacancy(js.id)} style={styles.button(colors.primary, colors.white, 'small')}>Add</button>
                    </div>
                  ))
                ) : (
                  <p style={{ color: colors.gray, margin: '1rem 0', fontSize: '0.85rem' }}>All job seekers have already been added to this vacancy.</p>
                )}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1rem' }}>
                  <button onClick={closeModal} style={{...styles.button(colors.lightGray, colors.black, 'small'), background: colors.lightGray}}>Cancel</button>
                </div>
              </>
            )}

            {/* Job Seeker Details Modal */}
            {modalType === 'jobSeekerDetails' && selectedJobSeeker && (
              <>
                <h2 style={{ fontSize: '1.1rem' }}>Job Seeker Details</h2>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ color: colors.primary, fontSize: '0.95rem' }}>Personal Information</h4>
                    <p style={{ fontSize: '0.85rem' }}><strong>Name:</strong> {selectedJobSeeker.name}</p>
                    <p style={{ fontSize: '0.85rem' }}><strong>Email:</strong> {selectedJobSeeker.email}</p>
                    <p style={{ fontSize: '0.85rem' }}><strong>Phone:</strong> {selectedJobSeeker.phone}</p>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ color: colors.primary, fontSize: '0.95rem' }}>Professional Information</h4>
                    <p style={{ fontSize: '0.85rem' }}><strong>Education:</strong> {selectedJobSeeker.education}</p>
                    <p style={{ fontSize: '0.85rem' }}><strong>Current Company:</strong> {selectedJobSeeker.currentCompany}</p>
                    <p style={{ fontSize: '0.85rem' }}><strong>Experience:</strong> {selectedJobSeeker.experience}</p>
                    <p style={{ fontSize: '0.85rem' }}><strong>Skills:</strong> {selectedJobSeeker.skills}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1rem' }}>
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
    padding: size === 'small' ? '6px 12px' : '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
    fontSize: size === 'small' ? '0.85rem' : '1rem',
  }),
  vacancyCard: {
    border: `1px solid #E0E0E0`,
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  jobSeekerCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem',
    border: `1px solid #E0E0E0`,
    borderRadius: '8px',
    marginTop: '0.75rem',
  },
  placeholder: {
    padding: '2rem',
    textAlign: 'center',
    borderRadius: '8px',
    color: '#757575'
  },
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
    maxWidth: '500px',
    maxHeight: '70vh',
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
    fontSize: '20px',
    cursor: 'pointer',
    color: '#757575',
  },
  input: (borderColor) => ({
    width: '100%',
    padding: '8px',
    margin: '8px 0',
    border: `1px solid ${borderColor}`,
    borderRadius: '5px',
    boxSizing: 'border-box',
  })
};