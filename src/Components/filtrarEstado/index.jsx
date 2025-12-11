import { useState } from "react";
import "./styles.css";

function FiltrarEstado() {
    const [selected, setSelected] = useState("Todas");

    const opciones = ["Todas", "Pendiente", "En curso", "Cerrada"];

    return (
    <div className="estado-card">
        <p className="estado-title">Estado</p>
        <div className="estado-grid">
        {opciones.map((op) => (
            <button
            key={op}
            className={`estado-btn ${selected === op ? "active" : ""}`}
            onClick={() => setSelected(op)}
            >
            {op}
            </button>
        ))}
        </div>
    </div>
    );
}

export default FiltrarEstado;