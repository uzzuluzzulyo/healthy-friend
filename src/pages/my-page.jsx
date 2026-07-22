import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
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
import { supabase } from '../lib/supabase.js';
import { getCurrentUserId } from '../lib/auth.js';

const BADGES = [
  { id: '3', days: 3, label: '첫 발걸음', emoji: '🌱' },
  { id: '7', days: 7, label: '일주일 개근', emoji: '🔥' },
  { id: '30', days: 30, label: '한 달 챔피언', emoji: '🏆' },
  { id: '100', days: 100, label: '백일의 습관', emoji: '💎' },
];

function computeLongestStreak(logDates) {
  const uniqueSorted = [...new Set(logDates)].sort();
  let longest = 0;
  let current = 0;
  let prevDate = null;

  for (const dateStr of uniqueSorted) {
    const date = new Date(dateStr);
    current = prevDate && Math.round((date - prevDate) / 86400000) === 1 ? current + 1 : 1;
    longest = Math.max(longest, current);
    prevDate = date;
  }
  return longest;
}

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
  const [longestStreak, setLongestStreak] = useState(0);

  useEffect(() => {
    const userId = getCurrentUserId();
    if (!userId) return;

    supabase
      .from('hf_health_logs')
      .select('log_date')
      .eq('user_id', userId)
      .then(({ data }) => setLongestStreak(computeLongestStreak((data ?? []).map((row) => row.log_date))));
  }, []);

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
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'baseline', mb: 1.5 }}>
              <Typography sx={{ color: 'text.secondary', fontSize: '0.75rem', fontWeight: 700 }}>
                달성 배지
              </Typography>
              <Typography sx={{ color: 'text.disabled', fontSize: '0.72rem' }}>
                최장 연속 기록 {longestStreak}일
              </Typography>
            </Box>
            <Grid container spacing={1.5}>
              {BADGES.map((badge) => {
                const unlocked = longestStreak >= badge.days;
                return (
                  <Grid key={badge.id} size={{ xs: 6, sm: 3 }}>
                    <Box
                      sx={{
                        borderRadius: 2,
                        textAlign: 'center',
                        py: 2,
                        border: '1px solid',
                        borderColor: unlocked ? 'primary.main' : 'divider',
                        bgcolor: unlocked ? 'primary.main' : 'background.default',
                        opacity: unlocked ? 1 : 0.55,
                      }}
                    >
                      <Typography sx={{ fontSize: '1.6rem', filter: unlocked ? 'none' : 'grayscale(1)' }}>
                        {badge.emoji}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          mt: 0.5,
                          color: unlocked ? '#FFFFFF' : 'text.secondary',
                        }}
                      >
                        {badge.label}
                      </Typography>
                      <Typography
                        sx={{ fontSize: '0.65rem', mt: 0.25, color: unlocked ? 'rgba(255,255,255,0.85)' : 'text.disabled' }}
                      >
                        {unlocked ? '달성!' : `${badge.days}일 연속 기록`}
                      </Typography>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </CardContent>
        </Card>

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
