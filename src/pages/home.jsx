import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import SeedAvatar from '../components/ui/seed-avatar.jsx';
import { useCurrentUser } from '../hooks/use-current-user.js';
import { supabase } from '../lib/supabase.js';
import { getCurrentUserId } from '../lib/auth.js';

const STEP_GOAL = 10000;
const WATER_GOAL_ML = 1500;

function Home() {
  const { user } = useCurrentUser();
  const [todayLog, setTodayLog] = useState(null);

  useEffect(() => {
    const userId = getCurrentUserId();
    if (!userId) return;

    const today = new Date().toISOString().slice(0, 10);
    supabase
      .from('hf_health_logs')
      .select('*')
      .eq('user_id', userId)
      .eq('log_date', today)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()
      .then(({ data }) => setTodayLog(data));
  }, []);

  const steps = todayLog?.steps ?? 0;
  const waterMl = todayLog?.water_ml ?? 0;

  return (
    <Box sx={{ width: '100%', pb: 10 }}>
      <Container maxWidth="sm" sx={{ py: { xs: 3, md: 6 } }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <SeedAvatar size={64} mood="happy" />
          <Box>
            <Typography sx={{ color: 'text.primary', fontWeight: 700, fontSize: { xs: '1.2rem', md: '1.4rem' } }}>
              {user?.nickname ?? '헬시'}님,
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.95rem' }}>
              오늘 하루도 저와 함께 건강 챙겨봐요!
            </Typography>
          </Box>
        </Stack>

        <Card sx={{ borderRadius: 3, mb: 2 }}>
          <CardContent>
            <Typography sx={{ color: 'text.primary', fontWeight: 700, mb: 2 }}>
              오늘의 건강 LOG
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>걸음 수</Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                  {steps.toLocaleString()} / {STEP_GOAL.toLocaleString()}
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={Math.min(100, (steps / STEP_GOAL) * 100)}
                sx={{ height: 8, borderRadius: 4, bgcolor: 'background.default' }}
              />
            </Box>

            <Box>
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>물 섭취량</Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                  {waterMl}ml / {WATER_GOAL_ML}ml
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={Math.min(100, (waterMl / WATER_GOAL_ML) * 100)}
                sx={{ height: 8, borderRadius: 4, bgcolor: 'background.default' }}
                color="secondary"
              />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ borderRadius: 3, bgcolor: 'primary.light' }}>
          <CardContent>
            <Typography sx={{ color: 'primary.contrastText', fontWeight: 700, mb: 0.5 }}>
              오늘 기분은 어떠셨나요?
            </Typography>
            <Typography sx={{ color: 'primary.contrastText', fontSize: '0.85rem' }}>
              하단의 '심리기록' 탭에서 오늘의 기분을 남겨보세요.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default Home;
