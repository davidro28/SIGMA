import React from "react";
import "./styles.css";

function ProximosMantenimientos() {
    return (
        <div className="bloque-mantenimientos">
            <h3 className="titulo">Próximos mantenimientos de mis activos</h3>
            <div className="tabla">
                <div className="head">
                    <span>Activo</span>
                    <span>Tipo</span>
                    <span>Fecha</span>
                    <span>Responsable</span>
                </div>
                <div className="fila">
                    <span className="nombre">Climatizador sala 4</span>
                    <span>Preventivo</span>
                    <span>Hoy · 16:00</span>
                    <span>Proveedor externo</span>
                </div>
                <div className="fila">
                    <span className="nombre">UPS principal</span>
                    <span>Inspección</span>
                    <span>Mañana</span>
                    <span>Juan Pérez</span>
                </div>
                <div className="fila">
                    <span className="nombre">Servidor SIG-12</span>
                    <span>Actualización</span>
                    <span>Viernes</span>
                    <span>Equipo TI</span>
                </div>
            </div>
        </div>
    );
}
export default ProximosMantenimientos;