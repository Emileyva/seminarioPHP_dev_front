import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCartasDeMazo } from "@/services/MazosService";
import { crearPartida,realizarJugada } from "@/services/jugadaServices";
import dorsoCarta from "@/assets/images/Dorso carta.jpg";
import "@/assets/styles/jugarPage.css";
import { toast } from "react-toastify"; 

const JugarPage = () => {
  const { mazoId } = useParams();
  const [cartasUsuario, setCartasUsuario] = useState([]);
  const [cartasServidor, setCartasServidor] = useState([]);
  const [partida, setPartida] = useState(null);
  const [jugadaActual, setJugadaActual] = useState(null);
  const [resultadoFinal, setResultadoFinal] = useState(null);
  const partidaCreada = useRef(false); // <-- FLAG
  const navigate = useNavigate();

  // Traer cartas del mazo
  useEffect(() => {
    const fetchCartas = async () => {
      try {
        const cartasDelMazo = await getCartasDeMazo(mazoId);
        if (cartasDelMazo && Array.isArray(cartasDelMazo)) {
          setCartasUsuario(cartasDelMazo);
          setCartasServidor(new Array(5).fill({ imagen: dorsoCarta }));
        } else {
          console.error("Formato de datos incorrecto:", cartasDelMazo);
        }
      } catch (error) {
        console.error("Error al obtener las cartas del mazo:", error);
      }
    };

    fetchCartas();
  }, [mazoId]);

  // Crear partida automáticamente al entrar (solo una vez)
  useEffect(() => {
    const crear = async () => {
      if (partidaCreada.current) return; // esto evita crear la partida más de una vez
      partidaCreada.current = true;
      const res = await crearPartida(mazoId);
      if (res.error) {
        alert(res.error);
      } else {
        setPartida(res);
        toast.success("¡Partida iniciada!"); 
      }
    };
    if (mazoId) crear();
  }, [mazoId]);

  useEffect(() => {
    console.log("partida actualizada:", partida);
  }, [partida]);

  const handleDragStart = (event, carta) => {
    event.dataTransfer.setData("carta", JSON.stringify(carta));
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    const carta = JSON.parse(event.dataTransfer.getData("carta"));
    if (!partida || !partida.partida_id) {
      toast.error("No hay partida activa."); 
      return;
    }
    const res = await realizarJugada(partida.partida_id, carta.id);
    
    setJugadaActual(res);
    if (res.resultado_final) {
      setResultadoFinal(res.resultado_final);
    }
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(res.mensaje || res.message || "Jugada realizada correctamente");
      setCartasUsuario((prev) => prev.filter((c) => c.id !== carta.id));
      setCartasServidor((prev) => prev.slice(1));
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleCancelar = () => {
    // Opcional: aquí podrías llamar a un servicio para cancelar la partida en el backend si lo necesitas
    setJugadaActual(null);
    setResultadoFinal(null);
    setPartida(null);
    setCartasUsuario([]);
    setCartasServidor([]);
    navigate("/mis-mazos"); // Redirige al usuario fuera de la partida
  };

  return (
    <div className="jugar-page">
      {/* Cartas del servidor */}
      <div className="cartas-servidor">
        {cartasServidor.map((carta, index) => (
          <div key={index} className="carta">
            <img src={carta.imagen} alt="Dorso de carta" />
          </div>
        ))}
      </div>

      {/* Contenedor central para arrastrar cartas */}
      <div className="contenedor-central"
           onDrop={handleDrop}
           onDragOver={handleDragOver}
      >
        {/* Aquí puedes mostrar los datos de la jugada */}
        {jugadaActual && (
          <div className="resultado-jugada">
            <div>
              <strong>Tu carta:</strong> {jugadaActual.carta_usuario?.nombre}
              <span style={{ marginLeft: 8 }}>
                {jugadaActual.ataque_usuario_a}
              </span>
            </div>
            <div>
              <strong>Carta rival:</strong> {jugadaActual.carta_servidor?.nombre}
              <span style={{ marginLeft: 8 }}>
                 {jugadaActual.ataque_usuario_b}
              </span>
            </div>
            <div style={{marginTop: 10}}>
              <strong>Resultado:</strong> {jugadaActual.resultado}
            </div>
          </div>
        )}

        {resultadoFinal && (
          <div className="resultado-final">
            <h2>Resultado final: {resultadoFinal.toUpperCase()}</h2>
            <button
              className="boton-volver"
              onClick={() => navigate("/mis-mazos")}
            >
              Volver a Mis Mazos
            </button>
          </div>
        )}

        {!resultadoFinal && (
          <>
            <button className="boton-jugar">Jugar</button>
            <button className="boton-cancelar" onClick={handleCancelar}>Cancelar</button>
          </>
        )}
      </div>

      {/* Cartas del usuario */}
      <div className="cartas-usuario">
        {cartasUsuario.map((carta) => (
          <div
            key={carta.id}
            className="carta"
            draggable
            onDragStart={(event) => handleDragStart(event, carta)}
          >
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
        ))}
      </div>
    </div>
  );
};

export default JugarPage;