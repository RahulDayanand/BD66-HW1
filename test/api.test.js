const { getAllMovies } = require("../controllers/index");
const { app } = require("../index");
const http = require("http");
const request = require("supertest");
let server;

jest.mock("../controllers/index", () => ({
  ...jest.requireActual("../controllers/index"),
  getAllMovies: jest.fn(),
}));

beforeAll(() => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(() => {
  server.close();
});

describe("Controllers Testing Time", () => {
  it("Exercise 5: Mock the Get All Movies Function", async () => {
    let mockMovies = [
      {
        movieId: 1,
        title: "Inception",
        genre: "Sci-Fi",
        director: "Christopher Nolan",
      },
      {
        movieId: 2,
        title: "The Shawshank Redemption",
        genre: "Drama",
        director: "Frank Darabont",
      },
      {
        movieId: 3,
        title: "The Godfather",
        genre: "Crime",
        director: "Francis Ford Coppola",
      },
    ];

    getAllMovies.mockReturnValue(mockMovies);

    let movies = getAllMovies();
    expect(movies).toEqual(mockMovies);
    expect(movies.length).toBe(3);
  });
});

describe("API Endpoints Testing Time", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Exercise 3: Test Retrieve All Movies", async () => {
    let response = await request(server).get("/movies");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        movieId: 1,
        title: "Inception",
        genre: "Sci-Fi",
        director: "Christopher Nolan",
      },
      {
        movieId: 2,
        title: "The Shawshank Redemption",
        genre: "Drama",
        director: "Frank Darabont",
      },
      {
        movieId: 3,
        title: "The Godfather",
        genre: "Crime",
        director: "Francis Ford Coppola",
      },
    ]);
    expect(response.body.length).toBe(3);
  });

  it("Exercise 4: Test Retrieve Movie by ID", async () => {
    let response = await request(server).get("/movies/details/2");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      movieId: 2,
      title: "The Shawshank Redemption",
      genre: "Drama",
      director: "Frank Darabont",
    });
  });
});



