import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Activos_mantenimiento.css";
import SigmaHeader from "../../../Components/sigmaHeader";
import VerticalNav from "../../../Components/verticalNav";

function Activos_mantenimiento() {
  const navigate = useNavigate();

  const menuItems = [
    { to: "/HomeTecniMantenimiento", label: "General" },
    { to: "/Activos_mantenimiento", label: "Activos" },
    { to: "/Tickets_mantenimiento", label: "Tickets" },
    { to: "/MantenimientosTecniMantenimiento", label: "Mantenimientos" }
  ];

  const activos = [
    {
      codigo: "ACT-MT-0041",
      nombre: "Compresor de aire principal",
      tipo: "Equipo fijo",
      ubicacion: "Sala de máquinas - Planta Norte",
      estado: "Pendiente revisión",
      prioridad: "Crítica"
    },
    {
      codigo: "ACT-MT-0023",
      nombre: "Iphone 13",
      tipo: "Celular",
      ubicacion: "Almacén - Zona carga",
      estado: "En mantenimiento",
      prioridad: "Alta"
    },
    {
      codigo: "ACT-MT-0098",
      nombre: "Laptop mantenimiento campo",
      tipo: "Portátil",
      ubicacion: "Vehículo servicio 03",
      estado: "Operativo",
      prioridad: "Media"
    },
    {
      codigo: "ACT-MT-0065",
      nombre: "Bomba agua secundaria",
      tipo: "Equipo fijo",
      ubicacion: "Planta Sur - Sector B",
      estado: "Programado",
      prioridad: "Baja"
    }
  ];

  const [busqueda, setBusqueda] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("Todos");
  const [prioridadFiltro, setPrioridadFiltro] = useState("Todas");

  const activosFiltrados = activos.filter((activo) => {
    const texto = busqueda.toLowerCase();

    const coincideBusqueda =
      activo.nombre.toLowerCase().includes(texto) ||
      activo.codigo.toLowerCase().includes(texto) ||
      activo.ubicacion.toLowerCase().includes(texto);

    const coincideEstado =
      estadoFiltro === "Todos" || activo.estado === estadoFiltro;

    const coincidePrioridad =
      prioridadFiltro === "Todas" || activo.prioridad === prioridadFiltro;

    return coincideBusqueda && coincideEstado && coincidePrioridad;
  });

  const limpiarFiltros = () => {
    setBusqueda("");
    setEstadoFiltro("Todos");
    setPrioridadFiltro("Todas");
  };

  return (
    <div>
      {/* HEADER */}
      <header>
        <SigmaHeader />
      </header>

      <div className="layout-main">
        <VerticalNav items={menuItems} />

        <main className="page-content-gestor">
          <div className="header-tickets-gestor">
            <h1>Activos de mantenimiento</h1>
            <p>
              Consulta y gestiona los activos que requieren revisión o están en
              servicio
            </p>
          </div>

          {/* FILTROS */}
          <section className="filtros-rapidos-gestor">
            <h4>Listado de activos</h4>
            <p className="descripcion-filtros">
              Filtra por estado, prioridad o tipo para planificar tu trabajo
            </p>

            <div className="busqueda-filtros">
              <input
                type="text"
                placeholder="Buscar por nombre, código o ubicación..."
                className="input-busqueda"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />

              <div className="grupo-filtro-gestor">
                <label>Estado:</label>
                <select
                  value={estadoFiltro}
                  onChange={(e) => setEstadoFiltro(e.target.value)}
                >
                  <option>Todos</option>
                  <option>Pendiente revisión</option>
                  <option>En mantenimiento</option>
                  <option>Operativo</option>
                  <option>Programado</option>
                </select>
              </div>

              <div className="grupo-filtro-gestor">
                <label>Prioridad:</label>
                <select
                  value={prioridadFiltro}
                  onChange={(e) => setPrioridadFiltro(e.target.value)}
                >
                  <option>Todas</option>
                  <option>Crítica</option>
                  <option>Alta</option>
                  <option>Media</option>
                  <option>Baja</option>
                </select>
              </div>

              <button className="btn-limpiar" onClick={limpiarFiltros}>
                Limpiar
              </button>
            </div>
          </section>

          {/* TABLA */}
          <table className="tabla-tickets">
            <thead>
              <tr>
                <th>Activo</th>
                <th>Tipo</th>
                <th>Ubicación</th>
                <th>Estado</th>
                <th>Prioridad</th>
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
                  <tr key={activo.codigo}>
                    <td>
                      <strong>{activo.nombre}</strong>
                      <br />
                      <span className="codigo">{activo.codigo}</span>
                    </td>
                    <td>{activo.tipo}</td>
                    <td>{activo.ubicacion}</td>

                    <td>
                      <span
                        className={`estado estado-${activo.estado
                          .toLowerCase()
                          .replaceAll(" ", "-")}`}
                      >
                        {activo.estado}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`prioridad prioridad-${activo.prioridad.toLowerCase()}`}
                      >
                        {activo.prioridad}
                      </span>
                    </td>

                    <td>
                      <button
                        className="btn-ver"
                        onClick={() =>
                          navigate("/Detalles_mantenimiento", {
                            state: { activo }
                          })
                        }
                      >
                        Ver detalles
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <button className="btn-nuevo-ticket">
            Nueva orden de mantenimiento
          </button>
        </main>
      </div>
    </div>
  );
}

export default Activos_mantenimiento;
