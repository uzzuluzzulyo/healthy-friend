import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import MonitorHeartRoundedIcon from '@mui/icons-material/MonitorHeartRounded';
import GradientHeader from '../components/common/gradient-header.jsx';

const options = [
  { key: 'mood', label: '나의 심리 기록', icon: <MenuBookRoundedIcon sx={{ fontSize: 32 }} />, path: '/mood' },
  { key: 'health', label: '나의 건강 기록', icon: <MonitorHeartRoundedIcon sx={{ fontSize: 32 }} />, path: '/health' },
];

function HealthHub() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('');

  const selectedOption = options.find((option) => option.key === selected);

  return (
    <Box sx={{ width: '100%', pb: 10 }}>
      <GradientHeader title="나의 건강 LOG" subtitle="오늘은 어떤 기록을 남겨볼까요?" backTo="/" />

      <Container maxWidth="sm" sx={{ mt: -3, pb: { xs: 3, md: 6 } }}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {options.map((option) => (
            <Grid key={option.key} size={6}>
              <Card
                onClick={() => setSelected(option.key)}
                sx={{
                  borderRadius: 3,
                  cursor: 'pointer',
                  border: '2px solid',
                  borderColor: selected === option.key ? 'primary.main' : 'transparent',
                  transition: 'border-color 0.2s ease',
                }}
              >
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Box sx={{ color: 'primary.main', mb: 1 }}>{option.icon}</Box>
                  <Typography sx={{ color: 'text.primary', fontWeight: 700, fontSize: '0.9rem' }}>
                    {option.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Button
          onClick={() => selectedOption && navigate(selectedOption.path)}
          disabled={!selectedOption}
          fullWidth
          variant="contained"
          size="large"
          sx={{ bgcolor: 'primary.main', fontWeight: 700, '&:hover': { bgcolor: 'primary.dark' } }}
        >
          선택하기
        </Button>
      </Container>
    </Box>
  );
}

export default HealthHub;
