import React from 'react'
import reloj_de_arena from'../images/reloj_de_arena.gif';
import "./Loader.css";
import { Link } from "react-router-dom";

function Loader() {

  
  return (
  <div>
        <Link to="/">
          <button className="button2">Back</button>
  </Link>
      
    <div className="loading">
    <img src={reloj_de_arena} alt="loading" />
    <h3>
      <strong>LOADING . . .</strong>
    </h3>
  </div>
  </div>
  )
}

export default Loader