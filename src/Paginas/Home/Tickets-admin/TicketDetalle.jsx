import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import SigmaHeader from "../../../Components/sigmaHeader";
import VerticalNav from "../../../Components/verticalNav";
import "./TicketDetalle.css";

export default function TicketDetalle() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const menuItems = [
    { to: "/Home", label: "General" },
    { to: "/Activos", label: "Activos" },
    { to: "/Tickets", label: "Tickets" },
    { to: "/Mantenimiento_Admin", label: "Mantenimiento" },
  ];

  const [ticket, setTicket] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    titulo: "",
    estado: "Abierto",
    prioridad: "Media",
    activo: "",
    responsable: "",
    descripcion: "",
  });

  // 🔹 CARGAR TICKET (state o localStorage)
  useEffect(() => {
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];

    const ticketEncontrado =
      location.state ||
      tickets.find((t) => String(t.id) === String(id));

    if (ticketEncontrado) {
      setTicket(ticketEncontrado);
      setFormData({
        titulo: ticketEncontrado.titulo || "",
        estado: ticketEncontrado.estado || "Abierto",
        prioridad: ticketEncontrado.prioridad || "Media",
        activo: ticketEncontrado.activo || "",
        responsable: ticketEncontrado.responsable || "",
        descripcion: ticketEncontrado.descripcion || "",
      });
    }
  }, [id, location.state]);

  // 🔹 SI NO EXISTE
  if (!ticket) {
    return (
      <>
        <SigmaHeader />
        <div className="no-ticket">
          <h2>No se encontró información del ticket.</h2>
          <button onClick={() => navigate("/Tickets")}>Volver</button>
        </div>
      </>
    );
  }

  // 🔹 MANEJAR CAMBIOS
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 GUARDAR CAMBIOS
  const handleGuardar = () => {
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const index = tickets.findIndex((t) => t.id === ticket.id);

    if (index !== -1) {
      tickets[index] = {
        ...tickets[index],
        ...formData,
        fecha: new Date().toLocaleString(),
      };
      localStorage.setItem("tickets", JSON.stringify(tickets));
    }

    setEditMode(false);
    navigate("/Tickets");
  };

  return (
    <>
      <SigmaHeader />

      <div className="layout-container-admin">
        <VerticalNav items={menuItems} />

        <main className="detalle-ticket-container-Detalleadmin">
          <h1>Ticket #{ticket.id.slice(0, 6)}</h1>

          <article className="card-detalle-admin">
            {editMode ? (
              <>
                <div className="campo">
                  <label>Título:</label>
                  <input
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                  />
                </div>

                <div className="campo">
                  <label>Estado:</label>
                  <select
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                  >
                    <option>Abierto</option>
                    <option>En progreso</option>
                    <option>Cerrado</option>
                  </select>
                </div>

                <div className="campo">
                  <label>Prioridad:</label>
                  <select
                    name="prioridad"
                    value={formData.prioridad}
                    onChange={handleChange}
                  >
                    <option>Alta</option>
                    <option>Media</option>
                    <option>Baja</option>
                  </select>
                </div>

                <div className="campo">
                  <label>Activo:</label>
                  <input
                    name="activo"
                    value={formData.activo}
                    onChange={handleChange}
                  />
                </div>

                <div className="campo">
                  <label>Responsable:</label>
                  <input
                    name="responsable"
                    value={formData.responsable}
                    onChange={handleChange}
                  />
                </div>

                <div className="campo">
                  <label>Descripción:</label>
                  <textarea
                    name="descripcion"
                    rows={4}
                    value={formData.descripcion}
                    onChange={handleChange}
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
              </>
            ) : (
              <>
                <div className="campo">
                  <label>Título:</label>
                  <span>{ticket.titulo}</span>
                </div>

                <div className="campo">
                  <label>Estado:</label>
                  <span
                    className={`estado estado-${ticket.estado
                      ?.toLowerCase()
                      .replace(/ /g, "-")}`}
                  >
                    {ticket.estado}
                  </span>
                </div>

                <div className="campo">
                  <label>Prioridad:</label>
                  <span
                    className={`prioridad prioridad-${ticket.prioridad?.toLowerCase()}`}
                  >
                    {ticket.prioridad}
                  </span>
                </div>

                <div className="campo">
                  <label>Activo:</label>
                  <span>{ticket.activo || "No asignado"}</span>
                </div>

                <div className="campo">
                  <label>Responsable:</label>
                  <span>{ticket.responsable || "No asignado"}</span>
                </div>

                <div className="campo">
                  <label>Descripción:</label>
                  <p>{ticket.descripcion || "Sin descripción"}</p>
                </div>
              </>
            )}
          </article>

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
