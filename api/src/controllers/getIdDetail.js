const axios = require("axios"); // instale axios para hacer las consultas a api, con
require("dotenv").config(); //primeromejor traer el axios
const { API_KEY, API_URL } = process.env;

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


const getIdDetail = async (idVideogame) => {
    if(!idVideogame){
        return "El id ingresado no es valido";
    } 
    const apiIdInfo = await axios.get(`${API_URL}/${idVideogame}?key=${API_KEY}`,{headers:{'Accept-Encoding':'identity'}})
      .then((res) =>
      res.data.results.map((video) => {
        return {
          name: video.name,
          description: video.description,
          released: video.released,
          rating: video.rating,
          platforms: video.platforms.map(el => el.platform.name),
          background_image: video.background_image,
          genre: video.genres.map(el => el.name)
        };
      })
    );
    return apiIdInfo;
  };
  
  
  
  
  
  module.exports = { getIdDetail };  

