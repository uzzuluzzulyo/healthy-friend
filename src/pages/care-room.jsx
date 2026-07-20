import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import SeedAvatar from '../components/ui/seed-avatar.jsx';

function CareRoom() {
  const navigate = useNavigate();
  const [playing, setPlaying] = useState(false);

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pb: 10,
        background: 'linear-gradient(180deg, #2A6D9E 0%, #4FB89E 100%)',
      }}
    >
      <IconButton
        onClick={() => navigate('/mood')}
        sx={{ position: 'absolute', top: 16, left: 16, color: '#FFFFFF' }}
      >
        <ArrowBackRoundedIcon />
      </IconButton>

      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <SeedAvatar size={72} mood="default" />
        </Box>
        <Typography variant="h5" sx={{ color: '#FFFFFF', fontWeight: 700, mb: 2 }}>
          나만의 심리 케어
        </Typography>
        <Typography sx={{ color: '#FFFFFF', opacity: 0.9, mb: 4 }}>
          바다 소리를 듣고 마음을 안정시켜보는 것 또한 방법이죠!
        </Typography>

        <IconButton
          onClick={() => setPlaying((prev) => !prev)}
          sx={{
            width: 72,
            height: 72,
            bgcolor: 'rgba(255,255,255,0.2)',
            color: '#FFFFFF',
            mb: 2,
            '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
          }}
        >
          {playing ? <PauseRoundedIcon sx={{ fontSize: 36 }} /> : <PlayArrowRoundedIcon sx={{ fontSize: 36 }} />}
        </IconButton>

        <Typography sx={{ color: '#FFFFFF', opacity: 0.7, fontSize: '0.75rem' }}>
          * 프로토타입 단계라 실제 소리는 재생되지 않아요. 다음 개발 단계에서 실제 오디오가 추가될 예정이에요.
        </Typography>
      </Container>
    </Box>
  );
}

export default CareRoom;
