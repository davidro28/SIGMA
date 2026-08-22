import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import VerticalNav from "../../../Components/verticalNav";
import SigmaHeader from "../../../Components/sigmaHeader";

import { ticketService } from "../../../API/RegistroAPI";

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
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);

  const [formData, setFormData] = useState({
    titulo: "",
    activoId: "",
    asignadoId: "",
    estado: "",
    prioridad: "",
    descripcion: "",
  });

  // =====================================================
  // OBTENER TICKET DESDE EL BACKEND
  // =====================================================

  useEffect(() => {
    const cargarTicket = async () => {
      try {
        setLoading(true);

        const data = await ticketService.obtenerPorId(id);

        setTicket(data);

        setFormData({
          titulo: data.tit || "",
          activoId: data.activoId || "",
          asignadoId: data.asignadoId || "",
          estado: data.est?.toString() || "",
          prioridad: data.priori?.toString() || "",
          descripcion: data.descrip || "",
        });

      } catch (error) {
        console.error("Error obteniendo ticket:", error);
        setTicket(null);

      } finally {
        setLoading(false);
      }
    };

    if (id) {
      cargarTicket();
    }
  }, [id]);

  // =====================================================
  // CAMBIAR CAMPOS
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // GUARDAR CAMBIOS EN EL BACKEND
  // =====================================================

  const handleGuardar = async () => {
    try {
      setGuardando(true);

      const dto = {
        id: ticket.id,

        tit: formData.titulo,

        descrip: formData.descripcion,

        tip: ticket.tip,

        est: formData.estado,

        priori: formData.prioridad,

        activoId: formData.activoId,

        solicitanteId: ticket.solicitanteId,

        asignadoId: formData.asignadoId,

        fechaCreacion: ticket.fechaCreacion,

        fechaActualizacion: ticket.fechaActualizacion,

        fechaCierre: ticket.fechaCierre,

        comentario: ticket.comentario,

        archivoNombre: ticket.archivoNombre,
      };

      const actualizado = await ticketService.actualizar(
        ticket.id,
        dto
      );

      setTicket(actualizado);

      setFormData({
        titulo: actualizado.tit || "",
        activoId: actualizado.activoId || "",
        asignadoId: actualizado.asignadoId || "",
        estado: actualizado.est?.toString() || "",
        prioridad: actualizado.priori?.toString() || "",
        descripcion: actualizado.descrip || "",
      });

      setEditMode(false);

      navigate("/Home_gestortickets");

    } catch (error) {
      console.error("Error actualizando ticket:", error);

      alert(
        error.message ||
        "No se pudieron guardar los cambios."
      );

    } finally {
      setGuardando(false);
    }
  };

  // =====================================================
  // CARGANDO
  // =====================================================

  if (loading) {
    return (
      <>
        <SigmaHeader />

        <div className="layout-container-Gestor">
          <VerticalNav items={menuItems} />

          <div className="no-ticket">
            <h2>Cargando ticket...</h2>
          </div>
        </div>
      </>
    );
  }

  // =====================================================
  // TICKET NO ENCONTRADO
  // =====================================================

  if (!ticket) {
    return (
      <>
        <SigmaHeader />

        <div className="layout-container-Gestor">
          <VerticalNav items={menuItems} />

          <div className="no-ticket">
            <h2>No se encontró el ticket</h2>

            <button
              onClick={() =>
                navigate("/Home_gestortickets")
              }
            >
              Volver a Home
            </button>
          </div>
        </div>
      </>
    );
  }

  // =====================================================
  // VISTA
  // =====================================================

  return (
    <>
      <SigmaHeader />

      <div className="layout-container-Gestor">

        <VerticalNav items={menuItems} />

        <main className="detalle-ticket-container">

          <h1>
            Detalle del Ticket #
            {ticket.id?.slice(0, 6)}
          </h1>

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
                <span>
                  {ticket.tit || "Sin título"}
                </span>
              )}

            </div>


            {/* ACTIVO */}

            <div className="campo">

              <label>Activo</label>

              {editMode ? (
                <input
                  name="activoId"
                  value={formData.activoId}
                  onChange={handleChange}
                />
              ) : (
                <span>
                  {ticket.activoNombre ||
                    ticket.activoId ||
                    "No asignado"}
                </span>
              )}

            </div>


            {/* RESPONSABLE */}

            <div className="campo">

              <label>Responsable</label>

              {editMode ? (
                <input
                  name="asignadoId"
                  value={formData.asignadoId}
                  onChange={handleChange}
                />
              ) : (
                <span>
                  {ticket.responsableNombre ||
                    ticket.asignadoId ||
                    "No asignado"}
                </span>
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

                  <option value="ABIERTO">
                    Abierto
                  </option>

                  <option value="EN_PROGRESO">
                    En progreso
                  </option>

                  <option value="CERRADO">
                    Cerrado
                  </option>

                </select>
              ) : (
                <span
                  className={`estado estado-${ticket.est
                    ?.toString()
                    .toLowerCase()
                    .replace(/ /g, "-")}`}
                >
                  {ticket.est}
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

                  <option value="ALTA">
                    Alta
                  </option>

                  <option value="MEDIA">
                    Media
                  </option>

                  <option value="BAJA">
                    Baja
                  </option>

                </select>
              ) : (
                <span
                  className={`prioridad prioridad-${ticket.priori
                    ?.toString()
                    .toLowerCase()}`}
                >
                  {ticket.priori}
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
                <p>
                  {ticket.descrip ||
                    "No hay descripción"}
                </p>
              )}

            </div>


            {/* BOTONES */}

            <div className="acciones-detalle">

              <button
                className="btn-volver"
                onClick={() =>
                  navigate("/Home_gestortickets")
                }
              >
                Volver
              </button>

              <button
                className="btn-editar"
                disabled={guardando}
                onClick={() =>
                  editMode
                    ? handleGuardar()
                    : setEditMode(true)
                }
              >
                {guardando
                  ? "Guardando..."
                  : editMode
                    ? "Guardar cambios"
                    : "Editar ticket"}
              </button>

            </div>

          </article>

        </main>

      </div>
    </>
  );
}