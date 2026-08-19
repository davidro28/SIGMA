const API_BASE_URL = import.meta.env.VITE_API_URL;

function buildUrl(endpoint) {
  if (endpoint.startsWith("http://") || endpoint.startsWith("https://")) {
    return endpoint;
  }

  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;

  return `${API_BASE_URL}${normalizedEndpoint}`;
}

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
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
      "Content-Type": "application/json",
      ...(headers || {})
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    const errorMessage =
      data?.message || `Error HTTP ${response.status}`;

    throw new Error(errorMessage);
  }

  return data;
}

/* =========================================================
   AUTENTICACIÓN
   ========================================================= */

const getToken = () => localStorage.getItem("token");

const authHeaders = () => ({
  Authorization: `Bearer ${getToken()}`
});

export const authService = {

  login: (usuario, password) =>
    apiFetch("/auth/login", {
      method: "POST",
      body: {
        usuario,
        password
      }
    }),

  registrar: (usuario) =>
    apiFetch("/api/usuarios/registrar", {
      method: "POST",
      body: usuario
    })
};


/* =========================================================
   ORDENES DE MANTENIMIENTO
   ========================================================= */

export const ordenService = {

  listar: () =>
    apiFetch("/api/ordenes", {
      headers: authHeaders()
    }),

  porTecnico: (tecnicoId) =>
    apiFetch(`/api/ordenes/tecnico/${tecnicoId}`, {
      headers: authHeaders()
    }),

  porEmail: (email) =>
    apiFetch(`/api/ordenes/asignado/${encodeURIComponent(email)}`, {
      headers: authHeaders()
    }),

  filtrar: (estado, prioridad) => {

    const params = new URLSearchParams();

    if (estado) {
      params.append("estado", estado);
    }

    if (prioridad) {
      params.append("prioridad", prioridad);
    }

    return apiFetch(`/api/ordenes/filtrar?${params}`, {
      headers: authHeaders()
    });
  },

  crear: (dto) =>
    apiFetch("/api/ordenes", {
      method: "POST",
      body: dto,
      headers: authHeaders()
    }),

  cambiarEstado: (id, nuevoEstado) =>
    apiFetch(
      `/api/ordenes/${id}/estado?nuevoEstado=${encodeURIComponent(nuevoEstado)}`,
      {
        method: "PATCH",
        headers: authHeaders()
      }
    ),

  eliminar: (id) =>
    apiFetch(`/api/ordenes/${id}`, {
      method: "DELETE",
      headers: authHeaders()
    })
};


/* =========================================================
   TICKETS
   ========================================================= */

export const ticketService = {

  listar: () =>
    apiFetch("/api/tickets", {
      headers: authHeaders()
    }),

  obtenerPorId: (id) =>
    apiFetch(`/api/tickets/${id}`, {
      headers: authHeaders()
    }),

  crear: (dto) =>
    apiFetch("/api/tickets", {
      method: "POST",
      body: dto,
      headers: authHeaders()
    }),

  actualizar: (id, dto) =>
    apiFetch(`/api/tickets/${id}`, {
      method: "PUT",
      body: dto,
      headers: authHeaders()
    }),

  cambiarEstado: (id, nuevoEstado) =>
    apiFetch(`/api/tickets/${id}/estado?nuevoEstado=${nuevoEstado}`, {
      method: "PATCH",
      headers: authHeaders()
    }),

  eliminar: (id) =>
    apiFetch(`/api/tickets/${id}`, {
      method: "DELETE",
      headers: authHeaders()
    })
};