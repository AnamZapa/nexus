import React, { useState } from 'react';
import { Search, X, Clock, Info } from 'lucide-react';

export default function CurriculumTab({ careerData, onSelectSubject }) {
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  if (!careerData) return null;

  // Search subjects across all semesters
  const getFilteredSubjects = () => {
    if (!searchQuery.trim()) {
      const sem = careerData.semesters.find(s => s.number === selectedSemester);
      return sem ? sem.subjects : [];
    }

    const query = searchQuery.toLowerCase();
    const results = [];
    careerData.semesters.forEach(sem => {
      sem.subjects.forEach(sub => {
        if (
          sub.name.toLowerCase().includes(query) ||
          sub.code.toLowerCase().includes(query) ||
          sub.type.toLowerCase().includes(query) ||
          sub.description.toLowerCase().includes(query)
        ) {
          results.push({ ...sub, semesterNum: sem.number });
        }
      });
    });
    return results;
  };

  const filteredSubjects = getFilteredSubjects();
  const totalSemesters = careerData.semesters.length;

  // Calculate semester stats
  const activeSemesterData = careerData.semesters.find(s => s.number === selectedSemester);
  const activeSemesterCredits = activeSemesterData
    ? activeSemesterData.subjects.reduce((sum, s) => sum + s.credits, 0)
    : 0;

  return (
    <div className="tab-panel">
      <div className="curriculum-container">
        
        {/* Controls */}
        <div className="curriculum-controls">
          <div className="search-box-container">
            <Search className="search-icon" />
            <input 
              type="text" 
              placeholder="Buscar materias por nombre, código o descripción..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                <X />
              </button>
            )}
          </div>
          
          <div className="curriculum-legend">
            <span className="legend-item">
              <span className="color-dot obligatorio"></span> Obligatoria
            </span>
            <span className="legend-item">
              <span className="color-dot electiva"></span> Electiva
            </span>
          </div>
        </div>

        {/* Semester selector tabs (hidden during search) */}
        {!searchQuery && (
          <div className="semester-tabs-scroll">
            <div className="semester-tabs-container">
              {careerData.semesters.map(sem => (
                <button
                  key={sem.number}
                  className={`semester-btn ${selectedSemester === sem.number ? 'active' : ''}`}
                  onClick={() => setSelectedSemester(sem.number)}
                >
                  Semestre {sem.number}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Header Bar */}
        <div className="semester-header-bar">
          <h3>
            {searchQuery 
              ? 'Resultados de Búsqueda' 
              : `Semestre ${selectedSemester}`
            }
          </h3>
          <span className="semester-summary">
            {searchQuery 
              ? `${filteredSubjects.length} asignaturas encontradas`
              : `${activeSemesterData ? activeSemesterData.subjects.length : 0} materias • ${activeSemesterCredits} créditos`
            }
          </span>
        </div>

        {/* Subjects Grid */}
        <div className="subjects-grid">
          {filteredSubjects.length === 0 ? (
            <div className="no-results-box">
              <Info />
              <p style={{ fontWeight: 500 }}>No se encontraron materias que coincidan con la búsqueda.</p>
            </div>
          ) : (
            filteredSubjects.map((subject, idx) => {
              const isOblig = subject.type.toLowerCase() === 'obligatoria';
              return (
                <div 
                  key={`${subject.code}-${idx}`}
                  className={`subject-card ${isOblig ? 'obligatoria' : 'electiva'}`}
                  onClick={() => onSelectSubject(subject)}
                >
                  <div className="card-top">
                    <span className="subject-code">
                      {subject.code} {subject.semesterNum && `• Sem. ${subject.semesterNum}`}
                    </span>
                    <span className="subject-type-badge">{subject.type}</span>
                  </div>
                  <h4 className="subject-name">{subject.name}</h4>
                  <div className="card-bottom">
                    <span className="subject-credits">{subject.credits} Créditos</span>
                    <span className="subject-hours">
                      <Clock /> {subject.hours} Horas
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
        
      </div>
    </div>
  );
}
