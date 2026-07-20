import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

/**
 * PageHeader 컴포넌트
 *
 * 뒤로가기 화살표 + 페이지 제목으로 구성된 상단 헤더 바
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
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
      <IconButton onClick={() => (backTo ? navigate(backTo) : navigate(-1))} sx={{ color: 'text.primary', ml: -1 }}>
        <ArrowBackRoundedIcon />
      </IconButton>
      <Typography sx={{ color: 'text.primary', fontWeight: 700, fontSize: '1.1rem' }}>{title}</Typography>
    </Box>
  );
}

export default PageHeader;
