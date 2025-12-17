import React from "react";
import "./styles.css";

function DetalleOrdenRapido() {
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
                        <strong>#307</strong> · Mantenimiento laptop gerente
                    </p>
                    <p className="dor-label">Activo TI</p>
                    <p className="dor-value">Laptop Dell · Gerente Comercial</p>
                </div>
                <div className="dor-block">
                    <p className="dor-label">Tipo, prioridad y criticidad</p>
                    <p className="dor-value">
                        Preventivo · Prioridad alta · Equipo crítico de usuario
                    </p>
                    <p className="dor-label">SLA estimado</p>
                    <p className="dor-value highlight">
                        Finalizar antes de las 12:00
                    </p>
                </div>
            </div>
            <div className="dor-divider" />
            <h4 className="dor-subtitle">Checklist de tareas técnicas</h4>
            <div className="dor-checklist">
                <div className="dor-task">
                    <div>
                        <p className="task-title">
                            Limpieza interna y revisión de ventiladores
                        </p>
                        <p className="task-desc">
                            Tiempo estimado: 10 min · Obligatorio
                        </p>
                    </div>
                    <span className="task-status pendiente">Pendiente</span>
                </div>
                <div className="dor-task">
                    <div>
                        <p className="task-title">
                            Revisión de estado de disco y SMART
                        </p>
                        <p className="task-desc">
                            Adjuntar captura de herramienta de diagnóstico · Paso 2/4
                        </p>
                    </div>
                    <span className="task-status curso">En curso</span>
                </div>

                <div className="dor-task">
                    <div>
                        <p className="task-title">
                            Actualización de sistema operativo y parches
                        </p>
                        <p className="task-desc">
                            Completado por Carlos · 09:40
                        </p>
                    </div>
                    <span className="task-status hecho">Hecho</span>
                </div>
                <div className="dor-task">
                    <div>
                        <p className="task-title">
                            Prueba de rendimiento básico y temperatura
                        </p>
                        <p className="task-desc">
                            Registrar resultados en comentario de la orden
                        </p>
                    </div>
                    <span className="task-status pendiente">Pendiente</span>
                </div>
            </div>
        </div>
    );
}

export default DetalleOrdenRapido;