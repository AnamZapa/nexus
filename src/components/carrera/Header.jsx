import React from 'react';

export default function Header({ student }) {
  if (!student) return null;

  return (
    <header className="content-header">
      <div className="header-title-area">
        <h1 className="page-title">Mi programa</h1>
      </div>
      
      <div className="student-profile-badge">
        <img 
          src={student.avatar} 
          alt={student.name} 
          className="student-avatar" 
        />
        <div className="student-meta">
          <span className="name">{student.name}</span>
          <span className="code">{student.careerName} • Cód. {student.code}</span>
        </div>
      </div>
    </header>
  );
}
