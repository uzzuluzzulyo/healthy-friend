import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LockRoundedIcon from '@mui/icons-material/LockRounded';

function Signup() {
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
            <LockRoundedIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" sx={{ color: 'text.primary', fontWeight: 700, mb: 1.5 }}>
              현재 회원가입을 받고 있지 않아요
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.95rem', lineHeight: 1.7, mb: 3 }}>
              헬시프렌드는 지금 신규 가입을 열어두지 않았어요.
              이미 계정이 있다면 로그인해주세요.
            </Typography>
            <Button
              component={NavLink}
              to="/login"
              variant="contained"
              size="large"
              sx={{ bgcolor: 'primary.main', fontWeight: 700, '&:hover': { bgcolor: 'primary.dark' } }}
            >
              로그인하러 가기
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default Signup;
