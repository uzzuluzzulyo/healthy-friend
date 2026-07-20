import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { useNavigate } from 'react-router-dom';
import SeedAvatar from '../components/ui/seed-avatar.jsx';
import { useCurrentUser } from '../hooks/use-current-user.js';
import { supabase } from '../lib/supabase.js';
import { getCurrentUserId } from '../lib/auth.js';

const STEP_GOAL = 10000;
const WATER_GOAL_ML = 1500;

const SONGS = [
  {
    tag: '#신나는',
    title: 'NCT WISH - Boy Meets Girl',
    videoId: '2derLGPaliE',
  },
  {
    tag: '#즐겨 듣는 노래',
    title: 'NCT WISH - YO-I-DON!',
    videoId: 'E1d8dVSs0Bg',
  },
];

function Home() {
  const navigate = useNavigate();
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
          <Box onClick={() => navigate('/chat')} sx={{ cursor: 'pointer' }}>
            <SeedAvatar size={112} mood="happy" />
          </Box>
          <Box>
            <Typography sx={{ color: 'text.primary', fontWeight: 700, fontSize: { xs: '1.2rem', md: '1.4rem' } }}>
              {user?.nickname ?? '헬시'}님,
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.95rem' }}>
              오늘 하루도 저와 함께 건강 챙겨봐요!
            </Typography>
          </Box>
        </Stack>

        <Card sx={{ borderRadius: 3, mb: 3 }}>
          <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
            <Typography sx={{ color: 'text.primary', fontWeight: 700, mb: 0.75 }}>
              {user?.nickname ?? '헬시'}님, 오늘의 노래 추천이에요!
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem', mb: 2.5 }}>
              신나는 노래로 기분 전환은 어떠신가요?
            </Typography>
            <Grid container spacing={2.5}>
              {SONGS.map((song) => (
                <Grid key={song.tag} size={6}>
                  <Box
                    component="a"
                    href={`https://www.youtube.com/watch?v=${song.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ textDecoration: 'none', display: 'block' }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        borderRadius: 2,
                        overflow: 'hidden',
                        aspectRatio: '1.6',
                        mb: 1,
                        backgroundImage: `url(https://img.youtube.com/vi/${song.videoId}/hqdefault.jpg)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        bgcolor: 'primary.light',
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: 'rgba(0,0,0,0.25)',
                        }}
                      >
                        <PlayArrowRoundedIcon sx={{ color: '#FFFFFF', fontSize: 32 }} />
                      </Box>
                    </Box>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.75rem', mb: 0.25 }}>{song.tag}</Typography>
                    <Typography sx={{ color: 'text.primary', fontSize: '0.8rem', fontWeight: 600 }}>
                      {song.title}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        <Card sx={{ borderRadius: 3, mb: 3, cursor: 'pointer' }} onClick={() => navigate('/health-hub')}>
          <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
            <Typography sx={{ color: 'text.primary', fontWeight: 700, mb: 2.5 }}>
              나만의 건강 LOG
            </Typography>

            <Box sx={{ mb: 2.5 }}>
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
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
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
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
      </Container>
    </Box>
  );
}

export default Home;
