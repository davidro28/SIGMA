import React, { useState } from "react";
import "./styles.css";

function NuevaOrden({ agregarOrden }) {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        id: "",
        fecha: new Date().toLocaleString(),
        tipo: "",
        activo: "",
        activoInfo: "",
        tecnico: "",
        estado: "En curso",
        prioridad: "Media",
        ventana: "",
        ventanaSub: "",
        origen: "",
        origenId: ""
    });

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Guardar nueva orden
    const handleSubmit = (e) => {
        e.preventDefault();
        agregarOrden(form);
        setOpen(false);

        // Reiniciar formulario
        setForm({
            id: "",
            fecha: new Date().toLocaleString(),
            tipo: "",
            activo: "",
            activoInfo: "",
            tecnico: "",
            estado: "En curso",
            prioridad: "Media",
            ventana: "",
            ventanaSub: "",
            origen: "",
            origenId: ""
        });
    };

    return (
        <>
            <button className="btn-nueva-orden" onClick={() => setOpen(true)}>
                + Nueva Orden
            </button>

            {open && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Crear Nueva Orden</h2>
                        <form className="form-orden" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="id"
                                placeholder="ID de la Orden"
                                value={form.id}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="activo"
                                placeholder="Activo"
                                value={form.activo}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="activoInfo"
                                placeholder="Información del Activo"
                                value={form.activoInfo}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="tecnico"
                                placeholder="Técnico Asignado"
                                value={form.tecnico}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="tipo"
                                placeholder="Tipo (Correctivo / Preventivo)"
                                value={form.tipo}
                                onChange={handleChange}
                                required
                            />
                            <select
                                name="estado"
                                value={form.estado}
                                onChange={handleChange}
                            >
                                <option>En curso</option>
                                <option>Finalizado</option>
                                <option>Pendiente</option>
                            </select>
                            <select
                                name="prioridad"
                                value={form.prioridad}
                                onChange={handleChange}
                            >
                                <option>Alta</option>
                                <option>Media</option>
                                <option>Baja</option>
                            </select>
                            <input
                                type="text"
                                name="ventana"
                                placeholder="Ventana planificada"
                                value={form.ventana}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="ventanaSub"
                                placeholder="Subventana / retraso"
                                value={form.ventanaSub}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="origen"
                                placeholder="Origen"
                                value={form.origen}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="origenId"
                                placeholder="ID de Origen"
                                value={form.origenId}
                                onChange={handleChange}
                            />

                            <div className="modal-buttons">
                                <button type="submit" className="btn-guardar">
                                    Guardar
                                </button>
                                <button
                                    type="button"
                                    className="btn-cerrar"
                                    onClick={() => setOpen(false)}
                                >
                                    Cerrar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default NuevaOrden;
