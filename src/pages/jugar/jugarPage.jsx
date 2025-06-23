import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCartasDeMazo } from "@/services/MazosService";
import dorsoCarta from "@/assets/images/Dorso carta.jpg";
import "@/assets/styles/jugarPage.css";

const JugarPage = () => {
  const { mazoId } = useParams(); // Extraer correctamente mazoId del URL
  const [cartasUsuario, setCartasUsuario] = useState([]);
  const [cartasServidor, setCartasServidor] = useState([]);

  useEffect(() => {
    const fetchCartas = async () => {
      try {
        const cartasDelMazo = await getCartasDeMazo(mazoId); // Llama al servicio
        if (cartasDelMazo && Array.isArray(cartasDelMazo)) {
          setCartasUsuario(cartasDelMazo); // Cartas del usuario
          setCartasServidor(new Array(5).fill({ imagen: dorsoCarta })); // Cartas del servidor con dorso
        } else {
          console.error("Formato de datos incorrecto:", cartasDelMazo);
        }
      } catch (error) {
        console.error("Error al obtener las cartas del mazo:", error);
      }
    };

    fetchCartas();
  }, [mazoId]);

  const handleDragStart = (event, carta) => {
    event.dataTransfer.setData("carta", JSON.stringify(carta));
  };

  const handleDrop = (event) => {
    const carta = JSON.parse(event.dataTransfer.getData("carta"));
    console.log("Carta arrastrada:", carta);
    // Aquí puedes manejar la lógica de la carta arrastrada
  };

  const handleDragOver = (event) => {
    event.preventDefault();
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
      <div
        className="contenedor-central"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <button className="boton-jugar">Jugar</button>
        <button className="boton-cancelar">Cancelar</button>
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