import { useState } from "react";
import { Link } from "react-router-dom";
import "./registro.css";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    tipoDocumento: "",
    numeroDocumento: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const acceptTerms = () => {
    setTermsChecked(true);
    setShowTermsModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!termsChecked) {
      alert("Debes aceptar los términos y condiciones.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    console.log("Enviando datos:", form);
    alert("Cuenta creada (mock).");
  };

  return (
    <>
      <div className="auth-container">
        <div className="auth-box">

          <div className="logo">
            <div className="logo-icon">Σ</div>
            <span className="logo-text">Sigma</span>
          </div>

          <h2>Registro de usuario</h2>
          <p className="subtitle">
            Crea tu cuenta para acceder a los servicios de Sigma.
          </p>

          <form onSubmit={handleSubmit}>

            <label>Nombre completo</label>
            <div className="input-group">
              <i className="fa-solid fa-user"></i>
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                type="text"
                placeholder="Ingresa tu nombre completo"
                required
              />
            </div>

            <label>Correo electrónico corporativo</label>
            <div className="input-group">
              <i className="fa-solid fa-envelope"></i>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="nombre.apellido@empresa.com"
                required
              />
            </div>

            <label>Número de teléfono</label>
            <div className="input-group">
              <i className="fa-solid fa-phone"></i>
              <input
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                type="tel"
                placeholder="Ingresa tu número de contacto"
                required
              />
            </div>

            <label>Empresa</label>
            <div className="input-group">
              <i className="fa-solid fa-building"></i>
              <input
                name="empresa"
                value={form.empresa}
                onChange={handleChange}
                type="text"
                placeholder="Ej: SIGMA"
                required
              />
            </div>


            <label>Tipo de documento</label>
            <div className="input-group">
              <i className="fa-solid fa-id-card"></i>
              <select
                name="tipoDocumento"
                value={form.tipoDocumento}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona tipo</option>
                <option value="CC">Cédula de ciudadanía</option>
                <option value="CE">Cédula de extranjería</option>
                <option value="TI">Tarjeta de identidad</option>
                <option value="PAS">Pasaporte</option>
              </select>
            </div>

            <label>Número de documento</label>
            <div className="input-group">
              <i className="fa-solid fa-address-card"></i>
              <input
                name="numeroDocumento"
                value={form.numeroDocumento}
                onChange={handleChange}
                type="text"
                placeholder="Ingresa tu número de documento"
                required
              />
            </div>

            <label>Contraseña</label>
            <div className="input-group password-group">
              <i className="fa-solid fa-lock"></i>
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                placeholder="Ingresa una contraseña segura"
                required
                aria-label="Contraseña"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>

            <label>Confirmar contraseña</label>
            <div className="input-group password-group">
              <i className="fa-solid fa-lock"></i>
              <input
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                type={showPassword2 ? "text" : "password"}
                placeholder="Repite tu contraseña"
                required
                aria-label="Confirmar contraseña"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword2(!showPassword2)}
                aria-label={showPassword2 ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                <i className={`fa-solid ${showPassword2 ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>

            <div className="options terms">
              <label>
                <input
                  type="checkbox"
                  checked={termsChecked}
                  onChange={(e) => setTermsChecked(e.target.checked)}
                />
                Acepto{" "}
                <span
                  className="terms-link"
                  onClick={() => setShowTermsModal(true)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter") setShowTermsModal(true); }}
                >
                  términos y condiciones
                </span>
              </label>
            </div>

            <button className="btn-primary" disabled={!termsChecked}>
              Crear cuenta
            </button>

            <p className="register-text">
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
          </form>
        </div>
      </div>

      {showTermsModal && (
        <div className="modal-overlay" onClick={() => setShowTermsModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Términos y condiciones de SIGMA</h3>
            <p className="modal-subtitle">
              Lee cuidadosamente estos términos antes de crear tu cuenta.
            </p>

            <div className="modal-text">
              <strong>1. Objeto del servicio</strong>
              <p>SIGMA proporciona una plataforma digital corporativa para gestión y consulta de servicios.</p>

              <strong>2. Cuenta y seguridad</strong>
              <p>Eres responsable por el uso de tu cuenta y la confidencialidad de la contraseña.</p>

              <ul>
                <li>No compartas tu contraseña.</li>
                <li>Notifica accesos no autorizados.</li>
                <li>Información veraz y actualizada.</li>
              </ul>

              <strong>3. Uso aceptable</strong>
              <p>No se permite uso ilícito, extracción de datos o vulnerar seguridad del sistema.</p>

              <strong>4. Datos personales</strong>
              <p>Se tratarán conforme a la política de privacidad para prestar el servicio.</p>

              <strong>5. Limitaciones</strong>
              <p>La plataforma se entrega "tal cual", con posibles mantenimientos programados.</p>

              <strong>6. Aceptación</strong>
              <p>Al aceptar, confirmas que leíste y comprendes todas las políticas.</p>
            </div>

            <div className="modal-buttons">
              <button
                onClick={() => setShowTermsModal(false)}
                className="modal-btn cancel-btn"
              >
                Cancelar
              </button>

              <button onClick={acceptTerms} className="modal-btn accept-btn">
                Acepto términos y condiciones
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}