import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VerticalNav from "../../../Components/verticalNav/index.jsx";
import SigmaHeader from "../../../Components/sigmaHeader";
import "./Activos.css";

import { apiFetch } from "../../../API/RegistroAPI.js";

export default function Activos() {
  const navigate = useNavigate();

  const [activos, setActivos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Todos");

  const [activoSeleccionado, setActivoSeleccionado] = useState(null);

  const [modalResponsable, setModalResponsable] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [activoParaResponsable, setActivoParaResponsable] = useState(null);

  /*
   * =========================================================
   * CARGAR ACTIVOS
   * =========================================================
   */
  const cargarActivos = async () => {
    try {
      const data = await apiFetch("/api/activos");

      setActivos(data);
    } catch (error) {
      console.error("Error al cargar activos:", error);
    }
  };

  /*
   * =========================================================
   * CARGAR USUARIOS
   * =========================================================
   */
  const cargarUsuarios = async () => {
    try {
      const data = await apiFetch("/api/usuarios");

      setUsuarios(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  /*
   * =========================================================
   * ABRIR MODAL RESPONSABLE
   * =========================================================
   */
  const abrirModalResponsable = (activo) => {
    setActivoParaResponsable(activo);
    setModalResponsable(true);

    cargarUsuarios();
  };

  /*
   * =========================================================
   * ASIGNAR RESPONSABLE
   * =========================================================
   */
  const asignarResponsable = async (nombreResponsable) => {
    if (!activoParaResponsable?.id) {
      console.error("No se encontró el activo seleccionado");
      return;
    }

    const id = activoParaResponsable.id;

    try {
      await apiFetch(`/api/activos/${id}/responsable`, {
        method: "PUT",
        body: {
          responsable: nombreResponsable,
        },
      });

      setModalResponsable(false);
      setActivoParaResponsable(null);

      await cargarActivos();
    } catch (error) {
      console.error("Error al asignar responsable:", error);

      alert("No fue posible asignar el responsable.");
    }
  };

  /*
   * =========================================================
   * CARGA INICIAL
   * =========================================================
   */
  useEffect(() => {
    cargarActivos();
  }, []);

  /*
   * =========================================================
   * MENÚ
   * =========================================================
   */
  const menuItems = [
    { to: "/General", label: "General" },
    { to: "/Activos", label: "Activos" },
    { to: "/Tickets", label: "Tickets" },
    { to: "/Mantenimiento_Admin", label: "Mantenimiento" },
    { to: "/Panel_Admin", label: "Panel de control" },
  ];

  /*
   * =========================================================
   * FILTROS
   * =========================================================
   */
  const activosFiltrados = activos.filter((item) => {
    const matchesSearch = item.titulo
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "Todos" || item.tipo === filter;

    return matchesSearch && matchesFilter;
  });

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */
  return (
    <>
      <SigmaHeader />

      <div className="layout-container-admin">
        <VerticalNav items={menuItems} />

        <div className="activos-container">
          <h1 className="page-title">
            Catálogo de activos
          </h1>

          <p className="page-subtitle">
            Visualiza los activos con su imagen, tipo y estado
          </p>

          {/* =========================
              BARRA SUPERIOR
          ========================== */}

          <div className="top-bar">
            <input
              type="text"
              placeholder="Buscar activo por nombre"
              className="search-input"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />

            <button
              className="btn-new"
              onClick={() => navigate("/NuevoActivo")}
            >
              Nuevo activo
            </button>
          </div>

          {/* =========================
              FILTROS
          ========================== */}

          <div className="filter-options">
            {[
              "Todos",
              "Celular",
              "Tablet",
              "Periféricos",
              "Pantalla",
            ].map((tipo) => (
              <button
                key={tipo}
                className={`filter-btn ${
                  filter === tipo ? "active" : ""
                }`}
                onClick={() => setFilter(tipo)}
              >
                {tipo}
              </button>
            ))}
          </div>

          {/* =========================
              GRID DE ACTIVOS
          ========================== */}

          <div className="assets-grid">
            {activosFiltrados.length > 0 ? (
              activosFiltrados.map((item) => (
                <div
                  key={item.id}
                  className="asset-card"
                >
                  <img
                    src={
                      item.img ||
                      "/placeholder.png"
                    }
                    className="asset-img"
                    alt={
                      item.titulo || "Activo"
                    }
                  />

                  <h3 className="asset-title">
                    {item.titulo ||
                      "Sin título"}
                  </h3>

                  <div className="asset-meta">
                    <span>
                      {item.tipo ||
                        "Sin tipo"}
                    </span>

                    <span
                      className={`estado estado-${(
                        item.estado || ""
                      )
                        .toLowerCase()
                        .replace(/ /g, "-")}`}
                    >
                      {item.estado ||
                        "Desconocido"}
                    </span>
                  </div>

                  <div className="asset-links">
                    <button
                      className="link"
                      onClick={() =>
                        setActivoSeleccionado(item)
                      }
                    >
                      Ver detalles
                    </button>

                    <button
                      className="link"
                      onClick={() =>
                        abrirModalResponsable(item)
                      }
                    >
                      Responsable
                    </button>

                    <button className="link">
                      Mantenimiento
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>
                No hay activos que coincidan
                con la búsqueda o filtro.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          MODAL VER DETALLES
      ====================================================== */}

      {activoSeleccionado && (
        <div
          className="modal-overlay"
          onClick={() =>
            setActivoSeleccionado(null)
          }
        >
          <div
            className="modal-card"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <button
              className="modal-close"
              onClick={() =>
                setActivoSeleccionado(null)
              }
            >
              ✕
            </button>

            <div className="modal-img-container">
              <img
                src={
                  activoSeleccionado.img ||
                  "/placeholder.png"
                }
                alt={
                  activoSeleccionado.titulo
                }
                className="modal-img"
              />
            </div>

            <div className="modal-info">
              <h2 className="modal-titulo">
                {activoSeleccionado.titulo}
              </h2>

              <span
                className={`estado estado-${(
                  activoSeleccionado.estado ||
                  ""
                )
                  .toLowerCase()
                  .replace(/ /g, "-")}`}
              >
                {activoSeleccionado.estado}
              </span>

              <div className="modal-detalles">
                <div className="modal-fila">
                  <span className="modal-label">
                    Tipo
                  </span>

                  <span>
                    {activoSeleccionado.tipo ||
                      "—"}
                  </span>
                </div>

                <div className="modal-fila">
                  <span className="modal-label">
                    N° de serie
                  </span>

                  <span>
                    {activoSeleccionado.serie ||
                      "—"}
                  </span>
                </div>

                <div className="modal-fila">
                  <span className="modal-label">
                    Responsable
                  </span>

                  <span>
                    {activoSeleccionado.responsable ||
                      "Sin asignar"}
                  </span>
                </div>

                <div className="modal-fila">
                  <span className="modal-label">
                    Descripción
                  </span>

                  <span>
                    {activoSeleccionado.descripcion ||
                      "—"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          MODAL RESPONSABLE
      ====================================================== */}

      {modalResponsable && (
        <div
          className="modal-overlay"
          onClick={() =>
            setModalResponsable(false)
          }
        >
          <div
            className="modal-card"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <button
              className="modal-close"
              onClick={() =>
                setModalResponsable(false)
              }
            >
              ✕
            </button>

            <h2 className="modal-titulo">
              Asignar responsable
            </h2>

            <p className="modal-subtitulo">
              Activo:{" "}
              <strong>
                {activoParaResponsable?.titulo}
              </strong>
            </p>

            <p className="modal-responsable-actual">
              Responsable actual:{" "}
              <strong>
                {activoParaResponsable?.responsable ||
                  "Sin asignar"}
              </strong>
            </p>

            <div className="usuarios-lista">
              {usuarios.length > 0 ? (
                usuarios.map((u) => (
                  <div
                    key={u.id}
                    className="usuario-item"
                    onClick={() =>
                      asignarResponsable(
                        u.nombre
                      )
                    }
                  >
                    <div className="usuario-avatar">
                      {u.nombre
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="usuario-datos">
                      <span className="usuario-nombre">
                        {u.nombre}
                      </span>

                      <span className="usuario-email">
                        {u.email}
                      </span>
                    </div>

                    <span className="usuario-seleccionar">
                      Asignar →
                    </span>
                  </div>
                ))
              ) : (
                <p>
                  Cargando usuarios...
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}