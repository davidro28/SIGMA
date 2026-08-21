const API_BASE_URL = import.meta.env.VITE_API_URL;


// =========================================================
// CONSTRUIR URL
// =========================================================

function buildUrl(endpoint) {

  if (
    endpoint.startsWith("http://") ||
    endpoint.startsWith("https://")
  ) {
    return endpoint;
  }

  const normalizedEndpoint =
    endpoint.startsWith("/")
      ? endpoint
      : `/${endpoint}`;

  return `${API_BASE_URL}${normalizedEndpoint}`;
}


// =========================================================
// PROCESAR RESPUESTA
// =========================================================

async function parseResponse(response) {

  const contentType =
    response.headers.get("content-type") || "";

  if (
    contentType.includes("application/json")
  ) {
    return response.json();
  }

  const text =
    await response.text();

  return text
    ? { message: text }
    : null;
}


// =========================================================
// API FETCH
// =========================================================

export async function apiFetch(
  endpoint,
  options = {}
) {

  const url =
    buildUrl(endpoint);

  const {
    body,
    token,
    headers,
    ...restOptions
  } = options;


  // -------------------------------------------------------
  // HEADERS
  // -------------------------------------------------------

  const finalHeaders = {
    "Content-Type": "application/json",
    ...(headers || {})
  };


  // -------------------------------------------------------
  // TOKEN
  // -------------------------------------------------------

  /*
   * Ya NO usamos localStorage.
   *
   * El componente que haga la petición
   * debe enviar:
   *
   * token: token
   */

  if (token) {

    finalHeaders.Authorization =
      `Bearer ${token}`;

  }


  // -------------------------------------------------------
  // PETICIÓN
  // -------------------------------------------------------

  const response = await fetch(
    url,
    {
      ...restOptions,

      headers: finalHeaders,

      body:
        body !== undefined
          ? JSON.stringify(body)
          : undefined
    }
  );


  // -------------------------------------------------------
  // RESPUESTA
  // -------------------------------------------------------

  const data =
    await parseResponse(response);


  if (!response.ok) {

    const errorMessage =
      data?.message ||
      `Error HTTP ${response.status}`;

    throw new Error(errorMessage);

  }


  return data;
}


/* =========================================================
   AUTENTICACIÓN
   ========================================================= */

export const authService = {

  login: (usuario, password) =>

    apiFetch(
      "/auth/login",
      {
        method: "POST",

        body: {
          usuario,
          password
        }
      }
    ),


  registrar: (usuario) =>

    apiFetch(
      "/api/usuarios/registrar",
      {
        method: "POST",

        body: usuario
      }
    )

};


/* =========================================================
   USUARIOS
   ========================================================= */

export const usuarioService = {


  // -------------------------------------------------------
  // LISTAR USUARIOS
  // -------------------------------------------------------

  listar: (token) =>

    apiFetch(
      "/api/usuarios",
      {
        token
      }
    ),


  // -------------------------------------------------------
  // USUARIO POR ID
  // -------------------------------------------------------

  obtenerPorId: (
    id,
    token
  ) =>

    apiFetch(
      `/api/usuarios/${id}`,
      {
        token
      }
    ),


  // -------------------------------------------------------
  // USUARIO ACTUAL
  // -------------------------------------------------------

  actual: (token) =>
    apiFetch("/api/usuarios/ActRes", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }),


  // -------------------------------------------------------
  // CAMBIAR ROL
  // -------------------------------------------------------

  cambiarRol: (
    id,
    rol,
    token
  ) =>

    apiFetch(
      `/api/usuarios/${id}/rol`,
      {
        method: "PUT",

        token,

        body: {
          rol
        }
      }
    ),


  // -------------------------------------------------------
  // USUARIOS POR ROL
  // -------------------------------------------------------

  porRol: (
    rol,
    token
  ) =>

    apiFetch(
      `/api/usuarios/por-rol?rol=${encodeURIComponent(rol)}`,
      {
        token
      }
    )

};


/* =========================================================
   ACTIVOS
   ========================================================= */

export const activoService = {


  // -------------------------------------------------------
  // LISTAR ACTIVOS
  // -------------------------------------------------------

  listar: (token) =>
    apiFetch("/api/activos", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }),


  // -------------------------------------------------------
  // ACTIVO POR ID
  // -------------------------------------------------------

  obtenerPorId: (
    id,
    token
  ) =>

    apiFetch(
      `/api/activos/${id}`,
      {
        token
      }
    ),


  // -------------------------------------------------------
  // CREAR ACTIVO
  // -------------------------------------------------------

  crear: (
    activo,
    token
  ) =>

    apiFetch(
      "/api/activos",
      {
        method: "POST",

        token,

        body: activo
      }
    ),


  // -------------------------------------------------------
  // ACTUALIZAR ACTIVO
  // -------------------------------------------------------

  actualizar: (
    id,
    activo,
    token
  ) =>

    apiFetch(
      `/api/activos/${id}`,
      {
        method: "PUT",

        token,

        body: activo
      }
    ),


  // -------------------------------------------------------
  // ASIGNAR RESPONSABLE
  // -------------------------------------------------------

  asignarResponsable: (
    id,
    responsable,
    token
  ) =>

    apiFetch(
      `/api/activos/${id}/responsable`,
      {
        method: "PUT",

        token,

        body: {
          responsable
        }
      }
    ),


  // -------------------------------------------------------
  // ELIMINAR ACTIVO
  // -------------------------------------------------------

  eliminar: (
    id,
    token
  ) =>

    apiFetch(
      `/api/activos/${id}`,
      {
        method: "DELETE",

        token
      }
    )

};


/* =========================================================
   ÓRDENES DE MANTENIMIENTO
   ========================================================= */

export const ordenService = {


  // -------------------------------------------------------
  // LISTAR
  // -------------------------------------------------------

  listar: (token) =>

    apiFetch(
      "/api/ordenes",
      {
        token
      }
    ),


  // -------------------------------------------------------
  // ÓRDENES POR TÉCNICO
  // -------------------------------------------------------

  porTecnico: (
    tecnicoId,
    token
  ) =>

    apiFetch(
      `/api/ordenes/tecnico/${tecnicoId}`,
      {
        token
      }
    ),


  // -------------------------------------------------------
  // ÓRDENES POR EMAIL
  // -------------------------------------------------------

  porEmail: (
    email,
    token
  ) =>

    apiFetch(
      `/api/ordenes/asignado/${encodeURIComponent(email)}`,
      {
        token
      }
    ),


  // -------------------------------------------------------
  // FILTRAR
  // -------------------------------------------------------

  filtrar: (
    estado,
    prioridad,
    token
  ) => {

    const params =
      new URLSearchParams();


    if (estado) {

      params.append(
        "estado",
        estado
      );

    }


    if (prioridad) {

      params.append(
        "prioridad",
        prioridad
      );

    }


    return apiFetch(
      `/api/ordenes/filtrar?${params}`,
      {
        token
      }
    );

  },


  // -------------------------------------------------------
  // CREAR
  // -------------------------------------------------------

  crear: (
    dto,
    token
  ) =>

    apiFetch(
      "/api/ordenes",
      {
        method: "POST",

        token,

        body: dto
      }
    ),


  // -------------------------------------------------------
  // CAMBIAR ESTADO
  // -------------------------------------------------------

  cambiarEstado: (
    id,
    nuevoEstado,
    token
  ) =>

    apiFetch(
      `/api/ordenes/${id}/estado?nuevoEstado=${encodeURIComponent(nuevoEstado)}`,
      {
        method: "PATCH",

        token
      }
    ),


  // -------------------------------------------------------
  // ELIMINAR
  // -------------------------------------------------------

  eliminar: (
    id,
    token
  ) =>

    apiFetch(
      `/api/ordenes/${id}`,
      {
        method: "DELETE",

        token
      }
    )

};


/* =========================================================
   TICKETS
   ========================================================= */

export const ticketService = {

  listar: (token) =>
    apiFetch(
      "/api/tickets",
      {
        token
      }
    ),

  porTecnico: async (tecnicoId, token) => {

    const tickets = await apiFetch(
      "/api/tickets",
      {
        token
      }
    );

    if (!Array.isArray(tickets)) {
      return [];
    }

    return tickets.filter(
      (ticket) =>
        String(ticket.asignadoId || "") ===
        String(tecnicoId)
    );
  },

  obtenerPorId: (id, token) =>
    apiFetch(
      `/api/tickets/${id}`,
      {
        token
      }
    ),

  crear: (dto, token) =>
    apiFetch(
      "/api/tickets",
      {
        method: "POST",
        token,
        body: dto
      }
    ),

  actualizar: (id, dto, token) =>
    apiFetch(
      `/api/tickets/${id}`,
      {
        method: "PUT",
        token,
        body: dto
      }
    ),

  cambiarEstado: (id, nuevoEstado, token) =>
    apiFetch(
      `/api/tickets/${id}/estado?nuevoEstado=${encodeURIComponent(nuevoEstado)}`,
      {
        method: "PATCH",
        token
      }
    ),

  eliminar: (id, token) =>
    apiFetch(
      `/api/tickets/${id}`,
      {
        method: "DELETE",
        token
      }
    )

};