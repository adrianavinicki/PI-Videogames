import React from "react";
import "./Card.css";





function Card({ id, name, description, released, rating, platforms, background_image, genre}) {
 console.log("aca esta :", id)
  return(
    <div  className="video-card">
      <img className="card-img" src={background_image} alt={name} />
      <h2>{name}</h2>
      {/*<h4>{released}</h4>
      <h4>{rating}</h4>*/}
      <h3><ul>{genre && genre.map((gen) => <li>{gen}</li>)}</ul></h3>
    </div>
  );
}

export default Card;
