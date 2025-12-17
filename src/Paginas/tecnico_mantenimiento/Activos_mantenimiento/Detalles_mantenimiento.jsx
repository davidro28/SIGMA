import React from "react";
import { useNavigate } from "react-router-dom";
import "./Detalles_mantenimiento.css";
import SigmaHeader from "../../../Components/sigmaHeader";
import VerticalNav from "../../../Components/verticalNav";

function Detalles_mantenimiento() {
  const navigate = useNavigate();

  const menuItems = [
    { to: "/HomeTecniMantenimiento", label: "General" },
    { to: "/Activos_mantenimiento", label: "Activos" },
    { to: "/Tickets_mantenimiento", label: "Tickets" },
    { to: "/MantenimientosTecniMantenimiento", label: "Mantenimientos" }
  ];

  const historial = [
    {
      fecha: "05/03/2025",
      tipo: "Mantenimiento preventivo",
      estado: "Cerrada",
      tecnico: "Carlos López",
      descripcion:
        "Revisión general, limpieza interna y actualización de software. No se detectan fallos críticos."
    },
    {
      fecha: "10/12/2024",
      tipo: "Correctivo",
      estado: "En seguimiento",
      tecnico: "María Pérez",
      descripcion:
        "Reporte de sobrecalentamiento ocasional. Se reemplaza pasta térmica y se programa nueva revisión."
    },
    {
      fecha: "22/08/2024",
      tipo: "Mantenimiento preventivo",
      estado: "Cerrada",
      tecnico: "Luis Gómez",
      descripcion:
        "Cambio de batería por degradación. Pruebas de rendimiento satisfactorias."
    },
    {
      fecha: "03/05/2024",
      tipo: "Correctivo",
      estado: "Cerrada",
      tecnico: "Carlos López",
      descripcion:
        "Reposición de cargador dañado. Se verifica correcto funcionamiento del equipo."
    }
  ];

  return (
    <div>
      {/* HEADER */}
      <header>
        <SigmaHeader />
      </header>

      <div className="layout-mantenimiento">
        <VerticalNav items={menuItems} />

        <main className="contenido-mantenimiento">
          {/* CABECERA */}
          <div className="cabecera-historial">
            <div>
              <h1>Historial de mantenimiento</h1>
              <p>
                Laptop mantenimiento campo · Revisa las intervenciones realizadas
                y próximas acciones
              </p>
            </div>

            <button
              className="btn-volver"
              onClick={() => navigate("/Activos_mantenimiento")}
            >
              Volver a activos
            </button>
          </div>

          {/* INFO ACTIVO */}
          <section className="info-activo">
            <div className="activo-datos">
              <strong>Laptop mantenimiento campo</strong>
              <span>ID: ACT-MT-0098 · Portátil</span>
              <span>Ubicación: Vehículo servicio 03</span>
              <span>Último mantenimiento: 05/03/2025</span>
            </div>

            <div className="estado-actual">
              <span className="badge-operativo">
                Estado actual: Operativo
              </span>
              <button className="btn-nuevo">
                Nueva orden de mantenimiento
              </button>
            </div>
          </section>

          {/* RESUMEN */}
          <section className="resumen-historial">
            <div className="card-resumen">
              <h4>Órdenes en los últimos 12 meses</h4>
              <p className="valor">4</p>
              <span>2 preventivas · 2 correctivas</span>
            </div>

            <div className="card-resumen">
              <h4>Tiempo promedio de resolución</h4>
              <p className="valor">8 h</p>
              <span>Basado en 4 intervenciones cerradas</span>
            </div>

            <div className="card-resumen filtros">
              <h4>Filtrar historial</h4>
              <span>Tipo de mantenimiento: Todos</span>
              <span>Estado de orden: Todos</span>
              <span>Técnico: Todos</span>
              <span>Rango de fechas</span>
            </div>
          </section>

          {/* TABLA */}
          <table className="tabla-historial">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Tipo de orden</th>
                <th>Estado</th>
                <th>Técnico</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {historial.map((item, index) => (
                <tr key={index}>
                  <td>{item.fecha}</td>
                  <td>{item.tipo}</td>
                  <td>
                    <span
                      className={`estado-orden ${
                        item.estado === "Cerrada"
                          ? "cerrada"
                          : "seguimiento"
                      }`}
                    >
                      {item.estado}
                    </span>
                  </td>
                  <td>{item.tecnico}</td>
                  <td className="descripcion">{item.descripcion}</td>
                  <td>
                    <button className="btn-ver">Ver orden</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="nota-final">
            <strong>¿Falta alguna intervención?</strong>
            <p>
              Si detectas un mantenimiento que no aparece en el historial,
              puedes registrarlo creando una nueva orden asociada a este activo.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Detalles_mantenimiento;
