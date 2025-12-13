// src/pages/JobSeeker/UserProfile.js

import React, { useState } from 'react';
import { Row, Col, Card, Button, Badge, Form, InputGroup, Modal, ListGroup } from 'react-bootstrap';
import { 
  FaUser, 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaPhone, 
  FaEdit,
  FaBriefcase,
  FaGraduationCap,
  FaFileUpload,
  FaPlus,
  FaTrash,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';

// --- Initial Dummy Data ---
const initialProfileData = {
  personalDetails: {
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+91 9876543210',
    location: 'Mumbai, India',
    headline: 'Senior Frontend Developer | React | Node.js',
  },
  professionalSummary: 'Experienced Frontend Developer with over 5 years of expertise in building scalable and responsive web applications. Proficient in React, Redux, and modern JavaScript. Passionate about creating intuitive user interfaces and improving application performance.',
  skills: ['React', 'JavaScript', 'Redux', 'Node.js', 'HTML5', 'CSS3', 'Bootstrap', 'Git'],
  experience: [
    { id: 1, company: 'Tech Solutions Inc.', title: 'Senior Frontend Developer', duration: '2021 - Present', description: 'Lead the development of the company\'s flagship product.' },
    { id: 2, company: 'Digital Innovations', title: 'Frontend Developer', duration: '2019 - 2021', description: 'Developed and maintained client websites using React and Vue.' },
  ],
  education: [
    { id: 1, institution: 'University of Mumbai', degree: 'B.Tech in Computer Science', duration: '2015 - 2019' },
  ],
  resume: { fileName: 'John_Doe_Resume.pdf' },
  jobPreferences: {
    industry: 'Information Technology',
    role: 'Frontend Developer',
    location: 'Mumbai, Bangalore, Pune',
    salary: '₹15 - 25 LPA',
  },
  profileVisibility: {
    isVisible: true,
  }
};

// --- Main UserProfilePage Component ---
const UserProfilePage = () => {
  const [profile, setProfile] = useState(initialProfileData);
  
  // State for controlling modals
  const [showPersonalModal, setShowPersonalModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);

  // Temporary state for form inputs in modals
  const [tempPersonal, setTempPersonal] = useState(profile.personalDetails);
  const [tempSummary, setTempSummary] = useState(profile.professionalSummary);
  const [tempSkills, setTempSkills] = useState(profile.skills.join(', '));
  const [tempExperience, setTempExperience] = useState(profile.experience);
  const [tempEducation, setTempEducation] = useState(profile.education);
  const [tempPreferences, setTempPreferences] = useState(profile.jobPreferences);

  // --- Handler Functions ---
  const handleSavePersonal = () => {
    setProfile({ ...profile, personalDetails: tempPersonal });
    setShowPersonalModal(false);
  };

  const handleSaveSummary = () => {
    setProfile({ ...profile, professionalSummary: tempSummary });
    setShowSummaryModal(false);
  };

  const handleSaveSkills = () => {
    setProfile({ ...profile, skills: tempSkills.split(',').map(s => s.trim()).filter(s => s) });
    setShowSkillsModal(false);
  };
  
  const handleSaveExperience = () => {
    setProfile({ ...profile, experience: tempExperience });
    setShowExperienceModal(false);
  };

  const handleSaveEducation = () => {
    setProfile({ ...profile, education: tempEducation });
    setShowEducationModal(false);
  };

  const handleSavePreferences = () => {
    setProfile({ ...profile, jobPreferences: tempPreferences });
    setShowPreferencesModal(false);
  };

  const handleResumeUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfile({ ...profile, resume: { fileName: e.target.files[0].name } });
    }
  };
  
  const toggleProfileVisibility = () => {
    setProfile({ ...profile, profileVisibility: { isVisible: !profile.profileVisibility.isVisible } });
  };

  const addExperience = () => {
    setTempExperience([...tempExperience, { id: Date.now(), company: '', title: '', duration: '', description: '' }]);
  };

  const deleteExperience = (id) => {
    setTempExperience(tempExperience.filter(exp => exp.id !== id));
  };
  
  const addEducation = () => {
    setTempEducation([...tempEducation, { id: Date.now(), institution: '', degree: '', duration: '' }]);
  };

  const deleteEducation = (id) => {
    setTempEducation(tempEducation.filter(edu => edu.id !== id));
  };
  
  const handleExperienceChange = (id, field, value) => {
    setTempExperience(tempExperience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
  };

  const handleEducationChange = (id, field, value) => {
    setTempEducation(tempEducation.map(edu => edu.id === id ? { ...edu, [field]: value } : edu));
  };


  return (
    <div className="container-fluid" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div className="container py-4">
        <h1 className="mb-4">My Profile</h1>

        <Row>
          {/* Left Column */}
          <Col lg={8}>
            {/* Personal Details Card */}
            <Card className="mb-4 shadow-sm">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <Card.Title as="h5" className="mb-0"><FaUser className="me-2" />Personal Details</Card.Title>
                <Button variant="outline-primary" size="sm" onClick={() => { setTempPersonal(profile.personalDetails); setShowPersonalModal(true); }}>
                  <FaEdit /> Edit
                </Button>
              </Card.Header>
              <Card.Body>
                <h4>{profile.personalDetails.name}</h4>
                <p className="text-muted">{profile.personalDetails.headline}</p>
                <p><FaEnvelope className="me-2" />{profile.personalDetails.email}</p>
                <p><FaPhone className="me-2" />{profile.personalDetails.phone}</p>
                <p><FaMapMarkerAlt className="me-2" />{profile.personalDetails.location}</p>
              </Card.Body>
            </Card>

            {/* Professional Summary Card */}
            <Card className="mb-4 shadow-sm">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <Card.Title as="h5" className="mb-0">Professional Summary</Card.Title>
                <Button variant="outline-primary" size="sm" onClick={() => { setTempSummary(profile.professionalSummary); setShowSummaryModal(true); }}>
                  <FaEdit /> Edit
                </Button>
              </Card.Header>
              <Card.Body>
                <p>{profile.professionalSummary}</p>
              </Card.Body>
            </Card>

            {/* Skills Card */}
            <Card className="mb-4 shadow-sm">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <Card.Title as="h5" className="mb-0">Skills</Card.Title>
                <Button variant="outline-primary" size="sm" onClick={() => { setTempSkills(profile.skills.join(', ')); setShowSkillsModal(true); }}>
                  <FaEdit /> Edit
                </Button>
              </Card.Header>
              <Card.Body>
                <div className="d-flex flex-wrap gap-2">
                  {profile.skills.map(skill => <Badge key={skill} bg="secondary">{skill}</Badge>)}
                </div>
              </Card.Body>
            </Card>

            {/* Experience Card */}
            <Card className="mb-4 shadow-sm">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <Card.Title as="h5" className="mb-0"><FaBriefcase className="me-2" />Work Experience</Card.Title>
                <Button variant="outline-primary" size="sm" onClick={() => { setTempExperience(profile.experience); setShowExperienceModal(true); }}>
                  <FaEdit /> Edit
                </Button>
              </Card.Header>
              <Card.Body>
                {profile.experience.map(exp => (
                  <div key={exp.id} className="mb-3">
                    <h6>{exp.title} - {exp.company}</h6>
                    <p className="text-muted small">{exp.duration}</p>
                    <p>{exp.description}</p>
                  </div>
                ))}
              </Card.Body>
            </Card>

            {/* Education Card */}
            <Card className="mb-4 shadow-sm">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <Card.Title as="h5" className="mb-0"><FaGraduationCap className="me-2" />Education</Card.Title>
                <Button variant="outline-primary" size="sm" onClick={() => { setTempEducation(profile.education); setShowEducationModal(true); }}>
                  <FaEdit /> Edit
                </Button>
              </Card.Header>
              <Card.Body>
                {profile.education.map(edu => (
                  <div key={edu.id} className="mb-3">
                    <h6>{edu.degree}</h6>
                    <p className="text-muted">{edu.institution} | {edu.duration}</p>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>

          {/* Right Column */}
          <Col lg={4}>
            {/* Resume Card */}
            <Card className="mb-4 shadow-sm">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <Card.Title as="h5" className="mb-0"><FaFileUpload className="me-2" />Resume</Card.Title>
              </Card.Header>
              <Card.Body>
                <p className="text-muted">Current Resume:</p>
                <p><strong>{profile.resume.fileName}</strong></p>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Upload New Resume</Form.Label>
                  <Form.Control type="file" onChange={handleResumeUpload} />
                </Form.Group>
              </Card.Body>
            </Card>

            {/* Job Preferences Card */}
            <Card className="mb-4 shadow-sm">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <Card.Title as="h5" className="mb-0">Job Preferences</Card.Title>
                <Button variant="outline-primary" size="sm" onClick={() => { setTempPreferences(profile.jobPreferences); setShowPreferencesModal(true); }}>
                  <FaEdit /> Edit
                </Button>
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item><strong>Industry:</strong> {profile.jobPreferences.industry}</ListGroup.Item>
                  <ListGroup.Item><strong>Role:</strong> {profile.jobPreferences.role}</ListGroup.Item>
                  <ListGroup.Item><strong>Location:</strong> {profile.jobPreferences.location}</ListGroup.Item>
                  <ListGroup.Item><strong>Salary:</strong> {profile.jobPreferences.salary}</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>

            {/* Profile Visibility Card */}
            <Card className="mb-4 shadow-sm">
              <Card.Header>
                <Card.Title as="h5" className="mb-0">Profile Visibility</Card.Title>
              </Card.Header>
              <Card.Body>
                <p>Make your profile visible to recruiters.</p>
                <div className="d-flex align-items-center">
                  <Form.Check 
                    type="switch"
                    id="profile-visibility-switch"
                    checked={profile.profileVisibility.isVisible}
                    onChange={toggleProfileVisibility}
                  />
                  <span className="ms-2">
                    {profile.profileVisibility.isVisible ? 'Visible' : 'Hidden'}
                  </span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* --- MODALS --- */}
      
      {/* Personal Details Modal */}
      <Modal show={showPersonalModal} onHide={() => setShowPersonalModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Personal Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" value={tempPersonal.name} onChange={(e) => setTempPersonal({ ...tempPersonal, name: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Headline</Form.Label>
              <Form.Control type="text" value={tempPersonal.headline} onChange={(e) => setTempPersonal({ ...tempPersonal, headline: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={tempPersonal.email} onChange={(e) => setTempPersonal({ ...tempPersonal, email: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" value={tempPersonal.phone} onChange={(e) => setTempPersonal({ ...tempPersonal, phone: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" value={tempPersonal.location} onChange={(e) => setTempPersonal({ ...tempPersonal, location: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPersonalModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSavePersonal}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Professional Summary Modal */}
      <Modal show={showSummaryModal} onHide={() => setShowSummaryModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Professional Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Summary</Form.Label>
              <Form.Control as="textarea" rows={5} value={tempSummary} onChange={(e) => setTempSummary(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSummaryModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSaveSummary}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Skills Modal */}
      <Modal show={showSkillsModal} onHide={() => setShowSkillsModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Skills</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Skills (comma separated)</Form.Label>
              <Form.Control type="text" value={tempSkills} onChange={(e) => setTempSkills(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSkillsModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSaveSkills}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Experience Modal */}
      <Modal show={showExperienceModal} onHide={() => setShowExperienceModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Work Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {tempExperience.map((exp, index) => (
            <Card key={exp.id} className="mb-3">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6>Experience {index + 1}</h6>
                  <Button variant="outline-danger" size="sm" onClick={() => deleteExperience(exp.id)}>
                    <FaTrash />
                  </Button>
                </div>
                <Form.Group className="mb-2">
                  <Form.Control type="text" placeholder="Job Title" value={exp.title} onChange={(e) => handleExperienceChange(exp.id, 'title', e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control type="text" placeholder="Company" value={exp.company} onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control type="text" placeholder="Duration (e.g., 2019 - 2021)" value={exp.duration} onChange={(e) => handleExperienceChange(exp.id, 'duration', e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control as="textarea" rows={2} placeholder="Description" value={exp.description} onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)} />
                </Form.Group>
              </Card.Body>
            </Card>
          ))}
          <Button variant="outline-primary" className="w-100" onClick={addExperience}>
            <FaPlus /> Add More Experience
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowExperienceModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSaveExperience}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Education Modal */}
      <Modal show={showEducationModal} onHide={() => setShowEducationModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Education</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {tempEducation.map((edu, index) => (
            <Card key={edu.id} className="mb-3">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6>Education {index + 1}</h6>
                  <Button variant="outline-danger" size="sm" onClick={() => deleteEducation(edu.id)}>
                    <FaTrash />
                  </Button>
                </div>
                <Form.Group className="mb-2">
                  <Form.Control type="text" placeholder="Degree" value={edu.degree} onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control type="text" placeholder="Institution" value={edu.institution} onChange={(e) => handleEducationChange(edu.id, 'institution', e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control type="text" placeholder="Duration (e.g., 2015 - 2019)" value={edu.duration} onChange={(e) => handleEducationChange(edu.id, 'duration', e.target.value)} />
                </Form.Group>
              </Card.Body>
            </Card>
          ))}
          <Button variant="outline-primary" className="w-100" onClick={addEducation}>
            <FaPlus /> Add More Education
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEducationModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSaveEducation}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Job Preferences Modal */}
      <Modal show={showPreferencesModal} onHide={() => setShowPreferencesModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Job Preferences</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Industry</Form.Label>
              <Form.Control type="text" value={tempPreferences.industry} onChange={(e) => setTempPreferences({ ...tempPreferences, industry: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control type="text" value={tempPreferences.role} onChange={(e) => setTempPreferences({ ...tempPreferences, role: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" value={tempPreferences.location} onChange={(e) => setTempPreferences({ ...tempPreferences, location: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Salary</Form.Label>
              <Form.Control type="text" value={tempPreferences.salary} onChange={(e) => setTempPreferences({ ...tempPreferences, salary: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPreferencesModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSavePreferences}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserProfilePage;