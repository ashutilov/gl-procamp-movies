import React, { Component } from "react";
//import logo from './logo.svg';
import { Link, Route } from "react-router-dom";
import MoviesPage from "./MoviesPage";
import MovieFormPage from "./MovieFormPage";
import MoviesTop from "./MoviesTop";
import "./App.scss";

const ActiveLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route
    path={to}
    exact={activeOnlyWhenExact}
    children={({ match }) => (
      <Link className={match ? "active item" : "item"} to={to}>
        {" "}
        {label}
      </Link>
    )}
  />
);

const App = () => {
  return (
    <div className="ui-container">
      <div className="ui three item menu">
        <ActiveLink activeOnlyWhenExact to="/" label="Dashboard" />
        <ActiveLink activeOnlyWhenExact to="/movies" label="All movies" />
        <ActiveLink
          activeOnlyWhenExact
          to="/movies/new"
          label="Edit / add new movie"
        />
      </div>

      <React.Fragment>
        <div>
          <Route exact path="/" component={MoviesTop} />
          <Route exact path="/movies" component={MoviesPage} />
          <Route exact path="/movies/new" component={MovieFormPage} />
          <Route exact path="/movie/:id" component={MovieFormPage} />
        </div>
      </React.Fragment>
    </div>
  );
};

export default App;
