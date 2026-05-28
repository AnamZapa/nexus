import React from 'react';
import { Briefcase, BookMarked, TrendingUp } from 'lucide-react';

export default function CareerTab({ careerData }) {
  if (!careerData) return null;

  return (
    <div className="tab-panel">
      <div className="general-info-grid">
        
        {/* Profile Card */}
        <div className="info-card description-card">
          <div className="card-header-with-icon">
            <div className="header-icon-box">
              <BookMarked />
            </div>
            <h3>Perfil Profesional del Graduado</h3>
          </div>
          <p className="paragraph-text" style={{ marginBottom: '24px' }}>
            {careerData.graduateProfile || "Como egresado de NEXUS, contarás con una formación de excelencia que te permitirá liderar procesos críticos dentro de tu disciplina. Desarrollarás competencias técnicas y blandas enfocadas en la resolución de problemas de la industria real y la innovación empresarial."}
          </p>
          
          <h4 className="sub-section-title" style={{ marginTop: '30px' }}>Sectores de Empleo e Impacto</h4>
          <p className="paragraph-text" style={{ marginTop: '12px' }}>
            Los egresados del programa de <strong>{careerData.name}</strong> se desempeñan con éxito en:
          </p>
          <ul style={{ 
            listStyleType: 'none', 
            padding: 0, 
            marginTop: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
              <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--primary-blue)', borderRadius: '50%' }}></span>
              Empresas y corporaciones multinacionales líderes en el sector.
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
              <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--primary-blue)', borderRadius: '50%' }}></span>
              Consultoría independiente y asesoramiento estratégico especializado.
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
              <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--primary-blue)', borderRadius: '50%' }}></span>
              Emprendimientos propios y startups tecnológicas o de servicios de alto valor.
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
              <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--primary-blue)', borderRadius: '50%' }}></span>
              Organizaciones del sector público y organismos no gubernamentales (ONG).
            </li>
          </ul>
        </div>
        
        {/* Career Opportunities & Salaries */}
        <div className="info-card application-card">
          <div className="card-header-with-icon">
            <div className="header-icon-box">
              <Briefcase />
            </div>
            <h3>Cargos y Salarios Promedios (COP)</h3>
          </div>
          
          <p className="paragraph-text" style={{ fontSize: '14px', marginBottom: '20px' }}>
            A continuación se presentan los roles más comunes desempeñados por nuestros egresados en el mercado laboral actual en Colombia y sus rangos salariales promedio:
          </p>

          <div className="roles-list">
            {careerData.careerOpportunities && careerData.careerOpportunities.map((opp, idx) => (
              <div className="role-item" key={idx}>
                <div className="role-info">
                  <span className="role-title">{opp.role}</span>
                  <span className="role-desc">{opp.description}</span>
                </div>
                <span className="role-salary-pill">{opp.avgSalary}</span>
              </div>
            ))}
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            marginTop: '24px', 
            padding: '12px 16px', 
            backgroundColor: '#f0fdf4', 
            borderRadius: '8px',
            border: '1px solid #bbf7d0',
            color: '#166534',
            fontSize: '12px',
            fontWeight: 500
          }}>
            <TrendingUp size={16} />
            <span>Datos actualizados a la demanda del mercado laboral del año vigente en Colombia.</span>
          </div>
        </div>
        
      </div>
    </div>
  );
}
