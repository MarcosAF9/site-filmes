import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard/MovieCard";
import "./movieGrid.css";

const moviesURL = import.meta.env.VITE_API;
const apiKEY = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${moviesURL}top_rated?${apiKEY}`);
      const data = await res.json();

      setTopMovies(data.results);
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <h2 className="title">Melhores filmes</h2>
      <div className="movies-container">
        {topMovies.length === 0 && <p>Carregando...</p>}
        {topMovies.length > 0 &&
          topMovies.map((movie) => <MovieCard movie={movie} key={movie.id} />)}
      </div>
    </div>
  );
};

export default Home;
