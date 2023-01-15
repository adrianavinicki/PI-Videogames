import React, { useEffect, useState } from "react";
// useEffect para detectar cualquier cambio en la pagina
import { useDispatch, useSelector } from "react-redux";
// useDispatch es para enviar la info, y useSelector es para darle al click al form
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paging from "../Paging/Paging";
import "./Home2.css";
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
import Loader from "../Loader/Loader";
import Navbar from "../Navbar/Navbar";

function Home() {
  const dispatch = useDispatch();

  const allVideogames = useSelector((store) => store.videogames); //trae todo lo que esta en el estado
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

  useEffect(() => {
    dispatch(getAllVideogames());
  }, [dispatch]); // arreglo vacio xque no depende de nada se monta tranquilo

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  if (!allVideogames.length) {
    return <Loader />;
  }

  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllVideogames()); //envia todos los videojuegos
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleFilterGenre(e) {
    e.preventDefault();
    dispatch(filterGamesByGenre(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreatedIn(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleRating(e) {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  return (
    <div>
      <div className="create_container">
        <Link className="button_create_videogame" to="/videogameCreate">
          CREATE VIDEOGAME
        </Link>
        <div className="reload_container">
          <button
            className="button_reload"
            onClick={(e) => {
              handleClick(e);
            }}
          >
            Reload
          </button>
        </div>
      </div>
      <div>
        <Navbar
          handleSort={handleSort}
          handleRating={handleRating}
          handleFilterCreated={handleFilterCreated}
          handleFilterGenre={handleFilterGenre}
        />
      </div>
      <ul className="card_grid">
        {currentVideogames.map((video) => {
          return (
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
                  video.platforms.map((el) => el.name)
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
          );
        })}
      </ul>
      <div className="pagination">
        <Paging
          allVideogames={allVideogames.length} //porque necesito la cantidad
          videogamesPerPage={videogamesPerPage}
          page={page}
          currentPage={currentPage}
        />
      </div>
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
