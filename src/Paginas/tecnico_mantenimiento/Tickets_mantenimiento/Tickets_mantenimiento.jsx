import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Tickets_mantenimiento.css";
import SigmaHeader from "../../../Components/sigmaHeader";
import VerticalNav from "../../../Components/verticalNav";

function Tickets_mantenimiento() {
  const navigate = useNavigate();

  const menuItems = [
    { to: "/HomeTecniMantenimiento", label: "General" },
    { to: "/Activos_mantenimiento", label: "Activos" },
    { to: "/Tickets_mantenimiento", label: "Tickets" },
    { to: "/MantenimientosTecniMantenimiento", label: "Mantenimientos" }
  ];

  const tickets = [
    {
      id: "TCK-2025-034",
      prioridad: "Alta",
      estado: "Pendiente",
      activo: "Laptop campo · ACT-MT-0098",
      creado: "07/03/2025",
      reportado: "María Pérez",
      resumen:
        "Equipo se reinicia de forma aleatoria durante uso en campo. Requiere revisión prioritaria."
    },
    {
      id: "TCK-2025-029",
      prioridad: "Media",
      estado: "En progreso",
      activo: "Impresora oficina · ACT-PRN-0012",
      creado: "06/03/2025",
      reportado: "Juan Gómez",
      resumen:
        "Atascos frecuentes de papel en bandeja 2. Se requiere limpieza y revisión de rodillos."
    },
    {
      id: "TCK-2025-021",
      prioridad: "Baja",
      estado: "En progreso",
      activo: "Monitor soporte · ACT-SCR-0045",
      creado: "05/03/2025",
      reportado: "Ana Torres",
      resumen:
        "Color de pantalla descalibrado, requiere ajuste y revisión de conexión."
    },
    {
      id: "TCK-2025-010",
      prioridad: "Baja",
      estado: "Cerrado",
      activo: "Docking estación · ACT-DCK-0007",
      creado: "01/03/2025",
      reportado: "Luis García",
      resumen:
        "Verificación de puertos USB tras caída. Se confirma funcionamiento correcto."
    }
  ];

  const [busqueda, setBusqueda] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("Todos");
  const [prioridadFiltro, setPrioridadFiltro] = useState("Todas");

  const limpiarFiltros = () => {
    setBusqueda("");
    setEstadoFiltro("Todos");
    setPrioridadFiltro("Todas");
  };

  const ticketsFiltrados = tickets.filter((ticket) => {
    const texto = busqueda.toLowerCase();

    const coincideBusqueda =
      ticket.id.toLowerCase().includes(texto) ||
      ticket.activo.toLowerCase().includes(texto) ||
      ticket.reportado.toLowerCase().includes(texto);

    const coincideEstado =
      estadoFiltro === "Todos" || ticket.estado === estadoFiltro;

    const coincidePrioridad =
      prioridadFiltro === "Todas" || ticket.prioridad === prioridadFiltro;

    return coincideBusqueda && coincideEstado && coincidePrioridad;
  });

  return (
    <div>
      <header>
        <SigmaHeader />
      </header>

      <div className="layout-main">
        <VerticalNav items={menuItems} />

        <main className="page-content-gestor">
          <div className="header-tickets-gestor">
            <h1>Tickets de mantenimiento</h1>
            <p>
              Gestiona los tickets asignados, actualiza estados y prioriza tu
              trabajo diario
            </p>
          </div>

          <section className="filtros-rapidos-gestor">
            <h4>Listado de tickets</h4>
            <p className="descripcion-filtros">
              Filtra por estado, prioridad o activo para encontrar rápidamente
              el próximo ticket a atender
            </p>

            <div className="busqueda-filtros">
              <input
                className="input-busqueda"
                placeholder="Buscar por ID, activo o usuario"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />

              <div className="grupo-filtro-gestor">
                <label>Estado:</label>
                <select
                  value={estadoFiltro}
                  onChange={(e) => setEstadoFiltro(e.target.value)}
                >
                  <option>Todos</option>
                  <option>Pendiente</option>
                  <option>En progreso</option>
                  <option>Cerrado</option>
                </select>
              </div>

              <div className="grupo-filtro-gestor">
                <label>Prioridad:</label>
                <select
                  value={prioridadFiltro}
                  onChange={(e) => setPrioridadFiltro(e.target.value)}
                >
                  <option>Todas</option>
                  <option>Alta</option>
                  <option>Media</option>
                  <option>Baja</option>
                </select>
              </div>

              <button className="btn-limpiar" onClick={limpiarFiltros}>
                Limpiar filtros
              </button>
            </div>
          </section>
          <table className="tabla-tickets">
            <thead>
              <tr>
                <th>ID ticket</th>
                <th>Prioridad</th>
                <th>Estado</th>
                <th>Activo</th>
                <th>Creado</th>
                <th>Reportado por</th>
                <th>Resumen</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {ticketsFiltrados.map((ticket) => (
                <tr key={ticket.id}>
                  <td>{ticket.id}</td>

                  <td>
                    <span
                      className={`prioridad prioridad-${ticket.prioridad.toLowerCase()}`}
                    >
                      {ticket.prioridad}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`estado estado-${ticket.estado
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {ticket.estado}
                    </span>
                  </td>

                  <td>{ticket.activo}</td>
                  <td>{ticket.creado}</td>
                  <td>{ticket.reportado}</td>
                  <td className="resumen">{ticket.resumen}</td>

                  <td className="acciones">
                    {ticket.estado === "Pendiente" && (
                      <button className="btn-tomar">Tomar ticket</button>
                    )}

                    {ticket.estado === "En progreso" && (
                      <button className="btn-actualizar">
                        Actualizar estado
                      </button>
                    )}

                    <button
                      className="btn-ver"
                      onClick={() =>
                        navigate(`/DetallesTickets_mantenimiento`)
                      }
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="nota-final">
            <strong>¿No encuentras un ticket?</strong>
            <p>
              Asegúrate de que el ticket esté asignado a tu equipo o utiliza los
              filtros para visualizar el histórico completo. También puedes
              acceder a tickets cerrados seleccionando el estado “Cerrado” o
              dejando todos los filtros en “Todos”.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Tickets_mantenimiento;
