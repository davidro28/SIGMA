import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // <- Importa useNavigate
import "./login.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // <- Hook para navegar

  // Función para ir a Home
  const handleEntrar = () => {
    navigate("/home"); // <- Redirige a /home
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        {/* LOGO */}
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
          <div className="input-group password-group">
            <i className="fa-solid fa-lock"></i>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              required
            />

            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
            </button>
          </div>

          {/* Opciones */}
          <div className="options">
            <label className="remember">
              <input type="checkbox" />
              Recordarme
            </label>

            <a href="./recuperar_contraseña.jsx">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {/* Botón */}
          <button
            type="button"         // <- Cambiado a type="button" para evitar submit
            className="btn-primary"
            onClick={handleEntrar} // <- Aquí llamamos a la función de redirección
          >
            Entrar en Sigma
          </button>

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
