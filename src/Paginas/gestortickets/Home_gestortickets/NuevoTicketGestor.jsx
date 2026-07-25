import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VerticalNav from "../../../Components/verticalNav";
import SigmaHeader from "../../../Components/sigmaHeader";
import "./NuevoTicketGestor.css";

export default function NuevoTicket() {
  const navigate = useNavigate();

  const menuItems = [
    { to: "/Home_gestortickets", label: "General" },
    { to: "/MantenimientoGestor", label: "Mantenimiento" },
  ];

  const [activos, setActivos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [formData, setFormData] = useState({
    titulo: "",
    tipo: "",
    prioridad: "",
    activo: "",
    descripcion: "",
    responsable: "",
    archivo: null,
  });

  useEffect(() => {
    cargarActivos();
    cargarUsuarios();
  }, []);

  const cargarActivos = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/activos");

      if (!res.ok) throw new Error("Error al cargar activos");

      const data = await res.json();

      setActivos(data);
    } catch (err) {
      console.error(err);
    }
  };

  const cargarUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/usuarios");

      if (!res.ok) throw new Error("Error al cargar usuarios");

      const data = await res.json();

      setUsuarios(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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

      const response = await fetch(
        "http://localhost:8080/api/tickets",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ticket),
        }
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      navigate("/Home_gestortickets");
    } catch (err) {
      console.error(err);
      alert("No fue posible crear el ticket.");
    }
  };

  return (
    <>
      <SigmaHeader />

      <div className="layout-container-ticketg">
        <VerticalNav items={menuItems} />

        <main className="page-content nuevo-ticket-container">

          <header className="header-nuevo-ticket">
            <h1>Nuevo ticket</h1>

            <button
              className="volver-lista"
              onClick={() => navigate("/Home_gestortickets")}
            >
              Volver a lista
            </button>

          </header>

          <p className="descripcion-intro">
            Crea un ticket de incidente o solicitud asociado a un activo
          </p>

          <form
            onSubmit={handleSubmit}
            className="form-ticket"
          >            <section className="form-section">
              <h3>Información del ticket</h3>

              <p className="info-text">
                Define lo mínimo necesario para que el equipo pueda atenderlo.
              </p>

              <div className="campo-form">
                <label>Título o resumen</label>

                <input
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">

                <div className="campo-form">
                  <label>Tipo de ticket</label>

                  <select
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione tipo</option>

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

                  <label>Prioridad</label>

                  <select
                    name="prioridad"
                    value={formData.prioridad}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione prioridad</option>

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

              <div className="campo-form">

                <label>Activo relacionado</label>

                <select
                  name="activo"
                  value={formData.activo}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Seleccione un activo
                  </option>

                  {activos.map((activo) => (

                    <option
                      key={activo.id}
                      value={activo.id}
                    >
                      {activo.titulo}
                    </option>

                  ))}

                </select>

              </div>

              <div className="campo-form">

                <label>Responsable</label>

                <select
                  name="responsable"
                  value={formData.responsable}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Seleccione un responsable
                  </option>

                  {usuarios.map((usuario) => (

                    <option
                      key={usuario.id}
                      value={usuario.id}
                    >
                      {usuario.nombre}
                    </option>

                  ))}

                </select>

              </div>

              <div className="campo-form">

                <label>Descripción</label>

                <textarea
                  name="descripcion"
                  rows={5}
                  value={formData.descripcion}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="campo-form adjuntos">

                <label>Adjunto</label>

                <input
                  type="file"
                  name="archivo"
                  onChange={handleChange}
                />

              </div>

            </section>

            <footer className="form-footer">

              <button
                type="button"
                className="btn-cancelar"
                onClick={() => navigate("/Home_gestortickets")}
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="btn-crear"
              >
                Crear ticket
              </button>

            </footer>

          </form>

        </main>

      </div>

    </>
  );
}