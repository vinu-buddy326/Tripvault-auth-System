import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Server error during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="glass-container auth-card">
        <div className="auth-header-icon">✈️</div>
        <h1 className="auth-title gradient-text">Welcome Back</h1>
        <p className="auth-subtitle">Log in to manage your TripVault memories.</p>
        
        {error && <div className="error-message">⚠️ {error}</div>}
        
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email"
              name="email" 
              value={email} 
              onChange={onChange} 
              className="form-input" 
              required 
              placeholder="name@example.com"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              name="password" 
              value={password} 
              onChange={onChange} 
              className="form-input" 
              required 
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }} disabled={loading}>
            {loading ? 'Logging In...' : 'Log In →'}
          </button>
        </form>
        
        <div className="auth-footer">
          Don't have an account? <Link to="/register" className="auth-link">Sign up for free</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
