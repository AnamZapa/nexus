import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function SubjectModal({ subject, isOpen, onClose }) {
  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !subject) return null;

  const isOblig = subject.type.toLowerCase() === 'obligatoria';

  return (
    <div 
      className={`modal-overlay open ${isOblig ? 'type-obligatoria' : 'type-electiva'}`}
      onClick={(e) => {
        if (e.target.classList.contains('modal-overlay')) {
          onClose();
        }
      }}
    >
      <div className="modal-card">
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>
        
        <div className="modal-header">
          <span className="modal-subject-code">{subject.code}</span>
          <h2 className="modal-subject-name">{subject.name}</h2>
          <span className="modal-subject-type">{subject.type}</span>
        </div>
        
        <div className="modal-body">
          <div className="modal-details-grid">
            <div className="modal-detail-item">
              <span className="detail-label">Créditos</span>
              <span className="detail-value">{subject.credits}</span>
            </div>
            <div className="modal-detail-item">
              <span className="detail-label">Horas</span>
              <span className="detail-value">{subject.hours} H</span>
            </div>
            <div className="modal-detail-item">
              <span className="detail-label">Prerrequisitos</span>
              <span className="detail-value">{subject.prerequisites || 'Ninguno'}</span>
            </div>
          </div>
          
          <div className="modal-description-section">
            <h4>Descripción de la Asignatura</h4>
            <p>{subject.description}</p>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose}>Entendido</button>
        </div>
      </div>
    </div>
  );
}
