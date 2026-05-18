import React from 'react';
import { Link } from 'react-router-dom';
import { careers } from "../data/career";

export default function Card({ nombre, semestres, clase }) {

    const career = careers.find(
        (c) => c.title === nombre
    );

    if (!career) return null;

    return (
        <Link to={`/programa/${career.id}`} className={clase}>
            <div className="program">
                <img src={career.icon} alt={career.title} />
                <p>{career.title}</p>
                <span>{semestres}</span>
            </div>
        </Link>
    );
}