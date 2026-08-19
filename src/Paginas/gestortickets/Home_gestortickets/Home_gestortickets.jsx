import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VerticalNav from "../../../Components/verticalNav";
import SigmaHeader from "../../../Components/sigmaHeader";
import { ticketService } from "../../../API/RegistroAPI";
import "./Home_gestortickets.css";

export default function Tickets() {
  const navigate = useNavigate();

  const menuItems = [
    { to: "/Home_gestortickets", label: "General" },
    { to: "/MantenimientoGestor", label: "Mantenimiento" },
  ];

  const [tickets, setTickets] = useState([]);
  const [ticketSeleccionado, setTicketSeleccionado] = useState(null);

  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [filtroPrioridad, setFiltroPrioridad] = useState("Todas");
  const [filtroActivo, setFiltroActivo] = useState("Todos");
  const [filtroResponsable, setFiltroResponsable] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  // =========================================================
  // CARGAR TICKETS DESDE EL BACKEND
  // =========================================================
  useEffect(() => {
    cargarTickets();
  }, []);

  const cargarTickets = async () => {
    try {
      const data = await ticketService.listar();

      const normalizados = data.map((t) => ({
        ...t,

        // Campos que vienen del TicketDto
        titulo: t.tit,
        descripcion: t.descrip,
        tipo: t.tip,
        estado: t.est,
        prioridad: t.priori,

        activoId: t.activoId,
        activoNombre: t.activoNombre,

        asignadoId: t.asignadoId,
        responsableNombre: t.responsableNombre,

        solicitanteId: t.solicitanteId,

        fechaCreacion: t.fechaCreacion,
        fechaActualizacion: t.fechaActualizacion,
        fechaCierre: t.fechaCierre,

        comentario: t.comentario,
        archivoNombre: t.archivoNombre,
      }));

      setTickets(normalizados);
    } catch (error) {
      console.error("Error al obtener tickets:", error);
    }
  };

  // =========================================================
  // FILTROS
  // =========================================================
  const ticketsFiltrados = tickets.filter((ticket) => {
    const textoBusqueda = busqueda.toLowerCase();

    const matchesBusqueda =
      (ticket.titulo || "")
        .toLowerCase()
        .includes(textoBusqueda) ||
      (ticket.id || "")
        .toLowerCase()
        .includes(textoBusqueda);

    const matchesEstado =
      filtroEstado === "Todos" ||
      ticket.estado === filtroEstado;

    const matchesPrioridad =
      filtroPrioridad === "Todas" ||
      ticket.prioridad === filtroPrioridad;

    const matchesActivo =
      filtroActivo === "Todos" ||
      ticket.activoId === filtroActivo;

    const matchesResponsable =
      filtroResponsable === "Todos" ||
      ticket.asignadoId === filtroResponsable;

    return (
      matchesBusqueda &&
      matchesEstado &&
      matchesPrioridad &&
      matchesActivo &&
      matchesResponsable
    );
  });

  // =========================================================
  // ESTADOS
  // =========================================================
  const estadosRapidos = [
    "ABIERTO",
    "EN_PROGRESO",
    "CERRADO",
  ];

  // =========================================================
  // ACTIVOS ÚNICOS
  // =========================================================
  const activosUnicos = Array.from(
    new Map(
      tickets
        .filter((t) => t.activoId)
        .map((t) => [
          t.activoId,
          {
            id: t.activoId,
            nombre: t.activoNombre || t.activoId,
          },
        ])
    ).values()
  );

  // =========================================================
  // RESPONSABLES ÚNICOS
  // =========================================================
  const responsablesUnicos = Array.from(
    new Map(
      tickets
        .filter((t) => t.asignadoId)
        .map((t) => [
          t.asignadoId,
          {
            id: t.asignadoId,
            nombre: t.responsableNombre || t.asignadoId,
          },
        ])
    ).values()
  );

  // =========================================================
  // COLORES
  // =========================================================
  const colorEstado = (estado) => {
    switch (estado) {
      case "ABIERTO":
        return "#e67e22";

      case "EN_PROGRESO":
        return "#2980b9";

      case "CERRADO":
        return "#27ae60";

      default:
        return "#888";
    }
  };

  const colorPrioridad = (prioridad) => {
    switch (prioridad) {
      case "ALTA":
        return "#e74c3c";

      case "MEDIA":
        return "#f39c12";

      case "BAJA":
        return "#27ae60";

      default:
        return "#888";
    }
  };

  // =========================================================
  // RENDER
  // =========================================================
  return (
    <>
      <SigmaHeader />

      <div className="layout-container-gestor">

        <VerticalNav items={menuItems} />

        <div className="page-content-gestor tickets-container">

          {/* ================= HEADER ================= */}
          <div className="header-tickets-gestor">

            <h1>Tickets</h1>

            <p>
              Visualiza, filtra y crea tickets para
              incidentes y solicitudes.
            </p>

          </div>

          {/* ================= FILTROS ================= */}
          <div className="filtros-rapidos-gestor">

            <h4>Filtros rápidos</h4>

            <p className="descripcion-filtros">
              Encuentra tickets por estado,
              prioridad, activo o responsable.
            </p>

            <div className="busqueda-filtros">

              {/* BUSCAR */}
              <input
                className="input-busqueda"
                type="text"
                placeholder="Buscar por código o título..."
                value={busqueda}
                onChange={(e) =>
                  setBusqueda(e.target.value)
                }
              />

              {/* ESTADO */}
              <div className="grupo-filtro-gestor">

                <label>Estado</label>

                <select
                  value={filtroEstado}
                  onChange={(e) =>
                    setFiltroEstado(e.target.value)
                  }
                >
                  <option value="Todos">
                    Todos
                  </option>

                  <option value="ABIERTO">
                    ABIERTO
                  </option>

                  <option value="EN_PROGRESO">
                    EN_PROGRESO
                  </option>

                  <option value="CERRADO">
                    CERRADO
                  </option>

                </select>

              </div>

              {/* PRIORIDAD */}
              <div className="grupo-filtro-gestor">

                <label>Prioridad</label>

                <select
                  value={filtroPrioridad}
                  onChange={(e) =>
                    setFiltroPrioridad(e.target.value)
                  }
                >
                  <option value="Todas">
                    Todas
                  </option>

                  <option value="ALTA">
                    ALTA
                  </option>

                  <option value="MEDIA">
                    MEDIA
                  </option>

                  <option value="BAJA">
                    BAJA
                  </option>

                </select>

              </div>

              {/* ACTIVO */}
              <div className="grupo-filtro-gestor">

                <label>Activo</label>

                <select
                  value={filtroActivo}
                  onChange={(e) =>
                    setFiltroActivo(e.target.value)
                  }
                >
                  <option value="Todos">
                    Todos
                  </option>

                  {activosUnicos.map((activo) => (
                    <option
                      key={activo.id}
                      value={activo.id}
                    >
                      {activo.nombre}
                    </option>
                  ))}

                </select>

              </div>

              {/* RESPONSABLE */}
              <div className="grupo-filtro-gestor">

                <label>Responsable</label>

                <select
                  value={filtroResponsable}
                  onChange={(e) =>
                    setFiltroResponsable(e.target.value)
                  }
                >
                  <option value="Todos">
                    Todos
                  </option>

                  {responsablesUnicos.map((responsable) => (
                    <option
                      key={responsable.id}
                      value={responsable.id}
                    >
                      {responsable.nombre}
                    </option>
                  ))}

                </select>

              </div>

              {/* LIMPIAR */}
              <button
                className="btn-limpiar"
                onClick={() => {
                  setFiltroEstado("Todos");
                  setFiltroPrioridad("Todas");
                  setFiltroActivo("Todos");
                  setFiltroResponsable("Todos");
                  setBusqueda("");
                }}
              >
                Limpiar filtros
              </button>

            </div>

            {/* ESTADOS RÁPIDOS */}
            <div className="botones-estado-rapido">

              {estadosRapidos.map((estado) => (

                <button
                  key={estado}
                  className={`btn-estado-rapido ${
                    filtroEstado === estado
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setFiltroEstado(estado)
                  }
                >
                  {estado}
                </button>

              ))}

            </div>

          </div>

          {/* ================= TABLA ================= */}
          <table className="tabla-tickets">

            <thead>

              <tr>
                <th>Ticket</th>
                <th>Resumen</th>
                <th>Activo</th>
                <th>Responsable</th>
                <th>Estado</th>
                <th>Prioridad</th>
                <th>Actualizado</th>
                <th></th>
              </tr>

            </thead>

            <tbody>

              {ticketsFiltrados.map((ticket) => (

                <tr key={ticket.id}>

                  <td>
                    #{ticket.id?.slice(0, 6)}
                  </td>

                  <td>
                    {ticket.titulo}
                  </td>

                  <td>
                    {ticket.activoNombre || "—"}
                  </td>

                  <td>
                    {ticket.responsableNombre || "—"}
                  </td>

                  <td>

                    <span
                      className="estado"
                      style={{
                        background: colorEstado(ticket.estado),
                        color: "#fff",
                        padding: "5px 10px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      {ticket.estado}
                    </span>

                  </td>

                  <td>

                    <span
                      className="prioridad"
                      style={{
                        background: colorPrioridad(ticket.prioridad),
                        color: "#fff",
                        padding: "5px 10px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      {ticket.prioridad}
                    </span>

                  </td>

                  <td>

                    {ticket.fechaActualizacion
                      ? new Date(
                          ticket.fechaActualizacion
                        ).toLocaleString()
                      : "—"}

                  </td>

                  <td>

                    <button
                      className="btn-ver"
                      onClick={() =>
                        setTicketSeleccionado(ticket)
                      }
                    >
                      Ver
                    </button>

                  </td>

                </tr>

              ))}

              {ticketsFiltrados.length === 0 && (

                <tr>

                  <td
                    colSpan="8"
                    style={{
                      textAlign: "center",
                    }}
                  >
                    No se encontraron tickets.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

          {/* ================= NUEVO TICKET ================= */}
          <button
            className="btn-nuevo-ticket"
            onClick={() =>
              navigate("/NuevoTicketGestor")
            }
          >
            Nuevo ticket
          </button>

        </div>

      </div>

      {/* ================= MODAL ================= */}
      {ticketSeleccionado && (

        <div
          className="modal-overlay"
          onClick={() =>
            setTicketSeleccionado(null)
          }
        >

          <div
            className="modal-ticket"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <h2>
                #{ticketSeleccionado.id?.slice(0, 6)} —{" "}
                {ticketSeleccionado.titulo}
              </h2>

              <button
                className="modal-cerrar"
                onClick={() =>
                  setTicketSeleccionado(null)
                }
              >
                ✕
              </button>

            </div>

            <div className="modal-body">

              <div className="modal-badges">

                <span
                  className="badge"
                  style={{
                    background: colorEstado(
                      ticketSeleccionado.estado
                    ),
                  }}
                >
                  {ticketSeleccionado.estado}
                </span>

                <span
                  className="badge"
                  style={{
                    background: colorPrioridad(
                      ticketSeleccionado.prioridad
                    ),
                  }}
                >
                  {ticketSeleccionado.prioridad}
                </span>

                {ticketSeleccionado.tipo && (
                  <span className="badge badge-tipo">
                    {ticketSeleccionado.tipo}
                  </span>
                )}

              </div>

              <div className="modal-grid">

                <div className="modal-field">

                  <span className="modal-label">
                    Activo
                  </span>

                  <span>
                    {ticketSeleccionado.activoNombre || "—"}
                  </span>

                </div>

                <div className="modal-field">

                  <span className="modal-label">
                    Responsable
                  </span>

                  <span>
                    {ticketSeleccionado.responsableNombre || "—"}
                  </span>

                </div>

                <div className="modal-field">

                  <span className="modal-label">
                    Solicitante
                  </span>

                  <span>
                    {ticketSeleccionado.solicitanteId || "—"}
                  </span>

                </div>

                <div className="modal-field">

                  <span className="modal-label">
                    Fecha creación
                  </span>

                  <span>
                    {ticketSeleccionado.fechaCreacion
                      ? new Date(
                          ticketSeleccionado.fechaCreacion
                        ).toLocaleString()
                      : "—"}
                  </span>

                </div>

              </div>

              <div className="modal-field modal-descripcion">

                <span className="modal-label">
                  Descripción
                </span>

                <p>
                  {ticketSeleccionado.descripcion ||
                    "Sin descripción"}
                </p>

              </div>

              {ticketSeleccionado.comentario && (

                <div className="modal-field">

                  <span className="modal-label">
                    Comentario
                  </span>

                  <p>
                    {ticketSeleccionado.comentario}
                  </p>

                </div>

              )}

            </div>

            <div className="modal-footer">

              <button
                className="btn-ver"
                onClick={() =>
                  navigate(
                    `/DetalleGestor/${ticketSeleccionado.id}`,
                    {
                      state: ticketSeleccionado,
                    }
                  )
                }
              >
                Ver completo
              </button>

              <button
                className="modal-cerrar-btn"
                onClick={() =>
                  setTicketSeleccionado(null)
                }
              >
                Cerrar
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
}