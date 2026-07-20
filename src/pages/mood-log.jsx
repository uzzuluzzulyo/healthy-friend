import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded';
import PsychologyAltRoundedIcon from '@mui/icons-material/PsychologyAltRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import QuizRoundedIcon from '@mui/icons-material/QuizRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/common/page-header.jsx';
import SeedAvatar from '../components/ui/seed-avatar.jsx';
import { useCurrentUser } from '../hooks/use-current-user.js';
import { supabase } from '../lib/supabase.js';
import { getCurrentUserId } from '../lib/auth.js';

const moods = [
  { label: '행복', mood: 'happy' },
  { label: '그럭저럭', mood: 'meh' },
  { label: '슬픔', mood: 'sad' },
  { label: '화남', mood: 'angry' },
];

const testCards = [
  { title: '운명의 새싹테스트', subtitle: '나는 어떤 새싹으로 자랄까?' },
  { title: '낭플갱어 테스트', subtitle: '나와 닮은 고양이는? (인기 퀴즈)' },
];

const iconRow = [
  { label: 'MBTI', icon: <PsychologyAltRoundedIcon /> },
  { label: '친구', icon: <GroupRoundedIcon /> },
  { label: '마음', icon: <FavoriteRoundedIcon /> },
  { label: '퀴즈', icon: <QuizRoundedIcon /> },
  { label: '비밀', icon: <LockRoundedIcon /> },
];

function MoodLog() {
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const [selectedMood, setSelectedMood] = useState('');
  const [note, setNote] = useState('');
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchEntries = async () => {
    const userId = getCurrentUserId();
    if (!userId) return;

    setLoading(true);
    const { data } = await supabase
      .from('hf_mood_entries')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(30);
    setEntries(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  async function handleSubmit() {
    const userId = getCurrentUserId();
    if (!userId || !selectedMood) return;

    setSubmitting(true);
    await supabase.from('hf_mood_entries').insert({
      user_id: userId,
      mood: selectedMood,
      note: note.trim() || null,
    });
    setSelectedMood('');
    setNote('');
    setSubmitting(false);
    await fetchEntries();
  }

  return (
    <Box sx={{ width: '100%', pb: 10 }}>
      <Container maxWidth="sm" sx={{ py: { xs: 3, md: 6 } }}>
        <PageHeader title="나의 심리 기록" backTo="/health-hub" />

        <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ mb: 2 }}>
          <SeedAvatar size={40} mood="sad" />
          <Box
            sx={{
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              borderTopLeftRadius: 4,
              px: 2,
              py: 1.5,
            }}
          >
            <Typography sx={{ color: 'text.primary', fontSize: '0.85rem' }}>
              오늘 {user?.nickname ?? '헬시'}님은 많이 지쳐군요.. 다양한 심리테스트를 통해 지친 하루를 달래보아요!
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={1.5} sx={{ mb: 2 }}>
          <Grid size={6}>
            <Card sx={{ borderRadius: 3, height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <CardGiftcardRoundedIcon sx={{ color: '#F5A623', fontSize: 32, mb: 1 }} />
                <Typography sx={{ color: 'text.primary', fontWeight: 700, fontSize: '0.85rem' }}>
                  전문가와 상담하기
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={6}>
            <Card sx={{ borderRadius: 3, height: '100%', cursor: 'pointer' }} onClick={() => navigate('/care')}>
              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <CardGiftcardRoundedIcon sx={{ color: '#FFC93C', fontSize: 32, mb: 1 }} />
                <Typography sx={{ color: 'text.primary', fontWeight: 700, fontSize: '0.85rem' }}>
                  나만의 심리 케어실
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={1.5} sx={{ mb: 2 }}>
          {testCards.map((test, index) => (
            <Grid key={test.title} size={6}>
              <Card sx={{ borderRadius: 3, height: '100%', overflow: 'hidden' }}>
                <Box
                  sx={{
                    bgcolor: index === 0 ? '#FFB74D' : 'background.default',
                    background: index === 0 ? 'linear-gradient(135deg, #FFB74D 0%, #FF8A65 100%)' : undefined,
                    px: 2,
                    pt: 2,
                    pb: 1,
                  }}
                >
                  <Typography
                    sx={{
                      color: index === 0 ? '#FFFFFF' : 'text.primary',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      mb: 0.5,
                    }}
                  >
                    {test.title}
                  </Typography>
                  <Typography sx={{ color: index === 0 ? '#FFFFFF' : 'text.secondary', fontSize: '0.7rem', opacity: 0.9 }}>
                    {test.subtitle}
                  </Typography>
                </Box>
                <CardContent sx={{ pt: 1.5 }}>
                  <Button
                    size="small"
                    fullWidth
                    variant="contained"
                    sx={{ bgcolor: 'primary.main', fontWeight: 700, '&:hover': { bgcolor: 'primary.dark' } }}
                  >
                    시작하기
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Stack direction="row" spacing={2} justifyContent="center" useFlexGap sx={{ mb: 3, width: '100%' }}>
          {iconRow.map((item) => (
            <Box key={item.label} sx={{ textAlign: 'center' }}>
              <IconButton sx={{ bgcolor: 'background.default', color: 'text.secondary' }}>{item.icon}</IconButton>
              <Typography sx={{ color: 'text.secondary', fontSize: '0.7rem', mt: 0.3 }}>{item.label}</Typography>
            </Box>
          ))}
        </Stack>

        <Card sx={{ borderRadius: 3, mb: 3 }}>
          <CardContent>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem', mb: 2, textAlign: 'center' }}>
              오늘 헬시님의 하루는 어떤 하루였나요?
            </Typography>
            <Grid container spacing={2} justifyContent="center" sx={{ mb: 2, maxWidth: 260, mx: 'auto' }}>
              {moods.map((item) => (
                <Grid key={item.label} size={6} sx={{ textAlign: 'center' }}>
                  <Box
                    onClick={() => setSelectedMood(item.label)}
                    sx={{
                      cursor: 'pointer',
                      display: 'inline-block',
                      opacity: selectedMood === item.label ? 1 : 0.5,
                      transform: selectedMood === item.label ? 'scale(1.1)' : 'none',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <SeedAvatar size={64} mood={item.mood} />
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.75rem', mt: 0.5 }}>{item.label}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <TextField
              label="메모 (선택)"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              fullWidth
              multiline
              minRows={2}
              size="small"
              sx={{ mb: 2 }}
            />
            <Button
              onClick={handleSubmit}
              disabled={submitting || !selectedMood}
              fullWidth
              variant="contained"
              sx={{ bgcolor: 'primary.main', fontWeight: 700, '&:hover': { bgcolor: 'primary.dark' } }}
            >
              {submitting ? '기록 중...' : '오늘 기분 기록하기'}
            </Button>
          </CardContent>
        </Card>

        {!loading && entries.length === 0 && (
          <Typography sx={{ color: 'text.secondary', textAlign: 'center' }}>
            아직 기록이 없어요. 오늘 기분을 남겨보세요!
          </Typography>
        )}

        <Stack spacing={1.5}>
          {entries.map((entry) => (
            <Card key={entry.id} variant="outlined" sx={{ borderColor: 'divider' }}>
              <CardContent sx={{ py: '12px !important' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={2} sx={{ flexWrap: 'wrap', rowGap: 0.5 }}>
                  <Typography sx={{ color: 'text.primary', fontWeight: 700 }}>{entry.mood}</Typography>
                  <Typography sx={{ color: 'text.secondary', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                    {new Date(entry.created_at).toLocaleString('ko-KR', { dateStyle: 'medium', timeStyle: 'short' })}
                  </Typography>
                </Stack>
                {entry.note && (
                  <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem', mt: 0.5 }}>{entry.note}</Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

export default MoodLog;
