import React from "react";
import "./styles.css";

function ActivosCriticos() {
    return (
        <div className="activos-box">
        {/* Activos críticos */}
            <h3 className="titulo">Activos críticos asignados</h3>
            <div className="tabla-grid">
                <div className="thead">
                    <span>Activo</span>
                    <span>Ubicación</span>
                    <span>Estado</span>
                    <span>Ticket activo</span>
                </div>
                <div className="fila">
                    <span className="bold">Servidor SIG-03</span>
                    <span>Data center 1</span>
                    <span className="badge incidencia">Con incidencia</span>
                    <span>#317 · Alta</span>
                </div>
                <div className="fila">
                    <span className="bold">Ascensor torre B</span>
                    <span>Torre B · Piso 1-10</span>
                    <span className="badge revision">En revisión</span>
                    <span>#309 · Media</span>
                </div>
                <div className="fila">
                    <span className="bold">Grupo electrógeno</span>
                    <span>Sala técnica</span>
                    <span className="badge pendiente">Pendiente</span>
                    <span>#295 · Crítica</span>
                </div>
            </div>
        </div>
    );
}

export default ActivosCriticos;