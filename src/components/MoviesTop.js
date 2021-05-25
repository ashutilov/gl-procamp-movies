import React, { useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import MoviesList from "./MoviesList";
import { fetchMovies, deleteMovie } from "../store/actions/movies";

const MoviesTop = () => {
  const allMovies = useSelector((state) => state.movies);
  const topMovies = useMemo(
    () => allMovies.sort((a, b) => b.rating > a.rating).slice(0, 3),
    [allMovies]
  );
  const dispatch = useDispatch();
  const deleteHandler = useCallback(
    (props) => {
      dispatch(deleteMovie(props));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!allMovies.length) {
      dispatch(fetchMovies());
    }
  }, [dispatch]);

  return (
    <div className="ui form padded segment">
      <h1>TOP-3 movies</h1>
      <MoviesList movies={topMovies} deleteMovie={deleteHandler} />
    </div>
  );
};

export default React.memo(MoviesTop);
