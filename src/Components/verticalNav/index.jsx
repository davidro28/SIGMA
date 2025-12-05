import { Link } from "react-router-dom";
import "./styles.css";

function VerticalNav({ items = [] }) {   // ← Aquí le doy un valor por defecto
    return (
        <nav className="vertical-nav">

            {/* Lista de items */}
            <ul>
                {items.length === 0 ? (
                    <li className="empty-nav">No hay elementos</li>
                ) : (
                    items.map((item, index) => (
                        <li key={index}>
                            <Link to={item.to}>{item.label}</Link>
                        </li>
                    ))
                )}
            </ul>

            {/* Información del usuario */}
            <div className="user-info">
                <img src="https://via.placeholder.com/40" alt="user" />

                <div>
                    <p className="user-name">David</p>
                    <p className="user-role">Admin</p>
                    <button className="logout-button">Logout</button>
                </div>
            </div>
        </nav>
    );
}

export default VerticalNav;
