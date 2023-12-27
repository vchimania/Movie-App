import React, { useEffect, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/header";
import Moviecard from "../components/movie-card";
import Contextpage from "../wrapper";

function Favoritepage() {
  const { loader, GetFavorite } = useContext(Contextpage);
  const [localStorageData, setLocalStorageData] = useState([]);

  useEffect(() => {
    GetFavorite();

    const data = localStorage;
    setLocalStorageData(data);
  }, []);

  return (
    <>
      <title>BlueBird Movies | Favorite Movies</title>

      <div className="w-full bg-[#10141e] md:p-10 mb-20 md:mb-0">
        <Header />
        <motion.div
          layout
          className="w-full md:p-2 flex flex-wrap relative justify-evenly md:justify-around"
        >
          <AnimatePresence>
            {loader ? (
              <span className="loader m-10"></span>
            ) : (
              <>
                {Object.keys(localStorageData).filter((key) => !isNaN(key))
                  .length == 0 ? (
                  <p className="text-xl text-white">No Bookmark Yet!</p>
                ) : (
                  Object.keys(localStorageData)
                    .filter((key) => !isNaN(key))
                    .map((key, index) => (
                      <Moviecard
                        key={index}
                        movie={{ ...JSON.parse(localStorageData[key]) }}
                      />
                    ))
                )}
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}

export default Favoritepage;
