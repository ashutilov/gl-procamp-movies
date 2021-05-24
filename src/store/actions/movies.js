import * as actionTypes from "./actionTypes";

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function setMovies(movies) {
  return {
    type: actionTypes.SET_MOVIES,
    movies,
  };
}

export function addMovie(movie) {
  return {
    type: actionTypes.ADD_MOVIE,
    movie,
  };
}

export function movieUpdated(movie) {
  return {
    type: actionTypes.MOVIE_UPDATED,
    movie,
  };
}

export function movieDeleted(movieId) {
  return {
    type: actionTypes.MOVIE_DELETED,
    movieId,
  };
}

export function movieFetched(movie) {
  return {
    type: actionTypes.MOVIE_FETCHED,
    movie,
  };
}

export function saveMovie(data) {
  return (dispatch) => {
    return fetch("/api/movies", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(handleResponse)
      .then((data) => dispatch(addMovie(data.movie)));
  };
}

export function fetchMovies() {
  return (dispatch) => {
    fetch("/api/movies")
      .then(handleResponse)
      .then((data) => dispatch(setMovies(data.movies)));
  };
}

export function updateMovie(data) {
  return (dispatch) => {
    fetch(`/api/movies/${data.id}`, {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(handleResponse)
      .then((data) => dispatch(movieUpdated(data.movie)));
  };
}

export function deleteMovie(id) {
  return (dispatch) => {
    fetch(`/api/movies/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(handleResponse)
      .then((data) => dispatch(movieDeleted(id)));
  };
}

export function fetchMovie(id) {
  return (dispatch) => {
    fetch(`/api/movies/${id}`)
      .then((res) => res.json())
      .then((data) => {
        //console.log('data: ' + JSON.stringify(data));
        dispatch(movieFetched(data.movie));
      });
  };
}
