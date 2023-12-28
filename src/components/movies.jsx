import React, { useEffect, useContext } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import Contextpage from "../wrapper";
import Genre from "./genre";
import Header from "./header";
import { motion, AnimatePresence } from "framer-motion";
import Moviecard from "./movie-card";

function Movies() {
  const {
    movies,
    loader,
    page,
    setPage,
    totalPage,
    setMovies,
    activegenre,
    filteredGenre,
  } = useContext(Contextpage);

  useEffect(() => {
    setPage(1); // Reset Page to 1 on initial render.
  }, []);

  useEffect(() => {
    setMovies([]); // Reset movies on genre change so that movies of other genre will not appear at top.
    setPage(0);
    /* Set page to 0, it will automatically increment to 1 and will cause re render even if the page is already set to 1. The increment function is in context page.
        It is important to set page to 0, as on changing genre, if page is already set to 1 then the fetch function will not work as the page state variable is not changed, that's why we are setting page to 0 to force re-render. 
        */
  }, [activegenre]);

  useEffect(() => {
    if (page > 0) {
      filteredGenre(); // Fetch filtered genre when page changes and only if page is greater than 0.
    }
  }, [page]);
  /* Page is dependency here, the funtion will only run if new page value is different from previous. 
    That's why we are first setting page=0, then context page will automatically increment page=1 and the function will run. 
    */

  const sortedMovies = movies
    .map((movie) => ({
      ...movie,
      releaseYear: new Date(movie.release_date).getFullYear(),
    }))
    .sort((a, b) => b.releaseYear - a.releaseYear);

  // Create an object to group movies by release year
  const moviesByYear = sortedMovies.reduce((acc, movie) => {
    const year = movie.releaseYear;
    acc[year] = acc[year] ? [...acc[year], movie] : [movie];
    return acc;
  }, {});

  return (
    <div className="w-full bg-[#10141e] md:p-10 mb-20 md:mb-0">
      <Genre />
      <Header />
      <motion.div
        layout
        className="flex flex-wrap relative justify-evenly md:justify-around"
      >
        <AnimatePresence>
          {loader ? (
            <span className="loader m-10"></span>
          ) : (
            <>
              <InfiniteScroll
                className="w-full md:p-2 flex flex-wrap relative justify-evenly md:justify-around"
                dataLength={movies.length} //This is important field to render the next data
                next={() => setPage(page + 1)}
                hasMore={page < totalPage}
                loader={<span className="loader m-10"></span>}
                scrollThreshol={0.9}
                style={{ overflow: "hidden" }}
              >
                {Object.entries(moviesByYear).map(([year, movies]) => (
                  <div key={year} className="text-center mb-4">
                    <h2 className="text-white">{year}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4">
                      {movies.map((movie) => (
                        <Moviecard key={movie.id} movie={movie} />
                      ))}
                    </div>
                  </div>
                ))}
              </InfiniteScroll>
            </>
          )}
        </AnimatePresence>
      </motion.div>
      {/* <Pagebtn /> */}
    </div>
  );
}

export default Movies;
