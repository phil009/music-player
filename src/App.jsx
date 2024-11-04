import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import MusicPlayerPage from "./pages/MusicPlayerPage";
import UserProvider from "./context/UserContext";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import AdminProtectedRoute from "./components/protectedRoute/AdminProtectedRoute";
import LoadingPage from "./pages/LoadingPage";
import { useEffect, useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);
  return (
    <UserProvider>
      <Routes>
        <Route path="/signup" Component={SignUpPage} />
        <Route path="/login" Component={LoginPage} />

        <Route path="/*" Component={isLoading ? LoadingPage : LoginPage} />
        <Route path="/musicplayer" Component={ProtectedRoute}>
          <Route index Component={MusicPlayerPage} />
        </Route>
        <Route path="/admin" Component={AdminProtectedRoute}>
          <Route index Component={AdminPage} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
