const axios = require("axios"); // instale axios para hacer las consultas a api, con
require("dotenv").config(); //primeromejor traer el axios
const { API_KEY, API_URLGenres } = process.env;
const { Genre } = require('../db.js')

/*[ ] GET /genres:
  Obtener todos los tipos de géneros de videojuegos posibles
  En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí*/

const getGenres = async () => {
  // debe ser asyncronico porque no sabes cuanto tarda la api en contestar
  const apiGenre = await axios.get(`${API_URLGenres}?key=${API_KEY}`,{headers:{'Accept-Encoding':'identity'}})// ?al colocar el page size toma un limite  de 40 ids no importa la cantidad que coloco
  /*.then((res) => console.log(res));*/
    .then((res) =>
      res.data.results.map((el) => {
      return {
        name: el.name, 
      };
    })
  );
  apiGenre.forEach(el => { 
    Genre.findOrCreate({
      where: {name: el.name}
    })
  })
  //return apiGenre;
  const genDb = await Genre.findAll();
  return genDb;
};





module.exports = { getGenres };


