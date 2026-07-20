import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import SeedAvatar from '../components/ui/seed-avatar.jsx';

function CareRoom() {
  const navigate = useNavigate();
  const [playing, setPlaying] = useState(false);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        pb: 10,
        background: 'linear-gradient(160deg, #4A8FA6 0%, #2E6B7E 60%, #1F4E5C 100%)',
        overflow: 'hidden',
      }}
    >
      <IconButton
        onClick={() => navigate('/mood')}
        sx={{ position: 'absolute', top: 16, left: 16, color: '#FFFFFF', zIndex: 2 }}
      >
        <ArrowBackRoundedIcon />
      </IconButton>

      <Box sx={{ position: 'absolute', bottom: 140, right: 24 }}>
        <SeedAvatar size={64} mood="default" />
      </Box>

      <Box sx={{ position: 'absolute', bottom: 48, left: 24, right: 24 }}>
        <Typography variant="h5" sx={{ color: '#FFFFFF', fontWeight: 700, mb: 1 }}>
          나만의 심리 케어
        </Typography>
        <Typography sx={{ color: '#FFFFFF', opacity: 0.9, mb: 3, fontSize: '0.9rem' }}>
          바다 소리를 듣고 마음을 안정시켜보는 것 또한 방법이죠!
        </Typography>

        <Button
          onClick={() => setPlaying((prev) => !prev)}
          variant="contained"
          sx={{
            bgcolor: '#FFFFFF',
            color: '#2E6B7E',
            fontWeight: 700,
            borderRadius: 6,
            px: 3,
            '&:hover': { bgcolor: '#F0F0F0' },
          }}
        >
          {playing ? '정지하기' : '재생하기'}
        </Button>

        <Typography sx={{ color: '#FFFFFF', opacity: 0.7, fontSize: '0.7rem', mt: 2 }}>
          * 프로토타입 단계라 실제 소리는 재생되지 않아요. 다음 개발 단계에서 실제 오디오가 추가될 예정이에요.
        </Typography>
      </Box>
    </Box>
  );
}

export default CareRoom;
