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
import { supabase } from '../lib/supabase.js';
import { getCurrentUserId } from '../lib/auth.js';

function HealthLog() {
  const [steps, setSteps] = useState('');
  const [waterMl, setWaterMl] = useState('');
  const [sleepHours, setSleepHours] = useState('');
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchLogs = async () => {
    const userId = getCurrentUserId();
    if (!userId) return;

    setLoading(true);
    const { data } = await supabase
      .from('hf_health_logs')
      .select('*')
      .eq('user_id', userId)
      .order('log_date', { ascending: false })
      .limit(30);
    setLogs(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const userId = getCurrentUserId();
    if (!userId) return;

    setSubmitting(true);
    await supabase.from('hf_health_logs').insert({
      user_id: userId,
      steps: Number(steps) || 0,
      water_ml: Number(waterMl) || 0,
      sleep_hours: Number(sleepHours) || 0,
    });
    setSteps('');
    setWaterMl('');
    setSleepHours('');
    setSubmitting(false);
    await fetchLogs();
  }

  return (
    <Box sx={{ width: '100%', pb: 10 }}>
      <Container maxWidth="sm" sx={{ py: { xs: 3, md: 6 } }}>
        <Typography variant="h5" sx={{ color: 'text.primary', fontWeight: 700, mb: 3 }}>
          나의 건강 기록
        </Typography>

        <Card sx={{ borderRadius: 3, mb: 3 }}>
          <CardContent>
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField label="걸음 수" type="number" value={steps} onChange={(event) => setSteps(event.target.value)} size="small" />
                <TextField label="물 섭취량 (ml)" type="number" value={waterMl} onChange={(event) => setWaterMl(event.target.value)} size="small" />
                <TextField
                  label="수면 시간 (시간)"
                  type="number"
                  value={sleepHours}
                  onChange={(event) => setSleepHours(event.target.value)}
                  size="small"
                  inputProps={{ step: 0.5 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  disabled={submitting}
                  sx={{ bgcolor: 'primary.main', fontWeight: 700, '&:hover': { bgcolor: 'primary.dark' } }}
                >
                  {submitting ? '저장 중...' : '오늘 기록 저장'}
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>

        {!loading && logs.length === 0 && (
          <Typography sx={{ color: 'text.secondary', textAlign: 'center' }}>
            아직 기록이 없어요. 오늘 기록을 남겨보세요!
          </Typography>
        )}

        <Stack spacing={1.5}>
          {logs.map((log) => (
            <Card key={log.id} variant="outlined" sx={{ borderColor: 'divider' }}>
              <CardContent sx={{ py: '12px !important' }}>
                <Typography sx={{ color: 'text.secondary', fontSize: '0.8rem', mb: 0.5 }}>{log.log_date}</Typography>
                <Grid container spacing={1}>
                  <Grid size={4}>
                    <Typography sx={{ color: 'text.primary', fontSize: '0.9rem' }}>걸음 {log.steps.toLocaleString()}</Typography>
                  </Grid>
                  <Grid size={4}>
                    <Typography sx={{ color: 'text.primary', fontSize: '0.9rem' }}>물 {log.water_ml}ml</Typography>
                  </Grid>
                  <Grid size={4}>
                    <Typography sx={{ color: 'text.primary', fontSize: '0.9rem' }}>수면 {log.sleep_hours}h</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

export default HealthLog;
