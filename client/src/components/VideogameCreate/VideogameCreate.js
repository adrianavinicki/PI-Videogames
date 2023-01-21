import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { videogameCreate, getGenres } from "../../Redux/Actions/index";
import "./VideogameCreate2.css";

function validation(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Please write a name!";
  }
  if (!input.description) {
    errors.description = "Please write a description!";
  }
  if (!input.released) {
    errors.released = "Game must have a released date";
  }
  if (!input.rating || input.rating < 0 || input.rating > 5) {
    errors.rating = "Rating must be between 0 to 5";
  }
  if (!input.platforms.length) {
    errors.platforms = "Please write a platform!";
  }
  return errors;
}

function VideogameCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const genre = useSelector((state) => state.genres);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: 0,
    platforms: [],
    background_image: "",
    genre: [],
  });
  console.log(genre);

  const [errors, setErrors] = useState({});

  const platformsList = [
    "PC",
    "iOS",
    "Android",
    "macOS",
    "PlayStation",
    "Xbox",
    "Nintendo",
    "Linux",
    "Apple",
    "Atari",
    "Genesis",
    "SEGA",
  ];

  function handleChange(e) {
    if (e.target.name === "genre" || e.target.name === "platforms") {
      const arr = input[e.target.name];
      setInput({
        ...input,
        [e.target.name]: arr.concat(e.target.value),
      });
      setErrors(
        validation({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });

      setErrors(
        validation({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    }
  }
  // name es cada casillero que debe llenar
  // el value son los inputs de arriba que van a ir cambiando a medida que se ingresa la info

  function handleSelectPlatforms(e) {
    if (!input.platforms.includes(e.target.value)) {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value],
      });
    }
  }

  function handleSelectGenre(e) {
    if (!input.genre.includes(e.target.value)) {
      setInput({
        ...input,
        genre: [...input.genre, e.target.value],
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(validation(input));
    const errorSubmit = validation(input);

    if (Object.values(errorSubmit).length !== 0 || !input.genre.length) {
      alert("Wrong information");
    } else {
      dispatch(videogameCreate(input));
      alert("Videogame created 👌");
      setInput({
        //seteo todo mi input en cero
        name: "",
        description: "",
        released: "",
        rating: 0,
        platforms: [],
        background_image: "",
        genre: [],
      });
      history.push("/home");
    }
  }

  function handleDeleteGenre(e) {
    e.preventDefault();
    setInput({
      ...input,
      genre: input.genre.filter((g) => g !== e.target.value), //filtro por todo lo que no sea ese elemento
    });
  }

  return (
    <div className="containerForm">
      <Link className="home" to="/home">
        HOME
      </Link>
      <div>
        <h1 className="tittle">Create your Videogame</h1>
      </div>
      <div clasName="boxgrid">
        <form className="formCreate" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <input
              className="inputsss"
              placeholder="Videogame name"
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <p className="error">{errors.name}</p>}
            <input
              className="inputsss"
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
            <label className="released">Released </label>
            <input
              className="inputsss"
              type="date"
              value={input.released}
              name="released"
              onChange={(e) => handleChange(e)}
            />
            {errors.released && <p>{errors.released}</p>}
          </div>
          <label className="rating">Rating: 0 to 5</label>
          <input
            className="input"
            type="number"
            value={input.rating}
            min={0}
            max={5}
            name="rating"
            onChange={(e) => handleChange(e)}
          />
          {errors.rating && <p>{errors.rating}</p>}

          <div className="platforms_container">
            <label className="rating"> Platforms </label>
            <select
              className="inputss"
              onChange={(e) => handleSelectPlatforms(e)}
            >
              {platformsList.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <input
            className="inputsss"
            placeholder="Image"
            type="text"
            value={input.background_image}
            name="background_image"
            alt="not found"
            onChange={(e) => handleChange(e)}
          />
          <div className="genres_container">
            <label className="rating">Genres </label>

            <select className="inputss" onChange={(e) => handleSelectGenre(e)}>
              {genre.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button className="buttonCrear" disabled= { input.name.length < 5 || input.background_image.length === 0 || input.description < 5 || input.rating.length < 1 || input.platforms.length < 1 || input.genre.length < 1 }
             type="submit">
              CREATE
            </button>
          </div>
        </form>
        {input.genre.map((g, i) => (
          <div key={i} className="x_genre_container">
            <p>{g}</p>
            <br />
            <button
              className="butonX"
              value={g}
              onClick={(g) => handleDeleteGenre(g)}
            >
              X
            </button>
          </div>
        ))}
        {errors.genre && <p>{errors.genres}</p>}
      </div>
    </div>
  );
}

export default VideogameCreate;
