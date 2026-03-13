import React from "react";
import "./styles.css";

function OrdenesMantenimiento() {
    return (
        <div className="oat-container">
            <div className="oat-header">
                <div>
                    <h3>Órdenes de mantenimiento en activos tecnológicos</h3>
                    <div className="oat-legend">
                        <span className="dot preventivo">Preventivo</span>
                        <span className="dot correctivo">Correctivo</span>
                        <span className="dot inspeccion">Inspección</span>
                    </div>
                </div>
                <span className="oat-link">Exportar</span>
            </div>
            <table className="oat-table">
                <thead>
                    <tr>
                        <th>Orden</th>
                        <th>Activo TI</th>
                        <th>Tipo</th>
                        <th>Inicio</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#307</td>
                        <td>Laptop · Gerente Comercial</td>
                        <td><span className="badge tipo preventivo">Preventivo</span></td>
                        <td>09:00</td>
                        <td><span className="badge estado ejecucion">En ejecución</span></td>
                        <td>
                            <button className="accion-btn">Cambiar estado</button>
                        </td>
                    </tr>

                    <tr>
                        <td>#314</td>
                        <td>PC escritorio · Puesto caja 04</td>
                        <td><span className="badge tipo correctivo">Correctivo</span></td>
                        <td>10:30</td>
                        <td><span className="badge estado pendiente">Pendiente</span></td>
                        <td>
                            <button className="accion-btn">Cambiar estado</button>
                        </td>
                    </tr>

                    <tr>
                        <td>#319</td>
                        <td>Impresora láser · Piso 3</td>
                        <td><span className="badge tipo inspeccion">Inspección</span></td>
                        <td>11:15</td>
                        <td><span className="badge estado completado">Completado</span></td>
                        <td>
                            <button className="accion-btn">Cambiar estado</button>
                        </td>
                    </tr>

                    <tr>
                        <td>#321</td>
                        <td>Monitor doble · Diseño gráfico</td>
                        <td><span className="badge tipo preventivo">Preventivo</span></td>
                        <td>15:00</td>
                        <td><span className="badge estado programado">Programado</span></td>
                        <td>
                            <button className="accion-btn">Cambiar estado</button>
                        </td>
                    </tr>

                    <tr>
                        <td>#324</td>
                        <td>POS · Punto de venta tienda 02</td>
                        <td><span className="badge tipo correctivo">Correctivo</span></td>
                        <td>Por definir</td>
                        <td><span className="badge estado espera">En espera de repuesto</span></td>
                        <td>
                            <button className="accion-btn">Cambiar estado</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="oat-divider" />
            <h4 className="oat-subtitle">
                Próximos mantenimientos preventivos de equipos
            </h4>

            <table className="oat-table small">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Activo TI</th>
                        <th>Frecuencia</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Mañana</td>
                        <td>Pool de laptops · Fuerza de ventas</td>
                        <td>Trimestral</td>
                        <td><span className="badge estado programado">Programado</span></td>
                    </tr>

                    <tr>
                        <td>En 3 días</td>
                        <td>Impresoras multifunción · Administración</td>
                        <td>Semestral</td>
                        <td><span className="badge estado planificado">Planificado</span></td>
                    </tr>

                    <tr>
                        <td>En 5 días</td>
                        <td>Equipos de escritorio · Mesa de ayuda</td>
                        <td>Anual</td>
                        <td><span className="badge estado planificado">Planificado</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default OrdenesMantenimiento;
