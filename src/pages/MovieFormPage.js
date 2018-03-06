import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { saveMovie, fetchMovie, updateMovie } from '../actions';
import MovieForm from './MovieForm';

class MovieFormPage extends React.Component {
  state = {
    redirect: false
  };

  componentDidMount = () => {
    const { match } = this.props;
    if (match.params.id) {
      this.props.fetchMovie(match.params.id);
    }
  };

  saveMovie = ({ id, title, cover, year, description, rating }) => {
    if (id) {
      /* not good! redirect should be chenged as result of callaback of updateMovie */
      const result = this.props.updateMovie({
        id,
        title,
        cover,
        year,
        description,
        rating
      });
      this.setState({ redirect: true });
      return result;
      /*
      return this.props.updateMovie({ title, cover, year, description, rating }).then(() => {
        this.setState({ redirect: true });
      });
      */
    } else {
      /* not good! redirect should be chenged as result of callaback of saveMovie */
      const result = this.props.saveMovie({
        id,
        title,
        cover,
        year,
        description,
        rating
      });
      this.setState({ redirect: true });
      return result;
      /*
      return this.props.saveMovie({ title, cover, year, description, rating }).then(() => {
        this.setState({ redirect: true });
      });
      */
    }
  };

  render() {
    return (
      <div>
        {this.state.redirect ? (
          <Redirect to="/movies" />
        ) : (
          <MovieForm movie={this.props.movie} saveMovie={this.saveMovie} />
        )}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { match } = props;
  if (match.params.id) {
    return {
      movie: state.movies.find(item => item.id === match.params.id)
    };
  }

  return { movie: null };
}

export default connect(mapStateToProps, { saveMovie, fetchMovie, updateMovie })(
  MovieFormPage
);
