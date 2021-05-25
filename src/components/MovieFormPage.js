import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveMovie, fetchMovie, updateMovie } from "../store/actions/movies";
import MovieForm from "./MovieForm";

const MovieFormPage = ({ match }) => {
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();
  const movie = useSelector((state) => {
    return match.params.id
      ? {
          ...state.movies.find((item) => item.id === match.params.id),
        }
      : {};
  });

  useEffect(() => {
    if (match.params.id) {
      dispatch(fetchMovie(match.params.id));
    }
  }, [dispatch]);

  const saveMovieHandler = (data) => {
    const { id } = data;

    if (id) {
      /* not good! redirect should be chenged as result of callaback of updateMovie */
      const result = dispatch(updateMovie(data));
      setRedirect(true);
      return result;
      /*
      return this.props.updateMovie({ title, cover, year, description, rating }).then(() => {
        this.setState({ redirect: true });
      });
      */
    } else {
      /* not good! redirect should be chenged as result of callaback of saveMovie */
      const result = dispatch(saveMovie(data));
      setRedirect(true);
      return result;
      /*
      return this.props.saveMovie({ title, cover, year, description, rating }).then(() => {
        this.setState({ redirect: true });
      });
      */
    }
  };

  return (
    <div>
      {redirect ? (
        <Redirect to="/movies" />
      ) : (
        <MovieForm movie={movie} saveMovie={saveMovieHandler} />
      )}
    </div>
  );
};

export default MovieFormPage;
