import { useState, useEffect } from "react";
import "./styles.css";
import { ticketService, ordenService } from "../../../../API/RegistroAPI";

function TicketsMantenimientoCurso() {
  const tecnicoId = localStorage.getItem("usuario");
  const [tickets, setTickets] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      ticketService.porTecnico(tecnicoId),
      ordenService.porTecnico(tecnicoId)
    ])
      .then(([t, o]) => {
        setTickets(t.filter(tk => tk.est !== "CERRADO"));
        setOrdenes(o.filter(or => or.estado === "EN_CURSO"));
      })
      .catch(err => console.error("Error:", err))
      .finally(() => setLoading(false));
  }, []);

  const getBadgeTicket = (estado) => {
    if (!estado) return "open";
    const e = estado.toUpperCase();
    if (e === "EN_PROGRESO") return "progress";
    if (e === "ABIERTO") return "open";
    return "open";
  };

  const getLabelTicket = (estado) => {
    const map = { EN_PROGRESO: "En progreso", ABIERTO: "Abierto", CERRADO: "Cerrado" };
    return map[estado?.toUpperCase()] || estado;
  };

  return (
    <div className="tm-container">
      <div className="tm-header">
        <h2>Tickets y mantenimientos en curso</h2>
        <span className="tm-link">Ver todos</span>
      </div>

      <div className="tm-section">
        <p className="tm-subtitle">Alertas para hoy</p>
        {/* Las alertas siguen siendo estáticas por ahora */}
        <div className="tm-alert">
          <div>
            <strong>{ordenes.length} órdenes activas</strong>
            <p>Mantenimientos en curso asignados a ti</p>
          </div>
          <span className="badge danger">Urgente</span>
        </div>
        <div className="tm-alert">
          <div>
            <strong>Buen ritmo</strong>
            <p>{tickets.length} tickets abiertos pendientes</p>
          </div>
          <span className="badge success">OK</span>
        </div>
      </div>

      <div className="tm-section">
        <p className="tm-subtitle">Tickets asignados a ti</p>
        {loading ? <p>Cargando...</p> : (
          <table>
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Activo</th>
                <th>Estado</th>
                <th>Prioridad</th>
              </tr>
            </thead>
            <tbody>
              {tickets.length === 0 ? (
                <tr><td colSpan={4}>Sin tickets asignados</td></tr>
              ) : (
                tickets.map(t => (
                  <tr key={t.id}>
                    <td>{t.tit || t.numero || t.id}</td>
                    <td>{t.activoNombre || "—"}</td>
                    <td><span className={`badge ${getBadgeTicket(t.est)}`}>{getLabelTicket(t.est)}</span></td>
                    <td>{t.priori}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="tm-section">
        <p className="tm-subtitle">Mantenimientos en curso</p>
        {loading ? <p>Cargando...</p> : (
          <table>
            <thead>
              <tr>
                <th>Orden</th>
                <th>Activo</th>
                <th>Tipo</th>
                <th>Progreso</th>
              </tr>
            </thead>
            <tbody>
              {ordenes.length === 0 ? (
                <tr><td colSpan={4}>Sin mantenimientos en curso</td></tr>
              ) : (
                ordenes.map(o => (
                  <tr key={o.id}>
                    <td>{o.ordenId || o.id}</td>
                    <td>{o.activoNombre || "—"}</td>
                    <td>{o.tipo}</td>
                    <td>
                      <span className="badge progress">
                        {o.progreso ? `${o.progreso}% completado` : o.ventanaSub || "En curso"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default TicketsMantenimientoCurso;