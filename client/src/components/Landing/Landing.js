import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import pac_man from "../images/pac_man.png";
import mario_verification from  "../images/mario_verification.gif";
import izqlanding from "../images/izqlanding.jpeg";

/*Pagina inicial: deben armar una landing page con

[ ] Alguna imagen de fondo representativa al proyecto
[ ] Botón para ingresar al home (Ruta principal)*/

function Landing() {
  return (
    <div className="landing_page">
      <div>
        <h6 className="landing_tittle">
          WELCOME!!! TO A NEW EXPERIENCE!
        </h6>
        <div className="landing_packman">
            <img src={pac_man} alt="soy packman"/>
          <h5>On this page you will be able to search for videogames or create new
          ones!!!
        </h5>
        </div>
        <div className="landing_gif">
          <img src={mario_verification} alt="soy mario"/>
        <h3 >GO...</h3>
        </div>
        <div className="landing_izqposition"></div>
        <img src={izqlanding} alt="estos son los videos"/>
        </div>
        <Link to="/home">
          <button className="landing_button">Start</button>
        </Link>
      </div>
  );
}

export default Landing;
