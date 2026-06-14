import React from "react";
import "./styles.css";

function DetalleOrdenRapido({ orden }) {
    if (!orden) return (
        <div className="dor-container">
            <div className="dor-header">
                <h3>Detalle rápido de la orden seleccionada</h3>
            </div>
            <p style={{ padding: "1rem", color: "#888" }}>
                Selecciona una orden de la tabla para ver su detalle.
            </p>
        </div>
    );

    const labelTipo = (tipo) => {
        const map = { CORRECTIVO: "Correctivo", PREVENTIVO: "Preventivo", INSPECCION: "Inspección" };
        return map[tipo] || tipo;
    };

    const labelPrioridad = (p) => {
        const map = { ALTA: "Alta", MEDIA: "Media", BAJA: "Baja", CRITICA: "Crítica" };
        return map[p] || p;
    };

    return (
        <div className="dor-container">
            <div className="dor-header">
                <h3>Detalle rápido de la orden seleccionada</h3>
                <span className="dor-link">Ver ficha completa del activo TI</span>
            </div>

            <div className="dor-info">
                <div className="dor-block">
                    <p className="dor-label">Orden actual</p>
                    <p className="dor-value">
                        <strong>{orden.ordenId || orden.id}</strong> · {orden.descripcion || orden.activoNombre}
                    </p>
                    <p className="dor-label">Activo TI</p>
                    <p className="dor-value">{orden.activoNombre} · {orden.ubicacion || "—"}</p>
                </div>
                <div className="dor-block">
                    <p className="dor-label">Tipo, prioridad y criticidad</p>
                    <p className="dor-value">
                        {labelTipo(orden.tipo)} · Prioridad {labelPrioridad(orden.prioridad)?.toLowerCase()} · {orden.activoInfo || "—"}
                    </p>
                    <p className="dor-label">SLA estimado</p>
                    <p className="dor-value highlight">
                        {orden.ventana || "Sin ventana definida"}
                    </p>
                </div>
            </div>

            <div className="dor-divider" />
            <h4 className="dor-subtitle">Información adicional</h4>

            <div className="dor-checklist">
                <div className="dor-task">
                    <div>
                        <p className="task-title">Técnico asignado</p>
                        <p className="task-desc">{orden.tecnicoNombre || "—"}</p>
                    </div>
                </div>
                <div className="dor-task">
                    <div>
                        <p className="task-title">Origen</p>
                        <p className="task-desc">{orden.origen || "—"} {orden.origenId || ""}</p>
                    </div>
                </div>
                <div className="dor-task">
                    <div>
                        <p className="task-title">Subventana / retraso</p>
                        <p className="task-desc">{orden.ventanaSub || "Sin retraso registrado"}</p>
                    </div>
                </div>
                <div className="dor-task">
                    <div>
                        <p className="task-title">Progreso</p>
                        <p className="task-desc">{orden.progreso ? `${orden.progreso}%` : "Sin registrar"}</p>
                    </div>
                    <span className={`task-status ${orden.progreso >= 100 ? "hecho" : orden.progreso > 0 ? "curso" : "pendiente"}`}>
                        {orden.progreso >= 100 ? "Hecho" : orden.progreso > 0 ? "En curso" : "Pendiente"}
                    </span>
                </div>
                <div className="dor-task">
                    <div>
                        <p className="task-title">Observaciones</p>
                        <p className="task-desc">{orden.observaciones || "Sin observaciones"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetalleOrdenRapido;