import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const { name, email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password
      });
      console.log(res.data);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Server error during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="glass-container auth-card">
        <h1 className="auth-title">TripVault</h1>
        <p className="auth-subtitle">Create an account to start your journey.</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name"
              name="name" 
              value={name} 
              onChange={onChange} 
              className="form-input" 
              required 
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email address</label>
            <input 
              type="email" 
              id="email"
              name="email" 
              value={email} 
              onChange={onChange} 
              className="form-input" 
              required 
              placeholder="Enter your email"
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
              placeholder="Create a password"
            />
          </div>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        
        <div className="auth-footer">
          Already have an account? <Link to="/login" className="auth-link">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
