import React, { useEffect, useState } from "react";
// useEffect para detectar cualquier cambio en la pagina
import { useDispatch, useSelector } from "react-redux";
// useDispatch es para enviar la info, y useSelector es para darle al click al form
import Card from "../Card/Card";
import Paging from "../Paging/Paging";
import "./Home.css";
import { getAllVideogames } from "../../Redux/Actions";

/*Pagina inicial: deben armar una landing page con

[ ] Alguna imagen de fondo representativa al proyecto
[ ] Botón para ingresar al home (Ruta principal)*/

function Home() {
  const dispatch = useDispatch();

  const allVideogames = useSelector((state) => state.videogames); //trae todo lo que esta en el estado
  const [videogamesPerPage, setVideogamesPerPage] = useState(15);//cantidad de videos x pagina
  const [currentPage, setCurrentPage] = useState(1);

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
  });

  return (
    <div>
      <Paging
      allVideogames={allVideogames.length}
      videogamesPerPage={videogamesPerPage}
      page={page}
      currentPage={currentPage}
      />
      {currentVideogames.map((video) => (
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
      }
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