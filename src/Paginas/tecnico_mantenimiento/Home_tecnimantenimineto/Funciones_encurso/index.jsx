import React from "react";
import "./styles.css";

function TicketsMantenimientoCurso() {
    return (
        <div className="tm-container">
            <div className="tm-header">
                <h2>Tickets y mantenimientos en curso</h2>
                <span className="tm-link">Ver todos</span>
            </div>

            <div className="tm-section">
                <p className="tm-subtitle">Alertas para hoy</p>

                <div className="tm-alert">
                    <div>
                        <strong>2 órdenes de trabajo con SLA próximo</strong>
                        <p>Revisar priorización antes de las 12:00</p>
                    </div>
                    <span className="badge danger">Urgente</span>
                </div>

                <div className="tm-alert">
                    <div>
                        <strong>Checklist incompleto</strong>
                        <p>Orden #198 · Faltan 3 pasos por marcar</p>
                    </div>
                    <span className="badge warning">Revisar</span>
                </div>

                <div className="tm-alert">
                    <div>
                        <strong>Buen ritmo</strong>
                        <p>4 de 7 tareas del día ya completadas</p>
                    </div>
                    <span className="badge success">OK</span>
                </div>
            </div>

            <div className="tm-section">
                <p className="tm-subtitle">Tickets asignados a ti</p>

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
                        <tr>
                            <td>#412</td>
                            <td>Climatizador sala 4</td>
                            <td><span className="badge progress">En progreso</span></td>
                            <td>Crítica</td>
                        </tr>
                        <tr>
                            <td>#410</td>
                            <td>Ascensor torre B</td>
                            <td><span className="badge open">Abierto</span></td>
                            <td>Alta</td>
                        </tr>
                        <tr>
                            <td>#405</td>
                            <td>Grupo electrógeno</td>
                            <td><span className="badge open">Abierto</span></td>
                            <td>Media</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="tm-section">
                <p className="tm-subtitle">Mantenimientos en curso</p>

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
                        <tr>
                            <td>#207</td>
                            <td>UPS principal</td>
                            <td>Preventivo</td>
                            <td><span className="badge progress">50% completado</span></td>
                        </tr>
                        <tr>
                            <td>#201</td>
                            <td>Servidor SIG-03</td>
                            <td>Correctivo</td>
                            <td><span className="badge info">En espera de repuesto</span></td>
                        </tr>
                        <tr>
                            <td>#198</td>
                            <td>Ascensor torre B</td>
                            <td>Inspección</td>
                            <td><span className="badge success">Checklist 70%</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default TicketsMantenimientoCurso