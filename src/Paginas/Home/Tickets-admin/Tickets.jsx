import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import VerticalNav from "../../../Components/verticalNav/index.jsx";
import SigmaHeader from "../../../Components/sigmaHeader";

import { apiFetch } from "../../../API/RegistroAPI";

import "./Tickets.css";


export default function Tickets() {

  const navigate = useNavigate();


  /*
  =========================================================
  MENÚ
  =========================================================
  */

  const menuItems = [
    { to: "/General", label: "General" },
    { to: "/Activos", label: "Activos" },
    { to: "/Tickets", label: "Tickets" },
    { to: "/Mantenimiento_Admin", label: "Mantenimiento" },
    { to: "/Panel_Admin", label: "Panel de control" }
  ];


  /*
  =========================================================
  ESTADOS
  =========================================================
  */

  const [filtroEstado, setFiltroEstado] =
    useState("Todos");

  const [filtroPrioridad, setFiltroPrioridad] =
    useState("Todas");

  const [filtroActivo, setFiltroActivo] =
    useState("Todos");

  const [filtroResponsable, setFiltroResponsable] =
    useState("Todos");

  const [busqueda, setBusqueda] =
    useState("");

  const [tickets, setTickets] =
    useState([]);

  const [activosMap, setActivosMap] =
    useState({});

  const [usuariosMap, setUsuariosMap] =
    useState({});

  const [ticketSeleccionado, setTicketSeleccionado] =
    useState(null);


  /*
  =========================================================
  CARGAR TICKETS
  =========================================================
  */

  useEffect(() => {

    const cargarTickets = async () => {

      try {

        const data =
          await apiFetch("/api/tickets");

        setTickets(data);

      } catch (error) {

        console.error(
          "Error al obtener tickets:",
          error
        );

        setTickets([]);

      }

    };

    cargarTickets();

  }, []);


  /*
  =========================================================
  CARGAR ACTIVOS
  =========================================================
  */

  useEffect(() => {

    const cargarActivos = async () => {

      try {

        const data =
          await apiFetch("/api/activos");

        const map = {};

        data.forEach((activo) => {

          map[activo.id] =
            activo.titulo;

        });

        setActivosMap(map);

      } catch (error) {

        console.error(
          "Error al obtener activos:",
          error
        );

        setActivosMap({});

      }

    };

    cargarActivos();

  }, []);


  /*
  =========================================================
  CARGAR USUARIOS
  =========================================================
  */

  useEffect(() => {

    const cargarUsuarios = async () => {

      try {

        const data =
          await apiFetch("/api/usuarios");

        const map = {};

        data.forEach((usuario) => {

          map[usuario.id] =
            usuario.nombre ||
            usuario.nom ||
            usuario.email ||
            "Sin nombre";

        });

        setUsuariosMap(map);

      } catch (error) {

        console.error(
          "Error al obtener usuarios:",
          error
        );

        setUsuariosMap({});

      }

    };

    cargarUsuarios();

  }, []);


  /*
  =========================================================
  NORMALIZAR TICKETS
  =========================================================
  */

  const ticketsNormalizados = tickets.map((ticket) => ({

    ...ticket,

    titulo:
      ticket.tit || "",

    estado:
      ticket.est || "ABIERTO",

    prioridad:
      ticket.priori || "",

    tipo:
      ticket.tip || "",

    descripcion:
      ticket.descrip || ""

  }));


  /*
  =========================================================
  FILTROS
  =========================================================
  */

  const ticketsFiltrados =
    ticketsNormalizados.filter((ticket) => {

      const textoBusqueda =
        busqueda.toLowerCase();

      const matchesBusqueda =

        (ticket.titulo || "")
          .toLowerCase()
          .includes(textoBusqueda)

        ||

        (ticket.id || "")
          .toLowerCase()
          .includes(textoBusqueda);


      const matchesEstado =
        filtroEstado === "Todos" ||
        ticket.estado === filtroEstado;


      const matchesPrioridad =
        filtroPrioridad === "Todas" ||
        ticket.prioridad === filtroPrioridad;


      const matchesActivo =
        filtroActivo === "Todos" ||
        ticket.activoId === filtroActivo;


      const matchesResponsable =
        filtroResponsable === "Todos" ||
        ticket.asignadoId === filtroResponsable;


      return (
        matchesBusqueda &&
        matchesEstado &&
        matchesPrioridad &&
        matchesActivo &&
        matchesResponsable
      );

    });


  /*
  =========================================================
  ESTADOS RÁPIDOS
  =========================================================
  */

  const estadosRapidos = [
    "ABIERTO",
    "EN_PROGRESO",
    "CERRADO"
  ];


  /*
  =========================================================
  ACTIVOS ÚNICOS
  =========================================================
  */

  const activosUnicos = [
    ...new Set(
      tickets
        .map((ticket) =>
          ticket.activoId
        )
        .filter(Boolean)
    )
  ];


  /*
  =========================================================
  RESPONSABLES ÚNICOS
  =========================================================
  */

  const responsablesUnicos = [
    ...new Set(
      tickets
        .map((ticket) =>
          ticket.asignadoId
        )
        .filter(Boolean)
    )
  ];


  /*
  =========================================================
  TEXTO ESTADO
  =========================================================
  */

  const textoEstado = (estado) => {

    switch (estado) {

      case "ABIERTO":
        return "Abierto";

      case "EN_PROGRESO":
        return "En progreso";

      case "CERRADO":
        return "Cerrado";

      default:
        return estado;

    }

  };


  /*
  =========================================================
  TEXTO PRIORIDAD
  =========================================================
  */

  const textoPrioridad = (prioridad) => {

    switch (prioridad) {

      case "ALTA":
        return "Alta";

      case "MEDIA":
        return "Media";

      case "BAJA":
        return "Baja";

      default:
        return prioridad;

    }

  };


  /*
  =========================================================
  COLOR ESTADO
  =========================================================
  */

  const colorEstado = (estado) => {

    switch (estado) {

      case "ABIERTO":
        return "#e67e22";

      case "EN_PROGRESO":
        return "#2980b9";

      case "CERRADO":
        return "#27ae60";

      default:
        return "#888";

    }

  };


  /*
  =========================================================
  COLOR PRIORIDAD
  =========================================================
  */

  const colorPrioridad = (prioridad) => {

    switch (prioridad) {

      case "ALTA":
        return "#e74c3c";

      case "MEDIA":
        return "#f39c12";

      case "BAJA":
        return "#27ae60";

      default:
        return "#888";

    }

  };


  /*
  =========================================================
  RENDER
  =========================================================
  */

  return (

    <>

      <SigmaHeader />


      <div className="layout-container-adminT">

        <VerticalNav
          items={menuItems}
        />


        <div className="page-content tickets-container">


          {/* =================================================
              HEADER
          ================================================== */}

          <div className="header-tickets">

            <h1>
              Tickets
            </h1>

            <p>
              Visualiza, filtra y crea tickets
            </p>

          </div>


          {/* =================================================
              FILTROS
          ================================================== */}

          <div className="filtros-rapidos">

            <h4>
              Filtros rápidos
            </h4>


            <div className="busqueda-filtros">


              {/* BÚSQUEDA */}

              <input
                type="text"
                placeholder="Buscar..."
                value={busqueda}
                onChange={(e) =>
                  setBusqueda(
                    e.target.value
                  )
                }
                className="input-busqueda"
              />


              {/* ESTADO */}

              <div className="grupo-filtro">

                <label>
                  Estado:
                </label>

                <select
                  value={filtroEstado}
                  onChange={(e) =>
                    setFiltroEstado(
                      e.target.value
                    )
                  }
                >

                  <option value="Todos">
                    Todos
                  </option>

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

              </div>


              {/* PRIORIDAD */}

              <div className="grupo-filtro">

                <label>
                  Prioridad:
                </label>

                <select
                  value={filtroPrioridad}
                  onChange={(e) =>
                    setFiltroPrioridad(
                      e.target.value
                    )
                  }
                >

                  <option value="Todas">
                    Todas
                  </option>

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

              </div>


              {/* ACTIVO */}

              <div className="grupo-filtro">

                <label>
                  Activo:
                </label>

                <select
                  value={filtroActivo}
                  onChange={(e) =>
                    setFiltroActivo(
                      e.target.value
                    )
                  }
                >

                  <option value="Todos">
                    Todos
                  </option>


                  {activosUnicos.map(
                    (activoId) => (

                      <option
                        key={activoId}
                        value={activoId}
                      >
                        {
                          activosMap[
                            activoId
                          ] ||
                          activoId
                        }
                      </option>

                    )
                  )}

                </select>

              </div>


              {/* RESPONSABLE */}

              <div className="grupo-filtro">

                <label>
                  Responsable:
                </label>

                <select
                  value={filtroResponsable}
                  onChange={(e) =>
                    setFiltroResponsable(
                      e.target.value
                    )
                  }
                >

                  <option value="Todos">
                    Todos
                  </option>


                  {responsablesUnicos.map(
                    (responsableId) => (

                      <option
                        key={responsableId}
                        value={responsableId}
                      >
                        {
                          usuariosMap[
                            responsableId
                          ] ||
                          responsableId
                        }
                      </option>

                    )
                  )}

                </select>

              </div>


            </div>


            {/* =================================================
                BOTONES DE ESTADO
            ================================================== */}

            <div className="botones-estado-rapido">

              {estadosRapidos.map(
                (estado) => (

                  <button
                    key={estado}
                    className={`btn-estado-rapido ${
                      filtroEstado === estado
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setFiltroEstado(
                        estado
                      )
                    }
                  >
                    {textoEstado(estado)}
                  </button>

                )
              )}

            </div>

          </div>


          {/* =================================================
              TABLA
          ================================================== */}

          <table className="tabla-tickets">

            <thead>

              <tr>

                <th>
                  Ticket
                </th>

                <th>
                  Resumen
                </th>

                <th>
                  Activo
                </th>

                <th>
                  Responsable
                </th>

                <th>
                  Estado
                </th>

                <th>
                  Prioridad
                </th>

                <th></th>

              </tr>

            </thead>


            <tbody>


              {ticketsFiltrados.map(
                (ticket) => (

                  <tr
                    key={ticket.id}
                  >

                    <td>
                      #
                      {ticket.id?.slice(
                        0,
                        6
                      )}
                    </td>


                    <td>
                      {ticket.titulo}
                    </td>


                    <td>
                      {
                        activosMap[
                          ticket.activoId
                        ] ||
                        ticket.activoId ||
                        "—"
                      }
                    </td>


                    <td>
                      {
                        usuariosMap[
                          ticket.asignadoId
                        ] ||
                        ticket.asignadoId ||
                        "—"
                      }
                    </td>


                    <td>

                      <span
                        className="estado"
                        style={{
                          background:
                            colorEstado(
                              ticket.estado
                            ),
                          color: "#fff",
                          padding:
                            "5px 10px",
                          borderRadius:
                            "20px",
                          fontSize:
                            "12px",
                          fontWeight: 600
                        }}
                      >
                        {
                          textoEstado(
                            ticket.estado
                          )
                        }
                      </span>

                    </td>


                    <td>

                      <span
                        className="prioridad"
                        style={{
                          background:
                            colorPrioridad(
                              ticket.prioridad
                            ),
                          color: "#fff",
                          padding:
                            "5px 10px",
                          borderRadius:
                            "20px",
                          fontSize:
                            "12px",
                          fontWeight: 600
                        }}
                      >
                        {
                          textoPrioridad(
                            ticket.prioridad
                          )
                        }
                      </span>

                    </td>


                    <td>

                      <button
                        className="btn-ver"
                        onClick={() =>
                          setTicketSeleccionado(
                            ticket
                          )
                        }
                      >
                        Ver
                      </button>

                    </td>

                  </tr>

                )
              )}


              {ticketsFiltrados.length === 0 && (

                <tr>

                  <td
                    colSpan="7"
                    style={{
                      textAlign:
                        "center"
                    }}
                  >
                    No se encontraron tickets
                  </td>

                </tr>

              )}


            </tbody>

          </table>


          {/* =================================================
              NUEVO TICKET
          ================================================== */}

          <button
            className="btn-nuevo-ticket"
            onClick={() =>
              navigate(
                "/NuevoTicket"
              )
            }
          >
            Nuevo ticket
          </button>


        </div>

      </div>


      {/* =====================================================
          MODAL DETALLE
      ====================================================== */}

      {ticketSeleccionado && (

        <div
          className="modal-overlay"
          onClick={() =>
            setTicketSeleccionado(
              null
            )
          }
        >

          <div
            className="modal-ticket"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* HEADER */}

            <div className="modal-header">

              <h2>

                #
                {
                  ticketSeleccionado.id?.slice(
                    0,
                    6
                  )
                }

                {" — "}

                {
                  ticketSeleccionado.titulo
                }

              </h2>


              <button
                className="modal-cerrar"
                onClick={() =>
                  setTicketSeleccionado(
                    null
                  )
                }
              >
                ✕
              </button>

            </div>


            {/* BODY */}

            <div className="modal-body">


              {/* BADGES */}

              <div className="modal-badges">

                <span
                  className="badge"
                  style={{
                    backgroundColor:
                      colorEstado(
                        ticketSeleccionado.estado
                      )
                  }}
                >
                  {
                    textoEstado(
                      ticketSeleccionado.estado
                    )
                  }
                </span>


                <span
                  className="badge"
                  style={{
                    backgroundColor:
                      colorPrioridad(
                        ticketSeleccionado.prioridad
                      )
                  }}
                >
                  {
                    textoPrioridad(
                      ticketSeleccionado.prioridad
                    )
                  }
                </span>


                {ticketSeleccionado.tipo && (

                  <span className="badge badge-tipo">

                    {
                      ticketSeleccionado.tipo
                    }

                  </span>

                )}

              </div>


              {/* INFORMACIÓN */}

              <div className="modal-grid">


                <div className="modal-field">

                  <span className="modal-label">
                    Activo
                  </span>

                  <span>

                    {
                      activosMap[
                        ticketSeleccionado
                          .activoId
                      ] ||

                      ticketSeleccionado
                        .activoId ||

                      "—"
                    }

                  </span>

                </div>


                <div className="modal-field">

                  <span className="modal-label">
                    Responsable
                  </span>

                  <span>

                    {
                      usuariosMap[
                        ticketSeleccionado
                          .asignadoId
                      ] ||

                      ticketSeleccionado
                        .asignadoId ||

                      "—"
                    }

                  </span>

                </div>


                <div className="modal-field">

                  <span className="modal-label">
                    Solicitante
                  </span>

                  <span>

                    {
                      usuariosMap[
                        ticketSeleccionado
                          .solicitanteId
                      ] ||

                      ticketSeleccionado
                        .solicitanteId ||

                      "—"
                    }

                  </span>

                </div>


                <div className="modal-field">

                  <span className="modal-label">
                    Fecha creación
                  </span>

                  <span>

                    {
                      ticketSeleccionado
                        .fechaCreacion

                        ?

                        new Date(
                          ticketSeleccionado
                            .fechaCreacion
                        ).toLocaleDateString(
                          "es-CO",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                          }
                        )

                        :

                        "—"
                    }

                  </span>

                </div>


              </div>


              {/* DESCRIPCIÓN */}

              <div className="modal-field modal-descripcion">

                <span className="modal-label">
                  Descripción
                </span>

                <p>

                  {
                    ticketSeleccionado
                      .descripcion ||

                    "Sin descripción"
                  }

                </p>

              </div>


              {/* COMENTARIO */}

              {ticketSeleccionado.comentario && (

                <div className="modal-field">

                  <span className="modal-label">
                    Comentario
                  </span>

                  <p>
                    {
                      ticketSeleccionado
                        .comentario
                    }
                  </p>

                </div>

              )}


            </div>


            {/* FOOTER */}

            <div className="modal-footer">


              <button
                className="btn-ver"
                onClick={() =>
                  navigate(
                    `/Ticket/${ticketSeleccionado.id}`
                  )
                }
              >
                Ver completo
              </button>


              <button
                className="modal-cerrar-btn"
                onClick={() =>
                  setTicketSeleccionado(
                    null
                  )
                }
              >
                Cerrar
              </button>


            </div>


          </div>

        </div>

      )}

    </>

  );

}