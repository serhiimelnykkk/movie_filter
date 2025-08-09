import { Route, Routes } from "react-router";
import Home from "./components/Home/Home";
import MovieDetails from "./components/MovieDetails/MovieDetails";

export default function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </>
  );
}
