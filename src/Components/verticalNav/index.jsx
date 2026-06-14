import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./styles.css";

function VerticalNav({ items = [] }) {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState({ nombre: "", rol: "" });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        fetch("http://localhost:8080/api/usuarios/ActRes", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(r => r.json())
            .then(data => {
                setUsuario({
                    nombre: data.nom || data.nombre || data.email || "Usuario",
                    rol: data.rol || ""
                });
            })
            .catch(err => console.error("Error cargando usuario:", err));
    }, []);

    const formatRol = (rol) => {
        const roles = JSON.parse(localStorage.getItem("roles") || "[]");
        const rolActual = rol || roles[0] || "";
        const map = {
            Admin: "Administrador",
            Responsable: "Responsable",
            Gestor_Tickets: "Gestor de Tickets",
            Tecni_Mantenimiento: "Técnico de Mantenimiento"
        };
        return map[rolActual] || rolActual;
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <nav className="vertical-nav">
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

            <div className="user-info">
                <img src="https://via.placeholder.com/40" alt="user" />
                <div>
                    <p className="user-name">{usuario.nombre || "Cargando..."}</p>
                    <p className="user-role">{formatRol(usuario.rol)}</p>
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default VerticalNav;