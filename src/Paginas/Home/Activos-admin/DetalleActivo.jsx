import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import VerticalNav from "../../../Components/verticalNav";
import SigmaHeader from "../../../Components/sigmaHeader";
import "./DetalleActivo.css";

export default function DetalleActivo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [activo, setActivo] = useState({
    titulo: "",
    tipo: "",
    estado: "",
    responsable: "",
    serie: "",
    descripcion: "",
    img: ""
  });
  const [preview, setPreview] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Función para recargar activos en Activos.jsx
  const recargarActivos = location.state?.recargar;

  useEffect(() => {
    const activosGuardados = JSON.parse(localStorage.getItem("activos")) || [];
    const activoEncontrado = activosGuardados.find(a => a.id === Number(id));

    if (!activoEncontrado) {
      alert("Activo no encontrado");
      navigate("/Activos");
    } else {
      setActivo(activoEncontrado);
      setPreview(activoEncontrado.img || "");
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setActivo({ ...activo, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setActivo({ ...activo, img: url });
  };

  const handleGuardar = () => {
    if (!activo.titulo || !activo.tipo || !activo.estado) {
      alert("Completa los campos obligatorios");
      return;
    }

    const activosGuardados = JSON.parse(localStorage.getItem("activos")) || [];
    const index = activosGuardados.findIndex(a => a.id === activo.id);
    if (index === -1) {
      alert("Error: activo no encontrado");
      return;
    }

    activosGuardados[index] = activo;
    localStorage.setItem("activos", JSON.stringify(activosGuardados));
    alert("Cambios guardados");

    // Recargar activos en lista principal
    if (recargarActivos) recargarActivos();

    navigate("/Activos");
  };

  return (
    <>
      <SigmaHeader />
      <div className="layout-container">
        <VerticalNav
          items={[
            { to: "/Home", label: "General" },
            { to: "/Activos", label: "Activos" },
            { to: "/tickets", label: "Tickets" },
            { to: "/mantenimiento", label: "Mantenimiento" },
          ]}
        />

        <div className="detalle-activo-container">
          <h1>Detalle del activo</h1>
          <p className="subtitle">Revisa la información del activo</p>

          <div className="detalle-grid">
            <div className="detalle-img-section">
              <img src={preview} alt={activo.titulo} className="detalle-img" />
              {isEditing && (
                <label className="image-upload-box">
                  <span className="upload-icon">📁</span>
                  <span>Haz clic para cambiar imagen</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
                </label>
              )}
            </div>

            <div className="detalle-info-section">
              <label className="form-label">Nombre del activo</label>
              <input
                className="form-input"
                name="titulo"
                value={activo.titulo}
                onChange={handleChange}
                disabled={!isEditing}
              />

              <label className="form-label">Tipo</label>
              <select
                className="form-select"
                name="tipo"
                value={activo.tipo}
                onChange={handleChange}
                disabled={!isEditing}
              >
                <option value="">Seleccionar tipo</option>
                <option>Celular</option>
                <option>Tablet</option>
                <option>Periférico</option>
                <option>Pantalla</option>
                <option>Computadora</option>
              </select>

              <label className="form-label">Estado</label>
              <select
                className="form-select"
                name="estado"
                value={activo.estado}
                onChange={handleChange}
                disabled={!isEditing}
              >
                <option value="">Seleccionar estado</option>
                <option>Disponible</option>
                <option>Asignado</option>
                <option>En reparación</option>
                <option>De baja</option>
              </select>

              <label className="form-label">Responsable asignado</label>
              <input
                className="form-input"
                name="responsable"
                value={activo.responsable || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />

              <label className="form-label">Número de serie</label>
              <input
                className="form-input"
                name="serie"
                value={activo.serie || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />

              <label className="form-label">Descripción</label>
              <textarea
                className="form-input"
                name="descripcion"
                value={activo.descripcion || ""}
                onChange={handleChange}
                rows="4"
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="actions">
            <button className="btn-cancelar" onClick={() => navigate("/Activos")}>
              Cancelar
            </button>

            {isEditing ? (
              <button className="btn-guardar" onClick={handleGuardar}>Guardar</button>
            ) : (
              <button className="btn-editar" onClick={() => setIsEditing(true)}>Editar</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
