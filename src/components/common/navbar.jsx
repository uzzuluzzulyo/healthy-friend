import { useLocation, useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DirectionsRunRoundedIcon from '@mui/icons-material/DirectionsRunRounded';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import MoodRoundedIcon from '@mui/icons-material/MoodRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

const navItems = [
  { label: '홈', path: '/', icon: <HomeRoundedIcon /> },
  { label: '건강기록', path: '/health', icon: <DirectionsRunRoundedIcon /> },
  { label: '시드채팅', path: '/chat', icon: <ChatBubbleRoundedIcon /> },
  { label: '심리기록', path: '/mood', icon: <MoodRoundedIcon /> },
  { label: '마이', path: '/my', icon: <PersonRoundedIcon /> },
];

const hiddenPaths = ['/login', '/signup', '/find-id', '/find-password', '/care'];

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  if (hiddenPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <Paper
      elevation={3}
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 10 }}
    >
      <BottomNavigation
        showLabels
        value={location.pathname}
        onChange={(event, newValue) => navigate(newValue)}
        sx={{
          '& .Mui-selected': {
            color: 'primary.main',
          },
        }}
      >
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.path}
            label={item.label}
            value={item.path}
            icon={item.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}

export default Navbar;
