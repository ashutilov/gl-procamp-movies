import {
  SET_MOVIES,
  ADD_MOVIE,
  MOVIE_FETCHED,
  MOVIE_UPDATED,
  MOVIE_DELETED
} from '../actions';

export default function movies(state = [], action = {}) {
  switch (action.type) {
    case ADD_MOVIE:
      return [...state, action.movie];

    case MOVIE_FETCHED:
      const index = state.findIndex(item => item.id === action.movie.id);
      if (index > -1) {
        return state.map(item => {
          if (item.id === action.movie.id) return action.movie;
          return item;
        });
      } else {
        return [...state, action.movie];
      }

    case MOVIE_UPDATED:
      return state.map(item => {
        if (item.id === action.movie.id) return action.movie;
        return item;
      });

    case MOVIE_DELETED:
      return state.filter(item => item.id !== action.movieId);

    case SET_MOVIES:
      return action.movies;

    default:
      return state;
  }
}
