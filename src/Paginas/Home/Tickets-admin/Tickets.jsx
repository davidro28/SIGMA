import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VerticalNav from "../../../Components/verticalNav/index.jsx";
import SigmaHeader from "../../../Components/sigmaHeader";
import "./Tickets.css";

export default function Tickets() {
  const navigate = useNavigate();

  const menuItems = [
    { to: "/General", label: "General" },
    { to: "/Activos", label: "Activos" },
    { to: "/Tickets", label: "Tickets" },
    { to: "/Mantenimiento", label: "Mantenimiento" }
  ];

  // FILTROS
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [filtroPrioridad, setFiltroPrioridad] = useState("Todas");
  const [filtroActivo, setFiltroActivo] = useState("Todos");
  const [filtroResponsable, setFiltroResponsable] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  // TICKETS DESDE LOCALSTORAGE
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("tickets")) || [];
    setTickets(data);
  }, []);

  // FILTRAR
  const ticketsFiltrados = tickets.filter(ticket => {
    const matchesBusqueda =
      ticket.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      ticket.id.toString().includes(busqueda);

    const matchesEstado =
      filtroEstado === "Todos" || ticket.estado === filtroEstado;

    const matchesPrioridad =
      filtroPrioridad === "Todas" || ticket.prioridad === filtroPrioridad;

    const matchesActivo =
      filtroActivo === "Todos" || ticket.activo === filtroActivo;

    const matchesResponsable =
      filtroResponsable === "Todos" || ticket.responsable === filtroResponsable;

    return matchesBusqueda && matchesEstado && matchesPrioridad && matchesActivo && matchesResponsable;
  });

  const estadosRapidos = ["Abierto", "En progreso", "Cerrado"];

  // Obtener valores únicos para filtros dinámicos
  const activosUnicos = [...new Set(tickets.map(t => t.activo).filter(Boolean))];
  const responsablesUnicos = [...new Set(tickets.map(t => t.responsable).filter(Boolean))];

  return (
    <>
      <SigmaHeader />

      <div className="layout-container">
        <VerticalNav items={menuItems} />

        <div className="page-content tickets-container">

          {/* TITULO */}
          <div className="header-tickets">
            <h1>Tickets</h1>
            <p>Visualiza, filtra y crea tickets para incidentes y solicitudes</p>
          </div>

          {/* FILTROS */}
          <div className="filtros-rapidos">
            <h4>Filtros rápidos</h4>
            <p className="descripcion-filtros">
              Encuentra tickets por estado, prioridad, activo o responsable
            </p>

            <div className="busqueda-filtros">
              <input
                type="text"
                placeholder="Buscar por código o título..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                className="input-busqueda"
              />

              <div className="grupo-filtro">
                <label>Estado:</label>
                <select value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)}>
                  <option>Todos</option>
                  <option>Abierto</option>
                  <option>En progreso</option>
                  <option>Cerrado</option>
                </select>
              </div>

              <div className="grupo-filtro">
                <label>Prioridad:</label>
                <select
                  value={filtroPrioridad}
                  onChange={e => setFiltroPrioridad(e.target.value)}
                >
                  <option>Todas</option>
                  <option>Alta</option>
                  <option>Media</option>
                  <option>Baja</option>
                </select>
              </div>

              <div className="grupo-filtro">
                <label>Activo:</label>
                <select
                  value={filtroActivo}
                  onChange={e => setFiltroActivo(e.target.value)}
                >
                  <option>Todos</option>
                  {activosUnicos.map((a, i) => (
                    <option key={i}>{a}</option>
                  ))}
                </select>
              </div>

              <div className="grupo-filtro">
                <label>Responsable:</label>
                <select
                  value={filtroResponsable}
                  onChange={e => setFiltroResponsable(e.target.value)}
                >
                  <option>Todos</option>
                  {responsablesUnicos.map((r, i) => (
                    <option key={i}>{r}</option>
                  ))}
                </select>
              </div>

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

            <div className="botones-estado-rapido">
              {estadosRapidos.map(estado => (
                <button
                  key={estado}
                  className={`btn-estado-rapido ${
                    filtroEstado === estado ? "active" : ""
                  }`}
                  onClick={() => setFiltroEstado(estado)}
                >
                  {estado}
                </button>
              ))}
            </div>
          </div>

          {/* TABLA */}
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
              {ticketsFiltrados.map(ticket => (
                <tr key={ticket.id}>
                  <td>#{ticket.id.slice(0, 6)}</td>
                  <td>{ticket.titulo}</td>
                  <td>{ticket.activo || "—"}</td>
                  <td>{ticket.responsable || "—"}</td>
                  <td>
                    <span
                      className={`estado estado-${
                        (ticket.estado || "Abierto").toLowerCase().replace(/ /g, "-")
                      }`}
                    >
                      {ticket.estado || "Abierto"}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`prioridad prioridad-${ticket.prioridad.toLowerCase()}`}
                    >
                      {ticket.prioridad}
                    </span>
                  </td>

                  <td>{ticket.fecha}</td>

                  <td>
                    <button
                      className="btn-ver"
                      onClick={() => navigate(`/Ticket/${ticket.id}`, { state: ticket })}
                    >
                        Ver
                    </button>
                  </td>
                </tr>
              ))}

              {ticketsFiltrados.length === 0 && (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center" }}>
                    No se encontraron tickets.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="paginacion">
            <button disabled>Anterior</button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>Siguiente</button>
          </div>

          <button
            className="btn-nuevo-ticket"
            onClick={() => navigate("/NuevoTicket")}
          >
            Nuevo ticket
          </button>
        </div>
      </div>
    </>
  );
}
