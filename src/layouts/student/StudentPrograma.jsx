import React, { useState, useEffect } from 'react';
import StudentLayout from "./StudentLayout";
import Header from '../../components/carrera/Header';
import Banner from '../../components/carrera/Banner';
import CurriculumTab from '../../components/carrera/CurriculumTab';
import CareerTab from '../../components/carrera/CareerTab';
import RequirementsTab from '../../components/carrera/RequirementsTab';
import FinancesTab from '../../components/carrera/FinancesTab';
import DirectoryTab from '../../components/carrera/DirectoryTab';
import SubjectModal from '../../components/carrera/SubjectModal';

// Helper to map localStorage student 'programa' or 'carreraId' to database filenames
const mapProgramaToCareerId = (user) => {
  if (!user) return 'desarrollo_software';
  
  if (user.carreraId) {
    return user.carreraId.replace('-', '_');
  }
  
  if (user.programa) {
    const name = user.programa.toLowerCase().trim();
    if (name.includes('software') || name.includes('desarrollo')) return 'desarrollo_software';
    if (name.includes('sistemas')) return 'sistemas_informaticos';
    if (name.includes('culinario') || name.includes('gastronomía')) return 'arte_culinario';
    if (name.includes('comercio') || name.includes('negocios')) return 'comercio_internacional';
    if (name.includes('seguridad') || name.includes('salud') || name.includes('trabajo')) return 'seguridad_laboral';
    if (name.includes('eventos') || name.includes('producción')) return 'produccion_eventos';
  }
  
  return 'desarrollo_software';
};

export default function StudentPrograma() {
  const [sessionUser, setSessionUser] = useState(null);
  const [careerData, setCareerData] = useState(null);
  const [activeTab, setActiveTab] = useState('curriculum'); // curriculum, career, requirements, finances, directory
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // List of all students (used for demo fallback/mock selector if no session is active)
  const [demoUsers, setDemoUsers] = useState([]);
  const [isDemoFallback, setIsDemoFallback] = useState(false);

  // 1. Load active student session from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setSessionUser(parsed);
        setIsDemoFallback(false);
      } catch (e) {
        console.error('Error parsing stored user:', e);
      }
    } else {
      // Fallback/Demo: fetch student list to allow testing
      fetch('/data/users.json')
        .then(res => {
          if (!res.ok) throw new Error('No se pudo cargar la base de usuarios');
          return res.json();
        })
        .then(data => {
          setDemoUsers(data);
          setIsDemoFallback(true);
          if (data.length > 0) {
            // Mock a session user from first record
            const mockUser = {
              nombre: data[0].name,
              codigo: data[0].code,
              programa: data[0].careerName,
              semestre: data[0].semester,
              avatar: data[0].avatar,
              carreraId: data[0].careerId,
              estado: 'Aprobado'
            };
            setSessionUser(mockUser);
          }
        })
        .catch(err => {
          console.error('Error loading fallback user database:', err);
          setError('No hay sesión de estudiante activa y no se pudo conectar con el demo.');
          loading(false);
        });
    }
  }, []);

  // 2. Fetch specific career data when sessionUser changes
  useEffect(() => {
    if (!sessionUser) return;

    setLoading(true);
    const careerId = mapProgramaToCareerId(sessionUser);
    
    fetch(`/data/${careerId}.json`)
      .then(res => {
        if (!res.ok) throw new Error(`No se pudo cargar la carrera: ${careerId}`);
        return res.json();
      })
      .then(data => {
        setCareerData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading career details:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [sessionUser]);

  // Demo Switch Handler (Only shown for dev testing when not logged in)
  const handleDemoSwitch = (demoUserId) => {
    const student = demoUsers.find(u => u.id === demoUserId);
    if (student) {
      const mockUser = {
        nombre: student.name,
        codigo: student.code,
        programa: student.careerName,
        semestre: student.semester,
        avatar: student.avatar,
        carreraId: student.careerId,
        estado: 'Aprobado'
      };
      setSessionUser(mockUser);
    }
  };

  // Convert standard sessionUser to Header expected structure
  const getHeaderProfile = () => {
    if (!sessionUser) return null;
    return {
      name: sessionUser.nombre || 'Estudiante',
      code: sessionUser.codigo || 'NX20260000',
      careerName: sessionUser.programa || 'Programa Académico',
      avatar: sessionUser.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(sessionUser.nombre || 'Student')}`
    };
  };

  if (error) {
    return (
      <StudentLayout>
        <div className="error-view-container">
          <h2 className="error-title">Error de Carga</h2>
          <p className="error-message">{error}</p>
          <button className="btn-primary" onClick={() => window.location.reload()}>Recargar portal</button>
        </div>
      </StudentLayout>
    );
  }

  const studentProfile = getHeaderProfile();

  return (
    <StudentLayout>
      <div className="student-programa-view">
        
        {/* Demo switcher bar - only shown if no active session is in localStorage */}
        {isDemoFallback && (
          <div className="dev-helper-bar">
            <div>
              <strong>[MODO DEMO]</strong> No se detectó inicio de sesión en localStorage. Selecciona un perfil para ver su programa:
            </div>
            <select 
              className="dev-student-select"
              value={demoUsers.find(u => u.name === sessionUser?.nombre)?.id || ''}
              onChange={(e) => handleDemoSwitch(e.target.value)}
            >
              {demoUsers.map(u => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.careerName})
                </option>
              ))}
            </select>
          </div>
        )}

        {loading ? (
          <div className="loading-view-container">
            <div className="loading-content">
              <div className="spinner-element"></div>
              <span className="loading-text">Cargando información del programa académico...</span>
            </div>
          </div>
        ) : (
          <>
            {/* Page Header (Mi programa title + profile badge) */}
            <Header student={studentProfile} />
            
            {/* Degree Statistics Banner */}
            <Banner careerData={careerData} />
            
            {/* Navigation Tabs */}
            <div className="tabs-nav-container">
              <button 
                className={`tab-btn ${activeTab === 'curriculum' ? 'active' : ''}`}
                onClick={() => setActiveTab('curriculum')}
              >
                Plan de Estudios
              </button>
              <button 
                className={`tab-btn ${activeTab === 'career' ? 'active' : ''}`}
                onClick={() => setActiveTab('career')}
              >
                Proyección Profesional
              </button>
              <button 
                className={`tab-btn ${activeTab === 'requirements' ? 'active' : ''}`}
                onClick={() => setActiveTab('requirements')}
              >
                Requisitos de Grado
              </button>
              <button 
                className={`tab-btn ${activeTab === 'finances' ? 'active' : ''}`}
                onClick={() => setActiveTab('finances')}
              >
                Matrícula y Costos
              </button>
              <button 
                className={`tab-btn ${activeTab === 'directory' ? 'active' : ''}`}
                onClick={() => setActiveTab('directory')}
              >
                Directorio del Programa
              </button>
            </div>

            {/* Content Tabs */}
            {activeTab === 'curriculum' && (
              <CurriculumTab 
                careerData={careerData} 
                onSelectSubject={setSelectedSubject} 
              />
            )}
            {activeTab === 'career' && (
              <CareerTab careerData={careerData} />
            )}
            {activeTab === 'requirements' && (
              <RequirementsTab 
                careerData={careerData} 
                student={{ semester: sessionUser?.semestre || 1 }} 
              />
            )}
            {activeTab === 'finances' && (
              <FinancesTab careerData={careerData} />
            )}
            {activeTab === 'directory' && (
              <DirectoryTab careerData={careerData} />
            )}

            {/* Subject details popup */}
            <SubjectModal 
              subject={selectedSubject} 
              isOpen={selectedSubject !== null} 
              onClose={() => setSelectedSubject(null)} 
            />
          </>
        )}
      </div>
    </StudentLayout>
  );
}