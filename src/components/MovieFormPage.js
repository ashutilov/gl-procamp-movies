import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { saveMovie, fetchMovie, updateMovie } from "../store/actions/movies";
import MovieForm from "./MovieForm";

const MovieFormPage = ({
  movie,
  match,
  fetchMovie,
  saveMovie,
  updateMovie,
}) => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      fetchMovie(match.params.id);
    }
  }, []);

  saveMovie = ({ id, title, cover, year, description, rating }) => {
    if (id) {
      /* not good! redirect should be chenged as result of callaback of updateMovie */
      const result = updateMovie({
        id,
        title,
        cover,
        year,
        description,
        rating,
      });
      setRedirect(true);
      return result;
      /*
      return this.props.updateMovie({ title, cover, year, description, rating }).then(() => {
        this.setState({ redirect: true });
      });
      */
    } else {
      /* not good! redirect should be chenged as result of callaback of saveMovie */
      const result = saveMovie({
        id,
        title,
        cover,
        year,
        description,
        rating,
      });
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
        <MovieForm movie={movie} saveMovie={saveMovie} />
      )}
    </div>
  );
};

function mapStateToProps(state, props) {
  const { match } = props;
  if (match.params.id) {
    return {
      movie: state.movies.find((item) => item.id === match.params.id),
    };
  }

  return { movie: null };
}

export default connect(mapStateToProps, { saveMovie, fetchMovie, updateMovie })(
  MovieFormPage
);
