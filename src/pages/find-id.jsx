import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { supabase } from '../lib/supabase.js';

const inputSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: 'background.default',
    '& fieldset': { borderColor: 'divider' },
    '&:hover fieldset': { borderColor: 'primary.main' },
    '&.Mui-focused fieldset': { borderColor: 'primary.main' },
  },
};

function FindId() {
  const [nickname, setNickname] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSearch() {
    setError('');
    setResult('');

    if (!nickname.trim()) {
      setError('닉네임을 입력해주세요.');
      return;
    }

    setSubmitting(true);
    const { data } = await supabase
      .from('hf_users')
      .select('email')
      .eq('nickname', nickname.trim())
      .maybeSingle();
    setSubmitting(false);

    if (data) {
      setResult(data.email);
    } else {
      setError('일치하는 계정을 찾을 수 없습니다.');
    }
  }

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', py: { xs: 4, md: 8 }, backgroundImage: (theme) => `radial-gradient(ellipse 70% 50% at 50% 0%, ${theme.palette.primary.light}33, transparent 70%)` }}>
      <Container maxWidth="sm">
        <Card sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 3, md: 5 }, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ color: 'text.primary', fontWeight: 700, mb: 3, fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
              아이디 찾기
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField label="닉네임" value={nickname} onChange={(event) => setNickname(event.target.value)} sx={inputSx} />
              {error && <Typography sx={{ color: 'error.main', fontSize: '0.85rem' }}>{error}</Typography>}
              {result && <Typography sx={{ color: 'primary.main', fontWeight: 700 }}>가입하신 이메일: {result}</Typography>}
              <Button
                onClick={handleSearch}
                disabled={submitting}
                variant="contained"
                size="large"
                sx={{ bgcolor: 'primary.main', fontWeight: 700, mt: 1, '&:hover': { bgcolor: 'primary.dark' } }}
              >
                {submitting ? '찾는 중...' : '아이디 찾기'}
              </Button>
              <Typography component={NavLink} to="/login" sx={{ color: 'text.secondary', fontSize: '0.85rem', textDecoration: 'none', mt: 1 }}>
                로그인으로 돌아가기
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default FindId;
