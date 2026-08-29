import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api/axios';
import Footer from '../components/Footer';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const { name, username, email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await api.post('/auth/register', {
        name,
        username,
        email,
        password
      });
      toast.success('Account registered successfully! Please log in. 🎉');
      navigate('/login');
    } catch (err) {
      const errMsg = err.response?.data?.message || err.response?.data?.msg || 'Server error during registration';
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div className="auth-page" style={{ flex: 1 }}>
        <div className="glass-container auth-card">
          <div className="auth-header-icon">🌍</div>
          <h1 className="auth-title gradient-text">Join TripVault</h1>
          <p className="auth-subtitle">Create an account to start your adventure journal.</p>
          
          {error && <div className="error-message">⚠️ {error}</div>}
          
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Full Name *</label>
              <input 
                type="text" 
                id="name"
                name="name" 
                value={name} 
                onChange={onChange} 
                className="form-input" 
                required 
                placeholder="Alex Johnson"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="username">Username *</label>
              <input 
                type="text" 
                id="username"
                name="username" 
                value={username} 
                onChange={onChange} 
                className="form-input" 
                required 
                placeholder="e.g. alex_travels"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address *</label>
              <input 
                type="email" 
                id="email"
                name="email" 
                value={email} 
                onChange={onChange} 
                className="form-input" 
                required 
                placeholder="alex@example.com"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">Password *</label>
              <input 
                type="password" 
                id="password"
                name="password" 
                value={password} 
                onChange={onChange} 
                className="form-input" 
                required 
                placeholder="Create a strong password"
              />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }} disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account →'}
            </button>
          </form>
          
          <div className="auth-footer">
            Already have an account? <Link to="/login" className="auth-link">Log in</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
