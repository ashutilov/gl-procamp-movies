import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie, deleteMovie}) {
  return (
    <div className="ui card">
      <div className="image movie-image-cover">
        <img src={movie.cover} alt="Movie Cover" className="movie-image" />
      </div>
      <div className="content">
        <div className="header">{movie.title}</div>
        <hr />
        <div className="header">{movie.year}</div>
        <hr />
        <div className="header"><span className="ui green circular label">{movie.rating}</span> / <span className="ui yellow circular label">10</span></div>
        <hr />
        <div className="description">{movie.description}</div>
      </div>
      <div className="extra content">
        <div className="ui two buttons">
          <Link to={`/movie/${movie.id}`} className="ui basic button green">Edit</Link>
          <div className="ui basic button red" onClick={() => deleteMovie(movie.id)}>Delete</div>
        </div>
      </div>
    </div>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  deleteMovie: PropTypes.func.isRequired
};
