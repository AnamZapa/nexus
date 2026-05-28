import React from 'react';
import { Users, Mail, Phone, MapPin, Calendar, HelpCircle, FileText, ChevronRight } from 'lucide-react';

export default function DirectoryTab({ careerData }) {
  if (!careerData || !careerData.directory) return null;

  const { director, coordinator, tutoring, regulationsUrl } = careerData.directory;

  return (
    <div className="tab-panel">
      <div className="directory-grid">
        
        {/* Contact Cards Section */}
        <div className="contacts-section">
          <div className="info-card" style={{ padding: '24px' }}>
            <div className="card-header-with-icon" style={{ marginBottom: '20px' }}>
              <div className="header-icon-box">
                <Users />
              </div>
              <h3>Directorio de Contacto Académico</h3>
            </div>
            
            <p className="paragraph-text" style={{ fontSize: '14px', marginBottom: '20px' }}>
              Comunícate con los directivos y coordinadores de tu programa académico para radicar solicitudes, homologaciones o asesorías.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Director Card */}
              {director && (
                <div className="contact-card">
                  <span className="contact-role-badge">Director de Programa</span>
                  <h4 className="contact-name">{director.name}</h4>
                  
                  <div className="contact-detail-row">
                    <Mail />
                    <a href={`mailto:${director.email}`}>{director.email}</a>
                  </div>
                  <div className="contact-detail-row">
                    <Phone />
                    <span>{director.phone}</span>
                  </div>
                  <div className="contact-detail-row">
                    <MapPin />
                    <span>{director.office}</span>
                  </div>
                  <div className="contact-detail-row">
                    <Calendar />
                    <span>Atención: {director.hours}</span>
                  </div>
                </div>
              )}

              {/* Coordinator Card */}
              {coordinator && (
                <div className="contact-card">
                  <span className="contact-role-badge" style={{ background: 'rgba(16, 185, 129, 0.08)', color: '#10b981' }}>Coordinador Académico</span>
                  <h4 className="contact-name">{coordinator.name}</h4>
                  
                  <div className="contact-detail-row">
                    <Mail />
                    <a href={`mailto:${coordinator.email}`}>{coordinator.email}</a>
                  </div>
                  <div className="contact-detail-row">
                    <Phone />
                    <span>{coordinator.phone}</span>
                  </div>
                  <div className="contact-detail-row">
                    <MapPin />
                    <span>{coordinator.office}</span>
                  </div>
                  <div className="contact-detail-row">
                    <Calendar />
                    <span>Atención: {coordinator.hours}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tutoring & Regulations Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* Tutoring Channels */}
          <div className="info-card">
            <div className="card-header-with-icon">
              <div className="header-icon-box" style={{ background: 'rgba(0, 184, 230, 0.08)', color: 'var(--primary-cyan)' }}>
                <HelpCircle />
              </div>
              <h3>Tutorías Académicas Oficiales</h3>
            </div>
            
            <p className="paragraph-text" style={{ fontSize: '14px', lineHeight: 1.6 }}>
              {tutoring || "El programa ofrece tutorías y refuerzos conceptuales gratuitos todas las semanas en asignaturas de alta complejidad. Revisa los horarios asignados y conéctate al canal oficial."}
            </p>
            
            <div style={{ 
              marginTop: '20px', 
              padding: '16px', 
              backgroundColor: 'rgba(0, 184, 230, 0.05)', 
              borderRadius: '8px', 
              border: '1px solid rgba(0, 184, 230, 0.15)',
              fontSize: '13px',
              color: 'var(--text-secondary)',
              lineHeight: 1.5
            }}>
              <strong>¿Cómo acceder?</strong> Ingresa a MS Teams con tu correo institucional y busca el equipo del canal de tutorías mencionado arriba. No requiere inscripción previa.
            </div>
          </div>

          {/* Student Handbook & Regulations */}
          <div className="info-card">
            <div className="card-header-with-icon">
              <div className="header-icon-box" style={{ background: 'rgba(239, 68, 68, 0.08)', color: '#ef4444' }}>
                <FileText />
              </div>
              <h3>Reglamentos Estudiantiles</h3>
            </div>
            
            <p className="paragraph-text" style={{ fontSize: '14px' }}>
              Consulta las normativas institucionales oficiales vigentes, deberes académicos, escala de calificaciones, procesos disciplinarios y causales de pérdida de calidad de estudiante.
            </p>

            <div className="regulation-links">
              <a 
                href={regulationsUrl || "https://nexus.edu.co/reglamentos/reglamento-estudiantil-general.pdf"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="regulation-link-item"
              >
                <span>Reglamento General de Estudiantes</span>
                <ChevronRight />
              </a>
              <a 
                href="https://nexus.edu.co/reglamentos/reglamento-practicas-profesionales.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="regulation-link-item"
              >
                <span>Reglamento de Prácticas Profesionales</span>
                <ChevronRight />
              </a>
              <a 
                href="https://nexus.edu.co/reglamentos/reglamento-propiedad-intelectual.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="regulation-link-item"
              >
                <span>Reglamento de Propiedad Intelectual</span>
                <ChevronRight />
              </a>
            </div>
          </div>

        </div>
        
      </div>
    </div>
  );
}
