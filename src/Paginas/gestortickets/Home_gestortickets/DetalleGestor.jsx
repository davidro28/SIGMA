import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VerticalNav from "../../../Components/verticalNav";
import SigmaHeader from "../../../Components/sigmaHeader";
import "./DetalleGestor.css";

export default function DetalleGestor() {
  const navigate = useNavigate();
  const { id } = useParams();

  const menuItems = [
    { to: "/Home_gestortickets", label: "General" },
    { to: "/MantenimientoGestor", label: "Mantenimiento" },
  ];

  const [ticket, setTicket] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    titulo: "",
    activo: "",
    responsable: "",
    estado: "Abierto",
    prioridad: "Media",
    descripcion: "",
  });

  // 🔹 Cargar ticket
  useEffect(() => {
    const tickets =
      JSON.parse(localStorage.getItem("Home_gestortickets")) || [];

    const encontrado = tickets.find(
      (t) => String(t.id) === String(id)
    );

    if (encontrado) {
      setTicket(encontrado);
      setFormData({
        titulo: encontrado.titulo || "",
        activo: encontrado.activo || "",
        responsable: encontrado.responsable || "",
        estado: encontrado.estado || "Abierto",
        prioridad: encontrado.prioridad || "Media",
        descripcion: encontrado.descripcion || "",
      });
    }
  }, [id]);

  // 🔹 Si no existe
  if (!ticket) {
    return (
      <>
        <SigmaHeader />
        <div className="layout-container-Gestor">
          <VerticalNav items={menuItems} />
          <div className="no-ticket">
            <h2>No se encontró el ticket</h2>
            <button onClick={() => navigate("/Home_gestortickets")}>
              Volver a Home
            </button>
          </div>
        </div>
      </>
    );
  }

  // 🔹 Manejar cambios
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Guardar cambios
  const handleGuardar = () => {
    const tickets =
      JSON.parse(localStorage.getItem("Home_gestortickets")) || [];

    const index = tickets.findIndex(
      (t) => String(t.id) === String(ticket.id)
    );

    if (index !== -1) {
      tickets[index] = {
        ...tickets[index],
        ...formData,
      };
      localStorage.setItem(
        "Home_gestortickets",
        JSON.stringify(tickets)
      );
    }

    setEditMode(false);
    navigate("/Home_gestortickets");
  };

  return (
    <>
      <SigmaHeader />

      <div className="layout-container-Gestor">
        <VerticalNav items={menuItems} />

        <main className="detalle-ticket-container">
          <h1>Detalle del Ticket #{ticket.id.slice(0, 6)}</h1>

          <article className="card-detalle">
            {/* TÍTULO */}
            <div className="campo">
              <label>Título</label>
              {editMode ? (
                <input
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                />
              ) : (
                <span>{ticket.titulo}</span>
              )}
            </div>

            {/* ACTIVO */}
            <div className="campo">
              <label>Activo</label>
              {editMode ? (
                <input
                  name="activo"
                  value={formData.activo}
                  onChange={handleChange}
                />
              ) : (
                <span>{ticket.activo || "No asignado"}</span>
              )}
            </div>

            {/* RESPONSABLE */}
            <div className="campo">
              <label>Responsable</label>
              {editMode ? (
                <input
                  name="responsable"
                  value={formData.responsable}
                  onChange={handleChange}
                />
              ) : (
                <span>{ticket.responsable || "No asignado"}</span>
              )}
            </div>

            {/* ESTADO */}
            <div className="campo">
              <label>Estado</label>
              {editMode ? (
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                >
                  <option>Abierto</option>
                  <option>En progreso</option>
                  <option>Cerrado</option>
                </select>
              ) : (
                <span
                  className={`estado estado-${ticket.estado
                    ?.toLowerCase()
                    .replace(/ /g, "-")}`}
                >
                  {ticket.estado}
                </span>
              )}
            </div>

            {/* PRIORIDAD */}
            <div className="campo">
              <label>Prioridad</label>
              {editMode ? (
                <select
                  name="prioridad"
                  value={formData.prioridad}
                  onChange={handleChange}
                >
                  <option>Alta</option>
                  <option>Media</option>
                  <option>Baja</option>
                </select>
              ) : (
                <span
                  className={`prioridad prioridad-${ticket.prioridad?.toLowerCase()}`}
                >
                  {ticket.prioridad}
                </span>
              )}
            </div>

            {/* DESCRIPCIÓN */}
            <div className="campo">
              <label>Descripción</label>
              {editMode ? (
                <textarea
                  name="descripcion"
                  rows={4}
                  value={formData.descripcion}
                  onChange={handleChange}
                />
              ) : (
                <p>{ticket.descripcion || "No hay descripción"}</p>
              )}
            </div>

            {/* ACCIONES */}
            <div className="acciones-detalle">
              <button
                className="btn-volver"
                onClick={() => navigate("/Home_gestortickets")}
              >
                Volver
              </button>
              <button
                className="btn-editar"
                onClick={() =>
                  editMode ? handleGuardar() : setEditMode(true)
                }
              >
                {editMode ? "Guardar cambios" : "Editar ticket"}
              </button>
            </div>
          </article>
        </main>
      </div>
    </>
  );
}
