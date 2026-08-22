import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import TripCard from '../components/TripCard';

const PublicProfile = () => {
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPublicProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${username}/profile`);
        setProfileData(res.data);
      } catch (err) {
        console.error('Failed to load public profile:', err);
        setError(err.response?.data?.msg || 'User profile not found or unavailable');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchPublicProfile();
    }
  }, [username]);

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  if (loading) {
    return (
      <div className="auth-page">
        <div className="glass-container auth-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <div className="empty-state-icon">🌍</div>
          <h2 className="gradient-text">Loading Traveller Profile...</h2>
        </div>
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="auth-page">
        <div className="glass-container auth-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
          <h2 className="gradient-text" style={{ marginBottom: '1rem' }}>Profile Not Found</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{error}</p>
          <Link to="/" className="btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>
            ✈️ Go to TripVault Home
          </Link>
        </div>
      </div>
    );
  }

  const { user, trips } = profileData;

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <header className="dashboard-header">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className="logo-brand">
            <div className="logo-icon">✈️</div>
            <span className="dashboard-title gradient-text">TripVault</span>
          </div>
        </Link>

        <div>
          <Link to="/login" className="btn-primary" style={{ textDecoration: 'none', padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>
            Login / Join
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* User Profile Header Card */}
        <div className="glass-container" style={{ padding: '2.5rem', marginBottom: '2.5rem', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, height: '8px',
            background: 'linear-gradient(90deg, #38bdf8, #818cf8, #c084fc)'
          }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem', flexWrap: 'wrap' }}>
            <div style={{
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: 'white',
              boxShadow: '0 10px 25px -5px rgba(56, 189, 248, 0.4)',
              border: '3px solid rgba(255, 255, 255, 0.2)'
            }}>
              {getInitial(user.name)}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <h1 className="gradient-text" style={{ fontSize: '2rem', margin: 0, fontWeight: 700 }}>
                  {user.name}
                </h1>
                <span style={{
                  background: 'rgba(56, 189, 248, 0.15)',
                  color: '#38bdf8',
                  padding: '4px 14px',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  border: '1px solid rgba(56, 189, 248, 0.3)'
                }}>
                  @{user.username}
                </span>
              </div>

              {user.bio ? (
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem', fontSize: '1.05rem', lineHeight: '1.6', maxWidth: '700px' }}>
                  "{user.bio}"
                </p>
              ) : (
                <p style={{ color: '#64748b', marginTop: '0.5rem', fontStyle: 'italic', fontSize: '0.95rem' }}>
                  Passionate traveler documenting journeys on TripVault.
                </p>
              )}

              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
                <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                  🗺️ <strong>{trips.length}</strong> {trips.length === 1 ? 'Trip Shared' : 'Trips Shared'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* User Trips Section */}
        <div>
          <h2 style={{ fontSize: '1.5rem', color: '#f8fafc', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>📍</span> {user.name}'s Travel Journal
          </h2>

          {trips.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🌄</div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>No public trips shared yet</h3>
              <p>Check back soon to see new travel memories from @{user.username}.</p>
            </div>
          ) : (
            <div className="trips-grid">
              {trips.map((trip) => (
                <TripCard key={trip._id} trip={trip} isPublic={true} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PublicProfile;
