import "./styles.css";
import { useNavigate } from "react-router-dom";

function AccionesRapido() {
    const navigate = useNavigate();

    return (
        <div className="menu-rapido-container">
            <h3 className="titulo-seccion">Acciones rápidas</h3>
            <div className="grid-opciones">
                <span 
                    className="opcion-link" 
                    onClick={() => navigate("/NuevoActivo")}
                    style={{ cursor: "pointer" }}
                >
                    Crear activo
                </span>

                <span>Crear ticket</span>
                <span>Programar mantenimiento</span>
                <span>Crear usuario / rol</span>
            </div>

            <h3 className="titulo-seccion">Reportes rápidos</h3>
            <div className="grid-opciones">
                <span>Activos por categoría</span>
                <span>Costos por mes</span>
                <span>KPIs de soporte</span>
            </div>

            <h3 className="titulo-seccion">Métricas históricas</h3>
        </div>
    );
}

export default AccionesRapido;
