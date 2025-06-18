import React from "react";

const MazoModal = ({ visible, onClose, mazo }) => {
    if (!visible || !mazo) return null;

    return (
        <div style={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
            background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
        }}>
            <div style={{
                position: "relative",
                background: "#fff",
                padding: 24,
                borderRadius: 8,
                minWidth: 300,
                border: "3px solid rgb(0, 0, 0)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.15)" // Opcional: sombra para más destaque
            }}>
                {/* Botón X para cerrar */}
                <button
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        background: "transparent",
                        border: "none",
                        fontSize: 22,
                        fontWeight: "bold",
                        cursor: "pointer",
                        color: "#111" // Negro oscuro
                    }}
                    aria-label="Cerrar"
                >
                    ×
                </button>
                <h3>Cartas del mazo: {mazo.nombre}</h3>
                <ul>
                    {mazo.cartas && mazo.cartas.length > 0 ? (
                        mazo.cartas.slice(0, 5).map((carta, idx) => (
                            <li key={idx}>{carta.nombre}</li>
                        ))
                    ) : (
                        <li>No hay cartas en este mazo.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default MazoModal;