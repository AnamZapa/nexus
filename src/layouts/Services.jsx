import React from 'react';
import Card from '../components/Card';
import { careers } from '../data/career';

export default function Services() {
    return (
        <main className="services-main">
            <div className="services-header">
                <h1 className="services-titulo">¡Bienvenido!</h1>
                <p className="subtitle">Conoce nuestros programas académicos</p>
            </div>

            <section className="program-grid">
                {careers.map((career) => (
                    <Card
                        key={career.id}
                        nombre={career.title}
                        semestres={career.duration}
                        clase="program-card"
                    />
                ))}
            </section>
        </main>
    );
}