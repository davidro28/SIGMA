import React from "react";
import "./styles.css"
import SigmaHeader from "../../../Components/sigmaHeader";
import VerticalNav from "../../../Components/verticalNav";
import CuadroInformativo from '../../../Components/cuadroInformacion';
import ResumenOperativo from './Analisis operativo/index'
import ActivosCriticos from './Activos criticos/index'
import ProximosMantenimientos from './Proximos mantenimientos/index'
import MisTickets from './Mis tickets/index'

function Home_responsable() {
    const menuItems = [
        { to: "/Home_responsable", label: "General" },
        { to: "/Activos_responsable", label: "Activos" },
        { to: "/MisTickets", label: "Tickets" }
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
                            <p className="parrafo_principal">Resumen del Responsable</p>
                            <p className="subparrafo_principal">Vista general de tus activos y tickets</p>
                        </div>
                        <div className="cuadros-container">
                            <CuadroInformativo titulo="Activos bajo tu responsabilidad" valor={38} estadistica="+3 activos en el ultimo mes" sugerencia="nada"/>
                            <CuadroInformativo titulo="Tickets Abiertos (Tú)" valor={12} estadistica="-2 vs la ultima semana" sugerencia="nada"/>
                            <CuadroInformativo titulo="Tickets resueltos" valor={3} estadistica="60% del objetivo" sugerencia="nada"/>
                        </div>
                        <div className="dashboard-layout">
                            <div className="container-izquierdo">
                                <ResumenOperativo />
                                <ActivosCriticos />
                                <ProximosMantenimientos />
                            </div>
                            <div className="container-derecho">
                                <MisTickets />
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default Home_responsable;