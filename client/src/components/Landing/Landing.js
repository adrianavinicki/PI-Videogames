import React from "react";
import { Link } from "react-router-dom";
//import "./Landing.css";
//import pac_man from "../images/pac_man.png";
//import mario_verification from  "../images/mario_verification.gif";
//import izqlanding from "../images/izqlanding.jpeg";
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
        {/*<img className="pack_landing" src={pac_man} alt="soy packman"/>
        <div className="subtitle_landing">
          <h3>Search and Create Videogames!!!</h3>
        </div>
        <div>
          <img src={izqlanding} alt="soy imagen"/>
        <h2 >LET´S GO...</h2>
        </div>
        <div>*/}
        <Link to="/home" className='link'>LET´S GO!
         {/* <button className="landing_button">Start</button>*/}
        </Link>
        </div>
      </div>
    </section>
  );
}

export default Landing;
