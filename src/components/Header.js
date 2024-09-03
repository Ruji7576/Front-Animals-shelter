import React from 'react';
import '../styles/header.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Header = ({ title }) => {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  return (
    <header className="header">
      <h1 className="header-title" onClick={() => navigate('/')}>{title}</h1>
      <div className="header-actions">
        {user ? (
          <>
            <span className="user-info">Welcome, {user.username}!</span>
            <button className="btn btn-action" onClick={() => navigate('/donations')}>Donations</button>
            <button className="btn btn-action" onClick={() => navigate('/pets')}>Pets</button>
            <button className="btn btn-logout" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <button className="btn btn-action" onClick={() => navigate('/register')}>Register</button>
            <button className="btn btn-action" onClick={() => navigate('/login')}>Login</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
