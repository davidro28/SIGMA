import "./styles.css";

function TicketsAbiertos() {
    const tickets = [
        {
            id: "#324",
            activo: "Climatizador sala 4",
            estado: "Abierto",
            prioridad: "Alta"
        },
        {
            id: "#317",
            activo: "Servidor SIG-03",
            estado: "En progreso",
            prioridad: "Crítica"
        },
        {
            id: "#309",
            activo: "Ascensor torre B",
            estado: "Abierto",
            prioridad: "Media"
        }
    ];
    const getEstadoClass = (estado) => {
        if (estado === "Abierto") return "estado-abierto";
        if (estado === "En progreso") return "estado-progreso";
        return "";
    };

    return (
        <div className="tickets-container">
            <h3>Tickets abiertos</h3>
            <div className="tabla-header">
                <span>Ticket</span>
                <span>Activo</span>
                <span>Estado</span>
                <span>Prioridad</span>
            </div>
            <div className="tabla-body">
                {tickets.map((t, index) => (
                    <div className="tabla-row" key={index}>
                        <span className="ticket-id">{t.id}</span>
                        <span className="ticket-activo">{t.activo}</span>
                        <span className={`estado-tag ${getEstadoClass(t.estado)}`}>
                            {t.estado}
                        </span>
                        <span className="ticket-prioridad">{t.prioridad}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TicketsAbiertos;
