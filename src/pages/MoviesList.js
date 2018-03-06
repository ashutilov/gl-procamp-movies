import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';

export default function MoviesList({ movies, deleteMovie}) {
  const emptyMessage = <p>There are no movies yet...</p>;

  const MoviesList = (
    <div className="ui four cards">
      {movies.map(movie => <MovieCard movie={movie} key={movie.id} deleteMovie={deleteMovie}/>)}
    </div>
  );

  return <div>{movies.length === 0 ? emptyMessage : MoviesList}</div>;
}

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  deleteMovie: PropTypes.func.isRequired
};
