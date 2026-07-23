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
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../hooks/use-current-user.js';
import { supabase } from '../lib/supabase.js';
import { getCurrentUserId } from '../lib/auth.js';

const STEP_GOAL = 10000;
const WATER_GOAL_ML = 1500;

const MOODS = [
  {
    tag: '힘들 때',
    songs: [{ title: 'TOMORROW X TOGETHER - Trust Fund Baby', videoId: '2demh7rlacU' }],
  },
  {
    tag: '신날 때',
    songs: [
      { title: 'NCT WISH - Ode to Love', videoId: '1o5O2YvV3HU' },
      { title: 'NCT WISH - poppop', videoId: 'LNETckymbzk' },
      { title: 'NCT WISH - Steady', videoId: 'IKlkZZv76Ho' },
      { title: 'NCT WISH - COLOR', videoId: '28dAfmIAlCo' },
      { title: 'NCT WISH - BUBBLE GUM', videoId: 'dhLzkb0tcN0' },
    ],
  },
  {
    tag: '화날 때',
    songs: [{ title: 'ENHYPEN - Future Perfect (Pass the MIC)', videoId: 'QMlNLo74mOw' }],
  },
  {
    tag: '위로되는 노래',
    songs: [
      { title: 'NCT WISH - Wishful Winter', videoId: 'NAhEwvI9TGE' },
      { title: 'NCT WISH - SOMEDAY', videoId: 'M2PZUOQDNrc' },
      { title: 'NCT WISH - Songbird', videoId: 'C_qALZPuK8I' },
      { title: 'NCT WISH - Same Sky', videoId: 'Ud44639XwDI' },
    ],
  },
];

function getTodaySongs() {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000
  );
  const moodStart = dayOfYear % MOODS.length;
  const todayMoods = [MOODS[moodStart], MOODS[(moodStart + 1) % MOODS.length]];

  return todayMoods.map((mood) => {
    const song = mood.songs[dayOfYear % mood.songs.length];
    return { tag: mood.tag, title: song.title, videoId: song.videoId };
  });
}

function RingStat({ icon, label, value, goal, unit, color }) {
  const pct = Math.min(100, Math.round((value / goal) * 100));
  const size = 92;
  const stroke = 7;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative', width: size, height: size, mx: 'auto' }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(26,39,51,0.07)" strokeWidth={stroke} fill="none" />
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
            inset: 10,
            borderRadius: '50%',
            bgcolor: `${color}16`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color,
          }}
        >
          {icon}
        </Box>
      </Box>
      <Typography sx={{ fontWeight: 800, fontSize: '1.05rem', color: 'text.primary', mt: 1.25 }}>
        {value.toLocaleString()}
        <Typography component="span" sx={{ fontSize: '0.7rem', fontWeight: 600, color: 'text.secondary' }}>
          {' '}
          / {goal.toLocaleString()}{unit}
        </Typography>
      </Typography>
      <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mt: 0.25 }}>{label}</Typography>
    </Box>
  );
}

function computeStreak(logDates) {
  const dateSet = new Set(logDates);
  const cursor = new Date();
  const todayStr = cursor.toISOString().slice(0, 10);
  if (!dateSet.has(todayStr)) cursor.setDate(cursor.getDate() - 1);

  let streak = 0;
  while (dateSet.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function Home() {
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const [todayLog, setTodayLog] = useState(null);
  const [streak, setStreak] = useState(0);
  const [todaySongs] = useState(getTodaySongs);

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

    supabase
      .from('hf_health_logs')
      .select('log_date')
      .eq('user_id', userId)
      .order('log_date', { ascending: false })
      .limit(60)
      .then(({ data }) => setStreak(computeStreak((data ?? []).map((row) => row.log_date))));
  }, []);

  const steps = todayLog?.steps ?? 0;
  const waterMl = todayLog?.water_ml ?? 0;

  return (
    <Box sx={{ width: '100%', pb: 10 }}>
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          background: (theme) => theme.custom.heroGradient,
          pt: { xs: 7, md: 9 },
          pb: { xs: 5, md: 7 },
          px: 2,
        }}
      >
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 60% 55% at 15% -10%, rgba(255,255,255,0.16), transparent 60%)',
            pointerEvents: 'none',
          }}
        />
        <Container maxWidth="sm" sx={{ position: 'relative' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
            <Box>
              <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', mb: 0.5 }}>
                반가워요
              </Typography>
              <Typography sx={{ color: '#FFFFFF', fontWeight: 800, fontSize: { xs: '1.6rem', md: '2rem' } }}>
                {user?.nickname ?? '헬시'}님
              </Typography>
            </Box>
            {streak > 0 && (
              <Stack
                direction="row"
                spacing={0.5}
                alignItems="center"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.18)',
                  backdropFilter: 'blur(6px)',
                  borderRadius: 999,
                  px: 1.5,
                  py: 0.75,
                  mt: 0.5,
                }}
              >
                <LocalFireDepartmentRoundedIcon sx={{ color: '#FFD166', fontSize: 20 }} />
                <Typography sx={{ color: '#FFFFFF', fontWeight: 800, fontSize: '0.85rem' }}>
                  {streak}일 연속
                </Typography>
              </Stack>
            )}
          </Stack>
          <Card
            onClick={() => navigate('/chat')}
            sx={{
              borderRadius: 3,
              cursor: 'pointer',
              bgcolor: 'rgba(255,255,255,0.22)',
              border: '1px solid rgba(255,255,255,0.3)',
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
              <Typography sx={{ color: 'text.primary', fontWeight: 700 }}>나만의 건강 LOG</Typography>
              <ArrowForwardRoundedIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
            </Box>
            <Grid container>
              <Grid size={6}>
                <RingStat
                  icon={<DirectionsWalkRoundedIcon />}
                  label="걸음 수"
                  value={steps}
                  goal={STEP_GOAL}
                  unit="보"
                  color="#388DC6"
                />
              </Grid>
              <Grid size={6} sx={{ borderLeft: '1px solid', borderColor: 'divider' }}>
                <RingStat
                  icon={<WaterDropRoundedIcon />}
                  label="물 섭취량"
                  value={waterMl}
                  goal={WATER_GOAL_ML}
                  unit="ml"
                  color="#1CD9E8"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card sx={{ borderRadius: 3, mb: 3 }}>
          <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
            <Typography sx={{ color: 'text.primary', fontWeight: 700, mb: 0.75 }}>
              오늘의 노래 추천
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem', mb: 2.5 }}>
              오늘의 기분에 맞는 노래, 매일 바뀌어요
            </Typography>
            <Grid container spacing={2.5}>
              {todaySongs.map((song) => (
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
