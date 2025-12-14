import React, { useState } from "react";
import SigmaHeader from "../../../Components/sigmaHeader";
import VerticalNav from "../../../Components/verticalNav";
import "./Home_responsable.css";

const activosIniciales = [
  {
    id: "ACT-00125",
    nombre: "iPhone 13 Soporte",
    tipo: "Celular",
    ubicacion: "Oficina principal",
    estado: "En Uso",
    asignadoA: "María Pérez",
    imagen: "iphone13.png",
  },
  {
    id: "ACT-00087",
    nombre: 'Laptop Dell 14"',
    tipo: "Portátil",
    ubicacion: "Planta Norte",
    estado: "Operativo",
    asignadoA: "María Pérez",
    imagen: "laptopdell14.png",
  },
  {
    id: "ACT-00210",
    nombre: 'Monitor 24" Escritorio',
    tipo: "Pantalla",
    ubicacion: "Estación 12 - Planta Norte",
    estado: "Asignado",
    asignadoA: "María Pérez",
    imagen: "monitor24.png",
  },
];

function Home_responsable() {
  const menuItems = [
    { to: "/Home_responsable", label: "Mis Activos" },
    { to: "/MisTickets", label: "Mis Tickets" },
  ];

  const [activos, setActivos] = useState(activosIniciales);
  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  const activosFiltrados = activos.filter(({ nombre, tipo, estado }) => {
    const busquedaLower = busqueda.toLowerCase();
    const matchBusqueda =
      nombre.toLowerCase().includes(busquedaLower) ||
      tipo.toLowerCase().includes(busquedaLower);
    const matchTipo = filtroTipo === "Todos" || tipo === filtroTipo;
    const matchEstado = filtroEstado === "Todos" || estado === filtroEstado;
    return matchBusqueda && matchTipo && matchEstado;
  });

  return (
    <div className="layout-container-responsable">
      <SigmaHeader />
      <div className="content-area">
        <VerticalNav items={menuItems} />
        <main className="page-content">
          <section className="header-tickets">
            <h1>Mis activos</h1>
            <p>Solo se muestran los activos asignados a tu usuario</p>
          </section>

          <section className="filtros-rapidos">
            <h4>Activos asignados</h4>
            <p>
              Consulta el detalle de los equipos y periféricos que tienes a tu
              cargo
            </p>

            <div className="busqueda-filtros">
              <input
                type="text"
                className="input-busqueda"
                placeholder="Buscar por nombre o código..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <label className="grupo-filtro">
                Tipo:
                <select
                  value={filtroTipo}
                  onChange={(e) => setFiltroTipo(e.target.value)}
                >
                  <option>Todos</option>
                  <option>Celular</option>
                  <option>Portátil</option>
                  <option>Pantalla</option>
                </select>
              </label>
              <label className="grupo-filtro">
                Estado:
                <select
                  value={filtroEstado}
                  onChange={(e) => setFiltroEstado(e.target.value)}
                >
                  <option>Todos</option>
                  <option>En Uso</option>
                  <option>Operativo</option>
                  <option>Asignado</option>
                </select>
              </label>
            </div>

            <table className="tabla-tickets">
              <thead>
                <tr>
                  <th>Activo</th>
                  <th>Tipo</th>
                  <th>Ubicación</th>
                  <th>Estado</th>
                  <th>Asignado a</th>
                </tr>
              </thead>
              <tbody>
                {activosFiltrados.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      style={{ textAlign: "center", color: "#94a3b8", padding: "20px" }}
                    >
                      No se encontraron activos con esos filtros.
                    </td>
                  </tr>
                ) : (
                  activosFiltrados.map((activo) => (
                    <tr key={activo.id}>
                      <td className="td-activo">
                        <img
                          src={activo.imagen ? `/assets/${activo.imagen}` : "/assets/default.png"}
                          alt={activo.nombre}
                          className="img-activo"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/assets/default.png";
                          }}
                        />
                        <div className="detalle-activo">
                          <strong>{activo.nombre}</strong>
                          <span>{activo.id}</span>
                        </div>
                      </td>
                      <td>{activo.tipo}</td>
                      <td>{activo.ubicacion}</td>
                      <td>
                        <span
                          className={`estado estado-${activo.estado
                            .toLowerCase()
                            .replace(/ /g, "-")}`}
                        >
                          {activo.estado}
                        </span>
                      </td>
                      <td>{activo.asignadoA}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            <div className="info-faltante">
              <strong>¿Falta algún activo?</strong>
              <p>
                Si consideras que tienes un activo que no aparece en esta lista,
                crea un ticket indicando el código o una descripción del equipo
                para que el área de TI lo revise.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Home_responsable;