import React from 'react';
import classnames from 'classnames';

class MovieForm extends React.Component {
  state = {
    id: this.props.movie ? this.props.movie.id : null,
    title: this.props.movie ? this.props.movie.title : '',
    cover: this.props.movie ? this.props.movie.cover : '',
    year: this.props.movie ? this.props.movie.year : '',
    description: this.props.movie ? this.props.movie.description : '',
    rating: this.props.movie ? this.props.movie.rating : '',
    errors: {},
    loading: false
  };

  componentWillReceiveProps = nextProps => {
    this.setState({
      id: nextProps.movie.id,
      title: nextProps.movie.title,
      cover: nextProps.movie.cover,
      year: nextProps.movie.year,
      description: nextProps.movie.description,
      rating: nextProps.movie.rating
    });
  };

  handleChange = e => {
    if (!!this.state.errors[e.target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name];
      this.setState({
        [e.target.name]: e.target.value,
        errors
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    /* validation */
    let errors = {};
    if (this.state.title === '') errors.title = 'Can not be empty';
    if (this.state.cover === '') errors.cover = 'Can not be empty';
    if (this.state.year === '') errors.year = 'Can not be empty';
    if (this.state.description === '') errors.description = 'Can not be empty';
    if (this.state.rating === '') errors.rating = 'Can not be empty';

    this.setState({ errors });

    const isValid = Object.keys(errors).length === 0;

    if (isValid) {
      const { id, title, cover, year, description, rating } = this.state;
      this.setState({ loading: true });
      
      this.props
        .saveMovie({ id, title, cover, year, description, rating })
        /*.catch(err =>
          err.response
            .json()
            .then(({ errors }) => this.setState({ errors, loading: false }))
        );*/
        
    }
  };

  render() {
    const form = (
      <form
        className={classnames('ui', 'form', 'padded', 'segment', {
          loading: this.state.loading
        })}
        onSubmit={this.handleSubmit}
      >
        <h1>Edit / add new movie</h1>

        {!!this.state.errors.global && (
          <div className="ui negative message">
            <p>{this.state.errors.global}</p>
          </div>
        )}

        <div
          className={classnames('field', { error: !!this.state.errors.title })}
        >
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <span>{this.state.errors.title}</span>
        </div>

        <div
          className={classnames('field', { error: !!this.state.errors.year })}
        >
          <label htmlFor="year">Year</label>
          <input
            id="year"
            type="number"
            name="year"
            value={this.state.year}
            onChange={this.handleChange}
          />
          <span>{this.state.errors.year}</span>
        </div>

        <div
          className={classnames('field', { error: !!this.state.errors.description })}
        >
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <span>{this.state.errors.description}</span>
        </div>

        <div
          className={classnames('field', { error: !!this.state.errors.rating })}
        >
          <label htmlFor="rating">Rating</label>
          <input
            id="rating"
            type="number"
            name="rating"
            min="1"
            max="10"
            value={this.state.rating}
            onChange={this.handleChange}
          />
          <span>{this.state.errors.rating}</span>
        </div>

        <div
          className={classnames('field', { error: !!this.state.errors.cover })}
        >
          <label htmlFor="cover">Cover URL</label>
          <input
            id="cover"
            type="text"
            name="cover"
            value={this.state.cover}
            onChange={this.handleChange}
          />
          <span>{this.state.errors.cover}</span>
        </div>

        <div className="field">
          {this.state.cover !== '' && (
            <img
              src={this.state.cover}
              alt="cover"
              className="ui small bordered image"
            />
          )}
        </div>

        <div className="field">
          <button className="ui primary button">Save</button>
        </div>
      </form>
    );
    return <div>{form}</div>;
  }
}

export default MovieForm;
