import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VerticalNav from "../../../Components/verticalNav/index.jsx";
import SigmaHeader from "../../../Components/sigmaHeader";
import "./Activos.css";

export default function Activos() {
  const navigate = useNavigate();
  const [activos, setActivos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Todos");

  // Cargar activos desde localStorage
  const cargarActivos = () => {
    const data = JSON.parse(localStorage.getItem("activos")) || [];
    setActivos(data);
  };

  useEffect(() => {
    cargarActivos();
  }, []);

  const menuItems = [
    { to: "/General", label: "General" },
    { to: "/Activos", label: "Activos" },
    { to: "/Tickets", label: "Tickets" },
    { to: "/Mantenimiento", label: "Mantenimiento" }
  ];

  // Filtrar activos según búsqueda y filtro
  const activosFiltrados = activos.filter(item => {
    const matchesSearch = item.titulo?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "Todos" || item.tipo === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <SigmaHeader />
      <div className="layout-container">
        <VerticalNav items={menuItems} />

        <div className="activos-container">
          <h1 className="page-title">Catálogo de activos</h1>
          <p className="page-subtitle">Visualiza los activos con su imagen, tipo y estado</p>

          <div className="top-bar">
            <input
              type="text"
              placeholder="Buscar activo por nombre"
              className="search-input"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button className="btn-new" onClick={() => navigate("/NuevoActivo")}>
              Nuevo activo
            </button>
          </div>

          <div className="filter-options">
            {["Todos", "Celular", "Tablet", "Periféricos", "Pantalla"].map(tipo => (
              <button
                key={tipo}
                className={`filter-btn ${filter === tipo ? "active" : ""}`}
                onClick={() => setFilter(tipo)}
              >
                {tipo}
              </button>
            ))}
          </div>

          <div className="assets-grid">
            {/* Tarjeta de creación */}
            <div className="create-card">
              <h3>Crear nuevo activo</h3>
              <p>Registra un nuevo equipo con su imagen y tipo.</p>
              <button className="btn-create" onClick={() => navigate("/NuevoActivo")}>
                + Nuevo activo
              </button>
            </div>

            {/* Tarjetas de activos */}
            {activosFiltrados.length > 0 ? (
              activosFiltrados.map(item => (
                <div key={item.id} className="asset-card">
                  <img
                    src={item.img || "/placeholder.png"}
                    className="asset-img"
                    alt={item.titulo || "Activo"}
                  />

                  <h3 className="asset-title">{item.titulo || "Sin título"}</h3>

                  <div className="asset-meta">
                    <span>{item.tipo || "Sin tipo"}</span>

                    {/* ESTADO DINÁMICO CON COLORES */}
                    <span
                      className={`estado estado-${(item.estado || "")
                        .toLowerCase()
                        .replace(/ /g, "-")}`}
                    >
                      {item.estado || "Desconocido"}
                    </span>
                  </div>

                  <div className="asset-links">
                    <button
                      className="link"
                      onClick={() => navigate(`/DetalleActivo/${item.id}`)}
                    >
                      Ver detalles
                    </button>
                    <button className="link">Mantenimiento</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay activos que coincidan con la búsqueda o filtro.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
