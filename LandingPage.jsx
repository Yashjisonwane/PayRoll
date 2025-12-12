import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LandingPage.css';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [counters, setCounters] = useState({
    years: 0,
    cases: 0,
    team: 0,
    clients: 0
  });
  const navigate = useNavigate();
  
  useEffect(() => {
    // Counter animation
    const interval = setInterval(() => {
      setCounters(prev => ({
        years: prev.years < 25 ? prev.years + 1 : 25,
        cases: prev.cases < 110 ? prev.cases + 2 : 110,
        team: prev.team < 55 ? prev.team + 1 : 55,
        clients: prev.clients < 3400 ? prev.clients + 100 : 3400
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Smooth scroll function for navigation
  const handleNavClick = (e, tabId) => {
    e.preventDefault();
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Adjust for fixed header height
        behavior: 'smooth'
      });
    }
  };

  const testimonials = [
    {
      id: 1,
      text: "I've been using Dallas Payroll Services for over a year now, and I couldn't be more satisfied. Their team is incredibly knowledgeable, professional, and always responsive to our needs. They handle everything from tax filings to benefits management seamlessly, saving me a lot of time and stress. Highly recommend their services to any business looking for reliable payroll support!",
      rating: 5
    },
    {
      id: 2,
      text: "As a small business owner, I was overwhelmed with payroll responsibilities. Dallas Payroll Services has been a game-changer. They offer customized solutions that fit my company's size and needs, and their online portal makes it easy for me to manage everything. The team is friendly and always available to answer questions. I feel confident knowing my payroll is in good hands.",
      rating: 5
    },
    {
      id: 3,
      text: "Great service overall! Dallas Payroll Services has helped our company streamline payroll processing and ensure we stay compliant with ever-changing tax laws. The team is knowledgeable and professional, and their attention to detail is excellent. The only reason I'm giving 4 stars instead of 5 is that there was a slight delay in communication once, but it was resolved quickly. Would definitely recommend.",
      rating: 4
    }
  ];

  const partners = [
    { id: 1, name: "Partner 1", logo: "https://dallaspayroll.com/wp-content/uploads/2024/12/logo-preview-1.png" },
    { id: 2, name: "Partner 2", logo: "https://dallaspayroll.com/wp-content/uploads/2024/12/logo-preview-2.png" },
    { id: 3, name: "Partner 3", logo: "https://dallaspayroll.com/wp-content/uploads/2024/12/logo-preview-3.png" },
    { id: 4, name: "Partner 4", logo: "https://dallaspayroll.com/wp-content/uploads/2024/12/logo-preview-4.png" },
    { id: 5, name: "Partner 5", logo: "https://dallaspayroll.com/wp-content/uploads/2024/12/logo-preview-6.png" },
    { id: 6, name: "Partner 6", logo: "https://dallaspayroll.com/wp-content/uploads/2024/12/logo-preview-8.png" }
  ];

  const services = [
    {
      id: 1,
      title: "Payroll Processing",
      description: "Dallas Payroll software offers complete payroll processing services, including calculating employee wages, withholding taxes, managing deductions, and issuing payments. Our system is designed to handle any pay frequency, from weekly to bi-weekly and monthly payroll schedules.",
      icon: "https://dallaspayroll.com/wp-content/uploads/2024/12/Icon-02.png"
    },
    {
      id: 2,
      title: "Tax Compliance & Filing",
      description: "Our payroll software ensure businesses comply with federal, state, and local tax regulations by calculating, withholding, and filing all necessary payroll taxes. Dallas Payroll handles tax reporting, including W-2s, 1099s, and other required filings, so businesses can avoid penalties and stay compliant.",
      icon: "https://dallaspayroll.com/wp-content/uploads/2024/12/Icon-03.png"
    },
    {
      id: 3,
      title: "Employee Benefits Administration",
      description: "In addition to payroll services, we assist businesses with employee benefits, including health insurance, retirement plans, and other perks. Dallas Payroll software streamlines benefits enrollment and management process, reducing administrative burden for employers.",
      icon: "https://dallaspayroll.com/wp-content/uploads/2024/12/Icon-04.png"
    },
    {
      id: 4,
      title: "Time & Attendance Management",
      description: "Our payroll software solution includes integrated time and attendance tracking, which allows businesses to easily manage employee hours, overtime, and paid time off (PTO). This ensures accurate payroll processing and reduces risk of errors related to manual timekeeping.",
      icon: "https://dallaspayroll.com/wp-content/uploads/2024/12/Icon-05-1.png"
    },
    {
      id: 5,
      title: "Custom Reporting and Analytics",
      description: "Dallas Payroll Software provides businesses with detailed reports, such as labor costs, payroll summaries, and tax filings. These insights help businesses make informed decisions and optimize their payroll expenses.",
      icon: "https://dallaspayroll.com/wp-content/uploads/2024/12/Icon-06-1.png"
    },
    {
      id: 6,
      title: "HR Solutions",
      description: "In addition to payroll, we offer HR support services such as employee onboarding, compliance with labor laws, and performance tracking. Our goal is to provide a one-stop solution for managing both payroll and HR functions efficiently.",
      icon: "https://dallaspayroll.com/wp-content/uploads/2024/12/Icon-02.png"
    }
  ];

  const howItWorks = [
    {
      id: 1,
      title: "We manage your payroll",
      description: "Let Dallas Payroll Software handle your payroll processing with precision and speed, so you can focus on growing your business.",
      image: "https://dallaspayroll.com/wp-content/uploads/2024/12/Fortaxjpg-03.jpg"
    },
    {
      id: 2,
      title: "Get expert assistance",
      description: "Collaborate with our payroll specialists to streamline your payroll and HR tasks without missing a beat.",
      image: "https://dallaspayroll.com/wp-content/uploads/2024/12/Fortaxjpg-04.jpg"
    },
    {
      id: 3,
      title: "Ensure compliance and accuracy",
      description: "Use our intuitive payroll software platform to manage payroll, tax filing, and employee benefits anytime, anywhere.",
      image: "https://dallaspayroll.com/wp-content/uploads/2024/12/Fortaxjpg-02.jpg"
    }
  ];

  // Pricing plans based on the screenshot
  const pricingPlans = [
    {
      id: 1,
      name: "Starter",
      price: "$29",
      period: "per month",
      features: {
        "Employee portal": true,
        "Cloud payroll platform": true,
        "Direct Deposit*": true,
        "Payroll tax filing": true,
        "W-2 & 1099 forms": true,
        "Time tracking": false,
        "HR management": false,
        "Custom reporting": false,
        "Dedicated support": false
      },
      popular: false
    },
    {
      id: 2,
      name: "Advance",
      price: "$49",
      period: "per month",
      features: {
        "Employee portal": true,
        "Cloud payroll platform": true,
        "Direct Deposit*": true,
        "Payroll tax filing": true,
        "W-2 & 1099 forms": true,
        "Time tracking": true,
        "HR management": false,
        "Custom reporting": false,
        "Dedicated support": false
      },
      popular: false
    },
    {
      id: 3,
      name: "Growth",
      price: "$79",
      period: "per month",
      features: {
        "Employee portal": true,
        "Cloud payroll platform": true,
        "Direct Deposit*": true,
        "Payroll tax filing": true,
        "W-2 & 1099 forms": true,
        "Time tracking": true,
        "HR management": true,
        "Custom reporting": true,
        "Dedicated support": false
      },
      popular: true
    },
    {
      id: 4,
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      features: {
        "Employee portal": true,
        "Cloud payroll platform": true,
        "Direct Deposit*": true,
        "Payroll tax filing": true,
        "W-2 & 1099 forms": true,
        "Time tracking": true,
        "HR management": true,
        "Custom reporting": true,
        "Dedicated support": true
      },
      popular: false
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const leftVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.7
      }
    }
  };

  const rightVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.7
      }
    }
  };

  return (
    <div className="payroll-landing">
      {/* Header */}
      <header className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
        <div className="container">
          <a className="navbar-brand" href="#home">
            <div className="d-flex align-items-center">
              <div className="logo-accent me-2"></div>
              <span className="fw-bold">PAYROLL</span>
            </div>
          </a>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a 
                  className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
                  href="#home"
                  onClick={(e) => handleNavClick(e, 'home')}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
                  href="#about"
                  onClick={(e) => handleNavClick(e, 'about')}
                >
                  About
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={`nav-link ${activeTab === 'pricing' ? 'active' : ''}`}
                  href="#pricing"
                  onClick={(e) => handleNavClick(e, 'pricing')}
                >
                  Pricing
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={`nav-link ${activeTab === 'contact' ? 'active' : ''}`}
                  href="#contact"
                  onClick={(e) => handleNavClick(e, 'contact')}
                >
                  Contact
                </a>
              </li>
              
              <li className="nav-item ms-2">
                <button 
                  className="btn btn-primary"
                  onClick={()=>navigate('/login')}
                >
                  Login
                </button>
              </li>
                 <li className="nav-item ms-2">
                <button 
                  className="btn btn-primary"
                  onClick={()=>navigate('/login')}
                >
                  sign up
                </button>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* Hero Section */}
   <motion.section 
        id="home" 
        className="hero-section position-relative d-flex align-items-center"
        style={{
          minHeight: '100vh',
          marginTop: '15px',
          backgroundColor: '#f8f9fa'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background image for desktop only */}
        <div 
          className="position-absolute w-100 h-100 d-none d-lg-block" 
          style={{
            backgroundImage: 'url("https://dallaspayroll.com/wp-content/uploads/2025/01/11.webp")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 0
          }}
        ></div>
        
        {/* Person image for mobile only with much lighter overlay */}
        <div className="d-lg-none position-absolute w-100 h-100" style={{zIndex: 0}}>
          <img 
            src="https://dallaspayroll.com/wp-content/uploads/2025/01/11.webp" 
            alt="Payroll service" 
            className="w-100 h-100"
            style={{
              objectFit: 'cover',
              objectPosition: '70% center',
              filter: 'brightness(0.5)'
            }}
          />
          {/* Very light overlay for better text readability */}
          <div className="position-absolute w-100 h-100" style={{
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            zIndex: 1
          }}></div>
        </div>
        
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center">
            <motion.div 
              className="col-lg-6"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="hero-content bg-white bg-opacity-50 p-4 p-md-0 rounded-3 d-lg-none">
                <motion.h1 
                  className="display-4 fw-bold mb-4 text-black"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  style={{fontSize: 'clamp(1.5rem, 5vw, 2.5rem)'}}
                >
                  Simplify payroll with our all-in-one platform
                </motion.h1>
                <motion.p 
                  className="lead mb-4 text-black"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  style={{fontSize: 'clamp(1rem, 2.5vw, 1.25rem)'}}
                >
                  Founded as a service company, our policies and company goals are to continue to offer finest service, processing capabilities and software to today's ever changing information technology market.
                </motion.p>
                <motion.div 
                  className="d-flex gap-3 flex-wrap"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <motion.button 
                    className="btn btn-primary btn-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{fontSize: 'clamp(0.875rem, 2vw, 1.125rem)'}}
                  >
                    GET STARTED
                  </motion.button>
                  <motion.button 
                    className="btn btn-outline-primary text-primary bg-white btn-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{fontSize: 'clamp(0.875rem, 2vw, 1.125rem)'}}
                  >
                    HOW IT WORKS
                  </motion.button>
                </motion.div>
                <motion.div 
                  className="mt-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <p className="mb-1 text-black">Our clients rate us as excellent.</p>
                  <p className="text-black">We scored 9.1/10, based on 200 reviews.</p>
                  <div className="rating-stars">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="bi bi-star-fill text-warning"></i>
                    ))}
                  </div>
                </motion.div>
              </div>
              
              {/* Desktop content without background */}
              <div className="hero-content d-none d-lg-block">
                <motion.h1 
                  className="display-4 fw-bold mb-4 text-black"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  Simplify payroll with our all-in-one platform
                </motion.h1>
                <motion.p 
                  className="lead mb-4 text-black"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Founded as a service company, our policies and company goals are to continue to offer finest service, processing capabilities and software to today's ever changing information technology market.
                </motion.p>
                <motion.div 
                  className="d-flex gap-3 flex-wrap"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <motion.button 
                    className="btn btn-primary btn-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    GET STARTED
                  </motion.button>
                  <motion.button 
                    className="btn btn-outline-primary text-primary bg-white btn-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    HOW IT WORKS
                  </motion.button>
                </motion.div>
                <motion.div 
                  className="mt-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <p className="mb-1 text-black">Our clients rate us as excellent.</p>
                  <p className="text-black">We scored 9.1/10, based on 200 reviews.</p>
                  <div className="rating-stars">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="bi bi-star-fill text-warning"></i>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
      {/* Services Section */}
      <motion.section 
        id="services" 
        className="py-5 bg-light mt-5"
      >
        <div className="container">
          <motion.div 
            className="text-center mb-5 mt-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="display-5 fw-bold">Our Payroll Software Services</h2>
            <h3 className="fs-2">Offering reliable <span className="text-primary text-decoration-underline">payroll and tax</span> services.</h3>
          </motion.div>
          <motion.div 
            className="row g-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map(service => (
              <motion.div 
                key={service.id} 
                className="col-md-6 col-lg-4"
                variants={itemVariants}
              >
                <motion.div 
                  className="card h-100 shadow-sm service-card"
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <img src={service.icon} alt={service.title} className="service-icon me-3" />
                      <h4 className="card-title mb-0">{service.title}</h4>
                    </div>
                    <p className="card-text">{service.description}</p>
                    <motion.button 
                      className="btn btn-primary mt-3"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      GET STARTED
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Partners Section */}
      <motion.section 
        className="py-5"
      >
        <div className="container">
          <motion.div 
            className="text-center mt-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="fs-3">Collaborated with over 800+ trusted worldwide partners</h4>
          </motion.div>
          <motion.div 
            className="row align-items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {partners.map(partner => (
              <motion.div 
                key={partner.id} 
                className="col-6 col-md-4 col-lg-2 mb-5"
                variants={itemVariants}
              >
                <div className="partner-logo text-center">
                  <motion.img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="img-fluid"
                    whileHover={{ 
                      scale: 1.1,
                      filter: "grayscale(0%)",
                      opacity: 1
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        id="about" 
        className="py-5 bg-light"
      >
        <div className="container">
          <div className="row align-items-center">
            <motion.div 
              className="col-lg-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={leftVariants}
            >
              <h2 className="display-5 fw-bold mb-4">About us</h2>
              <h3 className="fs-2 mb-4">Bring Your Payroll <span className="text-primary text-decoration-underline">to life</span></h3>
              <p className="lead">
                Dallas Payroll software is a comprehensive payroll and HR solutions provider catering to small and medium-sized businesses (SMBs) in Dallas-Fort Worth metroplex. Our company specializes in offering efficient, accurate, and scalable payroll software services that help even small businesses streamline their payroll processing, ensure tax compliance, and optimize their workforce management. With a strong focus on customer satisfaction and personalized service, Dallas Payroll Software is committed to simplifying payroll tasks for employers, enabling them to focus on growing their businesses.
              </p>
            </motion.div>
            <motion.div 
              className="col-lg-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={rightVariants}
            >
              <motion.img 
                src="https://dallaspayroll.com/wp-content/uploads/2024/12/Dallas-Info.png" 
                alt="Payroll Software in Dallas, TX" 
                className="img-fluid rounded shadow"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section 
        id="pricing" 
        className="py-5"
      >
        <div className="container">
          <motion.div 
            className="text-center mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="display-5 fw-bold">Choose the option that best fits your needs</h2>
            <p className="lead">Flexible pricing plans for businesses of all sizes</p>
          </motion.div>
          <motion.div 
            className="row g-4 align-items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {pricingPlans.map(plan => (
              <motion.div 
                key={plan.id} 
                className="col-md-6 col-lg-3"
                variants={itemVariants}
              >
                <motion.div 
                  className={`card h-100 shadow-sm pricing-card ${plan.popular ? 'border-primary' : ''}`}
                  whileHover={{ 
                    y: -15,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
                  }}
                  transition={{ 
                    duration: 0.6,  // Slower transition for smooth effect
                    ease: "easeInOut"  // Smooth easing function
                  }}
                >
                  {plan.popular && (
                    <div className="card-header bg-primary text-white text-center py-2">
                      <span className="badge bg-white text-primary">MOST POPULAR</span>
                    </div>
                  )}
                  <div className="card-body d-flex flex-column">
                    <h3 className="card-title text-center mb-4">{plan.name}</h3>
                    <div className="text-center mb-4">
                      <h2 className="display-4 fw-bold text-primary">{plan.price}</h2>
                      <p className="text-muted">{plan.period}</p>
                    </div>
                    <ul className="list-unstyled mb-4 flex-grow-1">
                      {Object.entries(plan.features).map(([feature, included]) => (
                        <li key={feature} className="mb-2 d-flex align-items-center">
                          {included ? (
                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                          ) : (
                            <i className="bi bi-x-circle text-muted me-2"></i>
                          )}
                          <span className={included ? "" : "text-muted"}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <motion.button 
                      className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline-primary'} mt-auto`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      {plan.name === 'Enterprise' ? 'CONTACT US' : 'GET STARTED'}
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-5">
            <p className="text-muted">*Direct deposit may require additional setup time</p>
          </div>
        </div>
      </motion.section>

      {/* Statistics Section */}
      <motion.section 
        className="py-5 bg-light"
      >
        <div className="container">
          <motion.div 
            className="row text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="col-md-3 mb-4" variants={itemVariants}>
              <div className="stat-item">
                <h2 className="display-4 fw-bold text-primary">{counters.years}+</h2>
                <h4>Years of Experience</h4>
              </div>
            </motion.div>
            <motion.div className="col-md-3 mb-4" variants={itemVariants}>
              <div className="stat-item">
                <h2 className="display-4 fw-bold text-primary">{counters.cases}K</h2>
                <h4>Successful Cases</h4>
              </div>
            </motion.div>
            <motion.div className="col-md-3 mb-4" variants={itemVariants}>
              <div className="stat-item">
                <h2 className="display-4 fw-bold text-primary">{counters.team}+</h2>
                <h4>Expert Team</h4>
              </div>
            </motion.div>
            <motion.div className="col-md-3 mb-4" variants={itemVariants}>
              <div className="stat-item">
                <h2 className="display-4 fw-bold text-primary">{counters.clients}K</h2>
                <h4>Satisfied Clients</h4>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section 
        id="how" 
        className="py-5"
      >
        <div className="container">
          <motion.div 
            className="text-center mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="display-5 fw-bold">How it work</h2>
            <h3 className="fs-4">Three ways to simplify payroll, all supported by our payroll software in Dallas Expertise</h3>
          </motion.div>
          <motion.div 
            className="row g-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {howItWorks.map(step => (
              <motion.div 
                key={step.id} 
                className="col-md-4"
                variants={itemVariants}
              >
                <motion.div 
                  className="card h-100 shadow-sm"
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <img src={step.image} className="card-img-top" alt={step.title} />
                  <div className="card-body">
                    <h4 className="card-title">{step.title}</h4>
                    <p className="card-text">{step.description}</p>
                    <motion.button 
                      className="btn btn-primary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      GET STARTED
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        className="py-5 bg-light"
      >
        <div className="container">
          <motion.div 
            className="text-center mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="display-5 fw-bold">Testimonials</h2>
            <h3 className="fs-2">why our customers <span className="text-primary text-decoration-underline">love Dallas Payroll Software</span></h3>
            <p className="fs-4">Rated <span className="text-primary">4.6 out of 5</span> stars by our customers</p>
            <div className="d-flex justify-content-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="bi bi-star-fill text-warning"></i>
              ))}
            </div>
            <p className="text-muted">(130+ reviews of Dallas Payroll)</p>
          </motion.div>
          <motion.div 
            id="testimonialsCarousel" 
            className="carousel slide" 
            data-bs-ride="carousel"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="carousel-inner">
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <div className="card mx-auto" style={{maxWidth: '800px'}}>
                    <div className="card-body p-5">
                      <div className="d-flex justify-content-center mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <i key={i} className="bi bi-star-fill text-warning"></i>
                        ))}
                      </div>
                      <p className="card-text text-center fs-5">"{testimonial.text}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#testimonialsCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#testimonialsCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact" 
        className="py-5 bg-primary text-white"
      >
        <div className="container">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="display-5 fw-bold mb-4">
              Not sure what you need? We're here to help — <span className="text-decoration-underline">chat with us today!</span>
            </h2>
            <motion.button 
              className="btn btn-light btn-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              chat with us
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className="bg-dark text-white py-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="d-flex align-items-center mb-3">
                <div className="logo-accent me-2"></div>
                <span className="fw-bold fs-4">PAYROLL</span>
              </div>
              <p>A full service payroll processing and payroll tax preparation company, providing quality service and accurate payroll processing since 1971.</p>
              <div className="d-flex gap-3">
                <motion.a 
                  href="#" 
                  className="text-white"
                  whileHover={{ scale: 1.2, color: "#C62828" }}
                >
                  <i className="bi bi-facebook fs-5"></i>
                </motion.a>
                <motion.a 
                  href="#" 
                  className="text-white"
                  whileHover={{ scale: 1.2, color: "#C62828" }}
                >
                  <i className="bi bi-twitter fs-5"></i>
                </motion.a>
                <motion.a 
                  href="#" 
                  className="text-white"
                  whileHover={{ scale: 1.2, color: "#C62828" }}
                >
                  <i className="bi bi-linkedin fs-5"></i>
                </motion.a>
                <motion.a 
                  href="#" 
                  className="text-white"
                  whileHover={{ scale: 1.2, color: "#C62828" }}
                >
                  <i className="bi bi-instagram fs-5"></i>
                </motion.a>
              </div>
            </div>
            <div className="col-md-2 mb-4">
              <h5 className="mb-3">Services</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#services" className="text-white text-decoration-none">Payroll</a></li>
                <li className="mb-2"><a href="#services" className="text-white text-decoration-none">Employee Onboarding</a></li>
                <li className="mb-2"><a href="#services" className="text-white text-decoration-none">Employee Portal</a></li>
                <li className="mb-2"><a href="#services" className="text-white text-decoration-none">Time & Attendance</a></li>
              </ul>
            </div>
            <div className="col-md-2 mb-4">
              <h5 className="mb-3">Quick Link</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#home" className="text-white text-decoration-none">Home</a></li>
                <li className="mb-2"><a href="#about" className="text-white text-decoration-none">About</a></li>
                <li className="mb-2"><a href="#pricing" className="text-white text-decoration-none">Pricing</a></li>
                <li className="mb-2"><a href="#contact" className="text-white text-decoration-none">Contact us</a></li>
              </ul>
            </div>
            <div className="col-md-4 mb-4">
              <h5 className="mb-3">Contact</h5>
              <div className="mb-3">
                <h6>Richardson Office</h6>
                <p>1221 Abrams Road Suite 331, Richardson, TX 75081</p>
              </div>
              <div className="mb-3">
                <h6>Plano Office</h6>
                <p>1400 Preston Road, Suite 400, Plano, TX 75093</p>
              </div>
              <div className="mb-3">
                <h6>Phone</h6>
                <p><a href="tel:214-553-0700" className="text-white">214-553-0700</a></p>
              </div>
            </div>
          </div>
          <hr className="my-4 bg-white" />
          <div className="text-center">
            <p>©2024 Dallas Payroll. All Rights Reserved.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default LandingPage;