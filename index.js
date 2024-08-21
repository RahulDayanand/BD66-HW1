const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const { getAllMovies, getMovieById } = require("./controllers");
app.use(cors());

//Exercise 1: Retrieve All Movies

app.get("/movies", (req, res) => {
  let movies = getAllMovies();
  res.json(movies);
});

//Exercise 2: Retrieve Movie by ID

app.get("/movies/details/:id", (req, res) => {
  let movie = getMovieById(parseInt(req.params.id));
  res.json(movie);
});

module.exports = {
  app,
};
