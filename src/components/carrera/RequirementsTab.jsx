import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, Award, AlertCircle } from 'lucide-react';

export default function RequirementsTab({ careerData, student }) {
  const [completedReqs, setCompletedReqs] = useState({});

  useEffect(() => {
    if (!careerData || !student) return;

    // Simulate realistic checklist status based on student semester progress
    // If student is in a high semester (e.g., 6 or 8), check more items
    const reqs = {};
    const totalSemesters = careerData.semesters.length;
    const progressRatio = student.semester / totalSemesters;

    careerData.graduationRequirements.forEach((req, index) => {
      // Determine default checked state
      if (index === 0) {
        // English requirement: checked for senior students
        reqs[index] = progressRatio >= 0.7;
      } else if (index === 1) {
        // Internship hours: checked for senior students
        reqs[index] = progressRatio >= 0.8;
      } else if (index === 2) {
        // Social service: checked for mid-to-senior students
        reqs[index] = progressRatio >= 0.5;
      } else if (index === 4) {
        // Credits: checked only if student is in the final semester
        reqs[index] = student.semester >= totalSemesters;
      } else {
        reqs[index] = false;
      }
    });

    setCompletedReqs(reqs);
  }, [careerData, student]);

  if (!careerData) return null;

  const requirements = careerData.graduationRequirements || [];
  
  const toggleRequirement = (index) => {
    setCompletedReqs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const completedCount = Object.values(completedReqs).filter(Boolean).length;
  const totalCount = requirements.length;
  const percentComplete = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Generate descriptions for requirements dynamically based on index/text
  const getSubtext = (req) => {
    const text = req.toLowerCase();
    if (text.includes("inglés")) {
      return "Debes presentar un certificado oficial (TOEFL, IELTS o examen institucional) antes de iniciar tu último semestre.";
    }
    if (text.includes("prácticas")) {
      return "Inscripción en la Dirección de Prácticas, aprobación del tutor de campo y reporte final de actividades.";
    }
    if (text.includes("servicio social")) {
      return "Participación aprobada en brigadas de voluntariado de NEXUS o proyectos de impacto comunitario local.";
    }
    if (text.includes("proyecto de grado") || text.includes("proyecto integrador") || text.includes("trabajo de grado")) {
      return "Formulación y desarrollo de tu proyecto integrador con visto bueno del jurado evaluador y sustentación pública.";
    }
    if (text.includes("saber pro") || text.includes("saber tyt")) {
      return "Prueba nacional obligatoria del ICFES. El reporte de asistencia es requisito de grado oficial.";
    }
    if (text.includes("créditos")) {
      return `Haber cursado y aprobado la totalidad de los créditos correspondientes a tu plan curricular.`;
    }
    return "Requisito normativo oficial del reglamento general de la institución.";
  };

  return (
    <div className="tab-panel">
      <div className="info-card">
        <div className="card-header-with-icon">
          <div className="header-icon-box">
            <Award />
          </div>
          <div>
            <h3>Requisitos Oficiales de Grado</h3>
            <p className="paragraph-text" style={{ fontSize: '14px', marginTop: '4px' }}>
              Control del estado de requisitos reglamentarios para postulación a grado.
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-header">
            <span className="progress-title">Estado de cumplimiento legal</span>
            <span className="progress-pct">{percentComplete}% completado</span>
          </div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${percentComplete}%` }}
            ></div>
          </div>
        </div>

        {/* Interactive List */}
        <div className="req-checkbox-list">
          {requirements.map((req, index) => {
            const isChecked = !!completedReqs[index];
            return (
              <div 
                key={index} 
                className={`req-checkbox-item ${isChecked ? 'checked' : ''}`}
                onClick={() => toggleRequirement(index)}
                style={{ cursor: 'pointer' }}
              >
                <div className="custom-checkbox-wrapper">
                  {isChecked ? (
                    <span className="req-checked-icon">
                      <CheckSquare size={20} />
                    </span>
                  ) : (
                    <span className="req-unchecked-icon">
                      <Square size={20} />
                    </span>
                  )}
                </div>
                <div className="req-checkbox-details">
                  <span className="req-checkbox-label" style={{
                    textDecoration: isChecked ? 'line-through' : 'none',
                    color: isChecked ? 'var(--text-secondary)' : 'var(--text-primary)'
                  }}>
                    {req}
                  </span>
                  <span className="req-checkbox-subtext">
                    {getSubtext(req)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Status alert */}
        <div className="graduation-alert-box" style={{ marginTop: '30px' }}>
          <AlertCircle />
          <div style={{ fontSize: '13px', color: 'var(--primary-blue)', lineHeight: 1.5 }}>
            <strong>Nota Importante:</strong> El estado de esta lista simula tu avance real. Debes radicar los soportes físicos de los requisitos marcados en la Oficina de Registro y Control Académico al menos 60 días antes de la ceremonia de graduación.
          </div>
        </div>
      </div>
    </div>
  );
}
