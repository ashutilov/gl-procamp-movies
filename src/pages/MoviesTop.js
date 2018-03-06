import React from 'react';
import { connect } from 'react-redux';
import MoviesList from './MoviesList';
import PropTypes from 'prop-types';
import { fetchMovies, deleteMovie } from '../actions';

class MoviesTop extends React.Component {
  componentDidMount() {
    this.props.fetchMovies();
  }
  render() {
    return (
      <div className="ui form padded segment">
        <h1>TOP-3 movies</h1>
        <MoviesList
          movies={(this.props.movies).sort((a,b) => b.rating>a.rating).slice(0,3)}
          deleteMovie={this.props.deleteMovie}
        />
      </div>
    );
  }
}

MoviesTop.propTypes = {
  movies: PropTypes.array.isRequired,
  fetchMovies: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    movies: state.movies
  };
}

export default connect(mapStateToProps, { fetchMovies, deleteMovie })(
  MoviesTop
);
