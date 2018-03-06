import React from 'react';
import { connect } from 'react-redux';
import MoviesList from './MoviesList';
import PropTypes from 'prop-types';
import { fetchMovies, deleteMovie } from '../actions';
//import { Pagination } from 'semantic-ui-react';

class MoviesPage extends React.Component {
  componentDidMount() {
    this.props.fetchMovies();
  }
  render() {
    return (
      <div className="ui form padded segment">
        <h1>All movies</h1>
        <MoviesList
          movies={this.props.movies}
          deleteMovie={this.props.deleteMovie}
        />
      </div>
    );
  }
}

MoviesPage.propTypes = {
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
  MoviesPage
);
