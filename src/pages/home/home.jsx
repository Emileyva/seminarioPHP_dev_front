import React from "react";
import Slider from "react-slick";
import "@/assets/styles/home.css";
import img1 from "@/assets/images/charizard__pokemon__wallpaper_by_jesgreeneight_de1r687-pre.jpg";
import img2 from "@/assets/images/dfbxi4z-17d05efe-b453-447f-8192-860bc5ad2566.png";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true, 
  autoplaySpeed: 2500,
};

function Home() {
  return (
    <div className="home-container">
      <h2>Bienvenido a Pokebattle</h2>
      <p>
        Esta es la página principal. Aquí puedes encontrar información, novedades y mucho más.
      </p>
      <div className="slider-section">
        <Slider {...sliderSettings}>
           {}
          <div className="slide">
            <div style={{ position: "relative", width: "100%", height: "500px" }}>
              <img
                src={img1}
                alt="Pokenizate"
                className="slide-image"
                style={{
                  backgroundImage: `url(${img1})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "500px",
                  objectFit: "cover"
                }}
              />
              <div className="slide-overlay slide-overlay-right">
                <h1 className="slide-title">¡Desafiá y combatí con el Juego de Cartas Pokémon!</h1>
                <p className="slide-text">
                  Explorá un mundo donde estrategia, suerte y tus Pokémon favoritos se unen en batallas épicas.
                  Armá tu mazo, enfrentá a otros Entrenadores y convertite en un verdadero Maestro Pokémon.
                  Fácil de aprender, difícil de dominar… ¿Estás listo para el desafío?
                </p>
              </div>
            </div>
          </div>
          {}
          <div className="slide">
            <div style={{ position: "relative", width: "100%", height: "500px" }}>
              <img
                src={img2}
                alt="Registrate"
                className="slide-image"
                style={{
                  backgroundImage: `url(${img2})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "500px",
                  objectFit: "cover"
                }}
              />
              <div className="slide-overlay slide-overlay-left">
                <h1 className="slide-title" style={{ color: "#FFBF53" }}>
                  Desde 1996, una carta a la vez, el mundo cayó bajo el hechizo Pokémon.
                </h1>
                <p className="slide-text slide-text-bold">
                  Lo que empezó en Japón como una extensión del fenómeno de los videojuegos se transformó en uno de los juegos de
                  cartas más icónicos del planeta. Con cada expansión, nuevas criaturas, estrategias y estilos de juego aparecieron,
                  y millones de Entrenadores en todo el mundo se sumaron a la batalla. Hoy, el Juego de Cartas Pokémon no es solo
                  nostalgia: es competencia, colección y comunidad, todo en uno.
                </p>
              </div>
            </div>
          </div>
        </Slider>
      </div>
      {}
    </div>
  );
}

export default Home;