import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VerticalNav from "../../../Components/verticalNav/index.jsx";
import SigmaHeader from "../../../Components/sigmaHeader/index.jsx";
import { useAuth } from "../../../Hooks/AuthContext.jsx";
import { ticketService } from "../../../API/RegistroAPI.js";
import "./NuevoMisTickets.css";

export default function NuevoMisTickets() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    titulo: "",
    tipo: "",
    prioridad: "",
    activo: "",
    descripcion: "",
    responsable: "",
    archivo: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const menuItems = [
    { to: "/Activos_responsable", label: "Mis Activos" },
    { to: "/MisTickets", label: "Mis Tickets" },
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!token) {
    setError("No hay una sesión autenticada.");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const nuevoTicket = {
      tit: formData.titulo,
      descrip: formData.descripcion,
      tip: formData.tipo.toUpperCase(),
      est: "ABIERTO",
      priori: formData.prioridad.toUpperCase(),

      // IMPORTANTE:
      // aquí deben ir los IDs reales de MongoDB
      activoId: formData.activo || null,
      asignadoId: formData.responsable || null,

      solicitanteId: null,

      archivoNombre: formData.archivo
        ? formData.archivo.name
        : null,
    };

    console.log("Enviando ticket:", nuevoTicket);

    await ticketService.crear(nuevoTicket, token);

    navigate("/MisTickets");
  } catch (err) {
    console.error("Error creando ticket:", err);
    setError(
      err?.message || "No fue posible crear el ticket."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <SigmaHeader />

      <div className="layout-container-NuevoMis">
        <VerticalNav items={menuItems} />

        <main className="page-content nuevo-ticket-container">
          <header className="header-nuevo-ticket">
            <h1>Nuevo ticket</h1>

            <button
              className="volver-lista"
              onClick={() => navigate("/MisTickets")}
              type="button"
            >
              Volver a lista
            </button>
          </header>

          <p className="descripcion-intro">
            Crea un ticket de incidente o solicitud asociado a un activo
          </p>

          {error && (
            <div className="mensaje-error">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="form-ticket"
          >
            <section className="form-section">
              <h3>Información del ticket</h3>

              <div className="campo-form">
                <label>Título</label>

                <input
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="campo-form">
                  <label>Tipo</label>

                  <select
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Selecciona tipo
                    </option>

                    <option value="Incidente">
                      Incidente
                    </option>

                    <option value="Solicitud">
                      Solicitud
                    </option>

                    <option value="Mantenimiento">
                      Mantenimiento
                    </option>
                  </select>
                </div>

                <div className="campo-form">
                  <label>Prioridad</label>

                  <select
                    name="prioridad"
                    value={formData.prioridad}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Selecciona prioridad
                    </option>

                    <option value="Alta">
                      Alta
                    </option>

                    <option value="Media">
                      Media
                    </option>

                    <option value="Baja">
                      Baja
                    </option>
                  </select>
                </div>
              </div>

              <div className="campo-form">
                <label>Activo</label>

                <input
                  type="text"
                  name="activo"
                  value={formData.activo}
                  onChange={handleChange}
                />
              </div>

              <div className="campo-form">
                <label>Responsable</label>

                <input
                  type="text"
                  name="responsable"
                  value={formData.responsable}
                  onChange={handleChange}
                />
              </div>

              <div className="campo-form">
                <label>Descripción</label>

                <textarea
                  name="descripcion"
                  rows={4}
                  value={formData.descripcion}
                  onChange={handleChange}
                />
              </div>

              <div className="campo-form">
                <label>Adjunto</label>

                <input
                  type="file"
                  name="archivo"
                  onChange={handleChange}
                />
              </div>
            </section>

            <footer className="form-footer">
              <button
                type="button"
                className="btn-cancelar"
                onClick={() => navigate("/MisTickets")}
                disabled={loading}
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="btn-crear"
                disabled={loading}
              >
                {loading
                  ? "Creando..."
                  : "Crear ticket"}
              </button>
            </footer>
          </form>
        </main>
      </div>
    </>
  );
}