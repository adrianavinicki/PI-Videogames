const axios = require("axios"); // instale axios para hacer las consultas a api, con
require("dotenv").config(); //primeromejor traer el axios
const { API_KEY, API_URL } = process.env;
const { Videogame, Genre } = require("../db");

// Traigo info de la api
/*GET /videogames:
Obtener un listado de los videojuegos
Debe devolver solo los datos necesarios para la ruta principal, 

Ruta principal: debe contener

[ ] Input de búsqueda para encontrar videojuegos por nombre
[ ] Área donde se verá el listado de videojuegos. Deberá mostrar su:
Imagen
Nombre
Géneros
[ ] Botones/Opciones para filtrar por género y por videojuego existente o agregado por nosotros
[ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los videojuegos por orden alfabético y por rating
[ ] Paginado para ir buscando y mostrando los siguientes videojuegos, 15 juegos por pagina, mostrando los primeros 15 en la primer pagina.
IMPORTANTE: Dentro de la Ruta Principal se deben mostrar tanto los videjuegos traidos desde la API como así también los de la base de datos.
 Debido a que en la API existen alrededor de 500 mil juegos, por cuestiones de performance pueden tomar la simplificación de obtener 
 y paginar los primeras 100.*/

 const getApiData = async () => {
  // debe ser asyncronico porque no sabes cuanto tarda la api en contestar
    let apiInfo = [];
    let pag = [];
    for (let i = 1; i <= 5; i++) {
      pag = await axios.get(`${API_URL}?key=${API_KEY}&page=${i}`, {
        headers: { "Accept-Encoding": "identity" },
      }); // ?al colocar el page size toma un limite  de 40 ids no importa la cantidad que coloco
      apiInfo = apiInfo.concat(pag.data.results);
    };
    let apiInfoTotal = apiInfo.map((video) => {
      return {
        id: video.id,
        name: video.name,
        slug: video.slug,
        description: "to be complete",
        released: video.released,
        rating: video.rating,
        platforms: video.platforms.map((el) => el.platform.name),
        background_image: video.background_image,
        genre: video.genres.map((el) => el.name),
        createdInDb : false
      };
    });
    return apiInfoTotal;
  }


module.exports = { getApiData };

/*const getApiData = async () => {
  // debe ser asyncronico porque no sabes cuanto tarda la api en contestar
  let apiInfo = [];

  const pageOne = await axios.get(`${API_URL}?key=${API_KEY}&page=1`, {
    headers: { "Accept-Encoding": "identity" },
  }); // ?al colocar el page size toma un limite  de 40 ids no importa la cantidad que coloco
  const pageTwo = await axios.get(`${API_URL}?key=${API_KEY}&page=2`, {
    headers: { "Accept-Encoding": "identity" },
  });
  const pageThree = await axios.get(`${API_URL}?key=${API_KEY}&page=3`, {
    headers: { "Accept-Encoding": "identity" },
  });
  const pageFour = await axios.get(`${API_URL}?key=${API_KEY}&page=4`, {
    headers: { "Accept-Encoding": "identity" },
  });
  const pageFive = await axios.get(`${API_URL}?key=${API_KEY}&page=5`, {
    headers: { "Accept-Encoding": "identity" },
  });

  apiInfo = pageOne.data.results.concat(
    pageTwo.data.results,
    pageThree.data.results,
    pageFour.data.results,
    pageFive.data.results
  );

  let apiInfoTotal = apiInfo.map((video) => {
    return {
      id: video.id,
      name: video.name,
      slug: video.slug,
      released: video.released,
      rating: video.rating,
      platforms: video.platforms.map((el) => el.platform.name),
      background_image: video.background_image,
      genre: video.genres.map((el) => el.name),
    };
  });

  return apiInfoTotal;
};*/

/*let apiInfoTotal = apiInfo.map(async (video) => {
      const {
        id,
        name,
        slug,
        released,
        rating,
        platforms,
        background_image,
        genre,
      } = video;*/



     /* async function getFillData(req, res, next) {
        // debe ser asyncronico porque no sabes cuanto tarda la api en contestar
        try {
          let apiInfo = [];
          let pag = [];
          for (let i = 1; i <= 5; i++) {
            pag = await axios.get(`${API_URL}?key=${API_KEY}&page=${i}`, {
              headers: { "Accept-Encoding": "identity" },
            }); // ?al colocar el page size toma un limite  de 40 ids no importa la cantidad que coloco
            apiInfo = apiInfo.concat(pag.data.results);
          }
          const apiInfoTotal = apiInfo.map(async (video) => {
            return {
              idApi: video.id,
              name: video.name,
              slug: video.slug,
              description: "to be complete",
              released: video.released,
              rating: video.rating,
              platforms: video.platforms.map((el) => el.platform.name),
              background_image: video.background_image,
              genre: video.genres.map((el) => el.name),
            };
          });
          console.log("esto es: ", apiInfoTotal);
          await Videogame.bulkCreate(apiInfoTotal).then(() =>
            console.log("Db have been uploaded")
          );
      
          const genres = apiInfo.map((e) => e.genre);
          const genreNoRepetidos = [...new Set(genres)];
          genreNoRepetidos.map(async (genre) => {
            await Genre.create({
              name: genre,
            });
          });
          res.status(200).json(getInfoTotal);
        } catch (err) {
          next(err);
        }
      }*/