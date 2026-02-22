import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogoutIcon, ArrowRightIcon } from './icons/CustomIcons';
import './Navbar.css';

const Navbar: React.FC = () => {
  const { currentUser, userProfile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          OnionUSD-P
        </Link>

        {/* Navigation Links */}
        <div className="nav-links">
          <a href="#architecture" className="nav-link">Architecture</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#use-cases" className="nav-link">Use Cases</a>
          <a href="#getting-started" className="nav-link">Get Started</a>
        </div>

        {/* Right Side Actions */}
        <div className="navbar-actions">
          {currentUser ? (
            <>
              <Link to="/dashboard" className="btn btn-secondary">
                Dashboard
              </Link>
              <div className="user-info">
                <span className="user-name">
                  {userProfile?.userType === 'corporation' ? userProfile.companyName : userProfile?.employeeName}
                </span>
                <button onClick={handleSignOut} className="btn btn-outline">
                  <LogoutIcon size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Get started
              <ArrowRightIcon size={16} />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
