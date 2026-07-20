import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import CloudQueueRoundedIcon from '@mui/icons-material/CloudQueueRounded';

/**
 * PageHeader 컴포넌트
 *
 * 뒤로가기 화살표 + 페이지 제목 + 우측 보조 아이콘 2개로 구성된 상단 헤더 바
 *
 * Props:
 * @param {string} title - 헤더에 표시할 페이지 제목 [Required]
 * @param {string} backTo - 뒤로가기 시 이동할 경로 [Optional, 기본값: -1(브라우저 뒤로가기)]
 *
 * Example usage:
 * <PageHeader title="나의 심리 기록" />
 */
function PageHeader({ title, backTo }) {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton onClick={() => (backTo ? navigate(backTo) : navigate(-1))} sx={{ color: 'text.primary', ml: -1 }}>
          <ArrowBackRoundedIcon />
        </IconButton>
        <Typography sx={{ color: 'text.primary', fontWeight: 700, fontSize: '1.1rem' }}>{title}</Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <IconButton sx={{ color: 'text.secondary' }}>
          <DescriptionRoundedIcon fontSize="small" />
        </IconButton>
        <IconButton sx={{ color: 'text.secondary' }}>
          <CloudQueueRoundedIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}

export default PageHeader;
