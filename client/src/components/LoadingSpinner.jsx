import React from 'react';

export const LoadingSpinner = ({ message = 'Loading Vinu...' }) => {
  return (
    <div className="auth-page" style={{ minHeight: '60vh' }}>
      <div className="glass-container auth-card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
        <div className="loading-spinner-wrapper">
          <div className="spinner-ring"></div>
          <div className="spinner-icon">✈️</div>
        </div>
        <h3 className="gradient-text" style={{ marginTop: '1.25rem', fontSize: '1.25rem' }}>
          {message}
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
          Gathering your travel memories...
        </p>
      </div>
    </div>
  );
};

export const CardSkeleton = () => {
  return (
    <div className="trip-card glass-container skeleton-card" style={{ height: '320px', padding: '1.5rem' }}>
      <div className="skeleton-line" style={{ width: '60%', height: '24px', marginBottom: '1rem' }}></div>
      <div className="skeleton-line" style={{ width: '40%', height: '16px', marginBottom: '0.75rem' }}></div>
      <div className="skeleton-line" style={{ width: '50%', height: '16px', marginBottom: '1.5rem' }}></div>
      <div className="skeleton-line" style={{ width: '100%', height: '60px' }}></div>
    </div>
  );
};

export default LoadingSpinner;
