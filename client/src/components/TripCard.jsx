import { useState } from 'react';
import api from '../api/axios';

const TripCard = ({ trip, onEdit, onDeleteSuccess, isPublic = false }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${trip.title}"?`)) {
      try {
        await api.delete(`/trips/${trip._id}`);
        onDeleteSuccess();
      } catch (err) {
        alert(err.response?.data?.msg || 'Failed to delete trip.');
      }
    }
  };

  const renderStars = (rating) => {
    const num = Math.min(Math.max(Number(rating) || 5, 1), 5);
    return '★'.repeat(num) + '☆'.repeat(5 - num);
  };

  const allPhotos = [];
  if (trip.coverImage) allPhotos.push(trip.coverImage);
  if (Array.isArray(trip.photos)) {
    trip.photos.forEach((p) => {
      if (p && !allPhotos.includes(p)) allPhotos.push(p);
    });
  }

  return (
    <div className="trip-card glass-container" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Trip Cover Image Header */}
      {trip.coverImage ? (
        <div style={{ position: 'relative', height: '180px', width: '100%', overflow: 'hidden' }}>
          <img 
            src={trip.coverImage} 
            alt={trip.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
            className="trip-cover-img"
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, transparent 60%)'
          }} />
          <span style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(6px)',
            color: '#fbbf24',
            padding: '4px 10px',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: 600
          }}>
            {renderStars(trip.rating)}
          </span>
        </div>
      ) : (
        <div style={{
          height: '100px',
          background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(168, 85, 247, 0.2))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.25rem'
        }}>
          <span style={{ fontSize: '2rem' }}>✈️</span>
          <span className="rating-badge" title={`${trip.rating} out of 5 stars`}>
            {renderStars(trip.rating)}
          </span>
        </div>
      )}

      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 className="trip-title" style={{ marginTop: trip.coverImage ? 0 : 0 }}>{trip.title}</h3>

        <div className="trip-info-pill" style={{ marginTop: '0.5rem', alignSelf: 'flex-start' }}>
          <span>📍</span>
          <span>{trip.destination}</span>
        </div>

        {(trip.startDate || trip.endDate) && (
          <div className="trip-dates-badge" style={{ marginTop: '0.5rem', alignSelf: 'flex-start' }}>
            <span>📅</span>
            <span>
              {formatDate(trip.startDate)} {trip.endDate ? `— ${formatDate(trip.endDate)}` : ''}
            </span>
          </div>
        )}

        {trip.description && (
          <p className="trip-description" style={{ marginTop: '0.75rem', flex: 1 }}>
            {trip.description}
          </p>
        )}

        {/* Photo Gallery Thumbnails */}
        {allPhotos.length > 0 && (
          <div style={{ marginTop: '1rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem', fontWeight: 500 }}>
              📸 Memory Photos ({allPhotos.length})
            </span>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {allPhotos.slice(0, 4).map((photo, idx) => (
                <img
                  key={idx}
                  src={photo}
                  alt={`Memory ${idx + 1}`}
                  onClick={() => setSelectedPhoto(photo)}
                  style={{
                    width: '45px',
                    height: '45px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.08)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
              ))}
              {allPhotos.length > 4 && (
                <div 
                  onClick={() => setSelectedPhoto(allPhotos[4])}
                  style={{
                    width: '45px',
                    height: '45px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#38bdf8',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  +{allPhotos.length - 4}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons (Only for non-public view) */}
        {!isPublic && (
          <div className="trip-card-actions" style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <button onClick={() => onEdit(trip)} className="btn-edit">
              ✏️ Edit
            </button>
            <button onClick={handleDelete} className="btn-delete">
              🗑️ Delete
            </button>
          </div>
        )}
      </div>

      {/* Photo Lightbox Modal */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            backdropFilter: 'blur(8px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}
        >
          <div style={{ position: 'relative', maxWidth: '85vw', maxHeight: '85vh' }} onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedPhoto} 
              alt="Enlarged photo" 
              style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: '12px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }} 
            />
            <button 
              onClick={() => setSelectedPhoto(null)}
              style={{
                position: 'absolute',
                top: '-15px',
                right: '-15px',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripCard;
