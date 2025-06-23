import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // <-- Agrega esto
import { listarCartas, crearMazo } from "@/services/MazosService";
import { notifySuccess, notifyError } from "@/components/Notificaciones";
import "@/assets/styles/home.css";
import "@/assets/styles/altaMazos.css"; // Asegúrate de tener este archivo CSS
import dorsoCarta from "@/assets/images/Dorso carta.jpg";

const MAX_CARTAS = 5;
const MAX_NOMBRE = 20;

const AltaMazosPage = () => {
    const [nombre, setNombre] = useState("");
    const [cartas, setCartas] = useState([]);
    const [cartasSeleccionadas, setCartasSeleccionadas] = useState([]);
    const [filtroAtributo, setFiltroAtributo] = useState("");
    const [filtroNombre, setFiltroNombre] = useState("");
    const [loading, setLoading] = useState(false);
    const [sortOption, setSortOption] = useState("nombre-asc");
    const navigate = useNavigate(); // <-- Agrega esto
    const formRef = useRef(null);
    const [atBottom, setAtBottom] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!formRef.current) return;
            const rect = formRef.current.getBoundingClientRect();
            setAtBottom(rect.bottom <= window.innerHeight + 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
            navigate("/mis-mazos"); // <-- Redirige a Mis Mazos
        }
    };

    // Ordenar cartas según la opción seleccionada
    const cartasOrdenadas = [...cartas].sort((a, b) => {
        switch (sortOption) {
            case "nombre-asc":
                return a.nombre.localeCompare(b.nombre);
            case "nombre-desc":
                return b.nombre.localeCompare(a.nombre);
            case "ataque-asc":
                return (a.ataque ?? 0) - (b.ataque ?? 0);
            case "ataque-desc":
                return (b.ataque ?? 0) - (a.ataque ?? 0);
            default:
                return 0;
        }
    });

    return (
        <div className="home-container">
            <h2>Alta de Nuevo Mazo</h2>
            <form ref={formRef} onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
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
                <div className="filtro-cartas">
                    <strong>Filtrar cartas:</strong>
                    <input
                        type="text"
                        placeholder="Atributo"
                        value={filtroAtributo}
                        onChange={(e) => setFiltroAtributo(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={filtroNombre}
                        onChange={(e) => setFiltroNombre(e.target.value)}
                    />
                    <button type="button" onClick={handleLimpiarFiltros}>
                        Limpiar filtros
                    </button>
                </div>
                <div style={{ marginTop: "1rem" }}>
                    <label>
                        <strong>Ordenar por: </strong>
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            // Aplica la clase CSS
                        >
                            <option value="nombre-asc">Nombre (A-Z)</option>
                            <option value="nombre-desc">Nombre (Z-A)</option>
                            <option value="ataque-asc">Ataque (menor a mayor)</option>
                            <option value="ataque-desc">Ataque (mayor a menor)</option>
                        </select>
                    </label>
                </div>
                <div style={{ marginTop: "1.5rem" }}>
                    <strong>Selecciona hasta 5 cartas:</strong>
                    {loading ? (
                        <div>Cargando cartas...</div>
                    ) : (
                        <div className="cartas-listado">
                            {cartasOrdenadas.map((carta) => (
                                <div
                                    key={carta.id}
                                    className={`carta-card${cartasSeleccionadas.includes(carta.id) ? " seleccionada" : ""}`}
                                >
                                    <>
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
                                        <div style={{ marginTop: "0.5rem" }}>
                                            <img
                                                src={carta.imagen ? carta.imagen : dorsoCarta}
                                                alt={carta.nombre}
                                            />
                                        </div>
                                    </>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {/* Elimina el botón submit aquí */}
            </form>
            {/* Botón flotante solo si NO está al final */}
            {!atBottom && (
                <button
                    onClick={handleSubmit}
                    className="floating-button"
                >
                    Crear mazo
                </button>
            )}
            {/* Botón fijo dentro del formulario solo si está al final */}
            {atBottom && (
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "2rem" }}>
                    <button
                        onClick={handleSubmit}
                        className="form-button"
                    >
                        Crear mazo
                    </button>
                </div>
            )}
        </div>
    );
};

export default AltaMazosPage;