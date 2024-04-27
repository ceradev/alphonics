import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Discover from "./components/Discover";
import Library from "./components/Library";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Profile from './components/Profile';
import Settings from './components/Settings';
import Subscriptions from './components/Subscriptions';
import About from './components/About';
import Contact from './components/Contact';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import InsideAlbum from './components/InsideAlbum';
import InsidePlaylists from './components/InsidePlaylists';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/library" element={<Library />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="/settings" element={<Settings />} /> 
          <Route path="/album/:id" element={<InsideAlbum />} />
          <Route path="/inside-playlists/:id" element={<InsidePlaylists />} />
          <Route path="*" element={<Home />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
    </Router>
  );
};

export default App;