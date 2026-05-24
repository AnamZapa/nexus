import {
    FaCheckCircle,
    FaTimesCircle,
    FaEye,
    FaSearch
} from "react-icons/fa";

import "../styles/postulantes.css";
import AdminLayout from "./AdminLayout";

const postulantes = [
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

    return (

        <AdminLayout>

            <main className="postulantes-content">

                <div className="top-section">

                    <h1>Gestión de Postulantes</h1>

                    <div className="search-box">
                        <FaSearch />

                        <input
                            type="text"
                            placeholder="Buscar postulante..."
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

                            {postulantes.map((postulante) => (

                                <tr key={postulante.id}>

                                    <td>{postulante.id}</td>

                                    <td>{postulante.nombre}</td>

                                    <td>{postulante.correo}</td>

                                    <td>{postulante.carrera}</td>

                                    <td>

                                        <span
                                            className={`estado ${postulante.estado.toLowerCase()}`}
                                        >
                                            {postulante.estado}
                                        </span>

                                    </td>

                                    <td>

                                        <div className="acciones">

                                            <button className="btn-view">
                                                <FaEye />
                                            </button>

                                            <button className="btn-approve">
                                                <FaCheckCircle />
                                            </button>

                                            <button className="btn-reject">
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

        </AdminLayout>

    );
}