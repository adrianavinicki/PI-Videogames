const axios = require("axios"); // instale axios para hacer las consultas a api, con
require("dotenv").config(); //primeromejor traer el axios
const { API_KEY, API_URL } = process.env;
const { Videogame, Genre } = require("../db"); 
const { getIdDetail} = require("./getIdDetail");
const { getAllVideogames } = require("./getAllVideogames");
/*__POST /videogames__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
  - Crea un videojuego en la base de datos, relacionado a sus géneros.*/

async function addVideogame(req, res, next) {
  try {
    const {
      name,
      description,
      released,
      rating,
      platforms,
      background_image,
      createdInDb,
      genre,
    } = req.body;
    console.log("aca esta body :", req.body);
    if (!name || !description || !platforms)
      return res.status(400).send({ message: "information required" });

    //deberia colocar un if que si el slug que surgiria del body name existe en la base de datos deberia rechazar la creacion

    let videogameCreated = await Videogame.create({
      name,
      slug: name
        .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
        .replace(/ /g, "-")
        .toLowerCase(),
      description,
      released,
      rating,
      platforms,
      background_image,
      createdInDb,
    });
    let genreDb = await Genre.findAll({
      where: { name: genre},
    });
    console.log("este es el :", genreDb);
    await videogameCreated.addGenre(genreDb);
    res.status(200).send("Videogame creado con exito"); //puedo poner que devuelva el creado videogameCreated con un json
  } catch (error) {
    next(error);
  }
}

/*[ ] GET /videogames:
Obtener un listado de los videojuegos
Debe devolver solo los datos necesarios para la ruta principal*/

/*[ ] GET /videogames?name="...":
Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
Si no existe ningún videojuego mostrar un mensaje adecuado*/

async function getVideogames(req, res, next) {
  try {
    const name = req.query.name; //aplico ambas busquedas con name o sin name

    let videogamesTodos = await getAllVideogames();
    if (name) {
      const newname = name
        .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
        .replace(/ /g, "-")
        .toLowerCase();
      let videogameName = await videogamesTodos.filter((el) =>
        el.slug.includes(newname)
      );
      videogameName.length
        ? res.status(200).send(videogameName)
        : res.status(404).send("No se encuentra el videojuego requerido");
    } else {
      res.status(200).send(videogamesTodos);
    }
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  const { id } = req.params;
  try {
    let video = await getIdDetail(id);
    res.status(200).send(video);
  } catch (err) {
    next(err);
  }
}

module.exports = { addVideogame, getVideogames, getById };

