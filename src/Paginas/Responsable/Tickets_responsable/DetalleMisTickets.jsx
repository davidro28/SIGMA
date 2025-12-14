import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VerticalNav from "../../../Components/verticalNav";
import SigmaHeader from "../../../Components/sigmaHeader";
import "./DetalleMisTickets.css";

export default function DetalleMisTickets() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);

  const menuItems = [
    { to: "/MisTickets", label: "General" },
    { to: "/MantenimientoMisTickets", label: "Mantenimiento" },
  ];

  useEffect(() => {
    const tickets = JSON.parse(localStorage.getItem("MisTickets")) || [];

    const ticketEncontrado = tickets.find(
      t => String(t.id) === String(id)
    );

    setTicket(ticketEncontrado || null);
  }, [id]);

  if (!ticket) {
    return (
      <>
        <SigmaHeader />
        <div className="layout-container-DetalleMis">
          <VerticalNav items={menuItems} />
          <div className="no-ticket">
            <h2>No se encontró el ticket</h2>
            <button onClick={() => navigate("/MisTickets")}>
              Volver a Mis Tickets
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SigmaHeader />

      <div className="layout-container-DetalleMis">
        <VerticalNav items={menuItems} />

        <div className="detalle-ticket-container-Mis">
          <h1>Detalle del Ticket #{String(ticket.id).slice(0, 6)}</h1>

          <div className="card-detalle">
            <div className="campo">
              <label>Título</label>
              <span>{ticket.titulo}</span>
            </div>

            <div className="campo">
              <label>Activo</label>
              <span>{ticket.activo || "No asignado"}</span>
            </div>

            <div className="campo">
              <label>Responsable</label>
              <span>{ticket.responsable || "No asignado"}</span>
            </div>

            <div className="campo">
              <label>Estado</label>
              <span className={`estado estado-${ticket.estado?.toLowerCase().replace(/ /g, "-")}`}>
                {ticket.estado}
              </span>
            </div>

            <div className="campo">
              <label>Prioridad</label>
              <span className={`prioridad prioridad-${ticket.prioridad?.toLowerCase()}`}>
                {ticket.prioridad}
              </span>
            </div>

            <div className="campo">
              <label>Descripción</label>
              <p>{ticket.descripcion || "No hay descripción"}</p>
            </div>

            <div className="acciones-detalle">
              <button className="btn-volver" onClick={() => navigate("/MisTickets")}>
                Volver
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
