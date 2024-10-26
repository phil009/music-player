import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import MusicPlayerPage from "./pages/MusicPlayerPage";

function App() {
  return (
    <Routes>
      <Route path="/signup" Component={SignUpPage} />
      <Route path="/login" Component={LoginPage} />
      <Route path="/musicplayer" Component={MusicPlayerPage} />
    </Routes>
  );
}

export default App;
