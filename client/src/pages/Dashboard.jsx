import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const res = await axios.get('http://localhost:5000/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        setUser(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch user data. Please try logging in again.');
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="auth-page">
        <div className="auth-title">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="dashboard-title">TripVault</div>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>
      
      <main className="glass-container dashboard-content">
        <h2>Welcome back, {user?.name}!</h2>
        <p>This is your travel memory journal dashboard. More features coming soon.</p>
        
        {error && <div className="error-message" style={{marginTop: '2rem'}}>{error}</div>}
      </main>
    </div>
  );
};

export default Dashboard;
