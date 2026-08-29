import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, onEditProfile }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <header className="dashboard-header">
      <div className="nav-brand-container">
        <Link to={user ? "/dashboard" : "/login"} style={{ textDecoration: 'none' }}>
          <div className="logo-brand">
            <div className="logo-icon">✈️</div>
            <span className="dashboard-title gradient-text">TripVault</span>
          </div>
        </Link>

        {/* Mobile Hamburger Toggle Button */}
        <button 
          className="mobile-hamburger-btn" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Desktop & Mobile Responsive Nav Links */}
      <div className={`user-badge-group ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        {user ? (
          <>
            <Link 
              to={`/profile/${user.username}`} 
              className="btn-secondary nav-link-btn" 
              onClick={() => setMobileMenuOpen(false)}
            >
              🌐 My Profile
            </Link>
            
            {onEditProfile && (
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onEditProfile();
                }} 
                className="btn-secondary nav-link-btn"
              >
                ✏️ Edit Profile
              </button>
            )}

            <div className="user-avatar-chip">
              <div className="avatar-circle">{getInitial(user.name)}</div>
              <span className="user-name-text">{user.name}</span>
            </div>

            <button onClick={handleLogout} className="btn-danger nav-logout-btn">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn-primary nav-link-btn" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>
            Login / Join
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
