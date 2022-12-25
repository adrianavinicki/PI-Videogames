//const axios = require('axios'); // instale axios para hacer las consultas a api, con 
//require('dotenv').config(); //primeromejor traer el axios
//const { API_KEY } = process.env; 
const { findAll } = require('sequelize');
const Videogame = require('../models/Videogame'); // es necesario traer los modelos directos de su carpeta o con traerlos de la db ya estaria?
const Genre = require('../models/Genre'); // idem arriba

// Traigo info de mi base de datos

const getInfoDb = async () => {
    return await Videogame.findAll({ //es videogames o videogame???
        include: {
            model: Genre,
            attributes: ['name'], //aca va lo unico que quiero igualmentente no hay mas
            through: {
                attributes: []
            }
        }

    })
}

module.exports = { getInfoDb };     