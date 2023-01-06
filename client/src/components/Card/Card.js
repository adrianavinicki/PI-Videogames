import React from "react";
import "./Card.css";

function Card({ id, name, description, released, rating, platforms, background_image, genre,}) {
   return(
    <div className="video-card">
      <h1>{name}</h1>
      <h3>{released}</h3>
      <h3>{rating}</h3>
      <img className="card-img" src={background_image} alt={name} />
      <h3>{genre}</h3>
    </div>
  );
}

export default Card;
