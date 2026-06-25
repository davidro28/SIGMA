import React, { useState, useEffect } from "react";
import "./styles.css";
import SigmaHeader from "../../../Components/sigmaHeader";
import VerticalNav from "../../../Components/verticalNav";
import CuadroInformativo from "../../../Components/cuadroInformacion";
import AgendaMantenimientos from "./Agenda_mantenimientos/index";
import TicketsMantenimientoCurso from "./Funciones_encurso";
import { ticketService, ordenService } from "../../../API/RegistroAPI";
import { useUsuarioActual } from "../../../Hooks/useUsuarioActual";

function HomeTecniMantenimiento() {
    const { usuario, loading: loadingUsuario } = useUsuarioActual();

    const [stats, setStats] = useState({
        ordenesHoy: 0,
        ordenesDetalle: "...",
        ordenesCompletadas: "Completadas: 0",
        mantenimientosPreventivos: 0,
        mantenimientosDetalle: "...",
        ticketsAsignados: 0,
        ticketsDetalle: "...",
        ticketsAlta: "Alta prioridad: 0",
        sla: "89%"
    });

    const menuItems = [
        { to: "/HomeTecniMantenimiento", label: "General" },
        { to: "/Activos_mantenimiento", label: "Activos" },
        { to: "/Tickets_mantenimiento", label: "Tickets" },
        { to: "/MantenimientosTecniMantenimiento", label: "Mantenimientos" }
    ];

    useEffect(() => {
        console.log("Usuario actual:", usuario);
        if (!usuario?.id) return;
        cargarDatos(usuario.id);
    }, [usuario]);

    const cargarDatos = async (tecnicoId) => {
        console.log("Cargando datos para tecnicoId:", tecnicoId);
        try {
            const [tickets, ordenes] = await Promise.all([
                ticketService.porTecnico(tecnicoId),
                ordenService.porTecnico(tecnicoId)
            ]);
            console.log("Tickets:", tickets);
            console.log("Ordenes:", ordenes);

            const ticketsAbiertos = tickets.filter(t => t.est !== "CERRADO");
            const ticketsAltaPrioridad = tickets.filter(t => t.priori === "ALTA" || t.priori === "CRITICA");

            const hoy = new Date().toDateString();
            const ordenesHoy = ordenes.filter(o => {
                if (!o.fechaProgramada) return true;
                return new Date(o.fechaProgramada).toDateString() === hoy;
            });
            const enCurso = ordenesHoy.filter(o => o.estado === "EN_CURSO").length;
            const pendientes = ordenesHoy.filter(o => o.estado === "PENDIENTE").length;
            const completadas = ordenesHoy.filter(o => o.estado === "CERRADA").length;

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

    if (loadingUsuario) return <p>Cargando...</p>;

    return (
        <div className="home-container">
            <header><SigmaHeader /></header>
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
                                <AgendaMantenimientos tecnicoId={usuario?.id} />
                            </div>
                            <div className="container-derecho">
                                <TicketsMantenimientoCurso tecnicoId={usuario?.id} />
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default HomeTecniMantenimiento;