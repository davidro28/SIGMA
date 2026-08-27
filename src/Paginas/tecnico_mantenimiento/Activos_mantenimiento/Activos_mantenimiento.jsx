import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Activos_mantenimiento.css";

import SigmaHeader from "../../../Components/sigmaHeader";
import VerticalNav from "../../../Components/verticalNav";

import { apiFetch } from "../../../API/RegistroAPI";

// CAMBIO
import NuevaOrden from "../../../Components/nuevaOrden";


function Activos_mantenimiento() {

  const navigate = useNavigate();

  const [activos, setActivos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [busqueda, setBusqueda] = useState("");

  const [estadoFiltro, setEstadoFiltro] =
    useState("Todos");

  const [prioridadFiltro, setPrioridadFiltro] =
    useState("Todas");

  // CAMBIO
  const [mostrarNuevaOrden, setMostrarNuevaOrden] = useState(false);


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


  /*
  =========================================================
  CARGAR ACTIVOS DESDE EL BACKEND
  =========================================================
  */

  useEffect(() => {

    const cargarActivos = async () => {

      try {

        const data =
          await apiFetch("/api/activos");

        setActivos(data);

      } catch (error) {

        console.error(
          "Error cargando activos:",
          error
        );

        setActivos([]);

      } finally {

        setLoading(false);

      }

    };


    cargarActivos();

  }, []);


  /*
  =========================================================
  FILTRAR ACTIVOS
  =========================================================
  */

  const activosFiltrados =
    activos.filter((activo) => {

      const texto =
        busqueda
          .toLowerCase()
          .trim();


      const coincideBusqueda =

        (activo.titulo || "")
          .toLowerCase()
          .includes(texto)

        ||

        (activo.id || "")
          .toLowerCase()
          .includes(texto)

        ||

        (activo.serie || "")
          .toLowerCase()
          .includes(texto);


      const coincideEstado =
        estadoFiltro === "Todos" ||
        activo.estado === estadoFiltro;


      const coincidePrioridad =
        prioridadFiltro === "Todas";


      return (
        coincideBusqueda &&
        coincideEstado &&
        coincidePrioridad
      );

    });


  /*
  =========================================================
  LIMPIAR FILTROS
  =========================================================
  */

  const limpiarFiltros = () => {

    setBusqueda("");
    setEstadoFiltro("Todos");
    setPrioridadFiltro("Todas");

  };


  /*
  =========================================================
  RENDER
  =========================================================
  */

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


          {/* =================================================
              ENCABEZADO
          ================================================= */}

          <div className="header-tickets-gestor">

            <h1>
              Activos de mantenimiento
            </h1>

            <p>
              Consulta y gestiona los activos que requieren
              revisión o están en servicio
            </p>

          </div>


          {/* =================================================
              FILTROS
          ================================================= */}

          <section className="filtros-rapidos-gestor">

            <h4>
              Listado de activos
            </h4>


            <p className="descripcion-filtros">

              Filtra por estado o tipo para
              planificar tu trabajo

            </p>


            <div className="busqueda-filtros">


              <input

                type="text"

                placeholder="Buscar por nombre, código o serie..."

                className="input-busqueda"

                value={busqueda}

                onChange={(e) =>
                  setBusqueda(
                    e.target.value
                  )
                }

              />


              <div className="grupo-filtro-gestor">

                <label>
                  Estado:
                </label>


                <select

                  value={estadoFiltro}

                  onChange={(e) =>
                    setEstadoFiltro(
                      e.target.value
                    )
                  }

                >

                  <option value="Todos">
                    Todos
                  </option>

                  <option value="Disponible">
                    Disponible
                  </option>

                  <option value="Asignado">
                    Asignado
                  </option>

                  <option value="En reparación">
                    En reparación
                  </option>

                  <option value="De baja">
                    De baja
                  </option>

                </select>

              </div>


              <button

                className="btn-limpiar"

                onClick={limpiarFiltros}

              >

                Limpiar

              </button>


            </div>

          </section>


          {/* =================================================
              TABLA
          ================================================= */}

          {loading ? (

            <p
              style={{
                padding: "1rem"
              }}
            >
              Cargando activos...
            </p>

          ) : (

            <table className="tabla-tickets">

              <thead>

                <tr>

                  <th>
                    Activo
                  </th>

                  <th>
                    Tipo
                  </th>

                  <th>
                    Serie
                  </th>

                  <th>
                    Estado
                  </th>

                  <th>
                    Responsable
                  </th>

                  <th>
                    Acciones
                  </th>

                </tr>

              </thead>


              <tbody>


                {activosFiltrados.length === 0 ? (

                  <tr>

                    <td
                      colSpan="6"
                      style={{
                        textAlign: "center",
                        padding: 30
                      }}
                    >

                      No se encontraron activos

                    </td>

                  </tr>

                ) : (

                  activosFiltrados.map(
                    (activo) => (

                      <tr
                        key={activo.id}
                      >


                        {/* ACTIVO */}

                        <td>

                          <strong>
                            {activo.titulo}
                          </strong>

                          <br />

                          <span className="codigo">
                            {activo.id}
                          </span>

                        </td>


                        {/* TIPO */}

                        <td>
                          {activo.tipo}
                        </td>


                        {/* SERIE */}

                        <td>
                          {activo.serie || "—"}
                        </td>


                        {/* ESTADO */}

                        <td>

                          <span
                            className={`
                              estado
                              estado-${(
                                activo.estado ||
                                ""
                              )
                                .toLowerCase()
                                .replaceAll(
                                  " ",
                                  "-"
                                )}
                            `}
                          >

                            {activo.estado}

                          </span>

                        </td>


                        {/* RESPONSABLE */}

                        <td>
                          {activo.responsable || "—"}
                        </td>


                        {/* ACCIONES */}

                        <td>

                          <button

                            className="btn-ver"

                            onClick={() =>
                              navigate(
                                "/Detalles_mantenimiento",
                                {
                                  state: {
                                    activo
                                  }
                                }
                              )
                            }

                          >

                            Ver detalles

                          </button>

                        </td>


                      </tr>

                    )

                  )

                )}


              </tbody>

            </table>

          )}


          {/* =================================================
              NUEVA ORDEN
          ================================================= */}

          {/* CAMBIO */}
          <button
            className="btn-nuevo-ticket"
            onClick={() => setMostrarNuevaOrden(true)}
          >
            Nueva orden de mantenimiento
          </button>

          {/* CAMBIO */}
          {mostrarNuevaOrden && (
            <NuevaOrden
              abrir={true}
              onOrdenCreada={() => {
                setMostrarNuevaOrden(false);
              }}
              onCerrar={() => {
                setMostrarNuevaOrden(false);
              }}
            />
          )}


        </main>

      </div>

    </div>

  );

}


export default Activos_mantenimiento;