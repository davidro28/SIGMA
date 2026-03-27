// 1) URL base de tu backend.
//    Si existe VITE_API_URL en .env, usa esa.
//    Si no existe, usa localhost como respaldo.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// 2) Función auxiliar para construir URL final.
//    Permite usar endpoints relativos como "/auth/register"
//    o URLs completas como "https://otro-back.com/auth/register".
function buildUrl(endpoint) {
  if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
    return endpoint;
  }

  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${normalizedEndpoint}`;
}

// 3) Función auxiliar para interpretar la respuesta.
//    Si viene JSON -> parsea JSON.
//    Si viene texto -> devuelve objeto con message.
async function parseResponse(response) {
  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    return response.json();
  }

  const text = await response.text();
  return text ? { message: text } : null;
}

// 4) Método genérico principal.
//    endpoint: string (ej: "/auth/register")
//    options: method, headers, body, etc.
export async function apiFetch(endpoint, options = {}) {
  const url = buildUrl(endpoint);

  // Separamos body y headers para tratarlos de forma controlada.
  const { body, headers, ...restOptions } = options;

  const response = await fetch(url, {
    ...restOptions,
    headers: {
      // Header por defecto para JSON
      'Content-Type': 'application/json',
      // Si envías headers extra, sobrescriben o se agregan aquí
      ...(headers || {})
    },
    // Si hay body, lo convertimos a JSON string
    body: body ? JSON.stringify(body) : undefined
  });

  // Intentamos leer el contenido de la respuesta
  const data = await parseResponse(response);

  // Si status es 4xx/5xx, lanzamos error para manejarlo en el formulario
  if (!response.ok) {
    const errorMessage = data?.message || `Error HTTP ${response.status}`;
    throw new Error(errorMessage);
  }

  // Si todo bien, devolvemos data (objeto JSON o null)
  return data;
}