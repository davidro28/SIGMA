import React, { useState } from "react";
import "./styles.css";
import SigmaHeader from "../../../Components/sigmaHeader";
import VerticalNav from "../../../Components/verticalNav";
import OrdenesMantenimiento from "./OrdenesMantenimiento";
import DetalleOrdenRapido from "./DetalleOrdenSeleccionada";
import FiltrosMantenimientos from "./Filtros";

function MantenimientosTecniMantenimiento() {
    const [activeTab, setActiveTab] = useState("hoy");
    const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);

    const menuItems = [
        { to: "/HomeTecniMantenimiento", label: "General" },
        { to: "/Activos_mantenimiento", label: "Activos" },
        { to: "/Tickets_mantenimiento", label: "Tickets" },
        { to: "/MantenimientosTecniMantenimiento", label: "Mantenimientos" }
    ];

    return (
        <div className="home-container">
            <header><SigmaHeader /></header>
            <div className="layout">
                <VerticalNav items={menuItems} />
                <main className="content">
                    <section>
                        <div className="contenedor_parrafos">
                            <p className="parrafo_principal">Mantenimientos</p>
                            <p className="subparrafo_principal">Gestión de mantenimientos sobre activos tecnológicos</p>
                        </div>
                        <div className="Filtros">
                            <FiltrosMantenimientos activeTab={activeTab} setActiveTab={setActiveTab} />
                        </div>
                        <div className="Contenedores">
                            <div className="container-izquierdo">
                                <OrdenesMantenimiento
                                    filtroTab={activeTab}
                                    onSeleccionar={setOrdenSeleccionada}
                                />
                            </div>
                            <div className="container-derecho">
                                <DetalleOrdenRapido orden={ordenSeleccionada} />
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default MantenimientosTecniMantenimiento;