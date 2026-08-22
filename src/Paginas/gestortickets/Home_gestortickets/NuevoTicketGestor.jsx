import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import VerticalNav from "../../../Components/verticalNav";
import SigmaHeader from "../../../Components/sigmaHeader";

import {
  activoService,
  usuarioService,
  ticketService
} from "../../../API/RegistroAPI";

import "./NuevoTicketGestor.css";

export default function NuevoTicket() {
  const navigate = useNavigate();

  const menuItems = [
    { to: "/Home_gestortickets", label: "General" },
    { to: "/MantenimientoGestor", label: "Mantenimiento" },
  ];

  const [activos, setActivos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [cargandoActivos, setCargandoActivos] = useState(true);
  const [cargandoUsuarios, setCargandoUsuarios] = useState(true);
  const [guardando, setGuardando] = useState(false);

  const [formData, setFormData] = useState({
    titulo: "",
    tipo: "",
    prioridad: "",
    activo: "",
    descripcion: "",
    responsable: "",
    archivo: null,
  });

  /* =========================================================
     CARGAR DATOS INICIALES
     ========================================================= */

  useEffect(() => {
    cargarActivos();
    cargarUsuarios();
  }, []);

  /* =========================================================
     CARGAR ACTIVOS
     ========================================================= */

  const cargarActivos = async () => {
    try {
      setCargandoActivos(true);

      const data = await activoService.listar();

      setActivos(Array.isArray(data) ? data : []);

    } catch (err) {
      console.error("Error al cargar activos:", err);
      alert("No fue posible cargar los activos.");
    } finally {
      setCargandoActivos(false);
    }
  };

  /* =========================================================
     CARGAR USUARIOS
     ========================================================= */

  const cargarUsuarios = async () => {
    try {
      setCargandoUsuarios(true);

      const data = await usuarioService.listar();

      setUsuarios(Array.isArray(data) ? data : []);

    } catch (err) {
      console.error("Error al cargar usuarios:", err);
      alert("No fue posible cargar los usuarios.");
    } finally {
      setCargandoUsuarios(false);
    }
  };

  /* =========================================================
     MANEJAR CAMBIOS DEL FORMULARIO
     ========================================================= */

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  /* =========================================================
     CREAR TICKET
     ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (guardando) {
      return;
    }

    try {
      setGuardando(true);

      const ticket = {
        tit: formData.titulo,
        descrip: formData.descripcion,
        tip: formData.tipo,
        priori: formData.prioridad,
        est: "ABIERTO",

        activoId: formData.activo,

        asignadoId: formData.responsable,

        archivoNombre: formData.archivo
          ? formData.archivo.name
          : null,
      };

      console.log("Ticket que se enviará:", ticket);

      await ticketService.crear(ticket);

      alert("Ticket creado correctamente.");

      navigate("/Home_gestortickets");

    } catch (err) {
      console.error("Error creando ticket:", err);

      alert(
        err?.message ||
        "No fue posible crear el ticket."
      );

    } finally {
      setGuardando(false);
    }
  };

  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <>
      <SigmaHeader />

      <div className="layout-container-ticketg">

        <VerticalNav items={menuItems} />

        <main className="page-content nuevo-ticket-container">

          {/* =================================================
              ENCABEZADO
              ================================================= */}

          <header className="header-nuevo-ticket">

            <h1>Nuevo ticket</h1>

            <button
              type="button"
              className="volver-lista"
              onClick={() =>
                navigate("/Home_gestortickets")
              }
            >
              Volver a lista
            </button>

          </header>

          <p className="descripcion-intro">
            Crea un ticket de incidente o solicitud asociado a un activo
          </p>

          {/* =================================================
              FORMULARIO
              ================================================= */}

          <form
            onSubmit={handleSubmit}
            className="form-ticket"
          >

            {/* =================================================
                INFORMACIÓN DEL TICKET
                ================================================= */}

            <section className="form-section">

              <h3>
                Información del ticket
              </h3>

              <p className="info-text">
                Define lo mínimo necesario para que el equipo pueda atenderlo.
              </p>

              {/* TÍTULO */}

              <div className="campo-form">

                <label>
                  Título o resumen
                </label>

                <input
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  placeholder="Ingrese el título del ticket"
                  required
                />

              </div>

              {/* TIPO Y PRIORIDAD */}

              <div className="form-row">

                <div className="campo-form">

                  <label>
                    Tipo de ticket
                  </label>

                  <select
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Seleccione tipo
                    </option>

                    <option value="INCIDENTE">
                      Incidente
                    </option>

                    <option value="SOLICITUD">
                      Solicitud
                    </option>

                    <option value="MANTENIMIENTO">
                      Mantenimiento
                    </option>

                  </select>

                </div>

                <div className="campo-form">

                  <label>
                    Prioridad
                  </label>

                  <select
                    name="prioridad"
                    value={formData.prioridad}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Seleccione prioridad
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

              </div>

              {/* =================================================
                  ACTIVO
                  ================================================= */}

              <div className="campo-form">

                <label>
                  Activo relacionado
                </label>

                <select
                  name="activo"
                  value={formData.activo}
                  onChange={handleChange}
                  required
                  disabled={cargandoActivos}
                >

                  <option value="">
                    {cargandoActivos
                      ? "Cargando activos..."
                      : "Seleccione un activo"}
                  </option>

                  {activos.map((activo) => (

                    <option
                      key={activo.id}
                      value={activo.id}
                    >
                      {activo.titulo || activo.nombre || activo.id}
                    </option>

                  ))}

                </select>

              </div>

              {/* =================================================
                  RESPONSABLE
                  ================================================= */}

              <div className="campo-form">

                <label>
                  Responsable
                </label>

                <select
                  name="responsable"
                  value={formData.responsable}
                  onChange={handleChange}
                  required
                  disabled={cargandoUsuarios}
                >

                  <option value="">
                    {cargandoUsuarios
                      ? "Cargando usuarios..."
                      : "Seleccione un responsable"}
                  </option>

                  {usuarios.map((usuario) => (

                    <option
                      key={usuario.id}
                      value={usuario.id}
                    >
                      {usuario.nombre ||
                        usuario.nom ||
                        usuario.email ||
                        usuario.id}
                    </option>

                  ))}

                </select>

              </div>

              {/* =================================================
                  DESCRIPCIÓN
                  ================================================= */}

              <div className="campo-form">

                <label>
                  Descripción
                </label>

                <textarea
                  name="descripcion"
                  rows={5}
                  value={formData.descripcion}
                  onChange={handleChange}
                  placeholder="Describe detalladamente el incidente o solicitud..."
                  required
                />

              </div>

              {/* =================================================
                  ARCHIVO
                  ================================================= */}

              <div className="campo-form adjuntos">

                <label>
                  Adjunto
                </label>

                <input
                  type="file"
                  name="archivo"
                  onChange={handleChange}
                />

                {formData.archivo && (
                  <p>
                    Archivo seleccionado:{" "}
                    {formData.archivo.name}
                  </p>
                )}

              </div>

            </section>

            {/* =================================================
                BOTONES
                ================================================= */}

            <footer className="form-footer">

              <button
                type="button"
                className="btn-cancelar"
                onClick={() =>
                  navigate("/Home_gestortickets")
                }
                disabled={guardando}
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="btn-crear"
                disabled={guardando}
              >
                {guardando
                  ? "Creando ticket..."
                  : "Crear ticket"}
              </button>

            </footer>

          </form>

        </main>

      </div>
    </>
  );
}