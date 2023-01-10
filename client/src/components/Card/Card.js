import React from "react";
import "./Card.css";

function Card({ id, name, description, released, rating, platforms, background_image, genre,}) {
   return(
    <div className="video-card">
      <img className="card-img" src={background_image} alt={name} />
      <h2>{name}</h2>
      <h4>{released}</h4>
      <h4>{rating}</h4>
      <h5>{genre}</h5>
    </div>
  );
}

export default Card;
