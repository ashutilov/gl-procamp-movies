import React, { useEffect } from "react";
import { connect } from "react-redux";
import MoviesList from "./MoviesList";
import { fetchMovies, deleteMovie } from "../store/actions/movies";

const MoviesTop = ({ movies, fetchMovies, deleteMovie }) => {
  useEffect(() => {
    fetchMovies();
  });

  return (
    <div className="ui form padded segment">
      <h1>TOP-3 movies</h1>
      <MoviesList
        movies={movies.sort((a, b) => b.rating > a.rating).slice(0, 3)}
        deleteMovie={deleteMovie}
      />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    movies: state.movies,
  };
}

export default connect(mapStateToProps, { fetchMovies, deleteMovie })(
  MoviesTop
);
