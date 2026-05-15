import React from "react";
import "./styles.css";

function FiltrosMantenimientos({ activeTab, setActiveTab }) {
    return (
        <div className="tabs-container">
            {["hoy", "semana", "historico", "calendario"].map(tab => (
                <button
                    key={tab}
                    className={`tab ${activeTab === tab ? "active" : ""}`}
                    onClick={() => setActiveTab(tab)}
                >
                    {tab === "hoy" ? "Mantenimientos de hoy" :
                     tab === "semana" ? "Semana" :
                     tab === "historico" ? "Histórico" : "Calendario"}
                </button>
            ))}
        </div>
    );
}

export default FiltrosMantenimientos;