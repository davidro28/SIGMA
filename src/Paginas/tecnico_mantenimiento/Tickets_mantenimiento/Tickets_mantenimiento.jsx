import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Tickets_mantenimiento.css";

import SigmaHeader from "../../../Components/sigmaHeader";
import VerticalNav from "../../../Components/verticalNav";

import {
  ticketService,
  apiFetch
} from "../../../API/RegistroAPI";

import { useAuth } from "../../../Hooks/AuthContext";


function Tickets_mantenimiento() {

  const navigate = useNavigate();

  const { token } = useAuth();


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


  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("Todos");
  const [prioridadFiltro, setPrioridadFiltro] = useState("Todas");


  useEffect(() => {

    if (!token) {
      setLoading(false);
      return;
    }


    const cargarTickets = async () => {

      try {

        setLoading(true);


        // ==========================================
        // USUARIO ACTUAL
        // ==========================================

        const usuarioActual = await apiFetch(
          "/api/usuarios/ActRes",
          {
            token
          }
        );


        console.log(
          "USUARIO ACTUAL TÉCNICO:",
          usuarioActual
        );


        if (!usuarioActual?.id) {

          console.warn(
            "No se encontró el ID del técnico."
          );

          setTickets([]);

          return;
        }


        // ==========================================
        // TODOS LOS TICKETS
        // ==========================================

        const data =
          await ticketService.listar(token);


        const todosLosTickets =
          Array.isArray(data)
            ? data
            : [];


        // ==========================================
        // TICKETS DEL TÉCNICO
        // ==========================================

        const ticketsDelTecnico =
          todosLosTickets.filter(
            (ticket) =>
              String(ticket?.asignadoId || "") ===
              String(usuarioActual.id)
          );


        console.log(
          "TICKETS DEL TÉCNICO:",
          ticketsDelTecnico
        );


        setTickets(
          ticketsDelTecnico
        );


      } catch (err) {

        console.error(
          "Error cargando tickets:",
          err
        );

        setTickets([]);

      } finally {

        setLoading(false);

      }

    };


    cargarTickets();

  }, [token]);


  const limpiarFiltros = () => {

    setBusqueda("");
    setEstadoFiltro("Todos");
    setPrioridadFiltro("Todas");

  };


  const formatFecha = (fecha) => {

    if (!fecha) {
      return "—";
    }

    return new Date(
      fecha
    ).toLocaleDateString("es-CO");

  };


  const getLabelEstado = (estado) => {

    const map = {

      EN_PROGRESO:
        "En progreso",

      ABIERTO:
        "Abierto",

      CERRADO:
        "Cerrado",

      PENDIENTE:
        "Pendiente"

    };

    return (
      map[estado?.toUpperCase()] ||
      estado ||
      "—"
    );

  };


  const getLabelPrioridad = (p) => {

    const map = {

      ALTA:
        "Alta",

      MEDIA:
        "Media",

      BAJA:
        "Baja",

      CRITICA:
        "Crítica"

    };

    return (
      map[p?.toUpperCase()] ||
      p ||
      "—"
    );

  };


  const ticketsFiltrados =
    tickets.filter(ticket => {

      const texto =
        busqueda.toLowerCase();


      const coincideBusqueda =

        ticket.id
          ?.toLowerCase()
          .includes(texto)

        ||

        ticket.activoNombre
          ?.toLowerCase()
          .includes(texto)

        ||

        ticket.responsableNombre
          ?.toLowerCase()
          .includes(texto)

        ||

        ticket.tit
          ?.toLowerCase()
          .includes(texto);


      const estadoLabel =
        getLabelEstado(ticket.est);


      const coincideEstado =
        estadoFiltro === "Todos" ||
        estadoLabel === estadoFiltro;


      const prioridadLabel =
        getLabelPrioridad(ticket.priori);


      const coincidePrioridad =
        prioridadFiltro === "Todas" ||
        prioridadLabel === prioridadFiltro;


      return (
        coincideBusqueda &&
        coincideEstado &&
        coincidePrioridad
      );

    });


  const handleTomarTicket = async (id) => {

    if (!token) {

      console.error(
        "No existe token para actualizar el ticket."
      );

      return;
    }


    try {

      await ticketService.cambiarEstado(
        id,
        "EN_PROGRESO",
        token
      );


      setTickets(prev =>
        prev.map(t =>
          t.id === id
            ? {
                ...t,
                est: "EN_PROGRESO"
              }
            : t
        )
      );


    } catch (err) {

      console.error(
        "Error al tomar ticket:",
        err
      );

    }

  };


  return (

    <div>

      <header>
        <SigmaHeader />
      </header>


      <div className="layout-main">

        <VerticalNav
          items={menuItems}
        />


        <main className="page-content-gestor">


          <div className="header-tickets-gestor">

            <h1>
              Tickets de mantenimiento
            </h1>

            <p>
              Gestiona los tickets asignados,
              actualiza estados y prioriza tu
              trabajo diario
            </p>

          </div>


          <section className="filtros-rapidos-gestor">

            <h4>
              Listado de tickets
            </h4>

            <p className="descripcion-filtros">
              Filtra por estado, prioridad o
              activo para encontrar rápidamente
              el próximo ticket a atender
            </p>


            <div className="busqueda-filtros">

              <input
                className="input-busqueda"
                placeholder="Buscar por ID, activo o usuario"
                value={busqueda}
                onChange={(e) =>
                  setBusqueda(e.target.value)
                }
              />


              <div className="grupo-filtro-gestor">

                <label>
                  Estado:
                </label>

                <select
                  value={estadoFiltro}
                  onChange={(e) =>
                    setEstadoFiltro(e.target.value)
                  }
                >

                  <option>
                    Todos
                  </option>

                  <option>
                    Pendiente
                  </option>

                  <option>
                    En progreso
                  </option>

                  <option>
                    Cerrado
                  </option>

                </select>

              </div>


              <div className="grupo-filtro-gestor">

                <label>
                  Prioridad:
                </label>

                <select
                  value={prioridadFiltro}
                  onChange={(e) =>
                    setPrioridadFiltro(e.target.value)
                  }
                >

                  <option>
                    Todas
                  </option>

                  <option>
                    Alta
                  </option>

                  <option>
                    Media
                  </option>

                  <option>
                    Baja
                  </option>

                </select>

              </div>


              <button
                className="btn-limpiar"
                onClick={limpiarFiltros}
              >
                Limpiar filtros
              </button>

            </div>

          </section>


          {loading ? (

            <p style={{ padding: "1rem" }}>
              Cargando tickets...
            </p>

          ) : (

            <table className="tabla-tickets">

              <thead>

                <tr>

                  <th>ID ticket</th>
                  <th>Prioridad</th>
                  <th>Estado</th>
                  <th>Activo</th>
                  <th>Creado</th>
                  <th>Reportado por</th>
                  <th>Resumen</th>
                  <th>Acciones</th>

                </tr>

              </thead>


              <tbody>

                {ticketsFiltrados.length === 0 ? (

                  <tr>

                    <td
                      colSpan={8}
                    >
                      No se encontraron tickets
                    </td>

                  </tr>

                ) : (

                  ticketsFiltrados.map(ticket => {

                    const estadoLabel =
                      getLabelEstado(
                        ticket.est
                      );


                    const prioridadLabel =
                      getLabelPrioridad(
                        ticket.priori
                      );


                    return (

                      <tr
                        key={ticket.id}
                      >

                        <td>
                          {ticket.numero ||
                            ticket.id}
                        </td>


                        <td>

                          <span
                            className={`prioridad prioridad-${prioridadLabel.toLowerCase()}`}
                          >
                            {prioridadLabel}
                          </span>

                        </td>


                        <td>

                          <span
                            className={`estado estado-${estadoLabel
                              .toLowerCase()
                              .replace(" ", "-")}`}
                          >
                            {estadoLabel}
                          </span>

                        </td>


                        <td>
                          {ticket.activoNombre ||
                            ticket.activoId ||
                            "—"}
                        </td>


                        <td>
                          {formatFecha(
                            ticket.fechaCreacion
                          )}
                        </td>


                        <td>
                          {ticket.responsableNombre ||
                            "—"}
                        </td>


                        <td className="resumen">
                          {ticket.tit}
                        </td>


                        <td className="acciones">

                          {ticket.est === "ABIERTO" ||
                          ticket.est === "PENDIENTE" ? (

                            <button
                              className="btn-tomar"
                              onClick={() =>
                                handleTomarTicket(
                                  ticket.id
                                )
                              }
                            >
                              Tomar ticket
                            </button>

                          ) : ticket.est === "EN_PROGRESO" ? (

                            <button
                              className="btn-actualizar"
                              onClick={() =>
                                navigate(
                                  `/DetallesTickets_mantenimiento`,
                                  {
                                    state: {
                                      ticket
                                    }
                                  }
                                )
                              }
                            >
                              Actualizar estado
                            </button>

                          ) : null}


                          <button
                            className="btn-ver"
                            onClick={() =>
                              navigate(
                                `/DetallesTickets_mantenimiento`,
                                {
                                  state: {
                                    ticket
                                  }
                                }
                              )
                            }
                          >
                            Ver
                          </button>

                        </td>

                      </tr>

                    );

                  })

                )}

              </tbody>

            </table>

          )}


          <div className="nota-final">

            <strong>
              ¿No encuentras un ticket?
            </strong>

            <p>
              Asegúrate de que el ticket esté
              asignado a tu equipo o utiliza los
              filtros para visualizar el histórico
              completo.
            </p>

          </div>


        </main>

      </div>

    </div>

  );

}

export default Tickets_mantenimiento;