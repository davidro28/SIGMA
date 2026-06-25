import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Activos_mantenimiento.css";
import SigmaHeader from "../../../Components/sigmaHeader";
import VerticalNav from "../../../Components/verticalNav";

function Activos_mantenimiento() {
  const navigate = useNavigate();
  const [activos, setActivos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("Todos");
  const [prioridadFiltro, setPrioridadFiltro] = useState("Todas");

  const menuItems = [
    { to: "/HomeTecniMantenimiento", label: "General" },
    { to: "/Activos_mantenimiento", label: "Activos" },
    { to: "/Tickets_mantenimiento", label: "Tickets" },
    { to: "/MantenimientosTecniMantenimiento", label: "Mantenimientos" }
  ];

  useEffect(() => {
    fetch("http://localhost:8080/api/activos", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(r => r.json())
      .then(data => setActivos(data))
      .catch(err => console.error("Error cargando activos:", err))
      .finally(() => setLoading(false));
  }, []);

  const activosFiltrados = activos.filter((activo) => {
    const texto = busqueda.toLowerCase();
    const coincideBusqueda =
      (activo.titulo || "").toLowerCase().includes(texto) ||
      (activo.id || "").toLowerCase().includes(texto) ||
      (activo.serie || "").toLowerCase().includes(texto);

    const coincideEstado =
      estadoFiltro === "Todos" || activo.estado === estadoFiltro;

    const coincidePrioridad = prioridadFiltro === "Todas";

    return coincideBusqueda && coincideEstado && coincidePrioridad;
  });

  const limpiarFiltros = () => {
    setBusqueda("");
    setEstadoFiltro("Todos");
    setPrioridadFiltro("Todas");
  };

  return (
    <div>
      <header><SigmaHeader /></header>
      <div className="layout-main">
        <VerticalNav items={menuItems} />
        <main className="page-content-gestor">
          <div className="header-tickets-gestor">
            <h1>Activos de mantenimiento</h1>
            <p>Consulta y gestiona los activos que requieren revisión o están en servicio</p>
          </div>

          <section className="filtros-rapidos-gestor">
            <h4>Listado de activos</h4>
            <p className="descripcion-filtros">
              Filtra por estado o tipo para planificar tu trabajo
            </p>
            <div className="busqueda-filtros">
              <input
                type="text"
                placeholder="Buscar por nombre, código o serie..."
                className="input-busqueda"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <div className="grupo-filtro-gestor">
                <label>Estado:</label>
                <select value={estadoFiltro} onChange={(e) => setEstadoFiltro(e.target.value)}>
                  <option>Todos</option>
                  <option>Disponible</option>
                  <option>Asignado</option>
                  <option>En reparación</option>
                  <option>De baja</option>
                </select>
              </div>
              <button className="btn-limpiar" onClick={limpiarFiltros}>Limpiar</button>
            </div>
          </section>

          {loading ? (
            <p style={{ padding: "1rem" }}>Cargando activos...</p>
          ) : (
            <table className="tabla-tickets">
              <thead>
                <tr>
                  <th>Activo</th>
                  <th>Tipo</th>
                  <th>Serie</th>
                  <th>Estado</th>
                  <th>Responsable</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {activosFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center", padding: 30 }}>
                      No se encontraron activos
                    </td>
                  </tr>
                ) : (
                  activosFiltrados.map((activo) => (
                    <tr key={activo.id}>
                      <td>
                        <strong>{activo.titulo}</strong>
                        <br />
                        <span className="codigo">{activo.id}</span>
                      </td>
                      <td>{activo.tipo}</td>
                      <td>{activo.serie || "—"}</td>
                      <td>
                        <span className={`estado estado-${(activo.estado || "").toLowerCase().replaceAll(" ", "-")}`}>
                          {activo.estado}
                        </span>
                      </td>
                      <td>{activo.responsable || "—"}</td>
                      <td>
                        <button
                          className="btn-ver"
                          onClick={() => navigate("/Detalles_mantenimiento", { state: { activo } })}
                        >
                          Ver detalles
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          <button className="btn-nuevo-ticket">Nueva orden de mantenimiento</button>
        </main>
      </div>
    </div>
  );
}

export default Activos_mantenimiento;