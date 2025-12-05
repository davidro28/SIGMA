import "./styles.css";

function AccionesRapido() {
    return (
        <div className="menu-rapido-container">
            {/* Acciones rápidas */}
            <h3 className="titulo-seccion">Acciones rápidas</h3>
            <div className="grid-opciones">
                <span>Crear activo</span>
                <span>Crear ticket</span>
                <span>Programar mantenimiento</span>
                <span>Crear usuario / rol</span>
            </div>
            {/* Reportes rápidos */}
            <h3 className="titulo-seccion">Reportes rápidos</h3>
            <div className="grid-opciones">
                <span>Activos por categoría</span>
                <span>Costos por mes</span>
                <span>KPIs de soporte</span>
            </div>
            {/* Métricas históricas */}
            <h3 className="titulo-seccion">Métricas históricas</h3>
        </div>
    );
}

export default AccionesRapido;
