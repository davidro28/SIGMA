import React from "react";
import "./styles.css";

function BuscadorMantenimiento({ busqueda, setBusqueda }) {
    return (
        <div className="buscador-container">
            <input
                type="text"
                placeholder="Buscar por Orden, Activo o Técnico"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="buscador-input"
            />
        </div>
    );
}

export default BuscadorMantenimiento;
