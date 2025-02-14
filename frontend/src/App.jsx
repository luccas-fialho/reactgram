import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Hooks
import { useAuth } from "./hooks/useAuth.jsx";

// pages
import Home from "./pages/Home/Home.jsx";
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";

// components
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import EditProfile from "./pages/EditProfile/EditProfile.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Photo from "./pages/Photo/Photo.jsx";
import Search from "./pages/Search/Search.jsx";

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={auth ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={auth ? <EditProfile /> : <Navigate to="/login" />}
            />
            <Route
              path="/users/:id"
              element={auth ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/search"
              element={auth ? <Search /> : <Navigate to="/login" />}
            />
            <Route
              path="/photos/:id"
              element={auth ? <Photo /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!auth ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!auth ? <Register /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
