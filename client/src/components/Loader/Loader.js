import React from 'react'
import mariohasahardtime from "../images/mariohasahardtime.gif";
import "./Loader.css";
import { Link } from "react-router-dom";

function Loader() {

  
  return (
  <div>
        <Link to="/">
          <button className="button">Back</button>
        </Link>
      
    <div className="loading">
    <img src={mariohasahardtime} alt="loading" />
    <h3>
      <strong>LOADING . . .</strong>
    </h3>
  </div>
  </div>
  )
}

export default Loader