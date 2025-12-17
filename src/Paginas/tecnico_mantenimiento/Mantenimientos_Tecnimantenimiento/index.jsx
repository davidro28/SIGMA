import React from "react";
import "./styles.css";
import SigmaHeader from "../../../Components/sigmaHeader";
import VerticalNav from "../../../Components/verticalNav";
import OrdenesMantenimiento from "./OrdenesMantenimiento";
import DetalleOrdenRapido from "./DetalleOrdenSeleccionada";
import FiltrosMantenimientos from "./Filtros";

function MantenimientosTecniMantenimiento() {
    const menuItems = [
        { to: "/HomeTecniMantenimiento", label: "General" },
        { to: "/Activos", label: "Activos" },
        { to: "/Tickets", label: "Tickets" },
        { to: "/MantenimientosTecniMantenimiento", label: "Mantenimientos" }
    ];
    return (
        <div className="home-container">
            <header>
                <SigmaHeader />
            </header>
            <div className="layout">
                <VerticalNav items={menuItems} />
                <main className="content">
                    <section>
                        <div className="contenedor_parrafos">
                            <p className="parrafo_principal">Mantenimientos</p>
                            <p className="subparrafo_principal">Gestión de mantenimientos sobre activos tecnologicos</p>
                        </div>
                        <div className="Filtros">
                            <FiltrosMantenimientos />
                        </div>
                        <div className="Contenedores">
                            <div className="container-izquierdo">
                                <OrdenesMantenimiento />
                            </div>
                            <div className='container-derecho'>
                                <DetalleOrdenRapido />
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default MantenimientosTecniMantenimiento;