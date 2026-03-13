import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const users = {
    admin: { password: "1234", route: "/General" },
    gestortickets: { password: "5678", route: "/Home_gestortickets" },
    tecnimantenimiento: { password: "9012", route: "/HomeTecniMantenimiento" },
    responsable: { password: "3456", route: "/Home_responsable" }
  };

  const handleEntrar = () => {
    const username = email.split("@")[0];

    if (!users[username]) {
      alert("Usuario no encontrado");
      return;
    }

    if (users[username].password !== password) {
      alert("Contraseña incorrecta");
      return;
    }

    navigate(users[username].route);
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

          <div className="input-group">
            <i className="fa-solid fa-envelope"></i>
            <input
              type="email"
              placeholder="Correo electrónico"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group password-group">
            <i className="fa-solid fa-lock"></i>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
            </button>
          </div>
          <div className="options">
            <label className="remember">
              <input type="checkbox" />
              Recordarme
            </label>

            <Link to="/recuperar_contraseña" className="forgot-password">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <button
            type="button"
            className="btn-primary"
            onClick={handleEntrar}
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
