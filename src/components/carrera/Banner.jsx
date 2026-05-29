import React from 'react';
import { Clock, Award, MapPin, CreditCard } from 'lucide-react';
import { formatCOP } from '../../utils';

export default function Banner({ careerData }) {
  if (!careerData) return null;

  return (
    <section className="course-banner-card">
      <div className="banner-glow"></div>
      <div className="banner-content">
        <span className="banner-badge">Pregrado</span>
        <h2 className="banner-title">{careerData.name || careerData.title}</h2>
        <p className="banner-subtitle">{careerData.description}</p>
        
        <div className="banner-stats-grid">
          <div className="banner-stat">
            <Clock />
            <div className="stat-info">
              <span className="stat-label">Duración</span>
              <span className="stat-value">{careerData.duration}</span>
            </div>
          </div>
          <div className="banner-stat">
            <Award />
            <div className="stat-info">
              <span className="stat-label">Créditos Totales</span>
              <span className="stat-value">{careerData.credits || "108"} Créditos</span>
            </div>
          </div>
          <div className="banner-stat">
            <MapPin />
            <div className="stat-info">
              <span className="stat-label">Modalidad</span>
              <span className="stat-value">{careerData.modality}</span>
            </div>
          </div>
          <div className="banner-stat">
            <CreditCard />
            <div className="stat-info">
              <span className="stat-label">Costo Semestre</span>
              <span className="stat-value">
                {careerData.price || formatCOP(careerData.costPerSemester) || "$ 4.500.000 COP"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}