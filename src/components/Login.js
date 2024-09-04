import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../styles/login.css'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      await getUserProfile();
    } catch (error) {
      setError('Invalid username or password');
      console.error('Error logging in:', error);
    }
  };

  const getUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/profile', { headers: { Authorization: `Bearer ${token}` } });
      const user = response.data;
      login(user);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError('Error fetching user profile');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
