import axios from "axios";
// Aca declaro las variables donde tengo el action types.
export const GET_VIDEOGAMES = "GET_VIDEOGAMES"; //hecho a verificar
export const GET_GENRES = "GET_GENRES"; //hecho a verificar
export const GET_VIDEOGAME_BYID = "GET_VIDEOGAME_BYID"; //hecho a verificar
export const GET_VIDEOGAMES_NAME = "GET_VIDEOGAMES_NAME"; //hecho a verificar
export const VIDEOGAME_CREATE = "VIDEOGAME_CREATE"; //hecho a verificar
export const FILTER_VIDEOGAME_GENRE = "FILTER_VIDEOGAME_GENRE"; //hecho a verificar
export const FILTER_VIDEOGAME_CREATED_IN = "FILTER_VIDEOGAME_CREATED_IN"; //hecho a verificar
export const ORDER_BY_NAME = "ORDER_BY_NAME"; //hecho a verificar
export const ORDER_BY_RATING = "ORDER_BY_RATING"; //hecho a verificar

export function getAllVideogames() {
  return async function (dispatch) {
    let response = await axios.get("http://localhost:3001/videogames");
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: response.data,
    });
  };
}

export function getGenres() {
  return async function (dispatch) {
    let response = await axios.get("http://localhost:3001/genres");
    return dispatch({
      type: "GET_GENRES",
      payload: response.data,
    });
  };
}

export function getVideogameById(id) {

  return async function(dispatch){
    try{
      let detail = await axios.get(`http://localhost:3001/videogames/${id.id}`);
        console.log(detail.data)
        return dispatch({
          type: "GET_VIDEOGAME_BYID",
          payload: detail.data
        });
      } catch (error) {
        console.log(error);
      }
    }
}

export function cleanDetail(){
  return{
      type: 'CLEAN_DETAIL'
  }
}



export function getVideogameByName(name) {
  return async function (dispatch) {
    try {
      let response = await axios.get(
        "http://localhost:3001/videogames?name=" + name);
    
      return dispatch({
        type: "GET_VIDEOGAMES_NAME",
        payload: response.data,
      });
    } catch (error) {
      alert("Sorry we can not find the videogame requested 😕");
    }
  };
}

export function videogameCreate(payload) {
  return async function () {
    const response = await axios.post(
      "http://localhost:3001/videogames",
      payload
    )
    return response;
  };
}

export function filterGamesByGenre(payload) {
  //el payload es el value del input
  return {
    type: "FILTER_VIDEOGAME_GENRE",
    payload,
  };
}

export function filterCreatedIn(payload) {
  //debe solicitar api o db
  return {
    type: "FILTER_VIDEOGAME_CREATED_IN",
    payload,
  };
}

export function orderByName(payload) {
  //asc y desc
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}
export function orderByRating(payload) {
  return {
    type: "ORDER_BY_RATING",
    payload,
  };
}
