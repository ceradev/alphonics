import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Discover from "./components/Discover";
import Library from "./components/Library";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Profile from './components/Profile';
import Settings from './components/Settings';
import Subscription from "./components/Subscription";
import InsideAlbum from "./components/InsideAlbum";
import AboutUs from "./components/AboutUs.jsx";
import Contact from "./components/Contact.jsx";

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
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/album/:id" element={<InsideAlbum />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
    </Router>
  );
};

export default App;