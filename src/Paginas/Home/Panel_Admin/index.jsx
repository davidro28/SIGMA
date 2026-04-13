import React from 'react';
import SigmaHeader from '../../../Components/sigmaHeader';
import VerticalNav from '../../../Components/verticalNav';
import CuadroInformativo from '../../../Components/cuadroInformacion';
import ModalUsuario from '../../../Components/modalUsuarios';
import '../Panel_Admin/styles.css';

function Panel_Admin() {
    const [filter, setFilter] = React.useState("Todos");
    const [usuarios, setUsuarios] = React.useState([]);

    const cargarUsuarios = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/usuarios");
            const data = await response.json();
            setUsuarios(data);
        } catch (error) {
            console.error("Error al cargar usuarios:", error);
        }
    };

    React.useEffect(() => {
        cargarUsuarios();
    }, []);

    const cambiarRol = async (id, nuevoRol) => {
        try {
            await fetch(`http://localhost:8080/api/usuarios/${id}/rol`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ rol: nuevoRol })
            });
            cargarUsuarios();
        } catch (error) {
            console.error("Error al cambiar rol:", error);
        }
    };

    const menuItems = [
        { to: "/General", label: "General" },
        { to: "/Activos", label: "Activos" },
        { to: "/Tickets", label: "Tickets" },
        { to: "/Mantenimiento_Admin", label: "Mantenimiento" },
        { to: "/Panel_Admin", label: "Panel de control" }
    ];

    const usuariosFiltrados = usuarios.filter(u => {
        if (filter === "Todos") return true;
        if (filter === "Administradores") return u.roles?.includes("Admin");
        if (filter === "Responsables") return u.roles?.includes("Responsable");
        if (filter === "Gestor de Tickets") return u.roles?.includes("Gestor_Tickets");
        if (filter === "Técnicos de mantenimiento") return u.roles?.includes("Tecni_Mantenimiento");
        return true;
    });

    return (
        <div className="home-container">
            <header>
                <SigmaHeader />
            </header>
            <div className="layout">
                <VerticalNav items={menuItems} />
                <main className="content">
                    <section>
                        <p className='parrafo_principal'>Usuarios, roles y permisos</p>
                        <div className="cuadros-container">
                            <CuadroInformativo titulo="Total de Usuarios" valor={usuarios.length} estadistica="Usuarios registrados"/>
                            <CuadroInformativo titulo="Administradores" valor={usuarios.filter(u => u.roles?.includes("Admin")).length} estadistica="Control del sistema y configuraciones"/>
                            <CuadroInformativo titulo="Responsables" valor={usuarios.filter(u => u.roles?.includes("Responsable")).length} estadistica="Responsables de activos"/>
                            <CuadroInformativo titulo="Operativos" valor={usuarios.filter(u => u.roles?.includes("Gestor_Tickets") || u.roles?.includes("Tecni_Mantenimiento")).length} estadistica="Gestor de Tickets y tecnicos de mantenimiento"/>
                        </div>
                        <div className="filter-options">
                            {["Todos", "Administradores", "Responsables", "Gestor de Tickets", "Técnicos de mantenimiento"].map(tipo => (
                                <button
                                    key={tipo}
                                    className={`filter-btn ${filter === tipo ? "active" : ""}`}
                                    onClick={() => setFilter(tipo)}
                                >
                                    {tipo}
                                </button>
                            ))}
                        </div>
                        <div className="contenedor-usuarios">
                            <p className="titulo-directorio">Directorio de Usuarios</p>
                            <div className="usuarios-grid">
                                {usuariosFiltrados.map(u => (
                                    <ModalUsuario
                                        key={u.id}
                                        id={u.id}
                                        name={u.nombre}
                                        email={u.email}
                                        area={u.empresa}
                                        roles={u.roles || []}
                                        activeRole={u.roles?.[0]}
                                        onCambiarRol={cambiarRol}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default Panel_Admin;