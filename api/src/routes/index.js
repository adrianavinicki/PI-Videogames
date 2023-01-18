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

/*async (req, res) =>{
const {id} = req.params;
  //  let gamesApi = await getAllVideoGames()
	const url = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
	try{
     if(id.includes('-')) {//detectar UUID en BD
        const gameDb = await Videogame.findOne({
                where: {id},
                include: Genre,
            });
            return res.status(200).send(gameDb)
       } 
		const urlInfo = await axios.get(url, {
      headers: { "Accept-Encoding": "identity" },
    })
		const game = {
        id: urlInfo.data.id,
        name: urlInfo.data.name,
        background_image: urlInfo.data.background_image,
        genre: urlInfo.data.genres.map((el) => el.name),
        released: urlInfo.data.released,
        rating: urlInfo.data.rating,
        platforms: urlInfo.data.platforms.map((el) => el.platform.name),
        description: urlInfo.data.description,

      }
      res.status(200).send(game)
       
	}catch(error){
		res.status(404).send('error')
	}
})*/

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

