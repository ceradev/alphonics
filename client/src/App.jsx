import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/home/Home";
import Discover from "./views/discover/Discover";
import Library from "./views/library/Library";
import LoginForm from "./views/auth/LoginForm";
import SignupForm from "./views/auth/SignupForm";
import Profile from "./views/user/Profile";
import Album from "./views/library/Album";
import Playlist from "./views/library/Playlist";
import Subscriptions from "./views/user/Subscriptions";
import About from "./views/pages/About";
import Contact from "./views/pages/Contact";
import Terms from "./views/pages/Terms";
import Privacy from "./views/pages/Privacy";
import Team from "./views/pages/Team";
import Artist from "./views/library/Artist";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/library" element={<Library />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/album/:id" element={<Album />} />
        <Route path="/playlist/:id" element={<Playlist />} />
        <Route path="/artist/:id" element={<Artist />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/team" element={<Team />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
