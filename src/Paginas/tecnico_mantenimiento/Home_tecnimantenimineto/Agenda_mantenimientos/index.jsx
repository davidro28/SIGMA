import { useState, useEffect } from "react";
import "./styles.css";
import { ordenService } from "../../../../API/RegistroAPI";

function AgendaMantenimientos({ tecnicoId }) {
    const [ordenes, setOrdenes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!tecnicoId) return;
        ordenService.porTecnico(tecnicoId)
            .then(data => setOrdenes(data))
            .catch(err => console.error("Error cargando agenda:", err))
            .finally(() => setLoading(false));
    }, [tecnicoId]);

  const hoy = new Date().toDateString();

  const ordenesHoy = ordenes.filter(o => {
    if (!o.fechaProgramada) return true;
    return new Date(o.fechaProgramada).toDateString() === hoy;
  });

  const activosHoy = [...new Map(
    ordenesHoy.map(o => [o.activoId, o])
  ).values()];

  const getBadgeEstado = (estado) => {
    if (!estado) return "gray";
    const e = estado.toUpperCase();
    if (e === "EN_CURSO") return "green";
    if (e === "PENDIENTE") return "yellow";
    return "gray";
  };

  const getLabelEstado = (estado) => {
    if (!estado) return "—";
    const map = { EN_CURSO: "En curso", PENDIENTE: "Pendiente", CERRADA: "Programado" };
    return map[estado.toUpperCase()] || estado;
  };

  const formatHora = (fecha) => {
    if (!fecha) return "—";
    return new Date(fecha).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="agenda-container">
      <div className="agenda-header">
        <div>
          <h2>Agenda de mantenimientos de hoy</h2>
          <span className="subtitle">Distribución del día</span>
        </div>
        <div className="header-right">
          <span className="calendar-link">Ver calendario</span>
          <div className="legend">
            <span><i className="dot preventive" /> Preventivo</span>
            <span><i className="dot corrective" /> Correctivo</span>
          </div>
        </div>
      </div>

      <div className="timeline">
        <span>Línea de tiempo · Carga de trabajo por hora</span>
      </div>

      <section className="section">
        <h3>Mantenimientos programados</h3>
        {loading ? (
          <p>Cargando...</p>
        ) : ordenesHoy.length === 0 ? (
          <p>No hay mantenimientos programados para hoy.</p>
        ) : (
          <ul className="task-list">
            {ordenesHoy.map(o => (
              <li key={o.id}>
                <span className="time">{formatHora(o.fechaProgramada)}</span>
                <div>
                  <strong>{o.activoNombre}</strong>
                  <p>
                    Tipo: {o.tipo} · {o.ventana} · {o.ticketId ? `Ticket ${o.ticketId}` : `Orden ${o.ordenId}`}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="section">
        <h3>Activos en los que trabajas hoy</h3>
        <table>
          <thead>
            <tr>
              <th>Activo</th>
              <th>Ubicación</th>
              <th>Tipo mant.</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {activosHoy.length === 0 ? (
              <tr><td colSpan={4}>Sin activos para hoy</td></tr>
            ) : (
              activosHoy.map(o => (
                <tr key={o.activoId}>
                  <td>{o.activoNombre}</td>
                  <td>{o.ubicacion || "—"}</td>
                  <td>{o.tipo}</td>
                  <td>
                    <span className={`status ${getBadgeEstado(o.estado)}`}>
                      {getLabelEstado(o.estado)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default AgendaMantenimientos;