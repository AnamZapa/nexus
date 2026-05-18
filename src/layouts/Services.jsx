import React from 'react';
import Card from '../components/Card';
import { careers } from '../data/career';

export default function Services() {
    return (
        <main>
            <h1>¡Bienvenido!</h1>
            <p className="subtitle">Conoce nuestros programas</p>

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