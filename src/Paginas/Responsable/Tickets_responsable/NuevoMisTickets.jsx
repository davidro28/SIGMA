import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VerticalNav from "../../../Components/verticalNav/index.jsx";
import SigmaHeader from "../../../Components/sigmaHeader/index.jsx";
import "./NuevoMisTickets.css";

export default function NuevoMisTickets() {
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
    { to: "/Activos_responsable", label: "Mis Activos" },
    { to: "/MisTickets", label: "Mis Tickets" },
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

    const ticketsExistentes =
      JSON.parse(localStorage.getItem("MisTickets")) || [];

    localStorage.setItem(
      "MisTickets",
      JSON.stringify([...ticketsExistentes, nuevoTicket])
    );

    navigate("/MisTickets");
  };

  return (
    <>
      <SigmaHeader />

      <div className="layout-container-NuevoMis">
        <VerticalNav items={menuItems} />

        <main className="page-content nuevo-ticket-container">
          <header className="header-nuevo-ticket">
            <h1>Nuevo ticket</h1>
            <button className="volver-lista" onClick={() => navigate("/MisTickets")}>
              Volver a lista
            </button>
          </header>

          <p className="descripcion-intro">
            Crea un ticket de incidente o solicitud asociado a un activo
          </p>

          <form onSubmit={handleSubmit} className="form-ticket">
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
                    <option value="" disabled>Selecciona tipo</option>
                    <option>Incidente</option>
                    <option>Solicitud</option>
                    <option>Mantenimiento</option>
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
                    <option value="" disabled>Selecciona prioridad</option>
                    <option>Alta</option>
                    <option>Media</option>
                    <option>Baja</option>
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
                <input type="file" name="archivo" onChange={handleChange} />
              </div>
            </section>

            <footer className="form-footer">
              <button
                type="button"
                className="btn-cancelar"
                onClick={() => navigate("/MisTickets")}
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
