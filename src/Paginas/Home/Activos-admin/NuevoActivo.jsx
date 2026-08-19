import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "../../../Components/modalAlerta";
import { useModal } from "../../../Hooks/useModalAlert";
import VerticalNav from "../../../Components/verticalNav";
import SigmaHeader from "../../../Components/sigmaHeader";

import { apiFetch } from "../../../API/RegistroAPI";

import "./NuevoActivo.css";

export default function NuevoActivo() {
    const navigate = useNavigate();

    const [preview, setPreview] = useState(null);
    const { modal, showModal, closeModal } = useModal();

    const [usuarios, setUsuarios] = useState([]);

    const [form, setForm] = useState({
        titulo: "",
        tipo: "",
        serie: "",
        estado: "",
        responsable: "",
        descripcion: "",
        img: ""
    });

    /*
    =========================================================
    CARGAR USUARIOS
    =========================================================
    */

    useEffect(() => {
        const cargarUsuarios = async () => {
            try {
                const data = await apiFetch("/api/usuarios");

                setUsuarios(data);
            } catch (error) {
                console.error(
                    "Error cargando usuarios:",
                    error
                );

                setUsuarios([]);
            }
        };

        cargarUsuarios();
    }, []);

    /*
    =========================================================
    CAMBIAR CAMPOS
    =========================================================
    */

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    /*
    =========================================================
    SUBIR IMAGEN
    =========================================================
    */

    const handleImageUpload = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const url = URL.createObjectURL(file);

        setPreview(url);

        /*
         * IMPORTANTE:
         *
         * Esta URL solamente sirve para mostrar
         * la vista previa en el navegador.
         *
         * No se guarda como una URL permanente
         * en MongoDB.
         */
        setForm((prev) => ({
            ...prev,
            img: ""
        }));
    };

    /*
    =========================================================
    GUARDAR ACTIVO
    =========================================================
    */

    const handleGuardar = async () => {
        if (
            !form.titulo ||
            !form.tipo ||
            !form.estado
        ) {
            showModal(
                "warning",
                "Campos incompletos",
                "Por favor completa el nombre, tipo y estado del activo antes de continuar.",
                "Entendido"
            );

            return;
        }

        try {
            const data = await apiFetch(
                "/api/activos",
                {
                    method: "POST",
                    body: form
                }
            );

            console.log(
                "Activo creado correctamente:",
                data
            );

            navigate("/Activos");

        } catch (error) {
            console.error(
                "Error creando activo:",
                error
            );

            showModal(
                "error",
                "Error al guardar",
                error.message ||
                    "No pudimos registrar el activo. Intenta de nuevo.",
                "Cerrar"
            );
        }
    };

    /*
    =========================================================
    RENDER
    =========================================================
    */

    return (
        <>
            <SigmaHeader />

            <div className="layout-container-NuevoA">

                <VerticalNav
                    items={[
                        {
                            to: "/Home",
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
                    ]}
                />

                <div className="nuevo-activo-container">

                    <h1>Nuevo activo</h1>

                    <p className="subtitle">
                        Registra un nuevo equipo con su
                        información completa.
                    </p>

                    <div className="form-card">

                        <h2 className="section-title">
                            Información del activo
                        </h2>

                        <div className="form-grid-2">

                            {/* NOMBRE */}

                            <div className="form-group">

                                <label className="form-label">
                                    Nombre del activo
                                </label>

                                <input
                                    type="text"
                                    className="form-input"
                                    name="titulo"
                                    value={form.titulo}
                                    onChange={handleChange}
                                    placeholder="Ej: iPhone 14 Pro Max"
                                />

                            </div>

                            {/* TIPO */}

                            <div className="form-group">

                                <label className="form-label">
                                    Tipo
                                </label>

                                <select
                                    className="form-select"
                                    name="tipo"
                                    value={form.tipo}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Seleccionar tipo
                                    </option>

                                    <option value="Celular">
                                        Celular
                                    </option>

                                    <option value="Tablet">
                                        Tablet
                                    </option>

                                    <option value="Periférico">
                                        Periférico
                                    </option>

                                    <option value="Pantalla">
                                        Pantalla
                                    </option>

                                    <option value="Computadora">
                                        Computadora
                                    </option>

                                </select>

                            </div>

                            {/* SERIE */}

                            <div className="form-group">

                                <label className="form-label">
                                    Número de serie
                                </label>

                                <input
                                    type="text"
                                    className="form-input"
                                    name="serie"
                                    value={form.serie}
                                    onChange={handleChange}
                                    placeholder="Ej: SN-329392"
                                />

                            </div>

                            {/* RESPONSABLE */}

                            <div className="form-group">

                                <label className="form-label">
                                    Responsable asignado
                                </label>

                                <select
                                    className="form-select"
                                    name="responsable"
                                    value={form.responsable}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Seleccionar responsable
                                    </option>

                                    {usuarios.map((u) => (

                                        <option
                                            key={u.id}
                                            value={
                                                u.nombre ||
                                                u.email ||
                                                u.id
                                            }
                                        >
                                            {u.nombre ||
                                                u.email ||
                                                "Sin nombre"}
                                        </option>

                                    ))}

                                </select>

                            </div>

                            {/* ESTADO */}

                            <div className="form-group">

                                <label className="form-label">
                                    Estado
                                </label>

                                <select
                                    className="form-select"
                                    name="estado"
                                    value={form.estado}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Seleccionar estado
                                    </option>

                                    <option value="Disponible">
                                        Disponible
                                    </option>

                                    <option value="Asignado">
                                        Asignado
                                    </option>

                                    <option value="En reparación">
                                        En reparación
                                    </option>

                                    <option value="De baja">
                                        De baja
                                    </option>

                                </select>

                            </div>

                            {/* DESCRIPCIÓN */}

                            <div className="form-group">

                                <label className="form-label">
                                    Descripción
                                </label>

                                <textarea
                                    rows="3"
                                    name="descripcion"
                                    value={form.descripcion}
                                    onChange={handleChange}
                                    placeholder="Información adicional del activo"
                                    style={{
                                        resize: "none",
                                        overflowY: "auto",
                                        height: "80px"
                                    }}
                                />

                            </div>

                        </div>

                        {/* =================================================
                            IMAGEN
                        ================================================== */}

                        <h2 className="section-title">
                            Imagen del activo
                        </h2>

                        <div className="form-grid-imagen">

                            <label className="image-upload-box">

                                <span className="upload-icon">
                                    📁
                                </span>

                                <span>
                                    Haz clic para subir una imagen
                                </span>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={
                                        handleImageUpload
                                    }
                                    style={{
                                        display: "none"
                                    }}
                                />

                            </label>

                            {preview ? (

                                <div className="preview-container">

                                    <p>
                                        Vista previa:
                                    </p>

                                    <img
                                        src={preview}
                                        alt="preview"
                                    />

                                </div>

                            ) : (

                                <div className="preview-placeholder">

                                    <span>
                                        La vista previa aparecerá aquí
                                    </span>

                                </div>

                            )}

                        </div>

                        {/* =================================================
                            BOTONES
                        ================================================== */}

                        <div className="actions">

                            <button
                                className="btn-cancelar"
                                onClick={() =>
                                    navigate("/Activos")
                                }
                            >
                                Salir sin guardar
                            </button>

                            <button
                                className="btn-guardar"
                                onClick={handleGuardar}
                            >
                                Guardar activo
                            </button>

                        </div>

                    </div>

                </div>

            </div>

            {modal && (
                <Modal
                    {...modal}
                    onClose={closeModal}
                />
            )}
        </>
    );
}