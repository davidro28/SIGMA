import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VerticalNav from "../../../Components/verticalNav/index.jsx";
import SigmaHeader from "../../../Components/sigmaHeader";
import "./NuevoTicket.css";

export default function NuevoTicket() {
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [activo, setActivo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [archivo, setArchivo] = useState(null);
  const [responsable, setResponsable] = useState("");

  const [activos, setActivos] = useState([]);
  const [responsables, setResponsables] = useState([]);

  const API_TICKETS = "http://localhost:8080/api/tickets";

  const menuItems = [
    { to: "/Home", label: "General" },
    { to: "/Activos", label: "Activos" },
    { to: "/Tickets", label: "Tickets" },
    { to: "/mantenimiento_Admin", label: "Mantenimiento" }
  ];

  useEffect(() => {
    fetch("http://localhost:8080/api/activos")
      .then(r => r.json())
      .then(setActivos)
      .catch(() => setActivos([]));

    fetch("http://localhost:8080/api/usuarios")
      .then(r => r.json())
      .then(setResponsables)
      .catch(() => setResponsables([]));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoTicket = {
      tit: titulo,
      descrip: descripcion,

      // 🔥 FIX ENUMS
      tip: tipo.toUpperCase(),
      priori: prioridad.toUpperCase(),

      activoId: activo || null,
      asignadoId: responsable || null,
      archivoNombre: archivo ? archivo.name : null
    };

    try {
      const res = await fetch(API_TICKETS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoTicket)
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
      }

      navigate("/Tickets");

    } catch (err) {
      console.error("ERROR:", err);
      alert("No se pudo guardar el ticket");
    }
  };

  return (
    <>
      <SigmaHeader />

      <div className="layout-container-nuevo">
        <VerticalNav items={menuItems} />

        <main className="page-content nuevo-ticket-container">

          <header className="header-nuevo-ticket">
            <h1>Nuevo ticket</h1>

            <button
              type="button"
              className="volver-lista"
              onClick={() => navigate("/Tickets")}
            >
              Cancelar
            </button>
          </header>

          <form onSubmit={handleSubmit} className="form-ticket">

            <div className="campo-form">
              <label>Título</label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <div className="campo-form">
                <label>Tipo</label>
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  required
                >
                  <option value="">Selecciona</option>
                  <option value="INCIDENTE">Incidente</option>
                  <option value="SOLICITUD">Solicitud</option>
                  <option value="MANTENIMIENTO">Mantenimiento</option>
                </select>
              </div>

              <div className="campo-form">
                <label>Prioridad</label>
                <select
                  value={prioridad}
                  onChange={(e) => setPrioridad(e.target.value)}
                  required
                >
                  <option value="">Selecciona</option>
                  <option value="ALTA">Alta</option>
                  <option value="MEDIA">Media</option>
                  <option value="BAJA">Baja</option>
                </select>
              </div>
            </div>

            <div className="campo-form">
              <label>Activo</label>
              <select value={activo} onChange={(e) => setActivo(e.target.value)}>
                <option value="">Selecciona activo</option>
                {activos.map(a => (
                  <option key={a.id} value={a.id}>
                    {a.titulo}
                  </option>
                ))}
              </select>
            </div>

            <div className="campo-form">
              <label>Responsable</label>
              <select value={responsable} onChange={(e) => setResponsable(e.target.value)}>
                <option value="">Selecciona responsable</option>
                {responsables.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.nombre || r.email}
                  </option>
                ))}
              </select>
            </div>

            <div className="campo-form">
              <label>Descripción</label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>

            <div className="campo-form">
              <label>Archivo</label>
              <input
                type="file"
                onChange={(e) => setArchivo(e.target.files[0])}
              />
            </div>

            <div className="form-footer">
              <button
                type="button"
                className="btn-cancelar"
                onClick={() => navigate("/Tickets")}
              >
                Cancelar
              </button>

              <button type="submit" className="btn-crear">
                Crear ticket
              </button>
            </div>

          </form>
        </main>
      </div>
    </>
  );
}