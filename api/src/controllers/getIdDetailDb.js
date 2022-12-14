//const axios = require('axios'); // instale axios para hacer las consultas a api, con 
//require('dotenv').config(); //primeromejor traer el axios
//const { API_KEY } = process.env; 
const Videogame = require('../models/Videogame'); // es necesario traer los modelos directos de su carpeta o con traerlos de la db ya estaria?
const Genre = require('../models/Genre'); // idem arriba

// Traigo info de mi base de datos

const getIdDetailDb = async (idVideogame) => {
    const video = await Videogame.findByPk(idVideogame);
    if(!video) return console.log("not found");
    else return {
        name: video.name,
        description: video.description,
        released: video.released,
        rating: video.rating,
        platforms: video.platforms.map(el => el.platform.name),
        background_image: video.background_image,
        genre: video.genres.map(el => el.name)
      };

}

module.exports = { getIdDetailDb };     