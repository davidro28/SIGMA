import { useState } from "react";
import "../modalUsuarios/styles.css";

const ROLES_DISPONIBLES = [
    { valor: "Admin", etiqueta: "Administrador" },
    { valor: "Responsable", etiqueta: "Responsable" },
    { valor: "Gestor_Tickets", etiqueta: "Gestor de Tickets" },
    { valor: "Tecni_Mantenimiento", etiqueta: "Técnico de Mantenimiento" }
];

function ModalUsuario({
    id,
    name,
    email,
    area,
    status,
    roles = [],
    activeRole,
    onCambiarRol
}) {
    const [modalRol, setModalRol] = useState(false);
    const [rolSeleccionado, setRolSeleccionado] = useState(activeRole);

    const handleCambiarRol = async (nuevoRol) => {
        await onCambiarRol(id, nuevoRol);
        setRolSeleccionado(nuevoRol);
        setModalRol(false);
    };

    return (
        <>
            <div className="card">
                <div className="header">
                    <div className="user-info">
                        <h2>{name}</h2>
                        <p className="email">{email}</p>
                        <p className="area">{area}</p>
                    </div>
                    <span className={`status ${status?.toLowerCase()}`}>
                        {status}
                    </span>
                </div>
                <div className="section">
                    <p className="title">Rol asignado</p>
                    <div className="roles">
                        {roles.map((role, index) => (
                            <span
                                key={index}
                                className={`role ${role === rolSeleccionado ? "active" : ""}`}
                            >
                                {role}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="actions">
                    <button className="primary" onClick={() => setModalRol(true)}>
                        Cambiar rol
                    </button>
                    <button className="secondary">Ver auditoría</button>
                </div>
            </div>
            {modalRol && (
                <div className="modal-overlay" onClick={() => setModalRol(false)}>
                    <div className="modal-card" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setModalRol(false)}>✕</button>
                        <h2 className="modal-titulo">Cambiar rol</h2>
                        <p className="modal-subtitulo">Usuario: <strong>{name}</strong></p>
                        <p className="modal-responsable-actual">
                            Rol actual: <strong>{rolSeleccionado}</strong>
                        </p>
                        <div className="usuarios-lista">
                            {ROLES_DISPONIBLES.map(rol => (
                                <div
                                    key={rol.valor}
                                    className={`usuario-item ${rol.valor === rolSeleccionado ? "selected" : ""}`}
                                    onClick={() => handleCambiarRol(rol.valor)}
                                >
                                    <div className="usuario-avatar">
                                        {rol.etiqueta.charAt(0)}
                                    </div>
                                    <div className="usuario-datos">
                                        <span className="usuario-nombre">{rol.etiqueta}</span>
                                        <span className="usuario-email">{rol.valor}</span>
                                    </div>
                                    {rol.valor === rolSeleccionado && (
                                        <span className="usuario-seleccionar">✓ Actual</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ModalUsuario;