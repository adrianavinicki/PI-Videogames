const axios = require("axios"); // instale axios para hacer las consultas a api, con
require("dotenv").config(); //primeromejor traer el axios
const { API_KEY, API_URL } = process.env;

// Traigo info de la api
const getApiData = async () => {
  // debe ser asyncronico porque no sabes cuanto tarda la api en contestar
  const apiInfo = await axios.get(`${API_URL}?key=${API_KEY}`)
  /*.then((res) => console.log(res));*/
    .then((res) =>
    res.data.results.map((video) => {
      return {
        id: video.id,
        name: video.name,
        description: video.slug,
        released: video.released,
        rating: video.rating,
        platforms: video.platforms.map(el => el),
        background_image: video.background_image,
      };
    })
  );
  return apiInfo;
};

console.log(getApiData());

module.exports = { getApiData };

//   platforms: video.platforms.map(el => el),
