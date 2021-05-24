import * as actionTypes from "../actions/actionTypes";

export default function movies(state = [], action = {}) {
  switch (action.type) {
    case actionTypes.ADD_MOVIE:
      return [...state, action.movie];

    case actionTypes.MOVIE_FETCHED:
      const index = state.findIndex((item) => item.id === action.movie.id);
      if (index > -1) {
        return state.map((item) => {
          if (item.id === action.movie.id) return action.movie;
          return item;
        });
      } else {
        return [...state, action.movie];
      }

    case actionTypes.MOVIE_UPDATED:
      return state.map((item) => {
        if (item.id === action.movie.id) return action.movie;
        return item;
      });

    case actionTypes.MOVIE_DELETED:
      return state.filter((item) => item.id !== action.movieId);

    case actionTypes.SET_MOVIES:
      return action.movies;

    default:
      return state;
  }
}
