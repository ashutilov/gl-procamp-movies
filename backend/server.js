import express from "express";
import bodyParser from "body-parser";
import movies from "./movies";

let cors = require("cors");
let uniqid = require("uniqid");

const app = express();
app.use(cors());
app.use(bodyParser.json());

function validate(data) {
  let errors = {};
  if (data.title === "") errors.title = "Can not be empty";
  if (data.cover === "") errors.cover = "Can not be empty";
  if (data.year === "") errors.year = "Can not be empty";
  if (data.description === "") errors.description = "Can not be empty";
  if (data.rating === "") errors.rating = "Can not be empty";
  const isValid = Object.keys(errors).length === 0;
  return { errors, isValid };
}

app.get("/api/movies", (req, res) => {
  res.json({ movies });
});

app.post("/api/movies", (req, res) => {
  const { errors, isValid } = validate(req.body);
  if (isValid) {
    const { title, cover, year, description, rating } = req.body;
    try {
      movies.push({ id: uniqid(), title, cover, year, description, rating });
    } catch (err) {
      res.status(500).json({ errors: { global: "Something went wrong!" } });
    }
    res.json({ movie: { title, cover } });
  } else {
    res.status(400).json({ errors });
  }
});

app.put("/api/movies/:id", (req, res) => {
  const { errors, isValid } = validate(req.body);
  let index = "";

  if (isValid) {
    const { id, title, cover, year, description, rating } = req.body;

    try {
      index = movies.findIndex((element) => req.params.id === element.id);
      movies[index] = { id, title, cover, year, description, rating };
    } catch (err) {
      res.status(500).json({ errors: { global: err } });
      return;
    }

    res.json({ movie: movies[index] });
  } else {
    res.status(400).json({ errors });
  }
});

app.get("/api/movies/:id", (req, res) => {
  const { errors, isValid } = validate(req.body);

  if (isValid) {
    const { title, cover, year, description, rating } = req.body;
    const id = req.params.id;
    let ind;
    try {
      ind = movies.findIndex((element) => id === element.id);
    } catch (err) {
      res.status(500).json({ errors: { global: err } });
      return;
    }

    res.json({ movie: movies[ind] });
  } else {
    res.status(400).json({ errors });
  }
});

app.delete("/api/movies/:id", (req, res) => {
  const id = req.params.id;
  let ind;
  try {
    ind = movies.findIndex((element) => id === element.id);
    movies.splice(ind, 1);
  } catch (err) {
    res.status(500).json({ errors: { global: err } });
    return;
  }

  res.json({});
});

app.use((req, res) => {
  res.status(404).json({
    errors: {
      global: "Work in progress... Please try later...",
    },
  });
});

app.listen(8080, () => console.log("Server is running on localhost:8080"));
