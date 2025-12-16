import "./styles.css";

function AgendaMantenimientos() {
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

        <ul className="task-list">
          <li>
            <span className="time">08:30</span>
            <div>
              <strong>Inspección ascensor torre B</strong>
              <p>Tipo: Preventivo · Duración estimada: 45 min · Ticket #410</p>
            </div>
          </li>

          <li>
            <span className="time">10:00</span>
            <div>
              <strong>Revisión climatizador sala 4</strong>
              <p>Tipo: Correctivo · SLA: 11:30 · Ticket #412</p>
            </div>
          </li>

          <li>
            <span className="time">14:00</span>
            <div>
              <strong>Mantenimiento UPS principal</strong>
              <p>Tipo: Preventivo · Con desconexión programada · Orden #207</p>
            </div>
          </li>

          <li>
            <span className="time">16:30</span>
            <div>
              <strong>Verificación generador diésel</strong>
              <p>Tipo: Inspección rutinaria · Checklist obligatorio</p>
            </div>
          </li>
        </ul>
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
            <tr>
              <td>Ascensor torre B</td>
              <td>Torre B · Piso 1-10</td>
              <td>Preventivo</td>
              <td><span className="status green">En curso</span></td>
            </tr>

            <tr>
              <td>Climatizador sala 4</td>
              <td>Edificio A · Piso 2</td>
              <td>Correctivo</td>
              <td><span className="status yellow">Pendiente</span></td>
            </tr>

            <tr>
              <td>UPS principal</td>
              <td>Sala técnica</td>
              <td>Preventivo</td>
              <td><span className="status gray">Programado</span></td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default AgendaMantenimientos;