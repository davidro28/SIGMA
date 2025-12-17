import React from "react";
import "./styles.css";
import SigmaHeader from "../../../Components/sigmaHeader";
import VerticalNav from "../../../Components/verticalNav";
import CuadroInformativo from "../../../Components/cuadroInformacion";
import AgendaMantenimientos from "./Agenda_mantenimientos/index"
import TicketsMantenimientoCurso from "./Funciones_encurso";

function HomeTecniMantenimiento() {
    const menuItems = [
        { to: "/HomeTecniMantenimiento", label: "General" },
        { to: "/Activos_mantenimiento", label: "Activos" },
        { to: "/Tickets_mantenimiento", label: "Tickets" },
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
                        <p className="parrafo-principal">Vista principal</p>
                        <div className="cuadros-container">
                            <CuadroInformativo titulo="Ordenes de trabajo hoy" valor={7} estadistica="3 en curso - 2 pendientes" sugerencia="Completadas: 2"/>
                            <CuadroInformativo titulo="Mantenimientos preventivos" valor={11} estadistica="8 programados - 3 completados" sugerencia="Semana actual"/>
                            <CuadroInformativo titulo="Tickets asignados a ti" valor={9} estadistica="-1 vs ayer" sugerencia="Alta prioridad: 3"/>
                            <CuadroInformativo titulo="Cumplimiento SLA técnico" valor="89%" estadistica="+5 pts vs periodo anterior" sugerencia="Ultimos 30 días"/>
                        </div>
                        <div className="contenedor-inferior">
                            <div className="container-izquierdo">
                                <AgendaMantenimientos />
                            </div>
                            <div className="container-derecho">
                                <TicketsMantenimientoCurso />
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default HomeTecniMantenimiento;