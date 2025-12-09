import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import SigmaHeader from "../../../Components/sigmaHeader";
import VerticalNav from "../../../Components/verticalNav";
import "./TicketDetalle.css";

export default function TicketDetalle() {
  const location = useLocation();
  const navigate = useNavigate();

  const ticket = location.state;

  if (!ticket) {
    return (
      <div className="no-ticket">
        <h2>No se encontró información del ticket.</h2>
        <button onClick={() => navigate("/Tickets")}>Volver</button>
      </div>
    );
  }

  const menuItems = [
    { to: "/Home", label: "General" },
    { to: "/Activos", label: "Activos" },
    { to: "/Tickets", label: "Tickets" },
    { to: "/Mantenimiento", label: "Mantenimiento" },
  ];

  // Modo edición
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    titulo: ticket.titulo || "",
    estado: ticket.estado || "Abierto",
    prioridad: ticket.prioridad || "Media",
    activo: ticket.activo || "",
    responsable: ticket.responsable || "",
    descripcion: ticket.descripcion || "",
  });

  // Manejar cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Guardar cambios en localStorage
  const handleGuardar = () => {
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const index = tickets.findIndex((t) => t.id === ticket.id);
    if (index !== -1) {
      tickets[index] = { ...tickets[index], ...formData, fecha: new Date().toLocaleString() };
      localStorage.setItem("tickets", JSON.stringify(tickets));
    }
    setEditMode(false);
    navigate("/Tickets");
  };

  return (
    <>
      <SigmaHeader />
      <div className="layout-container">
        <VerticalNav items={menuItems} />

        <main className="detalle-ticket-container">
          <h1>Ticket #{ticket.id.slice(0, 6)}</h1>

          {editMode ? (
            <article className="card-detalle">
              <div className="campo">
                <label>Título:</label>
                <input
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                />
              </div>

              <div className="campo">
                <label>Estado:</label>
                <select name="estado" value={formData.estado} onChange={handleChange}>
                  <option>Abierto</option>
                  <option>En progreso</option>
                  <option>Cerrado</option>
                </select>
              </div>

              <div className="campo">
                <label>Prioridad:</label>
                <select name="prioridad" value={formData.prioridad} onChange={handleChange}>
                  <option>Alta</option>
                  <option>Media</option>
                  <option>Baja</option>
                </select>
              </div>

              <div className="campo">
                <label>Activo asociado:</label>
                <input
                  type="text"
                  name="activo"
                  value={formData.activo}
                  onChange={handleChange}
                />
              </div>

              <div className="campo">
                <label>Responsable:</label>
                <input
                  type="text"
                  name="responsable"
                  value={formData.responsable}
                  onChange={handleChange}
                />
              </div>

              <div className="campo">
                <label>Descripción:</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              <div className="acciones-detalle">
                <button className="btn-volver" onClick={() => setEditMode(false)}>
                  Cancelar
                </button>
                <button className="btn-editar" onClick={handleGuardar}>
                  Guardar cambios
                </button>
              </div>
            </article>
          ) : (
            <article className="card-detalle">
              <div className="campo">
                <label>Título:</label>
                <span>{ticket.titulo}</span>
              </div>
              <div className="campo">
                <label>Estado:</label>
                <span className={`estado estado-${ticket.estado?.toLowerCase().replace(/ /g, "-") || "desconocido"}`}>
                  {ticket.estado}
                </span>
              </div>
              <div className="campo">
                <label>Prioridad:</label>
                <span className={`prioridad prioridad-${ticket.prioridad?.toLowerCase() || "media"}`}>
                  {ticket.prioridad}
                </span>
              </div>
              <div className="campo">
                <label>Activo asociado:</label>
                <span>{ticket.activo || "No asignado"}</span>
              </div>
              <div className="campo">
                <label>Responsable:</label>
                <span>{ticket.responsable || "No asignado"}</span>
              </div>
              <div className="campo">
                <label>Descripción:</label>
                <p>{ticket.descripcion || "No hay descripción"}</p>
              </div>
            </article>
          )}

          {!editMode && (
            <section className="acciones-detalle">
              <button className="btn-volver" onClick={() => navigate("/Tickets")}>
                ← Volver
              </button>
              <button className="btn-editar" onClick={() => setEditMode(true)}>
                Editar ticket
              </button>
            </section>
          )}
        </main>
      </div>
    </>
  );
}
