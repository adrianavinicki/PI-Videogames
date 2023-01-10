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
      <img className="pack_landing" src={pac_man} alt="soy packman"/>
        <h1 className="landing_tittle">
          WELCOME!!! TO A NEW EXPERIENCE!
        </h1>
        <div className="subtitle_landing">
          <h3>You will be able to search for videogames or create new
          ones!!!
        </h3>
        </div>
        <div>
          <img src={izqlanding} alt="soy imagen"/>
        <h2 >LET´S GO...</h2>
        </div>
        </div>
        <Link to="/home">
          <button className="landing_button">Start</button>
        </Link>
      </div>
  );
}

export default Landing;
