import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SigmaHeader from "../../../Components/sigmaHeader";
import VerticalNav from "../../../Components/verticalNav";

import {
  activoService,
  usuarioService
} from "../../../API/RegistroAPI";

import { useAuth } from "../../../Hooks/AuthContext";

import "./Activos_responsable.css";


function Activos_responsable() {

  const navigate = useNavigate();

  // =====================================================
  // AUTENTICACIÓN
  // =====================================================

  const { token } = useAuth();


  // =====================================================
  // MENÚ
  // =====================================================

  const menuItems = [
    {
      to: "/Home_responsable",
      label: "General"
    },
    {
      to: "/Activos_responsable",
      label: "Activos"
    },
    {
      to: "/MisTickets",
      label: "Tickets"
    }
  ];


  // =====================================================
  // ESTADOS
  // =====================================================

  const [activos, setActivos] = useState([]);

  const [usuarioActual, setUsuarioActual] =
    useState(null);

  const [filtroTipo, setFiltroTipo] =
    useState("Todos");

  const [filtroEstado, setFiltroEstado] =
    useState("Todos");

  const [busqueda, setBusqueda] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [activoSeleccionado, setActivoSeleccionado] =
    useState(null);


  // =====================================================
  // CARGAR USUARIO Y ACTIVOS
  // =====================================================

  useEffect(() => {

    const cargarDatos = async () => {

      try {

        setLoading(true);
        setError("");


        // =================================================
        // USUARIO ACTUAL
        // =================================================

        const usuario =
          await usuarioService.actual(token);

        console.log(
          "USUARIO ACTUAL:",
          usuario
        );

        setUsuarioActual(usuario);


        // =================================================
        // TODOS LOS ACTIVOS
        // =================================================

        const data =
          await activoService.listar(token);

        const todosLosActivos =
          Array.isArray(data)
            ? data
            : [];

        console.log(
          "TODOS LOS ACTIVOS:",
          todosLosActivos
        );


        // =================================================
        // IDENTIFICADORES DEL USUARIO
        // =================================================

        const identificadoresUsuario = [

          usuario?.nombre,

          usuario?.nom,

          usuario?.email,

          usuario?.usuario,

          usuario?.username

        ]
          .filter(Boolean)
          .map(valor =>
            String(valor)
              .trim()
              .toLowerCase()
          );


        console.log(
          "IDENTIFICADORES USUARIO:",
          identificadoresUsuario
        );


        // =================================================
        // FILTRAR ACTIVOS DEL RESPONSABLE
        // =================================================

        const misActivos =
          todosLosActivos.filter((activo) => {

            const responsable =
              String(
                activo?.responsable || ""
              )
                .trim()
                .toLowerCase();


            return identificadoresUsuario.includes(
              responsable
            );

          });


        console.log(
          "ACTIVOS DEL RESPONSABLE:",
          misActivos
        );


        setActivos(misActivos);

      } catch (err) {

        console.error(
          "Error cargando datos:",
          err
        );

        setActivos([]);

        setError(
          "No fue posible cargar la información."
        );

      } finally {

        setLoading(false);

      }

    };


    // =====================================================
    // SOLO CARGAR CUANDO EXISTE TOKEN
    // =====================================================

    if (token) {

      cargarDatos();

    } else {

      console.warn(
        "No existe token en AuthContext."
      );

      setLoading(false);

    }

  }, [token]);


  // =====================================================
  // FILTROS
  // =====================================================

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

        String(activo.id || "")
          .toLowerCase()
          .includes(texto)

        ||

        (activo.serie || "")
          .toLowerCase()
          .includes(texto);


      const coincideTipo =
        filtroTipo === "Todos" ||
        activo.tipo === filtroTipo;


      const coincideEstado =
        filtroEstado === "Todos" ||
        activo.estado === filtroEstado;


      return (
        coincideBusqueda &&
        coincideTipo &&
        coincideEstado
      );

    });


  // =====================================================
  // LIMPIAR FILTROS
  // =====================================================

  const limpiarFiltros = () => {

    setBusqueda("");

    setFiltroTipo("Todos");

    setFiltroEstado("Todos");

  };


  // =====================================================
  // CLASE DEL ESTADO
  // =====================================================

  const getEstadoClase = (estado) => {

    if (!estado) {
      return "";
    }

    return estado
      .toLowerCase()
      .replaceAll(" ", "-");

  };


  // =====================================================
  // VISTA
  // =====================================================

  return (

    <>

      <SigmaHeader />


      <div className="layout-container-responsable">

        <VerticalNav
          items={menuItems}
        />


        <main className="page-content-responsable">


          {/* =================================================
              ENCABEZADO
          ================================================= */}

          <section className="header-activos-responsable">

            <div>

              <h1>
                Mis activos
              </h1>

              <p>
                Consulta los activos que tienes
                asignados como responsable.
              </p>

            </div>

          </section>


          {/* =================================================
              FILTROS
          ================================================= */}

          <section className="filtros-activos-responsable">

            <div className="busqueda-filtros">


              {/* BUSCADOR */}

              <input

                type="text"

                placeholder="Buscar por nombre, código o serie..."

                value={busqueda}

                onChange={(e) =>
                  setBusqueda(e.target.value)
                }

                className="input-busqueda"

              />


              {/* TIPO */}

              <div className="grupo-filtro">

                <label>
                  Tipo
                </label>

                <select

                  value={filtroTipo}

                  onChange={(e) =>
                    setFiltroTipo(e.target.value)
                  }

                >

                  <option value="Todos">
                    Todos
                  </option>

                  <option value="Celular">
                    Celular
                  </option>

                  <option value="Tablet">
                    Tablet
                  </option>

                  <option value="Periférico">
                    Periférico
                  </option>

                  <option value="Pantalla">
                    Pantalla
                  </option>

                  <option value="Computadora">
                    Computadora
                  </option>

                </select>

              </div>


              {/* ESTADO */}

              <div className="grupo-filtro">

                <label>
                  Estado
                </label>

                <select

                  value={filtroEstado}

                  onChange={(e) =>
                    setFiltroEstado(e.target.value)
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


              {/* LIMPIAR */}

              <button

                className="btn-limpiar"

                onClick={limpiarFiltros}

              >

                Limpiar filtros

              </button>

            </div>

          </section>


          {/* =================================================
              CONTENIDO
          ================================================= */}

          {loading ? (

            <div className="estado-vacio">

              <h3>
                Cargando activos...
              </h3>

              <p>
                Estamos obteniendo la información.
              </p>

            </div>

          ) : error ? (

            <div className="estado-vacio">

              <h3>
                Ocurrió un problema
              </h3>

              <p>
                {error}
              </p>

            </div>

          ) : activosFiltrados.length === 0 ? (

            <div className="estado-vacio">

              <h3>
                No tienes activos asignados
              </h3>

              <p>
                Actualmente no existen activos
                asociados a tu usuario.
              </p>

            </div>

          ) : (

            <div className="activos-grid-responsable">

              {activosFiltrados.map((activo) => (

                <div

                  className="activo-card-responsable"

                  key={activo.id}

                >


                  {/* =================================================
                      IMAGEN
                      NO CAMBIAMOS TU IMAGEN
                  ================================================= */}

                  <img

                    src={
                      activo.img ||
                      "https://via.placeholder.com/300x180"
                    }

                    alt={activo.titulo}

                    className="activo-imagen"

                  />


                  <div className="activo-info">


                    <h3>
                      {activo.titulo}
                    </h3>


                    <p className="codigo-activo">

                      Código: {activo.id}

                    </p>


                    <div className="activo-detalles">

                      <span>

                        <strong>
                          Tipo:
                        </strong>{" "}

                        {activo.tipo || "—"}

                      </span>


                      <span>

                        <strong>
                          Serie:
                        </strong>{" "}

                        {activo.serie || "—"}

                      </span>

                    </div>


                    <div className="activo-footer">


                      <span

                        className={`estado estado-${getEstadoClase(
                          activo.estado
                        )}`}

                      >

                        {activo.estado}

                      </span>


                      <button

                        className="btn-ver-detalle"

                        onClick={() =>
                          setActivoSeleccionado(
                            activo
                          )
                        }

                      >

                        Ver detalles

                      </button>


                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </main>

      </div>


      {/* =================================================
          MODAL DETALLE
      ================================================= */}

      {activoSeleccionado && (

        <div

          className="modal-overlay"

          onClick={() =>
            setActivoSeleccionado(null)
          }

        >

          <div

            className="modal-activo"

            onClick={(e) =>
              e.stopPropagation()
            }

          >


            <button

              className="modal-close"

              onClick={() =>
                setActivoSeleccionado(null)
              }

            >

              ✕

            </button>


            {/* IMAGEN ORIGINAL */}

            <img

              src={
                activoSeleccionado.img ||
                "https://via.placeholder.com/500x300"
              }

              alt={activoSeleccionado.titulo}

              className="modal-img"

            />


            <h2>
              {activoSeleccionado.titulo}
            </h2>


            <span

              className={`estado estado-${getEstadoClase(
                activoSeleccionado.estado
              )}`}

            >

              {activoSeleccionado.estado}

            </span>


            <div className="modal-detalles">


              <div>

                <strong>
                  Tipo
                </strong>

                <p>
                  {activoSeleccionado.tipo || "—"}
                </p>

              </div>


              <div>

                <strong>
                  Número de serie
                </strong>

                <p>
                  {activoSeleccionado.serie || "—"}
                </p>

              </div>


              <div>

                <strong>
                  Responsable
                </strong>

                <p>
                  {activoSeleccionado.responsable || "—"}
                </p>

              </div>


              <div>

                <strong>
                  Descripción
                </strong>

                <p>
                  {activoSeleccionado.descripcion ||
                    "Sin descripción"}
                </p>

              </div>


            </div>


            <button

              className="btn-cerrar-modal"

              onClick={() =>
                setActivoSeleccionado(null)
              }

            >

              Cerrar

            </button>

          </div>

        </div>

      )}

    </>

  );

}


export default Activos_responsable;