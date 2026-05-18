import React from 'react';
import { Link } from 'react-router-dom';


export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-custom fixed-top">
            <div className="container-fluid px-4">
                {/* Logo */}
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img
                        src="/src/assets/Imagenes/logo nexus blanco-01.png"
                        alt="Logo"
                        className="logo-icon"
                    />
                </Link>

                {/* Botón Hamburguesa para Móvil */}
                <button
                    className="navbar-toggler text-white"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-between align-items-center" id="navbarContent">
                    {/* Buscador - Fíjate en el style */}
                    <form className="d-flex mx-auto my-2 my-lg-0" style={{ maxWidth: '500px', width: '100%' }}>
                        <div className="input-group">
                            <input
                                className="form-control search-bar"
                                type="search"
                                placeholder="¿Qué quieres aprender?"
                                aria-label="Buscar"
                            />
                        </div>
                    </form>

                    {/* Enlaces de la derecha */}
                    <div className="d-flex align-items-center mt-2 mt-lg-0">
                        <Link to="/" className="nav-link text-white me-3">
                            Inicio
                        </Link>
                        <Link to="/login" className="btn btn-light">
                            Portal Universitario
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}