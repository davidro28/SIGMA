import React, { useState, useEffect } from "react";
import "./styles.css";
import { ordenService } from "../../../../API/RegistroAPI";

function OrdenesMantenimiento({ filtroTab, onSeleccionar }) {
    const tecnicoId = localStorage.getItem("usuario");
    const [ordenes, setOrdenes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ordenService.porTecnico(tecnicoId)
            .then(data => setOrdenes(filtrarPorTab(data, filtroTab)))
            .catch(err => console.error("Error:", err))
            .finally(() => setLoading(false));
    }, [filtroTab]);

    const filtrarPorTab = (data, tab) => {
        const hoy = new Date().toDateString();
        if (tab === "hoy") return data.filter(o =>
            o.fechaProgramada && new Date(o.fechaProgramada).toDateString() === hoy
        );
        if (tab === "semana") {
            const fin = new Date();
            fin.setDate(fin.getDate() + 7);
            return data.filter(o =>
                o.fechaProgramada && new Date(o.fechaProgramada) <= fin
            );
        }
        return data;
    };

    const labelTipo = (tipo) => {
        if (!tipo) return "—";
        const map = { CORRECTIVO: "Correctivo", PREVENTIVO: "Preventivo", INSPECCION: "Inspección" };
        return map[tipo] || tipo;
    };

    const labelEstado = (estado) => {
        const map = { EN_CURSO: "En ejecución", PENDIENTE: "Pendiente", CERRADA: "Completado" };
        return map[estado] || estado;
    };

    const getBadgeTipo = (tipo) => {
        const map = { CORRECTIVO: "correctivo", PREVENTIVO: "preventivo", INSPECCION: "inspeccion" };
        return map[tipo] || "";
    };

    const getBadgeEstado = (estado) => {
        const map = { EN_CURSO: "ejecucion", PENDIENTE: "pendiente", CERRADA: "completado" };
        return map[estado] || "";
    };

    const formatHora = (fecha) => {
        if (!fecha) return "Por definir";
        return new Date(fecha).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });
    };

    const handleCambiarEstado = async (e, orden) => {
        e.stopPropagation();
        const estados = ["PENDIENTE", "EN_CURSO", "CERRADA"];
        const siguiente = estados[(estados.indexOf(orden.estado) + 1) % estados.length];
        try {
            await ordenService.cambiarEstado(orden.id, siguiente);
            setOrdenes(prev => prev.map(o => o.id === orden.id ? { ...o, estado: siguiente } : o));
        } catch (err) {
            console.error("Error al cambiar estado:", err);
        }
    };

    return (
        <div className="oat-container">
            <div className="oat-header">
                <div>
                    <h3>Órdenes de mantenimiento en activos tecnológicos</h3>
                    <div className="oat-legend">
                        <span className="dot preventivo">Preventivo</span>
                        <span className="dot correctivo">Correctivo</span>
                        <span className="dot inspeccion">Inspección</span>
                    </div>
                </div>
                <span className="oat-link">Exportar</span>
            </div>

            <table className="oat-table">
                <thead>
                    <tr>
                        <th>Orden</th>
                        <th>Activo TI</th>
                        <th>Tipo</th>
                        <th>Inicio</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr><td colSpan={6}>Cargando órdenes...</td></tr>
                    ) : ordenes.length === 0 ? (
                        <tr><td colSpan={6}>No hay órdenes para este período</td></tr>
                    ) : (
                        ordenes.map(o => (
                            <tr key={o.id} onClick={() => onSeleccionar?.(o)} style={{ cursor: "pointer" }}>
                                <td>{o.ordenId || o.id}</td>
                                <td>{o.activoNombre} · {o.ubicacion || "—"}</td>
                                <td>
                                    <span className={`badge tipo ${getBadgeTipo(o.tipo)}`}>
                                        {labelTipo(o.tipo)}
                                    </span>
                                </td>
                                <td>{formatHora(o.fechaProgramada)}</td>
                                <td>
                                    <span className={`badge estado ${getBadgeEstado(o.estado)}`}>
                                        {labelEstado(o.estado)}
                                    </span>
                                </td>
                                <td>
                                    <button className="accion-btn" onClick={(e) => handleCambiarEstado(e, o)}>
                                        Cambiar estado
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className="oat-divider" />
            <h4 className="oat-subtitle">Próximos mantenimientos preventivos de equipos</h4>

            <table className="oat-table small">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Activo TI</th>
                        <th>Tipo</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {ordenes
                        .filter(o => o.tipo === "PREVENTIVO" && o.estado !== "CERRADA")
                        .slice(0, 3)
                        .map(o => (
                            <tr key={o.id}>
                                <td>{o.ventana || formatHora(o.fechaProgramada)}</td>
                                <td>{o.activoNombre}</td>
                                <td>{labelTipo(o.tipo)}</td>
                                <td>
                                    <span className={`badge estado ${getBadgeEstado(o.estado)}`}>
                                        {labelEstado(o.estado)}
                                    </span>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default OrdenesMantenimiento;