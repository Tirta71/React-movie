import { useEffect, useState } from "react";
import "./App.css";
import { getMovieList, SearchMovie } from "./api";

const App = () => {
  const [popularMovie, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const PopularMovieList = () => {
    return popularMovie.map((movie, i) => {
      return (
        <div className="movie-wrapper" key={i}>
          <div className="movie-title">{movie.title}</div>
          <img
            className="movie-image"
            src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
            alt=""
          />

          <div className="movie-date">{movie.release_date}</div>
          <div className="movie-rate">{movie.vote_average}</div>
        </div>
      );
    });
  };

  const search = async (q) => {
    if (q.length > 3) {
      const query = await SearchMovie(q);
      setPopularMovies(query.results);
    }
  };

  console.log({ getMovieList: getMovieList });
  return (
    <div className="container">
      <h1>Tirta Samara</h1>
      <input
        placeholder="cari film anda...."
        className="movie-search"
        onChange={({ target }) => search(target.value)}
      />
      <div className="movie-container">
        <PopularMovieList />
      </div>
    </div>
  );
};

export default App;
