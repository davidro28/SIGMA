import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import VerticalNav from "../../../Components/verticalNav";
import SigmaHeader from "../../../Components/sigmaHeader";
import "./NuevoActivo.css";

export default function NuevoActivo() {

    const navigate = useNavigate();

    const [preview, setPreview] = useState(null);

    const [form, setForm] = useState({
        titulo: "",
        tipo: "",
        serie: "",
        estado: "",
        responsable: "",
        descripcion: "",
        img: ""
    });

    //  NUEVO: estados para usuarios
    const [usuarios, setUsuarios] = useState([]);
    const [mostrarUsuarios, setMostrarUsuarios] = useState(false);
    const [busquedaUsuario, setBusquedaUsuario] = useState("");

    const ref = useRef();

    //  traer usuarios
    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/usuarios");
                const data = await res.json();
                setUsuarios(data);
            } catch (error) {
                console.error("Error cargando usuarios");
            }
        };

        fetchUsuarios();
    }, []);

    // 🔹 cerrar dropdown al hacer click afuera
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setMostrarUsuarios(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // 🔹 filtro de usuarios
    const usuariosFiltrados = usuarios.filter(u =>
        u.nombre.toLowerCase().includes(busquedaUsuario.toLowerCase())
    );

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setPreview(url);
        setForm({ ...form, img: url });
    };

    const handleGuardar = async () => {
        if (!form.titulo || !form.tipo || !form.estado) {
            alert("Por favor, completa los campos obligatorios.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/activos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            if (response.ok) {
                navigate("/Activos");
            } else {
                alert("Error al guardar el activo.");
            }
        } catch (error) {
            alert("No se pudo conectar con el servidor.");
        }
    };

    return (
        <>
            <SigmaHeader />

            <div className="layout-container-NuevoA">
                <VerticalNav 
                    items={[
                        { to: "/Home", label: "General" },
                        { to: "/Activos", label: "Activos" },
                        { to: "/Tickets", label: "Tickets" },
                        { to: "/Mantenimiento_Admin", label: "Mantenimiento" }
                    ]} 
                />

                <div className="nuevo-activo-container">

                    <h1>Nuevo activo</h1>
                    <p className="subtitle">Registra un nuevo equipo con su información completa.</p>

                    <div className="form-card">

                        <h2 className="section-title">Información del activo</h2>

                        <div className="form-grid-2">

                            <div className="form-group">
                                <label className="form-label">Nombre del activo</label>
                                <input 
                                    type="text"
                                    className="form-input"
                                    name="titulo"
                                    onChange={handleChange}
                                    placeholder="Ej: iPhone 14 Pro Max"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Tipo</label>
                                <select className="form-select" name="tipo" onChange={handleChange}>
                                    <option value="">Seleccionar tipo</option>
                                    <option>Celular</option>
                                    <option>Tablet</option>
                                    <option>Periférico</option>
                                    <option>Pantalla</option>
                                    <option>Computadora</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Número de serie</label>
                                <input 
                                    type="text"
                                    className="form-input"
                                    name="serie"
                                    onChange={handleChange}
                                    placeholder="Ej: SN-329392"
                                />
                            </div>

                            <div className="form-group" ref={ref}>
                                <label className="form-label">Responsable asignado</label>

                                <div className="autocomplete-container">
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Buscar usuario..."
                                        value={busquedaUsuario}
                                        onChange={(e) => {
                                            setBusquedaUsuario(e.target.value);
                                            setMostrarUsuarios(true);
                                        }}
                                        onFocus={() => setMostrarUsuarios(true)}
                                    />

                                    {mostrarUsuarios && (
                                        <div className="autocomplete-list">
                                            {usuariosFiltrados.length > 0 ? (
                                                usuariosFiltrados.map((u) => (
                                                    <div
                                                        key={u.id}
                                                        className="autocomplete-item"
                                                        onClick={() => {
                                                            setForm({ ...form, responsable: u.nombre });
                                                            setBusquedaUsuario(u.nombre);
                                                            setMostrarUsuarios(false);
                                                        }}
                                                    >
                                                        {u.nombre}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="autocomplete-item">
                                                    Sin resultados
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Estado</label>
                                <select className="form-select" name="estado" onChange={handleChange}>
                                    <option value="">Seleccionar estado</option>
                                    <option>Disponible</option>
                                    <option>Asignado</option>
                                    <option>En reparación</option>
                                    <option>De baja</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Descripción</label>
                                <textarea 
                                    rows="3"
                                    name="descripcion"
                                    onChange={handleChange}
                                    placeholder="Información adicional del activo"
                                ></textarea>
                            </div>

                        </div>

                        <h2 className="section-title">Imagen del activo</h2>

                        <div className="form-grid-imagen">
                            <label className="image-upload-box">
                                <span className="upload-icon">📁</span>
                                <span>Haz clic para subir una imagen</span>
                                <input 
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    style={{ display: "none" }}
                                />
                            </label>

                            {preview ? (
                                <div className="preview-container">
                                    <p>Vista previa:</p>
                                    <img src={preview} alt="preview" />
                                </div>
                            ) : (
                                <div className="preview-placeholder">
                                    <span>La vista previa aparecerá aquí</span>
                                </div>
                            )}
                        </div>

                        <div className="actions">
                            <button 
                                className="btn-cancelar" 
                                onClick={() => navigate("/Activos")}
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
        </>
    );
}