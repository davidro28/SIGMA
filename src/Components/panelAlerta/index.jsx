import "./styles.csS";

function PanelAlerta() {
    return (
    <div className="alerts-container">
        <div className="alerts-header">
        <h3>Alertas y pendientes</h3>
        <button className="config-btn">Configurar</button>
        </div>
        <div className="alert-item">
        <div className="alert-text">
            <p className="alert-title">3 tickets con SLA a punto de vencer</p>
            <span className="alert-subtitle">Revisa antes de las 18:00</span>
        </div>
        <span className="badge badge-critical">Crítico</span>
        </div>
        <div className="alert-item">
        <div className="alert-text">
            <p className="alert-title">2 mantenimientos atrasados</p>
            <span className="alert-subtitle">Planta de emergencia, Ascensor torre B</span>
        </div>
        <span className="badge badge-warning">Atención</span>
        </div>
        <div className="alert-item">
        <div className="alert-text">
            <p className="alert-title">Aprobaciones pendientes</p>
            <span className="alert-subtitle">
            4 nuevos activos · 1 baja · 1 cambio de presupuesto
            </span>
        </div>
        <span className="badge badge-review">Revisar</span>
        </div>
    </div>
    );
}

export default PanelAlerta;