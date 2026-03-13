import { useState } from "react";
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
    const handleGuardar = () => {

        if (!form.titulo || !form.tipo || !form.estado) {
            alert("Por favor, completa los campos obligatorios.");
            return;
        }

        const activosGuardados = JSON.parse(localStorage.getItem("activos")) || [];

        const nuevoActivo = {
            id: Date.now(),
            titulo: form.titulo,
            tipo: form.tipo,
            serie: form.serie,
            estado: form.estado,
            responsable: form.responsable,
            descripcion: form.descripcion,
            img: form.img || ""
        };

        activosGuardados.push(nuevoActivo);

        localStorage.setItem("activos", JSON.stringify(activosGuardados));

        navigate("/Activos");
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
                                <select 
                                    className="form-select"
                                    name="tipo"
                                    onChange={handleChange}
                                >
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
                            <div className="form-group">
                                <label className="form-label">Responsable asignado</label>
                                <input 
                                    type="text"
                                    className="form-input"
                                    name="responsable"
                                    onChange={handleChange}
                                    placeholder="Ej: Juan Pérez"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Estado</label>
                                <select 
                                    className="form-select"
                                    name="estado"
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccionar estado</option>
                                    <option>Disponible</option>
                                    <option>Asignado</option>
                                    <option>En reparación</option>
                                    <option>De baja</option>
                                </select>
                            </div>

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
                        <h2 className="section-title">Imagen del activo</h2>

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

                        {preview && (
                            <div className="preview-container">
                                <p>Vista previa:</p>
                                <img src={preview} alt="preview" />
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
        </>
    );
}
