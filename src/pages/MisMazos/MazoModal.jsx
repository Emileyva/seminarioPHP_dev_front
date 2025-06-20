import React from "react";
import dorsoCarta from "@/assets/images/Dorso carta.jpg"; // Asegúrate de que la ruta sea correcta

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
                boxShadow: "0 4px 24px rgba(0,0,0,0.15)"
            }}>
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
                        color: "#111"
                    }}
                    aria-label="Cerrar"
                >
                    ×
                </button>
                <h3>Cartas del mazo: {mazo.nombre}</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1rem" }}>
                    {mazo.cartas && mazo.cartas.length > 0 ? (
                        mazo.cartas.slice(0, 5).map((carta, idx) => (
                            <div
                                key={idx}
                                style={{
                                    border: "1px solid #ccc",
                                    borderRadius: "8px",
                                    padding: "10px",
                                    width: "180px",
                                    background: "#fff",
                                }}
                            >
                                <div>
                                    <span style={{ fontWeight: "bold" }}>{carta.nombre}</span>
                                </div>
                                <div>Atributo: {carta.atributo}</div>
                                <div>
                                    Ataque: {carta.ataque} {carta.ataque_nombre && `(${carta.ataque_nombre})`}
                                </div>
                                <div>
                                    <img
                                        src={carta.imagen ? carta.imagen : dorsoCarta}
                                        alt={carta.nombre}
                                        style={{ width: "100%", borderRadius: "8px", marginTop: "0.5rem" }}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>No hay cartas en este mazo.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MazoModal;