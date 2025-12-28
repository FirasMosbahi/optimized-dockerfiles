import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Courses from "./pages/Courses.jsx";
import Profile from "./pages/Profile.jsx";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Learning Tracker</h1>
        <nav className="nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Home
          </NavLink>
          <NavLink
            to="/courses"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Courses
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Profile
          </NavLink>
        </nav>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      <footer className="footer">
        <small>© {new Date().getFullYear()} Learning Tracker</small>
      </footer>
    </div>
  );
}

export default App;
