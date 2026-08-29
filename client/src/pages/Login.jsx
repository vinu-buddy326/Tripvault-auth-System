import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api/axios';
import Footer from '../components/Footer';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
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
      const res = await api.post('/auth/login', {
        email,
        password
      });
      localStorage.setItem('token', res.data.token);
      toast.success('Welcome back to Vinu! ✈️');
      navigate('/dashboard');
    } catch (err) {
      const errMsg = err.response?.data?.message || err.response?.data?.msg || 'Server error during login';
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
          <div className="auth-header-icon">✈️</div>
          <h1 className="auth-title gradient-text">Welcome Back</h1>
          <p className="auth-subtitle">Log in to manage your Vinu travel memories.</p>
          
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
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  id="password"
                  name="password" 
                  value={password} 
                  onChange={onChange} 
                  className="form-input" 
                  style={{ paddingRight: '2.5rem' }}
                  required 
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px'
                  }}
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
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
      <Footer />
    </div>
  );
};

export default Login;
