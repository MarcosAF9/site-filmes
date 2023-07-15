import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BsFillFileEarmarkTextFill,
  BsHourglassSplit,
  BsGraphUp,
  BsWallet2,
} from "react-icons/bs";
import MovieCard from "../components/MovieCard/MovieCard";
import "./movie.css";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {
  const [movie, setMovie] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${moviesURL}${id}?${apiKey}`);
      const data = await res.json();
      setMovie(data);
    };
    fetchData();
  }, []);

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <div className="movie-page">
      {movie && (
        <>
          <MovieCard movie={movie} showLink={false} />
          <p className="tagline">{movie.tagline}</p>
          <div className="info">
            <h3>
              <BsWallet2 /> Orçamento:
            </h3>
            <p>{formatCurrency(movie.budget)}</p>
          </div>
          <div className="info">
            <h3>
              <BsGraphUp /> Receita:
            </h3>
            <p>{formatCurrency(movie.revenue)}</p>
          </div>
          <div className="info">
            <h3>
              <BsHourglassSplit /> Duração:
            </h3>
            <p>{movie.runtime} minutos</p>
          </div>
          <div className="info description">
            <h3>
              <BsFillFileEarmarkTextFill /> Descrição:
            </h3>
            <p>{movie.overview}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Movie;
