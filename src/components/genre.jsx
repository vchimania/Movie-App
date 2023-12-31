import React, { useEffect, useContext } from "react";
import Contextpage from "../wrapper";

function Genre() {
  const { fetchGenre, activegenre, setActiveGenre, genres } =
    useContext(Contextpage);

  useEffect(() => {
    fetchGenre(); // Fetching Genres on Initial Render.
  }, []);

  // const filterFunc = () => {
  //     if (activegenre === 0) {
  //         setFiltered(movies)
  //     } else {
  //         const filteredgenre = movies.filter((movie) =>
  //           movie.genre_ids.includes(activegenre)
  //         );
  //         setFiltered(filteredgenre);
  //     }
  // }

  return (
    <>
      <title>MovieFix | Genres</title>
      <div
        className="md:px-5 flex flex-row max-w-full flex-start overflow-x-auto relative
              scrollbar-thin scrollbar-thumb-gray-500/20 scrollbar-track-gray-900/90 md:pb-3"
      >
        {genres.map((genre) => (
          <button
            onClick={() => setActiveGenre(genre.id)}
            className={
              activegenre === genre.id
                ? "border border-green-300 px-4 py-2 m-2 text-[15px] text-white font-semibold rounded-3xl"
                : "px-4 py-2 m-2 text-[15px] bg-slate-800 text-white font-semibold rounded-3xl"
            }
            key={genre.id}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </>
  );
}

export default Genre;
