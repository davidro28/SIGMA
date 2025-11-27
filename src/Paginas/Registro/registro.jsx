import { useState } from "react";
import { Link } from "react-router-dom";
import "./registro.css";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  return (
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

        <form onSubmit={(e) => e.preventDefault()}>

          <label>Nombre completo</label>
          <div className="input-group">
            <i className="fa-solid fa-user"></i>
            <input type="text" placeholder="Ingresa tu nombre completo" required />
          </div>

          <label>Correo electrónico corporativo</label>
          <div className="input-group">
            <i className="fa-solid fa-envelope"></i>
            <input type="email" placeholder="nombre.apellido@empresa.com" required />
          </div>

          <label>Número de teléfono</label>
          <div className="input-group">
            <i className="fa-solid fa-phone"></i>
            <input type="tel" placeholder="Ingresa tu número de contacto" required />
          </div>

          <label>Empresa</label>
          <div className="input-group">
            <i className="fa-solid fa-building"></i>
            <input type="text" placeholder="Ej: SIGMA" required />
          </div>

          <label>Contraseña</label>
          <div className="input-group">
            <i className="fa-solid fa-lock"></i>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Ingresa una contraseña segura"
              required
            />
            <button
              type="button"
              className="icon-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
            </button>
          </div>

          <label>Confirmar contraseña</label>
          <div className="input-group">
            <i className="fa-solid fa-lock"></i>
            <input
              type={showPassword2 ? "text" : "password"}
              placeholder="Repite tu contraseña"
              required
            />
            <button
              type="button"
              className="icon-btn"
              onClick={() => setShowPassword2(!showPassword2)}
            >
              <i className={`fa-solid ${showPassword2 ? "fa-eye-slash" : "fa-eye"}`}></i>
            </button>
          </div>

          <div className="options">
            <label><input type="checkbox" /> Acepto términos y condiciones</label>
          </div>

          <button className="btn-primary">Crear cuenta</button>

          <p className="register-text">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>

        </form>
      </div>
    </div>
  );
}
