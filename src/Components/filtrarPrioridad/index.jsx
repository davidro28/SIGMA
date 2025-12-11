import { useState } from "react";
import "./styles.css";

function FiltrarPrioridad() {
    const [selected, setSelected] = useState("Crítica");

    const opciones = ["Crítica", "Alta", "Media", "Baja"];

    return (
    <div className="prioridad-card">
        <p className="prioridad-title">Prioridad</p>

        <div className="prioridad-buttons">
        {opciones.map((op) => (
            <button
            key={op}
            className={`prioridad-btn ${selected === op ? "active" : ""}`}
            onClick={() => setSelected(op)}
            >
            {op}
            </button>
        ))}
        </div>
    </div>
    );
}


export default FiltrarPrioridad;