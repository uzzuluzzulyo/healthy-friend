import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import GradientHeader from '../components/common/gradient-header.jsx';
import { useCurrentUser } from '../hooks/use-current-user.js';
import { useColorMode } from '../hooks/color-mode-context.jsx';
import { logout } from '../lib/auth.js';

function SettingRow({ icon, label, action }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 1.5 }}>
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Box sx={{ color: 'text.secondary', display: 'flex' }}>{icon}</Box>
        <Typography sx={{ color: 'text.primary', fontSize: '0.9rem' }}>{label}</Typography>
      </Stack>
      {action}
    </Stack>
  );
}

function MyPage() {
  const navigate = useNavigate();
  const { user, loading } = useCurrentUser();
  const { mode, toggleMode } = useColorMode();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  const joinedDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  return (
    <Box sx={{ width: '100%', pb: 10 }}>
      <GradientHeader title="마이페이지" subtitle="내 정보와 앱 설정을 관리해요">
        <Box
          sx={{
            mt: 2.5,
            bgcolor: 'rgba(255,255,255,0.14)',
            backdropFilter: 'blur(6px)',
            borderRadius: 3,
            px: 2.5,
            py: 2,
          }}
        >
          <Typography sx={{ color: '#FFFFFF', fontWeight: 800, fontSize: '1.1rem' }}>
            {loading ? '불러오는 중...' : (user?.nickname ?? '알 수 없음')}
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.82rem', mt: 0.25 }}>
            {user?.email}
          </Typography>
          {joinedDate && (
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', mt: 0.75 }}>
              {joinedDate}부터 함께하고 있어요
            </Typography>
          )}
        </Box>
      </GradientHeader>

      <Container maxWidth="sm" sx={{ mt: -2, pb: { xs: 3, md: 6 } }}>
        <Card sx={{ borderRadius: 3, mb: 2 }}>
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.75rem', fontWeight: 700, mb: 0.5 }}>
              앱 설정
            </Typography>
            <SettingRow
              icon={<DarkModeRoundedIcon fontSize="small" />}
              label="다크 모드"
              action={<Switch checked={mode === 'dark'} onChange={toggleMode} />}
            />
            <Divider sx={{ borderColor: 'divider' }} />
            <SettingRow
              icon={<NotificationsRoundedIcon fontSize="small" />}
              label="알림 설정"
              action={<ChevronRightRoundedIcon sx={{ color: 'text.disabled' }} fontSize="small" />}
            />
            <Divider sx={{ borderColor: 'divider' }} />
            <SettingRow
              icon={<HelpOutlineRoundedIcon fontSize="small" />}
              label="도움말 및 문의"
              action={<ChevronRightRoundedIcon sx={{ color: 'text.disabled' }} fontSize="small" />}
            />
          </CardContent>
        </Card>

        <Button
          onClick={handleLogout}
          fullWidth
          variant="outlined"
          startIcon={<LogoutRoundedIcon />}
          sx={{ color: 'text.secondary', borderColor: 'divider' }}
        >
          로그아웃
        </Button>
      </Container>
    </Box>
  );
}

export default MyPage;
