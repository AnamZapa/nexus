// src/services/api.js

const API_URL = "http://localhost:3000"; // cambia luego si tienes backend

export const endpoints = {
  login: "/login",
  services: "/services",
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