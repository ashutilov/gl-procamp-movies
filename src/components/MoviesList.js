import React from "react";
import MovieCard from "./MovieCard";

const MoviesList = ({ movies, deleteMovie }) => {
  const emptyMessage = <p>There are no movies yet...</p>;

  const MoviesList = (
    <div className="ui cards movie-list">
      {movies.map((movie, index) => (
        <MovieCard movie={movie} key={index} deleteMovie={deleteMovie} />
      ))}
    </div>
  );

  return <div>{movies.length === 0 ? emptyMessage : MoviesList}</div>;
};

export default React.memo(MoviesList);
