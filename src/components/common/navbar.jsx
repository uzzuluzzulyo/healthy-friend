import { useLocation, useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

const navItems = [
  { label: '홈', path: '/', icon: <HomeRoundedIcon /> },
  { label: '마이', path: '/my', icon: <PersonRoundedIcon /> },
  { label: '헬시프렌드', path: '/health-hub', icon: <FavoriteRoundedIcon />, isMain: true },
  { label: '검색', path: null, icon: <SearchRoundedIcon /> },
  { label: '메뉴', path: null, icon: <MenuRoundedIcon /> },
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
        onChange={(event, newValue) => {
          if (newValue) navigate(newValue);
        }}
        sx={{
          '& .Mui-selected': {
            color: 'primary.main',
          },
        }}
      >
        {navItems.map((item) =>
          item.isMain ? (
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
          ) : (
            <BottomNavigationAction key={item.label} label={item.label} value={item.path} icon={item.icon} />
          ),
        )}
      </BottomNavigation>
    </Paper>
  );
}

export default Navbar;
