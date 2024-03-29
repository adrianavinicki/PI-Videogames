const initialState = {
  videogames: [],
  allVideogames: [],
  genres: [],
  videogameById: [],
  videogameCreate: null,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload, 
      };

    case "GET_GENRES":
      return {
        ...state,

        genres: action.payload,
      };

    case "GET_VIDEOGAME_BYID":
      return {
        ...state,
        videogameById: action.payload,

      };

    case "CLEAN_DETAIL":
      return {
        ...state,
        videogameById: [],
      };

    case "GET_VIDEOGAMES_NAME":
      return {
        ...state,
        videogames: action.payload,
      };

    case "VIDEOGAME_CREATE":
      return {
        ...state,
        videogames: action.payload
        
      };

    case "RESET": 
      return {
        ...state,
        videogames: [],
      };

    case "FILTER_VIDEOGAME_GENRE":
      const allGames = state.allVideogames; 
      const genresFilter =
        action.payload === "All"
          ? state.allVideogames
          : allGames.filter((el) => el.genre.includes(action.payload));
      return {
        ...state,
        videogames: genresFilter,
      };

    case "FILTER_VIDEOGAME_CREATED_IN":
      const filterCreatedIn =
        action.payload === "Created"
          ? state.allVideogames.filter((el) => el.createdInDb)
          : state.allVideogames.filter((el) => !el.createdInDb);
      return {
        ...state,
        videogames:
          action.payload === "All" ? state.allVideogames : filterCreatedIn,
      };

    case "ORDER_BY_NAME":
      let sortGame =
        action.payload === "Asc"
          ? state.videogames.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: sortGame,
      };

    case "ORDER_BY_RATING":
      let sortByRating =
        action.payload === "Low"
          ? state.videogames.sort(function (a, b) {
              if (a.rating > b.rating) {
                return 1;
              }
              if (b.rating > a.rating) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.rating > b.rating) {
                return -1;
              }
              if (b.rating > a.rating) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: sortByRating,
      };

    default:
      return state;
  }
}
