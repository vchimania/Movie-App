import React, { useEffect, useContext } from "react";
import { unstable_HistoryRouter, useParams } from "react-router-dom";
import { useState } from "react";
import { HiChevronLeft } from "react-icons/hi";
import Contextpage from "../wrapper";
import { getSmashystreamUrl } from "../movies";

const Player = () => {
  const { setHeader } = useContext(Contextpage);
  const [moviedet, setMoviedet] = useState([]);
  const { id } = useParams();
  const history = unstable_HistoryRouter();

  const APIKEY = "2dca580c2a14b55200e784d157207b4d";
  const fetchMovie = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=en-US`
    );
    const moviedetail = await data.json();
    setMoviedet(moviedetail);
  };

  useEffect(() => {
    fetchMovie();
    setHeader("Player");
  }, []);

  document.title = `BlueBird Movies | ${moviedet.title}`;

  return (
    <>
      <button
        onClick={() => history.back()}
        className="fixed z-10 text-4xl text-black bg-white m-3 md:m-5 rounded-full"
      >
        <HiChevronLeft />
      </button>
      <iframe
        allowFullScreen
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100vh",
        }}
        src={getSmashystreamUrl(id)}
      ></iframe>
    </>
  );
};

export default Player;
