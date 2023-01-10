import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { videogameCreate, getGenres } from "../../Redux/Actions/index";
import "./VideogameCreate.css";

function validation(input) {
  let errors = {};
  if (!input.name.trim()) {
    //trim elimina espacios en blanco que dejen cuando escriben
    errors.name = "Please write a name!";
  }
  if (!input.description.trim()) {
    errors.description = "Please write a description!";
  }
  if (!input.platforms.length) {
    errors.platforms = "Please write a platform!";
  }
  return errors;
}

function VideogameCreate() {
  const dispatch = useDispatch();
  const genre = useSelector((state) => state.genres);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: 0,
    platforms: [],
    background_image: "",
    genres: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    }); // name es cada casillero que debe llenar
    // el value son los inputs de arriba que van a ir cambiando a medida que se ingresa la info
    setErrors(
      validation({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handleSelectGenre(e) {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(
      validation({
        ...input,
        [e.target.name]: e.target.value,
      })
    );

   // if (Object.keys(errors).length === 0) {
      dispatch(videogameCreate(input));
      alert("Videogame created 👌");
      /*setInput({
        //seteo todo mi input en cero
        name: "",
        description: "",
        released: "",
        rating: 0,
        platforms: [],
        background_image: "",
        genres: [],
      });*/
   /* } else {
      alert("ERROR: videogame not created ");
      return;
    }*/
  }
  function handleDeleteGenre(e) {
    setInput({
      ...input,
      genres: input.genres.filter((g) => g !== e), //filtro por todo lo que no sea ese elemento
    });
  }

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <>
      <div className="home_container">
        <Link className="home" to="/home">
          HOME
        </Link>
        <h1 className="lets_go">Go...!</h1>
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <input
              className="input"
              placeholder="Videogame name"
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div>
            <input
              className="input"
              placeholder="Description"
              type="text"
              value={input.description}
              name="description"
              onChange={(e) => handleChange(e)}
            />
            {errors.description && (
              <p className="error">{errors.description}</p>
            )}
          </div>
          <div className="released_container">
            <label className="released"> Released </label>
            <input
              className="released_input"
              type=""
              value={input.released}
              name="released"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label className="rating">Rating </label>
            <input
              className="rating_input"
              placeholder="0 to 5"
              type="number"
              value={input.rating}
              min={0}
              max={5}
              name="rating"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="platforms_container">
            <label className="platforms"> Platforms </label>
            <input
              className="platforms_input"
              type="" //ver si permite subir mas de uno
              value={input.released}
              name="released"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <input
              className="input"
              placeholder="Image"
              type=""
              value={input.background_image}
              name="background_image"
              alt="not found"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="genres_container">
            <label className="genres">Genres </label>
            <select
              className="genres_input"
              onChange={(e) => handleSelectGenre(e)}
            >
              {genre.map((g) => (
                <option key={g.name} value={g.name}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button className="create" type="submit">
              CREATE
            </button>
          </div>
        </form>
        {input.genres.map((g) => (
          <div className="x_genre_container">
            <label className="x_genre">{g}</label>
            <button
              className="x_genre_buttom"
              onClick={() => handleDeleteGenre(g)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default VideogameCreate;
