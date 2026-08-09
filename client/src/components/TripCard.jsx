import api from '../api/axios';

const TripCard = ({ trip, onEdit, onDeleteSuccess }) => {
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

  return (
    <div className="trip-card glass-container">
      <div>
        <div className="trip-card-header">
          <h3 className="trip-title">{trip.title}</h3>
          <span className="rating-badge" title={`${trip.rating} out of 5 stars`}>
            {renderStars(trip.rating)}
          </span>
        </div>

        <div className="trip-info-pill" style={{ marginTop: '0.75rem' }}>
          <span>📍</span>
          <span>{trip.destination}</span>
        </div>

        {(trip.startDate || trip.endDate) && (
          <div className="trip-dates-badge" style={{ marginTop: '0.75rem' }}>
            <span>📅</span>
            <span>
              {formatDate(trip.startDate)} {trip.endDate ? `— ${formatDate(trip.endDate)}` : ''}
            </span>
          </div>
        )}

        {trip.description && (
          <p className="trip-description" style={{ marginTop: '1rem' }}>
            {trip.description}
          </p>
        )}
      </div>

      <div className="trip-card-actions">
        <button onClick={() => onEdit(trip)} className="btn-edit">
          ✏️ Edit
        </button>
        <button onClick={handleDelete} className="btn-delete">
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default TripCard;
