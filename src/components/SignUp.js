import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const containerStyle = {
  maxWidth: '400px',
  margin: '0 auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: '#4CAF50',
  color: 'white',
  cursor: 'pointer',
};

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phonenumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSigninSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/users', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phonenumber: formData.phonenumber,
      });

      alert('Signup Successful!');
      navigate('/login'); // Redirect to login
    } catch (error) {
      console.error('Error registering user:', error);
      alert(`Error registering user: ${error.message}`);
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Signin here!</h2>
      <form onSubmit={handleSigninSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            style={inputStyle}
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            style={inputStyle}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            style={inputStyle}
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            style={inputStyle}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phonenumber">Phone Number:</label>
          <input
            style={inputStyle}
            type="text"
            id="phonenumber"
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Signin
        </button>
      </form>
    </div>
  );
};

export default Signin;
