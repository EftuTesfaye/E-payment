import React, { useState } from 'react';
import axios from 'axios';
import './serviceProviderRegistration.css';
import { UserOutlined } from '@ant-design/icons';

const ServiceProviderRegistrationForm = () => {
  const [formData, setFormData] = useState({
    serviceProviderBIN: '',
    serviceProviderName: '',
    servicesOffered: '',
    BankName: '',
    BankAccountNumber: '',
    phoneNumber: '',
  });

  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.serviceProviderBIN) {
      newErrors.serviceProviderBIN = 'Business Identification Number is required';
    }

    if (!formData.serviceProviderName) {
      newErrors.serviceProviderName = 'ServiceProviderName is required';
    }

    if (!formData.servicesOffered) {
      newErrors.servicesOffered = 'Services Offered is required';
    }

    if (!formData.BankName) {
      newErrors.BankName = 'Bank Name is required';
    }

    if (!formData.BankAccountNumber) {
      newErrors.BankAccountNumber = 'Bank Account Number is required';
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (!/^\+?\d+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone Number is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('serviceProviderBIN', formData.serviceProviderBIN);
        formDataToSend.append('serviceProviderName', formData.serviceProviderName);
        formDataToSend.append('servicesOffered', formData.servicesOffered);
        formDataToSend.append('BankName', formData.BankName);
        formDataToSend.append('BankAccountNumber', formData.BankAccountNumber);
        formDataToSend.append('phoneNumber', formData.phoneNumber);
        formDataToSend.append('serviceProviderAuthorizationLetter', file);

        await axios.post('http://localhost:3000/serviceprovider', formDataToSend);
        console.log('Registered successfully!');
      } catch (error) {
        console.error('Error submitting form:', error);
        // Handle the error, show an error message, etc.
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-box">
        <h1>
          <UserOutlined className="icon" /> Service provider Registration
        </h1>
        <div>
          <label>Business Identification Number:</label>
          <input
            type="text"
            name="serviceProviderBIN"
            className="input-field"
            value={formData.serviceProviderBIN}
            onChange={handleChange}
          />
          {errors.serviceProviderBIN && <span className="error-message">{errors.serviceProviderBIN}</span>}
        </div>
        <div>
          <label>ServiceProviderName:</label>
          <input
            type="text"
            name="serviceProviderName"
            className="input-field"
            value={formData.serviceProviderName}
            onChange={handleChange}
          />
          {errors.serviceProviderName && <span className="error-message">{errors.serviceProviderName}</span>}
        </div>
        <div>
          <label>Services Offered:</label>
          <input
            type="text"
            name="servicesOffered"
            className="input-field"
            value={formData.servicesOffered}
            onChange={handleChange}
          />
          {errors.servicesOffered && <span className="error-message">{errors.servicesOffered}</span>}
        </div>
        <div>
          <label>Bank Name:</label>
          <input
            type="text"
            name="BankName"
            className="input-field"
            value={formData.BankName}
            onChange={handleChange}
          />
          {errors.BankName && <span className="error-message">{errors.BankName}</span>}
        </div>
        <div>
          <label>Bank Account Number:</label>
          <input
            type="text"
            name="BankAccountNumber"
            className="input-field"
            value={formData.BankAccountNumber}
            onChange={handleChange}
          />
          {errors.BankAccountNumber && <span className="error-message">{errors.BankAccountNumber}</span>}
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            className="input-field"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
        </div>
        <div>
          <label>Authorization Letter:</label>
          <input type="file" name="authorizationLetter" onChange={handleFileChange} />
        </div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default ServiceProviderRegistrationForm;