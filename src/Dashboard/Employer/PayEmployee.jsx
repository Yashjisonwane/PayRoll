  import React, { useState, useEffect } from 'react';
  import { Button, Modal, Toast, ToastContainer, Form, Alert } from 'react-bootstrap';
  import 'bootstrap/dist/css/bootstrap.min.css';

  const PayEmployee = () => {
    const [selectedBeneficiary, setSelectedBeneficiary] = useState('');
    const [beneficiaryType, setBeneficiaryType] = useState('');
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [amountError, setAmountError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    // Sample data for employees and vendors
    const employees = [
      { id: 1, name: 'Rahul Sharma', type: 'employee' },
      { id: 2, name: 'Priya Singh', type: 'employee' },
      { id: 3, name: 'Amit Verma', type: 'employee' }
    ];

    const vendors = [
      { id: 1, name: 'DevTech Solutions', type: 'vendor' },
      { id: 2, name: 'Kumar Transport', type: 'vendor' },
      { id: 3, name: 'ABC Enterprises', type: 'vendor' }
    ];

    // Combine employees and vendors into a single list
    const beneficiaries = [...employees, ...vendors];

    // Validate form
    useEffect(() => {
      if (selectedBeneficiary && amount && parseFloat(amount) > 0 && !amountError) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    }, [selectedBeneficiary, amount, amountError]);

    // Handle beneficiary selection
    const handleBeneficiaryChange = (e) => {
      const selectedId = e.target.value;
      const beneficiary = beneficiaries.find(b => b.id === parseInt(selectedId));
      if (beneficiary) {
        setSelectedBeneficiary(beneficiary.name);
        setBeneficiaryType(beneficiary.type);
      } else {
        setSelectedBeneficiary('');
        setBeneficiaryType('');
      }
    };

    // Handle amount change with validation
    const handleAmountChange = (e) => {
      const value = e.target.value;
      setAmount(value);
      
      if (value === '') {
        setAmountError('Amount cannot be empty');
      } else if (isNaN(value) || parseFloat(value) <= 0) {
        setAmountError('Amount must be a positive number');
      } else {
        setAmountError('');
      }
    };

    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      if (isFormValid) {
        setShowModal(true);
      }
    };

    // Handle confirmation in modal
    const handleConfirmPayment = () => {
      setShowModal(false);
      setShowToast(true);
      
      // Reset form after successful payment
      setTimeout(() => {
        setSelectedBeneficiary('');
        setBeneficiaryType('');
        setAmount('');
        setNote('');
        setShowToast(false);
      }, 5000);
    };

    // Custom styles based on provided color codes
    const styles = {
      primaryButton: {
        backgroundColor: '#C62828',
        borderColor: '#C62828',
        color: '#FFFFFF'
      },
      primaryButtonHover: {
        backgroundColor: '#B71C1C',
        borderColor: '#B71C1C'
      },
      navbar: {
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E2E2'
      },
      inputBorder: {
        borderColor: '#E2E2E2'
      },
      darkGrayText: {
        color: '#4A4A4A'
      },
      blackText: {
        color: '#000000'
      }
    };

    return (
      <div className="container py-4">
        {/* Page Title and Subtitle */}
        <div className="mb-4">
          <h1 className="mb-2" style={styles.blackText}>Pay Beneficiary</h1>
          <p className="text-muted" style={styles.darkGrayText}>
            Select a beneficiary and enter amount to process payment.
          </p>
        </div>

        {/* Main Form */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <Form onSubmit={handleSubmit}>
              {/* Beneficiary Dropdown */}
              <Form.Group className="mb-3">
                <Form.Label style={styles.blackText}>Select Beneficiary</Form.Label>
                <Form.Select
                  value={beneficiaries.find(b => b.name === selectedBeneficiary)?.id || ''}
                  onChange={handleBeneficiaryChange}
                  style={styles.inputBorder}
                >
                  <option value="">-- Select --</option>
                  <optgroup label="Employees">
                    {employees.map(item => (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Vendors">
                    {vendors.map(item => (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                  </optgroup>
                </Form.Select>
              </Form.Group>

              {/* Amount Input */}
              <Form.Group className="mb-3">
                <Form.Label style={styles.blackText}>Enter Amount</Form.Label>
                <Form.Control
                  type="text"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="Enter amount"
                  style={styles.inputBorder}
                  isInvalid={!!amountError}
                />
                <Form.Control.Feedback type="invalid">
                  {amountError}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Payment Note */}
              <Form.Group className="mb-4">
                <Form.Label style={styles.blackText}>Payment Note (Optional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add a note for this payment"
                  style={styles.inputBorder}
                />
              </Form.Group>

              {/* Summary Box */}
              {selectedBeneficiary && amount && (
                <div className="mb-4 p-3 border rounded" style={{ backgroundColor: '#f8f9fa' }}>
                  <h5 className="mb-2" style={styles.blackText}>Payment Summary</h5>
                  <div className="row">
                    <div className="col-sm-6">
                      <p className="mb-1" style={styles.darkGrayText}>
                        <strong>Beneficiary Type:</strong> {beneficiaryType === 'employee' ? 'Employee' : 'Vendor'}
                      </p>
                      <p className="mb-1" style={styles.darkGrayText}>
                        <strong>Name:</strong> {selectedBeneficiary}
                      </p>
                    </div>
                    <div className="col-sm-6">
                      <p className="mb-1" style={styles.darkGrayText}>
                        <strong>Amount:</strong> ₹{amount}
                      </p>
                      {note && (
                        <p className="mb-1" style={styles.darkGrayText}>
                          <strong>Note:</strong> {note}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-100 py-2"
                style={styles.primaryButton}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#B71C1C';
                  e.target.style.borderColor = '#B71C1C';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#C62828';
                  e.target.style.borderColor = '#C62828';
                }}
                disabled={!isFormValid}
              >
                Submit Payment
              </Button>
            </Form>
          </div>
        </div>

        {/* Confirmation Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton style={{ borderBottom: '1px solid #E2E2E2' }}>
            <Modal.Title style={styles.blackText}>Confirm Payment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <p style={styles.darkGrayText}><strong>Beneficiary:</strong> {selectedBeneficiary}</p>
              <p style={styles.darkGrayText}><strong>Type:</strong> {beneficiaryType === 'employee' ? 'Employee' : 'Vendor'}</p>
              <p style={styles.darkGrayText}><strong>Amount:</strong> ₹{amount}</p>
              {note && <p style={styles.darkGrayText}><strong>Note:</strong> {note}</p>}
            </div>
            <Alert variant="warning">
              Are you sure you want to process this payment? This action cannot be undone.
            </Alert>
          </Modal.Body>
          <Modal.Footer style={{ borderTop: '1px solid #E2E2E2' }}>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button
              style={styles.primaryButton}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#B71C1C';
                e.target.style.borderColor = '#B71C1C';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#C62828';
                e.target.style.borderColor = '#C62828';
              }}
              onClick={handleConfirmPayment}
            >
              Confirm Payment
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Success Toast */}
        <ToastContainer position="top-end" className="p-3">
          <Toast show={showToast} onClose={() => setShowToast(false)} bg="success">
            <Toast.Header>
              <strong className="me-auto">Payment Successful</strong>
            </Toast.Header>
            <Toast.Body className="text-white">
              Payment of ₹{amount} to {selectedBeneficiary} completed successfully.
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    );
  };

  export default PayEmployee;