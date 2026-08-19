import React, { useState, useEffect } from "react";
import "./styles.css";
import { ordenService, apiFetch } from "../../API/RegistroAPI";
import Modal from "../modalAlerta";
import { useModal } from "../../Hooks/useModalAlert";

function NuevaOrden({ onOrdenCreada }) {
    const [open, setOpen] = useState(false);
    const [activos, setActivos] = useState([]);
    const [tecnicos, setTecnicos] = useState([]);
    const [guardando, setGuardando] = useState(false);
    const { modal, showModal, closeModal } = useModal();

    const [form, setForm] = useState({
        activoId: "",
        activoNombre: "",
        activoInfo: "",
        tecnicoId: "",
        tecnicoNombre: "",
        tipo: "",
        estado: "",
        prioridad: "",
        ventana: "",
        ventanaSub: "",
        origen: "",
        origenId: "",
        descripcion: ""
    });

    useEffect(() => {
        if (!open) return;

        const cargarDatos = async () => {
            const token = localStorage.getItem("token");

            try {
                // Cargar activos
                const activosData = await apiFetch("/api/activos", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setActivos(activosData);

                // Cargar técnicos por rol
                const tecnicosData = await apiFetch(
                    "/api/usuarios/por-rol?rol=Tecni_Mantenimiento",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setTecnicos(tecnicosData);

            } catch (err) {
                console.error("Error cargando datos:", err);

                showModal(
                    "error",
                    "Error al cargar información",
                    err.message || "No se pudieron cargar los activos o técnicos.",
                    "Cerrar"
                );
            }
        };

        cargarDatos();

    }, [open]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Si cambia el activo
        if (name === "activoId") {
            const activo = activos.find(
                (a) => a.id === value
            );

            setForm({
                ...form,
                activoId: value,
                activoNombre: activo?.titulo || "",
                activoInfo: activo?.serie
                    ? `${activo.serie} · ${activo.estado}`
                    : ""
            });

            return;
        }

        // Si cambia el técnico
        if (name === "tecnicoId") {
            const tecnico = tecnicos.find(
                (t) => t.id === value
            );

            setForm({
                ...form,
                tecnicoId: value,
                tecnicoNombre:
                    tecnico?.nombre ||
                    tecnico?.user ||
                    ""
            });

            return;
        }

        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setGuardando(true);

        try {
            const nueva = await ordenService.crear(form);

            onOrdenCreada?.(nueva);

            setOpen(false);

            setForm({
                activoId: "",
                activoNombre: "",
                activoInfo: "",
                tecnicoId: "",
                tecnicoNombre: "",
                tipo: "",
                estado: "PENDIENTE",
                prioridad: "MEDIA",
                ventana: "",
                ventanaSub: "",
                origen: "",
                origenId: "",
                descripcion: ""
            });

        } catch (err) {
            console.error("Error creando orden:", err);

            showModal(
                "error",
                "Error al crear la orden",
                err.message || "No se pudo conectar con el servidor.",
                "Cerrar"
            );

        } finally {
            setGuardando(false);
        }
    };

    return (
        <>
            <button
                className="btn-nueva-orden"
                onClick={() => setOpen(true)}
            >
                + Nueva Orden
            </button>

            {open && (
                <div className="modal-overlay">
                    <div className="modal">

                        <h2>Crear Nueva Orden</h2>

                        <form
                            className="form-orden"
                            onSubmit={handleSubmit}
                        >

                            {/* INFORMACIÓN GENERAL */}

                            <div className="form-section">

                                <h3>
                                    Información General
                                </h3>

                                <div className="form-grid">

                                    {/* ACTIVO */}

                                    <div className="form-group">

                                        <label>
                                            Activo
                                        </label>

                                        <select
                                            name="activoId"
                                            value={form.activoId}
                                            onChange={handleChange}
                                            required
                                        >

                                            <option value="">
                                                Selecciona un activo
                                            </option>

                                            {activos.map((a) => (
                                                <option
                                                    key={a.id}
                                                    value={a.id}
                                                >
                                                    {a.titulo} ·{" "}
                                                    {a.serie || "Sin serie"}
                                                </option>
                                            ))}

                                        </select>

                                    </div>


                                    {/* TÉCNICO */}

                                    <div className="form-group">

                                        <label>
                                            Técnico Asignado
                                        </label>

                                        <select
                                            name="tecnicoId"
                                            value={form.tecnicoId}
                                            onChange={handleChange}
                                            required
                                        >

                                            <option value="">
                                                Selecciona un técnico
                                            </option>

                                            {tecnicos.map((t) => (
                                                <option
                                                    key={t.id}
                                                    value={t.id}
                                                >
                                                    {t.nombre || t.user}
                                                </option>
                                            ))}

                                        </select>

                                    </div>


                                    {/* TIPO */}

                                    <div className="form-group">

                                        <label>
                                            Tipo
                                        </label>

                                        <select
                                            name="tipo"
                                            value={form.tipo}
                                            onChange={handleChange}
                                            required
                                        >

                                            <option value="">
                                                Selecciona tipo
                                            </option>

                                            <option value="CORRECTIVO">
                                                Correctivo
                                            </option>

                                            <option value="PREVENTIVO">
                                                Preventivo
                                            </option>

                                            <option value="INSPECCION">
                                                Inspección
                                            </option>

                                        </select>

                                    </div>


                                    {/* PRIORIDAD */}

                                    <div className="form-group">

                                        <label>
                                            Prioridad
                                        </label>

                                        <select
                                            name="prioridad"
                                            value={form.prioridad}
                                            onChange={handleChange}
                                        >

                                            <option value="ALTA">
                                                Alta
                                            </option>

                                            <option value="MEDIA">
                                                Media
                                            </option>

                                            <option value="BAJA">
                                                Baja
                                            </option>

                                            <option value="CRITICA">
                                                Crítica
                                            </option>

                                        </select>

                                    </div>

                                </div>
                            </div>


                            {/* ESTADO Y PROGRAMACIÓN */}

                            <div className="form-section">

                                <h3>
                                    Estado y Programación
                                </h3>

                                <div className="form-grid">

                                    <div className="form-group">

                                        <label>
                                            Estado
                                        </label>

                                        <select
                                            name="estado"
                                            value={form.estado}
                                            onChange={handleChange}
                                        >

                                            <option value="EN_CURSO">
                                                En curso
                                            </option>

                                            <option value="PENDIENTE">
                                                Pendiente
                                            </option>

                                            <option value="CERRADA">
                                                Cerrada
                                            </option>

                                        </select>

                                    </div>


                                    <div className="form-group">

                                        <label>
                                            Ventana planificada
                                        </label>

                                        <input
                                            type="text"
                                            name="ventana"
                                            placeholder="Ej: Hoy 10:00 - 14:00"
                                            value={form.ventana}
                                            onChange={handleChange}
                                        />

                                    </div>


                                    <div className="form-group full">

                                        <label>
                                            Subventana / retraso
                                        </label>

                                        <input
                                            type="text"
                                            name="ventanaSub"
                                            placeholder="Ej: 2h retraso estimado"
                                            value={form.ventanaSub}
                                            onChange={handleChange}
                                        />

                                    </div>

                                </div>
                            </div>


                            {/* ORIGEN */}

                            <div className="form-section">

                                <h3>
                                    Origen
                                </h3>

                                <div className="form-grid">

                                    <div className="form-group">

                                        <label>
                                            Origen
                                        </label>

                                        <select
                                            name="origen"
                                            value={form.origen}
                                            onChange={handleChange}
                                        >

                                            <option value="">
                                                Sin origen
                                            </option>

                                            <option value="Incidencia">
                                                Incidencia
                                            </option>

                                            <option value="Solicitud">
                                                Solicitud
                                            </option>

                                            <option value="Preventivo">
                                                Preventivo programado
                                            </option>

                                        </select>

                                    </div>


                                    <div className="form-group">

                                        <label>
                                            ID de Origen
                                        </label>

                                        <input
                                            type="text"
                                            name="origenId"
                                            placeholder="Ej: #129"
                                            value={form.origenId}
                                            onChange={handleChange}
                                        />

                                    </div>

                                </div>
                            </div>


                            {/* DESCRIPCIÓN */}

                            <div className="form-section">

                                <h3>
                                    Descripción
                                </h3>

                                <div className="form-group">

                                    <label>
                                        Descripción del trabajo
                                    </label>

                                    <textarea
                                        name="descripcion"
                                        rows="4"
                                        placeholder="Descripción del trabajo a realizar"
                                        value={form.descripcion}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>


                            {/* BOTONES */}

                            <div className="modal-buttons">

                                <button
                                    type="submit"
                                    className="btn-guardar"
                                    disabled={guardando}
                                >
                                    {guardando
                                        ? "Guardando..."
                                        : "Guardar"}
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

            {modal && (
                <Modal
                    {...modal}
                    onClose={closeModal}
                />
            )}
        </>
    );
}

export default NuevaOrden;