import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import "./styles.css";

import { usuarioService } from "../../API/RegistroAPI";
import { useAuth } from "../../Hooks/AuthContext";

function VerticalNav({ items = [] }) {

    const navigate = useNavigate();

    // =========================================================
    // AUTENTICACIÓN
    // =========================================================

    const { token } = useAuth();


    // =========================================================
    // USUARIO
    // =========================================================

    const [usuario, setUsuario] = useState({
        nombre: "",
        rol: ""
    });

    const [cargandoUsuario, setCargandoUsuario] = useState(true);


    // =========================================================
    // CARGAR USUARIO ACTUAL
    // =========================================================

    useEffect(() => {

        if (!token) {
            setCargandoUsuario(false);
            return;
        }

        const cargarUsuario = async () => {

            try {

                const data =
                    await usuarioService.actual(token);

                console.log(
                    "USUARIO EN VERTICAL NAV:",
                    data
                );

                setUsuario({

                    nombre:
                        data?.nom ||
                        data?.nombre ||
                        data?.email ||
                        "Usuario",

                    rol:
                        data?.rol ||
                        data?.roles?.[0] ||
                        ""

                });

            } catch (error) {

                console.error(
                    "Error cargando usuario del menú:",
                    error
                );

            } finally {

                setCargandoUsuario(false);

            }

        };


        cargarUsuario();

    }, [token]);


    // =========================================================
    // FORMATEAR ROL
    // =========================================================

    const formatRol = (rol) => {

        const map = {

            Admin:
                "Administrador",

            Responsable:
                "Responsable",

            Gestor_Tickets:
                "Gestor de Tickets",

            Tecni_Mantenimiento:
                "Técnico de Mantenimiento"

        };

        return map[rol] || rol || "Usuario";
    };


    // =========================================================
    // CERRAR SESIÓN
    // =========================================================

    const handleLogout = () => {

        /*
         * IMPORTANTE:
         *
         * Aquí NO usamos localStorage.
         *
         * El cierre de sesión debe manejarlo
         * el contexto useAuth.
         */

        navigate("/login");

    };


    // =========================================================
    // VISTA
    // =========================================================

    return (

        <nav className="vertical-nav">

            <ul>

                {items.length === 0 ? (

                    <li className="empty-nav">
                        No hay elementos
                    </li>

                ) : (

                    items.map((item, index) => (

                        <li key={index}>

                            <Link to={item.to}>
                                {item.label}
                            </Link>

                        </li>

                    ))

                )}

            </ul>


            {/* =================================================
                INFORMACIÓN DEL USUARIO
               ================================================= */}

            <div className="user-info">
    <img
        src="https://via.placeholder.com/40"
        alt="user"
    />

    <div>
        <p className="user-name">
            {usuario.nombre || "Cargando..."}
        </p>

        <p className="user-role">
            {formatRol(usuario.rol)}
        </p>

        <button
            className="logout-button"
            onClick={handleLogout}
        >
            Logout
        </button>
    </div>
</div>

        </nav>

    );
}

export default VerticalNav;