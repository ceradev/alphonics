<<<<<<< HEAD
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Discover from "./components/Discover";
import Library from "./components/Library";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Profile from './components/Profile';
import Settings from './components/Settings';
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/home/Home";
import Discover from "./views/discover/Discover";
import Library from "./views/library/Library";
import LoginForm from "./views/auth/LoginForm";
import SignupForm from "./views/auth/SignupForm";
import Profile from "./views/user/Profile";
import Settings from "./views/user/Settings";
import Album from "./views/library/Album";
import Playlist from "./views/library/Playlist";
import Subscriptions from "./views/user/Subscriptions";
import About from "./views/pages/About";
import Contact from "./views/pages/Contact";
import Terms from "./views/pages/Terms";
import Privacy from "./views/pages/Privacy";
import Team from "./views/pages/Team";
>>>>>>> development

const App = () => {
  return (
    <Router>
<<<<<<< HEAD
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/library" element={<Library />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="/settings" element={<Settings />} /> 
        </Routes>
=======
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/library" element={<Library />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/album/:id" element={<Album />} />
        <Route path="/playlist/:id" element={<Playlist />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/team" element={<Team />} />
        <Route path="*" element={<Home />} />
      </Routes>
>>>>>>> development
    </Router>
  );
};

export default App;
