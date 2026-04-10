import "../modalAlerta/styles.css";
export default function Modal({
    type = "error",
    title,
    message,
    confirmText = "Entendido",
    onClose,
}) {
    const icons = { error: "✕", success: "✓", warning: "!" };

    return (
        <div className="alert-overlay" onClick={onClose}>
            <div className="alert-box" onClick={(e) => e.stopPropagation()}>
                <div className={`alert-icon ${type}`}>{icons[type]}</div>
                <p className="alert-title">{title}</p>
                <p className="alert-message">{message}</p>
                <div className="alert-actions">
                    <button className={`alert-btn ${type}`} onClick={onClose}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
