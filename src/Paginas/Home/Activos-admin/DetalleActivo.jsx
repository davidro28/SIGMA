import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import VerticalNav from "../../../Components/verticalNav";
import SigmaHeader from "../../../Components/sigmaHeader";
import "./DetalleActivo.css";

export default function DetalleActivo() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [activo, setActivo] = useState(null);

    useEffect(() => {
        const lista = JSON.parse(localStorage.getItem("activos")) || [];
        const encontrado = lista.find(a => a.id === Number(id));
        setActivo(encontrado);
    }, [id]);

    if (!activo) {
        return <div style={{ padding: "50px", color: "white" }}>Cargando activo...</div>;
    }

    return (
        <>
            <SigmaHeader />

            <div className="layout-container">
                <VerticalNav 
                    items={[
                        { to: "/Home", label: "General" },
                        { to: "/Activos", label: "Activos" },
                        { to: "/tickets", label: "Tickets" },
                        { to: "/mantenimiento", label: "Mantenimiento" }
                    ]} 
                />

                <div className="detalle-container">

                    <button 
                        className="volver"
                        onClick={() => navigate("/Activos")}
                    >
                        Volver al catálogo
                    </button>

                    <h1 className="titulo-detalle">Detalle del activo</h1>
                    <p className="sub">Revisa la información completa y el historial de este equipo</p>

                    <div className="detalle-card">

                        {/* IZQUIERDA */}
                        <div className="detalle-left">
                            <img src={activo.img} className="detalle-img" />

                            <h2>{activo.titulo}</h2>

                            <div className="tags">
                                <span className="tag">{activo.tipo}</span>
                                <span className="estado-tag">{activo.estado}</span>
                                <span className="tag">Oficina principal</span>
                            </div>

                            <p className="desc">
                                {activo.descripcion || "Este activo no cuenta con una descripción registrada."}
                            </p>

                            <div className="acciones">
                                <button className="btn-main">Crear ticket</button>
                                <button className="btn-secondary">Registrar mantenimiento</button>
                            </div>
                        </div>

                        {/* DERECHA */}
                        <div className="detalle-right">

                            <h3>Información general</h3>

                            <div className="info-grid">
                                <div><strong>Responsable:</strong></div>
                                <div>{activo.responsable || "No asignado"}</div>

                                <div><strong>Tipo:</strong></div>
                                <div>{activo.tipo}</div>

                                <div><strong>Ubicación:</strong></div>
                                <div>Oficina principal — Piso 3</div>

                                <div><strong>Estado:</strong></div>
                                <div className="estado-tag">{activo.estado}</div>

                                <div><strong>Serie:</strong></div>
                                <div>{activo.serie || "N/A"}</div>

                                <div><strong>Fecha de alta:</strong></div>
                                <div>12/03/2024</div>
                            </div>

                            <h3>Historial reciente</h3>

                            <ul className="historial">
                                <li>05/06/2024 - Ticket #234 — Revisión de batería</li>
                                <li>21/05/2024 - Mantenimiento — Cambio protector de pantalla</li>
                                <li>02/04/2024 - Asignación — Asignado a {activo.responsable || "usuario"}</li>
                            </ul>

                        </div>

                    </div>

                    <div className="acciones-final">
                        <button 
                            className="btn-cancelar"
                            onClick={() => navigate("/Activos")}
                        >
                            Cancelar
                        </button>

                        <button className="btn-guardar">
                            Guardar cambios
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}
