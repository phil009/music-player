import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import MusicPlayerPage from "./pages/MusicPlayerPage";
import UserProvider from "./context/UserContext";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/signup" Component={SignUpPage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/musicplayer" Component={MusicPlayerPage} />
        <Route path="/admin" Component={AdminPage} />
      </Routes>
    </UserProvider>
  );
}

export default App;
