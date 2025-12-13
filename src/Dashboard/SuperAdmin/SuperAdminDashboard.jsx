// src/pages/Admin/DashboardOverview.js

import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { 
  FaBuilding, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaRupeeSign, 
  FaUserPlus,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';

// --- Dummy Data ---
const dashboardMetrics = [
  { 
    title: 'Total Companies', 
    count: 1250, 
    icon: <FaBuilding size={24} color="white" />, 
    bgColor: '#007bff', // Bootstrap Primary
    textColor: '#007bff',
    change: 12.5, // Percentage change from last period
    isPositiveChange: true
  },
  { 
    title: 'Active Plans', 
    count: 980, 
    icon: <FaCheckCircle size={24} color="white" />, 
    bgColor: '#28a745', // Bootstrap Success
    textColor: '#28a745',
    change: 8.2,
    isPositiveChange: true
  },
  { 
    title: 'Expired Plans', 
    count: 270, 
    icon: <FaTimesCircle size={24} color="white" />, 
    bgColor: '#dc3545', // Bootstrap Danger
    textColor: '#dc3545',
    change: -5.4,
    isPositiveChange: false
  },
  { 
    title: 'Monthly Revenue', 
    count: 485000, 
    icon: <FaRupeeSign size={24} color="white" />, 
    bgColor: '#ffc107', // Bootstrap Warning
    textColor: '#ffc107',
    change: 15.8,
    isPositiveChange: true
  },
  { 
    title: 'New Companies (Last 30 days)', 
    count: 47, 
    icon: <FaUserPlus size={24} color="white" />, 
    bgColor: '#17a2b8', // Bootstrap Info
    textColor: '#17a2b8',
    change: 22.1,
    isPositiveChange: true
  },
];

const revenueData = [
  { month: 'Jan', revenue: 380000 },
  { month: 'Feb', revenue: 420000 },
  { month: 'Mar', revenue: 410000 },
  { month: 'Apr', revenue: 450000 },
  { month: 'May', revenue: 460000 },
  { month: 'Jun', revenue: 485000 },
];

// --- Reusable OverviewCard Component ---
const OverviewCard = ({ title, count, icon, bgColor, textColor, change, isPositiveChange }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Body className="p-4">
        <div className="d-flex align-items-center">
          <div 
            className="icon-box rounded-circle p-3 d-flex align-items-center justify-content-center me-3"
            style={{ backgroundColor: bgColor }}
          >
            {icon}
          </div>
          <div className="flex-grow-1">
            <h3 className="mb-1" style={{ color: textColor, fontWeight: '700' }}>
              {title.includes('Revenue') ? formatCurrency(count) : count.toLocaleString()}
            </h3>
            <p className="text-muted mb-0">{title}</p>
          </div>
          {change !== undefined && (
            <div className={`d-flex align-items-center ${isPositiveChange ? 'text-success' : 'text-danger'}`}>
              {isPositiveChange ? <FaArrowUp /> : <FaArrowDown />}
              <span className="ms-1">{Math.abs(change)}%</span>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

// --- RevenueChart Component ---
const RevenueChart = () => {
  return (
    <Card className="shadow-sm border-0">
      <Card.Header className="bg-white border-0 pt-4 pb-0">
        <Card.Title as="h5" className="mb-0">Revenue Trend (Last 6 Months)</Card.Title>
      </Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value)} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#ffc107" 
              strokeWidth={3}
              dot={{ fill: '#ffc107', r: 6 }}
              activeDot={{ r: 8 }}
              name="Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

// --- Main DashboardOverviewPage Component ---
const SuperAdminDashboard = () => {
  return (
    <div className="container-fluid" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div className="container py-5">
        <h1 className="mb-4">Dashboard Overview</h1>
        
        {/* Metrics Cards */}
        <Row xs={1} sm={2} md={2} lg={3} className="g-4 mb-4">
          {dashboardMetrics.map((metric, index) => (
            <Col key={index}>
              <OverviewCard
                title={metric.title}
                count={metric.count}
                icon={metric.icon}
                bgColor={metric.bgColor}
                textColor={metric.textColor}
                change={metric.change}
                isPositiveChange={metric.isPositiveChange}
              />
            </Col>
          ))}
        </Row>

        {/* Revenue Chart */}
        <Row>
          <Col lg={12}>
            <RevenueChart />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;