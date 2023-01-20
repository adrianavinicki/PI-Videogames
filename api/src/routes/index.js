const { Router } = require("express");
const { API_KEY, API_URL } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const e = require("express");
const router = Router();


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

