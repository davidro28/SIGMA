import VerticalNav from "../../../Components/verticalNav/index.jsx";
import SigmaHeader from "../../../Components/sigmaHeader";
import "./Activos.css";

export default function Activos() {

    const menuItems = [
        { to: "/Home", label: "General" },
        { to: "/Activos", label: "Activos" },
        { to: "/tickets", label: "Tickets" },
        { to: "/mantenimiento", label: "Mantenimiento" }
    ];

    const activos = [
        {
            id: 1,
            titulo: "iPhone 14 – Ventas",
            tipo: "Celular",
            estado: "Disponible",
            img: "https://images.unsplash.com/photo-1603898037225-1c694f7fdf8a"
        }
    ];

    return (
        <>
            <SigmaHeader />

            <div className="layout-container">
                <VerticalNav items={menuItems} />

                <div className="activos-container">

                    <h1 className="page-title">Catálogo de activos</h1>
                    <p className="page-subtitle">
                        Visualiza los activos con su imagen, tipo y estado
                    </p>

                    <div className="top-bar">
                        <input
                            type="text"
                            placeholder="Buscar activo por nombre"
                            className="search-input"
                        />
                        <button className="btn-new">Nuevo activo</button>
                    </div>

                    <div className="filter-options">
                        <button className="filter-btn active">Todos</button>
                        <button className="filter-btn">Celular</button>
                        <button className="filter-btn">Tablet</button>
                        <button className="filter-btn">Periféricos</button>
                        <button className="filter-btn">Pantalla</button>
                    </div>

                    <div className="assets-grid">

                        <div className="create-card">
                            <h3>Crear nuevo activo</h3>
                            <p>Registra un nuevo equipo con su imagen y tipo.</p>
                            <button className="btn-create">+ Nuevo activo</button>
                        </div>

                        {activos.map(item => (
                            <div key={item.id} className="asset-card">
                                <img src={item.img} className="asset-img" />
                                <h3 className="asset-title">{item.titulo}</h3>

                                <div className="asset-meta">
                                    <span>{item.tipo}</span>
                                    <span className="estado">{item.estado}</span>
                                </div>

                                <div className="asset-links">
                                    <button className="link">Ver detalles</button>
                                    <button className="link">Mantenimiento</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pagination">
                        <button>Anterior</button>
                        <button>Siguiente</button>
                    </div>

                </div>
            </div>
     </>
    );
}
