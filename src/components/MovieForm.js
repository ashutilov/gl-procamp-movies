import React, { useState } from "react";
import classnames from "classnames";

const DEFAULT_ERROR_TEXT = "Can not be empty";

const MovieForm = ({ movie = {}, saveMovie }) => {
  const [id, setId] = useState(movie.id ? movie.id : null);
  const [title, setTitle] = useState(movie.title ? movie.title : "");
  const [cover, setCover] = useState(movie.cover ? movie.cover : "");
  const [year, setYear] = useState(movie.year ? movie.year : "");
  const [description, setDescription] = useState(
    movie.description ? movie.description : ""
  );
  const [rating, setRating] = useState(movie.rating ? movie.rating : "");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleErrorChange = (e) => {
    if (!!errors[e.target.name]) {
      let errors = { ...errors };
      delete errors[e.target.name];
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    /* validation */
    let errors = {};
    if (title === "") errors.title = DEFAULT_ERROR_TEXT;
    if (cover === "") errors.cover = DEFAULT_ERROR_TEXT;
    if (year === "") errors.year = DEFAULT_ERROR_TEXT;
    if (description === "") errors.description = DEFAULT_ERROR_TEXT;
    if (rating === "") errors.rating = DEFAULT_ERROR_TEXT;

    setErrors({ errors });

    const isValid = Object.keys(errors).length === 0;

    if (isValid) {
      setIsLoading(true);
      saveMovie({ id, title, cover, year, description, rating });
    }
  };

  return (
    <form
      className={classnames("ui", "form", "padded", "segment", {
        loading: isLoading,
      })}
      onSubmit={handleSubmit}
    >
      <h1>Edit / add new movie</h1>

      {!!errors.global && (
        <div className="ui negative message">
          <p>{errors.global}</p>
        </div>
      )}

      <div className={classnames("field", { error: !!errors.title })}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          value={title}
          onChange={(e) => {
            e.preventDefault();
            handleErrorChange(e);
            setTitle(e.target.value);
          }}
        />
        <span>{errors.title}</span>
      </div>

      <div className={classnames("field", { error: !!errors.year })}>
        <label htmlFor="year">Year</label>
        <input
          id="year"
          type="number"
          name="year"
          value={year}
          onChange={(e) => {
            e.preventDefault();
            handleErrorChange(e);
            setYear(e.target.value);
          }}
        />
        <span>{errors.year}</span>
      </div>

      <div
        className={classnames("field", {
          error: !!errors.description,
        })}
      >
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          type="text"
          name="description"
          value={description}
          onChange={(e) => {
            e.preventDefault();
            handleErrorChange(e);
            setDescription(e.target.value);
          }}
        />
        <span>{errors.description}</span>
      </div>

      <div className={classnames("field", { error: !!errors.rating })}>
        <label htmlFor="rating">Rating</label>
        <input
          id="rating"
          type="number"
          name="rating"
          min="1"
          max="10"
          value={rating}
          onChange={(e) => {
            e.preventDefault();
            handleErrorChange(e);
            setRating(e.target.value);
          }}
        />
        <span>{errors.rating}</span>
      </div>

      <div className={classnames("field", { error: !!errors.cover })}>
        <label htmlFor="cover">Cover URL</label>
        <input
          id="cover"
          type="text"
          name="cover"
          value={cover}
          onChange={(e) => {
            e.preventDefault();
            handleErrorChange(e);
            setCover(e.target.value);
          }}
        />
        <span>{errors.cover}</span>
      </div>

      <div className="field">
        {cover && (
          <img src={cover} alt="cover" className="ui small bordered image" />
        )}
      </div>

      <div className="field">
        <button className="ui primary button">Save</button>
      </div>
    </form>
  );
};

export default MovieForm;
