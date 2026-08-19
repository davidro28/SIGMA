import React from "react";

import SigmaHeader from "../../../Components/sigmaHeader";
import VerticalNav from "../../../Components/verticalNav";
import CuadroInformativo from "../../../Components/cuadroInformacion";
import ModalUsuario from "../../../Components/modalUsuarios";

import { apiFetch } from "../../../API/RegistroAPI";

import "../Panel_Admin/styles.css";


function Panel_Admin() {

    const [filter, setFilter] = React.useState("Todos");
    const [usuarios, setUsuarios] = React.useState([]);


    /*
    =========================================================
    CARGAR USUARIOS
    =========================================================
    */

    const cargarUsuarios = async () => {

        try {

            const data = await apiFetch("/api/usuarios");

            setUsuarios(data);

        } catch (error) {

            console.error(
                "Error al cargar usuarios:",
                error
            );

        }

    };


    React.useEffect(() => {

        cargarUsuarios();

    }, []);


    /*
    =========================================================
    CAMBIAR ROL
    =========================================================
    */

    const cambiarRol = async (id, nuevoRol) => {

        try {

            await apiFetch(
                `/api/usuarios/${id}/rol`,
                {
                    method: "PUT",

                    body: {
                        rol: nuevoRol
                    }
                }
            );

            await cargarUsuarios();

        } catch (error) {

            console.error(
                "Error al cambiar rol:",
                error
            );

        }

    };


    /*
    =========================================================
    MENÚ
    =========================================================
    */

    const menuItems = [

        {
            to: "/General",
            label: "General"
        },

        {
            to: "/Activos",
            label: "Activos"
        },

        {
            to: "/Tickets",
            label: "Tickets"
        },

        {
            to: "/Mantenimiento_Admin",
            label: "Mantenimiento"
        },

        {
            to: "/Panel_Admin",
            label: "Panel de control"
        }

    ];


    /*
    =========================================================
    FILTRAR USUARIOS
    =========================================================
    */

    const usuariosFiltrados = usuarios.filter((u) => {

        if (filter === "Todos") {

            return true;

        }

        if (filter === "Administradores") {

            return u.roles?.includes("Admin");

        }

        if (filter === "Responsables") {

            return u.roles?.includes("Responsable");

        }

        if (filter === "Gestor de Tickets") {

            return u.roles?.includes("Gestor_Tickets");

        }

        if (filter === "Técnicos de mantenimiento") {

            return u.roles?.includes(
                "Tecni_Mantenimiento"
            );

        }

        return true;

    });


    /*
    =========================================================
    RENDER
    =========================================================
    */

    return (

        <div className="home-container">

            <header>

                <SigmaHeader />

            </header>


            <div className="layout">

                <VerticalNav
                    items={menuItems}
                />


                <main className="content">

                    <section>

                        <p className="parrafo_principal">
                            Usuarios, roles y permisos
                        </p>


                        {/* =================================================
                            CUADROS INFORMATIVOS
                        ================================================= */}

                        <div className="cuadros-container">

                            <CuadroInformativo
                                titulo="Total de Usuarios"
                                valor={usuarios.length}
                                estadistica="Usuarios registrados"
                            />


                            <CuadroInformativo
                                titulo="Administradores"
                                valor={
                                    usuarios.filter(
                                        (u) =>
                                            u.roles?.includes(
                                                "Admin"
                                            )
                                    ).length
                                }
                                estadistica="Control del sistema y configuraciones"
                            />


                            <CuadroInformativo
                                titulo="Responsables"
                                valor={
                                    usuarios.filter(
                                        (u) =>
                                            u.roles?.includes(
                                                "Responsable"
                                            )
                                    ).length
                                }
                                estadistica="Responsables de activos"
                            />


                            <CuadroInformativo
                                titulo="Operativos"
                                valor={
                                    usuarios.filter(
                                        (u) =>
                                            u.roles?.includes(
                                                "Gestor_Tickets"
                                            ) ||
                                            u.roles?.includes(
                                                "Tecni_Mantenimiento"
                                            )
                                    ).length
                                }
                                estadistica="Gestor de Tickets y técnicos de mantenimiento"
                            />

                        </div>


                        {/* =================================================
                            FILTROS
                        ================================================= */}

                        <div className="filter-options">

                            {[
                                "Todos",
                                "Administradores",
                                "Responsables",
                                "Gestor de Tickets",
                                "Técnicos de mantenimiento"
                            ].map((tipo) => (

                                <button
                                    key={tipo}
                                    className={`filter-btn ${
                                        filter === tipo
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setFilter(tipo)
                                    }
                                >
                                    {tipo}
                                </button>

                            ))}

                        </div>


                        {/* =================================================
                            DIRECTORIO
                        ================================================= */}

                        <div className="contenedor-usuarios">

                            <p className="titulo-directorio">
                                Directorio de Usuarios
                            </p>


                            <div className="usuarios-grid">

                                {usuariosFiltrados.map(
                                    (u) => (

                                        <ModalUsuario

                                            key={u.id}

                                            id={u.id}

                                            name={
                                                u.nombre ||
                                                u.nom ||
                                                "Sin nombre"
                                            }

                                            email={
                                                u.email ||
                                                "Sin correo"
                                            }

                                            area={
                                                u.empresa ||
                                                "Sin empresa"
                                            }

                                            roles={
                                                u.roles || []
                                            }

                                            activeRole={
                                                u.roles?.[0]
                                            }

                                            onCambiarRol={
                                                cambiarRol
                                            }

                                        />

                                    )
                                )}


                                {usuariosFiltrados.length === 0 && (

                                    <p>
                                        No hay usuarios para
                                        este filtro.
                                    </p>

                                )}

                            </div>

                        </div>

                    </section>

                </main>

            </div>

        </div>

    );

}


export default Panel_Admin;