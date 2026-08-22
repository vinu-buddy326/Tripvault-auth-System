import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import TripCard from '../components/TripCard';
import TripForm from '../components/TripForm';
import EditProfileModal from '../components/EditProfileModal';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [trips, setTrips] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  
  const navigate = useNavigate();

  const fetchTrips = async () => {
    try {
      const res = await api.get('/trips');
      setTrips(res.data);
    } catch (err) {
      console.error('Failed to fetch trips', err);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const res = await api.get('/auth/me');
        setUser(res.data);
        await fetchTrips();
      } catch (err) {
        console.error(err);
        setError('Failed to fetch user data. Please log in again.');
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleCreateNew = () => {
    setEditingTrip(null);
    setIsFormOpen(true);
  };

  const handleEdit = (trip) => {
    setEditingTrip(trip);
    setIsFormOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingTrip(null);
    fetchTrips();
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingTrip(null);
  };

  const handleProfileUpdated = (updatedUser) => {
    setUser((prev) => ({
      ...prev,
      ...updatedUser
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  if (loading) {
    return (
      <div className="auth-page">
        <div className="glass-container auth-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <div className="empty-state-icon">🌍</div>
          <h2 className="gradient-text">Loading TripVault...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Top Navbar */}
      <header className="dashboard-header">
        <div className="logo-brand">
          <div className="logo-icon">✈️</div>
          <span className="dashboard-title gradient-text">TripVault</span>
        </div>

        <div className="user-badge-group">
          {user && (
            <>
              <Link 
                to={`/profile/${user.username}`} 
                className="btn-secondary" 
                style={{ textDecoration: 'none', padding: '0.45rem 0.9rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                🌐 My Profile
              </Link>
              <button 
                onClick={() => setIsEditProfileOpen(true)} 
                className="btn-secondary" 
                style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                ✏️ Edit Profile
              </button>
              <div className="user-avatar-chip">
                <div className="avatar-circle">{getInitial(user.name)}</div>
                <span className="user-name-text">{user.name}</span>
              </div>
            </>
          )}
          <button onClick={handleLogout} className="btn-danger">
            Logout
          </button>
        </div>
      </header>
      
      {/* Main Content Area */}
      <main>
        <div className="dashboard-hero-bar">
          <div className="hero-welcome">
            <h2>Welcome back, <span className="gradient-text-cyan">{user?.name}</span>! 👋</h2>
            <p>
              Your personal travel memory vault & adventure journal.
              {user?.username && (
                <span style={{ display: 'inline-block', marginLeft: '0.5rem', color: '#94a3b8' }}>
                  (Public Handle: <Link to={`/profile/${user.username}`} style={{ color: '#38bdf8' }}>@{user.username}</Link>)
                </span>
              )}
            </p>
          </div>
          {!isFormOpen && (
            <button onClick={handleCreateNew} className="btn-primary">
              ✨ Add New Trip
            </button>
          )}
        </div>
        
        {error && <div className="error-message">{error}</div>}

        {isFormOpen ? (
          <TripForm 
            trip={editingTrip} 
            onSuccess={handleFormSuccess} 
            onCancel={handleFormCancel} 
          />
        ) : (
          <div className="trips-section">
            {trips.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">🗺️</div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No trips added yet</h3>
                <p>Start documenting your travel memories! Add your first destination to build your personal memory journal.</p>
                <button onClick={handleCreateNew} className="btn-primary">
                  ✈️ Add Your First Trip
                </button>
              </div>
            ) : (
              <div className="trips-grid">
                {trips.map((trip) => (
                  <TripCard 
                    key={trip._id} 
                    trip={trip} 
                    onEdit={handleEdit} 
                    onDeleteSuccess={fetchTrips} 
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Edit Profile Modal */}
      <EditProfileModal 
        user={user} 
        isOpen={isEditProfileOpen} 
        onClose={() => setIsEditProfileOpen(false)} 
        onSuccess={handleProfileUpdated}
      />
    </div>
  );
};

export default Dashboard;
