import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./DetallesTickets_mantenimiento.css";

import SigmaHeader from "../../../Components/sigmaHeader";
import VerticalNav from "../../../Components/verticalNav";

import { ticketService } from "../../../API/RegistroAPI";
import { useAuth } from "../../../Hooks/AuthContext";


function DetallesTickets_mantenimiento() {

  const navigate = useNavigate();
  const location = useLocation();

  const { token } = useAuth();

  const ticket = location.state?.ticket;


  const [estado, setEstado] =
    useState(ticket?.est || "PENDIENTE");

  const [nota, setNota] =
    useState("");

  const [guardando, setGuardando] =
    useState(false);


  const menuItems = [
    {
      to: "/HomeTecniMantenimiento",
      label: "General"
    },
    {
      to: "/Activos_mantenimiento",
      label: "Activos"
    },
    {
      to: "/Tickets_mantenimiento",
      label: "Tickets"
    },
    {
      to: "/MantenimientosTecniMantenimiento",
      label: "Mantenimientos"
    }
  ];


  // =========================================================
  // APLICAR CAMBIOS
  // =========================================================

  const handleAplicarCambios = async () => {

    if (!ticket?.id) {
      return;
    }


    if (!token) {

      alert(
        "No hay una sesión activa."
      );

      return;
    }


    setGuardando(true);


    try {

      await ticketService.cambiarEstado(
        ticket.id,
        estado,
        token
      );


      alert(
        "Estado actualizado correctamente"
      );


      navigate(
        "/Tickets_mantenimiento"
      );


    } catch (err) {

      console.error(
        "Error al actualizar:",
        err
      );


      alert(
        err.message ||
        "Error al actualizar el estado"
      );


    } finally {

      setGuardando(false);

    }

  };


  // =========================================================
  // MARCAR COMO RESUELTO
  // =========================================================

  const handleMarcarResuelto = async () => {

    if (!ticket?.id) {
      return;
    }


    if (!token) {

      alert(
        "No hay una sesión activa."
      );

      return;
    }


    setGuardando(true);


    try {

      await ticketService.cambiarEstado(
        ticket.id,
        "CERRADO",
        token
      );


      navigate(
        "/Tickets_mantenimiento"
      );


    } catch (err) {

      console.error(
        "Error:",
        err
      );


      alert(
        err.message ||
        "Error al cerrar el ticket"
      );


    } finally {

      setGuardando(false);

    }

  };


  // =========================================================
  // SIN TICKET
  // =========================================================

  if (!ticket) {

    return (

      <div>

        <SigmaHeader />

        <p
          style={{
            padding: "2rem"
          }}
        >
          No se encontró información del ticket.
        </p>

      </div>

    );

  }


  // =========================================================
  // RENDER
  // =========================================================

  return (

    <div>

      <header>
        <SigmaHeader />
      </header>


      <div className="layout-main">

        <VerticalNav
          items={menuItems}
        />


        <main className="detalle-ticket-content">


          <div className="detalle-header">

            <div>

              <h1>
                Detalle del ticket
              </h1>

              <p>
                Revisa la información del ticket
                y actualiza el estado según el
                avance del trabajo
              </p>

            </div>


            <button
              className="btn-volver"
              onClick={() =>
                navigate(
                  "/Tickets_mantenimiento"
                )
              }
            >
              Volver a tickets
            </button>

          </div>


          <section className="detalle-info">


            <div className="detalle-left">

              <h2>
                {ticket.tit}
              </h2>


              <span className="id-ticket">
                ID ticket ·{" "}
                {ticket.numero ||
                  ticket.id}
              </span>


              <p className="descripcion-general">
                {ticket.descripcion}
              </p>


              <div className="badges-ticket">

                <span
                  className={`badge prioridad-${ticket.priori?.toLowerCase()}`}
                >
                  Prioridad:{" "}
                  {ticket.priori}
                </span>


                <span
                  className={`badge estado-${ticket.est?.toLowerCase()}`}
                >
                  Estado:{" "}
                  {ticket.est}
                </span>


                <span className="badge badge-info">
                  Tipo:{" "}
                  {ticket.tip}
                </span>

              </div>


              <div className="bloque">

                <h4>
                  Notas internas
                </h4>


                <textarea
                  placeholder="Escribe aquí tus observaciones técnicas, pruebas realizadas o próximos pasos..."
                  value={nota}
                  onChange={(e) =>
                    setNota(
                      e.target.value
                    )
                  }
                />


                <button
                  className="btn-guardar"
                >
                  Guardar nota
                </button>

              </div>

            </div>


            <aside className="detalle-right">


              <div className="card">

                <h4>
                  Acciones rápidas
                </h4>


                <label>
                  Actualizar estado
                </label>


                <select
                  value={estado}
                  onChange={(e) =>
                    setEstado(
                      e.target.value
                    )
                  }
                >

                  <option value="PENDIENTE">
                    Pendiente
                  </option>

                  <option value="EN_PROGRESO">
                    En progreso
                  </option>

                  <option value="CERRADO">
                    Cerrado
                  </option>

                </select>


                <div className="acciones-rapidas">

                  <button
                    className="btn-aplicar"
                    onClick={
                      handleAplicarCambios
                    }
                    disabled={guardando}
                  >

                    {guardando
                      ? "Guardando..."
                      : "Aplicar cambios"
                    }

                  </button>


                  <button
                    className="btn-resuelto"
                    onClick={
                      handleMarcarResuelto
                    }
                    disabled={guardando}
                  >
                    Marcar como resuelto
                  </button>

                </div>

              </div>


              <div className="card">

                <h4>
                  Activo relacionado
                </h4>


                <p>
                  <strong>
                    {ticket.activoNombre ||
                      "—"}
                  </strong>
                </p>


                <p>
                  Responsable:{" "}
                  {ticket.responsableNombre ||
                    "—"}
                </p>


                <p>
                  Creado:{" "}
                  {ticket.fechaCreacion
                    ? new Date(
                        ticket.fechaCreacion
                      ).toLocaleDateString(
                        "es-CO"
                      )
                    : "—"}
                </p>

              </div>


            </aside>


          </section>


        </main>


      </div>


    </div>

  );

}


export default DetallesTickets_mantenimiento;