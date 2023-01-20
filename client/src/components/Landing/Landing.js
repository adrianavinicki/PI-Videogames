import React from "react";
import { Link } from "react-router-dom";
import './Landing2.css';


/*Pagina inicial: deben armar una landing page con

[ ] Alguna imagen de fondo representativa al proyecto
[ ] Botón para ingresar al home (Ruta principal)*/

function Landing() {
  return (
    <section className="container">
      <div className="landing_page">
        <div className="container_dos">
          <h1 className="landing_title">
          LIVE A NEW EXPERIENCE!!!
        </h1>
        <Link to="/home" className='link'>LET´S GO!
        </Link>
        </div>
      </div>
    </section>
  );
}

export default Landing;
