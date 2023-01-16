const axios = require("axios"); // instale axios para hacer las consultas a api, con
const { INTEGER } = require("sequelize");
require("dotenv").config(); //primeromejor traer el axios
const { API_KEY, API_URL } = process.env;
const { getAllVideogames } = require("./getAllVideogames");
const { Videogame, Genre } = require('../db');

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
      const game = await Videogame.findByPk(idDetail);
      if (!game) return console.log("not found");
      else
        return {
          game,
          include: {
            model: Genre,
            attributes: ["name"], //aca va lo unico que quiero igualmentente no hay mas
            through: {
              attributes: [],
            },
          },
        };
    } else {
       let idDet = Number(idDetail); //se convierte el id en numero por si ingresa como string
      if (Number.isInteger(idDet)) {
        var gameId = await axios.get(`${API_URL}/${idDetail}?key=${API_KEY}`, {
          headers: { "Accept-Encoding": "identity" },
        });
        console.log(gameId)
        return {
          id: gameId.data.id,
          name: gameId.data.name,
          description: gameId.data.description,
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
}

module.exports = { getIdDetail };

/*if(idVideogame){
    const response = (await axios.get(`${API_URL}/${idVideogame}?key=${API_KEY}`,{headers:{'Accept-Encoding':'identity'}})).data
    const { background_image, name, genres, description, released, rating, parent_platforms} = response
    
    const apiIdInfo = {
      background_image, //no viene la imagen completa
      name, // el nombre me da indefinido
      genre: genres.map(g => g.name),
      description,
      released,
      rating, // tampoco me da y me pone cero
      platforms: parent_platforms.map(p => p.platform.name)
    }
  ;
    */

//.then((res) => {
/*console.log(res.name);
      console.log(res.description);
      console.log(res.released);
      console.log(res.rating);*/
// console.log(response.config);
// });
//.then((res) => {
// console.log(res.data[idVideogame].description);
//});
/*response = Object.entries((res) => {res.data.result})
        response.map(
        {
          name: video.name,
          description: video.description,
          released: video.released,
          rating: video.rating,
          platforms: video.platforms.map(el => el.platform.name),
          background_image: video.background_image,
          genre: video.genres.map(el => el.name)
        })
      }
    ;*/
/* return apiIdInfo;
   } return "El ID solicitado no fue encontrado" */
/*if(!isNumber(idVideogame) || idVideogame === null){ return "El Id ingresado es incorrecto";
  }
  else{
    const request = await axios.get(`${API_URL}/${idVideogame}?key=${API_KEY}`,{headers:{'Accept-Encoding':'identity'}});
    const apiIdDetail = {
      background_image: request.data.background_image,
      name: request.data.name,
      genre: request.data.genres.map(g => g.name),
      description: request.data.description,
      released: request.data.released,
      rating: request.data.rating,
      platforms: parent_platforms.map(p => p.platform.name)
    } 
  } return apiIdDetail;
};*/

/*if (!(id)){
  //Search videogame in the Api
       var idkey = parseInt(id)
       const result = await axios.get(`${API_URL}/${idkey}?key=${API_KEY}`,{headers:{'Accept-Encoding':'identity'}})
       console.log("este es el :", result)
       if (result.data.id) {
          let genrestr=[]
          for (i=0;i<result.data.genres.length;i++) {
              genrestr.push(result.data.genres[i].name)
          } 
          let platformstr=[]
          for (i=0;i<result.data.platforms.length;i++) {
            platformstr.push(result.data.platforms[i].platform.name)
          } 
          const searchapivg = {
            name: result.data.name,
            platforms: platformstr.toString(),
            released: result.data.released, 
            image: result.data.background_image,
            description: result.data.description.replace(/<[^>]+>/g, ''),
            rating: result.data.rating,
            genres: genrestr.toString()
          }
          return searchapivg;
       }
    }
    return "El Id ingresado no corresponde a un videogame";*/
