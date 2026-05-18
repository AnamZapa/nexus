import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="footer-nexus py-4">
            <div className="footer-container">
                <div className="footer-item">
                    <i className="bi bi-telephone-fill"></i>
                    <span>Medellín: (604) 000 000</span>
                </div>
                <div className="footer-item">
                    <i className="bi bi-envelope-fill"></i>
                    <span>comunicaciones@nexus.com.co</span>
                </div>
                <div className="footer-copyright">
                    © 2026 Nexus Software
                </div>
            </div>
        </footer>
    );
}
