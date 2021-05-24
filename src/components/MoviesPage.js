import React, { useEffect } from "react";
import { connect } from "react-redux";
import MoviesList from "./MoviesList";
import { fetchMovies, deleteMovie } from "../store/actions/movies";

const MoviesPage = ({ fetchMovies, movies, deleteMovie }) => {
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="ui form padded segment">
      <h1>All movies</h1>
      <MoviesList movies={movies} deleteMovie={deleteMovie} />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    movies: state.movies,
  };
}

export default connect(mapStateToProps, { fetchMovies, deleteMovie })(
  MoviesPage
);
