import "./styles.css";

function OrdenesMantenimiento({ ordenes = [] }) {
    const getEstadoClass = (estado) =>
        "badge estado " + estado.toLowerCase().replace(" ", "");

    const getPrioridadClass = (prioridad) =>
        "badge prioridad " + prioridad.toLowerCase();

    return (
        <div className="orders-wrapper">
            <h2 className="titulo-seccion">Órdenes de mantenimiento</h2>
            <p className="subtitulo">
                Gestiona el mantenimiento preventivo y correctivo de tus activos
            </p>
            <div className="scroll-x">
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Orden</th>
                            <th>Tipo</th>
                            <th>Activo</th>
                            <th>Técnico</th>
                            <th>Estado</th>
                            <th>Prioridad</th>
                            <th>Ventana planificada</th>
                            <th>Origen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordenes.map((o, i) => (
                            <tr key={i}>
                                <td>
                                    <span className="order-id">{o.id}</span>
                                    <p className="order-date">
                                        Creada: {o.fecha}
                                    </p>
                                </td>
                                <td className="tipo">{o.tipo}</td>
                                <td>
                                    <span className="activo">{o.activo}</span>
                                    <p className="activo-info">
                                        {o.activoInfo}
                                    </p>
                                </td>
                                <td>{o.tecnico}</td>
                                <td>
                                    <span className={getEstadoClass(o.estado)}>
                                        {o.estado}
                                    </span>
                                </td>
                                <td>
                                    <span
                                        className={getPrioridadClass(
                                            o.prioridad
                                        )}
                                    >
                                        {o.prioridad}
                                    </span>
                                </td>
                                <td>
                                    <p>{o.ventana}</p>
                                    {o.ventanaSub && (
                                        <span className="ventana-sub">
                                            {o.ventanaSub}
                                        </span>
                                    )}
                                </td>
                                <td>
                                    <span className="badge origen">
                                        {o.origen}
                                    </span>
                                    {o.origenId && (
                                        <span className="badge origen-id">
                                            {o.origenId}
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OrdenesMantenimiento;
