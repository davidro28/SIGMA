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
    { to: "/Mantenimiento_Admin", label: "Mantenimiento" },
    { to: "/Panel_Admin", label: "Panel de control"}
  ];

  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [filtroPrioridad, setFiltroPrioridad] = useState("Todas");
  const [filtroActivo, setFiltroActivo] = useState("Todos");
  const [filtroResponsable, setFiltroResponsable] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [tickets, setTickets] = useState([]);
  const [activosMap, setActivosMap] = useState({});
  const [usuariosMap, setUsuariosMap] = useState({});
  const [ticketSeleccionado, setTicketSeleccionado] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/tickets")
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Error al obtener tickets");
        }
        return res.json();
      })
      .then(data => setTickets(data))
      .catch(err => console.error("Error tickets:", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/activos")
      .then(res => res.json())
      .then(data => {
        const map = {};
        data.forEach(a => { map[a.id] = a.titulo; });
        setActivosMap(map);
      })
      .catch(err => console.error("Error activos:", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/usuarios")
      .then(res => res.json())
      .then(data => {
        const map = {};
        data.forEach(u => { map[u.id] = u.nombre; });
        setUsuariosMap(map);
      })
      .catch(err => console.error("Error usuarios:", err));
  }, []);

  const ticketsNormalizados = tickets.map(t => ({
    ...t,
    titulo: t.tit,
    estado: t.est || "Abierto",
    prioridad: t.priori,
    tipo: t.tip,
    descripcion: t.descrip,
  }));

  const ticketsFiltrados = ticketsNormalizados.filter(ticket => {
    const matchesBusqueda =
      (ticket.titulo || "").toLowerCase().includes(busqueda.toLowerCase()) ||
      (ticket.id || "").includes(busqueda);
    const matchesEstado = filtroEstado === "Todos" || ticket.estado === filtroEstado;
    const matchesPrioridad = filtroPrioridad === "Todas" || ticket.prioridad === filtroPrioridad;
    const matchesActivo = filtroActivo === "Todos" || ticket.activoId === filtroActivo;
    const matchesResponsable = filtroResponsable === "Todos" || ticket.asignadoId === filtroResponsable;
    return matchesBusqueda && matchesEstado && matchesPrioridad && matchesActivo && matchesResponsable;
  });

  const estadosRapidos = ["Abierto", "En progreso", "Cerrado"];
  const activosUnicos = [...new Set(tickets.map(t => t.activoId).filter(Boolean))];
  const responsablesUnicos = [...new Set(tickets.map(t => t.asignadoId).filter(Boolean))];

  const colorEstado = (estado) => {
    switch (estado) {
      case "Abierto": return "#e67e22";
      case "En progreso": return "#2980b9";
      case "Cerrado": return "#27ae60";
      default: return "#888";
    }
  };

  const colorPrioridad = (prioridad) => {
    switch (prioridad) {
      case "Alta": return "#e74c3c";
      case "Media": return "#f39c12";
      case "Baja": return "#27ae60";
      default: return "#888";
    }
  };

  return (
    <>
      <SigmaHeader />

      <div className="layout-container-adminT">
        <VerticalNav items={menuItems} />

        <div className="page-content tickets-container">

          <div className="header-tickets">
            <h1>Tickets</h1>
            <p>Visualiza, filtra y crea tickets</p>
          </div>

          <div className="filtros-rapidos">
            <h4>Filtros rápidos</h4>
            <div className="busqueda-filtros">
              <input
                type="text"
                placeholder="Buscar..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                className="input-busqueda"
              />
              <div className="grupo-filtro">
                <label>Estado:</label>
                <select onChange={e => setFiltroEstado(e.target.value)}>
                  <option>Todos</option>
                  <option>Abierto</option>
                  <option>En progreso</option>
                  <option>Cerrado</option>
                </select>
              </div>
              <div className="grupo-filtro">
                <label>Prioridad:</label>
                <select onChange={e => setFiltroPrioridad(e.target.value)}>
                  <option>Todas</option>
                  <option>Alta</option>
                  <option>Media</option>
                  <option>Baja</option>
                </select>
              </div>
              <div className="grupo-filtro">
                <label>Activo:</label>
                <select onChange={e => setFiltroActivo(e.target.value)}>
                  <option>Todos</option>
                  {activosUnicos.map((a, i) => (
                    <option key={i}>{a}</option>
                  ))}
                </select>
              </div>
              <div className="grupo-filtro">
                <label>Responsable:</label>
                <select onChange={e => setFiltroResponsable(e.target.value)}>
                  <option>Todos</option>
                  {responsablesUnicos.map((r, i) => (
                    <option key={i}>{r}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="botones-estado-rapido">
              {estadosRapidos.map(estado => (
                <button
                  key={estado}
                  className={`btn-estado-rapido ${filtroEstado === estado ? "active" : ""}`}
                  onClick={() => setFiltroEstado(estado)}
                >
                  {estado}
                </button>
              ))}
            </div>
          </div>

          <table className="tabla-tickets">
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Resumen</th>
                <th>Activo</th>
                <th>Responsable</th>
                <th>Estado</th>
                <th>Prioridad</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {ticketsFiltrados.map(ticket => (
                <tr key={ticket.id}>
                  <td>#{ticket.id?.slice(0, 6)}</td>
                  <td>{ticket.titulo}</td>
                  <td>{activosMap[ticket.activoId] || ticket.activoId || "—"}</td>
                  <td>{usuariosMap[ticket.asignadoId] || ticket.asignadoId || "—"}</td>
                  <td>{ticket.estado}</td>
                  <td>{ticket.prioridad}</td>
                  <td>
                    <button
                      className="btn-ver"
                      onClick={() => setTicketSeleccionado(ticket)}
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
              {ticketsFiltrados.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No se encontraron tickets
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <button
            className="btn-nuevo-ticket"
            onClick={() => navigate("/NuevoTicket")}
          >
            Nuevo ticket
          </button>

        </div>
      </div>

      {ticketSeleccionado && (
        <div className="modal-overlay" onClick={() => setTicketSeleccionado(null)}>
          <div className="modal-ticket" onClick={e => e.stopPropagation()}>

            <div className="modal-header">
              <h2>#{ticketSeleccionado.id?.slice(0, 6)} — {ticketSeleccionado.titulo}</h2>
              <button className="modal-cerrar" onClick={() => setTicketSeleccionado(null)}>✕</button>
            </div>

            <div className="modal-body">

              <div className="modal-badges">
                <span className="badge" style={{ backgroundColor: colorEstado(ticketSeleccionado.estado) }}>
                  {ticketSeleccionado.estado}
                </span>
                <span className="badge" style={{ backgroundColor: colorPrioridad(ticketSeleccionado.prioridad) }}>
                  {ticketSeleccionado.prioridad}
                </span>
                {ticketSeleccionado.tipo && (
                  <span className="badge badge-tipo">{ticketSeleccionado.tipo}</span>
                )}
              </div>

              <div className="modal-grid">
                <div className="modal-field">
                  <span className="modal-label">Activo</span>
                  <span>{activosMap[ticketSeleccionado.activoId] || ticketSeleccionado.activoId || "—"}</span>
                </div>
                <div className="modal-field">
                  <span className="modal-label">Responsable</span>
                  <span>{usuariosMap[ticketSeleccionado.asignadoId] || ticketSeleccionado.asignadoId || "—"}</span>
                </div>
                <div className="modal-field">
                  <span className="modal-label">Solicitante</span>
                  <span>{usuariosMap[ticketSeleccionado.solicitanteId] || ticketSeleccionado.solicitanteId || "—"}</span>
                </div>
                <div className="modal-field">
                  <span className="modal-label">Fecha creación</span>
                  <span>
                    {ticketSeleccionado.fechaCreacion
                      ? new Date(ticketSeleccionado.fechaCreacion).toLocaleDateString("es-CO", {
                          day: "2-digit", month: "short", year: "numeric"
                        })
                      : "—"}
                  </span>
                </div>
              </div>

              <div className="modal-field modal-descripcion">
                <span className="modal-label">Descripción</span>
                <p>{ticketSeleccionado.descripcion || "Sin descripción"}</p>
              </div>

              {ticketSeleccionado.comentario && (
                <div className="modal-field">
                  <span className="modal-label">Comentario</span>
                  <p>{ticketSeleccionado.comentario}</p>
                </div>
              )}

            </div>

            <div className="modal-footer">
              <button className="btn-ver" onClick={() => navigate(`/Ticket/${ticketSeleccionado.id}`)}>
                Ver completo
              </button>
              <button className="modal-cerrar-btn" onClick={() => setTicketSeleccionado(null)}>
                Cerrar
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}