// src/services/api.js

const API_URL = "http://localhost:8080/api";

export const endpoints = {
  login: "/usuarios",
  inscripcion: "/inscripciones",
};

export const apiFetch = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error("Error en la petición");
  }

  return response.json();
};