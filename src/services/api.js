// src/services/api.js

const API_URL = "http://localhost:8080/api/v1";

export const endpoints = {
  login: "/usuarios/login",
  registro: "/usuarios/registro",
  inscripcion: "/requests",
  cursos: "/cursos",
  usuarios: "/usuarios",
};

export const apiFetch = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    const errorMsg = await response.text().catch(() => "Error en la petición");
    throw new Error(errorMsg || "Error en la petición");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};