const { Genre } = require("../db.js");
const axios = require("axios"); // instale axios para hacer las consultas a api, con
require("dotenv").config(); //primeromejor traer el axios
const { API_KEY, API_URLGenres } = process.env;

/* GET /genres:
  Obtener todos los tipos de géneros de videojuegos posibles
  En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí*/

async function getGenre(req, res, next) {
  try {
    const apiGenre = await axios
      .get(`${API_URLGenres}?key=${API_KEY}`, {
        headers: { "Accept-Encoding": "identity" },
      }) 
     /* .then((res) =>
        res.data.results.map((el) =>  el.name
        )
      );
    apiGenre.forEach((el) => {
      Genre.findOrCreate({
        where: { name: el },
      });
    });
    const genres = await Genre.findAll();
    return res.status(200).json(genres);
  } catch (err) {
    next(err);
  }
}*/
const infoApiUrl = apiGenre.data.results.map(g => g.name)
         infoApiUrl.forEach(el => {
                Genre.findOrCreate({
                    where: {name: el}
                })
            })

  let otraInfo = await Genre.findAll()
  let utilInfo = otraInfo.map(d => d.name)
            
  res.status(200).send(utilInfo)
}catch(error){
	res.status(404).send('Genre Not Found')
}
        
}
module.exports = { getGenre };

/*const axios = require("axios"); // instale axios para hacer las consultas a api, con
require("dotenv").config(); //primeromejor traer el axios
const { API_KEY, API_URLGenres } = process.env;
const { Genre } = require('../db.js')*/

/*[ ] GET /genres:
  Obtener todos los tipos de géneros de videojuegos posibles
  En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí*/

/*const getGenres = async () => {
  // debe ser asyncronico porque no sabes cuanto tarda la api en contestar
  const apiGenre = await axios.get(`${API_URLGenres}?key=${API_KEY}`,{headers:{'Accept-Encoding':'identity'}})// ?al colocar el page size toma un limite  de 40 ids no importa la cantidad que coloco
  /*.then((res) => console.log(res));*/
/* .then((res) =>
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
};*/
