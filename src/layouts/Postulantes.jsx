import { useState } from "react";

import {
    FaCheckCircle,
    FaTimesCircle,
    FaEye,
    FaSearch
} from "react-icons/fa";

import "../styles/postulantes.css";
import AdminLayout from "./AdminLayout";

const postulantesIniciales = [
    {
        id: 1,
        nombre: "Ana Gómez",
        carrera: "Desarrollo de Software",
        estado: "Pendiente",
        correo: "ana@gmail.com"
    },
    {
        id: 2,
        nombre: "Carlos Ruiz",
        carrera: "Psicología",
        estado: "Aprobado",
        correo: "carlos@gmail.com"
    },
    {
        id: 3,
        nombre: "Laura Pérez",
        carrera: "Derecho",
        estado: "Rechazado",
        correo: "laura@gmail.com"
    }
];

export default function Postulantes() {

    const [postulantes, setPostulantes] =
        useState(postulantesIniciales);

    const [busqueda, setBusqueda] =
        useState("");

    const [filtroEstado, setFiltroEstado] =
        useState("Todos");

    const [modalAbierto, setModalAbierto] =
        useState(false);

    const [postulanteSeleccionado, setPostulanteSeleccionado] =
        useState(null);

    const [modalCrear, setModalCrear] =
        useState(false);

    const [nuevoPostulante, setNuevoPostulante] =
        useState({
            nombre: "",
            correo: "",
            carrera: ""
        });

    // CAMBIAR ESTADO
    const cambiarEstado = (id, nuevoEstado) => {
        const actualizados = postulantes.map((postulante) => {
            if (postulante.id === id) {
                return {
                    ...postulante,
                    estado: nuevoEstado
                };
            }
            return postulante;
        });

        setPostulantes(actualizados);
    };

    // MODAL DETALLE
    const abrirModal = (postulante) => {
        setPostulanteSeleccionado(postulante);
        setModalAbierto(true);
    };

    const cerrarModal = () => {
        setModalAbierto(false);
        setPostulanteSeleccionado(null);
    };

    // AGREGAR POSTULANTE
    const agregarPostulante = () => {

        if (
            !nuevoPostulante.nombre ||
            !nuevoPostulante.correo ||
            !nuevoPostulante.carrera
        ) return;

        const nuevo = {
            id: postulantes.length + 1,
            nombre: nuevoPostulante.nombre,
            correo: nuevoPostulante.correo,
            carrera: nuevoPostulante.carrera,
            estado: "Pendiente"
        };

        setPostulantes([...postulantes, nuevo]);

        setNuevoPostulante({
            nombre: "",
            correo: "",
            carrera: ""
        });

        setModalCrear(false);
    };

    // 🔥 FILTRO (BUSQUEDA + ESTADO)
    const postulantesFiltrados = postulantes.filter((p) => {

        const coincideBusqueda =
            p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            p.carrera.toLowerCase().includes(busqueda.toLowerCase()) ||
            p.correo.toLowerCase().includes(busqueda.toLowerCase());

        const coincideEstado =
            filtroEstado === "Todos" ||
            p.estado === filtroEstado;

        return coincideBusqueda && coincideEstado;
    });

    return (
        <AdminLayout>

            <main className="postulantes-content">

                <div className="top-section">

                    <h1>Gestión de Postulantes</h1>

                    {/* 🔥 DROPDOWN DE FILTRO */}
                    <div className="filtro-dropdown">

                        <select
                            value={filtroEstado}
                            onChange={(e) => setFiltroEstado(e.target.value)}
                        >
                            <option value="Todos">Todos los estados</option>
                            <option value="Pendiente">Pendiente / En revisión</option>
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
                            {postulantesFiltrados.map((postulante) => (
                                <tr key={postulante.id}>

                                    <td>{postulante.id}</td>
                                    <td>{postulante.nombre}</td>
                                    <td>{postulante.correo}</td>
                                    <td>{postulante.carrera}</td>

                                    <td>
                                        <span
                                            className={`estado ${postulante.estado
                                                .toLowerCase()
                                                .replace(" ", "-")}`}
                                        >
                                            {postulante.estado}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="acciones">

                                            <button
                                                className="btn-view"
                                                onClick={() => abrirModal(postulante)}
                                            >
                                                <FaEye />
                                            </button>

                                            <button
                                                className="btn-approve"
                                                onClick={() =>
                                                    cambiarEstado(postulante.id, "Aprobado")
                                                }
                                            >
                                                <FaCheckCircle />
                                            </button>

                                            <button
                                                className="btn-reject"
                                                onClick={() =>
                                                    cambiarEstado(postulante.id, "Rechazado")
                                                }
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

            </main>

            {/* ================= MODAL DETALLE ================= */}
            {modalAbierto && postulanteSeleccionado && (
                <div className="postulante-modal-overlay">
                    <div className="postulante-modal-content">

                        <h2>Detalle del Postulante</h2>

                        <div className="postulante-modal-info">
                            <p><strong>ID:</strong> {postulanteSeleccionado.id}</p>
                            <p><strong>Nombre:</strong> {postulanteSeleccionado.nombre}</p>
                            <p><strong>Correo:</strong> {postulanteSeleccionado.correo}</p>
                            <p><strong>Carrera:</strong> {postulanteSeleccionado.carrera}</p>
                            <p><strong>Estado:</strong> {postulanteSeleccionado.estado}</p>
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