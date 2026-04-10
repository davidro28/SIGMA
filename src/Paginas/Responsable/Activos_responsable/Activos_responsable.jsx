import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SigmaHeader from "../../../Components/sigmaHeader";
import VerticalNav from "../../../Components/verticalNav";
import "./Activos_responsable.css";
 
function Activos_responsable() {
  const navigate = useNavigate();
 
  const menuItems = [
    { to: "/Home_responsable", label: "General" },
    { to: "/Activos_responsable", label: "Activos" },
    { to: "/MisTickets", label: "Tickets" },
  ];
 
  const [activos, setActivos] = useState([]);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);
  const [activoSeleccionado, setActivoSeleccionado] = useState(null);
 
  useEffect(() => {
    const init = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("1. Token:", token); // ¿Hay token?
 
        const resUsuario = await fetch("http://localhost:8080/api/usuarios/ActRes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("2. Status /ActRes:", resUsuario.status); // ¿Llega al endpoint?
 
        if (!resUsuario.ok) {
          console.error("No se pudo obtener el usuario actual. Status:", resUsuario.status);
          setLoading(false);
          return;
        }
 
        const usuario = await resUsuario.json();
        console.log("3. Usuario obtenido:", usuario); // ¿Tiene campo nombre?
        setUsuarioActual(usuario);
 
        const resActivos = await fetch("http://localhost:8080/api/activos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await resActivos.json();
        console.log("4. Todos los activos:", data); // ¿Llegan activos? ¿Qué valor tiene responsable?
        console.log("5. Nombre del usuario para filtrar:", usuario.nombre); // ¿Coincide con responsable?
 
        const misActivos = data.filter(
          (a) => a.responsable?.toLowerCase() === usuario.nombre?.toLowerCase()
        );
        console.log("6. Mis activos filtrados:", misActivos); // ¿Filtra bien?
 
        setActivos(misActivos);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
 
    init();
  }, []);
 
  const activosFiltrados = activos.filter(({ titulo, tipo, estado }) => {
    const busquedaLower = busqueda.toLowerCase();
    const matchBusqueda =
      titulo?.toLowerCase().includes(busquedaLower) ||
      tipo?.toLowerCase().includes(busquedaLower);
    const matchTipo = filtroTipo === "Todos" || tipo === filtroTipo;
    const matchEstado = filtroEstado === "Todos" || estado === filtroEstado;
    return matchBusqueda && matchTipo && matchEstado;
  });
 
  const estadoClass = (estado = "") =>
    `estado estado-${estado.toLowerCase().replace(/ /g, "-")}`;
 
  return (
    <div className="layout-container-responsable">
      <SigmaHeader />
      <div className="content-area">
        <VerticalNav items={menuItems} />
        <main className="page-content">
 
          <section className="header-tickets">
            <h1>Mis activos</h1>
            <p>
              {usuarioActual
                ? `Hola, ${usuarioActual.nombre}. Estos son los equipos bajo tu responsabilidad.`
                : "Solo se muestran los activos asignados a tu usuario"}
            </p>
          </section>
 
          <section className="filtros-rapidos">
            <h4>Activos asignados</h4>
            <p>Consulta el detalle de los equipos y periféricos que tienes a tu cargo</p>
 
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
                <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
                  <option>Todos</option>
                  <option>Celular</option>
                  <option>Tablet</option>
                  <option>Periférico</option>
                  <option>Pantalla</option>
                  <option>Computadora</option>
                </select>
              </label>
              <label className="grupo-filtro">
                Estado:
                <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
                  <option>Todos</option>
                  <option>Disponible</option>
                  <option>Asignado</option>
                  <option>En reparación</option>
                  <option>De baja</option>
                </select>
              </label>
            </div>
 
            {loading ? (
              <p style={{ textAlign: "center", color: "#94a3b8", padding: "20px" }}>
                Cargando tus activos...
              </p>
            ) : (
              <table className="tabla-tickets">
                <thead>
                  <tr>
                    <th>Activo</th>
                    <th>Tipo</th>
                    <th>Estado</th>
                    <th>Asignado a</th>
                    <th>Acciones</th>
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
                            src={activo.img || "/assets/default.png"}
                            alt={activo.titulo}
                            className="img-activo"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/assets/default.png";
                            }}
                          />
                          <div className="detalle-activo">
                            <strong>{activo.titulo}</strong>
                            <span>{activo.serie || "Sin serie"}</span>
                          </div>
                        </td>
                        <td>{activo.tipo || "—"}</td>
                        <td>
                          <span className={estadoClass(activo.estado)}>
                            {activo.estado}
                          </span>
                        </td>
                        <td>{activo.responsable}</td>
                        <td className="td-acciones">
                          <button
                            className="btn-accion btn-detalle"
                            onClick={() => setActivoSeleccionado(activo)}
                          >
                            Ver detalles
                          </button>
                          <button
                            className="btn-accion btn-ticket"
                            onClick={() =>
                              navigate("/NuevoMisTickets", {
                                state: {
                                  activoId: activo.id,
                                  activoTitulo: activo.titulo,
                                },
                              })
                            }
                          >
                            Crear ticket
                          </button>
                          <button
                            className="btn-accion btn-mant"
                            onClick={() =>
                              navigate("/NuevoMantenimiento", {
                                state: {
                                  activoId: activo.id,
                                  activoTitulo: activo.titulo,
                                },
                              })
                            }
                          >
                            Mantenimiento
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
 
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
 
      {/* MODAL VER DETALLES */}
      {activoSeleccionado && (
        <div className="modal-overlay" onClick={() => setActivoSeleccionado(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActivoSeleccionado(null)}>
              ✕
            </button>
 
            <div className="modal-img-container">
              <img
                src={activoSeleccionado.img || "/assets/default.png"}
                alt={activoSeleccionado.titulo}
                className="modal-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/assets/default.png";
                }}
              />
            </div>
 
            <div className="modal-info">
              <h2 className="modal-titulo">{activoSeleccionado.titulo}</h2>
              <span className={estadoClass(activoSeleccionado.estado)}>
                {activoSeleccionado.estado}
              </span>
 
              <div className="modal-detalles">
                <div className="modal-fila">
                  <span className="modal-label">Tipo</span>
                  <span>{activoSeleccionado.tipo}</span>
                </div>
                <div className="modal-fila">
                  <span className="modal-label">N° de serie</span>
                  <span>{activoSeleccionado.serie || "—"}</span>
                </div>
                <div className="modal-fila">
                  <span className="modal-label">Responsable</span>
                  <span>{activoSeleccionado.responsable}</span>
                </div>
                <div className="modal-fila">
                  <span className="modal-label">Descripción</span>
                  <span>{activoSeleccionado.descripcion || "Sin descripción"}</span>
                </div>
              </div>
 
              <div className="modal-actions">
                <button
                  className="btn-accion btn-ticket"
                  onClick={() => {
                    setActivoSeleccionado(null);
                    navigate("/NuevoMisTickets", {
                      state: {
                        activoId: activoSeleccionado.id,
                        activoTitulo: activoSeleccionado.titulo,
                      },
                    });
                  }}
                >
                  Crear ticket
                </button>
                <button
                  className="btn-accion btn-mant"
                  onClick={() => {
                    setActivoSeleccionado(null);
                    navigate("/NuevoMantenimiento", {
                      state: {
                        activoId: activoSeleccionado.id,
                        activoTitulo: activoSeleccionado.titulo,
                      },
                    });
                  }}
                >
                  Mantenimiento
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
 
export default Activos_responsable;