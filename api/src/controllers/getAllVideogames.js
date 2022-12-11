const { getApiData } = require("./getApiData");
const { getInfoDb } = require("./getInfoDb");

const getAllVideogames = async () =>{
    const apiData = await getApiData();
    //const infoDb = await getInfoDb();
    //const infoTotal = apiData.concat(infoDb);
    return apiData; // hay que descomentar el 6 y el 7 y devolver infoTotal
  }

  module.exports = { getAllVideogames }; 