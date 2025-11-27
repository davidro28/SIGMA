import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-container">
      <div className="auth-box">

        <div className="logo">
          <div className="logo-icon">Σ</div>
          <span className="logo-text">Sigma</span>
        </div>

        <h2>Inicia sesión</h2>
        <p className="subtitle">
          Accede a tu panel de control para gestionar tus activos.
        </p>

        <form onSubmit={(e) => e.preventDefault()}>

          {/* Email */}
          <div className="input-group">
            <i className="fa-solid fa-envelope"></i>
            <input type="email" placeholder="Correo electrónico" required />
          </div>

          {/* Password */}
          <div className="input-group">
            <i className="fa-solid fa-lock"></i>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
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

          <div className="options">
            <label><input type="checkbox" /> Recordarme</label>
            <a href="./recuperar_contraseña.jsx">¿Olvidaste tu contraseña?</a>
          </div>

          <button className="btn-primary">Entrar en Sigma</button>

          <div className="divider">o continuar con</div>

          <button type="button" className="btn-google">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" />
            Google
          </button>

          <p className="register-text">
            ¿No tienes cuenta? <Link to="/register">Crear cuenta</Link>
          </p>

        </form>
      </div>
    </div>
  );
}

