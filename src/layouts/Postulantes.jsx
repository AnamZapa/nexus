import { useState, useEffect } from "react";

import {
    FaCheckCircle,
    FaTimesCircle,
    FaEye,
    FaSearch
} from "react-icons/fa";

import { apiFetch, endpoints } from "../services/api";
import "../styles/Postulantes.css";
import AdminLayout from "./AdminLayout";

const postulantesIniciales = [
    {
        id: 1,
        nombre: "Ana Gómez",
        carrera: "Desarrollo de Software",
        correo: "ana@gmail.com",
        estado: "Pendiente",
        createdAt: "2026-05-20 09:00",
        updatedAt: "2026-05-21 10:30",
        historial: [
            { estado: "Registrado", fecha: "2026-05-20 09:00" },
            { estado: "Pendiente", fecha: "2026-05-21 10:30" }
        ]
    },
    {
        id: 2,
        nombre: "Carlos Ruiz",
        carrera: "Psicología",
        correo: "carlos@gmail.com",
        estado: "Aprobado",
        createdAt: "2026-05-18 08:00",
        updatedAt: "2026-05-22 14:10",
        historial: [
            { estado: "Registrado", fecha: "2026-05-18 08:00" },
            { estado: "Aprobado", fecha: "2026-05-22 14:10" }
        ]
    },
    {
        id: 3,
        nombre: "Laura Pérez",
        carrera: "Derecho",
        correo: "laura@gmail.com",
        estado: "Rechazado",
        createdAt: "2026-05-19 10:00",
        updatedAt: "2026-05-23 16:20",
        historial: [
            { estado: "Registrado", fecha: "2026-05-19 10:00" },
            { estado: "Rechazado", fecha: "2026-05-23 16:20" }
        ]
    }
];

export default function Postulantes() {

    const [postulantes, setPostulantes] =
        useState([]);

    const [busqueda, setBusqueda] =
        useState("");

    const [filtroEstado, setFiltroEstado] =
        useState("Todos");

    const [modalAbierto, setModalAbierto] =
        useState(false);

    const [postulanteSeleccionado, setPostulanteSeleccionado] =
        useState(null);

    const cargarPostulantes = async () => {
        try {
            const data = await apiFetch(endpoints.inscripcion);
            const mapped = data.map((p) => {
                const carrera = p.programaInteres ? p.programaInteres.split("\n")[0].replace("Primer programa: ", "") : "";
                const estado = p.estado === "APROBADO" ? "Aprobado" : p.estado === "RECHAZADO" ? "Rechazado" : "Pendiente";
                return {
                    id: p.id,
                    nombre: p.nombreCompleto,
                    carrera: carrera,
                    correo: p.email || "",
                    estado: estado,
                    createdAt: p.fechaCreacion ? p.fechaCreacion.replace("T", " ").substring(0, 16) : "",
                    updatedAt: p.fechaCreacion ? p.fechaCreacion.replace("T", " ").substring(0, 16) : "",
                    historial: [
                        { estado: "Registrado", fecha: p.fechaCreacion ? p.fechaCreacion.replace("T", " ").substring(0, 16) : "" },
                        { estado: estado, fecha: p.fechaCreacion ? p.fechaCreacion.replace("T", " ").substring(0, 16) : "" }
                    ]
                };
            });
            setPostulantes(mapped);
        } catch (err) {
            console.error("Error al cargar postulantes:", err);
        }
    };

    useEffect(() => {
        cargarPostulantes();
    }, []);

    // 📊 DASHBOARD STATS
    const total = postulantes.length;
    const pendientes = postulantes.filter(p => p.estado === "Pendiente").length;
    const aprobados = postulantes.filter(p => p.estado === "Aprobado").length;
    const rechazados = postulantes.filter(p => p.estado === "Rechazado").length;

    const cambiarEstado = async (id, nuevoEstado) => {
        try {
            const apiEstado = nuevoEstado === "Aprobado" ? "APROBADO" : "RECHAZADO";
            await apiFetch(`${endpoints.inscripcion}/${id}/estado?estado=${apiEstado}`, {
                method: "PUT"
            });
            cargarPostulantes();
        } catch (err) {
            console.error(err);
            alert("Error al cambiar el estado del postulante.");
        }
    };

    const abrirModal = (postulante) => {
        setPostulanteSeleccionado(postulante);
        setModalAbierto(true);
    };

    const cerrarModal = () => {
        setModalAbierto(false);
        setPostulanteSeleccionado(null);
    };

    const postulantesFiltrados = postulantes.filter((p) => {

        const matchBusqueda =
            p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            p.carrera.toLowerCase().includes(busqueda.toLowerCase()) ||
            p.correo.toLowerCase().includes(busqueda.toLowerCase());

        const matchEstado =
            filtroEstado === "Todos" ||
            p.estado === filtroEstado;

        return matchBusqueda && matchEstado;
    });

    return (
        <AdminLayout>

            <div className="postulantes-content">

                {/* TITULO  */}
                <h1 className="titulo-pagina">Gestión de Postulantes</h1>

                {/* DASHBOARD */}
                <div className="dashboard-cards">

                    <div className="card total">
                        <h3>Total</h3>
                        <p>{total}</p>
                    </div>

                    <div className="card pendiente">
                        <h3>Pendientes</h3>
                        <p>{pendientes}</p>
                    </div>

                    <div className="card aprobado">
                        <h3>Aprobados</h3>
                        <p>{aprobados}</p>
                    </div>

                    <div className="card rechazado">
                        <h3>Rechazados</h3>
                        <p>{rechazados}</p>
                    </div>

                </div>

                {/* TOP SECTION */}
                <div className="top-section">

                    <div className="filtro-dropdown">
                        <select
                            value={filtroEstado}
                            onChange={(e) => setFiltroEstado(e.target.value)}
                        >
                            <option value="Todos">Todos los estados</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Aprobado">Aprobados</option>
                            <option value="Rechazado">Rechazados</option>
                        </select>
                    </div>

                    <div className="search-box">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Buscar postulante..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </div>

                </div>

                {/* TABLE */}
                <div className="table-container">

                    <table className="postulantes-table">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Carrera</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {postulantesFiltrados.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>{p.nombre}</td>
                                    <td>{p.correo}</td>
                                    <td>{p.carrera}</td>

                                    <td>
                                        <span className={`estado ${p.estado.toLowerCase()}`}>
                                            {p.estado}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="acciones">

                                            <button
                                                className="btn-view"
                                                onClick={() => abrirModal(p)}
                                            >
                                                <FaEye />
                                            </button>

                                            <button
                                                className="btn-approve"
                                                onClick={() => cambiarEstado(p.id, "Aprobado")}
                                            >
                                                <FaCheckCircle />
                                            </button>

                                            <button
                                                className="btn-reject"
                                                onClick={() => cambiarEstado(p.id, "Rechazado")}
                                            >
                                                <FaTimesCircle />
                                            </button>

                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>

            </div>

            {/* MODAL */}
            {modalAbierto && postulanteSeleccionado && (
                <div className="postulante-modal-overlay">
                    <div className="postulante-modal-content">

                        <h2>Detalle del Postulante</h2>

                        <div className="postulante-modal-info">

                            <p><strong>Inscrito:</strong> {postulanteSeleccionado.createdAt}</p>
                            <p><strong>Actualizado:</strong> {postulanteSeleccionado.updatedAt}</p>

                            <hr />

                            <p><strong>Historial:</strong></p>

                            <div className="historial-timeline">

                                {postulanteSeleccionado.historial.map((h, i) => (
                                    <div key={i} className="historial-item">

                                        <div className="historial-punto"></div>

                                        <div className="historial-contenido">
                                            <span className={`historial-estado ${h.estado.toLowerCase()}`}>
                                                {h.estado}
                                            </span>

                                            <span className="historial-fecha">
                                                {h.fecha}
                                            </span>
                                        </div>

                                    </div>
                                ))}

                            </div>

                        </div>

                        <button
                            className="postulante-btn-close"
                            onClick={cerrarModal}
                        >
                            Cerrar
                        </button>

                    </div>
                </div>
            )}

        </AdminLayout>
    );
}