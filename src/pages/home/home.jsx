import React from "react";
import Slider from "react-slick";
import "@/assets/styles/home.css"; // Asegúrate de que la ruta sea correcta
import img1 from "@/assets/images/gimnsaio_faye.png";
import img2 from "@/assets/images/gimnsaio_faye.png";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
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
          {/* Slide 1 */}
          <div className="slide">
            <img src={img1} alt="Tokenizate" className="slide-image"
            style={{
                backgroundImage: `url(${img1})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "500px"
              }} />
            <div className="slide-overlay">
              <h1 className="slide-title">Tokenizate 🌟</h1>
              <p className="slide-text" >
                🚀 Tokenizá tus proyectos de trabajo y formá parte de nuestro marketplace exclusivo de negocios de economía real.
                Creá tus propios tokens a medida de tus necesidades y brindá oportunidades de participación a nuestros usuarios para que te apoyen en tu desarrollo.
              </p>
            </div>
          </div>
          {/* Slide 2 */}
          <div className="slide">
            <img src={img2} alt="Registrate" className="slide-image"
              style={{
                backgroundImage: `url(${img1})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "500px"
              }} />
            <div className="slide-overlay">
              <h1 className="slide-title" style={{ color: "#FFBF53" }}>¡Registrate!</h1>
              <p className="slide-text slide-text-bold">
                👥 Como usuario, registrate y accedé a rentas pasivas variables, renta fija, beneficios como descuentos, regalos 🎁, y acceso a actividades de los diferentes proyectos y empresas que forman parte de nuestro marketplace tokenizado.
              </p>
              <p className="slide-text" style={{ marginTop: "1rem" }}>
                💸 ¡Pronto vas a poder acceder a préstamos usando tus tokens! Es decir, vas a poder invertir y también financiar tus vacaciones 🏖️, tus compras 🛍️ o tus deseos, al mismo tiempo que generás ingresos comprando tokens de los negocios de economía real con más potencial de Argentina y Latinoamérica. 🌎
              </p>
            </div>
          </div>
        </Slider>
      </div>
      {/* Aquí puedes agregar más contenido debajo del slider */}
    </div>
  );
}

export default Home;