import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import SeedAvatar from '../components/ui/seed-avatar.jsx';
import { supabase } from '../lib/supabase.js';
import { getCurrentUserId } from '../lib/auth.js';

const moods = [
  { label: '행복', mood: 'happy' },
  { label: '그럭저럭', mood: 'default' },
  { label: '슬픔', mood: 'sad' },
  { label: '화남', mood: 'angry' },
];

function MoodLog() {
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
        <Typography variant="h5" sx={{ color: 'text.primary', fontWeight: 700, mb: 3 }}>
          나의 심리 기록
        </Typography>

        <Card sx={{ borderRadius: 3, mb: 3 }}>
          <CardContent>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem', mb: 2, textAlign: 'center' }}>
              오늘 헬시님의 하루는 어떤 하루였나요?
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 2 }}>
              {moods.map((item) => (
                <Box
                  key={item.label}
                  onClick={() => setSelectedMood(item.label)}
                  sx={{
                    cursor: 'pointer',
                    textAlign: 'center',
                    opacity: selectedMood === item.label ? 1 : 0.5,
                    transform: selectedMood === item.label ? 'scale(1.1)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <SeedAvatar size={48} mood={item.mood} />
                  <Typography sx={{ color: 'text.secondary', fontSize: '0.75rem', mt: 0.5 }}>{item.label}</Typography>
                </Box>
              ))}
            </Stack>
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
