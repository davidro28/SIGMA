import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import Modal from "../../Components/modalAlerta";
import { useModal } from "../../Hooks/useModalAlert";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { modal, showModal, closeModal } = useModal();

  const handleEntrar = async () => {
    if (!email || !password) {
      showModal("warning", "Campos vacíos", "Por favor ingresa tu correo y contraseña antes de continuar.", "Entendido");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario: email, password })
      });

      if (!res.ok) {
        showModal("error", "Credenciales incorrectas", "El correo o la contraseña que ingresaste no son válidos. Inténtalo de nuevo.", "Intentar de nuevo");
        return;
      }

      const data = await res.json();

      localStorage.setItem("token",   data.token);
      localStorage.setItem("roles",   JSON.stringify(data.roles));
      localStorage.setItem("usuario", data.usuario);

      const rol = data.roles[0];
      if      (rol === "Responsable")          navigate("/Home_responsable");
      else if (rol === "Admin")                navigate("/General");
      else if (rol === "Gestor_Tickets")       navigate("/Home_gestortickets");
      else if (rol === "Tecni_Mantenimiento")  navigate("/HomeTecniMantenimiento");
      else                                     navigate("/");

    } catch (error) {
      console.error("Error de conexión:", error);
      showModal("error", "Error de conexión", "No pudimos conectar con el servidor. Revisa tu conexión e intenta de nuevo.", "Cerrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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

          <form onSubmit={(e) => { e.preventDefault(); handleEntrar(); }}>

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

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Ingresando..." : "Entrar en Sigma"}
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

      {modal && (
        <Modal
          {...modal}
          onClose={closeModal}
        />
      )}
    </>
  );
}