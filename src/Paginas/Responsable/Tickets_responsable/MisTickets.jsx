import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VerticalNav from "../../../Components/verticalNav/index";
import SigmaHeader from "../../../Components/sigmaHeader/index";
import "./MisTickets.css";

export default function MisTickets() {
  const navigate = useNavigate();

  const menuItems = [
    { to: "/Home_responsable", label: "General" },
    { to: "/Activos_responsable", label: "Activos" },
    { to: "/MisTickets", label: "Tickets" }
  ];

  const [tickets, setTickets] = useState([]);

  // FILTROS
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [filtroPrioridad, setFiltroPrioridad] = useState("Todas");
  const [filtroActivo, setFiltroActivo] = useState("Todos");
  const [filtroResponsable, setFiltroResponsable] = useState("Todos");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("MisTickets")) || [];
    setTickets(data);
  }, []);

  const limpiarFiltros = () => {
    setBusqueda("");
    setFiltroEstado("Todos");
    setFiltroPrioridad("Todas");
    setFiltroActivo("Todos");
    setFiltroResponsable("Todos");
  };

  const ticketsFiltrados = tickets.filter(t => {
    const matchBusqueda =
      t.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      t.id.includes(busqueda);

    const matchEstado =
      filtroEstado === "Todos" || t.estado === filtroEstado;

    const matchPrioridad =
      filtroPrioridad === "Todas" || t.prioridad === filtroPrioridad;

    const matchActivo =
      filtroActivo === "Todos" || t.activo === filtroActivo;

    const matchResponsable =
      filtroResponsable === "Todos" || t.responsable === filtroResponsable;

    return (
      matchBusqueda &&
      matchEstado &&
      matchPrioridad &&
      matchActivo &&
      matchResponsable
    );
  });

  const activosUnicos = [...new Set(tickets.map(t => t.activo).filter(Boolean))];
  const responsablesUnicos = [...new Set(tickets.map(t => t.responsable).filter(Boolean))];

  return (
    <>
      <SigmaHeader />

      <div className="layout-container-respo">
        <VerticalNav items={menuItems} />

        <main className="page-content">
          {/* HEADER */}
          <div className="header-tickets">
            <h1>Mis Tickets</h1>
            <p>Gestiona tus solicitudes e incidentes</p>
          </div>

          {/* FILTROS */}
          <section className="filtros-rapidos">
            <h4>Filtros rápidos</h4>
            <p className="descripcion-filtros">
              Filtra por estado, prioridad, activo o responsable
            </p>

            <div className="busqueda-filtros">
              <input
                className="input-busqueda"
                placeholder="Buscar por código o título"
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
              />

              <div className="grupo-filtro">
                <label>Estado</label>
                <select value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)}>
                  <option>Todos</option>
                  <option>Abierto</option>
                  <option>En progreso</option>
                  <option>Cerrado</option>
                </select>
              </div>

              <div className="grupo-filtro">
                <label>Prioridad</label>
                <select value={filtroPrioridad} onChange={e => setFiltroPrioridad(e.target.value)}>
                  <option>Todas</option>
                  <option>Alta</option>
                  <option>Media</option>
                  <option>Baja</option>
                </select>
              </div>

              <div className="grupo-filtro">
                <label>Activo</label>
                <select value={filtroActivo} onChange={e => setFiltroActivo(e.target.value)}>
                  <option>Todos</option>
                  {activosUnicos.map((a, i) => (
                    <option key={i}>{a}</option>
                  ))}
                </select>
              </div>

              <div className="grupo-filtro">
                <label>Responsable</label>
                <select value={filtroResponsable} onChange={e => setFiltroResponsable(e.target.value)}>
                  <option>Todos</option>
                  {responsablesUnicos.map((r, i) => (
                    <option key={i}>{r}</option>
                  ))}
                </select>
              </div>

              <button className="btn-limpiar" onClick={limpiarFiltros}>
                Limpiar filtros
              </button>
            </div>
          </section>

          {/* TABLA */}
          <table className="tabla-tickets">
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Título</th>
                <th>Activo</th>
                <th>Estado</th>
                <th>Prioridad</th>
                <th>Fecha</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {ticketsFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No hay tickets para mostrar
                  </td>
                </tr>
              ) : (
                ticketsFiltrados.map(ticket => (
                  <tr key={ticket.id}>
                    <td>#{ticket.id.slice(0, 6)}</td>
                    <td>{ticket.titulo}</td>
                    <td>{ticket.activo || "—"}</td>
                    <td>
                      <span className={`estado estado-${ticket.estado.toLowerCase().replace(/ /g, "-")}`}>
                        {ticket.estado}
                      </span>
                    </td>
                    <td>
                      <span className={`prioridad prioridad-${ticket.prioridad.toLowerCase()}`}>
                        {ticket.prioridad}
                      </span>
                    </td>
                    <td>{ticket.fecha}</td>
                    <td>
                      <button
                        className="btn-ver"
                        onClick={() => navigate(`/DetalleMisTickets/${ticket.id}`)}
                      >
                        Ver
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <button
            className="btn-nuevo-ticket"
            onClick={() => navigate("/NuevoMisTickets")}
          >
            Nuevo ticket
          </button>
        </main>
      </div>
    </>
  );
}
