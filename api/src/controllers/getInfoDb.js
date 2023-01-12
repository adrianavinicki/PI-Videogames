require("dotenv").config(); //primeromejor traer el axios
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const { Videogame, Genre } = require("../db"); // es necesario traer los modelos directos de su carpeta o con traerlos de la db ya estaria?

// Traigo info de mi base de datos

const getInfoDb = async () => {
  const videogameDb = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"], //aca va lo unico que quiero
      through: {
        attributes: [],
      },
    },
  });

  // console.log("esto es :", videogameDb[0].dataValues.genres[0].name);
 /* let genarr = [];
  videogameDb.map((el) => {
    el.genres.map((g) => {
      genarr.push(g.name);
    });
  });*/

  //agregar entre llaves un genre sobre el videogameDb

  //console.log("esto es :", videogameDb);
  //return videogameDb;
  let dbInfoTotal = videogameDb.map((video) => {
    return {
      id: video.id,
      name: video.name,
      slug: video.slug,
      description: video.description,
      released: video.released,
      rating: video.rating,
      platforms: video.platforms,
      background_image: video.background_image,
      genre: video.genres.map((el) => el.name),
      createdInDb: video.createdInDb,
    };
  });
  return dbInfoTotal;
};

module.exports = { getInfoDb };
