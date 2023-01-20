const { Genre } = require("../db.js");
const axios = require("axios"); // instale axios para hacer las consultas a api, con
require("dotenv").config(); //primeromejor traer el axios
const { API_KEY, API_URLGenres } = process.env;

/* GET /genres:
  Obtener todos los tipos de géneros de videojuegos posibles
  En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí*/

async function getGenre(req, res, next) {
  try {
    let findGenDb = Genre.findAll()
    if(findGenDb.length > 0){
      res.status(200).send(findGenDb.map(d=> d.name))
    }else{
    const apiGenre = await axios
      .get(`${API_URLGenres}?key=${API_KEY}`, {
        headers: { "Accept-Encoding": "identity" },
      }) 
    
const infoApiUrl = apiGenre.data.results.map(g => g.name)
         infoApiUrl.forEach(el => {
                Genre.findOrCreate({
                    where: {name: el}
                })
            })

  let otraInfo = await Genre.findAll()
  let utilInfo = otraInfo.map(d => d.name)
   console.log(utilInfo.length)         
  res.status(200).send(utilInfo)
}
}catch(error){
	res.status(404).send('Genre Not Found')
}
        
}
module.exports = { getGenre };

