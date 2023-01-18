import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameById, cleanDetail } from "../../Redux/Actions/index";
import { useEffect } from "react";
import "./videogameDetail.css";

function VideogameDetail(id) {
  const dispatch = useDispatch();
  const detail = useSelector(state => state.videogameById)
  console.log(detail)

  useEffect(() => {
    dispatch(getVideogameById(id));
  },[id, dispatch]);

  useEffect(() => {
    return function () {
      dispatch(cleanDetail());
    } 
  },[dispatch]);

  return (
    <div className="contPri">
            {
                detail && detail.name ?
                <div>
                    <button className="buttonBack"><Link className="linkBack" to='/home'>Home</Link></button>
                    <div className="conTotal">
                        <div className="imgDesc">
                            <h1>{detail.name}</h1>
                            <p><h2>Description:</h2> {detail.description.replace(/<p>/g, "")}</p>
                        </div>
                        <div className="infoGame">
                            <img src={detail.background_image} alt="logoimg" />
                            <div className="infoRest">
                                <h3>Platforms: {detail.platforms.length > 0 ? detail.platforms + ' ': detail.platforms.map(e => e)}</h3>
                                <br />
                                <h3>Genres: {detail.genre.length > 0 ? detail.genre + ' ': detail.genre.map(e => e)}</h3>
                                <br />
                                <h4>Rating: {detail.rating}</h4>
                                <br />
                                <h4>Released: {detail.released}</h4>
                            </div>
                        </div>
                    </div>
                </div> : (
                    <div className="loadkra">
                        <img src="../images/izqlanding.jpeg" alt="logoload" />
                    </div>
                )
            }
        </div>
    )
}

export default VideogameDetail;

