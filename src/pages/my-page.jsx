import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SeedAvatar from '../components/ui/seed-avatar.jsx';
import { useCurrentUser } from '../hooks/use-current-user.js';
import { logout } from '../lib/auth.js';

function MyPage() {
  const navigate = useNavigate();
  const { user, loading } = useCurrentUser();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <Box sx={{ width: '100%', pb: 10 }}>
      <Container maxWidth="sm" sx={{ py: { xs: 3, md: 6 } }}>
        <Typography variant="h5" sx={{ color: 'text.primary', fontWeight: 700, mb: 3 }}>
          마이페이지
        </Typography>

        <Card sx={{ borderRadius: 3, mb: 3 }}>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <SeedAvatar size={56} mood="default" />
              <Box>
                <Typography sx={{ color: 'text.primary', fontWeight: 700 }}>
                  {loading ? '불러오는 중...' : (user?.nickname ?? '알 수 없음')}
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>{user?.email}</Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Button
          onClick={handleLogout}
          fullWidth
          variant="outlined"
          sx={{ color: 'text.secondary', borderColor: 'divider' }}
        >
          로그아웃
        </Button>
      </Container>
    </Box>
  );
}

export default MyPage;
