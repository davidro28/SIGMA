import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VerticalNav from "../../../Components/verticalNav/index.jsx";
import SigmaHeader from "../../../Components/sigmaHeader";
import "./NuevoTicket.css";

export default function NuevoTicket() {
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [activo, setActivo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [archivo, setArchivo] = useState(null);
  const [responsable, setResponsable] = useState("");

  const menuItems = [
    { to: "/Home", label: "General" },
    { to: "/Activos", label: "Activos" },
    { to: "/Tickets", label: "Tickets" },
    { to: "/mantenimiento_Admin", label: "Mantenimiento" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoTicket = {
      id: crypto.randomUUID(),
      titulo,
      tipo,
      prioridad,
      activo,
      descripcion,
      responsable,
      fecha: new Date().toLocaleString(),
      archivoNombre: archivo ? archivo.name : null,
    };

    const existentes = JSON.parse(localStorage.getItem("tickets")) || [];
    existentes.push(nuevoTicket);
    localStorage.setItem("tickets", JSON.stringify(existentes));

    navigate("/Tickets");
  };

  return (
    <>
      <SigmaHeader />

      <div className="layout-container-nuevo">
        <VerticalNav items={menuItems} />

        <main className="page-content nuevo-ticket-container">
          <header className="header-nuevo-ticket">
            <h1>Nuevo ticket</h1>
            <button className="volver-lista" onClick={() => navigate("/Tickets")}>
              Volver a lista
            </button>
          </header>

          <p className="descripcion-intro">
            Crea un ticket de incidente o solicitud asociado a un activo
          </p>

          <form onSubmit={handleSubmit} className="form-ticket">
            <section className="form-section">
              <h3>Información del ticket</h3>
              <p className="info-text">
                Define lo mínimo necesario para que el equipo pueda atenderlo
              </p>

              <div className="campo-form">
                <label htmlFor="titulo">Título o resumen</label>
                <input
                  id="titulo"
                  type="text"
                  placeholder="Ej. Pantalla no enciende al inicio de turno"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <div className="campo-form">
                  <label htmlFor="tipo">Tipo de ticket</label>
                  <select
                    id="tipo"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Selecciona tipo (Incidente, Solicitud, Mantenimiento)
                    </option>
                    <option value="Incidente">Incidente</option>
                    <option value="Solicitud">Solicitud</option>
                    <option value="Mantenimiento">Mantenimiento</option>
                  </select>
                </div>

                <div className="campo-form">
                  <label htmlFor="prioridad">Prioridad</label>
                  <select
                    id="prioridad"
                    value={prioridad}
                    onChange={(e) => setPrioridad(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Selecciona prioridad (Alta, Media, Baja)
                    </option>
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                  </select>
                </div>
              </div>

              <div className="campo-form">
                <label htmlFor="activo">Activo relacionado</label>
                <input
                  id="activo"
                  type="text"
                  placeholder="Opcional"
                  value={activo}
                  onChange={(e) => setActivo(e.target.value)}
                />
              </div>

              <div className="campo-form">
                <label htmlFor="responsable">Responsable</label>
                <input
                  id="responsable"
                  type="text"
                  placeholder="Nombre del responsable"
                  value={responsable}
                  onChange={(e) => setResponsable(e.target.value)}
                />
              </div>

              <div className="campo-form">
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                  id="descripcion"
                  placeholder="Describe el problema"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="campo-form adjuntos">
                <label>Adjuntos (opcional)</label>
                <input
                  type="file"
                  onChange={(e) => setArchivo(e.target.files[0])}
                />
              </div>
            </section>

            <footer className="form-footer">
              <button
                type="button"
                className="btn-cancelar"
                onClick={() => navigate("/Tickets")}
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
