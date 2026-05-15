const BASE_URL = "http://localhost:8080";

const getToken = () => localStorage.getItem("token");

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`
});

// ==================
// TICKETS
// ==================
export const ticketService = {

  listar: () =>
    fetch(`${BASE_URL}/api/tickets`, { headers: headers() })
      .then(r => r.json()),

  filtrar: (estado, prioridad) => {
    const params = new URLSearchParams();
    if (estado) params.append("estado", estado);
    if (prioridad) params.append("prioridad", prioridad);
    return fetch(`${BASE_URL}/api/tickets/filtrar?${params}`, { headers: headers() })
      .then(r => r.json());
  },

  porTecnico: (tecnicoId) =>
    fetch(`${BASE_URL}/api/tickets/tecnico/${tecnicoId}`, { headers: headers() })
      .then(r => r.json()),

  contarPorTecnico: (tecnicoId) =>
    fetch(`${BASE_URL}/api/tickets/tecnico/${tecnicoId}/count`, { headers: headers() })
      .then(r => r.json()),

  crear: (dto) =>
    fetch(`${BASE_URL}/api/tickets`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(dto)
    }).then(r => r.json()),

  cambiarEstado: (id, nuevoEstado) =>
    fetch(`${BASE_URL}/api/tickets/${id}/estado?nuevoEstado=${nuevoEstado}`, {
      method: "PATCH",
      headers: headers()
    }).then(r => r.json()),

  eliminar: (id) =>
    fetch(`${BASE_URL}/api/tickets/${id}`, {
      method: "DELETE",
      headers: headers()
    })
};

// ==================
// MANTENIMIENTO
// ==================
export const ordenService = {

  listar: () =>
    fetch(`${BASE_URL}/api/ordenes`, { headers: headers() })
      .then(r => r.json()),

  filtrar: (estado, prioridad) => {
    const params = new URLSearchParams();
    if (estado) params.append("estado", estado);
    if (prioridad) params.append("prioridad", prioridad);
    return fetch(`${BASE_URL}/api/ordenes/filtrar?${params}`, { headers: headers() })
      .then(r => r.json());
  },

  porTecnico: (tecnicoId) =>
    fetch(`${BASE_URL}/api/ordenes/tecnico/${tecnicoId}`, { headers: headers() })
      .then(r => r.json()),

  crear: (dto) =>
    fetch(`${BASE_URL}/api/ordenes`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(dto)
    }).then(r => r.json()),

  cambiarEstado: (id, nuevoEstado) =>
    fetch(`${BASE_URL}/api/ordenes/${id}/estado?nuevoEstado=${nuevoEstado}`, {
      method: "PATCH",
      headers: headers()
    }).then(r => r.json()),

  eliminar: (id) =>
    fetch(`${BASE_URL}/api/ordenes/${id}`, {
      method: "DELETE",
      headers: headers()
    })
};