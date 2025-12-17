import React, { useState } from "react";
import "./styles.css";

function FiltrosMantenimientos() {
    const [activeTab, setActiveTab] = useState("hoy");

    return (
        <div className="tabs-container">
            <button
                className={`tab ${activeTab === "hoy" ? "active" : ""}`}
                onClick={() => setActiveTab("hoy")}
            >
                Mantenimientos de hoy
            </button>

            <button
                className={`tab ${activeTab === "semana" ? "active" : ""}`}
                onClick={() => setActiveTab("semana")}
            >
                Semana
            </button>

            <button
                className={`tab ${activeTab === "historico" ? "active" : ""}`}
                onClick={() => setActiveTab("historico")}
            >
                Histórico
            </button>

            <button
                className={`tab ${activeTab === "calendario" ? "active" : ""}`}
                onClick={() => setActiveTab("calendario")}
            >
                Calendario
            </button>
        </div>
    );
}

export default FiltrosMantenimientos;
