const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const e = require('express');

const router = Router();

const { getAllVideogames } = require('../controllers/getAllVideogames');
const { getIdAll} = require('../controllers/getIdAll');
const { getGenresApi } = require('../controllers/getGenresApi');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/videogames", async (req, res, next) => { 
  const name = req.query.name; //aplico ambas busquedas con name o sin name
  
    let videogamesTodos =  await getAllVideogames();
    if (name){
        const newname= name.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'').replace(/' '/g,'-').toLowerCase();
        let videogameName = await videogamesTodos.filter(el => el.slug.includes(newname)); 
        videogameName.length ? // me falta el limite de 15 videojuegos cuando se envia un name
        res.status(200).send(videogameName):
        res.status(404).send('No se encuentra el videojuego requerido');
    } else{
        res.status(200).send(videogamesTodos)
    }
    
  });

router.get("/videogames/:id", async (req, res) => {
  const idDetail = req.params.id;
  
    try {
      let video = await getIdAll(idDetail);
      res.status(200).json(video);
    } catch (err) {
      console.log(err);
    }
  });
  

router.get("/genres", async (req, res) => {
  try {
    let getGenres = await getGenresApi();
    res.status(200).json(getGenres);
  } catch (err) {
    console.log(err);
  }
});
  
/* POST /videogames:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
Crea un videojuego en la base de datos, relacionado a sus géneros.*/
router.post("/videogames", async (req, res) => {
  let {
    id,
    name,
    slug,
    description,
    released,
    rating,
    platforms,
    background_image,
    createdInDb,
    genre
  } = req.body;

  let videogameCreated = await Videogame.create({
    id,
    name,
    slug,
    description,
    released,
    rating,
    platforms,
    background_image,
    createdInDb
  })  
   let genreDb = await Genre.findAll({
    where: { name: genre }
   })
 })






  
  module.exports = router;

//const { id, name, description, released, rating, platforms, background_image } = req.body;

/*router.get('/videogames', async (req, res) =>{
    const name = req.query.name; //aplico ambas busquedas con name o sin name
    let videogamesTodos =  await getAllVideogames();
    if (name){
        let videogameName = await videogamesTodos.filter(el => el.name.toLowerCase().includes(name.toLowerCase())); // pongo todo en lower case para asegurarme que pueda compararse
        videogameName.length ? // me falta el limite de 15 videojuegos cuando se envia un name
        res.status(200).send(videogameName):
        res.status(404).send('No se encuentra el videojuego requerido');
    } else{
        res.status(200).send(videogamesTodos)
    }
})*/

/*const getVideogamesById = router.get('/:id', async (req, res, next) => {
  const { id } = req.params

  try {
    const regex = /([a-zA-Z]+([0-9]+[a-zA-Z]+)+)/
    if (regex.test(id)) {
      const fromDB = await videogameByIdDB(id)
      return res.json(fromDB)
      
    } else  {
      const fromAPI = await getVideogameById(id)
      console.log(fromAPI)
      return res.json(fromAPI)
    } 

  } catch (error) {
    next(error)
  }
});*/
/*try {
  let allVideo = await getAllVideogames();
  res.status(200).json(allVideo);
} catch (err) {
  console.log(err);
}*/
/*
  router.get("/videogames?name", async (req, res) => { 
    const { apiName } = req.query;
    
      try {
        let game = await getApiName(apiName);
        res.status(200).json(game);
      } catch (err) {
        console.log(err);
      }
    });*/
