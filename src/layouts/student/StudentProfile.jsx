import { useState } from "react";

import StudentLayout from "./StudentLayout";

import {
    FaUserCircle,
    FaPhone,
    FaIdCard,
    FaEnvelope,
    FaGraduationCap,
    FaStar,
    FaClock,
    FaCalendarAlt,
    FaFileAlt,
    FaCheckCircle,
    FaHourglassHalf,
} from "react-icons/fa";

import "../../styles/studentProfile.css";

export default function StudentProfile() {

    const user =
        JSON.parse(localStorage.getItem("user"));

    const [nombre, setNombre] =
        useState(
            user?.nombre || "Ana Gómez"
        );

    const [telefono, setTelefono] =
        useState(
            user?.telefono || "3004567890"
        );

    const [documento, setDocumento] =
        useState(
            user?.documento || "1039456781"
        );

    const handleGuardar = () => {

        const updatedUser = {
            ...user,
            nombre,
            telefono,
            documento,
        };

        localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
        );

        alert("Perfil actualizado");
    };

    return (

        <StudentLayout>

            <div className="student-profile">

                {/* HEADER */}

                <div className="profile-header">

                    <div className="profile-avatar">

                        <img
                            src="https://i.pravatar.cc/300"
                            alt="profile"
                        />

                    </div>

                    <div className="profile-info">

                        <h1>
                            {user?.nombre || "Ana Gómez"}
                        </h1>

                        <p>
                            {user?.programa ||
                                "Ingeniería de Software"}
                        </p>

                        <span className={`profile-badge ${user?.estado?.toLowerCase()}`}>
                            {user?.estado}
                        </span>

                    </div>

                </div>

                {/* GRID */}

                <div className="profile-grid">

                    {/* PERSONAL */}

                    <div className="profile-card">

                        <h2>
                            Información personal
                        </h2>

                        <div className="input-group">

                            <label>
                                <FaUserCircle />
                                Nombre completo
                            </label>

                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) =>
                                    setNombre(e.target.value)
                                }
                            />

                        </div>

                        <div className="input-group">

                            <label>
                                <FaPhone />
                                Teléfono
                            </label>

                            <input
                                type="text"
                                value={telefono}
                                onChange={(e) =>
                                    setTelefono(e.target.value)
                                }
                            />

                        </div>

                        <div className="input-group">

                            <label>
                                <FaIdCard />
                                Documento
                            </label>

                            <input
                                type="text"
                                value={documento}
                                onChange={(e) =>
                                    setDocumento(e.target.value)
                                }
                            />

                        </div>

                        {/* SOLO APROBADOS */}

                        {user?.estado === "Aprobado" && (

                            <div className="input-group">

                                <label>
                                    <FaEnvelope />
                                    Correo institucional
                                </label>

                                <input
                                    type="email"
                                    value={
                                        user?.correoInstitucional ||
                                        "ana.gomez@campus.nexus.edu.co"
                                    }
                                    disabled
                                />

                            </div>

                        )}

                        <button
                            className="save-btn"
                            onClick={handleGuardar}
                        >
                            Guardar cambios
                        </button>

                    </div>

                    {/* CARD POSTULACIÓN — SOLO PENDIENTES */}

                    {user?.estado === "Pendiente" && (

                        <div className="profile-card">

                            <h2>
                                Mi postulación
                            </h2>

                            <div className="academic-box">

                                <FaGraduationCap />

                                <div>
                                    <span>Programa aplicado</span>
                                    <h3>
                                        {user?.programa || "Desarrollo de Software"}
                                    </h3>
                                </div>

                            </div>

                            <div className="academic-box">

                                <FaCalendarAlt />

                                <div>
                                    <span>Fecha de inscripción</span>
                                    <h3>
                                        {user?.fechaInscripcion || "15 May 2026"}
                                    </h3>
                                </div>

                            </div>

                            <div className="academic-box">

                                <FaHourglassHalf />

                                <div>
                                    <span>Estado actual</span>
                                    <h3 className="pending-state-text">
                                        Pendiente evaluación final
                                    </h3>
                                </div>

                            </div>

                            <div className="pending-steps">

                                <h4>
                                    Seguimiento
                                </h4>

                                <div className="pending-step-item done">
                                    <FaCheckCircle />
                                    <span>Inscripción completada</span>
                                </div>

                                <div className="pending-step-item done">
                                    <FaCheckCircle />
                                    <span>Documentos validados</span>
                                </div>

                                <div className="pending-step-item active">
                                    <FaClock />
                                    <span>Evaluación académica — en revisión</span>
                                </div>

                                <div className="pending-step-item">
                                    <FaFileAlt />
                                    <span>Resultado final — pendiente</span>
                                </div>

                            </div>

                        </div>

                    )}

                    {/* ACADÉMICO — SOLO APROBADOS */}

                    {user?.estado === "Aprobado" && (

                        <div className="profile-card">

                            <h2>
                                Información académica
                            </h2>

                            <div className="academic-box">

                                <FaGraduationCap />

                                <div>
                                    <span>Semestre</span>
                                    <h3>
                                        Semestre {user?.semestre || 2}
                                    </h3>
                                </div>

                            </div>

                            <div className="academic-box">

                                <FaStar />

                                <div>
                                    <span>Promedio</span>
                                    <h3>
                                        {user?.promedio || 4.5}
                                    </h3>
                                </div>

                            </div>

                            <div className="academic-data">

                                <div>
                                    <span>Código</span>
                                    <p>
                                        {user?.codigo || "NX20260045"}
                                    </p>
                                </div>

                                <div>
                                    <span>Créditos</span>
                                    <p>
                                        {user?.creditos || 32}
                                    </p>
                                </div>

                                <div>
                                    <span>Materias</span>
                                    <p>
                                        {user?.materias || 8}
                                    </p>
                                </div>

                            </div>

                        </div>

                    )}

                </div>

            </div>

        </StudentLayout>
    );
}