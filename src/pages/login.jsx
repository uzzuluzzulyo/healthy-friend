import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { supabase } from '../lib/supabase.js';
import { login } from '../lib/auth.js';

const inputSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: 'background.default',
    '& fieldset': { borderColor: 'divider' },
    '&:hover fieldset': { borderColor: 'primary.main' },
    '&.Mui-focused fieldset': { borderColor: 'primary.main' },
  },
};

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleLogin() {
    setError('');
    setSubmitting(true);

    const { data } = await supabase
      .from('hf_users')
      .select('id')
      .eq('email', email)
      .eq('password', password)
      .maybeSingle();

    setSubmitting(false);

    if (data) {
      login(data.id);
      navigate('/');
    } else {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 4, md: 8 },
        backgroundImage: (theme) =>
          `radial-gradient(ellipse 70% 50% at 50% 0%, ${theme.palette.primary.light}33, transparent 70%)`,
      }}
    >
      <Container maxWidth="sm">
        <Card sx={{ borderRadius: 4 }}>
          <CardContent sx={{ p: { xs: 3.5, md: 5.5 }, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ color: 'text.primary', fontWeight: 700, mb: 3, fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
              로그인
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField label="이메일" value={email} onChange={(event) => setEmail(event.target.value)} sx={inputSx} />
              <TextField label="비밀번호" type="password" value={password} onChange={(event) => setPassword(event.target.value)} sx={inputSx} />
              {error && <Typography sx={{ color: 'error.main', fontSize: '0.85rem' }}>{error}</Typography>}
              <Button
                onClick={handleLogin}
                disabled={submitting}
                variant="contained"
                size="large"
                sx={{ bgcolor: 'primary.main', fontWeight: 700, mt: 1, '&:hover': { bgcolor: 'primary.dark' } }}
              >
                {submitting ? '확인 중...' : '로그인'}
              </Button>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Typography component={NavLink} to="/find-id" sx={{ color: 'text.secondary', fontSize: '0.8rem', textDecoration: 'none' }}>
                  아이디 찾기
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>|</Typography>
                <Typography component={NavLink} to="/find-password" sx={{ color: 'text.secondary', fontSize: '0.8rem', textDecoration: 'none' }}>
                  비밀번호 찾기
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default Login;
