import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Detalles_mantenimiento.css";
import SigmaHeader from "../../../Components/sigmaHeader";
import VerticalNav from "../../../Components/verticalNav";

function Detalles_mantenimiento() {
  const navigate = useNavigate();
  const location = useLocation();
  const activo = location.state?.activo;

  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);

  const menuItems = [
    { to: "/HomeTecniMantenimiento", label: "General" },
    { to: "/Activos_mantenimiento", label: "Activos" },
    { to: "/Tickets_mantenimiento", label: "Tickets" },
    { to: "/MantenimientosTecniMantenimiento", label: "Mantenimientos" }
  ];

  useEffect(() => {
    if (!activo?.id) return;
    fetch("http://localhost:8080/api/ordenes", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(r => r.json())
      .then(data => setOrdenes(data.filter(o => o.activoId === activo.id)))
      .catch(err => console.error("Error cargando órdenes:", err))
      .finally(() => setLoading(false));
  }, [activo]);

  const getLabelEstado = (estado) => {
    const map = { EN_CURSO: "En curso", PENDIENTE: "Pendiente", CERRADA: "Cerrada" };
    return map[estado] || estado;
  };

  const getLabelTipo = (tipo) => {
    const map = { CORRECTIVO: "Correctivo", PREVENTIVO: "Preventivo", INSPECCION: "Inspección" };
    return map[tipo] || tipo;
  };

  const formatFecha = (fecha) => {
    if (!fecha) return "—";
    return new Date(fecha).toLocaleDateString("es-CO");
  };

  if (!activo) return (
    <div>
      <SigmaHeader />
      <p style={{ padding: "2rem" }}>No se encontró información del activo.</p>
    </div>
  );

  const ordenCerrada = ordenes.filter(o => o.estado === "CERRADA");
  const ultimaOrden = ordenCerrada.sort((a, b) =>
    new Date(b.fechaFin) - new Date(a.fechaFin)
  )[0];

  return (
    <div>
      <header><SigmaHeader /></header>
      <div className="layout-mantenimiento">
        <VerticalNav items={menuItems} />
        <main className="contenido-mantenimiento">
          <div className="cabecera-historial">
            <div>
              <h1>Historial de mantenimiento</h1>
              <p>{activo.titulo} · Revisa las intervenciones realizadas y próximas acciones</p>
            </div>
            <button className="btn-volver" onClick={() => navigate("/Activos_mantenimiento")}>
              Volver a activos
            </button>
          </div>

          <section className="info-activo">
            <div className="activo-datos">
              <strong>{activo.titulo}</strong>
              <span>Serie: {activo.serie || "—"} · {activo.tipo}</span>
              <span>Responsable: {activo.responsable || "—"}</span>
              <span>Último mantenimiento: {ultimaOrden ? formatFecha(ultimaOrden.fechaFin) : "Sin registros"}</span>
            </div>
            <div className="estado-actual">
              <span className="badge-operativo">Estado: {activo.estado}</span>
              <button className="btn-nuevo">Nueva orden de mantenimiento</button>
            </div>
          </section>

          <section className="resumen-historial">
            <div className="card-resumen">
              <h4>Órdenes totales</h4>
              <p className="valor">{ordenes.length}</p>
              <span>
                {ordenes.filter(o => o.tipo === "PREVENTIVO").length} preventivas ·{" "}
                {ordenes.filter(o => o.tipo === "CORRECTIVO").length} correctivas
              </span>
            </div>
            <div className="card-resumen">
              <h4>Órdenes cerradas</h4>
              <p className="valor">{ordenCerrada.length}</p>
              <span>De {ordenes.length} intervenciones totales</span>
            </div>
            <div className="card-resumen">
              <h4>Estado actual</h4>
              <p className="valor">{activo.estado}</p>
              <span>Descripción: {activo.descripcion || "—"}</span>
            </div>
          </section>

          {loading ? (
            <p style={{ padding: "1rem" }}>Cargando historial...</p>
          ) : (
            <table className="tabla-historial">
              <thead>
                <tr>
                  <th>Orden</th>
                  <th>Tipo</th>
                  <th>Estado</th>
                  <th>Técnico</th>
                  <th>Descripción</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {ordenes.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center", padding: 30 }}>
                      No hay órdenes registradas para este activo
                    </td>
                  </tr>
                ) : (
                  ordenes.map((o) => (
                    <tr key={o.id}>
                      <td>{o.ordenId || o.id}</td>
                      <td>{getLabelTipo(o.tipo)}</td>
                      <td>
                        <span className={`estado-orden ${o.estado === "CERRADA" ? "cerrada" : "seguimiento"}`}>
                          {getLabelEstado(o.estado)}
                        </span>
                      </td>
                      <td>{o.tecnicoNombre || "—"}</td>
                      <td className="descripcion">{o.descripcion || "—"}</td>
                      <td>{formatFecha(o.fechaProgramada)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          <div className="nota-final">
            <strong>¿Falta alguna intervención?</strong>
            <p>
              Si detectas un mantenimiento que no aparece en el historial,
              puedes registrarlo creando una nueva orden asociada a este activo.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Detalles_mantenimiento;