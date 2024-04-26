import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Discover from "./components/Discover";
import Library from "./components/Library";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Profile from './components/Profile';
import Settings from './components/Settings';

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
        </Routes>
    </Router>
  );
};

export default App;
