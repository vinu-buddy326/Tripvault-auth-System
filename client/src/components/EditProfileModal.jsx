import { useState, useEffect } from 'react';
import api from '../api/axios';

const EditProfileModal = ({ user, isOpen, onClose, onSuccess }) => {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setBio(user.bio || '');
    }
  }, [user]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.put('/users/profile', { username, bio });
      onSuccess(res.data.user);
      onClose();
    } catch (err) {
      setError(err.response?.data?.msg || err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div className="glass-container modal-card" style={{
        maxWidth: '500px',
        width: '100%',
        padding: '2rem',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 className="gradient-text" style={{ fontSize: '1.5rem', margin: 0 }}>👤 Edit Profile</h2>
          <button 
            type="button" 
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.5rem', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>

        {error && <div className="error-message">⚠️ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="edit-username">Username *</label>
            <input 
              type="text" 
              id="edit-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              required
              placeholder="e.g. alex_travels"
            />
            <small style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
              Public profile handle: /profile/{username || 'username'}
            </small>
          </div>

          <div className="form-group" style={{ marginTop: '1rem' }}>
            <label className="form-label" htmlFor="edit-bio">Travel Bio</label>
            <textarea 
              id="edit-bio"
              rows="4"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="form-textarea"
              placeholder="Share a short bio about your travel style, favorite countries, or travel motto..."
            ></textarea>
          </div>

          <div className="form-actions" style={{ marginTop: '1.5rem' }}>
            <button type="button" onClick={onClose} className="btn-secondary" disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
