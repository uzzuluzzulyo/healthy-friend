import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import DirectionsWalkRoundedIcon from '@mui/icons-material/DirectionsWalkRounded';
import WaterDropRoundedIcon from '@mui/icons-material/WaterDropRounded';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useNavigate } from 'react-router-dom';
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

function RingStat({ icon, label, value, goal, unit, color }) {
  const pct = Math.min(100, Math.round((value / goal) * 100));
  const size = 84;
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;

  return (
    <Stack alignItems="center" spacing={1} sx={{ flex: 1 }}>
      <Box sx={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(26,39,51,0.08)" strokeWidth={stroke} fill="none" />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={color}
            strokeWidth={stroke}
            fill="none"
            strokeDasharray={c}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.6s ease' }}
          />
        </svg>
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color,
          }}
        >
          {icon}
        </Box>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: 'text.primary' }}>
          {value.toLocaleString()}
          <Typography component="span" sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
            {' '}
            / {goal.toLocaleString()}{unit}
          </Typography>
        </Typography>
        <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>{label}</Typography>
      </Box>
    </Stack>
  );
}

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
      <Box
        sx={{
          background: 'linear-gradient(135deg, #388DC6 0%, #2A6D9E 55%, #1CD9E8 140%)',
          pt: { xs: 7, md: 9 },
          pb: { xs: 5, md: 7 },
          px: 2,
        }}
      >
        <Container maxWidth="sm">
          <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', mb: 0.5 }}>
            반가워요
          </Typography>
          <Typography sx={{ color: '#FFFFFF', fontWeight: 800, fontSize: { xs: '1.6rem', md: '2rem' }, mb: 2 }}>
            {user?.nickname ?? '헬시'}님
          </Typography>
          <Card
            onClick={() => navigate('/chat')}
            sx={{
              borderRadius: 3,
              cursor: 'pointer',
              bgcolor: 'rgba(255,255,255,0.14)',
              boxShadow: 'none',
              backdropFilter: 'blur(6px)',
            }}
          >
            <CardContent
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: '14px !important' }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <ChatBubbleRoundedIcon sx={{ color: '#FFFFFF' }} />
                <Typography sx={{ color: '#FFFFFF', fontSize: '0.9rem', fontWeight: 600 }}>
                  오늘 하루도 저와 함께 챙겨봐요
                </Typography>
              </Stack>
              <ArrowForwardRoundedIcon sx={{ color: '#FFFFFF' }} />
            </CardContent>
          </Card>
        </Container>
      </Box>

      <Container maxWidth="sm" sx={{ mt: -3, pb: { xs: 3, md: 6 } }}>
        <Card sx={{ borderRadius: 3, mb: 3, cursor: 'pointer' }} onClick={() => navigate('/health-hub')}>
          <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Typography sx={{ color: 'text.primary', fontWeight: 700 }}>나만의 건강 LOG</Typography>
              <ArrowForwardRoundedIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
            </Stack>
            <Stack direction="row" spacing={2}>
              <RingStat
                icon={<DirectionsWalkRoundedIcon />}
                label="걸음 수"
                value={steps}
                goal={STEP_GOAL}
                unit="보"
                color="#388DC6"
              />
              <RingStat
                icon={<WaterDropRoundedIcon />}
                label="물 섭취량"
                value={waterMl}
                goal={WATER_GOAL_ML}
                unit="ml"
                color="#1CD9E8"
              />
            </Stack>
          </CardContent>
        </Card>

        <Card sx={{ borderRadius: 3, mb: 3 }}>
          <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
            <Typography sx={{ color: 'text.primary', fontWeight: 700, mb: 0.75 }}>
              오늘의 노래 추천
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
      </Container>
    </Box>
  );
}

export default Home;
