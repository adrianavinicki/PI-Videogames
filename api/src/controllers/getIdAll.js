const { getIdDetail } = require("./getIdDetail");
const { getIdDetailDb } = require("./getIdDetailDb");

const getIdAll = async (idDet) =>{
    const idDetail = await getIdDetail(idDet);
    //const idDb = await getIdDetailDb();
    //const idAll = idDetail.concat(idDb);
    return idDetail; // hay que descomentar el 6 y el 7 y devolver idAll
  }

  module.exports = { getIdAll }; 