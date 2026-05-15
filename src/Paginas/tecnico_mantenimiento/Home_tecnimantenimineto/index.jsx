import React, { useState, useEffect } from "react";
import "./styles.css";
import SigmaHeader from "../../../Components/sigmaHeader";
import VerticalNav from "../../../Components/verticalNav";
import CuadroInformativo from "../../../Components/cuadroInformacion";
import AgendaMantenimientos from "./Agenda_mantenimientos/index";
import TicketsMantenimientoCurso from "./Funciones_encurso";
import { ticketService, ordenService } from "../../../services/api";

function HomeTecniMantenimiento() {
    const tecnicoId = localStorage.getItem("usuario"); // ID del técnico logueado

    const [stats, setStats] = useState({
        ordenesHoy: 0,
        ordenesDetalle: "...",
        mantenimientosPreventivos: 0,
        mantenimientosDetalle: "...",
        ticketsAsignados: 0,
        ticketsDetalle: "...",
        sla: "—"
    });

    const menuItems = [
        { to: "/HomeTecniMantenimiento", label: "General" },
        { to: "/Activos_mantenimiento", label: "Activos" },
        { to: "/Tickets_mantenimiento", label: "Tickets" },
        { to: "/MantenimientosTecniMantenimiento", label: "Mantenimientos" }
    ];

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            const [tickets, ordenes] = await Promise.all([
                ticketService.porTecnico(tecnicoId),
                ordenService.porTecnico(tecnicoId)
            ]);

            // Tickets
            const ticketsAbiertos = tickets.filter(t => t.est !== "CERRADO");
            const ticketsAltaPrioridad = tickets.filter(t => t.priori === "ALTA" || t.priori === "CRITICA");

            // Órdenes de hoy
            const hoy = new Date().toDateString();
            const ordenesHoy = ordenes.filter(o => {
                if (!o.fechaProgramada) return false;
                return new Date(o.fechaProgramada).toDateString() === hoy;
            });
            const enCurso = ordenesHoy.filter(o => o.estado === "EN_CURSO").length;
            const pendientes = ordenesHoy.filter(o => o.estado === "PENDIENTE").length;
            const completadas = ordenesHoy.filter(o => o.estado === "CERRADA").length;

            // Mantenimientos preventivos de la semana
            const preventivos = ordenes.filter(o => o.tipo === "PREVENTIVO");
            const prevCompletados = preventivos.filter(o => o.estado === "CERRADA").length;

            setStats({
                ordenesHoy: ordenesHoy.length,
                ordenesDetalle: `${enCurso} en curso - ${pendientes} pendientes`,
                ordenesCompletadas: `Completadas: ${completadas}`,
                mantenimientosPreventivos: preventivos.length,
                mantenimientosDetalle: `${preventivos.length - prevCompletados} programados - ${prevCompletados} completados`,
                ticketsAsignados: ticketsAbiertos.length,
                ticketsDetalle: `-1 vs ayer`,
                ticketsAlta: `Alta prioridad: ${ticketsAltaPrioridad.length}`,
                sla: "89%"
            });

        } catch (error) {
            console.error("Error cargando datos del home:", error);
        }
    };

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
                            <CuadroInformativo
                                titulo="Ordenes de trabajo hoy"
                                valor={stats.ordenesHoy}
                                estadistica={stats.ordenesDetalle}
                                sugerencia={stats.ordenesCompletadas}
                            />
                            <CuadroInformativo
                                titulo="Mantenimientos preventivos"
                                valor={stats.mantenimientosPreventivos}
                                estadistica={stats.mantenimientosDetalle}
                                sugerencia="Semana actual"
                            />
                            <CuadroInformativo
                                titulo="Tickets asignados a ti"
                                valor={stats.ticketsAsignados}
                                estadistica={stats.ticketsDetalle}
                                sugerencia={stats.ticketsAlta}
                            />
                            <CuadroInformativo
                                titulo="Cumplimiento SLA técnico"
                                valor={stats.sla}
                                estadistica="+5 pts vs periodo anterior"
                                sugerencia="Ultimos 30 días"
                            />
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
    );
}

export default HomeTecniMantenimiento;