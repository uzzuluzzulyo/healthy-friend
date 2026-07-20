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

function FindPassword() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleReset() {
    setError('');
    setSuccess(false);

    if (!nickname.trim() || !email.trim() || !password) {
      setError('모든 항목을 입력해주세요.');
      return;
    }
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setSubmitting(true);

    const { data: existing } = await supabase
      .from('hf_users')
      .select('id')
      .eq('nickname', nickname.trim())
      .eq('email', email.trim())
      .maybeSingle();

    if (!existing) {
      setSubmitting(false);
      setError('닉네임과 이메일이 일치하는 계정을 찾을 수 없습니다.');
      return;
    }

    const { error: updateError } = await supabase
      .from('hf_users')
      .update({ password })
      .eq('id', existing.id);

    setSubmitting(false);

    if (updateError) {
      setError('비밀번호 변경에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } else {
      setSuccess(true);
      setPassword('');
      setPasswordConfirm('');
    }
  }

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', py: { xs: 4, md: 8 }, backgroundImage: (theme) => `radial-gradient(ellipse 70% 50% at 50% 0%, ${theme.palette.primary.light}33, transparent 70%)` }}>
      <Container maxWidth="sm">
        <Card sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 3, md: 5 }, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ color: 'text.primary', fontWeight: 700, mb: 1, fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
              비밀번호 찾기
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem', mb: 3 }}>
              닉네임과 이메일이 모두 일치해야 새 비밀번호로 변경할 수 있어요.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField label="닉네임" value={nickname} onChange={(event) => setNickname(event.target.value)} sx={inputSx} />
              <TextField label="이메일" type="email" value={email} onChange={(event) => setEmail(event.target.value)} sx={inputSx} />
              <TextField label="새 비밀번호" type="password" value={password} onChange={(event) => setPassword(event.target.value)} sx={inputSx} />
              <TextField
                label="새 비밀번호 확인"
                type="password"
                value={passwordConfirm}
                onChange={(event) => setPasswordConfirm(event.target.value)}
                sx={inputSx}
              />
              {error && <Typography sx={{ color: 'error.main', fontSize: '0.85rem' }}>{error}</Typography>}
              {success && <Typography sx={{ color: 'primary.main', fontSize: '0.85rem' }}>비밀번호가 변경되었습니다. 로그인해주세요.</Typography>}
              <Button
                onClick={handleReset}
                disabled={submitting}
                variant="contained"
                size="large"
                sx={{ bgcolor: 'primary.main', fontWeight: 700, mt: 1, '&:hover': { bgcolor: 'primary.dark' } }}
              >
                {submitting ? '변경 중...' : '비밀번호 재설정'}
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

export default FindPassword;
