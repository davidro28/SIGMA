import React from "react";
import "./styles.css";

function MisTickets() {
    return (
        <div className="tickets-box">
            <div className="tickets-header">
                <div>
                    <h3>Mis tickets</h3>
                    <span>Resumen rápido</span>
                </div>
                <a href="#" className="ver-todos">Ver todos</a>
            </div>
            <div className="resumen-lista">
                <div className="resumen-item">
                    <p className="titulo">
                        3 tickets con SLA a punto de vencer
                        <span className="badge urgente">Urgente</span>
                    </p>
                    <span className="sub">
                        Prioridad alta · Resolver antes de las 18:00
                    </span>
            </div>
            <div className="resumen-item">
                <p className="titulo">
                    2 tickets esperando tu respuesta
                    <span className="badge seguimiento">Seguimiento</span>
                </p>
                <span className="sub">
                    Actualiza comentarios o adjunta evidencia
                </span>
            </div>
            <div className="resumen-item">
                <p className="titulo">
                    Buen desempeño
                    <span className="badge ok">OK</span>
                </p>
                <span className="sub">
                    9 de 10 tickets resueltos dentro de SLA este mes
                </span>
            </div>
        </div>
        <h4 className="seccion">Tickets asignados a ti</h4>
        <div className="tabla">
            <div className="head">
                <span>Ticket</span>
                <span>Activo</span>
                <span>Estado</span>
                <span>Prioridad</span>
            </div>
            <div className="fila">
                <span>#320</span>
                <span className="bold">Climatizador sala 4</span>
                <span className="estado abierto">Abierto</span>
                <span>Alta</span>
            </div>
            <div className="fila">
                <span>#317</span>
                <span className="bold">Servidor SIG-03</span>
                <span className="estado progreso">En progreso</span>
                <span>Crítica</span>
            </div>
            <div className="fila">
                <span>#311</span>
                <span className="bold">UPS principal</span>
                <span className="estado abierto">Abierto</span>
                <span>Media</span>
            </div>
        </div>
        <h4 className="seccion">Acciones rápidas</h4>
        <div className="acciones">
            <span>Crear ticket para un activo mío</span>
            <span>Actualizar estado de ticket</span>
            <span>Registrar mantenimiento realizado</span>
            <span>Adjuntar evidencia</span>
        </div>
        <h4 className="seccion">Rendimiento personal</h4>
        <div className="grafico">
            Gráfico · Tickets creados vs resueltos por día (tú)
        </div>
        </div>
    );
}

export default MisTickets;