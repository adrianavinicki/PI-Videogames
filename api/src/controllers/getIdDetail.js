const axios = require("axios"); // instale axios para hacer las consultas a api, con
const { INTEGER } = require("sequelize");
require("dotenv").config(); //primeromejor traer el axios
const { API_KEY, API_URL } = process.env;

const { Videogame, Genre } = require("../db");

/*[ ] GET /videogame/{idVideogame}:
Obtener el detalle de un videojuego en particular
Debe traer solo los datos pedidos en la ruta de detalle de videojuego
Incluir los géneros asociados
Front
Ruta de detalle de videojuego: debe contener

[ ] Los campos mostrados en la ruta principal para cada videojuegos (imagen, nombre, y géneros)
[ ] Descripción
[ ] Fecha de lanzamiento
[ ] Rating
[ ] Plataformas

GET https://api.rawg.io/api/games/{id}
GET https://api.rawg.io/api/games/3498?key=1c73bcc3a51142028805d6eadc0865ef
*/

const getIdDetail = async (idDetail) => {
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  if (idDetail) {
    if (regexExp.test(idDetail) === true) {
      const game = await Videogame.findOne({
        where: {id: idDetail},
        include: [{ model: Genre }],
      });
      return {
        //game,
        id: game.id,
        name: game.name,
        slug: game.slug,
        description: game.description.replace(/<[^>]*>?/g, ''),
        released: game.released,
        rating: game.rating,
        platforms: game.platforms,
        background_image: game.background_image,
        genre: game.genres.map((el) => el.name),
        createdInDb: game.createdInD
    } 
  }else {
      let idDet = Number(idDetail); //se convierte el id en numero por si ingresa como string
      if (Number.isInteger(idDet)) {
        var gameId = await axios.get(`${API_URL}/${idDetail}?key=${API_KEY}`, {
          headers: { "Accept-Encoding": "identity" },
        });
        console.log(gameId);
        return {
          id: gameId.data.id,
          name: gameId.data.name,
          description: gameId.data.description.replace(/<[^>]*>?/g, ''),
          released: gameId.data.released,
          rating: gameId.data.rating,
          platforms: gameId.data.platforms.map((el) => el.platform.name),
          background_image: gameId.data.background_image,
          genre: gameId.data.genres.map((el) => el.name),
        };
        // res.status(200).send(games)
      }
      return " El Id ingresado no existe ";
    }
  }
  return "no existe";
};

module.exports = { getIdDetail };

