import { useEffect, useState } from "react";
import { apiFetch, endpoints } from "../services/api";

export default function Services() {

  const [services, setServices] = useState([]);

  useEffect(() => {

    const loadServices = async () => {
      const data = await apiFetch(endpoints.services);
      setServices(data || []);
    };

    loadServices();

  }, []);

  return (
    <div>
      <h2>Servicios</h2>

      {services.map((service) => (
        <p key={service.id}>{service.name}</p>
      ))}
    </div>
  );
}