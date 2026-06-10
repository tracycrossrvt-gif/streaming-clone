import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MovieRow from "./components/MovieRow";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <MovieRow />
    </div>
  );
}

export default App;