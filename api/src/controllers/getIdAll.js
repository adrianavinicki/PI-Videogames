const { getIdDetail } = require("./getIdDetail");
const { getIdDetailDb } = require("./getIdDetailDb");

const getIdAll = async () =>{
    const idDetail = await getIdDetail();
    //const idDb = await getIdDetailDb();
    //const idAll = idDetail.concat(idDb);
    return idDetail; // hay que descomentar el 6 y el 7 y devolver idAll
  }

  module.exports = { getIdAll }; 