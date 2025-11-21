import { useState } from "react";
import "./login.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-container">
      <div className="login-box">

        <div className="logo">
          <div className="logo-icon">Σ</div>
          <span className="logo-text">Sigma</span>
        </div>

        <h2>Inicia sesión</h2>
        <p className="subtitle">
          Accede a tu panel de control para gestionar tus activos.
        </p>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <i className="fa-solid fa-envelope"></i>
            <input type="email" placeholder="Correo electrónico" required />
          </div>

          <div className="input-group">
            <i className="fa-solid fa-lock"></i>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              required
            />
            <button
              className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              id="togglePassword"
              onClick={() => setShowPassword(!showPassword)}
            >
                </button>
          </div>

          <div className="options">
            <label><input type="checkbox" /> Recordarme</label>
            <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
          </div>

          <button className="btn-primary" type="submit">
            Entrar en Sigma
          </button>

          <div className="divider">
            <span>o continuar con</span>
          </div>

          <button type="button" className="btn-google">
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google Logo"
              />
            Google
          </button>

          <p className="register-text">
            ¿No tienes cuenta? <a href="/register">Crear cuenta</a>
          </p>
        </form>
      </div>
    </div>
  );
}
