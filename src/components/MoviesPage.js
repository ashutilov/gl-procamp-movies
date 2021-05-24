import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import MoviesList from "./MoviesList";
import { fetchMovies, deleteMovie } from "../store/actions/movies";

const MoviesPage = () => {
  const allMovies = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const deleteHandler = useCallback(
    (props) => {
      dispatch(deleteMovie(props));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <div className="ui form padded segment">
      <h1>All movies</h1>
      <MoviesList movies={allMovies} deleteMovie={deleteHandler} />
    </div>
  );
};

export default React.memo(MoviesPage);
