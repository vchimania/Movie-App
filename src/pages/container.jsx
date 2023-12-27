import React from "react";
import { useParams } from "react-router-dom";
import Searchbar from "../components/search-bar";
import Search from "./search";
import Movies from "../components/movies";

function Container() {
  const { query } = useParams();
  return (
    <section>
      <Searchbar />
      {query ? <Search query={query} /> : <Movies />}
    </section>
  );
}

export default Container;
