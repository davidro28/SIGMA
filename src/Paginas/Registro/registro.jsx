import { useState } from "react";
import { Link } from "react-router-dom";
import "./registro.css";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  // Marcar la casilla al aceptar términos
  const acceptTerms = () => {
    setTermsChecked(true);
    setShowTermsModal(false);
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
            <div className="input-group password-group">
              <i className="fa-solid fa-lock"></i>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Ingresa una contraseña segura"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Mostrar/Ocultar contraseña"
              >
                <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>

            <label>Confirmar contraseña</label>
            <div className="input-group password-group">
              <i className="fa-solid fa-lock"></i>
              <input
                type={showPassword2 ? "text" : "password"}
                placeholder="Repite tu contraseña"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword2(!showPassword2)}
                aria-label="Mostrar/Ocultar contraseña"
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
                  onKeyDown={(e) => { if(e.key === "Enter") setShowTermsModal(true)}}
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

      {/* Modal de términos y condiciones */}
      {showTermsModal && (
        <div className="modal-overlay" onClick={() => setShowTermsModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Términos y condiciones de SIGMA</h3>
            <p className="modal-subtitle">
              Lee cuidadosamente estos términos antes de crear tu cuenta y acceder a los servicios de SIGMA.
            </p>
            <div className="modal-text">
              <strong>1. Objeto del servicio</strong>
              <p>SIGMA proporciona una plataforma digital para la gestión y consulta de servicios corporativos. Al crear una cuenta, aceptas utilizar la plataforma únicamente para fines profesionales y conforme a las políticas internas de tu organización.</p>

              <strong>2. Cuenta y seguridad</strong>
              <p>Eres responsable de mantener la confidencialidad de tus credenciales y de toda actividad que ocurra bajo tu cuenta.</p>
              <ul>
                <li>No compartas tu contraseña con terceros.</li>
                <li>Notifica inmediatamente a SIGMA ante cualquier uso no autorizado.</li>
                <li>Debes proporcionar información veraz y actualizada.</li>
              </ul>

              <strong>3. Uso aceptable</strong>
              <p>Queda prohibido utilizar la plataforma para actividades ilícitas, vulnerar la seguridad de otros sistemas, extraer datos sin autorización o intentar descompilar el software asociado a los servicios de SIGMA.</p>

              <strong>4. Tratamiento de datos</strong>
              <p>Tus datos personales seran tratados conforme a la politica de privacidad de SIGMA, con fines de prestacion del servicio, seguridad, mejora continua y cumplimiento de obligaciones legales aplicables</p>

              <strong>5. Limitaciones de responsabilidad </strong>
              <p>SIGMA no sera responsable por perdidad indirectas, lucro cesante o daño emergente derivado del uso de la plataforma. El servicio se presta "tal cual",pudiendo experimentar interrupciones programadas por mantenimiento </p>

              <strong>6. Aceptacion de los terminos</strong>
              <p>Al pulsar en "Acepto terminos y condiciones" al crear tu cuenta, confirmas que has leido, comprendido y aceptas integramente estos terminos y condiciones.</p>
              
              {/* Puedes continuar el texto de términos completo aquí */}
            </div>

            <div className="modal-buttons">
              <button onClick={() => setShowTermsModal(false)} className="modal-btn cancel-btn">
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
