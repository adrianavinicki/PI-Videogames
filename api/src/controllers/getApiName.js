const axios = require("axios"); // instale axios para hacer las consultas a api, con
require("dotenv").config(); //primeromejor traer el axios
const { API_KEY, API_URL } = process.env;

// Traigo info de la api
/*[ ] GET /videogames?name="...":
Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
Si no existe ningún videojuego mostrar un mensaje adecuado*/
const getApiName = async () => {
 
  const apiInfo = await axios.get(`${API_URL}?key=${API_KEY}`,{headers:{'Accept-Encoding':'identity'}})
  /*.then((res) => console.log(res));*/
    .then((res) =>
    res.data.results.map((video) => {
      return {
        id: video.id,
        name: video.name,
        //description: video.slug,
        released: video.released,
        rating: video.rating,
        platforms: video.platforms.map(el => el.platform.name),
        background_image: video.background_image,
      };
    })
  );
  return apiInfo;
};





module.exports = { getApiName };