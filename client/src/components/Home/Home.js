import React, { useEffect, useState } from "react";
// useEffect para detectar cualquier cambio en la pagina
import { useDispatch, useSelector } from "react-redux";
// useDispatch es para enviar la info, y useSelector es para darle al click al form
import Card from "../Card/Card";
import Paging from "../Paging/Paging";
import "./Home.css";
import {
  getAllVideogames,
  getGenres,
  getVideogameByName,
  getVideogameById,
  videogameCreate,
  filterGamesByGenre,
  filterCreatedIn,
  orderByName,
  orderByRating,
} from "../../Redux/Actions";
import mariohasahardtime from "../images/mariohasahardtime.gif";

/*Pagina inicial: deben armar una landing page con

[ ] Alguna imagen de fondo representativa al proyecto
[ ] Botón para ingresar al home (Ruta principal)*/

function Home() {
  const dispatch = useDispatch();

  const allVideogames = useSelector((state) => state.videogames); //trae todo lo que esta en el estado
  const [videogamesPerPage, setVideogamesPerPage] = useState(15); //cantidad de videos x pagina
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState(""); //estado local de asc y desc que arranca vacio

  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogames = allVideogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  const page = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  //llegue hasta aca
  useEffect(() => {
    dispatch(getAllVideogames());
  }, [dispatch]); // arreglo vacio xque no depende de nada se monta tranquilo

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  if (!allVideogames.length) {
    return (
      <div className="loading">
        <img src={mariohasahardtime} alt="loading" />
        <h3>
          <strong>LOADING . . .</strong>
        </h3>
      </div>
    );
  }
  return (
    <div className="principal">
      <Paging
        className="header"
        allVideogames={allVideogames.length}
        videogamesPerPage={videogamesPerPage}
        page={page}
        currentPage={currentPage}
      />
      {currentVideogames.map((video) => (
        <Card
          className="cards"
          id={video.id}
          name={video.name}
          description={video.description}
          released={video.released}
          rating={video.rating}
          platforms={
            video.platforms.length === 0 ? (
              <div>No Platform Available</div>
            ) : (
              video.platforms.map((platform) => platform.name)
            )
          }
          background_image={video.background_image}
          genre={
            video.genre.length === 0 ? (
              <div>No Genre Available</div>
            ) : (
              video.genre.map((genre) => genre.name)
            )
          }
        />
      ))}
    </div>
  );
}

export default Home;

/*className="cards">
      {allVideogames.length === 0 ? (
        <div>Loading</div>
      ) : (
        allVideogames.map((video) => (
          <Card
            id={video.id}
            name={video.name}
            description={video.description}
            released={video.released}
            rating={video.rating}
            platforms={
              video.platforms.length === 0 ? (
                <div>No Platform Available</div>
              ) : (
                video.platforms.map((platform) => platform.name)
              )
            }
            background_image={video.background_image}
            genre={video.genre}
          />
        ))
      )}
    </div>*/
