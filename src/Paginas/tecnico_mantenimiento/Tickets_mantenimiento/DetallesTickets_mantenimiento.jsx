import React from "react";
import { useNavigate } from "react-router-dom";
import "./DetallesTickets_mantenimiento.css";
import SigmaHeader from "../../../Components/sigmaHeader";
import VerticalNav from "../../../Components/verticalNav";

function DetallesTickets_mantenimiento() {
  const navigate = useNavigate();

  const menuItems = [
    { to: "/HomeTecniMantenimiento", label: "General" },
    { to: "/Activos_mantenimiento", label: "Activos" },
    { to: "/Tickets_mantenimiento", label: "Tickets" },
    { to: "/MantenimientosTecniMantenimiento", label: "Mantenimientos" }
  ];

  return (
    <div>
      {/* HEADER */}
      <header>
        <SigmaHeader />
      </header>

      <div className="layout-main">
        <VerticalNav items={menuItems} />

        <main className="detalle-ticket-content">
          {/* CABECERA */}
          <div className="detalle-header">
            <div>
              <h1>Detalle del ticket</h1>
              <p>
                Revisa la información del ticket y actualiza el estado según el
                avance del trabajo
              </p>
            </div>

            <button
              className="btn-volver"
              onClick={() => navigate("/Tickets_mantenimiento")}
            >
              Volver a tickets
            </button>
          </div>

          {/* INFO PRINCIPAL */}
          <section className="detalle-info">
            <div className="detalle-left">
              <h2>Fallas intermitentes en laptop de campo</h2>
              <span className="id-ticket">ID ticket · TCK-2025-034</span>

              <p className="descripcion-general">
                El equipo se reinicia de forma aleatoria durante uso en campo.
                Reportado por el área de operaciones.
              </p>

              <div className="badges-ticket">
                <span className="badge prioridad-alta">Prioridad: Alta</span>
                <span className="badge estado-pendiente">Estado: Pendiente</span>
                <span className="badge badge-info">Tipo: Incidente</span>
                <span className="badge badge-info">SLA: 4h</span>
              </div>

              {/* DESCRIPCIÓN */}
              <div className="bloque">
                <h4>Descripción detallada</h4>
                <p>
                  La laptop asignada al equipo de operaciones en campo se
                  reinicia sin previo aviso 2–3 veces al día. El problema ocurre
                  tanto conectada a corriente como usando batería.
                </p>
                <p>
                  Se ha probado con diferentes tomas de corriente y el problema
                  persiste. No se han instalado aplicaciones nuevas recientemente.
                </p>
              </div>

              {/* HISTORIAL */}
              <div className="bloque">
                <h4>Historial y actualizaciones</h4>

                <div className="timeline">
                  <div className="evento">
                    <span className="punto" />
                    <div>
                      <strong>Ticket creado</strong>
                      <span>07/03/2025 · 09:14 · María Pérez</span>
                      <p>
                        Se registra el incidente con detalle de los reinicios
                        inesperados durante la jornada.
                      </p>
                    </div>
                  </div>

                  <div className="evento">
                    <span className="punto" />
                    <div>
                      <strong>Comentario del usuario</strong>
                      <span>07/03/2025 · 10:02 · María Pérez</span>
                      <p>
                        Se adjunta nota indicando que los reinicios ocurren incluso
                        sin aplicaciones abiertas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* NOTAS */}
              <div className="bloque">
                <h4>Notas internas</h4>
                <textarea
                  placeholder="Escribe aquí tus observaciones técnicas, pruebas realizadas o próximos pasos..."
                />
                <button className="btn-guardar">Guardar nota</button>
              </div>
            </div>

            {/* PANEL DERECHO */}
            <aside className="detalle-right">
              <div className="card">
                <h4>Acciones rápidas</h4>

                <label>Actualizar estado</label>
                <select>
                  <option>Pendiente</option>
                  <option>En progreso</option>
                  <option>Cerrado</option>
                </select>

                <label>Asignar a técnico</label>
                <select>
                  <option>No asignado</option>
                  <option>Carlos López</option>
                  <option>Juan Gómez</option>
                </select>

                <label>Tiempo estimado</label>
                <select>
                  <option>1 h</option>
                  <option>2 h</option>
                  <option>4 h</option>
                  <option>8 h</option>
                </select>

                <div className="acciones-rapidas">
                  <button className="btn-aplicar">Aplicar cambios</button>
                  <button className="btn-resuelto">Marcar como resuelto</button>
                </div>
              </div>

              <div className="card">
                <h4>Activo relacionado</h4>
                <p><strong>Laptop campo</strong> · ACT-MT-0098</p>
                <p>Tipo: Laptop</p>
                <p>Ubicación: Operaciones campo</p>
                <p>Estado del activo: <strong>En uso</strong></p>
                <p>Responsable: María Pérez</p>
                <p>Último mantenimiento: 15/12/2024</p>

                <button className="btn-ver-activo">
                  Ver activo
                </button>
              </div>
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}

export default DetallesTickets_mantenimiento;
