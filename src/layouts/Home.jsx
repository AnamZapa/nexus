import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <div id="banner">
            <section className="hero d-flex align-items-center justify-content-center text-center">
                <div className="container">
                    {/* Título principal: Sin 'text-white' para que mande tu CSS cian */}
                    <h1 className="fw-bold">¡Es hora de inscribirte!</h1>

                    <h2 className="highlight-text">Tu futuro comienza hoy</h2>

                    {/* Subtítulo: Usamos la clase 'subtitle' que definimos para el blanco */}
                    <p className="subtitle fs-5 fw-bold">Programas de primera calidad</p>

                    <Link to="/services" className="btn btn-programa mt-1 fw-bold">
                        Nuestros Programas
                    </Link>
                </div>
            </section>
        </div>
    );
}