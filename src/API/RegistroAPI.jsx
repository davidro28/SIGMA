const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

function buildUrl(endpoint) {
  if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
    return endpoint;
  }
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${normalizedEndpoint}`;
}

async function parseResponse(response) {
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return response.json();
  }
  const text = await response.text();
  return text ? { message: text } : null;
}

export async function apiFetch(endpoint, options = {}) {
  const url = buildUrl(endpoint);
  const { body, headers, ...restOptions } = options;
  const response = await fetch(url, {
    ...restOptions,
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {})
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await parseResponse(response);
  if (!response.ok) {
    const errorMessage = data?.message || `Error HTTP ${response.status}`;
    throw new Error(errorMessage);
  }
  return data;
}

const getToken = () => localStorage.getItem("token");
const authHeaders = () => ({ Authorization: `Bearer ${getToken()}` });

export const ordenService = {
  listar: () =>
    apiFetch("/ordenes", { headers: authHeaders() }),

  porTecnico: (tecnicoId) =>
    apiFetch(`/ordenes/tecnico/${tecnicoId}`, { headers: authHeaders() }),

  porEmail: (email) =>
    apiFetch(`/ordenes/asignado/${encodeURIComponent(email)}`, { headers: authHeaders() }),

  filtrar: (estado, prioridad) => {
    const params = new URLSearchParams();
    if (estado) params.append("estado", estado);
    if (prioridad) params.append("prioridad", prioridad);
    return apiFetch(`/ordenes/filtrar?${params}`, { headers: authHeaders() });
  },

  crear: (dto) =>
    apiFetch("/ordenes", { method: "POST", body: dto, headers: authHeaders() }),

  cambiarEstado: (id, nuevoEstado) =>
    apiFetch(`/ordenes/${id}/estado?nuevoEstado=${nuevoEstado}`, {
      method: "PATCH",
      headers: authHeaders()
    }),

  eliminar: (id) =>
    apiFetch(`/ordenes/${id}`, { method: "DELETE", headers: authHeaders() })
};

export const ticketService = {
  listar: () =>
    apiFetch("/tickets", { headers: authHeaders() }),

  porTecnico: (tecnicoId) =>
    apiFetch(`/tickets/tecnico/${tecnicoId}`, { headers: authHeaders() }),

  porEmail: (email) =>
    apiFetch(`/tickets/asignado/${encodeURIComponent(email)}`, { headers: authHeaders() }),

  filtrar: (estado, prioridad) => {
    const params = new URLSearchParams();
    if (estado) params.append("estado", estado);
    if (prioridad) params.append("prioridad", prioridad);
    return apiFetch(`/tickets/filtrar?${params}`, { headers: authHeaders() });
  },

  crear: (dto) =>
    apiFetch("/tickets", { method: "POST", body: dto, headers: authHeaders() }),

  cambiarEstado: (id, nuevoEstado) =>
    apiFetch(`/tickets/${id}/estado?nuevoEstado=${nuevoEstado}`, {
      method: "PATCH",
      headers: authHeaders()
    }),

  eliminar: (id) =>
    apiFetch(`/tickets/${id}`, { method: "DELETE", headers: authHeaders() })
};