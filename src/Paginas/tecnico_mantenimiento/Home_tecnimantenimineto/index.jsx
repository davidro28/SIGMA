import React, { useState, useEffect } from "react";
import "./styles.css";

import SigmaHeader from "../../../Components/sigmaHeader";
import VerticalNav from "../../../Components/verticalNav";
import CuadroInformativo from "../../../Components/cuadroInformacion";
import AgendaMantenimientos from "./Agenda_mantenimientos/index";
import TicketsMantenimientoCurso from "./Funciones_encurso";

import {
    ticketService,
    ordenService,
    apiFetch
} from "../../../API/RegistroAPI";

import { useAuth } from "../../../Hooks/AuthContext";


function HomeTecniMantenimiento() {

    // =========================================================
    // AUTENTICACIÓN
    // =========================================================

    const {
        token,
        usuario
    } = useAuth();


    // =========================================================
    // USUARIO ACTUAL
    // =========================================================

    const [usuarioActual, setUsuarioActual] = useState(null);

    const [loadingUsuario, setLoadingUsuario] = useState(true);


    // =========================================================
    // ESTADÍSTICAS
    // =========================================================

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


    // =========================================================
    // MENÚ
    // =========================================================

    const menuItems = [
        {
            to: "/HomeTecniMantenimiento",
            label: "General"
        },
        {
            to: "/Activos_mantenimiento",
            label: "Activos"
        },
        {
            to: "/Tickets_mantenimiento",
            label: "Tickets"
        },
        {
            to: "/MantenimientosTecniMantenimiento",
            label: "Mantenimientos"
        }
    ];


    // =========================================================
    // OBTENER USUARIO ACTUAL
    // =========================================================

    useEffect(() => {

        if (!token) {

            console.warn(
                "No existe token en AuthContext."
            );

            setUsuarioActual(null);
            setLoadingUsuario(false);

            return;
        }


        const cargarUsuario = async () => {

            try {

                setLoadingUsuario(true);


                const data = await apiFetch(
                    "/api/usuarios/ActRes",
                    {
                        token
                    }
                );


                console.log(
                    "USUARIO ACTUAL TÉCNICO:",
                    data
                );


                setUsuarioActual(data);

            } catch (error) {

                console.error(
                    "Error obteniendo usuario actual:",
                    error
                );

                setUsuarioActual(null);

            } finally {

                setLoadingUsuario(false);

            }

        };


        cargarUsuario();

    }, [token]);


    // =========================================================
    // CARGAR DATOS DEL TÉCNICO
    // =========================================================

    useEffect(() => {

        if (!token || !usuarioActual?.id) {
            return;
        }


        console.log(
            "Usuario actual:",
            usuarioActual
        );


        cargarDatos(usuarioActual.id);

    }, [token, usuarioActual]);


    const cargarDatos = async (tecnicoId) => {

        console.log(
            "Cargando datos para tecnicoId:",
            tecnicoId
        );


        try {

            const [
                tickets,
                ordenes
            ] = await Promise.all([

                ticketService.porTecnico(
                    tecnicoId,
                    token
                ),

                ordenService.porTecnico(
                    tecnicoId,
                    token
                )

            ]);


            console.log(
                "Tickets:",
                tickets
            );

            console.log(
                "Ordenes:",
                ordenes
            );


            // =====================================================
            // TICKETS
            // =====================================================

            const ticketsArray =
                Array.isArray(tickets)
                    ? tickets
                    : [];


            const ordenesArray =
                Array.isArray(ordenes)
                    ? ordenes
                    : [];


            const ticketsAbiertos =
                ticketsArray.filter(
                    (t) =>
                        t.est !== "CERRADO"
                );


            const ticketsAltaPrioridad =
                ticketsArray.filter(
                    (t) =>
                        t.priori === "ALTA" ||
                        t.priori === "CRITICA"
                );


            // =====================================================
            // FECHA DE HOY
            // =====================================================

            const hoy =
                new Date().toDateString();


            const ordenesHoy =
                ordenesArray.filter((o) => {

                    if (!o.fechaProgramada) {

                        return true;
                    }


                    return (
                        new Date(
                            o.fechaProgramada
                        ).toDateString() === hoy
                    );

                });


            // =====================================================
            // ESTADOS DE ÓRDENES
            // =====================================================

            const enCurso =
                ordenesHoy.filter(
                    (o) =>
                        o.estado === "EN_CURSO"
                ).length;


            const pendientes =
                ordenesHoy.filter(
                    (o) =>
                        o.estado === "PENDIENTE"
                ).length;


            const completadas =
                ordenesHoy.filter(
                    (o) =>
                        o.estado === "CERRADA"
                ).length;


            // =====================================================
            // PREVENTIVOS
            // =====================================================

            const preventivos =
                ordenesArray.filter(
                    (o) =>
                        o.tipo === "PREVENTIVO"
                );


            const prevCompletados =
                preventivos.filter(
                    (o) =>
                        o.estado === "CERRADA"
                ).length;


            // =====================================================
            // ESTADÍSTICAS
            // =====================================================

            setStats({

                ordenesHoy:
                    ordenesHoy.length,

                ordenesDetalle:
                    `${enCurso} en curso - ${pendientes} pendientes`,

                ordenesCompletadas:
                    `Completadas: ${completadas}`,

                mantenimientosPreventivos:
                    preventivos.length,

                mantenimientosDetalle:
                    `${preventivos.length - prevCompletados} programados - ${prevCompletados} completados`,

                ticketsAsignados:
                    ticketsAbiertos.length,

                ticketsDetalle:
                    "-1 vs ayer",

                ticketsAlta:
                    `Alta prioridad: ${ticketsAltaPrioridad.length}`,

                sla:
                    "89%"

            });


        } catch (error) {

            console.error(
                "Error cargando datos del home:",
                error
            );

        }

    };


    // =========================================================
    // CARGANDO USUARIO
    // =========================================================

    if (loadingUsuario) {

        return (
            <p>
                Cargando...
            </p>
        );

    }


    // =========================================================
    // RENDER
    // =========================================================

    return (

        <div className="home-container">

            <header>
                <SigmaHeader />
            </header>


            <div className="layout">

                <VerticalNav
                    items={menuItems}
                />


                <main className="content">

                    <section>

                        <p className="parrafo-principal">
                            Vista principal
                        </p>


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

                                <AgendaMantenimientos
                                    tecnicoId={
                                        usuarioActual?.id
                                    }
                                />

                            </div>


                            <div className="container-derecho">

                                <TicketsMantenimientoCurso
                                    tecnicoId={
                                        usuarioActual?.id
                                    }
                                />

                            </div>

                        </div>

                    </section>

                </main>

            </div>

        </div>

    );
}


export default HomeTecniMantenimiento;