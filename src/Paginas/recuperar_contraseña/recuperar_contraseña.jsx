import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./recuperar_contraseña.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email enviado:", email);
  };

  return (
    <div className="fp-container">
      <div className="fp-card">
        <div className="fp-header">
          <div className="fp-logo">Σ</div>
          <div>
            <h2>Sigma</h2>
            <p className="fp-subtitle">Gestor de activos</p>
          </div>
        </div>

        <h3 className="fp-title">¿Olvidaste tu contraseña?</h3>
        <p className="fp-description">
          Introduce el correo asociado a tu cuenta y te enviaremos un enlace
          seguro para restablecer tu acceso.
        </p>

        <form onSubmit={handleSubmit}>
          <label className="fp-label">Correo electrónico</label>
          <input
            type="email"
            placeholder="nombre.apellido@firma.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="fp-input"
          />

          <button className="fp-button" type="submit">
            Enviar enlace de recuperación
          </button>
        </form>
        <Link to="/login" className="fp-back">
        Volver al inicio de sesión</Link>

        <p className="fp-footer">
          <strong>Recomendación de Sigma</strong><br />
          Por seguridad, el enlace de recuperación caducará en 15 minutos y solo
          podrá usarse una vez.
        </p>
    </div>
</div>
);
}
