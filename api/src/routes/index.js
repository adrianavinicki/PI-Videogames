const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const e = require("express");

const router = Router();

//const { getAllVideogames } = require("../controllers/getAllVideogames");
//const getApiData = require("../controllers/getApiData");
//const { getIdAll } = require("../controllers/getIdAll");
const getGenres = require("../controllers/getGenres");
const { Genre, Videogame } = require("../db.js");
const videogameController = require("../controllers/videogameController.js");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
/* GET /videogames:
Obtener un listado de los videojuegos
Debe devolver solo los datos necesarios para la ruta principal*/

router.get("/videogames", videogameController.getVideogames);

/* GET /videogames?name="...":
Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
Si no existe ningún videojuego mostrar un mensaje adecuado*/

router.get("/videogames?name", videogameController.getVideogames);

/* GET /videogame/{idVideogame}:
Obtener el detalle de un videojuego en particular
Debe traer solo los datos pedidos en la ruta de detalle de videojuego
Incluir los géneros asociados*/

router.get("/videogames/:id", videogameController.getById);

/*GET /genres:
Obtener todos los tipos de géneros de videojuegos posibles
En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
*/
router.get("/genres", getGenres.getGenre);

/* POST /videogames:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
Crea un videojuego en la base de datos, relacionado a sus géneros.*/


router.post("/videogames", videogameController.addVideogame);

module.exports = router;

/*router.post("/videogames", async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      released,
      rating,
      platforms,
      background_image,
      createdInDb,
      genre,
    } = req.body;
    if (!name || !description || !platforms)
      return res.status(400).send({ message: "information required" });

    let videogameCreated = await Videogame.create({
      name,
      slug,
      description,
      released,
      rating,
      platforms,
      background_image,
      createdInDb,
    });
    let genreDb = await Genre.findAll({
      where: { name: genre },
    });
    await videogameCreated.addGenre(genreDb);
    res.status(200).send("Videogame creado con exito");//puedo poner que devuelva el creado videogameCreated
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});
router.get("/videogames", async (req, res, next) => {
  const name = req.query.name; //aplico ambas busquedas con name o sin name

  let videogamesTodos = await getAllVideogames();
  if (name) {
    const newname = name
      .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
      .replace(' ', "-")
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
});

router.get("/videogames/:id", async (req, res) => {
  const idDetail = req.params.id;

  try {
    let video = await getIdAll(idDetail);
    res.status(200).json(video);
  } catch (err) {
    console.log(err);
  }
});*/