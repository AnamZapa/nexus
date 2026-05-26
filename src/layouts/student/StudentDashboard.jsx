import StudentLayout from "./StudentLayout";

import {
    FaCheckCircle,
    FaBook,
    FaCalendarAlt,
    FaStar,
} from "react-icons/fa";

import "../../styles/studentDashboard.css";

export default function StudentDashboard() {

    const user =
        JSON.parse(localStorage.getItem("user"));

    // DATOS MOCK
    const semestreActual = 2;
    const totalSemestres = 8;

    // CALCULO PORCENTAJE
    const progreso =
        (semestreActual / totalSemestres) * 100;

    return (

        <StudentLayout>

            <div className="student-dashboard">

                {/* HEADER */}

                <div className="student-header">

                    <div>

                        <h1>
                            Hola, {user?.nombre}
                        </h1>

                        <p>
                            Bienvenida a tu espacio académico
                        </p>

                    </div>

                </div>

                {/* CARDS */}

                <div className="student-cards">

                    <div className="student-card estado">

                        <div className="icon-box green">
                            <FaCheckCircle />
                        </div>

                        <div>
                            <span>Estado actual</span>

                            <h3>{user?.estado}</h3>

                            <p>
                                Tu proceso va correctamente
                            </p>
                        </div>

                    </div>

                    <div className="student-card">

                        <div className="icon-box blue">
                            <FaBook />
                        </div>

                        <div>
                            <span>Programa</span>

                            <h3>
                                Desarrollo de Software
                            </h3>

                            <p>
                                Semestre {semestreActual}
                            </p>
                        </div>

                    </div>

                    <div className="student-card">

                        <div className="icon-box purple">
                            <FaCalendarAlt />
                        </div>

                        <div>
                            <span>Semestre actual</span>

                            <h3>2026 - II</h3>

                            <p>
                                Calendario académico
                            </p>
                        </div>

                    </div>

                    <div className="student-card">

                        <div className="icon-box yellow">
                            <FaStar />
                        </div>

                        <div>
                            <span>Promedio</span>

                            <h3>4.5</h3>

                            <p>
                                Excelente rendimiento
                            </p>
                        </div>

                    </div>

                </div>

                {/* GRID */}

                <div className="dashboard-grid">

                    {/* PROGRESO ACADÉMICO */}

                    <div className="progress-card">

                        <h2>
                            Mi progreso académico
                        </h2>

                        <div className="progress-info">

                            <div className="progress-top">

                                <span>
                                    Semestre {semestreActual} de {totalSemestres}
                                </span>

                                <div className="progress-percentage">
                                    {Math.round(progreso)}%
                                </div>

                            </div>

                            <div className="progress-bar">

                                <div
                                    className="progress-fill"
                                    style={{
                                        width: `${progreso}%`,
                                    }}
                                ></div>

                            </div>

                            <p className="progress-text">
                                Has completado parte importante de tu formación académica.
                            </p>

                        </div>

                    </div>

                    {/* PRÓXIMA CLASE */}

                    <div className="next-class">

                        <h2>
                            Próxima clase
                        </h2>

                        <div className="class-box">

                            <h3>
                                React Avanzado
                            </h3>

                            <p>
                                Aula 204 · 8:00 AM
                            </p>

                        </div>

                    </div>

                </div>

                {/* RESUMEN */}

                <div className="resume-section">

                    <h2>
                        Resumen académico
                    </h2>

                    <div className="resume-grid">

                        <div className="resume-card">

                            <h3>
                                Créditos
                            </h3>

                            <p>
                                32
                            </p>

                        </div>

                        <div className="resume-card">

                            <h3>
                                Materias
                            </h3>

                            <p>
                                8
                            </p>

                        </div>

                        <div className="resume-card">

                            <h3>
                                Promedio
                            </h3>

                            <p>
                                4.5
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </StudentLayout>
    );
}