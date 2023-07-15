import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./movieGrid.css";
import MovieCard from "../components/MovieCard/MovieCard";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);

  const query = searchParams.get("q");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${searchURL}?query=${query}&${apiKey}`);
      const data = await res.json();
      setMovies(data.results);
    };
    fetchData();
  }, [query]);

  return (
    <div className="container">
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>
      <div className="movies-container">
        {movies.length === 0 && <p>Carregando...</p>}
        {movies.length > 0 &&
          movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)}
      </div>
    </div>
  );
};

export default Search;
