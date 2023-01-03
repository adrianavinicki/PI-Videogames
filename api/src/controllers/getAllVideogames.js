const { getApiData } = require("./getApiData");
const { getInfoDb } = require("./getInfoDb");

const getAllVideogames = async () =>{
    const apiData = await getApiData();
    const infoDb = await getInfoDb();
    const infoTotal = apiData.concat(infoDb);
    return infoTotal; 
  }

  module.exports = { getAllVideogames };