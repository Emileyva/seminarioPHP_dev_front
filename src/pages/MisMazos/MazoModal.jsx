import React from "react";
import dorsoCarta from "@/assets/images/Dorso carta.jpg";
import "@/assets/styles/MazoModal.css";

const MazoModal = ({ visible, onClose, mazo }) => {
    if (!visible || !mazo) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h3 className="modal-title">Cartas del mazo: {mazo.nombre}</h3>
                    <button
                        onClick={onClose}
                        className="modal-close-button"
                        aria-label="Cerrar"
                    >
                        ×
                    </button>

                </div>
                <div className="modal-cards-container">
                    {mazo.cartas && mazo.cartas.length > 0 ? (
                        mazo.cartas.slice(0, 5).map((carta, idx) => (
                            <div key={idx} className="modal-card">
                                <div>
                                    <span>{carta.nombre}</span>
                                </div>
                                <div>Atributo: {carta.atributo}</div>
                                <div>
                                    Ataque: {carta.ataque} {carta.ataque_nombre && `(${carta.ataque_nombre})`}
                                </div>
                                <div>
                                    <img
                                        src={carta.imagen ? carta.imagen : dorsoCarta}
                                        alt={carta.nombre}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="modal-empty">No hay cartas en este mazo.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MazoModal;