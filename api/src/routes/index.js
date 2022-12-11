const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const e = require('express');

const router = Router();

const { getAllVideogames } = require('../controllers/getAllVideogames');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/videogames", async (req, res) => {
  
    try {
      let allVideo = await getAllVideogames();
      res.status(200).json(allVideo);
    } catch (err) {
      console.log(err);
    }
  });
  
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


