import Box from '@mui/material/Box';

/**
 * SeedAvatar 컴포넌트
 *
 * 마스코트 캐릭터 "시드"를 표현하는 둥근 블롭 아바타
 *
 * Props:
 * @param {number} size - 아바타 크기(px) [Optional, 기본값: 56]
 * @param {'default'|'happy'|'sad'|'angry'} mood - 표정 [Optional, 기본값: 'default']
 *
 * Example usage:
 * <SeedAvatar size={80} mood="happy" />
 */
function SeedAvatar({ size = 56, mood = 'default' }) {
  const eyeColor = '#1A2733';
  const mouthPaths = {
    default: 'M -6 4 Q 0 8 6 4',
    happy: 'M -7 2 Q 0 10 7 2',
    sad: 'M -6 8 Q 0 2 6 8',
    angry: 'M -6 5 Q 0 1 6 5',
  };

  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        bgcolor: 'primary.light',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: (theme) => `0 4px 12px ${theme.palette.primary.main}44`,
      }}
    >
      <svg width={size * 0.55} height={size * 0.55} viewBox="-20 -20 40 40">
        <circle cx="-7" cy="-4" r="2.4" fill={eyeColor} />
        <circle cx="7" cy="-4" r="2.4" fill={eyeColor} />
        <path
          d={mouthPaths[mood] ?? mouthPaths.default}
          stroke={eyeColor}
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </Box>
  );
}

export default SeedAvatar;
