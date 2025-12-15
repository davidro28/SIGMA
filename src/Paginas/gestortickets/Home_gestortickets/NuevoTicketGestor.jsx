import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VerticalNav from "../../../Components/verticalNav/index.jsx";
import SigmaHeader from "../../../Components/sigmaHeader/index.jsx";
import "./NuevoTicketGestor.css";

export default function NuevoTicket() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titulo: "",
    tipo: "",
    prioridad: "",
    activo: "",
    descripcion: "",
    responsable: "",
    archivo: null,
  });

  const menuItems = [
    { to: "/Home_gestortickets", label: "General" },
    { to: "/MantenimientoGestor", label: "Mantenimiento" },
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoTicket = {
      id: crypto.randomUUID(),
      titulo: formData.titulo,
      tipo: formData.tipo,
      prioridad: formData.prioridad,
      estado: "Abierto",
      activo: formData.activo,
      descripcion: formData.descripcion,
      responsable: formData.responsable,
      fecha: new Date().toLocaleString(),
      archivoNombre: formData.archivo ? formData.archivo.name : null,
    };

    const tickets =
      JSON.parse(localStorage.getItem("Home_gestortickets")) || [];

    localStorage.setItem(
      "Home_gestortickets",
      JSON.stringify([...tickets, nuevoTicket])
    );

    navigate("/Home_gestortickets");
  };

  return (
    <>
      <SigmaHeader />

      <div className="layout-container-ticketg">
        <VerticalNav items={menuItems} />

        <main className="page-content nuevo-ticket-container">
          {/* HEADER */}
          <header className="header-nuevo-ticket">
            <h1>Nuevo ticket</h1>
            <button
              className="volver-lista"
              onClick={() => navigate("/Home_gestortickets")}
            >
              Volver a lista
            </button>
          </header>

          <p className="descripcion-intro">
            Crea un ticket de incidente o solicitud asociado a un activo
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="form-ticket">
            <section className="form-section">
              <h3>Información del ticket</h3>
              <p className="info-text">
                Define lo mínimo necesario para que el equipo pueda atenderlo
              </p>

              <div className="campo-form">
                <label>Título o resumen</label>
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
                  <label>Tipo de ticket</label>
                  <select
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Selecciona tipo
                    </option>
                    <option value="Incidente">Incidente</option>
                    <option value="Solicitud">Solicitud</option>
                    <option value="Mantenimiento">Mantenimiento</option>
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
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                  </select>
                </div>
              </div>

              <div className="campo-form">
                <label>Activo relacionado</label>
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

              <div className="campo-form adjuntos">
                <label>Adjuntos</label>
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
                onClick={() => navigate("/Home_gestortickets")}
              >
                Cancelar
              </button>
              <button type="submit" className="btn-crear">
                Crear ticket
              </button>
            </footer>
          </form>
        </main>
      </div>
    </>
  );
}