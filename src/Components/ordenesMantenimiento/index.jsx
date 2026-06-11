import "./styles.css";

function OrdenesMantenimiento({ ordenes = [] }) {

    const labelTipo = (tipo) => {
        if (!tipo) return "—";
        return tipo.charAt(0) + tipo.slice(1).toLowerCase();
    };

    const labelEstado = (estado) => {
        const map = {
            EN_CURSO: "En curso",
            PENDIENTE: "Pendiente",
            CERRADA: "Cerrada"
        };
        return map[estado] || estado;
    };

    const labelPrioridad = (prioridad) => {
        const map = {
            ALTA: "Alta",
            MEDIA: "Media",
            BAJA: "Baja",
            CRITICA: "Crítica"
        };
        return map[prioridad] || prioridad;
    };

    const getEstadoClass = (estado) =>
        "badge estado " + (estado || "").toLowerCase().replace("_", "");

    const getPrioridadClass = (prioridad) =>
        "badge prioridad " + (prioridad || "").toLowerCase();

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
                        {ordenes.length === 0 ? (
                            <tr>
                                <td colSpan={8} style={{ textAlign: "center", padding: "1rem", color: "#888" }}>
                                    No hay órdenes registradas
                                </td>
                            </tr>
                        ) : (
                            ordenes.map((o, i) => (
                                <tr key={i}>
                                    <td>
                                        <span className="order-id">{o.ordenId || o.id}</span>
                                        <p className="order-date">Creada: {o.fecha || "—"}</p>
                                    </td>
                                    <td className="tipo">{labelTipo(o.tipo)}</td>
                                    <td>
                                        <span className="activo">{o.activoNombre || o.activo}</span>
                                        <p className="activo-info">{o.activoInfo}</p>
                                    </td>
                                    <td>{o.tecnicoNombre || o.tecnico}</td>
                                    <td>
                                        <span className={getEstadoClass(o.estado)}>
                                            {labelEstado(o.estado)}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={getPrioridadClass(o.prioridad)}>
                                            {labelPrioridad(o.prioridad)}
                                        </span>
                                    </td>
                                    <td>
                                        <p>{o.ventana}</p>
                                        {o.ventanaSub && (
                                            <span className="ventana-sub">{o.ventanaSub}</span>
                                        )}
                                    </td>
                                    <td>
                                        <span className="badge origen">{o.origen}</span>
                                        {o.origenId && (
                                            <span className="badge origen-id">{o.origenId}</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OrdenesMantenimiento;