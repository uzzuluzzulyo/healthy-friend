import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import DirectionsRunRoundedIcon from '@mui/icons-material/DirectionsRunRounded';
import MoodRoundedIcon from '@mui/icons-material/MoodRounded';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { logout } from '../../lib/auth.js';

const navItems = [
  { label: '홈', path: '/', icon: <HomeRoundedIcon /> },
  { label: '마이', path: '/my', icon: <PersonRoundedIcon /> },
  { label: '헬시프렌드', path: '/health-hub', icon: <FavoriteRoundedIcon />, isMain: true },
  { label: '검색', path: '/search', icon: <SearchRoundedIcon /> },
  { label: '메뉴', path: null, icon: <MenuRoundedIcon />, isMenu: true },
];

const menuLinks = [
  { label: '홈', path: '/', icon: <HomeRoundedIcon /> },
  { label: '건강기록', path: '/health', icon: <DirectionsRunRoundedIcon /> },
  { label: '심리기록', path: '/mood', icon: <MoodRoundedIcon /> },
  { label: '시드와 대화하기', path: '/chat', icon: <ChatBubbleRoundedIcon /> },
  { label: '마이페이지', path: '/my', icon: <PersonRoundedIcon /> },
];

const hiddenPaths = ['/login', '/signup', '/find-id', '/find-password', '/care'];

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  if (hiddenPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <>
      <Paper
        elevation={3}
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 10 }}
      >
        <BottomNavigation
          showLabels
          value={location.pathname}
          onChange={(event, newValue) => {
            if (newValue) navigate(newValue);
          }}
          sx={{
            '& .Mui-selected': {
              color: 'primary.main',
            },
          }}
        >
          {navItems.map((item) => {
            if (item.isMenu) {
              return (
                <BottomNavigationAction
                  key={item.label}
                  label={item.label}
                  value="__menu__"
                  icon={item.icon}
                  onClick={(event) => {
                    event.preventDefault();
                    setMenuOpen(true);
                  }}
                />
              );
            }
            if (item.isMain) {
              return (
                <BottomNavigationAction
                  key={item.label}
                  label={item.label}
                  value={item.path}
                  icon={
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        bgcolor: 'primary.light',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'primary.contrastText',
                      }}
                    >
                      {item.icon}
                    </Box>
                  }
                />
              );
            }
            return <BottomNavigationAction key={item.label} label={item.label} value={item.path} icon={item.icon} />;
          })}
        </BottomNavigation>
      </Paper>

      <Drawer anchor="right" open={menuOpen} onClose={() => setMenuOpen(false)}>
        <Box sx={{ width: 240, pt: 2 }}>
          <List>
            {menuLinks.map((link) => (
              <ListItemButton
                key={link.path}
                onClick={() => {
                  navigate(link.path);
                  setMenuOpen(false);
                }}
              >
                <ListItemIcon>{link.icon}</ListItemIcon>
                <ListItemText primary={link.label} />
              </ListItemButton>
            ))}
          </List>
          <Divider />
          <List>
            <ListItemButton
              onClick={() => {
                logout();
                setMenuOpen(false);
                navigate('/login');
              }}
            >
              <ListItemIcon>
                <LogoutRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="로그아웃" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
