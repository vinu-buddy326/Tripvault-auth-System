import { useState, useEffect } from 'react';
import api from '../api/axios';

const TripForm = ({ trip, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    description: '',
    rating: 5,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (trip) {
      setFormData({
        title: trip.title || '',
        destination: trip.destination || '',
        startDate: trip.startDate ? trip.startDate.split('T')[0] : '',
        endDate: trip.endDate ? trip.endDate.split('T')[0] : '',
        description: trip.description || '',
        rating: trip.rating || 5,
      });
    }
  }, [trip]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRatingSelect = (val) => {
    setFormData({
      ...formData,
      rating: val
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (trip) {
        await api.put(`/trips/${trip._id}`, formData);
      } else {
        await api.post('/trips', formData);
      }
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.msg || err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="trip-form-container glass-container">
      <div className="trip-form-header">
        <h3 className="trip-form-title">
          {trip ? '✏️ Edit Travel Memory' : '✨ Add New Travel Memory'}
        </h3>
      </div>
      
      {error && <div className="error-message">⚠️ {error}</div>}
      
      <form onSubmit={handleSubmit} className="trip-form">
        <div className="form-group">
          <label className="form-label" htmlFor="title">Trip Title *</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            placeholder="e.g. Summer in Tokyo, Paris Getaway"
            className="form-input"
            required 
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="destination">Destination *</label>
          <input 
            type="text" 
            id="destination" 
            name="destination" 
            value={formData.destination} 
            onChange={handleChange} 
            placeholder="e.g. Tokyo, Japan"
            className="form-input"
            required 
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="startDate">Start Date</label>
            <input 
              type="date" 
              id="startDate" 
              name="startDate" 
              value={formData.startDate} 
              onChange={handleChange}
              className="form-input" 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="endDate">End Date</label>
            <input 
              type="date" 
              id="endDate" 
              name="endDate" 
              value={formData.endDate} 
              onChange={handleChange}
              className="form-input" 
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Trip Rating (1-5)</label>
          <div className="star-rating-selector">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                className="star-btn"
                style={{ color: star <= formData.rating ? '#fbbf24' : '#475569' }}
                onClick={() => handleRatingSelect(star)}
              >
                ★
              </button>
            ))}
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>
              ({formData.rating} / 5)
            </span>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="description">Notes & Memories</label>
          <textarea 
            id="description" 
            name="description" 
            rows="4"
            value={formData.description} 
            onChange={handleChange} 
            placeholder="Write down key memories, places visited, or notes..."
            className="form-textarea"
          ></textarea>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn-secondary" disabled={loading}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Saving...' : trip ? 'Update Trip' : 'Create Trip'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TripForm;
