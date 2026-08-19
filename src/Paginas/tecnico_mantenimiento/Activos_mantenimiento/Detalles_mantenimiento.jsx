import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "./Detalles_mantenimiento.css";

import SigmaHeader from "../../../Components/sigmaHeader";
import VerticalNav from "../../../Components/verticalNav";

import { apiFetch } from "../../../API/RegistroAPI";


function Detalles_mantenimiento() {

  const navigate = useNavigate();

  const location = useLocation();

  const activo = location.state?.activo;


  const [ordenes, setOrdenes] = useState([]);

  const [loading, setLoading] = useState(true);


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
  CARGAR ÓRDENES DEL ACTIVO
  =========================================================
  */

  useEffect(() => {

    if (!activo?.id) {

      setLoading(false);

      return;

    }


    const cargarOrdenes = async () => {

      try {

        const data =
          await apiFetch("/api/ordenes");


        const ordenesDelActivo =
          data.filter(
            (orden) =>
              orden.activoId === activo.id
          );


        setOrdenes(
          ordenesDelActivo
        );

      } catch (error) {

        console.error(
          "Error cargando órdenes:",
          error
        );

        setOrdenes([]);

      } finally {

        setLoading(false);

      }

    };


    cargarOrdenes();

  }, [activo]);


  /*
  =========================================================
  ETIQUETA ESTADO
  =========================================================
  */

  const getLabelEstado = (estado) => {

    const map = {

      EN_CURSO: "En curso",

      PENDIENTE: "Pendiente",

      CERRADA: "Cerrada"

    };

    return map[estado] || estado;

  };


  /*
  =========================================================
  ETIQUETA TIPO
  =========================================================
  */

  const getLabelTipo = (tipo) => {

    const map = {

      CORRECTIVO: "Correctivo",

      PREVENTIVO: "Preventivo",

      INSPECCION: "Inspección"

    };

    return map[tipo] || tipo;

  };


  /*
  =========================================================
  FORMATEAR FECHA
  =========================================================
  */

  const formatFecha = (fecha) => {

    if (!fecha) {
      return "—";
    }

    return new Date(
      fecha
    ).toLocaleDateString("es-CO");

  };


  /*
  =========================================================
  VALIDAR ACTIVO
  =========================================================
  */

  if (!activo) {

    return (

      <div>

        <SigmaHeader />

        <p
          style={{
            padding: "2rem"
          }}
        >
          No se encontró información del activo.
        </p>

      </div>

    );

  }


  /*
  =========================================================
  ÓRDENES CERRADAS
  =========================================================
  */

  const ordenCerrada =
    ordenes.filter(
      (orden) =>
        orden.estado === "CERRADA"
    );


  /*
  =========================================================
  ÚLTIMA ORDEN
  =========================================================
  */

  const ultimaOrden =
    [...ordenCerrada].sort(
      (a, b) =>
        new Date(b.fechaFin) -
        new Date(a.fechaFin)
    )[0];


  return (

    <div>

      <header>

        <SigmaHeader />

      </header>


      <div className="layout-mantenimiento">

        <VerticalNav
          items={menuItems}
        />


        <main className="contenido-mantenimiento">


          {/* =================================================
              CABECERA
          ================================================= */}

          <div className="cabecera-historial">

            <div>

              <h1>
                Historial de mantenimiento
              </h1>

              <p>

                {activo.titulo}
                {" · "}
                Revisa las intervenciones realizadas
                y próximas acciones

              </p>

            </div>


            <button

              className="btn-volver"

              onClick={() =>
                navigate(
                  "/Activos_mantenimiento"
                )
              }

            >

              Volver a activos

            </button>

          </div>


          {/* =================================================
              INFORMACIÓN DEL ACTIVO
          ================================================= */}

          <section className="info-activo">

            <div className="activo-datos">

              <strong>
                {activo.titulo}
              </strong>


              <span>

                Serie:
                {" "}
                {activo.serie || "—"}

                {" · "}

                {activo.tipo}

              </span>


              <span>

                Responsable:
                {" "}
                {activo.responsable || "—"}

              </span>


              <span>

                Último mantenimiento:
                {" "}

                {
                  ultimaOrden
                    ? formatFecha(
                        ultimaOrden.fechaFin
                      )
                    : "Sin registros"
                }

              </span>

            </div>


            <div className="estado-actual">

              <span className="badge-operativo">

                Estado:
                {" "}
                {activo.estado}

              </span>


              <button
                className="btn-nuevo"
              >

                Nueva orden de mantenimiento

              </button>

            </div>

          </section>


          {/* =================================================
              RESUMEN
          ================================================= */}

          <section className="resumen-historial">


            <div className="card-resumen">

              <h4>
                Órdenes totales
              </h4>

              <p className="valor">
                {ordenes.length}
              </p>

              <span>

                {
                  ordenes.filter(
                    (orden) =>
                      orden.tipo ===
                      "PREVENTIVO"
                  ).length
                }

                {" preventivas · "}

                {
                  ordenes.filter(
                    (orden) =>
                      orden.tipo ===
                      "CORRECTIVO"
                  ).length
                }

                {" correctivas"}

              </span>

            </div>


            <div className="card-resumen">

              <h4>
                Órdenes cerradas
              </h4>

              <p className="valor">

                {ordenCerrada.length}

              </p>

              <span>

                De {ordenes.length}
                {" "}
                intervenciones totales

              </span>

            </div>


            <div className="card-resumen">

              <h4>
                Estado actual
              </h4>

              <p className="valor">

                {activo.estado}

              </p>

              <span>

                Descripción:
                {" "}
                {activo.descripcion || "—"}

              </span>

            </div>


          </section>


          {/* =================================================
              HISTORIAL
          ================================================= */}

          {loading ? (

            <p
              style={{
                padding: "1rem"
              }}
            >
              Cargando historial...
            </p>

          ) : (

            <table className="tabla-historial">

              <thead>

                <tr>

                  <th>
                    Orden
                  </th>

                  <th>
                    Tipo
                  </th>

                  <th>
                    Estado
                  </th>

                  <th>
                    Técnico
                  </th>

                  <th>
                    Descripción
                  </th>

                  <th>
                    Fecha
                  </th>

                </tr>

              </thead>


              <tbody>


                {ordenes.length === 0 ? (

                  <tr>

                    <td
                      colSpan="6"
                      style={{
                        textAlign: "center",
                        padding: 30
                      }}
                    >

                      No hay órdenes registradas
                      para este activo

                    </td>

                  </tr>

                ) : (

                  ordenes.map(
                    (orden) => (

                      <tr
                        key={orden.id}
                      >

                        <td>

                          {
                            orden.ordenId ||
                            orden.id
                          }

                        </td>


                        <td>

                          {getLabelTipo(
                            orden.tipo
                          )}

                        </td>


                        <td>

                          <span

                            className={`
                              estado-orden
                              ${
                                orden.estado ===
                                "CERRADA"
                                  ? "cerrada"
                                  : "seguimiento"
                              }
                            `}

                          >

                            {getLabelEstado(
                              orden.estado
                            )}

                          </span>

                        </td>


                        <td>

                          {
                            orden.tecnicoNombre ||
                            "—"
                          }

                        </td>


                        <td className="descripcion">

                          {
                            orden.descripcion ||
                            "—"
                          }

                        </td>


                        <td>

                          {formatFecha(
                            orden.fechaProgramada
                          )}

                        </td>


                      </tr>

                    )

                  )

                )}


              </tbody>

            </table>

          )}


          {/* =================================================
              NOTA FINAL
          ================================================= */}

          <div className="nota-final">

            <strong>
              ¿Falta alguna intervención?
            </strong>

            <p>

              Si detectas un mantenimiento que
              no aparece en el historial, puedes
              registrarlo creando una nueva orden
              asociada a este activo.

            </p>

          </div>


        </main>

      </div>

    </div>

  );

}


export default Detalles_mantenimiento;