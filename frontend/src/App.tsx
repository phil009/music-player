import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MusicPlayer from "./pages/MusicPlayer";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home}>
          <Route path="/player" Component={MusicPlayer} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
