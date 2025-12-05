import "./styles.css";

function ActividadReciente() {
    const actividades = [
        {
            titulo: "Ticket #324 creado",
            descripcion: "Climatizador sala 4 · Hace 5 min · Por Ana"
        },
        {
            titulo: "Mantenimiento preventivo completado",
            descripcion: "Grupo electrógeno · Hace 40 min · Por Carlos"
        },
        {
            titulo: "Nuevo activo dado de alta",
            descripcion: "Servidor SIG-12 · Hoy 09:12 · Por David"
        },
        {
            titulo: "Solicitud de aumento de presupuesto",
            descripcion: "Área TI · Pendiente de aprobación"
        }
    ];

    return (
        <div className="actividad-container">
            <div className="actividad-header">
                <h3>Actividad reciente</h3>
                <a href="#" className="ver-todo">Ver todo</a>
            </div>
            <ul className="actividad-lista">
                {actividades.map((item, index) => (
                    <li key={index} className="actividad-item">
                        <span className="punto"></span>
                        <div className="actividad-info">
                            <p className="titulo">{item.titulo}</p>
                            <p className="descripcion">{item.descripcion}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ActividadReciente;
