import React, { useEffect, useState } from "react";
import { listarCartas, crearMazo } from "@/services/MazosService";
import { notifySuccess, notifyError } from "@/components/Notificaciones";
import "@/assets/styles/home.css";

const MAX_CARTAS = 5;
const MAX_NOMBRE = 20;

const AltaMazosPage = () => {
    const [nombre, setNombre] = useState("");
    const [cartas, setCartas] = useState([]);
    const [cartasSeleccionadas, setCartasSeleccionadas] = useState([]);
    const [filtroAtributo, setFiltroAtributo] = useState("");
    const [filtroNombre, setFiltroNombre] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchCartas = async () => {
        setLoading(true);
        const response = await listarCartas(filtroAtributo, filtroNombre);
        if (response.error) {
            notifyError(response.error);
            setCartas([]);
        } else {
            setCartas(response);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCartas();
        // eslint-disable-next-line
    }, [filtroAtributo, filtroNombre]);

    const handleSeleccionarCarta = (cartaId) => {
        if (cartasSeleccionadas.includes(cartaId)) {
            setCartasSeleccionadas(cartasSeleccionadas.filter((id) => id !== cartaId));
        } else if (cartasSeleccionadas.length < MAX_CARTAS) {
            setCartasSeleccionadas([...cartasSeleccionadas, cartaId]);
        }
    };

    const handleLimpiarFiltros = () => {
        setFiltroAtributo("");
        setFiltroNombre("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nombre.trim()) {
            notifyError("El nombre del mazo es requerido");
            return;
        }
        if (nombre.length > MAX_NOMBRE) {
            notifyError("El nombre del mazo no puede superar 20 caracteres");
            return;
        }
        if (cartasSeleccionadas.length === 0) {
            notifyError("Debes seleccionar al menos una carta");
            return;
        }
        if (cartasSeleccionadas.length > MAX_CARTAS) {
            notifyError("No puedes seleccionar más de 5 cartas");
            return;
        }
        const response = await crearMazo(nombre.trim(), cartasSeleccionadas);
        if (response.error) {
            notifyError(response.error);
        } else {
            notifySuccess("¡Mazo creado exitosamente!");
            setNombre("");
            setCartasSeleccionadas([]);
        }
    };

    return (
        <div className="home-container">
            <h2>Alta de Nuevo Mazo</h2>
            <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
                <div>
                    <label>
                        Nombre del mazo (máx. 20 caracteres):{" "}
                        <input
                            type="text"
                            value={nombre}
                            maxLength={MAX_NOMBRE}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                            style={{ width: "250px" }}
                        />
                    </label>
                </div>
                <div style={{ marginTop: "1rem" }}>
                    <strong>Filtrar cartas:</strong>
                    <input
                        type="text"
                        placeholder="Atributo"
                        value={filtroAtributo}
                        onChange={(e) => setFiltroAtributo(e.target.value)}
                        style={{ marginLeft: "10px", marginRight: "10px" }}
                    />
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={filtroNombre}
                        onChange={(e) => setFiltroNombre(e.target.value)}
                        style={{ marginRight: "10px" }}
                    />
                    <button type="button" onClick={handleLimpiarFiltros}>
                        Limpiar filtros
                    </button>
                </div>
                <div style={{ marginTop: "1.5rem" }}>
                    <strong>Selecciona hasta 5 cartas:</strong>
                    {loading ? (
                        <div>Cargando cartas...</div>
                    ) : (
                        <div className="cartas-listado" style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1rem" }}>
                            {cartas.map((carta) => (
                                <div
                                    key={carta.id}
                                    className={`carta-card${cartasSeleccionadas.includes(carta.id) ? " seleccionada" : ""}`}
                                    style={{
                                        border: "1px solid #ccc",
                                        borderRadius: "8px",
                                        padding: "10px",
                                        width: "180px",
                                        background: cartasSeleccionadas.includes(carta.id) ? "#e6ffe6" : "#fff",
                                    }}
                                >
                                    <div>
                                        <input
                                            type="checkbox"
                                            checked={cartasSeleccionadas.includes(carta.id)}
                                            onChange={() => handleSeleccionarCarta(carta.id)}
                                            disabled={
                                                !cartasSeleccionadas.includes(carta.id) &&
                                                cartasSeleccionadas.length >= MAX_CARTAS
                                            }
                                        />
                                        <span style={{ fontWeight: "bold", marginLeft: "8px" }}>{carta.nombre}</span>
                                    </div>
                                    <div>Atributo: {carta.atributo}</div>
                                    <div>
                                        Ataque: {carta.ataque} {carta.ataque_nombre && `(${carta.ataque_nombre})`}
                                    </div>
                                    {/* Aquí podrías agregar una imagen si tienes la URL */}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    style={{
                        marginTop: "2rem",
                        backgroundColor: "#007bff",
                        color: "white",
                        padding: "10px 30px",
                        border: "none",
                        borderRadius: "5px",
                        fontSize: "1.1rem",
                        cursor: "pointer",
                    }}
                >
                    Crear mazo
                </button>
            </form>
        </div>
    );
};

export default AltaMazosPage;