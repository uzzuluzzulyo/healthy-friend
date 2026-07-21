import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

/**
 * GradientHeader 컴포넌트
 *
 * 브랜드 그라데이션이 적용된 페이지 상단 히어로 헤더. 뒤로가기 + 제목 + 부제목을 포함한다.
 *
 * Props:
 * @param {string} title - 헤더 제목 [Required]
 * @param {string} subtitle - 헤더 부제목 [Optional]
 * @param {string} backTo - 뒤로가기 이동 경로 [Optional, 기본값: -1]
 * @param {node} children - 헤더 하단에 겹쳐 배치할 콘텐츠(카드 등) [Optional]
 *
 * Example usage:
 * <GradientHeader title="나의 건강 기록" backTo="/health-hub" />
 */
function GradientHeader({ title, subtitle, backTo, children }) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #388DC6 0%, #2A6D9E 55%, #1CD9E8 140%)',
        pt: { xs: 6, md: 8 },
        pb: { xs: 4, md: 5 },
        px: 2,
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative' }}>
        <IconButton
          onClick={() => (backTo ? navigate(backTo) : navigate(-1))}
          sx={{ color: '#FFFFFF', ml: -1, mb: 0.5 }}
        >
          <ArrowBackRoundedIcon />
        </IconButton>
        <Typography sx={{ color: '#FFFFFF', fontWeight: 800, fontSize: { xs: '1.4rem', md: '1.7rem' } }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', mt: 0.5 }}>{subtitle}</Typography>
        )}
        {children}
      </Container>
    </Box>
  );
}

export default GradientHeader;
