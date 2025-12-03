// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// --- Color Palette ---
const colors = {
  primaryRed: '#C62828',
  darkRed: '#B71C1C',
  lightBeige: '#F7EFE9',
  white: '#FFFFFF',
  black: '#000000',
  darkGray: '#4A4A4A',
  lightGray: '#E2E2E2',
};

// --- Reusable Button Styles ---
const buttonStyles = {
  backgroundColor: colors.primaryRed,
  color: colors.white,
  border: 'none',
  transition: 'background-color 0.2s ease-in-out',
  padding: '8px 16px',
  borderRadius: '6px',
  fontWeight: '500',
  fontSize: '14px',
  cursor: 'pointer',
  fontFamily: 'inherit',
};

const buttonHoverStyles = {
  backgroundColor: colors.darkRed,
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const roleRedirectMap = {
    ADMIN: "/Admin/dashboard",
    EMPLOYER: "/Employer/dashboard",
    EMPLOYEE: "/Employee/dashboard",
    JOBSEEKER: "/job-portal/dashboard",
    VENDOR: "/Vendor/dashboard",
  };

  const dummyUsers = {
    ADMIN: { id: 100, email: "admin@mvp.com", role: "ADMIN" },
    EMPLOYER: { id: 101, email: "employer@mvp.com", role: "EMPLOYER" },
    EMPLOYEE: { id: 102, email: "employee@mvp.com", role: "EMPLOYEE" },
    JOBSEEKER: { id: 103, email: "jobseeker@mvp.com", role: "JOBSEEKER" },
    VENDOR: { id: 104, email: "vendor@mvp.com", role: "VENDOR" },
  };

  const handleLogin = async (loginEmail, loginPassword) => {
    setLoading(true);
    setError("");

    const matchedUser = Object.values(dummyUsers).find(
      (user) => user.email === loginEmail && loginPassword === "123456"
    );

    if (matchedUser) {
      const fakeToken = `dev_fake_token_${matchedUser.role.toLowerCase()}_${Date.now()}`;

      localStorage.setItem("authToken", fakeToken);
      localStorage.setItem("userRole", matchedUser.role);
      localStorage.setItem("userEmail", matchedUser.email);
      localStorage.setItem("userId", matchedUser.id);

      navigate(roleRedirectMap[matchedUser.role] || "/");
    } else {
      setError("Invalid credentials. Please use the quick login buttons or check your email/password.");
    }

    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(email, password);
  };

  const directLogin = (role) => {
    const user = dummyUsers[role];
    if (user) {
      setEmail(user.email);
      setPassword("123456");
      handleLogin(user.email, "123456");
    }
  };

  return (
    // Main container with new light beige background
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center px-3" style={{ backgroundColor: colors.lightBeige }}>
      <div className="card shadow w-100" style={{ maxWidth: "950px", borderRadius: "1.5rem", backgroundColor: colors.white }}>
        <div className="row g-0">
          <div className="col-md-6 d-none d-md-block">
            <img
              src="https://z-cdn-media.chatglm.cn/files/003affb6-799b-4e33-bc0c-58412fae77f3.jpg?auth_key=1864669769-098225dd3ea745eb86a8b0921c6a4f1a-0-7778e4ae70ac5b6af8c01477bb275365"
              alt="business dashboard"
              className="img-fluid rounded-start"
              style={{ 
                height: "100%", 
                objectFit: "cover", 
                objectPosition: 'center bottom'
              }}
            />
          </div>

          <div className="col-md-6 d-flex align-items-center p-5">
            <div className="w-100">
              {/* Heading with new black color */}
              <h2 className="fw-bold mb-3 text-center" style={{ color: colors.black, fontFamily: 'inherit' }}>Welcome Back!</h2>
              {/* Sub-heading with new dark gray color */}
              <p className="text-center mb-4" style={{ color: colors.darkGray, fontFamily: 'inherit' }}>Please login to your account</p>

              {/* Error message */}
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {/* Quick login buttons */}
              <div className="mb-4">
                {/* Label with new dark gray color */}
                <p className="mb-2 text-center" style={{ color: colors.darkGray, fontFamily: 'inherit' }}><strong>Quick Login (Dev Mode):</strong></p>
                <div className="d-flex flex-wrap gap-2 justify-content-center">
                  {Object.keys(roleRedirectMap).map((role) => (
                    <button
                      key={role}
                      type="button"
                      className="btn"
                      style={{ 
                        ...buttonStyles, 
                        ...(loading ? { backgroundColor: '#cccccc', cursor: 'not-allowed' } : {})
                      }}
                      onClick={() => directLogin(role)}
                      disabled={loading}
                      onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = colors.darkRed)}
                      onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = colors.primaryRed)}
                    >
                      {role === 'JOBSEEKER' ? 'JOB PORTAL' : role.replace(/([A-Z])/g, " $1").trim()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-3 text-center">
                <span style={{ color: colors.darkGray, fontSize: '14px' }}>Or use your credentials:</span>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label" style={{ fontFamily: 'inherit' }}>Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ fontFamily: 'inherit' }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{ fontFamily: 'inherit' }}>Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{ fontFamily: 'inherit' }}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <i className="bi bi-eye-slash-fill"></i>
                      ) : (
                        <i className="bi bi-eye-fill"></i>
                      )}
                    </button>
                  </div>
                  <div className="form-text" style={{ color: colors.darkGray }}>
                    Default password for all accounts: 123456
                  </div>
                </div>

                {/* Main login button with new primary red color */}
                <button
                  type="submit"
                  className="btn w-100 py-2"
                  style={{ 
                    ...buttonStyles, 
                    ...(loading ? { backgroundColor: '#cccccc', cursor: 'not-allowed' } : {})
                  }}
                  disabled={loading}
                  onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = colors.darkRed)}
                  onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = colors.primaryRed)}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;