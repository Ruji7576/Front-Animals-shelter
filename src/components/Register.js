import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import '../styles/register.css'; 

const Register = () => {
  const [form, setForm] = useState({ username: '', password: '', email: '' });
  const [feedback, setFeedback] = useState({ error: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', form);
      setFeedback({ message: 'Registration successful!', error: '' });
    } catch (error) {
      setFeedback({ message: '', error: 'Registration failed' });
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          {['username', 'password', 'email'].map((field) => (
            <div key={field}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
              <input
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                value={form[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <button type="submit">Register</button>
          {feedback.error && <p className="error">{feedback.error}</p>}
          {feedback.message && <p className="message">{feedback.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
