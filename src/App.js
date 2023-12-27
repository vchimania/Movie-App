import "./App.css";
import { MovieProviderWrapper } from "./wrapper";
import Navbar from "./components/navbar";
import Container from "./pages/container";
import Trending from "./pages/trending";
import Upcoming from "./pages/upcoming";
import { Detail } from "./components/detail";
import Favoritepage from "./pages/favorite";
import Player from "./pages/player";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <MovieProviderWrapper>
      <Navbar />
      <div className="md:ml-[15rem]">
        <Routes>
          <Route path="/" element={<Container />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/moviedetail/:id" element={<Detail />} />
          <Route path="/favorite" element={<Favoritepage />} />
          <Route path="/player/:id/:title" element={<Player />} />{" "}
          <Route path="/player/:id" element={<Player />} />{" "}
          <Route path="/search/:query" element={<Container />} />
          <Route path="/search/" element={<Container />} />
        </Routes>
      </div>
    </MovieProviderWrapper>
  );
}

export default App;
