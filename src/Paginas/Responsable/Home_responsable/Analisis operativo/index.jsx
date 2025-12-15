import React from "react";
import "./styles.css";

function ResumenOperativo() {
    return (
        <div className="resumen-header">
            <div className="resumen-texto">
                <h2>Mis activos y estado operativo</h2>
                <span>Resumen por categoría</span>
            </div>
            <div className="resumen-derecha">
                <a href="#" className="detalle-link">Ver detalle de activos</a>
                <div className="leyenda">
                    <div className="item">
                        <span className="dot operativo"></span>
                        Operativo
                    </div>
                    <div className="item">
                        <span className="dot incidencia"></span>
                        Con incidencias
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResumenOperativo;