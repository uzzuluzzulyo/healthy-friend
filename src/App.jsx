import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/navbar.jsx';
import RequireAuth from './components/common/require-auth.jsx';
import Home from './pages/home.jsx';
import HealthHub from './pages/health-hub.jsx';
import HealthLog from './pages/health-log.jsx';
import MoodLog from './pages/mood-log.jsx';
import SeedChat from './pages/seed-chat.jsx';
import MyPage from './pages/my-page.jsx';
import CareRoom from './pages/care-room.jsx';
import Login from './pages/login.jsx';
import Signup from './pages/signup.jsx';
import FindId from './pages/find-id.jsx';
import FindPassword from './pages/find-password.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/find-id" element={<FindId />} />
        <Route path="/find-password" element={<FindPassword />} />
        <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="/health-hub" element={<RequireAuth><HealthHub /></RequireAuth>} />
        <Route path="/health" element={<RequireAuth><HealthLog /></RequireAuth>} />
        <Route path="/mood" element={<RequireAuth><MoodLog /></RequireAuth>} />
        <Route path="/chat" element={<RequireAuth><SeedChat /></RequireAuth>} />
        <Route path="/my" element={<RequireAuth><MyPage /></RequireAuth>} />
        <Route path="/care" element={<RequireAuth><CareRoom /></RequireAuth>} />
      </Routes>
      <Navbar />
    </>
  );
}

export default App;
