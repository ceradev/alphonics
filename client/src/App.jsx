import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/home/Home';
import Discover from './views/discover/Discover';
import Library from './views/library/Library';
import LoginForm from './views/auth/LoginForm';
import SignupForm from './views/auth/SignupForm';
import Profile from './views/user/Profile';
import Settings from './views/user/Settings';
import InsideAlbum from './views/library/InsideAlbum';
import InsidePlaylists from './views/library/InsidePlaylists';
import Subscriptions from './views/user/Subscriptions';
import About from './views/pages/About';
import Contact from './views/pages/Contact';
import Terms from './views/pages/Terms';
import Privacy from './views/pages/Privacy';

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